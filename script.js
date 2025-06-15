// Efeito de carrossel nas fotos dos cards das hospedagens
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.card-hospedagem');

    cards.forEach(card => {
        const inner = card.querySelector('.carousel-inner');
        const totalImages = inner.children.length;
        let index = 0;
        let interval;

        const startCarousel = () => {
            interval = setInterval(() => {
                index = (index + 1) % totalImages;
                inner.style.transform = `translateX(-${index * 100}%)`;
            }, 3000); // Intervalo entre cada foto
        };

        const stopCarousel = () => {
            clearInterval(interval);
            index = 0; // volta para a primeira imagem
            inner.style.transform = `translateX(0%)`;
        };

        card.addEventListener('mouseenter', startCarousel);
        card.addEventListener('mouseleave', stopCarousel);
    });
});

// Efeito de shrink do header para PC
const header = document.querySelector('header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // rolando para baixo e já passou de 100px - retrai o header
        header.classList.add('shrink');
    } else {
        // rolando para cima - expande o header
        header.classList.remove('shrink');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // evita valores negativos
});

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
