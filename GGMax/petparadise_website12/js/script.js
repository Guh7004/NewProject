// ===== GLOBAL VARIABLES =====
let currentTheme = 'light';
let heroCarouselIndex = 0;
let chatOpen = false;
let countdownInterval;
let cursorPaw;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// ===== INITIALIZE WEBSITE =====
function initializeWebsite() {
    initializeNavbar();
    initializeHeroCarousel();
    initializeAnimations();
    initializeCursorEffects();
    initializeCountdown();
    initializeChat();
    initializeTheme();
    initializeScrollEffects();
    initializeServiceCards();
    initializeTestimonials();
    initializeFAQ();
    initializeNewsletter();
    initializeConfetti();
    initializePawFollower();
}

// ===== NAVBAR FUNCTIONALITY =====
function initializeNavbar() {
    const navbar = document.querySelector('.custom-navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for navigation links
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
}

// ===== HERO CAROUSEL =====
function initializeHeroCarousel() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    
    if (carouselItems.length > 1) {
        setInterval(() => {
            carouselItems[heroCarouselIndex].classList.remove('active');
            heroCarouselIndex = (heroCarouselIndex + 1) % carouselItems.length;
            carouselItems[heroCarouselIndex].classList.add('active');
        }, 5000);
    }
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .testimonial-card, .stat-item').forEach(el => {
        observer.observe(el);
    });
}

// ===== CURSOR EFFECTS =====
function initializeCursorEffects() {
    // Create cursor paw element
    cursorPaw = document.createElement('div');
    cursorPaw.className = 'cursor-paw';
    document.body.appendChild(cursorPaw);

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        cursorPaw.style.left = e.clientX + 'px';
        cursorPaw.style.top = e.clientY + 'px';
    });

    // Hide cursor paw on mobile
    if (window.innerWidth <= 768) {
        cursorPaw.style.display = 'none';
    }
}

// ===== PAW FOLLOWER =====
function initializePawFollower() {
    const pawIcons = ['🐾', '🐕', '🐱', '🦴'];
    let pawIndex = 0;

    document.addEventListener('mousemove', (e) => {
        if (Math.random() < 0.05) { // 5% chance to create a paw
            createFloatingPaw(e.clientX, e.clientY);
        }
    });

    function createFloatingPaw(x, y) {
        const paw = document.createElement('div');
        paw.innerHTML = pawIcons[pawIndex % pawIcons.length];
        paw.style.position = 'fixed';
        paw.style.left = x + 'px';
        paw.style.top = y + 'px';
        paw.style.fontSize = '20px';
        paw.style.pointerEvents = 'none';
        paw.style.zIndex = '9999';
        paw.style.transition = 'all 2s ease-out';
        paw.style.opacity = '0.7';
        
        document.body.appendChild(paw);
        pawIndex++;

        // Animate and remove
        setTimeout(() => {
            paw.style.transform = 'translateY(-100px)';
            paw.style.opacity = '0';
        }, 100);

        setTimeout(() => {
            document.body.removeChild(paw);
        }, 2100);
    }
}

// ===== COUNTDOWN TIMER =====
function initializeCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;

    let timeLeft = 5 * 60 * 60 + 23 * 60 + 45; // 5:23:45

    countdownInterval = setInterval(() => {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;

        countdownElement.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(countdownInterval);
            countdownElement.textContent = '00:00:00';
            triggerConfetti();
        }
    }, 1000);
}

// ===== CONFETTI EFFECT =====
function initializeConfetti() {
    // Confetti will be triggered when countdown reaches zero
}

function triggerConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    if (!confettiContainer) return;

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createConfetti(confettiContainer);
        }, i * 100);
    }
}

function createConfetti(container) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.backgroundColor = getRandomColor();
    container.appendChild(confetti);

    setTimeout(() => {
        container.removeChild(confetti);
    }, 3000);
}

