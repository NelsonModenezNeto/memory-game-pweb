<?php
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../utils/response.php';

class AuthController
{
    private $pdo;

    public function __construct()
    {
        $this->pdo = (new Connection())->getConnection();
    }

    public function register()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $nome  = $data['nome'] ?? '';
        $email = $data['email'] ?? '';
        $senha = $data['senha'] ?? '';

        if (!$nome || !$email || !$senha) {
            return Response::json(["error" => "Todos os campos são obrigatórios"], 400);
        }

        try {
            $stmt = $this->pdo->prepare("INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)");
            $stmt->execute([$nome, $email, $senha]);
            Response::json(["message" => "Usuário cadastrado com sucesso"]);
        } catch (PDOException $e) {
            Response::json(["error" => "Erro ao cadastrar: " . $e->getMessage()], 500);
        }
    }

    public function login()
    {
        session_start();
        $data = json_decode(file_get_contents("php://input"), true);
        $email = $data['email'] ?? '';
        $senha = $data['senha'] ?? '';

        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($senha, $user['senha'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['nome'] = $user['nome'];

            Response::json([
                "message" => "Login bem-sucedido",
                "user" => [
                    "id" => $user['id'],
                    "nome" => $user['nome'],
                    "email" => $user['email']
                ]
            ]);
        } else {
            Response::json(["error" => "Credenciais inválidas"], 401);
        }
    }
}
