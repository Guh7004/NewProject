// Data
const services = [
    {
        name: "Corte Premium",
        price: "R$ 80",
        description: "Corte personalizado com técnicas exclusivas e produtos importados",
        duration: "45 min",
        image: "images/Uxvo4C8iS9UV.jpg"
    },
    {
        name: "Barba Completa",
        price: "R$ 60",
        description: "Aparar, desenhar e finalizar com produtos premium",
        duration: "30 min",
        image: "images/UE6W9Xg4UmNc.jpg"
    },
    {
        name: "Combo King",
        price: "R$ 120",
        description: "Corte + Barba + Tratamento facial + Bebida premium",
        duration: "75 min",
        image: "images/Mj8daCvD9bHD.png"
    },
    {
        name: "Tratamento Capilar",
        price: "R$ 100",
        description: "Hidratação profunda com produtos importados",
        duration: "60 min",
        image: "images/ACTTgPixoxee.jpg"
    }
];

const testimonials = [
    {
        name: "Carlos Silva",
        text: "Melhor barbearia da cidade! Atendimento VIP e resultado impecável.",
        rating: 5
    },
    {
        name: "Roberto Santos",
        text: "Ambiente sofisticado e profissionais extremamente qualificados.",
        rating: 5
    },
    {
        name: "André Costa",
        text: "Experiência única! Vale cada centavo investido.",
        rating: 5
    }
];

const team = [
    {
        name: "Master João",
        specialty: "Especialista em Cortes Clássicos",
        experience: "15 anos",
        image: "images/AtRAX08yzAw3.jpg"
    },
    {
        name: "Expert Carlos",
        specialty: "Barbas e Bigodes",
        experience: "12 anos",
        image: "images/ANSgsnmgDtlJ.jpg"
    },
    {
        name: "Pro Miguel",
        specialty: "Cortes Modernos",
        experience: "8 anos",
        image: "images/cFDWuaqYNlnR.jpg"
    }
];

const galleryImages = [
    "images/uAxTOCvGmbtQ.jpg",
    "images/52mqOdfpFVsK.jpg",
    "images/EsZFyHsQmBPf.jpeg",
    "images/Mj8daCvD9bHD.png",
    "images/AtRAX08yzAw3.jpg",
    "images/ANSgsnmgDtlJ.jpg",
    "images/Uxvo4C8iS9UV.jpg",
    "images/UE6W9Xg4UmNc.jpg",
    "images/ACTTgPixoxee.jpg"
];

// State
let currentTestimonial = 0;
let currentLightboxImage = 0;
let currentBookingStep = 1;
let selectedService = null;
let bookingData = {};

// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const servicesGrid = document.getElementById('servicesGrid');
const galleryGrid = document.getElementById('galleryGrid');
const teamGrid = document.getElementById('teamGrid');
const testimonialCard = document.getElementById('testimonialCard');
const prevTestimonialBtn = document.getElementById('prevTestimonial');
const nextTestimonialBtn = document.getElementById('nextTestimonial');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const bookingModal = document.getElementById('bookingModal');
const modalClose = document.getElementById('modalClose');
const bookingForm = document.getElementById('bookingForm');
const serviceOptions = document.getElementById('serviceOptions');
const prevStepBtn = document.getElementById('prevStep');
const nextStepBtn = document.getElementById('nextStep');
const submitFormBtn = document.getElementById('submitForm');
const successMessage = document.getElementById('successMessage');
const successSummary = document.getElementById('successSummary');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeServices();
    initializeGallery();
    initializeTeam();
    initializeTestimonials();
    initializeLightbox();
    initializeBookingModal();
    initializeScrollEffects();
    initializeSmoothScrolling();
});

