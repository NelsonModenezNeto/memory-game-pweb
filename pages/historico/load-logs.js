import { logRegister } from "./log-register.js";

const logs = [
  {
    gameId: 1,
    playerName: "hitallo",
    resultStatus: "victory",
    moves: 50,
    elapsedTime: 600,
    date: "2025-09-08 23h00",
    tableSize: 8,
    gameType: "Clássico"
  },
  {
    gameId: 2,
    playerName: "Junior",
    resultStatus: "defeat",
    moves: 20,
    elapsedTime: 430,
    date: "2025-09-08 23h00",
    tableSize: 4,
    gameType: "Contra o tempo"
  },
  {
    gameId: 3,
    playerName: "Junior",
    resultStatus: "defeat",
    moves: 20,
    elapsedTime: 430,
    date: "2025-09-08 23h00",
    tableSize: 4,
    gameType: "Contra o tempo"
  },
  {
    gameId: 4,
    playerName: "Junior",
    resultStatus: "defeat",
    moves: 20,
    elapsedTime: 430,
    date: "2025-09-08 23h00",
    tableSize: 4,
    gameType: "Contra o tempo"
  },
  {
    gameId: 2,
    playerName: "Junior",
    resultStatus: "defeat",
    moves: 20,
    elapsedTime: 430,
    date: "2025-09-08 23h00",
    tableSize: 4,
    gameType: "Contra o tempo"
  },
  {
    gameId: 2,
    playerName: "Junior",
    resultStatus: "defeat",
    moves: 20,
    elapsedTime: 430,
    date: "2025-09-08 23h00",
    tableSize: 4,
    gameType: "Contra o tempo"
  },
  {
    gameId: 2,
    playerName: "Junior",
    resultStatus: "defeat",
    moves: 20,
    elapsedTime: 430,
    date: "2025-09-08 23h00",
    tableSize: 4,
    gameType: "Contra o tempo"
  },
  {
    gameId: 2,
    playerName: "Junior",
    resultStatus: "defeat",
    moves: 20,
    elapsedTime: 430,
    date: "2025-09-08 23h00",
    tableSize: 4,
    gameType: "Contra o tempo"
  },
  {
    gameId: 2,
    playerName: "Junior",
    resultStatus: "defeat",
    moves: 20,
    elapsedTime: 430,
    date: "2025-09-08 23h00",
    tableSize: 4,
    gameType: "Contra o tempo"
  },
  {
    gameId: 2,
    playerName: "Junior",
    resultStatus: "defeat",
    moves: 20,
    elapsedTime: 430,
    date: "2025-09-08 23h00",
    tableSize: 4,
    gameType: "Contra o tempo"
  },
  {
    gameId: 2,
    playerName: "Junior",
    resultStatus: "defeat",
    moves: 20,
    elapsedTime: 430,
    date: "2025-09-08 23h00",
    tableSize: 4,
    gameType: "Contra o tempo"
  },
  {
    gameId: 2,
    playerName: "Junior",
    resultStatus: "defeat",
    moves: 20,
    elapsedTime: 430,
    date: "2025-09-08 23h00",
    tableSize: 4,
    gameType: "Contra o tempo"
  },
  {
    gameId: 2,
    playerName: "Junior",
    resultStatus: "defeat",
    moves: 20,
    elapsedTime: 430,
    date: "2025-09-08 23h00",
    tableSize: 4,
    gameType: "Contra o tempo"
  },
  {
    gameId: 2,
    playerName: "Junior",
    resultStatus: "defeat",
    moves: 20,
    elapsedTime: 430,
    date: "2025-09-08 23h00",
    tableSize: 4,
    gameType: "Contra o tempo"
  },
  {
    gameId: 2,
    playerName: "Junior",
    resultStatus: "defeat",
    moves: 20,
    elapsedTime: 430,
    date: "2025-09-08 23h00",
    tableSize: 4,
    gameType: "Contra o tempo"
  },
  {
    gameId: 2,
    playerName: "Junior",
    resultStatus: "defeat",
    moves: 20,
    elapsedTime: 430,
    date: "2025-09-08 23h00",
    tableSize: 4,
    gameType: "Contra o tempo"
  },
  {
    gameId: 2,
    playerName: "Junior",
    resultStatus: "defeat",
    moves: 20,
    elapsedTime: 430,
    date: "2025-09-08 23h00",
    tableSize: 4,
    gameType: "Contra o tempo"
  },
  {
    gameId: 2,
    playerName: "Junior",
    resultStatus: "defeat",
    moves: 20,
    elapsedTime: 430,
    date: "2025-09-08 23h00",
    tableSize: 4,
    gameType: "Contra o tempo"
  },
];

logs.forEach(log => {
    logRegister(log);
})