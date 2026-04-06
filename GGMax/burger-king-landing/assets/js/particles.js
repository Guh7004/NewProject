class ParticleSystem {
    constructor() {
        this.container = document.getElementById('particles-container');
        this.particles = [];
        this.particleCount = 50;
        this.init();
    }

    init() {
        this.createParticles();
        this.animate();
        this.handleResize();
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Propriedades aleatórias
        const size = Math.random() * 4 + 1;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const opacity = Math.random() * 0.5 + 0.2;
        const duration = Math.random() * 3 + 3;
        
        // Cores neon aleatórias
        const colors = ['#00ffff', '#ff0080', '#ffff00', '#00ff80', '#8000ff'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            opacity: ${opacity};
            background: ${color};
            box-shadow: 0 0 ${size * 2}px ${color};
            animation-duration: ${duration}s;
            animation-delay: ${Math.random() * 2}s;
        `;
        
        this.container.appendChild(particle);
        this.particles.push({
            element: particle,
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: size,
            color: color
        });
    }

    animate() {
        this.particles.forEach(particle => {
            // Movimento suave
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce nas bordas
            if (particle.x <= 0 || particle.x >= window.innerWidth) {
                particle.vx *= -1;
            }
            if (particle.y <= 0 || particle.y >= window.innerHeight) {
                particle.vy *= -1;
            }
            
            // Manter dentro da tela
            particle.x = Math.max(0, Math.min(window.innerWidth, particle.x));
            particle.y = Math.max(0, Math.min(window.innerHeight, particle.y));
            
            // Atualizar posição
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
        });
        
        requestAnimationFrame(() => this.animate());
    }

    handleResize() {
        window.addEventListener('resize', () => {
            // Reposicionar partículas que saíram da tela
            this.particles.forEach(particle => {
                if (particle.x > window.innerWidth) {
                    particle.x = window.innerWidth - 10;
                }
                if (particle.y > window.innerHeight) {
                    particle.y = window.innerHeight - 10;
                }
            });
        });
    }

    addBurst(x, y) {
        // Criar explosão de partículas no clique
        for (let i = 0; i < 10; i++) {
            const burstParticle = document.createElement('div');
            burstParticle.className = 'particle';
            
            const size = Math.random() * 3 + 2;
            const angle = (Math.PI * 2 * i) / 10;
            const velocity = Math.random() * 3 + 2;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            const colors = ['#00ffff', '#ff0080', '#ffff00'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            burstParticle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: ${color};
                box-shadow: 0 0 ${size * 3}px ${color};
                animation: burstFade 1s ease-out forwards;
            `;
            
            this.container.appendChild(burstParticle);
            
            // Animar partícula de explosão
            let startTime = Date.now();
            const animateBurst = () => {
                const elapsed = Date.now() - startTime;
                const progress = elapsed / 1000;
                
                if (progress < 1) {
                    const currentX = x + vx * elapsed * 0.1;
                    const currentY = y + vy * elapsed * 0.1;
                    
                    burstParticle.style.left = currentX + 'px';
                    burstParticle.style.top = currentY + 'px';
                    burstParticle.style.opacity = 1 - progress;
                    
                    requestAnimationFrame(animateBurst);
                } else {
                    burstParticle.remove();
                }
            };
            
            animateBurst();
        }
    }
}

// Adicionar CSS para animação de explosão
const style = document.createElement('style');
style.textContent = `
    @keyframes burstFade {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0.5);
        }
    }
`;
document.head.appendChild(style);

// Inicializar sistema de partículas quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    const particleSystem = new ParticleSystem();
    
    // Adicionar efeito de explosão no clique
    document.addEventListener('click', (e) => {
        particleSystem.addBurst(e.clientX, e.clientY);
    });
});

