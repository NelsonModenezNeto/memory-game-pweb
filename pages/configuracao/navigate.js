import { saveGameConfig, loadGameConfig, DEFAULT_GAME_CONFIG } from '../../globals/config.js';

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
  
  if (dimensoesRadios.length && tempoSugerido) {
    const temposSugeridos = {
      '4x4': '2-3 minutos',
      '6x6': '5-8 minutos', 
      '8x8': '10-15 minutos'
    };
    
    dimensoesRadios.forEach(radio => {
      radio.addEventListener('change', function() {
        tempoSugerido.textContent = temposSugeridos[this.value];
        saveCurrentConfig();
      });
    });
  }

  function loadSavedConfig() {
    const config = loadGameConfig();
    
    const inputs = {
      nome: document.getElementById('nome'),
      telefone: document.getElementById('telefone'),
      email: document.getElementById('email'),
      senha: document.getElementById('senha')
    };
    
    Object.keys(inputs).forEach(key => {
      if (inputs[key]) inputs[key].value = config[key] || '';
    });
    
    const dimensaoRadio = document.querySelector(`input[name="dimensoes"][value="${config.dimensoes}"]`);
    if (dimensaoRadio) {
      dimensaoRadio.checked = true;
      if (tempoSugerido) {
        const temposSugeridos = {
          '4x4': '2-3 minutos',
          '6x6': '5-8 minutos', 
          '8x8': '10-15 minutos'
        };
        tempoSugerido.textContent = temposSugeridos[config.dimensoes];
      }
    }
    
    const modalidadeRadio = document.querySelector(`input[name="modalidade"][value="${config.modalidade}"]`);
    if (modalidadeRadio) modalidadeRadio.checked = true;
  }

  function saveCurrentConfig() {
    const config = {
      nome: document.getElementById('nome')?.value || '',
      telefone: document.getElementById('telefone')?.value || '',
      email: document.getElementById('email')?.value || '',
      senha: document.getElementById('senha')?.value || '',
      dimensoes: document.querySelector('input[name="dimensoes"]:checked')?.value || '4x4',
      modalidade: document.querySelector('input[name="modalidade"]:checked')?.value || 'classica',
      tempoSugerido: document.getElementById('tempo-sugerido')?.textContent || '2-3 minutos',
      tema: 'dark',
      animacoes: true
    };
    
    saveGameConfig(config);
  }

  // Inicialização e event listeners
  loadSavedConfig();

  const formInputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="password"]');
  formInputs.forEach(input => input.addEventListener('input', saveCurrentConfig));

  const saveButton = document.querySelector('button[type="submit"]');
  if (saveButton) {
    saveButton.addEventListener('click', function(e) {
      e.preventDefault();
      saveCurrentConfig();
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
