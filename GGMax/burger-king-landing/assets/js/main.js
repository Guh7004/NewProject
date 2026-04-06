// Main JavaScript para funcionalidades gerais e animações
class BurgerKingApp {
    constructor() {
        this.isLoaded = false;
        this.scrollPosition = 0;
        this.init();
    }

    init() {
        this.setupLoadingAnimation();
        this.setupScrollEffects();
        this.setupIntersectionObserver();
        this.setupPerformanceOptimizations();
        this.setupAccessibility();
    }

    setupLoadingAnimation() {
        window.addEventListener('load', () => {
            this.isLoaded = true;
            document.body.classList.add('loaded');
            
            // Animar elementos na entrada
            this.animateOnLoad();
        });
    }

    animateOnLoad() {
        const elements = [
            { selector: '.logo', delay: 0 },
            { selector: '.hero-title', delay: 200 },
            { selector: '.hero-description', delay: 400 },
            { selector: '.carousel-container', delay: 600 }
        ];

        elements.forEach(({ selector, delay }) => {
            setTimeout(() => {
                const element = document.querySelector(selector);
                if (element) {
                    element.classList.add('fade-in');
                }
            }, delay);
        });
    }

    setupScrollEffects() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    handleScroll() {
        const scrollY = window.scrollY;
        const scrollDelta = scrollY - this.scrollPosition;
        this.scrollPosition = scrollY;

        // Parallax effect no header
        const header = document.querySelector('.header');
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Parallax effect nas partículas
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            const speed = 0.5 + (index % 3) * 0.2;
            const yPos = scrollY * speed;
            particle.style.transform = `translateY(${yPos}px)`;
        });
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    
                    // Animações específicas por elemento
                    if (entry.target.classList.contains('product-slide')) {
                        this.animateProductSlide(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observar elementos
        document.querySelectorAll('.product-slide, .footer').forEach(el => {
            observer.observe(el);
        });
    }

    animateProductSlide(slide) {
        const image = slide.querySelector('.product-image');
        const info = slide.querySelector('.product-info');
        
        if (image) {
            image.style.animation = 'slideInLeft 0.8s ease-out';
        }
        
        if (info) {
            info.style.animation = 'slideInRight 0.8s ease-out 0.2s both';
        }
    }

    setupPerformanceOptimizations() {
        // Lazy loading para imagens
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // Preload de recursos críticos
        this.preloadCriticalResources();
    }

    preloadCriticalResources() {
        const criticalImages = [
            'assets/images/whopper.png',
            'assets/images/big-king.png',
            'assets/images/chicken-royale.png'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    setupAccessibility() {
        // Navegação por teclado
        this.setupKeyboardNavigation();
        
        // Suporte a screen readers
        this.setupScreenReaderSupport();
        
        // Redução de movimento para usuários sensíveis
        this.setupReducedMotion();
    }

    setupKeyboardNavigation() {
        // Focus trap no modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const modal = document.querySelector('.order-modal');
                if (modal) {
                    modal.querySelector('.close-modal').click();
                }
            }
        });

        // Navegação por Tab melhorada
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const focusable = Array.from(document.querySelectorAll(focusableElements));
                const index = focusable.indexOf(document.activeElement);
                
                if (e.shiftKey) {
                    const prevIndex = index > 0 ? index - 1 : focusable.length - 1;
                    focusable[prevIndex]?.focus();
                } else {
                    const nextIndex = index < focusable.length - 1 ? index + 1 : 0;
                    focusable[nextIndex]?.focus();
                }
            }
        });
    }

    setupScreenReaderSupport() {
        // Adicionar labels ARIA
        const carousel = document.querySelector('.carousel-container');
        if (carousel) {
            carousel.setAttribute('role', 'region');
            carousel.setAttribute('aria-label', 'Carrossel de produtos');
        }

        // Anunciar mudanças no carrossel
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.setAttribute('aria-label', `Ir para produto ${index + 1}`);
        });

        // Status do carrossel
        const carouselStatus = document.createElement('div');
        carouselStatus.id = 'carousel-status';
        carouselStatus.className = 'sr-only';
        carouselStatus.setAttribute('aria-live', 'polite');
        document.body.appendChild(carouselStatus);
    }

    setupReducedMotion() {
        // Detectar preferência por movimento reduzido
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            document.body.classList.add('reduced-motion');
        }

        prefersReducedMotion.addEventListener('change', () => {
            if (prefersReducedMotion.matches) {
                document.body.classList.add('reduced-motion');
            } else {
                document.body.classList.remove('reduced-motion');
            }
        });
    }

    // Utilitários
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Adicionar estilos para acessibilidade
const accessibilityStyles = document.createElement('style');
accessibilityStyles.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
    
    .header.scrolled {
        background: rgba(10, 10, 10, 0.95);
        backdrop-filter: blur(15px);
    }
    
    .reduced-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    
    .reduced-motion .particle {
        animation: none !important;
    }
    
    /* Focus styles melhorados */
    button:focus,
    .footer-link:focus {
        outline: 2px solid #00ffff;
        outline-offset: 2px;
    }
    
    .order-btn:focus {
        outline: 2px solid #ff0080;
        outline-offset: 2px;
    }
    
    /* Hover states para touch devices */
    @media (hover: none) {
        .order-btn:hover {
            transform: none;
        }
        
        .nav-btn:hover {
            transform: none;
        }
        
        .product-image:hover {
            transform: none;
        }
    }
`;
document.head.appendChild(accessibilityStyles);

// Inicializar aplicação
document.addEventListener('DOMContentLoaded', () => {
    new BurgerKingApp();
});

// Service Worker para cache (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