// Navigation
function initializeNavigation() {
    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        
        // Animate hamburger
        const lines = mobileMenuToggle.querySelectorAll('.hamburger-line');
        if (mobileMenu.classList.contains('active')) {
            lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            lines[0].style.transform = 'none';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            const lines = mobileMenuToggle.querySelectorAll('.hamburger-line');
            lines[0].style.transform = 'none';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'none';
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Services
function initializeServices() {
    servicesGrid.innerHTML = services.map(service => `
        <div class="service-card card-hover">
            <img src="${service.image}" alt="${service.name}" class="service-image">
            <h3 class="service-name">${service.name}</h3>
            <p class="service-description">${service.description}</p>
            <div class="service-details">
                <span class="service-price">${service.price}</span>
                <span class="service-duration">${service.duration}</span>
            </div>
            <button class="btn-primary" onclick="openBookingModal('${service.name}')">
                Agendar
            </button>
        </div>
    `).join('');
}

// Gallery
function initializeGallery() {
    galleryGrid.innerHTML = galleryImages.map((image, index) => `
        <div class="gallery-item" onclick="openLightbox(${index})">
            <img src="${image}" alt="Galeria ${index + 1}">
        </div>
    `).join('');
}

// Team
function initializeTeam() {
    teamGrid.innerHTML = team.map(member => `
        <div class="team-card card-hover">
            <img src="${member.image}" alt="${member.name}" class="team-image">
            <div class="team-info">
                <h3 class="team-name">${member.name}</h3>
                <p class="team-specialty">${member.specialty}</p>
                <p class="team-experience">${member.experience} de experiência</p>
            </div>
        </div>
    `).join('');
}

// Testimonials
function initializeTestimonials() {
    updateTestimonial();
    
    prevTestimonialBtn.addEventListener('click', function() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        updateTestimonial();
    });
    
    nextTestimonialBtn.addEventListener('click', function() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonial();
    });

    // Auto-rotate testimonials
    setInterval(function() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonial();
    }, 5000);
}

function updateTestimonial() {
    const testimonial = testimonials[currentTestimonial];
    const stars = Array(testimonial.rating).fill('★').join('');
    
    testimonialCard.innerHTML = `
        <div class="testimonial-stars">
            ${Array(testimonial.rating).fill('<svg class="star" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>').join('')}
        </div>
        <p class="testimonial-text">"${testimonial.text}"</p>
        <div class="testimonial-author">
            <div class="author-avatar">${testimonial.name.charAt(0)}</div>
            <div>
                <h4 class="author-name">${testimonial.name}</h4>
                <p class="author-role">Cliente VIP</p>
            </div>
        </div>
    `;
}

// Lightbox
function initializeLightbox() {
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevLightboxImage);
    lightboxNext.addEventListener('click', nextLightboxImage);
    
    // Close lightbox when clicking outside
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                prevLightboxImage();
            } else if (e.key === 'ArrowRight') {
                nextLightboxImage();
            }
        }
    });
}

