const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const numMainParticles = 18000; 
const numShadowParticles = 9000;  
const particleSize = 2.5; 

const creeperGreens = ['#00A000', '#009000', '#00B000', '#008000', '#007000', '#006000']; 
const creeperBlack = '#000000'; 
const shadowColor = 'rgba(50, 50, 50, 0.2)'; 

const explosionRadius = Math.min(canvas.width, canvas.height) / 3;
const attractionStrength = 0.10; 
const friction = 0.94;
const maxSpeed = 30; 

const shadowOffsetX = 15; 
const shadowOffsetY = 15; 
const shadowDispersionStrength = 0.06; 
const shadowFriction = 0.9; 

// --- Definição da Estrutura do Creeper (SEM ALTERAÇÃO AQUI) ---
const creeperStructure = [
    // Cabeça
    { x: -5, y: -5, type: 'body' }, { x: -4, y: -5, type: 'body' }, { x: -3, y: -5, type: 'body' }, { x: -2, y: -5, type: 'body' }, { x: -1, y: -5, type: 'body' }, { x: 0, y: -5, type: 'body' }, { x: 1, y: -5, type: 'body' }, { x: 2, y: -5, type: 'body' }, { x: 3, y: -5, type: 'body' }, { x: 4, y: -5, type: 'body' },
    { x: -5, y: -4, type: 'body' }, { x: -4, y: -4, type: 'body' }, { x: -3, y: -4, type: 'body' }, { x: -2, y: -4, type: 'body' }, { x: -1, y: -4, type: 'body' }, { x: 0, y: -4, type: 'body' }, { x: 1, y: -4, type: 'body' }, { x: 2, y: -4, type: 'body' }, { x: 3, y: -4, type: 'body' }, { x: 4, y: -4, type: 'body' },
    { x: -5, y: -3, type: 'body' }, { x: -4, y: -3, type: 'body' }, { x: -3, y: -3, type: 'body' }, { x: -2, y: -3, type: 'body' }, { x: -1, y: -3, type: 'body' }, { x: 0, y: -3, type: 'body' }, { x: 1, y: -3, type: 'body' }, { x: 2, y: -3, type: 'body' }, { x: 3, y: -3, type: 'body' }, { x: 4, y: -3, type: 'body' },
    { x: -5, y: -2, type: 'body' }, { x: -4, y: -2, type: 'body' }, { x: -3, y: -2, type: 'body' }, { x: -2, y: -2, type: 'body' }, { x: -1, y: -2, type: 'body' }, { x: 0, y: -2, type: 'body' }, { x: 1, y: -2, type: 'body' }, { x: 2, y: -2, type: 'body' }, { x: 3, y: -2, type: 'body' }, { x: 4, y: -2, type: 'body' },
    { x: -5, y: -1, type: 'body' }, { x: -4, y: -1, type: 'body' }, { x: -3, y: -1, type: 'body' }, { x: -2, y: -1, type: 'eye' }, { x: -1, y: -1, type: 'eye' }, { x: 0, y: -1, type: 'body' }, { x: 1, y: -1, type: 'eye' }, { x: 2, y: -1, type: 'eye' }, { x: 3, y: -1, type: 'body' }, { x: 4, y: -1, type: 'body' },
    { x: -5, y: 0, type: 'body' }, { x: -4, y: 0, type: 'body' }, { x: -3, y: 0, type: 'mouth' }, { x: -2, y: 0, type: 'mouth' }, { x: -1, y: 0, type: 'body' }, { x: 0, y: 0, type: 'body' }, { x: 1, y: 0, type: 'body' }, { x: 2, y: 0, type: 'mouth' }, { x: 3, y: 0, type: 'mouth' }, { x: 4, y: 0, type: 'body' },
    { x: -5, y: 1, type: 'body' }, { x: -4, y: 1, type: 'body' }, { x: -3, y: 1, type: 'mouth' }, { x: -2, y: 1, type: 'mouth' }, { x: -1, y: 1, type: 'body' }, { x: 0, y: 1, type: 'body' }, { x: 1, y: 1, type: 'body' }, { x: 2, y: 1, type: 'mouth' }, { x: 3, y: 1, type: 'mouth' }, { x: 4, y: 1, type: 'body' },
    { x: -5, y: 2, type: 'body' }, { x: -4, y: 2, type: 'body' }, { x: -3, y: 2, type: 'body' }, { x: -2, y: 2, type: 'body' }, { x: -1, y: 2, type: 'body' }, { x: 0, y: 2, type: 'body' }, { x: 1, y: 2, type: 'body' }, { x: 2, y: 2, type: 'body' }, { x: 3, y: 2, type: 'body' }, { x: 4, y: 2, type: 'body' },
    { x: -5, y: 3, type: 'body' }, { x: -4, y: 3, type: 'body' }, { x: -3, y: 3, type: 'body' }, { x: -2, y: 3, type: 'body' }, { x: -1, y: 3, type: 'body' }, { x: 0, y: 3, type: 'body' }, { x: 1, y: 3, type: 'body' }, { x: 2, y: 3, type: 'body' }, { x: 3, y: 3, type: 'body' }, { x: 4, y: 3, type: 'body' },
    { x: -5, y: 4, type: 'body' }, { x: -4, y: 4, type: 'body' }, { x: -3, y: 4, type: 'body' }, { x: -2, y: 4, type: 'body' }, { x: -1, y: 4, type: 'body' }, { x: 0, y: 4, type: 'body' }, { x: 1, y: 4, type: 'body' }, { x: 2, y: 4, type: 'body' }, { x: 3, y: 4, type: 'body' }, { x: 4, y: 4, type: 'body' },
    // Corpo
    { x: -3, y: 5, type: 'body' }, { x: -2, y: 5, type: 'body' }, { x: -1, y: 5, type: 'body' }, { x: 0, y: 5, type: 'body' }, { x: 1, y: 5, type: 'body' }, { x: 2, y: 5, type: 'body' },
    { x: -3, y: 6, type: 'body' }, { x: -2, y: 6, type: 'body' }, { x: -1, y: 6, type: 'body' }, { x: 0, y: 6, type: 'body' }, { x: 1, y: 6, type: 'body' }, { x: 2, y: 6, type: 'body' },
    { x: -3, y: 7, type: 'body' }, { x: -2, y: 7, type: 'body' }, { x: -1, y: 7, type: 'body' }, { x: 0, y: 7, type: 'body' }, { x: 1, y: 7, type: 'body' }, { x: 2, y: 7, type: 'body' },
    { x: -3, y: 8, type: 'body' }, { x: -2, y: 8, type: 'body' }, { x: -1, y: 8, type: 'body' }, { x: 0, y: 8, type: 'body' }, { x: 1, y: 8, type: 'body' }, { x: 2, y: 8, type: 'body' },
    { x: -3, y: 9, type: 'body' }, { x: -2, y: 9, type: 'body' }, { x: -1, y: 9, type: 'body' }, { x: 0, y: 9, type: 'body' }, { x: 1, y: 9, type: 'body' }, { x: 2, y: 9, type: 'body' },
    { x: -3, y: 10, type: 'body' }, { x: -2, y: 10, type: 'body' }, { x: -1, y: 10, type: 'body' }, { x: 0, y: 10, type: 'body' }, { x: 1, y: 10, type: 'body' }, { x: 2, y: 10, type: 'body' },
    { x: -3, y: 11, type: 'body' }, { x: -2, y: 11, type: 'body' }, { x: -1, y: 11, type: 'body' }, { x: 0, y: 11, type: 'body' }, { x: 1, y: 11, type: 'body' }, { x: 2, y: 11, type: 'body' },
    { x: -3, y: 12, type: 'body' }, { x: -2, y: 12, type: 'body' }, { x: -1, y: 12, type: 'body' }, { x: 0, y: 12, type: 'body' }, { x: 1, y: 12, type: 'body' }, { x: 2, y: 12, type: 'body' },
    // Pés
    { x: -3, y: 13, type: 'foot' }, { x: -2, y: 13, type: 'foot' },
    { x: -3, y: 14, type: 'foot' }, { x: -2, y: 14, type: 'foot' },
    { x: 1, y: 13, type: 'foot' }, { x: 2, y: 13, type: 'foot' },
    { x: 1, y: 14, type: 'foot' }, { x: 2, y: 14, type: 'foot' },
];

