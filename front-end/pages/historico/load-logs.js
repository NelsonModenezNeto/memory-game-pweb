import { logRegister } from "./log-register.js";
// const logs = [
//   {
//     gameId: 1,
//     playerName: "hitallo",
//     resultStatus: "victory",
//     moves: 50,
//     elapsedTime: 600,
//     date: "2025-09-08 23h00",
//     tableSize: 8,
//     gameType: "Clássico"
//   },
//   {
//     gameId: 2,
//     playerName: "Junior",
//     resultStatus: "defeat",
//     moves: 20,
//     elapsedTime: 430,
//     date: "2025-09-08 23h00",
//     tableSize: 4,
//     gameType: "Contra o tempo"
//   },
//   {
//     gameId: 3,
//     playerName: "Junior",
//     resultStatus: "defeat",
//     moves: 20,
//     elapsedTime: 430,
//     date: "2025-09-08 23h00",
//     tableSize: 4,
//     gameType: "Contra o tempo"
//   },
//   {
//     gameId: 4,
//     playerName: "Junior",
//     resultStatus: "defeat",
//     moves: 20,
//     elapsedTime: 430,
//     date: "2025-09-08 23h00",
//     tableSize: 4,
//     gameType: "Contra o tempo"
//   },
//   {
//     gameId: 2,
//     playerName: "Junior",
//     resultStatus: "defeat",
//     moves: 20,
//     elapsedTime: 430,
//     date: "2025-09-08 23h00",
//     tableSize: 4,
//     gameType: "Contra o tempo"
//   },
//   {
//     gameId: 2,
//     playerName: "Junior",
//     resultStatus: "defeat",
//     moves: 20,
//     elapsedTime: 430,
//     date: "2025-09-08 23h00",
//     tableSize: 4,
//     gameType: "Contra o tempo"
//   },
//   {
//     gameId: 2,
//     playerName: "Junior",
//     resultStatus: "defeat",
//     moves: 20,
//     elapsedTime: 430,
//     date: "2025-09-08 23h00",
//     tableSize: 4,
//     gameType: "Contra o tempo"
//   },
//   {
//     gameId: 2,
//     playerName: "Junior",
//     resultStatus: "defeat",
//     moves: 20,
//     elapsedTime: 430,
//     date: "2025-09-08 23h00",
//     tableSize: 4,
//     gameType: "Contra o tempo"
//   },
//   {
//     gameId: 2,
//     playerName: "Junior",
//     resultStatus: "defeat",
//     moves: 20,
//     elapsedTime: 430,
//     date: "2025-09-08 23h00",
//     tableSize: 4,
//     gameType: "Contra o tempo"
//   },
//   {
//     gameId: 2,
//     playerName: "Junior",
//     resultStatus: "defeat",
//     moves: 20,
//     elapsedTime: 430,
//     date: "2025-09-08 23h00",
//     tableSize: 4,
//     gameType: "Contra o tempo"
//   },
//   {
//     gameId: 2,
//     playerName: "Junior",
//     resultStatus: "defeat",
//     moves: 20,
//     elapsedTime: 430,
//     date: "2025-09-08 23h00",
//     tableSize: 4,
//     gameType: "Contra o tempo"
//   },
//   {
//     gameId: 2,
//     playerName: "Junior",
//     resultStatus: "defeat",
//     moves: 20,
//     elapsedTime: 430,
//     date: "2025-09-08 23h00",
//     tableSize: 4,
//     gameType: "Contra o tempo"
//   },
//   {
//     gameId: 2,
//     playerName: "Junior",
//     resultStatus: "defeat",
//     moves: 20,
//     elapsedTime: 430,
//     date: "2025-09-08 23h00",
//     tableSize: 4,
//     gameType: "Contra o tempo"
//   },
//   {
//     gameId: 2,
//     playerName: "Junior",
//     resultStatus: "defeat",
//     moves: 20,
//     elapsedTime: 430,
//     date: "2025-09-08 23h00",
//     tableSize: 4,
//     gameType: "Contra o tempo"
//   },
//   {
//     gameId: 2,
//     playerName: "Junior",
//     resultStatus: "defeat",
//     moves: 20,
//     elapsedTime: 430,
//     date: "2025-09-08 23h00",
//     tableSize: 4,
//     gameType: "Contra o tempo"
//   },
//   {
//     gameId: 2,
//     playerName: "Junior",
//     resultStatus: "defeat",
//     moves: 20,
//     elapsedTime: 430,
//     date: "2025-09-08 23h00",
//     tableSize: 4,
//     gameType: "Contra o tempo"
//   },
//   {
//     gameId: 2,
//     playerName: "Junior",
//     resultStatus: "defeat",
//     moves: 20,
//     elapsedTime: 430,
//     date: "2025-09-08 23h00",
//     tableSize: 4,
//     gameType: "Contra o tempo"
//   },
//   {
//     gameId: 2,
//     playerName: "Junior",
//     resultStatus: "defeat",
//     moves: 20,
//     elapsedTime: 430,
//     date: "2025-09-08 23h00",
//     tableSize: 4,
//     gameType: "Contra o tempo"
//   },
// ];

// logs.forEach(log => {
//     logRegister(log);
// })
async function loadHistory() {
  try {
    const response = await fetch('/memory-game-pweb/back-end/api/history');
    const result = await response.json();
    console.log(result.data)
    if (result.data) {
      result.data.forEach(game => logRegister(game));
    }
    
  } catch (error) {
    
  }
}

function print () {
  console.log("teste");
}

print();
loadHistory();