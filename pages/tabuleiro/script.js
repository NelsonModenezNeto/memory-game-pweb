// document.addEventListener("DOMContentLoaded", () => {
//   const tabuleiro = document.querySelector(".tabuleiro");

//   function createBoard(gridSize) {
//     tabuleiro.style.setProperty("--grid-size", gridSize);

//     tabuleiro.innerHTML = "";

//     const totalCards = gridSize * gridSize;

//     for (let i = 0; i < totalCards; i++) {
//       const card = document.createElement("div");
//       card.classList.add("cards");
//       tabuleiro.appendChild(card);
//     }
//   }

//   createBoard(4);
// });

document.addEventListener("DOMContentLoaded", () => {
  const btnJoker = document.querySelector("#joker-all-cards");
  btnJoker.addEventListener("click", () => {
    btnJoker.classList.add("cheat-active");
  });

  const btnJokerBackGame = document.querySelector("#joker-back-game");
  btnJokerBackGame.addEventListener("click", () => {
    btnJoker.classList.remove("cheat-active");
  });
});

const table = document.querySelector(".tabuleiro");
const game = JSON.parse(localStorage.getItem('game'));

const tableWidth = {
  2: 230,
  4: 420,
  8: 800
}

table.style.width = `${tableWidth[game.tableSize]}px`;

for (let i = 0; i< game.tableSize * game.tableSize; i++){
  const card = document.createElement("div");
  card.classList.add("cards");
  card.style.width = '80px';
  card.style.height = '80px';
  table.appendChild(card);
}
