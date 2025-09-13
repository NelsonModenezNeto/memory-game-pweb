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
