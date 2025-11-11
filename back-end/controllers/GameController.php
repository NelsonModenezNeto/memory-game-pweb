<?php
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../utils/response.php';

class GameController {

    private static $instance;
    private $pdo;

    public static function getInstance(){
        if (!isset(GameController::$instance)){
            GameController::$instance = new GameController();
        }
        return GameController::$instance;
    }

    public function __construct(){
        $this->pdo = (new Connection())->getConnection();
    }

    public function findHistory(){
        if (session_status() !== PHP_SESSION_ACTIVE) {
            session_start();
        }

        if (!isset($_SESSION["user_id"])) {
            Response::json(["error" => "Usuário não autenticado"], 401);
            return;
        }

        $user_id = $_SESSION["user_id"];

        try {
            $stmt = $this->pdo->prepare("
                SELECT 
                    gr.id as gameId,
                    u.name as playerName,
                    gr.result as resultStatus,
                    gr.moves,
                    gr.elapsed_time as elapsedTime,
                    gr.game_date as date,
                    gr.dimension as tableSize,
                    gr.mode as gameType
                FROM game_register gr 
                INNER JOIN user u ON u.id = gr.player_id 
                WHERE gr.player_id = ?
                ORDER BY gr.game_date DESC
            ");
            $stmt->execute([$user_id]);
            $registers = $stmt->fetchAll(PDO::FETCH_ASSOC);

            foreach ($registers as &$register) {
                $register['gameId'] = (int) $register['gameId'];
                $register['moves'] = (int) $register['moves'];
                $register['elapsedTime'] = (int) $register['elapsedTime'];
                $register['tableSize'] = (int) $register['tableSize'];
            }

            Response::json(["data" => $registers]);
        } catch (PDOException $e) {
            Response::json(["error" => "Erro ao buscar histórico: " . $e->getMessage()], 500);
        }
    }


    public function addHistory(){
        if (session_status() !== PHP_SESSION_ACTIVE) {
            session_start();
        }

        if (!isset($_SESSION["user_id"])) {
            Response::json(["error" => "Usuário não autenticado"], 401);
            return;
        }

        $user_id = $_SESSION["user_id"];
        $data = json_decode(file_get_contents("php://input"), true);

        if (!is_array($data)) {
            Response::json(["error" => "JSON inválido"], 400);
            return;
        }


        $gameType = $data['gameType'] ?? null;           
        $tableSize = $data['tableSize'] ?? null;        
        $elapsedTime = $data['elapsedTime'];     
        $moves = $data['moves'] ?? null;                 
        $resultStatus = $data['resultStatus'] ?? null;   
        $dateISO = $data['date'] ?? null;    

        if ($dateISO) {
            try {
                $dateTime = new DateTime($dateISO);
                $date = $dateTime->format('Y-m-d H:i:s');
            } catch (Exception $e) {
                $date = date('Y-m-d H:i:s');
            }
        } else {
            $date = date('Y-m-d H:i:s');
        }

        try {
            $stmt = $this->pdo->prepare("
                INSERT INTO game_register (player_id, dimension, mode, elapsed_time, moves, result, game_date) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ");
            
            $stmt->execute([
                $user_id,
                (int) $tableSize,
                $gameType,
                (int) $elapsedTime,
                (int) $moves,
                $resultStatus,
                $date
            ]);


            $gameId = (int) $this->pdo->lastInsertId();

            Response::json([
                "message" => "Partida registrada com sucesso",
                "data" => [
                    "gameId" => $gameId,
                    "resultStatus" => $resultStatus,
                    "moves" => (int) $moves,
                    "elapsedTime" => (int) $elapsedTime,
                    "date" => $date,
                    "tableSize" => (int) $tableSize,
                    "gameType" => $gameType
                ]
            ], 201);
        } catch (PDOException $e) {
            Response::json(["error" => "Erro ao registrar partida: " . $e->getMessage()], 500);
        }
    } 

    public function saveGameConfig(){
        if (session_status() !== PHP_SESSION_ACTIVE) {
            session_start();
        }

        if (!isset($_SESSION['user_id'])) {
            Response::json(["error" => "Usuário não autenticado"], 401);
            return;
        }

        $user_id = $_SESSION['user_id'];
        $payload = json_decode(file_get_contents("php://input"), true);

        if (!is_array($payload)) {
            Response::json(["error" => "JSON inválido"], 400);
            return;
        }

        $dimension = isset($payload['dimension']) ? (int) $payload['dimension'] : null;
        $modality = isset($payload['modality']) ? trim((string) $payload['modality']) : null;

        $validDimensions = [2, 4, 6, 8];
        if ($dimension === null || !in_array($dimension, $validDimensions)) {
            Response::json(["error" => "Dimensão inválida. Deve ser 2, 4, 6 ou 8"], 400);
            return;
        }

        $validModalities = ['classica', 'contra-tempo'];
        if ($modality === null || !in_array($modality, $validModalities)) {
            Response::json(["error" => "Modalidade inválida. Deve ser 'classica' ou 'contra-tempo'"], 400);
            return;
        }

        try {
            $stmt = $this->pdo->prepare("SELECT id FROM user_game_config WHERE user_id = ?");
            $stmt->execute([$user_id]);
            $existing = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($existing) {
                $stmt = $this->pdo->prepare("
                    UPDATE user_game_config
                    SET dimension = ?, modality = ?, updated_at = CURRENT_TIMESTAMP
                    WHERE user_id = ?
                ");
                $stmt->execute([$dimension, $modality, $user_id]);
            } else {
                $stmt = $this->pdo->prepare("
                    INSERT INTO user_game_config (user_id, dimension, modality)
                    VALUES (?, ?, ?)
                ");
                $stmt->execute([$user_id, $dimension, $modality]);
            }

            Response::json([
                "message" => "Configurações salvas com sucesso",
                "data" => [
                    "dimension" => $dimension,
                    "modality" => $modality
                ]
            ]);
        } catch (PDOException $e) {
            Response::json(["error" => "Erro ao salvar configurações: " . $e->getMessage()], 500);
        }
    }

    public function getGameConfig(){
        if (session_status() !== PHP_SESSION_ACTIVE) {
            session_start();
        }

        if (!isset($_SESSION['user_id'])) {
            Response::json(["error" => "Usuário não autenticado"], 401);
            return;
        }

        $user_id = $_SESSION['user_id'];

        try {
            $stmt = $this->pdo->prepare("
                SELECT dimension, modality
                FROM user_game_config
                WHERE user_id = ?
            ");
            $stmt->execute([$user_id]);
            $config = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($config) {
                Response::json(["data" => $config]);
            } else {
                Response::json([
                    "data" => [
                        "dimension" => 4,
                        "modality" => "classica"
                    ]
                ]);
            }
        } catch (PDOException $e) {
            Response::json(["error" => "Erro ao buscar configurações: " . $e->getMessage()], 500);
        }
    }
}

?>