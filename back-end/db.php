<?php
class Connection
{
    private $pdo;

    public function __construct()
    {
        $env = parse_ini_file(__DIR__ . '/../.env');
        $host = $env['DB_HOST'];
        $db   = $env['DB_NAME'];
        $user = $env['DB_USER'];
        $pass = $env['DB_PASS'];
        $port = $env['PORT'];

        try {
            $this->pdo = new PDO("mysql:host=$host;port=$port;dbname=$db;charset=utf8", $user, $pass);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die(json_encode(["error" => "Erro de conexão: " . $e->getMessage()]));
        }
    }

    public function getConnection()
    {
        return $this->pdo;
    }
}

?>