function openLightbox(index) {
    currentLightboxImage = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function prevLightboxImage() {
    currentLightboxImage = (currentLightboxImage - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
}

function nextLightboxImage() {
    currentLightboxImage = (currentLightboxImage + 1) % galleryImages.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    lightboxImage.src = galleryImages[currentLightboxImage];
    lightboxCounter.textContent = `${currentLightboxImage + 1} de ${galleryImages.length}`;
}

// Booking Modal
function initializeBookingModal() {
    modalClose.addEventListener('click', closeBookingModal);
    prevStepBtn.addEventListener('click', prevBookingStep);
    nextStepBtn.addEventListener('click', nextBookingStep);
    submitFormBtn.addEventListener('click', submitBooking);
    
    // Close modal when clicking outside
    bookingModal.addEventListener('click', function(e) {
        if (e.target === bookingModal) {
            closeBookingModal();
        }
    });
    
    // Initialize service options
    initializeServiceOptions();
    
    // Set minimum date to today
    const dateInput = bookingForm.querySelector('input[name="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
}

function initializeServiceOptions() {
    serviceOptions.innerHTML = services.map((service, index) => `
        <div class="service-option" data-service="${index}">
            <div class="service-option-header">
                <span class="service-option-name">${service.name}</span>
                <span class="service-option-price">${service.price}</span>
            </div>
            <p class="service-option-description">${service.description}</p>
            <p class="service-option-duration">Duração: ${service.duration}</p>
        </div>
    `).join('');
    
    // Add click handlers to service options
    const serviceOptionElements = serviceOptions.querySelectorAll('.service-option');
    serviceOptionElements.forEach((option, index) => {
        option.addEventListener('click', function() {
            // Remove previous selection
            serviceOptionElements.forEach(opt => opt.classList.remove('selected'));
            
            // Select current option
            option.classList.add('selected');
            selectedService = index;
            bookingData.service = services[index];
            
            // Enable next button
            nextStepBtn.disabled = false;
        });
    });
}

function openBookingModal(serviceName = null) {
    // Reset modal state
    currentBookingStep = 1;
    selectedService = null;
    bookingData = {};
    
    // Reset form
    bookingForm.reset();
    
    // Reset progress
    updateBookingProgress();
    
    // Show first step
    showBookingStep(1);
    
    // Pre-select service if provided
    if (serviceName) {
        const serviceIndex = services.findIndex(s => s.name === serviceName);
        if (serviceIndex !== -1) {
            setTimeout(() => {
                const serviceOption = serviceOptions.querySelector(`[data-service="${serviceIndex}"]`);
                if (serviceOption) {
                    serviceOption.click();
                }
            }, 100);
        }
    }
    
    // Show modal
    bookingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
    bookingModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Hide success message
    successMessage.style.display = 'none';
    bookingForm.style.display = 'block';
}

function prevBookingStep() {
    if (currentBookingStep > 1) {
        currentBookingStep--;
        showBookingStep(currentBookingStep);
        updateBookingProgress();
    }
}

function nextBookingStep() {
    if (validateCurrentStep()) {
        if (currentBookingStep < 3) {
            currentBookingStep++;
            showBookingStep(currentBookingStep);
            updateBookingProgress();
        }
    }
}

function showBookingStep(step) {
    // Hide all steps
    const steps = bookingForm.querySelectorAll('.form-step');
    steps.forEach(s => s.classList.remove('active'));
    
    // Show current step
    const currentStep = bookingForm.querySelector(`[data-step="${step}"]`);
    if (currentStep) {
        currentStep.classList.add('active');
    }
    
    // Update navigation buttons
    prevStepBtn.disabled = step === 1;
    
    if (step === 3) {
        nextStepBtn.style.display = 'none';
        submitFormBtn.style.display = 'block';
    } else {
        nextStepBtn.style.display = 'block';
        submitFormBtn.style.display = 'none';
        nextStepBtn.disabled = step === 1 && selectedService === null;
    }
}

function updateBookingProgress() {
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressLines = document.querySelectorAll('.progress-line');
    
    progressSteps.forEach((step, index) => {
        const stepNumber = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNumber < currentBookingStep) {
            step.classList.add('completed');
        } else if (stepNumber === currentBookingStep) {
            step.classList.add('active');
        }
    });
    
    progressLines.forEach((line, index) => {
        line.classList.remove('completed');
        if (index + 1 < currentBookingStep) {
            line.classList.add('completed');
        }
    });
}

function validateCurrentStep() {
    switch (currentBookingStep) {
        case 1:
            return selectedService !== null;
        case 2:
            const date = bookingForm.querySelector('input[name="date"]').value;
            const time = bookingForm.querySelector('select[name="time"]').value;
            return date && time;
        case 3:
            const name = bookingForm.querySelector('input[name="name"]').value;
            const phone = bookingForm.querySelector('input[name="phone"]').value;
            const email = bookingForm.querySelector('input[name="email"]').value;
            return name && phone && email;
        default:
            return true;
    }
}

function submitBooking(e) {
    e.preventDefault();
    
    if (!validateCurrentStep()) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Collect form data
    const formData = new FormData(bookingForm);
    bookingData.date = formData.get('date');
    bookingData.time = formData.get('time');
    bookingData.name = formData.get('name');
    bookingData.phone = formData.get('phone');
    bookingData.email = formData.get('email');
    bookingData.notes = formData.get('notes');
    
    // Show success message
    showSuccessMessage();
}

function showSuccessMessage() {
    // Hide form
    bookingForm.style.display = 'none';
    
    // Show success message
    successMessage.style.display = 'block';
    
    // Populate summary
    const service = services[selectedService];
    const date = new Date(bookingData.date).toLocaleDateString('pt-BR');
    
    successSummary.innerHTML = `
        <div class="summary-item">
            <span class="summary-label">Serviço:</span>
            <span class="summary-value">${service.name}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Data:</span>
            <span class="summary-value">${date}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Horário:</span>
            <span class="summary-value">${bookingData.time}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Cliente:</span>
            <span class="summary-value">${bookingData.name}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Telefone:</span>
            <span class="summary-value">${bookingData.phone}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Valor:</span>
            <span class="summary-value">${service.price}</span>
        </div>
    `;
    
    // Auto-close modal after 5 seconds
    setTimeout(() => {
        closeBookingModal();
    }, 5000);
}

// Scroll Effects
function initializeScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .team-card, .feature-card, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Global functions for HTML onclick handlers
window.openBookingModal = openBookingModal;
window.openLightbox = openLightbox;
window.scrollToSection = scrollToSection;

// Newsletter subscription
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        const newsletterBtn = newsletterForm.querySelector('.newsletter-btn');
        const newsletterInput = newsletterForm.querySelector('.newsletter-input');
        
        newsletterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const email = newsletterInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Simulate subscription
                newsletterInput.value = '';
                alert('Obrigado por se inscrever! Você receberá nossas ofertas exclusivas em breve.');
            } else {
                alert('Por favor, insira um e-mail válido.');
            }
        });
        
        newsletterInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                newsletterBtn.click();
            }
        });
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone number formatting
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length <= 11) {
                if (value.length <= 2) {
                    value = value.replace(/(\d{0,2})/, '($1');
                } else if (value.length <= 7) {
                    value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
                } else {
                    value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
                }
            }
            
            e.target.value = value;
        });
    });
});

