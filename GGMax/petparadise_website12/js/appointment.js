// ===== APPOINTMENT FORM FUNCTIONALITY =====

let currentStep = 1;
const totalSteps = 5;
let appointmentData = {};

// Initialize appointment form
document.addEventListener('DOMContentLoaded', function() {
    initializeAppointmentForm();
    initializeCalendar();
    updateProgressBar();
});

// ===== FORM STEP NAVIGATION =====
function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
            document.getElementById(`step${currentStep}`).classList.remove('active');
            currentStep++;
            document.getElementById(`step${currentStep}`).classList.add('active');
            updateProgressBar();
            
            if (currentStep === 5) {
                generateSummary();
            }
            
            // Scroll to top of form
            document.querySelector('.appointment-form-card').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        document.getElementById(`step${currentStep}`).classList.remove('active');
        currentStep--;
        document.getElementById(`step${currentStep}`).classList.add('active');
        updateProgressBar();
        
        // Scroll to top of form
        document.querySelector('.appointment-form-card').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function updateProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    const progressSteps = document.querySelectorAll('.progress-steps .step');
    const percentage = (currentStep / totalSteps) * 100;
    
    progressBar.style.width = percentage + '%';
    
    progressSteps.forEach((step, index) => {
        if (index < currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

// ===== FORM VALIDATION =====
function validateCurrentStep() {
    const currentStepElement = document.getElementById(`step${currentStep}`);
    const requiredFields = currentStepElement.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('is-invalid');
            showFieldError(field, 'Este campo é obrigatório');
        } else {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
            removeFieldError(field);
        }
    });
    
    // Step-specific validations
    switch (currentStep) {
        case 2:
            if (!validateServiceSelection()) {
                isValid = false;
            }
            break;
        case 3:
            if (!validateDateTimeSelection()) {
                isValid = false;
            }
            break;
        case 4:
            if (!validateContactInfo()) {
                isValid = false;
            }
            break;
    }
    
    if (!isValid) {
        showNotification('❌ Por favor, preencha todos os campos obrigatórios.', 'error');
    }
    
    return isValid;
}

function validateServiceSelection() {
    const services = document.querySelectorAll('input[name="services"]:checked');
    if (services.length === 0) {
        showNotification('❌ Selecione pelo menos um serviço.', 'error');
        return false;
    }
    return true;
}

function validateDateTimeSelection() {
    const selectedDate = document.querySelector('.calendar-day.selected');
    const selectedTime = document.querySelector('.time-slot.selected');
    
    if (!selectedDate || !selectedTime) {
        showNotification('❌ Selecione uma data e horário.', 'error');
        return false;
    }
    return true;
}

function validateContactInfo() {
    const email = document.getElementById('ownerEmail').value;
    const phone = document.getElementById('ownerPhone').value;
    
    if (email && !validateEmail(email)) {
        showNotification('❌ E-mail inválido.', 'error');
        return false;
    }
    
    if (phone && !validatePhone(phone)) {
        showNotification('❌ Telefone inválido.', 'error');
        return false;
    }
    
    return true;
}

// ===== APPOINTMENT FORM INITIALIZATION =====
function initializeAppointmentForm() {
    // Service selection handlers
    const serviceOptions = document.querySelectorAll('.service-option input[type="checkbox"]');
    serviceOptions.forEach(option => {
        option.addEventListener('change', function() {
            const label = this.closest('.service-option').querySelector('.service-label');
            if (this.checked) {
                label.classList.add('selected');
            } else {
                label.classList.remove('selected');
            }
            updatePriceEstimate();
        });
    });
    
    // Additional services handlers
    const additionalServices = document.querySelectorAll('input[name="additional"]');
    additionalServices.forEach(service => {
        service.addEventListener('change', updatePriceEstimate);
    });
    
    // Pet size change handler
    document.getElementById('petSize').addEventListener('change', updatePriceEstimate);
    
    // Form submission
    document.getElementById('appointmentForm').addEventListener('submit', handleFormSubmission);
    
    // Phone mask
    const phoneInput = document.getElementById('ownerPhone');
    phoneInput.addEventListener('input', function() {
        this.value = formatPhone(this.value);
    });
    
    // CPF mask
    const cpfInput = document.getElementById('ownerCpf');
    cpfInput.addEventListener('input', function() {
        this.value = formatCPF(this.value);
    });
}

