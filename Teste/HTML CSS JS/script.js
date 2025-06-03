const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = []; 
const numMainParticles = 7000; 
const numShadowParticles = 7000; 
const particleSize = 1.2;
const colors = ['#E34F26', '#1572B6', '#F7DF1E', '#00CDCD', '#64DD17', '#FF6F00', '#AA00FF'];
const shadowColor = 'rgba(100, 100, 100, 0.4)'; 
const text = 'HTML CSS JS';
const font = 'bold 160px Arial'; 

const explosionRadius = Math.min(canvas.width, canvas.height) / 3;
const attractionStrength = 0.15;
const friction = 0.94;
const maxSpeed = 15; 


const shadowOffsetX = 15; 
const shadowOffsetY = 15; 
const shadowDispersionStrength = 0.05; 
const shadowFriction = 0.9; 


class Particle {
    constructor(x, y, isShadow = false) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 20;
        this.vy = (Math.random() - 0.5) * 20;
        this.radius = particleSize;
        this.color = isShadow ? shadowColor : colors[(Math.random() * colors.length) | 0];
        this.isShadow = isShadow;
        this.targetX = null;
        this.targetY = null;
    }

    update() {
        if (this.targetX !== null && this.targetY !== null) {
            const dx = this.targetX - this.x;
            const dy = this.targetY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 1) {
                const angle = Math.atan2(dy, dx);
                this.vx += Math.cos(angle) * attractionStrength;
                this.vy += Math.sin(angle) * attractionStrength;

                // Para partículas de sombra, adicione uma força de dispersão
                if (this.isShadow) {
                    this.vx += (Math.random() - 0.5) * shadowDispersionStrength;
                    this.vy += (Math.random() - 0.5) * shadowDispersionStrength;
                }

                const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                if (currentSpeed > maxSpeed) {
                    this.vx = (this.vx / currentSpeed) * maxSpeed;
                    this.vy = (this.vy / currentSpeed) * maxSpeed;
                }
            } else {
                this.x = this.targetX;
                this.y = this.targetY;
                this.vx = 0;
                this.vy = 0;
            }
        }

        // Fricção diferente para sombra
        this.vx *= this.isShadow ? shadowFriction : friction;
        this.vy *= this.isShadow ? shadowFriction : friction;

        this.x += this.vx;
        this.y += this.vy;

        // Colisão com as bordas do canvas para evitar que fujam
        if (this.x < 0 || this.x > canvas.width) {
            this.vx *= -1;
            this.x = Math.max(0, Math.min(canvas.width, this.x));
        }
        if (this.y < 0 || this.y > canvas.height) {
            this.vy *= -1;
            this.y = Math.max(0, Math.min(canvas.height, this.y));
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// --- Funções Auxiliares ---

// Obtém os dados de pixel do texto
function getTextData() {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.font = font;

    const textMetrics = tempCtx.measureText(text);
    const textWidth = textMetrics.width;
    const textHeight = parseInt(font.match(/\d+/)[0]) * 1.5;

    tempCanvas.width = textWidth + 40;
    tempCanvas.height = textHeight + 40;

    tempCtx.font = font;
    tempCtx.fillStyle = '#FFF';
    tempCtx.textBaseline = 'top';
    tempCtx.fillText(text, 20, 20);

    return tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
}

// Cria as partículas em uma área central para a explosão inicial
function createParticles() {
    particles = [];
    // Cria partículas para o texto principal
    for (let i = 0; i < numMainParticles; i++) {
        const x = canvas.width / 2 + (Math.random() - 0.5) * explosionRadius * 2;
        const y = canvas.height / 2 + (Math.random() - 0.5) * explosionRadius * 2;
        particles.push(new Particle(x, y, false)); // false para não ser sombra
    }
    // Cria partículas para a sombra
    for (let i = 0; i < numShadowParticles; i++) {
        const x = canvas.width / 2 + (Math.random() - 0.5) * explosionRadius * 2;
        const y = canvas.height / 2 + (Math.random() - 0.5) * explosionRadius * 2;
        particles.push(new Particle(x, y, true)); // true para ser sombra
    }
}

// Posiciona as partículas nos pixels do texto (e da sombra)
function positionParticles() {
    const imageData = getTextData();
    const data = imageData.data;
    const textCanvasWidth = imageData.width;
    const textCanvasHeight = imageData.height;

    const offsetX = (canvas.width - textCanvasWidth) / 2;
    const offsetY = (canvas.height - textCanvasHeight) / 2;

    let mainParticleIndex = 0;
    let shadowParticleIndex = numMainParticles; // Começa após as partículas principais
    const pixelDensity = 3;

    for (let y = 0; y < textCanvasHeight; y += pixelDensity) {
        for (let x = 0; x < textCanvasWidth; x += pixelDensity) {
            const index = (y * textCanvasWidth + x) * 4;
            if (data[index + 3] > 100) { // Se o pixel não é transparente
                // Atribui alvo para a partícula principal
                if (mainParticleIndex < numMainParticles) {
                    const particle = particles[mainParticleIndex];
                    if (particle) { // Certifica-se que a partícula existe
                        particle.targetX = x + offsetX;
                        particle.targetY = y + offsetY;
                        mainParticleIndex++;
                    }
                }
                // Atribui alvo para a partícula de sombra (deslocado)
                if (shadowParticleIndex < numMainParticles + numShadowParticles) {
                    const particle = particles[shadowParticleIndex];
                    if (particle) {
                        particle.targetX = x + offsetX + shadowOffsetX;
                        particle.targetY = y + offsetY + shadowOffsetY;
                        shadowParticleIndex++;
                    }
                }
            }
        }
    }

    // Se houver mais partículas do que pixels de texto, redistribua ou descarte
    // Partículas principais extras ficam sem alvo ou em alvos genéricos
    for (let i = mainParticleIndex; i < numMainParticles; i++) {
        const particle = particles[i];
        if (particle) {
            // Pode deixar elas flutuarem ou dar um alvo para fora da tela
            particle.targetX = Math.random() * canvas.width;
            particle.targetY = Math.random() * canvas.height;
        }
    }
    // Partículas de sombra extras
    for (let i = shadowParticleIndex; i < numMainParticles + numShadowParticles; i++) {
        const particle = particles[i];
        if (particle) {
            particle.targetX = Math.random() * canvas.width;
            particle.targetY = Math.random() * canvas.height;
        }
    }
}

let frameCount = 0;
const delayBeforeFormingText = 120;

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (frameCount === delayBeforeFormingText) {
        positionParticles();
    }

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    frameCount++;
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createParticles();
    frameCount = 0;
});

createParticles();
animate();