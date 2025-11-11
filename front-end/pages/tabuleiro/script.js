import { logRegister, saveGame } from "../historico/log-register.js";
import { cardDictionary } from "./cardsData.js";
// ============================================================================
// SEÇÃO 1: CONFIGURAÇÕES E CONSTANTES
// ============================================================================


// Dicionário

// Configuração de tempo
const timeByTableSize = {
  2: 25, // 25 segundos
  4: 90, //  1 minuto e meio
  6: 240, // 4 minutos
  8: 360, // 6 minutos
};

// Configuração de largura do tabuleiro por tamanho
const tableWidth = {
  2: 230,
  4: 420,
  6: 620,
  8: 640,
};


// URL base para os sons
const pathSound = "https://www.myinstants.com/media/sounds/";

// -------------------------------------------------------------------------
// SEÇÃO 2: VARIÁVEIS GLOBAIS E ELEMENTOS DOM
// ----------------------------------------------------------------------------

// Elementos HTML
const btnJoker = document.querySelector("#joker-all-cards");
const btnJokerBackGame = document.querySelector("#joker-back-game");
const table = document.querySelector(".tabuleiro");
const game = JSON.parse(localStorage.getItem("game"));
const cardSize = game.tableSize == 8 ? "60px" : "80px"; 

// Variáveis de controle do jogo
let flippedCards = [];
let isChecking = false;
let matchedPairs = 0;
let moves = 0;
let cardMapping = {}; // Mapeia a imagem para a chave do dicionário
let areCardsRevealed = false;

// Variáveis do timer
let timerInterval = null;
let timerStarted = false;
let elapsedSeconds = 0; // Para modalidade clássica
let remainingSeconds = 0; // Para modalidade contra o tempo

// -------------------------------------------------------------------------
// SEÇÃO 3: FUNÇÕES DE TIMER
// -------------------------------------------------------------------------

/**
 * Formata segundos em formato MM:SS
 * @param {number} seconds - Segundos a formatar
 * @returns {string} Tempo formatado (ex: "02:35")
 */
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

/**
 * Inicia o timer baseado na modalidade do jogo
 * - Modo Clássico: Timer crescente
 * - Modo Contra o Tempo: Timer regressivo
 */
function startTimer() {
  if (timerStarted) return; // Evita iniciar o timer múltiplas vezes

  timerStarted = true;

  if (game.modality === "classica") {
    // Modo Clássico: Timer crescente
    const currentTimeEl = document.getElementById("current-time");
    if (!currentTimeEl) return;

    timerInterval = setInterval(() => {
      elapsedSeconds++;
      currentTimeEl.textContent = formatTime(elapsedSeconds);
    }, 1000);
  } else if (game.modality === "contra-tempo") {
    // Modo Contra o Tempo: Timer regressivo
    const remainingTimeEl = document.getElementById("remaining-time");
    if (!remainingTimeEl) return;

    // Define o tempo inicial baseado no tamanho do tabuleiro
    remainingSeconds = timeByTableSize[game.tableSize] || 180; // Fallback: 3 minutos
    remainingTimeEl.textContent = formatTime(remainingSeconds);

    timerInterval = setInterval(() => {
      remainingSeconds--;
      remainingTimeEl.textContent = formatTime(remainingSeconds);

      // Se o tempo acabou, o jogador perde
      if (remainingSeconds <= 0) {
        stopTimer();
        endGame(false); // Derrota por tempo
      }
    }, 1000);
  }
}

/**
 * Para o timer atual
 */
function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

// -------------------------------------------------------------------------
// SEÇÃO 4: FUNÇÕES DE CONTROLE DO JOGO
// -------------------------------------------------------------------------

/**
 * Finaliza o jogo (vitória ou derrota)
 * @param {boolean} isVictory - true para vitória, false para derrota
 */
function endGame(isVictory) {
  stopTimer();
  table.style.pointerEvents = "none"; // Bloqueia o tabuleiro

  setTimeout(() => {
    if (isVictory) {
      let timeMessage = "";

      if (timerStarted && game.modality === "classica") {
        timeMessage = ` em ${formatTime(elapsedSeconds)}`;
      } else if (timerStarted && game.modality === "contra-tempo") {
        timeMessage = ` com ${formatTime(remainingSeconds)} restantes`;
      }

      alert(
        `🎉 Parabéns! Você completou o jogo em ${moves} jogadas${timeMessage}!`
      );
    } else {
      alert("⏰ O tempo acabou! Você perdeu.");
    }

    const resultStatus = isVictory ? 1 : 0;
    const gameRegister = {game, timerInterval, timerStarted, moves, elapsedSeconds, remainingSeconds, resultStatus};
    try {
      saveGame(gameRegister);
    } catch (error) {
      console.log(error)
    }
    // Exibe botão "Jogar Novamente"
    const playAgainBtn = document.getElementById("play-again-btn");
    if (playAgainBtn) {
      playAgainBtn.style.display = "block";
    }
  }, 500);
}