// --- Classe Particle ---
class Particle {
    constructor(x, y, isShadow = false) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 20;
        this.vy = (Math.random() - 0.5) * 20;
        this.radius = particleSize;
        this.isShadow = isShadow;
        this.color = isShadow ? shadowColor : creeperGreens[Math.floor(Math.random() * creeperGreens.length)]; 
        this.targetX = null;
        this.targetY = null;
        this.isFixed = false; // NOVA PROPRIEDADE: para controlar se a partícula está parada
    }

    update() {
        // Se a partícula já está fixa, não atualiza sua posição ou velocidade
        if (this.isFixed) {
            return; 
        }

        if (this.targetX !== null && this.targetY !== null) {
            const dx = this.targetX - this.x;
            const dy = this.targetY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Se a partícula está muito perto do alvo, fixe-a
            const tolerance = 1.5; // Distância de tolerância para "travar" a partícula
            if (distance < tolerance) {
                this.x = this.targetX;
                this.y = this.targetY;
                this.vx = 0;
                this.vy = 0;
                this.isFixed = true; // Define a partícula como fixa
                return; // Para a atualização para esta partícula
            }

            // Aplica a atração se não estiver fixa
            const angle = Math.atan2(dy, dx);
            this.vx += Math.cos(angle) * attractionStrength;
            this.vy += Math.sin(angle) * attractionStrength;

            if (this.isShadow) {
                this.vx += (Math.random() - 0.5) * shadowDispersionStrength;
                this.vy += (Math.random() - 0.5) * shadowDispersionStrength;
            }

            const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (currentSpeed > maxSpeed) {
                this.vx = (this.vx / currentSpeed) * maxSpeed;
                this.vy = (this.vy / currentSpeed) * maxSpeed;
            }
        }

        // Aplica fricção e move a partícula se não estiver fixa
        this.vx *= this.isShadow ? shadowFriction : friction;
        this.vy *= this.isShadow ? shadowFriction : friction;

        this.x += this.vx;
        this.y += this.vy;

        // Mantém dentro dos limites se não estiver fixa (ainda importante para a fase inicial)
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

// --- Funções Auxiliares (SEM ALTERAÇÃO SIGNIFICATIVA NESTAS) ---

function createParticles() {
    particles = [];
    for (let i = 0; i < numMainParticles; i++) {
        const x = canvas.width / 2 + (Math.random() - 0.5) * explosionRadius * 2;
        const y = canvas.height / 2 + (Math.random() - 0.5) * explosionRadius * 2;
        particles.push(new Particle(x, y, false));
    }
    for (let i = 0; i < numShadowParticles; i++) {
        const x = canvas.width / 2 + (Math.random() - 0.5) * explosionRadius * 2;
        const y = canvas.height / 2 + (Math.random() - 0.5) * explosionRadius * 2;
        particles.push(new Particle(x, y, true));
    }
}

function positionParticles() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = Math.min(canvas.width, canvas.height) / 20; 
    const pixelSizeLogical = 1.0; 

    const bodyFootPixelIndexes = [];
    const eyeMouthPixelIndexes = [];
    const shadowPixelIndexes = [];

    creeperStructure.forEach((pixel, index) => {
        if (pixel.type === 'eye' || pixel.type === 'mouth') {
            eyeMouthPixelIndexes.push(index);
        } else {
            bodyFootPixelIndexes.push(index);
        }
    });
    for(let i = 0; i < creeperStructure.length; i++) {
        shadowPixelIndexes.push(i);
    }
    
    shuffleArray(bodyFootPixelIndexes);
    shuffleArray(eyeMouthPixelIndexes);
    shuffleArray(shadowPixelIndexes);

    let bodyFootCursor = 0;
    let eyeMouthCursor = 0;
    let shadowCursor = 0;

    particles.forEach(particle => {
        if (particle.isShadow) {
            const pixelIndex = shadowPixelIndexes[shadowCursor % shadowPixelIndexes.length];
            const pixel = creeperStructure[pixelIndex];

            const offsetX = (Math.random() - 0.5) * pixelSizeLogical * scale;
            const offsetY = (Math.random() - 0.5) * pixelSizeLogical * scale;

            particle.targetX = pixel.x * scale + centerX + shadowOffsetX + offsetX;
            particle.targetY = pixel.y * scale + centerY + shadowOffsetY + offsetY;
            shadowCursor++;
        } else { 
            // Calcula a proporção para alocar mais partículas aos olhos/boca
            const eyeMouthRatio = eyeMouthPixelIndexes.length / (bodyFootPixelIndexes.length + eyeMouthPixelIndexes.length);
            // Determina se a partícula atual deve ir para olho/boca ou corpo/pé
            // Uma maneira simples de distribuir, garantindo que os detalhes recebam mais atenção
            if (Math.random() < eyeMouthRatio * 2 && eyeMouthCursor < eyeMouthPixelIndexes.length * (numMainParticles / (bodyFootPixelIndexes.length + eyeMouthPixelIndexes.length))) {
                 const pixelIndex = eyeMouthPixelIndexes[eyeMouthCursor % eyeMouthPixelIndexes.length];
                 const pixel = creeperStructure[pixelIndex];

                 const offsetX = (Math.random() - 0.5) * pixelSizeLogical * scale * 0.7; 
                 const offsetY = (Math.random() - 0.5) * pixelSizeLogical * scale * 0.7; 

                 particle.targetX = pixel.x * scale + centerX + offsetX;
                 particle.targetY = pixel.y * scale + centerY + offsetY;
                 particle.color = creeperBlack; 
                 eyeMouthCursor++;
             } else {
                const pixelIndex = bodyFootPixelIndexes[bodyFootCursor % bodyFootPixelIndexes.length];
                const pixel = creeperStructure[pixelIndex];

                const offsetX = (Math.random() - 0.5) * pixelSizeLogical * scale;
                const offsetY = (Math.random() - 0.5) * pixelSizeLogical * scale;

                particle.targetX = pixel.x * scale + centerX + offsetX;
                particle.targetY = pixel.y * scale + centerY + offsetY;
                particle.color = creeperGreens[Math.floor(Math.random() * creeperGreens.length)];
                bodyFootCursor++;
            }
        }
    });
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let frameCount = 0;
const delayBeforeFormingShape = 150; 

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    if (frameCount === delayBeforeFormingShape) {
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