// ===== PRICE ESTIMATION =====
function updatePriceEstimate() {
    const selectedServices = document.querySelectorAll('input[name="services"]:checked');
    const additionalServices = document.querySelectorAll('input[name="additional"]:checked');
    const petSize = document.getElementById('petSize').value;
    
    let total = 0;
    
    // Base services prices
    const servicePrices = {
        banho: { pequeno: 35, medio: 45, grande: 55 },
        tosa: { pequeno: 45, medio: 55, grande: 65 },
        hotel: { pequeno: 60, medio: 70, grande: 80 }
    };
    
    // Additional services prices
    const additionalPrices = {
        unhas: 15,
        dental: 25,
        ouvidos: 20,
        perfume: 10
    };
    
    // Calculate base services
    selectedServices.forEach(service => {
        const serviceType = service.value;
        if (servicePrices[serviceType] && petSize) {
            total += servicePrices[serviceType][petSize];
        }
    });
    
    // Calculate additional services
    additionalServices.forEach(service => {
        const serviceType = service.value;
        if (additionalPrices[serviceType]) {
            total += additionalPrices[serviceType];
        }
    });
    
    // Update price display if exists
    const priceDisplay = document.getElementById('estimatedPrice');
    if (priceDisplay) {
        priceDisplay.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
    
    return total;
}

// ===== SUMMARY GENERATION =====
function generateSummary() {
    // Pet summary
    const petName = document.getElementById('petName').value;
    const petType = document.getElementById('petType').value;
    const petBreed = document.getElementById('petBreed').value;
    const petAge = document.getElementById('petAge').value;
    const petSize = document.getElementById('petSize').value;
    
    document.getElementById('petSummary').innerHTML = `
        <p><strong>Nome:</strong> ${petName}</p>
        <p><strong>Tipo:</strong> ${petType}</p>
        ${petBreed ? `<p><strong>Raça:</strong> ${petBreed}</p>` : ''}
        <p><strong>Idade:</strong> ${petAge}</p>
        <p><strong>Porte:</strong> ${petSize}</p>
    `;
    
    // Services summary
    const selectedServices = document.querySelectorAll('input[name="services"]:checked');
    const additionalServices = document.querySelectorAll('input[name="additional"]:checked');
    
    let servicesHtml = '<ul>';
    selectedServices.forEach(service => {
        const label = document.querySelector(`label[for="${service.id}"]`);
        const serviceName = label.querySelector('h4').textContent;
        servicesHtml += `<li>${serviceName}</li>`;
    });
    
    if (additionalServices.length > 0) {
        servicesHtml += '<li><strong>Adicionais:</strong><ul>';
        additionalServices.forEach(service => {
            const label = document.querySelector(`label[for="${service.id}"]`);
            servicesHtml += `<li>${label.textContent}</li>`;
        });
        servicesHtml += '</ul></li>';
    }
    servicesHtml += '</ul>';
    
    document.getElementById('servicesSummary').innerHTML = servicesHtml;
    
    // Date and time summary
    const selectedDate = document.querySelector('.calendar-day.selected');
    const selectedTime = document.querySelector('.time-slot.selected');
    
    if (selectedDate && selectedTime) {
        const dateText = selectedDate.getAttribute('data-date');
        const timeText = selectedTime.textContent;
        document.getElementById('datetimeSummary').innerHTML = `
            <p><strong>Data:</strong> ${formatDate(dateText)}</p>
            <p><strong>Horário:</strong> ${timeText}</p>
        `;
    }
    
    // Contact summary
    const ownerName = document.getElementById('ownerName').value;
    const ownerPhone = document.getElementById('ownerPhone').value;
    const ownerEmail = document.getElementById('ownerEmail').value;
    
    document.getElementById('contactSummary').innerHTML = `
        <p><strong>Nome:</strong> ${ownerName}</p>
        <p><strong>Telefone:</strong> ${ownerPhone}</p>
        <p><strong>E-mail:</strong> ${ownerEmail}</p>
    `;
    
    // Total summary
    const total = updatePriceEstimate();
    document.getElementById('totalSummary').innerHTML = `
        <h3 class="text-primary">R$ ${total.toFixed(2).replace('.', ',')}</h3>
        <small class="text-muted">*Valor estimado, pode variar conforme condições do pet</small>
    `;
}

// ===== FORM SUBMISSION =====
function handleFormSubmission(e) {
    e.preventDefault();
    
    if (!document.getElementById('terms').checked) {
        showNotification('❌ Você deve aceitar os termos e condições.', 'error');
        return;
    }
    
    // Show loading
    const submitBtn = document.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processando...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message with confetti
        showSuccessModal();
        triggerConfetti();
        
        // Reset form
        document.getElementById('appointmentForm').reset();
        currentStep = 1;
        document.querySelectorAll('.form-step').forEach(step => step.classList.remove('active'));
        document.getElementById('step1').classList.add('active');
        updateProgressBar();
        
    }, 2000);
}

