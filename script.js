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
let lastShrinkScrollTop = 0; // armazena onde o header encolheu
const expandThreshold = 75;  // mínimo de rolagem pra cima antes de expandir

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.classList.add('shrink');
        lastShrinkScrollTop = scrollTop;
    } else if (lastShrinkScrollTop - scrollTop > expandThreshold) {
        header.classList.remove('shrink');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
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
