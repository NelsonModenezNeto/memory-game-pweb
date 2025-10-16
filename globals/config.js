// Função para salvar configurações
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

// Função para carregar configurações
export function loadGameConfig() {
  try {
    const saved = localStorage.getItem('game');
    if (saved) {
      const config = JSON.parse(saved);
      console.log('Configurações carregadas:', config);
      return config ;
    }
  } catch (error) {
    console.error('Erro ao carregar configurações:', error);
  }
}
