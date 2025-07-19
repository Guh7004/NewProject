// ===== HOTEL PAGE FUNCTIONALITY =====

document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    initializeTestimonialsCarousel();
    initializePricingCalculator();
    initializeHeroStats();
});

// ===== GALLERY FUNCTIONALITY =====
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            openGalleryModal(this);
        });
        
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

function openGalleryModal(galleryItem) {
    const img = galleryItem.querySelector('.gallery-image');
    const overlay = galleryItem.querySelector('.gallery-overlay');
    const title = overlay.querySelector('h3').textContent;
    const description = overlay.querySelector('p').textContent;
    
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="gallery-modal-content">
            <div class="gallery-modal-header">
                <h3>${title}</h3>
                <button class="gallery-modal-close" onclick="closeGalleryModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="gallery-modal-body">
                <img src="${img.src}" alt="${title}" class="gallery-modal-image">
                <p class="gallery-modal-description">${description}</p>
            </div>
        </div>
        <div class="gallery-modal-backdrop" onclick="closeGalleryModal()"></div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
    
    // Store modal reference
    window.currentGalleryModal = modal;
}

window.closeGalleryModal = function() {
    if (window.currentGalleryModal) {
        window.currentGalleryModal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(window.currentGalleryModal);
            window.currentGalleryModal = null;
        }, 300);
    }
};

// ===== TESTIMONIALS CAROUSEL =====
function initializeTestimonialsCarousel() {
    const carousel = document.querySelector('.testimonials-carousel');
    if (!carousel) return;
    
    let currentSlide = 0;
    const slides = carousel.querySelectorAll('.testimonial-item');
    const totalSlides = slides.length;
    
    // Clone slides for infinite scroll
    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        carousel.appendChild(clone);
    });
    
    function showSlide(index) {
        const slideWidth = slides[0].offsetWidth + 20; // Include gap
        carousel.style.transform = `translateX(-${index * slideWidth}px)`;
    }
    
    function nextSlide() {
        currentSlide++;
        if (currentSlide >= totalSlides) {
            currentSlide = 0;
            carousel.style.transition = 'none';
            showSlide(currentSlide);
            setTimeout(() => {
                carousel.style.transition = 'transform 0.5s ease';
            }, 10);
        } else {
            showSlide(currentSlide);
        }
    }
    
    function prevSlide() {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = totalSlides - 1;
            carousel.style.transition = 'none';
            showSlide(currentSlide);
            setTimeout(() => {
                carousel.style.transition = 'transform 0.5s ease';
            }, 10);
        } else {
            showSlide(currentSlide);
        }
    }
    
    // Auto-play
    setInterval(nextSlide, 5000);
    
    // Touch/swipe support
    let startX = 0;
    let isDragging = false;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    carousel.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        
        isDragging = false;
    });
}

// ===== PRICING CALCULATOR =====
function initializePricingCalculator() {
    // Add interactive pricing calculator
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        const button = card.querySelector('.btn');
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get pricing info
            const size = card.querySelector('h3').textContent;
            const price = card.querySelector('.amount').textContent;
            
            // Show booking modal
            showBookingModal(size, price);
        });
    });
}

