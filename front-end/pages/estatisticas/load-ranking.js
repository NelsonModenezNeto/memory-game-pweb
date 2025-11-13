import { rankingCardComponent } from "./ranking-card.js";

const API_URL = "http://localhost/memory-game-pweb/back-end";

// URL padrão para avatar (pode ser substituída por avatar do usuário quando disponível)
const DEFAULT_AVATAR_URL = "https://images.vexels.com/media/users/3/299732/isolated/preview/5dac6b08d491d0d1116f0ba1fe27fa54-trofeu-de-ouro-numero-1.png";

async function loadRanking() {
  try {
    const response = await fetch(`${API_URL}/ranking`, {
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
      console.error('Erro ao carregar ranking:', result.error);
      return;
    }

    const players = result.data || [];

    if (players.length === 0) {
      const rankingContent = document.querySelector(".ranking-display .content");
      if (rankingContent) {
        rankingContent.innerHTML = '<p style="color: white; text-align: center; padding: 2rem;">Nenhum jogador no ranking ainda.</p>';
      }
      return;
    }

    // Ordena por pontos (já vem ordenado do backend, mas garantimos)
    const sorted = players.sort((a, b) => b.points - a.points);

    // Limpa o conteúdo anterior
    const rankingContent = document.querySelector(".ranking-display .content");
    if (rankingContent) {
      rankingContent.innerHTML = '';
    }

    // Renderiza cada jogador
    sorted.forEach((player, index) => {
      rankingCardComponent({
        position: index + 1,
        username: player.username || player.name || 'Jogador',
        avatarUrl: DEFAULT_AVATAR_URL,
        points: player.points || 0
      });
    });
  } catch (error) {
    console.error('Erro ao carregar ranking:', error);
    const rankingContent = document.querySelector(".ranking-display .content");
    if (rankingContent) {
      rankingContent.innerHTML = '<p style="color: red; text-align: center; padding: 2rem;">Erro ao carregar ranking. Tente novamente mais tarde.</p>';
    }
  }
}

// Carrega o ranking quando o script é executado
loadRanking();

