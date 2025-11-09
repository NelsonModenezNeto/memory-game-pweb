import { saveGameConfig, loadGameConfig, saveGameConfigToServer, loadGameConfigFromServer } from '../../globals/config.js';

document.addEventListener('DOMContentLoaded', function() {
  const nextButton = document.getElementById("nextBtn");
  const prevButton = document.getElementById("prevBtn");
  const dots = document.querySelectorAll('.dot');
  const slides = document.querySelectorAll('.carousel-slide');
  const backArrow = document.getElementById('back-arrow');
  
  let currentSlide = 0;
  const totalSlides = slides.length;

  if (!nextButton || !prevButton || !slides.length || !dots.length) {
    console.error('Elementos do carrossel não encontrados');
    return;
  }

  function handleChangeSlide(slideIndex) {
    if (slideIndex < 0 || slideIndex >= totalSlides) {
      console.error('Índice de slide inválido:', slideIndex);
      return;
    }

    if (slideIndex === currentSlide) return;

    slides.forEach(slide => slide.classList.remove('active', 'prev', 'next'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    const direction = slideIndex > currentSlide ? 'next' : 'prev';
    
    if (direction === 'next') {
      slides[currentSlide].classList.add('prev');
      slides[slideIndex].classList.add('next');
    } else {
      slides[currentSlide].classList.add('next');
      slides[slideIndex].classList.add('prev');
    }
    
    setTimeout(() => {
      slides.forEach(slide => slide.classList.remove('prev', 'next'));
      slides[slideIndex].classList.add('active');
    }, 50);
    
    if (dots[slideIndex]) {
      dots[slideIndex].classList.add('active');
    }
    
    currentSlide = slideIndex;
    
    if (slideIndex === 0) {
      prevButton.style.display = 'none';
      nextButton.style.display = 'block';
    } else if (slideIndex === totalSlides - 1) {
      prevButton.style.display = 'block';
      nextButton.style.display = 'none';
    } else {
      prevButton.style.display = 'block';
      nextButton.style.display = 'block';
    }
  }

  // Event listeners do carrossel
  prevButton.addEventListener('click', () => {
    if (currentSlide > 0) handleChangeSlide(currentSlide - 1);
  });

  nextButton.addEventListener('click', () => {
    if (currentSlide < totalSlides - 1) handleChangeSlide(currentSlide + 1);
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => handleChangeSlide(index));
  });

  // Inicialização do carrossel
  slides.forEach((slide, index) => {
    slide.classList.remove('active');
    if (index === 0) slide.classList.add('active');
  });
  
  dots.forEach((dot, index) => {
    dot.classList.remove('active');
    if (index === 0) dot.classList.add('active');
  });
  
  prevButton.style.display = 'none';
  nextButton.style.display = 'block';

  // Configurações do formulário
  const dimensoesRadios = document.querySelectorAll('input[name="dimensoes"]');
  const tempoSugerido = document.getElementById('tempo-sugerido');
  
  const temposSugeridos = {
    '4': '2-3 minutos',
    '6': '5-8 minutos', 
    '8': '10-15 minutos'
  };
  
  // Função para atualizar o tempo sugerido
  function updateTempoSugerido() {
    if (!tempoSugerido) return;
    const selectedRadio = document.querySelector('input[name="dimensoes"]:checked');
    if (selectedRadio && temposSugeridos[selectedRadio.value]) {
      tempoSugerido.textContent = temposSugeridos[selectedRadio.value];
    }
  }
  
  if (dimensoesRadios.length && tempoSugerido) {
    // Inicializa o tempo sugerido
    updateTempoSugerido();
    
    dimensoesRadios.forEach(radio => {
      radio.addEventListener('change', function() {
        updateTempoSugerido();
        saveCurrentConfig();
      });
    });
  }

  async function loadSavedConfig() {
    // Primeiro tenta carregar do servidor
    let serverConfig = await loadGameConfigFromServer();
    
    // Se não conseguir do servidor, usa localStorage como fallback
    const localConfig = loadGameConfig() || {};
    
    // Prioriza configurações do servidor, mas usa localStorage como fallback
    const config = {
      ...localConfig,
      ...(serverConfig ? {
        tableSize: serverConfig.dimension,
        modality: serverConfig.modality
      } : {})
    };
    
    const dimensaoRadio = document.querySelector(`input[name="dimensoes"][value="${config.tableSize || 4}"]`);
    if (dimensaoRadio) {
      dimensaoRadio.checked = true;
      // Atualiza o tempo sugerido após definir a dimensão
      updateTempoSugerido();
    }
    
    const modalidadeRadio = document.querySelector(`input[name="modalidade"][value="${config.modality || 'classica'}"]`);
    if (modalidadeRadio) modalidadeRadio.checked = true;
  }

  async function saveCurrentConfig() {
    const config = {
      tableSize: parseInt(document.querySelector('input[name="dimensoes"]:checked')?.value) || 4,
      modality: document.querySelector('input[name="modalidade"]:checked')?.value || 'classica',
      suggestedTime: document.getElementById('tempo-sugerido')?.textContent || '2-3 minutos',
    };
    
    // Salva no localStorage (cache/fallback)
    saveGameConfig(config);
    
    // Salva configurações de jogo no servidor
    const gameConfig = {
      dimension: config.tableSize,
      modality: config.modality
    };
    
    try {
      await saveGameConfigToServer(gameConfig);
    } catch (error) {
      console.error('Erro ao salvar no servidor (usando cache local):', error);
    }
  }

  // Inicialização e event listeners
  loadSavedConfig();

  const saveButton = document.querySelector('button[type="submit"]');
  if (saveButton) {
    saveButton.addEventListener('click', async function(e) {
      e.preventDefault();
      await saveCurrentConfig();
      alert('Configurações salvas com sucesso!');
    });
  }

  const cancelButton = document.querySelector('.btn-secondary');
  if (cancelButton) {
    cancelButton.addEventListener('click', function() {
      if (confirm('Deseja descartar as alterações e carregar as configurações salvas?')) {
        loadSavedConfig();
      }
    });
  }

  // navigate to home
  backArrow.addEventListener('click', () => {
    window.location.href = '/pages/home/home.html';
  });
});