function showSuccessModal() {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body text-center p-5">
                    <div class="success-icon mb-4">
                        <i class="fas fa-check-circle text-success" style="font-size: 4rem;"></i>
                    </div>
                    <h3 class="text-success mb-3">Agendamento Confirmado!</h3>
                    <p class="mb-4">
                        Seu agendamento foi realizado com sucesso! Você receberá uma confirmação 
                        por e-mail e WhatsApp com todos os detalhes.
                    </p>
                    <div class="alert alert-info">
                        <i class="fas fa-info-circle me-2"></i>
                        <strong>Número do agendamento:</strong> #${generateAppointmentNumber()}
                    </div>
                    <button type="button" class="btn btn-primary" onclick="closeSuccessModal()">
                        Entendi
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
    
    // Store modal reference for closing
    window.currentSuccessModal = { element: modal, bootstrap: bootstrapModal };
}

function closeSuccessModal() {
    if (window.currentSuccessModal) {
        window.currentSuccessModal.bootstrap.hide();
        setTimeout(() => {
            document.body.removeChild(window.currentSuccessModal.element);
            window.currentSuccessModal = null;
        }, 300);
    }
}

function generateAppointmentNumber() {
    return 'PP' + Date.now().toString().slice(-6);
}

// ===== UTILITY FUNCTIONS =====
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

function formatCPF(value) {
    // Remove all non-digits
    value = value.replace(/\D/g, '');
    
    // Apply mask 000.000.000-00
    if (value.length >= 9) {
        return value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
    } else if (value.length >= 6) {
        return value.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
    } else if (value.length >= 3) {
        return value.replace(/(\d{3})(\d{0,3})/, '$1.$2');
    } else {
        return value;
    }
}