function getRandomColor() {
    const colors = ['#3498db', '#2ecc71', '#f1c40f', '#e84393'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// ===== CHAT FUNCTIONALITY =====
function initializeChat() {
    const chatInput = document.querySelector('.chat-input');
    const chatSend = document.querySelector('.chat-send');
    const chatBody = document.querySelector('.chat-body');

    if (chatInput && chatSend) {
        chatSend.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Add user message
        addChatMessage(message, 'user');
        chatInput.value = '';

        // Simulate bot response
        setTimeout(() => {
            const botResponse = getBotResponse(message);
            addChatMessage(botResponse, 'bot');
        }, 1000);
    }

    function addChatMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        messageDiv.innerHTML = `<p>${message}</p>`;
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function getBotResponse(userMessage) {
        const responses = {
            'ola': '🐾 Olá! Como posso ajudar você hoje?',
            'preço': '💰 Nossos preços começam em R$ 35 para banho completo. Gostaria de saber sobre algum serviço específico?',
            'horario': '🕐 Funcionamos de segunda a sábado, das 8h às 18h. Domingos das 9h às 17h.',
            'agendamento': '📅 Para agendar, você pode usar nosso formulário online ou ligar para (11) 9999-9999.',
            'hotel': '🏨 Nosso hotel pet oferece suítes climatizadas, alimentação personalizada e recreação diária!',
            'banho': '🛁 Oferecemos banho completo com produtos premium, secagem profissional e perfume pet.',
            'tosa': '✂️ Fazemos tosa higiênica, cortes personalizados e aparamos unhas com muito carinho.',
            'default': '🐕 Desculpe, não entendi. Pode reformular sua pergunta? Estou aqui para ajudar!'
        };

        const lowerMessage = userMessage.toLowerCase();
        for (const key in responses) {
            if (lowerMessage.includes(key)) {
                return responses[key];
            }
        }
        return responses.default;
    }
}

function toggleChat() {
    const chatWidget = document.getElementById('chatWidget');
    chatOpen = !chatOpen;
    
    if (chatOpen) {
        chatWidget.classList.add('active');
    } else {
        chatWidget.classList.remove('active');
    }
}

// ===== THEME TOGGLE =====
function initializeTheme() {
    const savedTheme = localStorage.getItem('petparadise-theme') || 'light';
    setTheme(savedTheme);
}

function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    localStorage.setItem('petparadise-theme', theme);
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-section');
        
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
}

// ===== SERVICE CARDS =====
function initializeServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// ===== TESTIMONIALS =====
function initializeTestimonials() {
    const carousel = document.querySelector('.testimonials-carousel');
    if (!carousel) return;

    let isScrolling = false;
    
    // Auto-scroll testimonials
    setInterval(() => {
        if (!isScrolling) {
            carousel.scrollLeft += 420; // Width of testimonial + gap
            
            // Reset to beginning if at end
            if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
                setTimeout(() => {
                    carousel.scrollLeft = 0;
                }, 2000);
            }
        }
    }, 5000);

    // Pause auto-scroll when user is scrolling
    carousel.addEventListener('scroll', () => {
        isScrolling = true;
        clearTimeout(carousel.scrollTimeout);
        carousel.scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 1000);
    });
}

// ===== FAQ =====
function initializeFAQ() {
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Add animation class
            const accordionItem = button.closest('.accordion-item');
            accordionItem.classList.add('animate-pulse');
            
            setTimeout(() => {
                accordionItem.classList.remove('animate-pulse');
            }, 600);
        });
    });
}

// ===== NEWSLETTER =====
function initializeNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;

    const input = newsletterForm.querySelector('input');
    const button = newsletterForm.querySelector('button');

    button.addEventListener('click', (e) => {
        e.preventDefault();
        const email = input.value.trim();
        
        if (validateEmail(email)) {
            showNotification('✅ Obrigado! Você foi inscrito na nossa newsletter!', 'success');
            input.value = '';
        } else {
            showNotification('❌ Por favor, insira um e-mail válido.', 'error');
        }
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 4000);
}

// ===== FORM VALIDATION =====
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                    showFieldError(input, 'Este campo é obrigatório');
                } else {
                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid');
                    removeFieldError(input);
                }
                
                // Email validation
                if (input.type === 'email' && input.value.trim() && !validateEmail(input.value)) {
                    isValid = false;
                    input.classList.add('is-invalid');
                    showFieldError(input, 'E-mail inválido');
                }
                
                // Phone validation
                if (input.type === 'tel' && input.value.trim() && !validatePhone(input.value)) {
                    isValid = false;
                    input.classList.add('is-invalid');
                    showFieldError(input, 'Telefone inválido');
                }
            });
            
            if (isValid) {
                showNotification('✅ Formulário enviado com sucesso!', 'success');
                form.reset();
                inputs.forEach(input => {
                    input.classList.remove('is-valid', 'is-invalid');
                });
            }
        });
    });
}

