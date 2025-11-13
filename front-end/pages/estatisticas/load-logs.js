import { logRegister } from "./log-register.js";

const API_URL = "http://localhost/memory-game-pweb/back-end";

async function loadAllHistory() {
  try {
    const response = await fetch(`${API_URL}/api/history/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.error) {
      console.error('Erro ao carregar histórico:', result.error);
      const tbody = document.querySelector(".logs-display table tbody");
      if (tbody) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; color: red; padding: 2rem;">Erro ao carregar histórico de partidas.</td></tr>';
      }
      return;
    }

    const logs = result.data || [];

    if (logs.length === 0) {
      const tbody = document.querySelector(".logs-display table tbody");
      if (tbody) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; color: white; padding: 2rem;">Nenhuma partida registrada ainda.</td></tr>';
      }
      return;
    }

    // Limpa o conteúdo anterior
    const tbody = document.querySelector(".logs-display table tbody");
    if (tbody) {
      tbody.innerHTML = '';
    }

    // Renderiza cada log
    logs.forEach((log) => {
      logRegister({
        gameId: log.gameId,
        playerName: log.playerName || 'Jogador',
        resultStatus: log.resultStatus || 'defeat',
        moves: log.moves || 0,
        elapsedTime: log.elapsedTime || 0,
        date: log.date || new Date().toISOString(),
        tableSize: log.tableSize || 4,
        gameType: log.gameType || 'Clássico'
      });
    });
  } catch (error) {
    console.error('Erro ao carregar histórico:', error);
    const tbody = document.querySelector(".logs-display table tbody");
    if (tbody) {
      tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; color: red; padding: 2rem;">Erro ao carregar histórico. Tente novamente mais tarde.</td></tr>';
    }
  }
}

// Carrega o histórico quando o script é executado
loadAllHistory();
