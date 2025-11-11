export function logRegister({
  gameId,
  playerName,
  resultStatus,
  moves,
  elapsedTime,
  date,
  tableSize,
  gameType,
}) {
  const logsDisplay = document.querySelector(".logs-display table tbody");

  const result = resultStatus == "victory" ? "Vitória" : "Derrota";
  const resultStyle =
    resultStatus == "victory" ? "result-victory" : "result-defeat";

  const register = document.createElement("tr");
  register.innerHTML = `
    <tr>
        <td>${gameId}</td>
        <td><span class="${resultStyle}">${result}</span></td>
        <td>${tableSize}x${tableSize}</td>
        <td>${gameType}</td>
        <td>${moves}</td>
        <td>${formatTime(elapsedTime)}</td>
        <td>${formatCustomDateTime((new Date()).toISOString())}</td>
    </tr>`;

  console.log("before append");
  logsDisplay.appendChild(register);
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (seconds == 0) {
    return `${minutes}m`;
  }
  return `${minutes}m${seconds}s`;
}

function formatCustomDateTime(isoString) {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}h${minutes}`;
}

export async function saveGame(gameData) {
  console.log(gameData);
  const body = JSON.stringify({
    gameType: gameData.game.modality,
    tableSize: gameData.game.tableSize,
    elapsedTime: gameData.elapsedSeconds,
    moves: gameData.moves,
    resultStatus: gameData.resultStatus,
    date: new Date().toISOString()
  })
  console.log(body);
  const response = await fetch('/memory-game-pweb/back-end/api/history', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body
  });
  
  const result = await response.json();
  console.log(result)
  // if (result.data) {
  //   logRegister(result.data);
  // }
}
