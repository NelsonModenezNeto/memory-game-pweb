// Dicionário centralizado com imagens e sons
const cardDictionary = {
  "mario": {
    image: "assets/card_images/bald_mario.png",
    sound: "super-mario-death-sound-sound-effect.mp3"
  },
  "geralt": {
    image: "assets/card_images/geralt_meme.png",
    sound: "geralt_soitbegins.mp3"
  },
  "plankton": {
    image: "assets/card_images/plankton_meme.png",
    sound: "plankton-oooooh.mp3"
  },
  "goku": {
    image: "assets/card_images/serious_goku_meme.png",
    sound: "oi-eu-sou-goku.mp3"
  },
  "sonic": {
    image: "assets/card_images/shocked_sonic.png",
    sound: "sega-hd.mp3"
  },
  "gru": {
    image: "assets/card_images/gru-henning.jpeg",
    sound: "voce-e-careca.mp3"
  },
  "shrek": {
    image: "assets/card_images/shrek.jpg",
    sound: "faz-o-urro_3BwvHjc.mp3"
  },
  "stonks": {
    image: "assets/card_images/stonks.png",
    sound: "different-variations-for-stonks-sound-effect.mp3"
  },
  "heisenberg": {
    image: "assets/card_images/breaking_bad.png",
    sound: "youre-goddamn-right.mp3"
  },
  "pix":{
    image: "assets/card_images/pix.png",
    sound: "e-o-pix-nada-ainda.mp3"
  },
  "werewolf": {
    image: "assets/card_images/werewolf.png",
    sound: "werewolf-howling-sfx.mp3"
  },
  "nice": {
    image: "assets/card_images/nice.png",
    sound: "-click-nice.mp3" 
  },
  "kratos": {
    image: "assets/card_images/kratos.png",
    sound: "ares_8E1uEzn.mp3"
  },
  "win_xp": {
    image: "assets/card_images/win_xp.png",
    sound: "erro.mp3"
  },
  "tech": {
    image: "assets/card_images/tech.png",
    sound: "123444.mp3"
  },
  "wow": {
    image: "assets/card_images/wow.png",
    sound: "greenscreen-wow.mp3"
  },
  "let_him_cook": {
    image: "assets/card_images/let_him_cook.png",
    sound: "let-him-cook_vwv2ZJq.mp3"
  },
  "vegeta": {
    image: "assets/card_images/vegeta.png",
    sound: "8000.mp3"
  },
  "spider_pizza": {
    image: "assets/card_images/spider_pizza.png",
    sound: "mp3_e9ca8310-8d3f-11e9-9016-8b78caf46556.mp3"
  },
  "bald_batman": {
    image: "assets/card_images/bald_batman.png",
    sound : "im-batman.mp3"
  },
  "homer": {
    image: "assets/card_images/homer.png",
    sound : "doh_r4RZcVw.mp3"
  },
  "papaco": {
    image: "assets/card_images/papaco.png",
    sound: "ate-um-outro-dia_CyY3XQi.mp3"
  },
  "pelé": {
    image: "assets/card_images/pelé.png",
    sound : "meu-filme_50.mp3"
  },
  "kowalski": {
    image: "assets/card_images/kowalski.png",
    sound: "meme-recruta-relatorio.mp3"
  },
  "apodreca": {
    image: "assets/card_images/apodreca.png",
    sound: "greenscreen-wow.mp3"
  },
  "baguio_doido": {
    image: "assets/card_images/baguio_doido.png",
    sound: "greenscreen-wow.mp3"
  },
  "calabreso": {
    image: "assets/card_images/calabreso.png",
    sound: "greenscreen-wow.mp3"
  },
  "cj": {
    image: "assets/card_images/cj.png",
    sound: "greenscreen-wow.mp3"
  },
  "confia": {
    image: "assets/card_images/confia.png",
    sound: "greenscreen-wow.mp3"
  },
  "genius": {
    image: "assets/card_images/genius.jpg",
    sound: "greenscreen-wow.mp3"
  },
  "la_paloma": {
    image: "assets/card_images/la_paloma.png",
    sound: "greenscreen-wow.mp3"
  },
  "mao_cena": {
    image: "assets/card_images/mao_cena.png",
    sound: "greenscreen-wow.mp3"
  },
  "nazare": {
    image: "assets/card_images/nazare.png",
    sound: "greenscreen-wow.mp3"
  },
};

