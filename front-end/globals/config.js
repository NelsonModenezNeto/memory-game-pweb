const API_URL = "http://localhost/memory-game-pweb/back-end";

// Função para salvar configurações no localStorage
export function saveGameConfig(config) {
  try {
    const storedData = JSON.parse(localStorage.getItem('game')) || {};

    const updatedData = { ...storedData, ...config };

    localStorage.setItem('game', JSON.stringify(updatedData));

    return true;
  } catch (error) {
    console.error('Erro ao salvar configurações:', error);
    return false;
  }
}

// Função para carregar configurações do localStorage
export function loadGameConfig() {
  try {
    const saved = localStorage.getItem('game');
    if (saved) {
      const config = JSON.parse(saved);
      console.log('Configurações carregadas:', config);
      return config;
    }
  } catch (error) {
    console.error('Erro ao carregar configurações:', error);
  }
}

// Função para salvar configurações de jogo no servidor
export async function saveGameConfigToServer(config) {
  try {
    const { dimension, modality } = config;
    
    if (!dimension || !modality) {
      console.error('Dimensão e modalidade são obrigatórias');
      return false;
    }

    const response = await fetch(`${API_URL}/game/config`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dimension: dimension,
        modality: modality
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Erro na requisição: ${response.status}`);
    }

    const result = await response.json();
    console.log('Configurações salvas no servidor:', result);
    return true;
  } catch (error) {
    console.error('Erro ao salvar configurações no servidor:', error);
    return false;
  }
}

// Função para carregar configurações de jogo do servidor
export async function loadGameConfigFromServer() {
  try {
    const response = await fetch(`${API_URL}/game/config`, {
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
      console.error('Erro ao carregar configurações:', result.error);
      return null;
    }

    return result.data || null;
  } catch (error) {
    console.error('Erro ao carregar configurações do servidor:', error);
    return null;
  }
}