function showBookingModal(size, price) {
    const modal = document.createElement('div');
    modal.className = 'booking-modal';
    modal.innerHTML = `
        <div class="booking-modal-content">
            <div class="booking-modal-header">
                <h3>Reserva para ${size}</h3>
                <button class="booking-modal-close" onclick="closeBookingModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="booking-modal-body">
                <div class="booking-summary">
                    <h4>Resumo da Reserva</h4>
                    <div class="booking-item">
                        <span>Porte do Pet:</span>
                        <span>${size}</span>
                    </div>
                    <div class="booking-item">
                        <span>Preço por dia:</span>
                        <span>R$ ${price},00</span>
                    </div>
                </div>
                
                <div class="booking-form">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">Data de Check-in</label>
                            <input type="date" class="form-control" id="checkinDate">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Data de Check-out</label>
                            <input type="date" class="form-control" id="checkoutDate">
                        </div>
                        <div class="col-12">
                            <div class="booking-total">
                                <strong>Total estimado: <span id="totalPrice">R$ 0,00</span></strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="booking-modal-footer">
                <button class="btn btn-outline-secondary" onclick="closeBookingModal()">Cancelar</button>
                <a href="agendamento.html" class="btn btn-primary">Continuar Reserva</a>
            </div>
        </div>
        <div class="booking-modal-backdrop" onclick="closeBookingModal()"></div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
    
    // Add date change listeners
    const checkinInput = modal.querySelector('#checkinDate');
    const checkoutInput = modal.querySelector('#checkoutDate');
    
    function updateTotal() {
        const checkin = new Date(checkinInput.value);
        const checkout = new Date(checkoutInput.value);
        
        if (checkin && checkout && checkout > checkin) {
            const days = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));
            const total = days * parseInt(price);
            modal.querySelector('#totalPrice').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        }
    }
    
    checkinInput.addEventListener('change', updateTotal);
    checkoutInput.addEventListener('change', updateTotal);
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    checkinInput.min = today;
    checkoutInput.min = today;
    
    // Store modal reference
    window.currentBookingModal = modal;
}

window.closeBookingModal = function() {
    if (window.currentBookingModal) {
        window.currentBookingModal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(window.currentBookingModal);
            window.currentBookingModal = null;
        }, 300);
    }
};

// ===== HERO STATS ANIMATION =====
function initializeHeroStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatNumber(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    stats.forEach(stat => observer.observe(stat));
}

function animateStatNumber(element) {
    const text = element.textContent;
    const isPercentage = text.includes('%');
    const isStars = text.includes('★');
    const isClock = text.includes('/');
    
    if (isPercentage) {
        const number = parseInt(text);
        animateNumber(element, 0, number, 2000, '%');
    } else if (isStars) {
        element.style.color = '#ffc107';
        element.style.textShadow = '0 0 10px rgba(255, 193, 7, 0.5)';
    } else if (isClock) {
        element.style.color = '#28a745';
        element.style.fontWeight = 'bold';
    }
}

function animateNumber(element, start, end, duration, suffix = '') {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// ===== ADDITIONAL STYLES =====
const hotelStyles = document.createElement('style');
hotelStyles.textContent = `
    .hero-stats {
        display: flex;
        gap: 2rem;
        margin-top: 2rem;
        flex-wrap: wrap;
    }
    
    .stat-item {
        text-align: center;
        background: rgba(255, 255, 255, 0.1);
        padding: 1rem;
        border-radius: var(--border-radius);
        backdrop-filter: blur(10px);
        min-width: 100px;
    }
    
    .stat-number {
        font-size: 2rem;
        font-weight: 800;
        color: white;
        display: block;
        margin-bottom: 0.5rem;
    }
    
    .stat-label {
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.9);
        font-weight: 500;
    }
    
    .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;
    }
    
    .gallery-item {
        position: relative;
        border-radius: var(--border-radius);
        overflow: hidden;
        cursor: pointer;
        transition: all 0.3s ease;
        height: 250px;
    }
    
    .gallery-item.large {
        grid-column: span 2;
        height: 400px;
    }
    
    .gallery-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }
    
    .gallery-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(transparent, rgba(0,0,0,0.8));
        color: white;
        padding: 2rem 1rem 1rem;
        transform: translateY(100%);
        transition: transform 0.3s ease;
    }
    
    .gallery-item:hover .gallery-overlay {
        transform: translateY(0);
    }
    
    .gallery-item:hover .gallery-image {
        transform: scale(1.1);
    }
    
    .amenity-card {
        background: white;
        padding: 2rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        text-align: center;
        transition: all 0.3s ease;
        height: 100%;
    }
    
    .amenity-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-hover);
    }
    
    .amenity-icon {
        width: 80px;
        height: 80px;
        margin: 0 auto 1rem;
        background: var(--gradient-1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        color: white;
    }
    
    .amenity-features {
        list-style: none;
        padding: 0;
        margin-top: 1rem;
    }
    
    .amenity-features li {
        padding: 0.25rem 0;
        color: #6c757d;
        font-size: 0.9rem;
    }
    
    .pricing-card {
        background: white;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        overflow: hidden;
        transition: all 0.3s ease;
        height: 100%;
        position: relative;
    }
    
    .pricing-card:hover {
        transform: translateY(-10px);
        box-shadow: var(--shadow-hover);
    }
    
    .pricing-card.featured {
        border: 3px solid var(--primary-blue);
        transform: scale(1.05);
    }
    
    .pricing-card.featured:hover {
        transform: scale(1.05) translateY(-10px);
    }
    
    .pricing-header {
        background: var(--gradient-1);
        color: white;
        padding: 2rem 1rem 1rem;
        text-align: center;
        position: relative;
    }
    
    .pricing-badge {
        background: rgba(255, 255, 255, 0.2);
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
        margin-top: 0.5rem;
        display: inline-block;
    }
    
    .pricing-badge.popular {
        background: #ffc107;
        color: #000;
        font-weight: 600;
    }
    
    .pricing-body {
        padding: 2rem 1rem;
        text-align: center;
    }
    
    .price {
        margin-bottom: 2rem;
    }
    
    .currency {
        font-size: 1.2rem;
        vertical-align: top;
        color: var(--primary-blue);
    }
    
    .amount {
        font-size: 3rem;
        font-weight: 800;
        color: var(--primary-blue);
    }
    
    .period {
        font-size: 1rem;
        color: #6c757d;
    }
    
    .pricing-features {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .pricing-features li {
        padding: 0.5rem 0;
        border-bottom: 1px solid #f8f9fa;
    }
    
    .pricing-features li:last-child {
        border-bottom: none;
    }
    
    .pricing-features i {
        color: var(--primary-green);
        margin-right: 0.5rem;
    }
    
    .pricing-footer {
        padding: 1rem;
    }
    
    .discount-card {
        background: linear-gradient(135deg, var(--primary-green), #27ae60);
        color: white;
        padding: 2rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
    }
    
    .discount-list {
        list-style: none;
        padding: 0;
        margin: 1rem 0 0;
    }
    
    .discount-list li {
        padding: 0.5rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .discount-list li:last-child {
        border-bottom: none;
    }
    
    .discount-highlight {
        text-align: center;
        background: rgba(255, 255, 255, 0.1);
        padding: 1rem;
        border-radius: var(--border-radius);
    }
    
    .discount-value {
        font-size: 3rem;
        font-weight: 800;
        display: block;
        color: #ffc107;
    }
    
    .discount-text {
        font-size: 1.2rem;
        font-weight: 600;
    }
    
    .requirement-card {
        background: white;
        padding: 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        display: flex;
        gap: 1rem;
        height: 100%;
    }
    
    .requirement-icon {
        flex-shrink: 0;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: #f8f9fa;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
    }
    
    .requirement-content ul {
        list-style: none;
        padding: 0;
        margin-top: 1rem;
    }
    
    .requirement-content li {
        padding: 0.25rem 0;
        color: #6c757d;
        font-size: 0.9rem;
    }
    
    .requirement-content li:before {
        content: "•";
        color: var(--primary-blue);
        margin-right: 0.5rem;
    }
    
    .testimonials-carousel {
        display: flex;
        gap: 1rem;
        transition: transform 0.5s ease;
        padding: 1rem 0;
    }
    
    .testimonial-item {
        flex: 0 0 350px;
    }
    
    .testimonial-card {
        background: white;
        padding: 2rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        height: 100%;
    }
    
    .testimonial-content {
        margin-bottom: 1.5rem;
    }
    
    .stars {
        color: #ffc107;
        margin-bottom: 1rem;
    }
    
    .testimonial-author {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .author-img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
    }
    
    .author-info h5 {
        margin: 0;
        color: var(--text-dark);
    }
    
    .author-info span {
        color: #6c757d;
        font-size: 0.9rem;
    }
    
    /* Modal Styles */
    .gallery-modal,
    .booking-modal {
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
    
    .gallery-modal.active,
    .booking-modal.active {
        opacity: 1;
        visibility: visible;
    }
    
    .gallery-modal-backdrop,
    .booking-modal-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
    }
    
    .gallery-modal-content,
    .booking-modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border-radius: var(--border-radius);
        max-width: 90vw;
        max-height: 90vh;
        overflow: auto;
    }
    
    .gallery-modal-content {
        width: 800px;
    }
    
    .booking-modal-content {
        width: 600px;
    }
    
    .gallery-modal-header,
    .booking-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        border-bottom: 1px solid #eee;
    }
    
    .gallery-modal-close,
    .booking-modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #6c757d;
    }
    
    .gallery-modal-body,
    .booking-modal-body {
        padding: 2rem;
    }
    
    .gallery-modal-image {
        width: 100%;
        height: auto;
        border-radius: var(--border-radius);
        margin-bottom: 1rem;
    }
    
    .booking-summary {
        background: #f8f9fa;
        padding: 1rem;
        border-radius: var(--border-radius);
        margin-bottom: 1rem;
    }
    
    .booking-item {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
        border-bottom: 1px solid #dee2e6;
    }
    
    .booking-item:last-child {
        border-bottom: none;
    }
    
    .booking-total {
        background: var(--primary-blue);
        color: white;
        padding: 1rem;
        border-radius: var(--border-radius);
        text-align: center;
        margin-top: 1rem;
    }
    
    .booking-modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        padding: 1rem 2rem;
        border-top: 1px solid #eee;
    }
    
    @media (max-width: 768px) {
        .gallery-item.large {
            grid-column: span 1;
            height: 250px;
        }
        
        .hero-stats {
            justify-content: center;
        }
        
        .pricing-card.featured {
            transform: none;
        }
        
        .pricing-card.featured:hover {
            transform: translateY(-10px);
        }
        
        .testimonial-item {
            flex: 0 0 280px;
        }
        
        .gallery-modal-content,
        .booking-modal-content {
            width: 95vw;
            margin: 1rem;
        }
        
        .discount-highlight {
            margin-top: 1rem;
        }
    }
`;
document.head.appendChild(hotelStyles);

