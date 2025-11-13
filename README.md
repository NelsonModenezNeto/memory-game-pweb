# memory-game-pweb

https://dribbble.com/shots/25079344-Gamedev-Showcase-Title-Screen

## Execução do Projeto
Se utilizar no xampp coloque i diretorio do memory-game-pweb inteiro no htdocs do XAMPP
.env para o XAMPP
DB_HOST = localhost
DB_NAME = db
DB_USER = root
DB_PASS = 
PORT = 3306

Obs: não colocar em outras paths, pois muito do codigos utilizam URLs absolutos, como para acessar o backend.

docker compose up -d

docker exec -it mysql_container mysql -u user -p password db

podman exec -it mysql_container mysql -u user -ppassword db

CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  birthday TIMESTAMP,
  phone VARCHAR(20),
  email VARCHAR(150),
  username VARCHAR(80) UNIQUE,
  cpf VARCHAR(30),
  password VARCHAR(80)
);

CREATE TABLE game_register (
  id INT AUTO_INCREMENT PRIMARY KEY,
  player_id INT,
  dimension INT,
  mode VARCHAR(20),
  elapsed_time INT,
  moves INT,
  result BOOLEAN,
  game_date TIMESTAMP,

  FOREIGN KEY (player_id) REFERENCES user(id)
);