/**
 * Reinicia o jogo completamente
 * - Reseta variáveis
 * - Limpa o tabuleiro
 * - Cria novas cartas embaralhadas
 */
function resetGame() {
  // Reseta todas as variáveis do jogo
  flippedCards = [];
  isChecking = false;
  matchedPairs = 0;
  moves = 0;
  timerStarted = false;
  elapsedSeconds = 0;
  remainingSeconds = 0;

  // Reseta o timer
  stopTimer();

  // Reseta o contador de jogadas
  const moveCounter = document.getElementById("move-count");
  if (moveCounter) {
    moveCounter.textContent = "0";
  }

  // Reseta os timers no display
  const currentTimeEl = document.getElementById("current-time");
  const remainingTimeEl = document.getElementById("remaining-time");
  if (currentTimeEl) currentTimeEl.textContent = "00:00";
  if (remainingTimeEl) remainingTimeEl.textContent = "--:--";

  // Esconde o botão de jogar novamente
  const playAgainBtn = document.getElementById("play-again-btn");
  if (playAgainBtn) {
    playAgainBtn.style.display = "none";
  }

  // Remove todas as cartas
  table.innerHTML = "";
  table.style.pointerEvents = "auto"; // Desbloqueia o tabuleiro

  // Gera novas cartas embaralhadas
  const cardKeys = getCardImages(game, cardDictionary);

  // Recria as cartas
  for (let i = 0; i < game.tableSize * game.tableSize; i++) {
    const card = document.createElement("div");
    const cardKey = cardKeys[i];

    card.classList.add("cards");
    card.style.width = cardSize;
    card.style.height = cardSize;

    card.style.backgroundImage = `url('../../${cardDictionary[cardKey].image}')`;
    card.dataset.cardKey = cardKey;

    card.addEventListener("click", () => handleCardClick(card));

    table.appendChild(card);
  }
}

/**
 * Gera array de cartas embaralhadas para o jogo
 * @param {Object} game - Configuração do jogo
 * @param {Object} dictionary - Dicionário de cartas
 * @returns {Array} Array de chaves de cartas embaralhadas
 */
function getCardImages(game, dictionary) {
  const numberOfPairs = (game.tableSize * game.tableSize) / 2;
  const keys = Object.keys(dictionary);

  // Seleciona aleatoriamente as chaves necessárias
  const selectedKeys = keys
    .sort(() => Math.random() - 0.5)
    .slice(0, numberOfPairs);

  // Cria pares duplicados
  const pairs = [...selectedKeys, ...selectedKeys];

  // Embaralha os pares
  return pairs.sort(() => Math.random() - 0.5);
}

// -------------------------------------------------------------------------
// SEÇÃO 5: FUNÇÕES DE MECÂNICA DAS CARTAS
// -------------------------------------------------------------------------

/**
 * Verifica se duas cartas são iguais (formam um par)
 * @param {HTMLElement} card1 - Primeira carta
 * @param {HTMLElement} card2 - Segunda carta
 * @returns {boolean} true se formam par, false caso contrário
 */
function checkMatch(card1, card2) {
  return card1.dataset.cardKey === card2.dataset.cardKey;
}

/**
 * Fecha duas cartas após um delay (quando não são um par)
 * @param {HTMLElement} card1 - Primeira carta
 * @param {HTMLElement} card2 - Segunda carta
 */
function closeCards(card1, card2) {
  setTimeout(() => {
    card1.classList.remove("revealed");
    card2.classList.remove("revealed");
    isChecking = false;
  }, 700);
}

/**
 * Marca duas cartas como par encontrado
 * @param {HTMLElement} card1 - Primeira carta
 * @param {HTMLElement} card2 - Segunda carta
 */
