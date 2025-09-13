// Configurações padrão do jogo
export const DEFAULT_GAME_CONFIG = {
  // Informações do usuário
  nome: '',
  telefone: '',
  email: '',
  senha: '',
  
  // Configurações da partida
  dimensoes: '4x4',
  modalidade: 'classica',
  
  // Configurações do jogo
  tempoSugerido: '2-3 minutos',
  
  // Configurações de interface
  tema: 'dark',
  animacoes: true
};

// Função para salvar configurações
export function saveGameConfig(config) {
  try {
    localStorage.setItem('gameConfig', JSON.stringify(config));
    return true;
  } catch (error) {
    console.error('Erro ao salvar configurações:', error);
    return false;
  }
}

// Função para carregar configurações
export function loadGameConfig() {
  try {
    const saved = localStorage.getItem('gameConfig');
    if (saved) {
      const config = JSON.parse(saved);
      console.log('Configurações carregadas:', config);
      return { ...DEFAULT_GAME_CONFIG, ...config };
    }
  } catch (error) {
    console.error('Erro ao carregar configurações:', error);
  }
  return DEFAULT_GAME_CONFIG;
}
