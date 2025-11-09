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
            session_start();

            $user_id = $_SESSION["user_id"]; // get it from the session

            $stmt = $this->pdo->prepare("
            SELECT 
            gr.id, 
            u.name as player_name, 
            player_id, 
            dimension, 
            mode, 
            elapsed_time, 
            moves, 
            result, 
            game_date 
            FROM game_register gr INNER JOIN user u ON u.id = gr.player_id WHERE player_id=?"
        );
            $stmt->execute([$user_id]);
            $registers = $stmt->fetchAll(PDO::FETCH_ASSOC);
            Response::json(["data" => $registers]);
        }

        public function saveGameConfig(){
            session_start();

            if (!isset($_SESSION['user_id'])) {
                Response::json(["error" => "Usuário não autenticado"], 401);
            }

            $user_id = $_SESSION['user_id'];
            $payload = json_decode(file_get_contents("php://input"), true);

            if (!is_array($payload)) {
                Response::json(["error" => "JSON inválido"], 400);
            }

            $dimension = isset($payload['dimension']) ? (int) $payload['dimension'] : null;
            $modality = isset($payload['modality']) ? trim((string) $payload['modality']) : null;

            // Validação de dimensões (2, 4, 6, 8 - sempre par)
            $validDimensions = [2, 4, 6, 8];
            if ($dimension === null || !in_array($dimension, $validDimensions)) {
                Response::json(["error" => "Dimensão inválida. Deve ser 2, 4, 6 ou 8"], 400);
            }

            // Validação de modalidade
            $validModalities = ['classica', 'contra-tempo'];
            if ($modality === null || !in_array($modality, $validModalities)) {
                Response::json(["error" => "Modalidade inválida. Deve ser 'classica' ou 'contra-tempo'"], 400);
            }

            try {
                // Verifica se já existe configuração para o usuário
                $stmt = $this->pdo->prepare("SELECT id FROM user_game_config WHERE user_id = ?");
                $stmt->execute([$user_id]);
                $existing = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($existing) {
                    // UPDATE
                    $stmt = $this->pdo->prepare("
                        UPDATE user_game_config
                        SET dimension = ?, modality = ?, updated_at = CURRENT_TIMESTAMP
                        WHERE user_id = ?
                    ");
                    $stmt->execute([$dimension, $modality, $user_id]);
                } else {
                    // INSERT
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
            session_start();

            if (!isset($_SESSION['user_id'])) {
                Response::json(["error" => "Usuário não autenticado"], 401);
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
                    // Retorna valores padrão se não existir
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