class ProductCarousel {
    constructor() {
        this.track = document.getElementById('carousel-track');
        this.slides = document.querySelectorAll('.product-slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.highlight = document.getElementById('product-highlight');
        
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.isAnimating = false;

        this.products = {
            'whopper': {
                name: 'WHOPPER®',
                desc: 'O clássico que conquistou o mundo. Carne grelhada no fogo, salada fresca e molho especial.',
                price: 'R$ 24,90'
            },
            'big-king': {
                name: 'BIG KING®',
                desc: 'Dois hambúrgueres, molho especial, alface, queijo, picles, cebola em um pão com gergelim.',
                price: 'R$ 22,90'
            },
            'chicken-royale': {
                name: 'CHICKEN ROYALE®',
                desc: 'Frango empanado crocante, alface fresca e maionese especial em pão brioche.',
                price: 'R$ 19,90'
            }
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateCarousel();
    }

    setupEventListeners() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
    }

    nextSlide() {
        if (this.isAnimating) return;
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
    }

    prevSlide() {
        if (this.isAnimating) return;
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
    }

    goToSlide(index) {
        if (this.isAnimating || index === this.currentSlide) return;
        this.currentSlide = index;
        this.updateCarousel();
    }

    updateCarousel() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        this.slides.forEach((slide, index) => {
            slide.classList.remove('center', 'left', 'right', 'hidden');
            if (index === this.currentSlide) {
                slide.classList.add('center');
            } else if (index === (this.currentSlide - 1 + this.totalSlides) % this.totalSlides) {
                slide.classList.add('left');
            } else if (index === (this.currentSlide + 1) % this.totalSlides) {
                slide.classList.add('right');
            } else {
                slide.classList.add('hidden');
            }
        });

        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });

        this.updateHighlight();

        setTimeout(() => { this.isAnimating = false; }, 600);
    }

    updateHighlight() {
    const product = this.slides[this.currentSlide].dataset.product;
    const data = this.products[product];

    // Animação de fade
    this.highlight.classList.add('fade-out');

    setTimeout(() => {
        this.highlight.querySelector('.product-name').textContent = data.name;
        this.highlight.querySelector('.product-description').textContent = data.desc;
        this.highlight.querySelector('.product-price').textContent = data.price;
        this.highlight.querySelector('.order-btn').dataset.product = product;

        this.highlight.classList.remove('fade-out');
    }, 400); // tempo igual ao CSS
}

}

// Inicializar carrossel
document.addEventListener('DOMContentLoaded', () => {
    new ProductCarousel();
});
