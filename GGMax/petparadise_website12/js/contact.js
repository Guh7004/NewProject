// ===== CONTACT PAGE FUNCTIONALITY =====

document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
    initializeMap();
    initializeHours();
    initializePhoneMask();
});

// ===== CONTACT FORM =====
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission();
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                validateField(this);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Este campo é obrigatório';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'E-mail inválido';
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Telefone inválido';
        }
    }
    
    // Update field appearance
    if (isValid) {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
        removeFieldError(field);
    } else {
        field.classList.remove('is-valid');
        field.classList.add('is-invalid');
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    removeFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function removeFieldError(field) {
    const existingError = field.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
}

function handleFormSubmission() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isFormValid = true;
    
    // Validate all required fields
    inputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });
    
    // Check privacy policy
    const privacyCheck = document.getElementById('privacy');
    if (!privacyCheck.checked) {
        isFormValid = false;
        showNotification('❌ Você deve aceitar a política de privacidade.', 'error');
    }
    
    if (!isFormValid) {
        showNotification('❌ Por favor, corrija os erros no formulário.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        form.reset();
        form.querySelectorAll('.is-valid, .is-invalid').forEach(field => {
            field.classList.remove('is-valid', 'is-invalid');
        });
        
    }, 2000);
}

function showSuccessMessage() {
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="success-modal-content">
            <div class="success-icon">
                <i class="fas fa-check-circle text-success"></i>
            </div>
            <h3>Mensagem Enviada!</h3>
            <p>
                Obrigado pelo contato! Recebemos sua mensagem e entraremos em contato 
                em breve através do e-mail ou telefone informado.
            </p>
            <div class="response-time">
                <i class="fas fa-clock me-2"></i>
                <strong>Tempo de resposta:</strong> até 24 horas
            </div>
            <button class="btn btn-primary" onclick="closeSuccessMessage()">
                Entendi
            </button>
        </div>
        <div class="success-modal-backdrop" onclick="closeSuccessMessage()"></div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
    
    // Trigger confetti
    triggerConfetti();
    
    window.currentSuccessMessage = modal;
}

window.closeSuccessMessage = function() {
    if (window.currentSuccessMessage) {
        window.currentSuccessMessage.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(window.currentSuccessMessage);
            window.currentSuccessMessage = null;
        }, 300);
    }
};

// ===== PHONE MASK =====
function initializePhoneMask() {
    const phoneInput = document.getElementById('phone');
    
    phoneInput.addEventListener('input', function() {
        this.value = formatPhone(this.value);
    });
}

