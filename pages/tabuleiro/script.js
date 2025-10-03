// só adicionar o caminho no array abaixo.
let images = [
  "assets/card_images/bald_mario.png",
  "assets/card_images/geralt_meme.png",
  "assets/card_images/plankton_meme.png",
  "assets/card_images/serious_goku_meme.png",
  "assets/card_images/shocked_sonic.png",
];
//html elements
const btnJoker = document.querySelector("#joker-all-cards");
const btnJokerBackGame = document.querySelector("#joker-back-game");
const table = document.querySelector(".tabuleiro");
const game = JSON.parse(localStorage.getItem("game"));
const cardImages = getCardImages(game, images);

// Variáveis de controle do jogo
let flippedCards = [];
let isChecking = false;
let matchedPairs = 0;
let moves = 0;

function getCardImages(game, images) {
  let selected = images
    .sort(() => Math.random() - 0.5)
    .slice(0, game.tableSize);

  let pairs = [...selected, ...selected];

  return pairs.sort(() => Math.random() - 0.5);
}

//Joker section
document.addEventListener("DOMContentLoaded", () => {
  btnJoker.addEventListener("click", () => {
    btnJoker.classList.add("cheat-active");
    revealAllCards();
  });

  btnJokerBackGame.addEventListener("click", () => {
    btnJoker.classList.remove("cheat-active");
    backToGame();
  });
});

const tableWidth = {
  2: 230,
  4: 420,
  8: 800,
};

table.style.width = `${tableWidth[game.tableSize]}px`;

for (let i = 0; i < game.tableSize * game.tableSize; i++) {
  const card = document.createElement("div");
  card.classList.add("cards");
  card.style.width = "80px";
  card.style.height = "80px";

  card.style.backgroundImage = `url('../../${cardImages[i]}')`;

  card.addEventListener("click", () => handleCardClick(card));

  table.appendChild(card);
}

// função para verificar se duas cartas são iguais
function checkMatch(card1, card2) {
  const image1 = card1.style.backgroundImage;
  const image2 = card2.style.backgroundImage;
  return image1 === image2;
}

// função para fechar cartas após um delay
function closeCards(card1, card2) {
  setTimeout(() => {
    card1.classList.remove("revealed");
    card2.classList.remove("revealed");
    isChecking = false;
  }, 700); // 0.7 segundo para o jogador ver as cartas
}

function markAsMatched(card1, card2) {
  setTimeout(() => {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedPairs++;
    isChecking = false;

    if (matchedPairs === (game.tableSize * game.tableSize) / 2) {
      setTimeout(() => {
        alert(`Parabéns! Você completou o jogo em ${moves} jogadas!`);
      }, 500);
    }
  }, 600);
}

function handleCardClick(card) {
  // impede cliques na carta
  if (
    isChecking ||
    card.classList.contains("revealed") ||
    card.classList.contains("matched")
  ) {
    return;
  }

  card.classList.add("revealed");
  flippedCards.push(card);

  // se duas cartas já foram checadas
  if (flippedCards.length === 2) {
    isChecking = true;
    moves++;

    const moveCounter = document.getElementById("move-count");
    if (moveCounter) {
      moveCounter.textContent = moves;
    }

    const [card1, card2] = flippedCards;

    if (checkMatch(card1, card2)) {
      markAsMatched(card1, card2);
    } else {
      closeCards(card1, card2);
    }

    flippedCards = [];
  }
}

function revealAllCards() {
  const allCards = document.querySelectorAll(".cards");
  if (!allCards) {
    return;
  }

  allCards.forEach((card) => {
    card.classList.add("revealed");
  });
}

function backToGame() {
  const allCards = document.querySelectorAll(".cards");
  if (!allCards) {
    return;
  }

  allCards.forEach((card) => {
    card.classList.remove("revealed");
  });
}