function showFieldError(field, message) {
    removeFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #e74c3c;
        font-size: 0.8rem;
        margin-top: 5px;
        animation: fadeInUp 0.3s ease;
    `;
    
    field.parentNode.appendChild(errorDiv);
}

function removeFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function validatePhone(phone) {
    const re = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    return re.test(phone);
}

// ===== PRICE CALCULATOR =====
function initializePriceCalculator() {
    const calculator = document.getElementById('priceCalculator');
    if (!calculator) return;

    const services = {
        banho: { small: 35, medium: 45, large: 55 },
        tosa: { small: 45, medium: 55, large: 65 },
        hotel: { small: 60, medium: 70, large: 80 }
    };

    const serviceSelect = calculator.querySelector('#service');
    const sizeSelect = calculator.querySelector('#size');
    const priceDisplay = calculator.querySelector('#calculatedPrice');

    function updatePrice() {
        const service = serviceSelect.value;
        const size = sizeSelect.value;
        
        if (service && size && services[service] && services[service][size]) {
            const price = services[service][size];
            priceDisplay.textContent = `R$ ${price},00`;
            priceDisplay.style.animation = 'pulse 0.5s ease';
        } else {
            priceDisplay.textContent = 'R$ 0,00';
        }
    }

    serviceSelect.addEventListener('change', updatePrice);
    sizeSelect.addEventListener('change', updatePrice);
}

// ===== CALENDAR FUNCTIONALITY =====
function initializeCalendar() {
    const calendar = document.getElementById('appointmentCalendar');
    if (!calendar) return;

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    generateCalendar(currentYear, currentMonth);

    function generateCalendar(year, month) {
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        let calendarHTML = '<div class="calendar-header">';
        calendarHTML += `<h4>${getMonthName(month)} ${year}</h4>`;
        calendarHTML += '</div>';
        
        calendarHTML += '<div class="calendar-grid">';
        calendarHTML += '<div class="calendar-day-header">Dom</div>';
        calendarHTML += '<div class="calendar-day-header">Seg</div>';
        calendarHTML += '<div class="calendar-day-header">Ter</div>';
        calendarHTML += '<div class="calendar-day-header">Qua</div>';
        calendarHTML += '<div class="calendar-day-header">Qui</div>';
        calendarHTML += '<div class="calendar-day-header">Sex</div>';
        calendarHTML += '<div class="calendar-day-header">Sáb</div>';

        // Empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            calendarHTML += '<div class="calendar-day empty"></div>';
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            const isPast = new Date(year, month, day) < today;
            const isAvailable = !isPast && Math.random() > 0.3; // 70% availability
            
            let dayClass = 'calendar-day';
            if (isToday) dayClass += ' today';
            if (isPast) dayClass += ' past';
            if (isAvailable && !isPast) dayClass += ' available';
            
            calendarHTML += `<div class="${dayClass}" data-date="${year}-${month + 1}-${day}">${day}</div>`;
        }

        calendarHTML += '</div>';
        calendar.innerHTML = calendarHTML;

        // Add click events to available days
        calendar.querySelectorAll('.calendar-day.available').forEach(day => {
            day.addEventListener('click', () => {
                calendar.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
                day.classList.add('selected');
                
                const selectedDate = day.getAttribute('data-date');
                showTimeSlots(selectedDate);
            });
        });
    }

    function getMonthName(month) {
        const months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        return months[month];
    }

    function showTimeSlots(date) {
        const timeSlotsContainer = document.getElementById('timeSlots');
        if (!timeSlotsContainer) return;

        const availableSlots = [
            '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
        ];

        let slotsHTML = '<h5>Horários Disponíveis:</h5><div class="time-slots-grid">';
        
        availableSlots.forEach(slot => {
            const isAvailable = Math.random() > 0.2; // 80% availability
            const slotClass = isAvailable ? 'time-slot available' : 'time-slot occupied';
            
            slotsHTML += `<button class="${slotClass}" ${isAvailable ? '' : 'disabled'}>${slot}</button>`;
        });

        slotsHTML += '</div>';
        timeSlotsContainer.innerHTML = slotsHTML;

        // Add click events to available time slots
        timeSlotsContainer.querySelectorAll('.time-slot.available').forEach(slot => {
            slot.addEventListener('click', () => {
                timeSlotsContainer.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
                slot.classList.add('selected');
                
                showNotification(`✅ Horário ${slot.textContent} selecionado para ${date}`, 'success');
            });
        });
    }
}

// ===== LIGHTBOX GALLERY =====
function initializeLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            openLightbox(img.src, img.alt);
        });
    });

    function openLightbox(src, alt) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${src}" alt="${alt}">
                <button class="lightbox-close">&times;</button>
            </div>
        `;
        
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;

        document.body.appendChild(lightbox);

        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', () => {
            lightbox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(lightbox);
            }, 300);
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeBtn.click();
            }
        });
    }
}

