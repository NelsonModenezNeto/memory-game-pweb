# memory-game-pweb

https://dribbble.com/shots/25079344-Gamedev-Showcase-Title-Screen

## Execução do Projeto

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
