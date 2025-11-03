# memory-game-pweb

https://dribbble.com/shots/25079344-Gamedev-Showcase-Title-Screen

## Execução do Projeto

docker compose up -d

docker exec -it mysql_container mysql -u user -p password db

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  senha VARCHAR(255),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

