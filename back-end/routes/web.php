<?php
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

switch ($uri) {
    case '/memory-game-pweb/back-end/login':
        require_once __DIR__ . '/../controllers/AuthController.php';
        $controller = new AuthController();
        $controller->login();
        break;

    case '/memory-game-pweb/back-end/register':
        require_once __DIR__ . '/../controllers/AuthController.php';
        $controller = new AuthController();
        $controller->register();
        break;

    case '/memory-game-pweb/back-end/user/profile':
        require_once __DIR__ . '/../controllers/UserController.php';
        $controller = new UserController();
        $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

        if ($method === 'GET') {
            $controller->getProfile();
        } elseif ($method === 'PUT' || $method === 'POST') {
            $controller->updateProfile();
        } else {
            http_response_code(405);
            echo json_encode(["error" => "Método não permitido"]);
        }
        break;

    case '/api/history':
        require_once __DIR__ . '/../controllers/GameController.php';
        $controller = GameController::getInstance();
        $controller->findHistory();
        break;

    case '/memory-game-pweb/back-end/game/config':
        require_once __DIR__ . '/../controllers/GameController.php';
        $controller = GameController::getInstance();
        $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

        if ($method === 'GET') {
            $controller->getGameConfig();
        } elseif ($method === 'POST' || $method === 'PUT') {
            $controller->saveGameConfig();
        } else {
            http_response_code(405);
            echo json_encode(["error" => "Método não permitido"]);
        }
        break;

    default:
        echo json_encode(["error" => "Rota não encontrada"]);
        break;
}

?>