(() => {
  const carrossel = document.querySelector('[data-carrossel]');
  if (!carrossel) return;

  const slides = Array.from(carrossel.querySelectorAll('.carrossel-slide'));
  const indicadores = Array.from(carrossel.querySelectorAll('.carrossel-indicador'));
  let slideAtual = 0;
  let temporizador;

  function mostrarSlide(indice) {
    slideAtual = (indice + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const ativo = i === slideAtual;
      slide.classList.toggle('carrossel-slide--ativo', ativo);
      slide.setAttribute('aria-hidden', String(!ativo));
    });
    indicadores.forEach((indicador, i) => {
      const ativo = i === slideAtual;
      indicador.classList.toggle('carrossel-indicador--ativo', ativo);
      indicador.setAttribute('aria-current', String(ativo));
    });
  }

  function iniciarRotacao() {
    window.clearInterval(temporizador);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      temporizador = window.setInterval(() => mostrarSlide(slideAtual + 1), 5000);
    }
  }

  indicadores.forEach((indicador) => {
    indicador.addEventListener('click', () => {
      mostrarSlide(Number(indicador.dataset.slide));
      iniciarRotacao();
    });
  });

  carrossel.addEventListener('mouseenter', () => window.clearInterval(temporizador));
  carrossel.addEventListener('mouseleave', iniciarRotacao);
  carrossel.addEventListener('focusin', () => window.clearInterval(temporizador));
  carrossel.addEventListener('focusout', iniciarRotacao);

  mostrarSlide(0);
  iniciarRotacao();
})();