function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// ===== ENHANCED CALENDAR =====
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
        
        let calendarHTML = `
            <div class="calendar-header">
                <button class="btn btn-sm btn-outline-primary" onclick="changeMonth(-1)">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <h4>${getMonthName(month)} ${year}</h4>
                <button class="btn btn-sm btn-outline-primary" onclick="changeMonth(1)">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        `;
        
        calendarHTML += '<div class="calendar-grid">';
        
        // Day headers
        const dayHeaders = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        dayHeaders.forEach(day => {
            calendarHTML += `<div class="calendar-day-header">${day}</div>`;
        });

        // Empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            calendarHTML += '<div class="calendar-day empty"></div>';
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(year, month, day);
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            const isPast = currentDate < today;
            const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
            const isAvailable = !isPast && !isWeekend && Math.random() > 0.2; // 80% availability on weekdays
            
            let dayClass = 'calendar-day';
            if (isToday) dayClass += ' today';
            if (isPast) dayClass += ' past';
            if (isWeekend && !isPast) dayClass += ' weekend';
            if (isAvailable && !isPast && !isWeekend) dayClass += ' available';
            
            calendarHTML += `<div class="${dayClass}" data-date="${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}" onclick="selectDate(this)">${day}</div>`;
        }

        calendarHTML += '</div>';
        
        // Legend
        calendarHTML += `
            <div class="calendar-legend">
                <div class="legend-item">
                    <div class="legend-color available"></div>
                    <span>Disponível</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color weekend"></div>
                    <span>Fim de semana</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color past"></div>
                    <span>Indisponível</span>
                </div>
            </div>
        `;
        
        calendar.innerHTML = calendarHTML;
    }

    function getMonthName(month) {
        const months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        return months[month];
    }

    // Make functions global for onclick handlers
    window.changeMonth = function(direction) {
        const header = calendar.querySelector('.calendar-header h4');
        const [monthName, year] = header.textContent.split(' ');
        const monthIndex = getMonthIndex(monthName);
        
        let newMonth = monthIndex + direction;
        let newYear = parseInt(year);
        
        if (newMonth < 0) {
            newMonth = 11;
            newYear--;
        } else if (newMonth > 11) {
            newMonth = 0;
            newYear++;
        }
        
        generateCalendar(newYear, newMonth);
    };

    window.selectDate = function(dayElement) {
        if (!dayElement.classList.contains('available')) return;
        
        // Remove previous selection
        calendar.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
        
        // Select current day
        dayElement.classList.add('selected');
        
        const selectedDate = dayElement.getAttribute('data-date');
        showTimeSlots(selectedDate);
    };

    function getMonthIndex(monthName) {
        const months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        return months.indexOf(monthName);
    }

    function showTimeSlots(date) {
        const timeSlotsContainer = document.getElementById('timeSlots');
        if (!timeSlotsContainer) return;

        const availableSlots = [
            '08:00', '09:00', '10:00', '11:00', 
            '14:00', '15:00', '16:00', '17:00'
        ];

        let slotsHTML = `
            <h4>Horários para ${formatDate(date)}</h4>
            <div class="time-slots-grid">
        `;
        
        availableSlots.forEach(slot => {
            const isAvailable = Math.random() > 0.3; // 70% availability
            const slotClass = isAvailable ? 'time-slot available' : 'time-slot occupied';
            
            slotsHTML += `
                <button class="${slotClass}" ${isAvailable ? '' : 'disabled'} onclick="selectTimeSlot(this)">
                    ${slot}
                </button>
            `;
        });

        slotsHTML += '</div>';
        
        slotsHTML += `
            <div class="time-legend mt-3">
                <div class="legend-item">
                    <div class="legend-color time-available"></div>
                    <span>Disponível</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color time-occupied"></div>
                    <span>Ocupado</span>
                </div>
            </div>
        `;
        
        timeSlotsContainer.innerHTML = slotsHTML;
    }

    window.selectTimeSlot = function(slotElement) {
        if (slotElement.disabled) return;
        
        // Remove previous selection
        document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
        
        // Select current slot
        slotElement.classList.add('selected');
        
        showNotification(`✅ Horário ${slotElement.textContent} selecionado!`, 'success');
    };
}

