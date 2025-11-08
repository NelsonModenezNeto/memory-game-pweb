<?php
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../utils/response.php';

class UserController
{
    private $pdo;

    public function __construct()
    {
        $this->pdo = (new Connection())->getConnection();
    }

    private function getAuthenticatedUserId(): int
    {
        if (session_status() !== PHP_SESSION_ACTIVE) {
            session_start();
        }

        if (!isset($_SESSION['user_id'])) {
            Response::json(["error" => "Usuário não autenticado"], 401);
        }

        return (int) $_SESSION['user_id'];
    }

    public function getProfile(): void
    {
        $userId = $this->getAuthenticatedUserId();

        try {
            $stmt = $this->pdo->prepare("
                SELECT id, name, birthday, phone, email, username, cpf
                FROM user
                WHERE id = ?
            ");
            $stmt->execute([$userId]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$user) {
                Response::json(["error" => "Usuário não encontrado"], 404);
            }

            Response::json(["data" => $user]);
        } catch (PDOException $e) {
            Response::json(["error" => "Erro ao buscar usuário: " . $e->getMessage()], 500);
        }
    }

    public function updateProfile(): void
    {
        $userId = $this->getAuthenticatedUserId();

        $payload = json_decode(file_get_contents("php://input"), true);

        if (!is_array($payload)) {
            Response::json(["error" => "JSON inválido"], 400);
        }

        try {
            $stmt = $this->pdo->prepare("
                SELECT name, phone, email, birthday, username, cpf
                FROM user
                WHERE id = ?
            ");
            $stmt->execute([$userId]);
            $currentUser = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$currentUser) {
                Response::json(["error" => "Usuário não encontrado"], 404);
            }

            $name = array_key_exists('name', $payload) ? trim((string) $payload['name']) : $currentUser['name'];
            $phone = array_key_exists('phone', $payload) ? trim((string) $payload['phone']) : $currentUser['phone'];
            $email = array_key_exists('email', $payload) ? trim((string) $payload['email']) : $currentUser['email'];
            $password = array_key_exists('password', $payload) ? (string) $payload['password'] : null;

            if ($name === '' || $email === '') {
                Response::json(["error" => "Nome e email são obrigatórios"], 400);
            }

            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                Response::json(["error" => "Formato de email inválido"], 422);
            }

            if (strcasecmp($email, $currentUser['email']) !== 0) {
                $stmt = $this->pdo->prepare("SELECT id FROM user WHERE email = ? AND id <> ?");
                $stmt->execute([$email, $userId]);

                if ($stmt->fetch(PDO::FETCH_ASSOC)) {
                    Response::json(["error" => "Email já está em uso por outro usuário"], 409);
                }
            }

            if ($password !== null && $password !== '') {
                $passwordHash = password_hash($password, PASSWORD_DEFAULT);

                $stmt = $this->pdo->prepare("
                    UPDATE user
                    SET name = ?, phone = ?, email = ?, password = ?
                    WHERE id = ?
                ");
                $stmt->execute([
                    $name,
                    $phone !== '' ? $phone : null,
                    $email,
                    $passwordHash,
                    $userId
                ]);
            } else {
                $stmt = $this->pdo->prepare("
                    UPDATE user
                    SET name = ?, phone = ?, email = ?
                    WHERE id = ?
                ");
                $stmt->execute([
                    $name,
                    $phone !== '' ? $phone : null,
                    $email,
                    $userId
                ]);
            }

            $stmt = $this->pdo->prepare("
                SELECT id, name, birthday, phone, email, username, cpf
                FROM user
                WHERE id = ?
            ");
            $stmt->execute([$userId]);
            $updatedUser = $stmt->fetch(PDO::FETCH_ASSOC);

            $_SESSION['name'] = $updatedUser['name'];

            Response::json([
                "message" => "Dados atualizados com sucesso",
                "data" => $updatedUser
            ]);
        } catch (PDOException $e) {
            Response::json(["error" => "Erro ao atualizar usuário: " . $e->getMessage()], 500);
        }
    }
}
?>

