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
    }

?>