// ===== INICIALIZAÇÃO ===== 
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    setupNavbar();
    setupScrollAnimations();
    setupFormValidation();
    setupSmoothScrolling();
    setupLoadingAnimations();
    setupHoverEffects();
    setupScrollIndicator();
}

// ===== NAVBAR FUNCTIONALITY =====
function setupNavbar() {
    const navbar = document.querySelector('.custom-navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // Mobile menu close on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===== SMOOTH SCROLLING =====
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loading');
                
                // Add staggered animation for product cards
                if (entry.target.classList.contains('product-card')) {
                    const cards = document.querySelectorAll('.product-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.animationDelay = `${index * 0.1}s`;
                            card.classList.add('loading');
                        }, index * 100);
                    });
                }
                
                // Add staggered animation for testimonial cards
                if (entry.target.classList.contains('testimonial-card')) {
                    const testimonials = document.querySelectorAll('.testimonial-card');
                    testimonials.forEach((testimonial, index) => {
                        setTimeout(() => {
                            testimonial.style.animationDelay = `${index * 0.2}s`;
                            testimonial.classList.add('loading');
                        }, index * 150);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.product-card, .testimonial-card, .about-content, .contact-form-wrapper, .contact-info');
    animatedElements.forEach(el => observer.observe(el));
}

// ===== LOADING ANIMATIONS =====
function setupLoadingAnimations() {
    // Hero section animation
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroContent) heroContent.style.opacity = '1';
        if (heroImage) heroImage.style.opacity = '1';
    }, 300);
    
    // Staggered loading for sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.6s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// ===== HOVER EFFECTS =====
function setupHoverEffects() {
    // Product cards hover effect
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Social links hover effect
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1) rotate(5deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        });
    });
}

// ===== SCROLL INDICATOR =====
function setupScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('#sobre');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        // Hide scroll indicator when user scrolls
        window.addEventListener('scroll', function() {
            if (window.scrollY > 200) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }
}

// ===== FORM VALIDATION =====
function setupFormValidation() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const nome = document.getElementById('nome');
            const email = document.getElementById('email');
            const telefone = document.getElementById('telefone');
            const evento = document.getElementById('evento');
            const mensagem = document.getElementById('mensagem');
            
            // Validation flags
            let isValid = true;
            
            // Clear previous error states
            clearErrorStates();
            
            // Validate name
            if (!nome.value.trim()) {
                showError(nome, 'Nome é obrigatório');
                isValid = false;
            }
            
            // Validate email
            if (!email.value.trim()) {
                showError(email, 'E-mail é obrigatório');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'E-mail inválido');
                isValid = false;
            }
            
            // Validate phone
            if (!telefone.value.trim()) {
                showError(telefone, 'Telefone é obrigatório');
                isValid = false;
            }
            
            // Validate message
            if (!mensagem.value.trim()) {
                showError(mensagem, 'Mensagem é obrigatória');
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                showSuccessMessage();
                
                // Reset form
                contactForm.reset();
                
                // Simulate form submission
                setTimeout(() => {
                    hideSuccessMessage();
                }, 5000);
            }
        });
    }
}

function showError(field, message) {
    field.classList.add('is-invalid');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-danger mt-1';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function clearErrorStates() {
    const fields = document.querySelectorAll('.form-control');
    const errorMessages = document.querySelectorAll('.error-message');
    
    fields.forEach(field => {
        field.classList.remove('is-invalid');
    });
    
    errorMessages.forEach(error => {
        error.remove();
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showSuccessMessage() {
    // Remove existing success message
    const existingSuccess = document.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message alert alert-success mt-3';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>
        <strong>Sucesso!</strong> Sua mensagem foi enviada com sucesso. Entraremos em contato em breve!
    `;
    
    const form = document.querySelector('.contact-form');
    form.appendChild(successDiv);
    
    // Scroll to success message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function hideSuccessMessage() {
    const successMessage = document.querySelector('.success-message');
    if (successMessage) {
        successMessage.style.transition = 'opacity 0.5s ease';
        successMessage.style.opacity = '0';
        setTimeout(() => {
            successMessage.remove();
        }, 500);
    }
}

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance optimization
function debounce(func, wait) {
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====

// Optimize scroll events
const optimizedScrollHandler = throttle(function() {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);

// ===== ACCESSIBILITY IMPROVEMENTS =====

// Keyboard navigation for custom elements
document.addEventListener('keydown', function(e) {
    // Handle Enter key on clickable elements
    if (e.key === 'Enter') {
        const target = e.target;
        if (target.classList.contains('product-card') || 
            target.classList.contains('social-link') ||
            target.classList.contains('scroll-indicator')) {
            target.click();
        }
    }
});

// Focus management for mobile menu
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', function() {
        setTimeout(() => {
            if (navbarCollapse.classList.contains('show')) {
                const firstNavLink = navbarCollapse.querySelector('.nav-link');
                if (firstNavLink) {
                    firstNavLink.focus();
                }
            }
        }, 300);
    });
}

// ===== PRELOADER (OPTIONAL) =====
function showPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Carregando...</span>
            </div>
            <p class="mt-3">Carregando Doce Encanto...</p>
        </div>
    `;
    
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    document.body.appendChild(preloader);
    
    // Hide preloader when page is loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });
}

// ===== LAZY LOADING FOR IMAGES =====
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== EASTER EGG =====
let clickCount = 0;
const logo = document.querySelector('.brand-text');

if (logo) {
    logo.addEventListener('click', function() {
        clickCount++;
        if (clickCount === 5) {
            this.style.animation = 'bounce 1s ease infinite';
            setTimeout(() => {
                this.style.animation = '';
                clickCount = 0;
            }, 3000);
        }
    });
}

// ===== CONSOLE MESSAGE =====
console.log(`
🍰 Bem-vindo ao Doce Encanto! 🍰
Site desenvolvido com amor e tecnologia.
Que tal experimentar nossos doces? 😋
`);

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeWebsite,
        setupNavbar,
        setupFormValidation,
        isValidEmail
    };
}

