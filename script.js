// Efeito de carrossel nas fotos dos cards das hospedagens
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.card-hospedagem');
    const carrosselControllers = new Map(); // armazena o controle de cada card

    // Funções reutilizáveis
    function startCarousel(card) {
        const inner = card.querySelector('.carousel-inner');
        const totalImages = inner.children.length;
        let index = 0;

        const interval = setInterval(() => {
            index = (index + 1) % totalImages;
            inner.style.transform = `translateX(-${index * 100}%)`;
        }, 2000);

        carrosselControllers.set(card, { interval, index, inner });
    }

    function stopCarousel(card) {
        const controller = carrosselControllers.get(card);
        if (controller) {
            clearInterval(controller.interval);
            controller.inner.style.transform = `translateX(0%)`;
            carrosselControllers.delete(card);
        }
    }

    // Eventos de mouse (para desktop)
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => startCarousel(card));
        card.addEventListener('mouseleave', () => stopCarousel(card));
    });

    // Detectar visibilidade para dispositivos móveis
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const card = entry.target;

            const isMobile = window.innerWidth <= 768;

            if (isMobile && entry.isIntersecting) {
                startCarousel(card);
            } else {
                stopCarousel(card);
            }
        });
    }, {
        threshold: 0.6 // pelo menos 60% do card visível
    });

    cards.forEach(card => observer.observe(card));
});


// Efeito de shrink do header para PC
const header = document.querySelector('header');
let lastScrollTop = 0;
let lastShrinkScrollTop = 0;
const expandThreshold = 75;  // mínimo para expandir
const shrinkThreshold = 50;  // mínimo para encolher

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Verifica se está rolando para baixo
    if (
        scrollTop > lastScrollTop &&
        scrollTop > 100 &&
        scrollTop - lastShrinkScrollTop > shrinkThreshold
    ) {
        header.classList.add('shrink');
        lastShrinkScrollTop = scrollTop;
    }

    // Verifica se está rolando para cima
    else if (
        scrollTop < lastScrollTop &&
        lastShrinkScrollTop - scrollTop > expandThreshold
    ) {
        header.classList.remove('shrink');
        lastShrinkScrollTop = scrollTop; // 🔧 ATUALIZA AQUI TAMBÉM!
    }

    lastScrollTop = Math.max(scrollTop, 0);
});


// Expande e oculta o menu mobile
let isExpanded = false;

function toggleMenu() {
  const header = document.getElementById('mobile-header');
  isExpanded = !isExpanded;
  header.classList.toggle('expanded', isExpanded);
}

function closeMenu() {
  const header = document.getElementById('mobile-header');
  isExpanded = false;
  header.classList.remove('expanded');
}

// Seleciona o botão e o container de cards
const scrollButton = document.getElementById('scrollRight');
const cardsContainer = document.querySelector('.cards-container');

// Função para rolar o conteúdo para a direita
scrollButton.addEventListener('click', () => {
    const cardWidth = document.querySelector('.card-hospedagem').offsetWidth; // Largura de um card
    const totalWidth = cardsContainer.scrollWidth; // Largura total do container
    const visibleWidth = cardsContainer.clientWidth; // Largura visível do container
    const currentScroll = cardsContainer.scrollLeft; // Posição atual de rolagem

    // Verifique se chegou no final do container
    if (currentScroll + visibleWidth >= totalWidth - 20) {
        // Se chegou no final, volte para o início
        cardsContainer.scrollTo({
            left: 0,
            behavior: 'smooth' // Rolagem suave
        });
    } else {
        // Se não, role para a direita
        cardsContainer.scrollBy({
            left: cardWidth, // O +20 é o espaço entre os cards
            behavior: 'smooth' // Rolagem suave
        });
    }
});