// ===== ADDITIONAL STYLES =====
const appointmentStyles = document.createElement('style');
appointmentStyles.textContent = `
    .page-hero {
        background: linear-gradient(135deg, var(--primary-blue), var(--primary-green));
        color: white;
        padding: 120px 0 80px;
        min-height: auto;
    }
    
    .hero-features {
        margin-top: 2rem;
    }
    
    .feature-item {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        font-weight: 500;
    }
    
    .feature-item i {
        margin-right: 10px;
        font-size: 1.2rem;
    }
    
    .appointment-form-card {
        background: white;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-hover);
        padding: 2rem;
        margin-bottom: 2rem;
        position: relative;
    }
    
    .form-step {
        display: none;
        animation: fadeInUp 0.5s ease;
    }
    
    .form-step.active {
        display: block;
    }
    
    .step-header {
        text-align: center;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid #f8f9fa;
    }
    
    .step-header h3 {
        color: var(--primary-blue);
        margin-bottom: 0.5rem;
    }
    
    .step-navigation {
        display: flex;
        justify-content: space-between;
        margin-top: 2rem;
        padding-top: 1rem;
        border-top: 1px solid #eee;
    }
    
    .form-progress {
        margin-top: 2rem;
    }
    
    .progress-steps {
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;
    }
    
    .progress-steps .step {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #e9ecef;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        color: #6c757d;
        transition: all 0.3s ease;
    }
    
    .progress-steps .step.active {
        background: var(--primary-blue);
        color: white;
    }
    
    .services-selection {
        display: grid;
        gap: 1rem;
        margin-bottom: 2rem;
    }
    
    .service-option {
        position: relative;
    }
    
    .service-option input[type="checkbox"] {
        position: absolute;
        opacity: 0;
        pointer-events: none;
    }
    
    .service-label {
        display: flex;
        align-items: center;
        padding: 1.5rem;
        border: 2px solid #e9ecef;
        border-radius: var(--border-radius);
        cursor: pointer;
        transition: all 0.3s ease;
        background: white;
    }
    
    .service-label:hover {
        border-color: var(--primary-blue);
        box-shadow: var(--shadow);
    }
    
    .service-label.selected {
        border-color: var(--primary-blue);
        background: rgba(52, 152, 219, 0.1);
    }
    
    .service-icon {
        width: 60px;
        height: 60px;
        margin-right: 1rem;
        border-radius: 50%;
        background: var(--gradient-1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }
    
    .service-icon img {
        width: 35px;
        height: 35px;
        object-fit: contain;
        filter: brightness(0) invert(1);
    }
    
    .service-info h4 {
        margin-bottom: 0.5rem;
        color: var(--text-dark);
    }
    
    .service-info p {
        margin-bottom: 0.5rem;
        color: #6c757d;
    }
    
    .service-price {
        font-weight: 600;
        color: var(--primary-green);
    }
    
    .additional-services {
        background: #f8f9fa;
        padding: 1.5rem;
        border-radius: var(--border-radius);
        margin-top: 2rem;
    }
    
    .additional-services h4 {
        margin-bottom: 1rem;
        color: var(--text-dark);
    }
    
    .appointment-summary {
        background: #f8f9fa;
        padding: 2rem;
        border-radius: var(--border-radius);
        margin-bottom: 2rem;
    }
    
    .summary-section {
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #dee2e6;
    }
    
    .summary-section:last-child {
        border-bottom: none;
        margin-bottom: 0;
    }
    
    .summary-section h4 {
        color: var(--primary-blue);
        margin-bottom: 1rem;
    }
    
    .total-section {
        background: white;
        padding: 1.5rem;
        border-radius: var(--border-radius);
        border: 2px solid var(--primary-green);
    }
    
    .total-price h3 {
        margin-bottom: 0.5rem;
    }
    
    .terms-section {
        background: #fff3cd;
        padding: 1rem;
        border-radius: var(--border-radius);
        border: 1px solid #ffeaa7;
        margin-bottom: 2rem;
    }
    
    .emergency-card {
        background: linear-gradient(135deg, #e74c3c, #c0392b);
        color: white;
        padding: 2rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
    }
    
    .emergency-card h3 {
        margin-bottom: 1rem;
    }
    
    .calendar-legend,
    .time-legend {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
        flex-wrap: wrap;
    }
    
    .legend-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
    }
    
    .legend-color {
        width: 20px;
        height: 20px;
        border-radius: 4px;
    }
    
    .legend-color.available {
        background: #e8f5e8;
        border: 2px solid var(--primary-green);
    }
    
    .legend-color.weekend {
        background: #fff3cd;
        border: 2px solid #ffc107;
    }
    
    .legend-color.past {
        background: #f5f5f5;
        border: 2px solid #ccc;
    }
    
    .legend-color.time-available {
        background: var(--primary-blue);
    }
    
    .legend-color.time-occupied {
        background: #f5f5f5;
        border: 2px solid #ddd;
    }
    
    .calendar-day.weekend {
        background: #fff3cd;
        color: #856404;
    }
    
    .calendar-day.weekend:hover {
        background: #ffc107;
        color: white;
    }
    
    .success-icon {
        animation: bounce 1s ease;
    }
    
    @media (max-width: 768px) {
        .appointment-form-card {
            padding: 1rem;
        }
        
        .service-label {
            flex-direction: column;
            text-align: center;
        }
        
        .service-icon {
            margin-right: 0;
            margin-bottom: 1rem;
        }
        
        .step-navigation {
            flex-direction: column;
            gap: 1rem;
        }
        
        .calendar-legend,
        .time-legend {
            justify-content: center;
        }
    }
`;
document.head.appendChild(appointmentStyles);

