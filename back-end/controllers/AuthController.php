<?php
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../utils/response.php';
require_once __DIR__ . '/../domains/User.php';

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

        $name     = $data['name'] ?? '';
        $birthday = $data['birthday'] ?? '';
        $phone    = $data['phone'] ?? '';
        $email    = $data['email'] ?? '';
        $username = $data['username'] ?? '';
        $cpf      = $data['cpf'] ?? '';
        $password = $data['password'] ?? '';

        if (!$name || !$birthday || !$phone || !$email || !$username || !$cpf || !$password) {
            return Response::json(["error" => "Todos os campos são obrigatórios"], 400);
        }

        $user = new User($name, $birthday, $phone, $email, $username, $cpf, $password);

        $password_hash = password_hash($user->getPassword(), PASSWORD_DEFAULT);

        try {
            $stmt = $this->pdo->prepare("
                INSERT INTO user (name, birthday, phone, email, username, cpf, password)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ");
            $stmt->execute([
                $user->getName(),
                $user->getBirthday(),
                $user->getPhone(),
                $user->getEmail(),
                $user->getUsername(),
                $user->getCpf(),
                $password_hash
            ]);

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
        $password = $data['password'] ?? '';

        $stmt = $this->pdo->prepare("SELECT * FROM user WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['name'] = $user['name'];

            Response::json([
                "message" => "Login bem-sucedido",
                "user" => [
                    "id" => $user['id'],
                    "name" => $user['name'],
                    "phone" => $user['phone'],
                    "email" => $user['email']
                ]
            ]);
        } else {
            Response::json(["error" => "Credenciais inválidas"], 401);
        }
    }
}