function markAsMatched(card1, card2) {
  setTimeout(() => {
    card1.classList.add("matched");
    card2.classList.add("matched");

    // Obtém o som usando a chave do dicionário
    const cardKey = card1.dataset.cardKey;
    const soundFile = cardDictionary[cardKey].sound;
    const soundPath = pathSound + soundFile;12

    const sound = new Audio(soundPath);
    sound.play().catch((err) => console.log("Erro ao tocar som:", err));

    matchedPairs++;
    isChecking = false;

    if (matchedPairs === (game.tableSize * game.tableSize) / 2) {
      endGame(true); // Vitória
    }
  }, 600);
}

/**
 * Gerencia o clique em uma carta (função principal do jogo)
 * @param {HTMLElement} card - Carta clicada
 */
function handleCardClick(card) {
  // Impede cliques na carta
  if (
    isChecking ||
    card.classList.contains("revealed") ||
    card.classList.contains("matched")
  ) {
    return;
  }

  // Inicia o timer no primeiro clique
  if (
    !timerStarted &&
    (game.modality === "classica" || game.modality === "contra-tempo")
  ) {
    startTimer();
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

// -------------------------------------------------------------------------
// SEÇÃO 6: FUNÇÕES DE TRAPAÇAS (CHEATS)
// -------------------------------------------------------------------------

/**
 * Revela todas as cartas do tabuleiro (trapaça)
 */
function revealAllCards() {
  const allCards = document.querySelectorAll(".cards");
  if (!allCards) {
    return;
  }

  allCards.forEach((card) => {
    card.classList.add("revealed");
  });
}

/**
 * Esconde as cartas reveladas pela trapaça (volta ao jogo normal)
 */
function backToGame() {
  const allCards = document.querySelectorAll(".cards");
  if (!allCards) {
    return;
  }

  allCards.forEach((card) => {
    card.classList.remove("revealed");
  });
}

// -------------------------------------------------------------------------
// SEÇÃO 7: INICIALIZAÇÃO DO JOGO
// -------------------------------------------------------------------------

// Gera cartas iniciais
const cardKeys = getCardImages(game, cardDictionary);

// Configura largura do tabuleiro
table.style.width = `${tableWidth[game.tableSize]}px`;

// Cria as cartas no tabuleiro
for (let i = 0; i < game.tableSize * game.tableSize; i++) {
  const card = document.createElement("div");
  const cardKey = cardKeys[i];

  card.classList.add("cards");
  console.log(cardSize)
  card.style.width = cardSize;
  card.style.height = cardSize;
  


  // Define a imagem usando o dicionário
  card.style.backgroundImage = `url('../../${cardDictionary[cardKey].image}')`;

  // Armazena a chave do dicionário no elemento para fácil acesso
  card.dataset.cardKey = cardKey;

  card.addEventListener("click", () => handleCardClick(card));

  table.appendChild(card);
}

// -------------------------------------------------------------------------
// SEÇÃO 8: EVENT LISTENERS E CONFIGURAÇÕES INICIAIS
// -------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  // Configura a visibilidade dos timers baseado na modalidade
  const currentTimeContainer =
    document.getElementById("current-time")?.parentElement;
  const remainingTimeContainer =
    document.getElementById("remaining-time")?.parentElement;

  if (game.modality === "classica") {
    // Modalidade clássica: mostra tempo atual, esconde tempo restante
    if (currentTimeContainer) currentTimeContainer.style.display = "flex";
    if (remainingTimeContainer) remainingTimeContainer.style.display = "none";
  } else if (game.modality === "contra-tempo") {
    // Modalidade contra o tempo: esconde tempo atual, mostra tempo restante
    if (currentTimeContainer) currentTimeContainer.style.display = "none";
    if (remainingTimeContainer) remainingTimeContainer.style.display = "flex";
  } else {
    // Outras modalidades: esconde ambos
    if (currentTimeContainer) currentTimeContainer.style.display = "none";
    if (remainingTimeContainer) remainingTimeContainer.style.display = "none";
  }

  // Event listener para botão de trapaça "Ver as cartas"
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

  // Event listener para botão de trapaça "Volte ao jogo"
  btnJokerBackGame.addEventListener("click", () => {
    btnJoker.classList.remove("cheat-active");
    backToGame();
    areCardsRevealed = false;
  });

  // Event listener para o botão "Jogar Novamente"
  const playAgainBtn = document.getElementById("play-again-btn");
  if (playAgainBtn) {
    playAgainBtn.addEventListener("click", () => {
      resetGame();
    });
  }
});