// Add loading states and error handling
function showLoading(element) {
    element.disabled = true;
    element.innerHTML = 'Carregando...';
}

function hideLoading(element, originalText) {
    element.disabled = false;
    element.innerHTML = originalText;
}

// Add touch support for mobile devices
document.addEventListener('DOMContentLoaded', function() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Swipe support for testimonials
    testimonialCard.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    testimonialCard.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleTestimonialSwipe();
    });
    
    function handleTestimonialSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next testimonial
                nextTestimonialBtn.click();
            } else {
                // Swipe right - previous testimonial
                prevTestimonialBtn.click();
            }
        }
    }
    
    // Swipe support for lightbox
    if (lightbox) {
        lightbox.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        lightbox.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleLightboxSwipe();
        });
        
        function handleLightboxSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next image
                    nextLightboxImage();
                } else {
                    // Swipe right - previous image
                    prevLightboxImage();
                }
            }
        }
    }
});

// Performance optimization - lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
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
});

// Add accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA labels and roles
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label') && button.textContent.trim()) {
            button.setAttribute('aria-label', button.textContent.trim());
        }
    });
    
    // Add keyboard navigation for custom elements
    const customButtons = document.querySelectorAll('.service-option, .gallery-item');
    customButtons.forEach(element => {
        element.setAttribute('tabindex', '0');
        element.setAttribute('role', 'button');
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });
});

console.log('BARBER KING - Site carregado com sucesso!');

