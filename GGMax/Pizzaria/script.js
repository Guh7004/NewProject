// Função para abrir WhatsApp com mensagem pré-definida
function openWhatsApp() {
    const phoneNumber = '5511999999999'; // Substitua pelo número real
    const message = encodeURIComponent('Olá! Gostaria de fazer um pedido na Nonna Giulia. Podem me ajudar?');
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
}

// Função para pedido específico de pizza
function orderPizza(pizzaName, price) {
    const phoneNumber = '5511999999999';
    const message = encodeURIComponent(`Olá! Gostaria de pedir uma pizza ${pizzaName} (R$ ${price}). Podem me ajudar com o pedido?`);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
}

// Adicionar eventos de clique nas pizzas do menu
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar eventos aos itens do menu
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const pizzaNames = ['Margherita', 'Quattro Formaggi', 'Calabresa Especial'];
            const prices = ['32,90', '38,90', '35,90'];
            orderPizza(pizzaNames[index], prices[index]);
        });
        
        // Adicionar efeito hover
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
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
    const animatedElements = document.querySelectorAll('.hero, .menu, .info-item, .map-section');
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
        }, 3000);
    });

    // Adicionar contador de visualizações (simulado)
    const viewCounter = document.createElement('div');
    viewCounter.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(211, 47, 47, 0.9);
        color: white;
        padding: 10px 15px;
        border-radius: 20px;
        font-size: 0.8rem;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    const viewCount = Math.floor(Math.random() * 50) + 20;
    viewCounter.innerHTML = `<i class="fas fa-eye"></i> ${viewCount} pessoas visualizando`;
    document.body.appendChild(viewCounter);

    // Remover contador após 5 segundos
    setTimeout(() => {
        viewCounter.style.opacity = '0';
        viewCounter.style.transform = 'translateY(20px)';
        setTimeout(() => {
            document.body.removeChild(viewCounter);
        }, 300);
    }, 5000);
});

// Adicionar CSS para animação de pulso
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .menu-item {
        transition: all 0.3s ease !important;
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