const pathSound = "https://www.myinstants.com/media/sounds/";

// HTML elements
const btnJoker = document.querySelector("#joker-all-cards");
const btnJokerBackGame = document.querySelector("#joker-back-game");
const table = document.querySelector(".tabuleiro");
const game = JSON.parse(localStorage.getItem("game"));
const gameConfig = JSON.parse(localStorage.getItem("gameConfig"));

// Variáveis de controle do jogo
let flippedCards = [];
let isChecking = false;
let matchedPairs = 0;
let moves = 0;
let cardMapping = {}; // Mapeia a imagem para a chave do dicionário

// Função para obter as cartas embaralhadas
function getCardImages(game, dictionary) {
  const numberOfPairs = (game.tableSize * game.tableSize) / 2;
  const keys = Object.keys(dictionary);
  
  // Seleciona aleatoriamente as chaves necessárias
  const selectedKeys = keys.sort(() => Math.random() - 0.5).slice(0, numberOfPairs);
  
  // Cria pares duplicados
  const pairs = [...selectedKeys, ...selectedKeys];
  
  // Embaralha os pares
  return pairs.sort(() => Math.random() - 0.5);
}

const cardKeys = getCardImages(game, cardDictionary);

// Joker section
let areCardsRevealed = false;
document.addEventListener("DOMContentLoaded", () => {
  btnJoker.addEventListener("click", () => {
    if (areCardsRevealed) {
      btnJoker.removeAttribute("disabled");
      btnJoker.classList.remove("cheat-active");
      areCardsRevealed = false;
      backToGame();
      return;
    }
    btnJoker.classList.add("cheat-active");
    revealAllCards();
    areCardsRevealed = true;
  });

  btnJokerBackGame.addEventListener("click", () => {
    btnJoker.classList.remove("cheat-active");
    backToGame();
    areCardsRevealed = false;
  });
});

const tableWidth = {
  2: 230,
  4: 420,
  6: 620,
  8: 800,
};

table.style.width = `${tableWidth[game.tableSize]}px`;

// Criar as cartas
for (let i = 0; i < game.tableSize * game.tableSize; i++) {
  const card = document.createElement("div");
  const cardKey = cardKeys[i];
  
  card.classList.add("cards");
  card.style.width = "80px";
  card.style.height = "80px";
  
  // Define a imagem usando o dicionário
  card.style.backgroundImage = `url('../../${cardDictionary[cardKey].image}')`;
  
  // Armazena a chave do dicionário no elemento para fácil acesso
  card.dataset.cardKey = cardKey;
  
  card.addEventListener("click", () => handleCardClick(card));
  
  table.appendChild(card);
}

// Função para verificar se duas cartas são iguais
function checkMatch(card1, card2) {
  return card1.dataset.cardKey === card2.dataset.cardKey;
}

// Função para fechar cartas após um delay
function closeCards(card1, card2) {
  setTimeout(() => {
    card1.classList.remove("revealed");
    card2.classList.remove("revealed");
    isChecking = false;
  }, 700);
}

function markAsMatched(card1, card2) {
  setTimeout(() => {
    card1.classList.add("matched");
    card2.classList.add("matched");
    
    // Obtém o som usando a chave do dicionário
    const cardKey = card1.dataset.cardKey;
    const soundFile = cardDictionary[cardKey].sound;
    const soundPath = pathSound + soundFile;
    
    const sound = new Audio(soundPath);
    sound.play().catch(err => console.log("Erro ao tocar som:", err));
    
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
  // Impede cliques na carta
  if (
    isChecking ||
    card.classList.contains("revealed") ||
    card.classList.contains("matched")
  ) {
    return;
  }

  card.classList.add("revealed");
  flippedCards.push(card);

  // Se duas cartas já foram viradas
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