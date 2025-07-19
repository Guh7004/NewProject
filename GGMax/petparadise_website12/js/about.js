// ===== ABOUT PAGE FUNCTIONALITY =====

document.addEventListener('DOMContentLoaded', function() {
    initializeTimeline();
    initializeStatistics();
    initializeTeamCards();
    initializeAchievements();
});

// ===== TIMELINE ANIMATION =====
function initializeTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// ===== STATISTICS COUNTER =====
function initializeStatistics() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(target * easeOutQuart);
        
        element.textContent = current.toLocaleString('pt-BR');
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString('pt-BR');
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// ===== TEAM CARDS INTERACTION =====
function initializeTeamCards() {
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click to expand functionality
        card.addEventListener('click', function() {
            showTeamMemberModal(this);
        });
    });
}

function showTeamMemberModal(teamCard) {
    const name = teamCard.querySelector('h4').textContent;
    const role = teamCard.querySelector('.team-role').textContent;
    const description = teamCard.querySelector('p').textContent;
    const image = teamCard.querySelector('img').src;
    const specialties = Array.from(teamCard.querySelectorAll('.specialty')).map(s => s.textContent);
    
    const modal = document.createElement('div');
    modal.className = 'team-modal';
    modal.innerHTML = `
        <div class="team-modal-content">
            <div class="team-modal-header">
                <button class="team-modal-close" onclick="closeTeamModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="team-modal-body">
                <div class="row align-items-center">
                    <div class="col-md-4">
                        <img src="${image}" alt="${name}" class="team-modal-image">
                    </div>
                    <div class="col-md-8">
                        <h3>${name}</h3>
                        <h5 class="text-primary mb-3">${role}</h5>
                        <p>${description}</p>
                        
                        <div class="specialties-section">
                            <h6>Especialidades:</h6>
                            <div class="specialties-list">
                                ${specialties.map(s => `<span class="specialty-tag">${s}</span>`).join('')}
                            </div>
                        </div>
                        
                        <div class="contact-section mt-4">
                            <h6>Contato:</h6>
                            <div class="contact-buttons">
                                <button class="btn btn-outline-primary btn-sm">
                                    <i class="fab fa-whatsapp me-2"></i>WhatsApp
                                </button>
                                <button class="btn btn-outline-primary btn-sm">
                                    <i class="fas fa-envelope me-2"></i>E-mail
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="team-modal-backdrop" onclick="closeTeamModal()"></div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
    
    window.currentTeamModal = modal;
}

window.closeTeamModal = function() {
    if (window.currentTeamModal) {
        window.currentTeamModal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(window.currentTeamModal);
            window.currentTeamModal = null;
        }, 300);
    }
};

// ===== ACHIEVEMENTS ANIMATION =====
function initializeAchievements() {
    const achievements = document.querySelectorAll('.achievement-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateAchievement(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    achievements.forEach(achievement => {
        observer.observe(achievement);
    });
}

function animateAchievement(element) {
    const text = element.textContent;
    const isPercentage = text.includes('%');
    const isPlus = text.includes('+');
    
    if (isPercentage) {
        const number = parseInt(text);
        animateNumber(element, 0, number, 1500, '%');
    } else if (isPlus) {
        const number = parseInt(text);
        animateNumber(element, 0, number, 2000, '+');
    } else {
        const number = parseInt(text);
        animateNumber(element, 0, number, 1500);
    }
}

function animateNumber(element, start, end, duration, suffix = '') {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeOutCubic);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = end + suffix;
        }
    }
    
    requestAnimationFrame(update);
}

// ===== MISSION CARDS INTERACTION =====
document.addEventListener('DOMContentLoaded', function() {
    const missionCards = document.querySelectorAll('.mission-card');
    
    missionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
});

// ===== CERTIFICATION CARDS ANIMATION =====
document.addEventListener('DOMContentLoaded', function() {
    const certCards = document.querySelectorAll('.certification-card');
    
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
    
    certCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
});

// ===== ADDITIONAL STYLES =====
const aboutStyles = document.createElement('style');
aboutStyles.textContent = `
    .hero-achievements {
        display: flex;
        gap: 2rem;
        margin-top: 2rem;
        flex-wrap: wrap;
    }
    
    .achievement-item {
        text-align: center;
        background: rgba(255, 255, 255, 0.1);
        padding: 1.5rem 1rem;
        border-radius: var(--border-radius);
        backdrop-filter: blur(10px);
        min-width: 120px;
    }
    
    .achievement-number {
        font-size: 2.5rem;
        font-weight: 800;
        color: white;
        display: block;
        margin-bottom: 0.5rem;
    }
    
    .achievement-label {
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.9);
        font-weight: 500;
    }
    
    .story-timeline {
        position: relative;
        padding-left: 2rem;
    }
    
    .story-timeline::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background: linear-gradient(to bottom, var(--primary-blue), var(--primary-green));
        border-radius: 2px;
    }
    
    .timeline-item {
        position: relative;
        margin-bottom: 3rem;
        opacity: 0;
        transform: translateX(-30px);
        transition: all 0.6s ease;
    }
    
    .timeline-item.animate {
        opacity: 1;
        transform: translateX(0);
    }
    
    .timeline-item::before {
        content: '';
        position: absolute;
        left: -2.5rem;
        top: 0.5rem;
        width: 15px;
        height: 15px;
        background: var(--primary-blue);
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 0 0 3px var(--primary-blue);
    }
    
    .timeline-year {
        display: inline-block;
        background: var(--gradient-1);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-weight: 600;
        margin-bottom: 1rem;
        font-size: 0.9rem;
    }
    
    .timeline-content h4 {
        color: var(--primary-blue);
        margin-bottom: 1rem;
    }
    
    .timeline-content p {
        color: #6c757d;
        line-height: 1.6;
    }
    
    .mission-card {
        background: white;
        padding: 2rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        text-align: center;
        height: 100%;
        transition: all 0.3s ease;
    }
    
    .mission-icon {
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
    
    .mission-card h3 {
        color: var(--primary-blue);
        margin-bottom: 1rem;
    }
    
    .values-list {
        list-style: none;
        padding: 0;
        margin-top: 1rem;
        text-align: left;
    }
    
    .values-list li {
        padding: 0.5rem 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .values-list i {
        color: var(--primary-blue);
        width: 20px;
    }
    
    .team-card {
        background: white;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        overflow: hidden;
        transition: all 0.3s ease;
        cursor: pointer;
        height: 100%;
    }
    
    .team-image {
        position: relative;
        height: 250px;
        overflow: hidden;
    }
    
    .team-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }
    
    .team-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(52, 152, 219, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .team-card:hover .team-overlay {
        opacity: 1;
    }
    
    .team-card:hover .team-image img {
        transform: scale(1.1);
    }
    
    .team-social {
        display: flex;
        gap: 1rem;
    }
    
    .team-social .social-link {
        width: 40px;
        height: 40px;
        background: white;
        color: var(--primary-blue);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        transition: all 0.3s ease;
    }
    
    .team-social .social-link:hover {
        background: var(--primary-blue);
        color: white;
        transform: scale(1.1);
    }
    
    .team-info {
        padding: 1.5rem;
    }
    
    .team-info h4 {
        color: var(--primary-blue);
        margin-bottom: 0.5rem;
    }
    
    .team-role {
        color: var(--primary-green);
        font-weight: 600;
        font-size: 0.9rem;
        display: block;
        margin-bottom: 1rem;
    }
    
    .team-info p {
        color: #6c757d;
        font-size: 0.9rem;
        line-height: 1.5;
        margin-bottom: 1rem;
    }
    
    .team-specialties {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }
    
    .specialty {
        background: rgba(52, 152, 219, 0.1);
        color: var(--primary-blue);
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 500;
    }
    
    .certification-card {
        background: white;
        padding: 2rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        text-align: center;
        height: 100%;
        transition: all 0.3s ease;
    }
    
    .certification-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-hover);
    }
    
    .cert-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }
    
    .certification-card h4 {
        color: var(--primary-blue);
        margin-bottom: 1rem;
    }
    
    .certification-card p {
        color: #6c757d;
        font-size: 0.9rem;
    }
    
    .stat-card {
        background: white;
        padding: 2rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        text-align: center;
        transition: all 0.3s ease;
    }
    
    .stat-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-hover);
    }
    
    .stat-icon {
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
    
    .stat-number {
        font-size: 3rem;
        font-weight: 800;
        color: var(--primary-blue);
        margin-bottom: 0.5rem;
        display: block;
    }
    
    .stat-label {
        color: #6c757d;
        font-weight: 500;
    }
    
    /* Team Modal Styles */
    .team-modal {
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
    
    .team-modal.active {
        opacity: 1;
        visibility: visible;
    }
    
    .team-modal-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
    }
    
    .team-modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border-radius: var(--border-radius);
        width: 90vw;
        max-width: 700px;
        max-height: 90vh;
        overflow: auto;
    }
    
    .team-modal-header {
        display: flex;
        justify-content: flex-end;
        padding: 1rem;
        border-bottom: 1px solid #eee;
    }
    
    .team-modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #6c757d;
    }
    
    .team-modal-body {
        padding: 2rem;
    }
    
    .team-modal-image {
        width: 100%;
        border-radius: var(--border-radius);
        margin-bottom: 1rem;
    }
    
    .specialties-section {
        margin-top: 1.5rem;
    }
    
    .specialties-list {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        margin-top: 0.5rem;
    }
    
    .specialty-tag {
        background: var(--primary-blue);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 500;
    }
    
    .contact-buttons {
        display: flex;
        gap: 1rem;
        margin-top: 0.5rem;
    }
    
    @media (max-width: 768px) {
        .hero-achievements {
            justify-content: center;
        }
        
        .achievement-item {
            min-width: 100px;
        }
        
        .story-timeline {
            padding-left: 1.5rem;
        }
        
        .timeline-item::before {
            left: -2rem;
        }
        
        .team-modal-content {
            width: 95vw;
            margin: 1rem;
        }
        
        .contact-buttons {
            flex-direction: column;
        }
    }
`;
document.head.appendChild(aboutStyles);

