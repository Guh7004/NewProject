// Função para abrir WhatsApp com mensagem pré-definida
function openWhatsApp() {
    const phoneNumber = '5511999999999'; // Substitua pelo número real
    const message = encodeURIComponent('Olá! Gostaria de fazer um pedido na Doce Encanto. Podem me ajudar?');
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
}

// Função para pedido específico de produto
function orderProduct(productName, price) {
    const phoneNumber = '5511999999999';
    const message = encodeURIComponent(`Olá! Gostaria de pedir ${productName} (R$ ${price}). Qual a disponibilidade?`);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
}

// Adicionar eventos de clique nos produtos
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar eventos aos itens do cardápio de produtos
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach((item, index) => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const productNames = ['Torta de Brigadeiro', 'Bolo Artesanal', 'Docinhos Gourmet'];
            const prices = ['45,00', '65,00', '3,50'];
            orderProduct(productNames[index], prices[index]);
        });
        
        // Adicionar efeito hover
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });

    // Animação suave para elementos quando aparecem na tela
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animação aos elementos principais
    const animatedElements = document.querySelectorAll('.hero, .products, .info-item, .map-container');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Efeito de digitação no título principal
    const heroTitle = document.querySelector('.hero-text h2');
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Iniciar efeito após um pequeno delay
    setTimeout(typeWriter, 500);

    // Adicionar efeito de pulso nos botões CTA
    const ctaButtons = document.querySelectorAll('.cta-button, .cta-button-large');
    ctaButtons.forEach(button => {
        setInterval(() => {
            button.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                button.style.animation = '';
            }, 500);
        }, 4000);
    });

    // Adicionar contador de pedidos (simulado)
    const orderCounter = document.createElement('div');
    orderCounter.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(236, 72, 153, 0.9);
        color: white;
        padding: 10px 15px;
        border-radius: 20px;
        font-size: 0.8rem;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        font-weight: 600;
    `;
    
    const orderCount = Math.floor(Math.random() * 25) + 10;
    orderCounter.innerHTML = `<i class="fas fa-heart"></i> ${orderCount} pedidos hoje`;
    document.body.appendChild(orderCounter);

    // Remover contador após 5 segundos
    setTimeout(() => {
        orderCounter.style.opacity = '0';
        orderCounter.style.transform = 'translateY(20px)';
        setTimeout(() => {
            document.body.removeChild(orderCounter);
        }, 300);
    }, 5000);

    // Adicionar efeito de brilho nos elementos rosa
    const pinkElements = document.querySelectorAll('.logo h1, .hero-text h2, .products h3');
    pinkElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 15px rgba(236, 72, 153, 0.8)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.textShadow = '2px 2px 4px rgba(0,0,0,0.1)';
        });
    });

    // Adicionar partículas de coração flutuantes
    function createHeartParticle() {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.cssText = `
            position: fixed;
            font-size: 20px;
            pointer-events: none;
            z-index: 999;
            animation: floatHeart 3s ease-out forwards;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight}px;
        `;
        document.body.appendChild(heart);
        
        setTimeout(() => {
            document.body.removeChild(heart);
        }, 3000);
    }

    // Criar partículas periodicamente
    setInterval(createHeartParticle, 8000);
});

// Adicionar CSS para animações
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes floatHeart {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .product-item {
        transition: all 0.3s ease !important;
    }
    
    .logo h1:hover {
        background: linear-gradient(90deg, #ec4899 0%, #f472b6 50%, #ec4899 100%);
        background-size: 200px 100%;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: shimmer 2s infinite;
    }
    
    @keyframes shimmer {
        0% { background-position: -200px 0; }
        100% { background-position: calc(200px + 100%) 0; }
    }
`;
document.head.appendChild(style);

// Função para scroll suave (caso necessário)
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

// Detectar se é dispositivo móvel para otimizações
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
    // Otimizações específicas para mobile
    document.body.style.touchAction = 'manipulation';
    
    // Adicionar meta tag para prevenir zoom
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
        metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }
}