// ===== LOADING STATES =====
function showLoading(element) {
    element.classList.add('loading');
    element.style.pointerEvents = 'none';
}

function hideLoading(element) {
    element.classList.remove('loading');
    element.style.pointerEvents = 'auto';
}

// ===== UTILITY FUNCTIONS =====
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
// Lazy load images
function initializeLazyLoading() {
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

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // Could send error to analytics service here
});

// ===== ACCESSIBILITY =====
function initializeAccessibility() {
    // Keyboard navigation for custom elements
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && chatOpen) {
            toggleChat();
        }
    });

    // Focus management
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            const focusable = Array.from(document.querySelectorAll(focusableElements));
            const index = focusable.indexOf(document.activeElement);
            
            if (e.shiftKey) {
                const prevIndex = index > 0 ? index - 1 : focusable.length - 1;
                focusable[prevIndex].focus();
            } else {
                const nextIndex = index < focusable.length - 1 ? index + 1 : 0;
                focusable[nextIndex].focus();
            }
        }
    });
}

// ===== INITIALIZE ALL FEATURES =====
document.addEventListener('DOMContentLoaded', () => {
    initializeFormValidation();
    initializePriceCalculator();
    initializeCalendar();
    initializeLightbox();
    initializeLazyLoading();
    initializeAccessibility();
});

// ===== CSS ANIMATIONS (Added via JavaScript) =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .calendar-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 5px;
        margin-top: 1rem;
    }
    
    .calendar-day-header {
        text-align: center;
        font-weight: 600;
        padding: 10px;
        background: var(--primary-blue);
        color: white;
        border-radius: 5px;
    }
    
    .calendar-day {
        text-align: center;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 2px solid transparent;
    }
    
    .calendar-day.available {
        background: #e8f5e8;
        color: var(--primary-green);
    }
    
    .calendar-day.available:hover {
        background: var(--primary-green);
        color: white;
        transform: scale(1.1);
    }
    
    .calendar-day.selected {
        background: var(--primary-blue);
        color: white;
        border-color: var(--primary-yellow);
    }
    
    .calendar-day.past {
        background: #f5f5f5;
        color: #ccc;
        cursor: not-allowed;
    }
    
    .calendar-day.today {
        border-color: var(--primary-pink);
        font-weight: 600;
    }
    
    .time-slots-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
        gap: 10px;
        margin-top: 1rem;
    }
    
    .time-slot {
        padding: 10px;
        border: 2px solid var(--primary-blue);
        background: white;
        color: var(--primary-blue);
        border-radius: 25px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: 600;
    }
    
    .time-slot.available:hover {
        background: var(--primary-blue);
        color: white;
        transform: translateY(-2px);
    }
    
    .time-slot.selected {
        background: var(--primary-green);
        border-color: var(--primary-green);
        color: white;
    }
    
    .time-slot.occupied {
        background: #f5f5f5;
        border-color: #ddd;
        color: #999;
        cursor: not-allowed;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox-content img {
        width: 100%;
        height: auto;
        border-radius: 10px;
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: -40px;
        background: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        font-size: 24px;
        cursor: pointer;
        color: #333;
    }
    
    .is-invalid {
        border-color: #e74c3c !important;
        box-shadow: 0 0 0 0.2rem rgba(231, 76, 60, 0.25) !important;
    }
    
    .is-valid {
        border-color: #2ecc71 !important;
        box-shadow: 0 0 0 0.2rem rgba(46, 204, 113, 0.25) !important;
    }
`;
document.head.appendChild(style);