function formatPhone(value) {
    // Remove all non-digits
    value = value.replace(/\D/g, '');
    
    // Apply mask (11) 99999-9999
    if (value.length >= 11) {
        return value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length >= 7) {
        return value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (value.length >= 3) {
        return value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    } else {
        return value;
    }
}

// ===== MAP FUNCTIONALITY =====
function initializeMap() {
    // Add click handlers for map buttons
    window.openGoogleMaps = function() {
        const address = 'Rua dos Pets, 123, Vila Madalena, São Paulo, SP';
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        window.open(url, '_blank');
    };
    
    window.openWaze = function() {
        const address = 'Rua dos Pets, 123, Vila Madalena, São Paulo, SP';
        const url = `https://waze.com/ul?q=${encodeURIComponent(address)}`;
        window.open(url, '_blank');
    };
    
    window.openMap = function() {
        openGoogleMaps();
    };
}

// ===== HOURS FUNCTIONALITY =====
function initializeHours() {
    updateCurrentDayHighlight();
    
    // Update every minute
    setInterval(updateCurrentDayHighlight, 60000);
}

function updateCurrentDayHighlight() {
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const currentHour = now.getHours();
    
    // Remove previous highlights
    document.querySelectorAll('.hours-item').forEach(item => {
        item.classList.remove('current-day', 'open', 'closed');
    });
    
    // Get current day item (adjust for Monday = 0 in our layout)
    const dayIndex = currentDay === 0 ? 6 : currentDay - 1; // Convert Sunday=0 to index 6
    const currentDayItem = document.querySelectorAll('.hours-item')[dayIndex];
    
    if (currentDayItem) {
        currentDayItem.classList.add('current-day');
        
        // Check if currently open
        let isOpen = false;
        if (currentDay === 0) { // Sunday
            isOpen = currentHour >= 9 && currentHour < 17;
        } else { // Monday to Saturday
            isOpen = currentHour >= 8 && currentHour < 18;
        }
        
        currentDayItem.classList.add(isOpen ? 'open' : 'closed');
        
        // Update status indicator
        updateStatusIndicator(isOpen);
    }
}

function updateStatusIndicator(isOpen) {
    let statusIndicator = document.querySelector('.status-indicator');
    
    if (!statusIndicator) {
        statusIndicator = document.createElement('div');
        statusIndicator.className = 'status-indicator';
        document.querySelector('.hours-card h3').appendChild(statusIndicator);
    }
    
    if (isOpen) {
        statusIndicator.innerHTML = '<span class="status-open">ABERTO AGORA</span>';
    } else {
        statusIndicator.innerHTML = '<span class="status-closed">FECHADO</span>';
    }
}

// ===== CONTACT INFO ANIMATIONS =====
document.addEventListener('DOMContentLoaded', function() {
    const contactCards = document.querySelectorAll('.contact-info-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    contactCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
});

// ===== ADDITIONAL STYLES =====
const contactStyles = document.createElement('style');
contactStyles.textContent = `
    .hero-contact-quick {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 2rem;
    }
    
    .contact-quick-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        background: rgba(255, 255, 255, 0.1);
        padding: 1rem;
        border-radius: var(--border-radius);
        backdrop-filter: blur(10px);
    }
    
    .contact-quick-item i {
        font-size: 1.5rem;
        width: 40px;
        text-align: center;
    }
    
    .contact-quick-item div {
        color: white;
    }
    
    .contact-quick-item strong {
        display: block;
        font-size: 1.1rem;
        margin-bottom: 0.25rem;
    }
    
    .contact-quick-item span {
        font-size: 0.9rem;
        opacity: 0.9;
    }
    
    .contact-info-card {
        background: white;
        padding: 2rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        text-align: center;
        height: 100%;
        transition: all 0.3s ease;
    }
    
    .contact-info-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-hover);
    }
    
    .contact-icon {
        width: 80px;
        height: 80px;
        margin: 0 auto 1.5rem;
        background: var(--gradient-1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        color: white;
    }
    
    .contact-info-card h4 {
        color: var(--primary-blue);
        margin-bottom: 1rem;
    }
    
    .contact-info-card p {
        color: #6c757d;
        margin-bottom: 1.5rem;
        line-height: 1.6;
    }
    
    .contact-buttons {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
        flex-wrap: wrap;
    }
    
    .contact-form-card {
        background: white;
        padding: 2rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
    }
    
    .contact-form .form-label {
        font-weight: 600;
        color: var(--text-dark);
        margin-bottom: 0.5rem;
    }
    
    .contact-form .form-control,
    .contact-form .form-select {
        border: 2px solid #e9ecef;
        border-radius: var(--border-radius);
        padding: 0.75rem 1rem;
        transition: all 0.3s ease;
    }
    
    .contact-form .form-control:focus,
    .contact-form .form-select:focus {
        border-color: var(--primary-blue);
        box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.25);
    }
    
    .contact-form .is-valid {
        border-color: var(--primary-green);
    }
    
    .contact-form .is-invalid {
        border-color: #dc3545;
    }
    
    .map-container {
        border-radius: var(--border-radius);
        overflow: hidden;
        box-shadow: var(--shadow);
        height: 400px;
    }
    
    .map-placeholder {
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, var(--primary-blue), var(--primary-green));
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        text-align: center;
    }
    
    .map-content i {
        font-size: 4rem;
        margin-bottom: 1rem;
        display: block;
    }
    
    .map-content h4 {
        margin-bottom: 1rem;
    }
    
    .map-content p {
        margin-bottom: 2rem;
        opacity: 0.9;
    }
    
    .map-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }
    
    .hours-card {
        background: white;
        padding: 2rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
    }
    
    .hours-grid {
        display: grid;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
    }
    
    .hours-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: var(--border-radius);
        transition: all 0.3s ease;
    }
    
    .hours-item.current-day {
        background: rgba(52, 152, 219, 0.1);
        border: 2px solid var(--primary-blue);
    }
    
    .hours-item.open {
        background: rgba(40, 167, 69, 0.1);
        border-color: var(--primary-green);
    }
    
    .hours-item.closed {
        background: rgba(220, 53, 69, 0.1);
        border-color: #dc3545;
    }
    
    .hours-item.special {
        background: rgba(255, 193, 7, 0.1);
        border: 2px solid #ffc107;
    }
    
    .day {
        font-weight: 600;
        color: var(--text-dark);
    }
    
    .time {
        font-weight: 500;
        color: var(--primary-blue);
    }
    
    .hours-note {
        background: #fff3cd;
        border: 1px solid #ffeaa7;
        padding: 1rem;
        border-radius: var(--border-radius);
        color: #856404;
        font-size: 0.9rem;
    }
    
    .status-indicator {
        margin-left: 1rem;
        display: inline-block;
    }
    
    .status-open {
        background: var(--primary-green);
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 600;
        animation: pulse 2s infinite;
    }
    
    .status-closed {
        background: #dc3545;
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 600;
    }
    
    /* Success Modal Styles */
    .success-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .success-modal.active {
        opacity: 1;
        visibility: visible;
    }
    
    .success-modal-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
    }
    
    .success-modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border-radius: var(--border-radius);
        padding: 3rem 2rem;
        text-align: center;
        max-width: 500px;
        width: 90vw;
    }
    
    .success-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
        animation: bounce 1s ease;
    }
    
    .success-modal-content h3 {
        color: var(--primary-green);
        margin-bottom: 1rem;
    }
    
    .success-modal-content p {
        color: #6c757d;
        margin-bottom: 1.5rem;
        line-height: 1.6;
    }
    
    .response-time {
        background: #e8f5e8;
        padding: 1rem;
        border-radius: var(--border-radius);
        margin-bottom: 2rem;
        color: var(--primary-green);
        font-size: 0.9rem;
    }
    
    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.7; }
        100% { opacity: 1; }
    }
    
    @keyframes bounce {
        0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
        }
        40%, 43% {
            transform: translate3d(0, -30px, 0);
        }
        70% {
            transform: translate3d(0, -15px, 0);
        }
        90% {
            transform: translate3d(0, -4px, 0);
        }
    }
    
    @media (max-width: 768px) {
        .contact-buttons {
            flex-direction: column;
        }
        
        .map-buttons {
            flex-direction: column;
        }
        
        .hours-item {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
        }
        
        .success-modal-content {
            padding: 2rem 1rem;
        }
    }
`;
document.head.appendChild(contactStyles);

