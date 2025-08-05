// Doce Encanto - JavaScript Interativo

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas as funcionalidades
    initNavbar();
    initProductFilter();
    initContactForm();
    initAnimations();
    initCarousel();
    initScrollEffects();
});

// Funcionalidade da Navbar
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Efeito de scroll na navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll para links internos
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Fechar menu mobile ao clicar em um link
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
}

// Sistema de Filtro de Produtos
function initProductFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Atualizar botões ativos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar produtos com animação
            productItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.remove('hidden');
                    }, 50);
                } else {
                    item.classList.add('hidden');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 500);
                }
            });
            
            // Animar contagem de produtos
            animateProductCount(filter);
        });
    });
}

// Animar contagem de produtos filtrados
function animateProductCount(filter) {
    const productItems = document.querySelectorAll('.product-item');
    let count = 0;
    
    productItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
            count++;
        }
    });
    
    // Criar elemento de contagem se não existir
    let countElement = document.querySelector('.product-count');
    if (!countElement) {
        countElement = document.createElement('div');
        countElement.className = 'product-count text-center mt-3';
        const filterSection = document.querySelector('.filter-buttons');
        if (filterSection) {
            filterSection.appendChild(countElement);
        }
    }
    
    // Animar contagem
    let currentCount = 0;
    const increment = count / 20;
    const timer = setInterval(() => {
        currentCount += increment;
        if (currentCount >= count) {
            currentCount = count;
            clearInterval(timer);
        }
        countElement.textContent = `${Math.floor(currentCount)} produto${Math.floor(currentCount) !== 1 ? 's' : ''} encontrado${Math.floor(currentCount) !== 1 ? 's' : ''}`;
    }, 50);
}

// Formulário de Contato
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validação dos campos
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        if (validateForm(data)) {
            submitForm(data);
        }
    });
    
    // Validação em tempo real
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

// Validar formulário
function validateForm(data) {
    let isValid = true;
    const form = document.getElementById('contact-form');
    
    // Limpar erros anteriores
    form.querySelectorAll('.is-invalid').forEach(field => {
        field.classList.remove('is-invalid');
    });
    form.querySelectorAll('.invalid-feedback').forEach(error => {
        error.remove();
    });
    
    // Validar nome
    if (!data.nome || data.nome.trim().length < 2) {
        showFieldError(form.querySelector('#nome'), 'Nome deve ter pelo menos 2 caracteres');
        isValid = false;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showFieldError(form.querySelector('#email'), 'Email inválido');
        isValid = false;
    }
    
    // Validar assunto
    if (!data.assunto) {
        showFieldError(form.querySelector('#assunto'), 'Selecione um assunto');
        isValid = false;
    }
    
    // Validar mensagem
    if (!data.mensagem || data.mensagem.trim().length < 10) {
        showFieldError(form.querySelector('#mensagem'), 'Mensagem deve ter pelo menos 10 caracteres');
        isValid = false;
    }
    
    return isValid;
}

// Validar campo individual
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';
    
    switch (field.id) {
        case 'nome':
            if (value.length < 2) {
                message = 'Nome deve ter pelo menos 2 caracteres';
                isValid = false;
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                message = 'Email inválido';
                isValid = false;
            }
            break;
        case 'mensagem':
            if (value.length < 10) {
                message = 'Mensagem deve ter pelo menos 10 caracteres';
                isValid = false;
            }
            break;
    }
    
    if (!isValid) {
        showFieldError(field, message);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

// Mostrar erro no campo
function showFieldError(field, message) {
    field.classList.add('is-invalid');
    
    let errorElement = field.parentNode.querySelector('.invalid-feedback');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'invalid-feedback';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

// Limpar erro do campo
function clearFieldError(field) {
    field.classList.remove('is-invalid');
    const errorElement = field.parentNode.querySelector('.invalid-feedback');
    if (errorElement) {
        errorElement.remove();
    }
}

// Simular envio do formulário
function submitForm(data) {
    const form = document.getElementById('contact-form');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Mostrar loading
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
    submitButton.disabled = true;
    form.classList.add('loading');
    
    // Simular envio (substituir por integração real)
    setTimeout(() => {
        // Sucesso
        showSuccessMessage();
        form.reset();
        
        // Restaurar botão
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        form.classList.remove('loading');
    }, 2000);
}

// Mostrar mensagem de sucesso
function showSuccessMessage() {
    const alert = document.createElement('div');
    alert.className = 'alert alert-success alert-dismissible fade show mt-3';
    alert.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>
        <strong>Mensagem enviada com sucesso!</strong> 
        Entraremos em contato em breve.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const form = document.getElementById('contact-form');
    form.parentNode.insertBefore(alert, form);
    
    // Auto-remover após 5 segundos
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

// Animações de entrada
function initAnimations() {
    // Intersection Observer para animações
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observar elementos para animação
    const animateElements = document.querySelectorAll('.card, .value-card, .team-card, .testimonial-card, .contact-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Funcionalidades do Carrossel
function initCarousel() {
    const carousel = document.querySelector('#hero-carousel');
    if (!carousel) return;
    
    // Auto-play personalizado
    const carouselInstance = new bootstrap.Carousel(carousel, {
        interval: 5000,
        wrap: true,
        pause: 'hover'
    });
    
    // Pausar no hover
    carousel.addEventListener('mouseenter', () => {
        carouselInstance.pause();
    });
    
    carousel.addEventListener('mouseleave', () => {
        carouselInstance.cycle();
    });
}

// Efeitos de Scroll
function initScrollEffects() {
    // Parallax simples para o header
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.page-header');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Contador animado
    const counters = document.querySelectorAll('.display-4');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        if (counter.textContent.match(/\d+/)) {
            counterObserver.observe(counter);
        }
    });
}

// Animar contador
function animateCounter(element) {
    const target = parseInt(element.textContent.match(/\d+/)[0]);
    const suffix = element.textContent.replace(/\d+/, '');
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 40);
}

// Funcionalidades adicionais
document.addEventListener('DOMContentLoaded', function() {
    // Tooltips do Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Smooth scroll para todos os links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Botão "Voltar ao topo"
    createBackToTopButton();
});

// Criar botão "Voltar ao topo"
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'btn btn-primary rounded-circle position-fixed';
    backToTop.style.cssText = `
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(backToTop);
    
    // Mostrar/ocultar botão baseado no scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    // Funcionalidade do botão
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Utilitários
const Utils = {
    // Debounce function
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },
    
    // Throttle function
    throttle: function(func, limit) {
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
    },
    
    // Detectar dispositivo móvel
    isMobile: function() {
        return window.innerWidth <= 768;
    },
    
    // Gerar ID único
    generateId: function() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
};

// Exportar para uso global
window.DoceEncanto = {
    Utils,
    initNavbar,
    initProductFilter,
    initContactForm,
    initAnimations,
    initCarousel,
    initScrollEffects
};

