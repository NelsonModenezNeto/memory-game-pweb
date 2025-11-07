<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/routes/web.php';

$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

if (isset($routes[$method][$requestUri])) {
    $action = $routes[$method][$requestUri];
    [$controller, $methodName] = explode('@', $action);
    $controllerFile = __DIR__ . "/controllers/{$controller}.php";

    if (file_exists($controllerFile)) {
        require_once $controllerFile;
        $instance = new $controller();
        $instance->$methodName();
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Controller não encontrado"]);
    }
} else {
    http_response_code(404);
    echo json_encode(["error" => "Rota não encontrada"]);
}
