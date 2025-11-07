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
            Response::json(["message" => "ok"]);
        }
    }

?>