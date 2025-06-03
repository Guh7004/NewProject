document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('creeperCanvas');
    const ctx = canvas.getContext('2d');
    
    // Configurar o tamanho do canvas para corresponder ao tamanho do elemento
    function resizeCanvas() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }
    
    // Chamar resizeCanvas quando a página carrega e quando a janela é redimensionada
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Cores do Creeper
    const creeperColors = [
        '#57A64E', // Verde claro
        '#4C9445', // Verde médio
        '#3F7A3A', // Verde escuro
        '#222222', // Preto para os olhos e boca
        '#111111'  // Preto mais escuro para detalhes
    ];
    
    // Configurações da animação
    const totalParticles = 800; // Número de partículas
    const particles = []; // Array para armazenar as partículas
    
    // Definir o grid do rosto do Creeper (8x8 pixels como no Minecraft)
    const creeperFace = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 3, 3, 0, 0, 3, 3],
        [0, 0, 3, 3, 0, 0, 3, 3],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 3, 3, 3, 0, 0],
        [0, 0, 3, 3, 3, 3, 3, 0],
        [0, 0, 3, 0, 0, 0, 3, 0]
    ];
    
    // Classe para representar uma partícula
    class Particle {
        constructor() {
            this.reset();
            // Iniciar as partículas em posições aleatórias
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 4 + 2; // Tamanho entre 2 e 6
            this.targetX = 0;
            this.targetY = 0;
            this.color = creeperColors[Math.floor(Math.random() * 3)]; // Cores verdes
            this.speed = Math.random() * 0.5 + 0.2; // Velocidade entre 0.2 e 0.7
            this.isEyeOrMouth = false;
        }
        
        // Reiniciar a partícula
        reset() {
            this.active = false; // Partícula ainda não está ativa
            this.activationDelay = Math.random() * 100; // Atraso para ativação
        }
        
        // Definir posição alvo baseada no grid do Creeper
        setTarget(gridX, gridY, value) {
            const scale = Math.min(canvas.width, canvas.height) * 0.7;
            const cellSize = scale / 8;
            const offsetX = (canvas.width - scale) / 2;
            const offsetY = (canvas.height - scale) / 2;
            
            this.targetX = offsetX + gridX * cellSize + Math.random() * cellSize;
            this.targetY = offsetY + gridY * cellSize + Math.random() * cellSize;
            
            // Se for olho ou boca (valor 3), usar cor preta
            if (value === 3) {
                this.color = creeperColors[3]; // Preto
                this.isEyeOrMouth = true;
            }
        }
        
        // Atualizar a posição da partícula
        update() {
            // Decrementar o atraso de ativação
            if (this.activationDelay > 0) {
                this.activationDelay--;
                return;
            }
            
            // Ativar a partícula
            this.active = true;
            
            // Mover a partícula em direção à posição alvo
            this.x += (this.targetX - this.x) * this.speed;
            this.y += (this.targetY - this.y) * this.speed;
        }
        
        // Desenhar a partícula
        draw() {
            if (!this.active) return;
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    
    // Criar as partículas e atribuir posições alvo baseadas no grid do Creeper
    function createParticles() {
        // Limpar array de partículas
        particles.length = 0;
        
        // Criar novas partículas
        for (let i = 0; i < totalParticles; i++) {
            const particle = new Particle();
            particles.push(particle);
        }
        
        // Distribuir partículas no grid do Creeper
        let particleIndex = 0;
        
        // Primeiro, distribuir partículas para os olhos e boca (valor 3)
        for (let y = 0; y < creeperFace.length; y++) {
            for (let x = 0; x < creeperFace[y].length; x++) {
                if (creeperFace[y][x] === 3) {
                    // Número de partículas por célula do grid
                    const particlesPerCell = 10;
                    
                    for (let p = 0; p < particlesPerCell; p++) {
                        if (particleIndex < particles.length) {
                            particles[particleIndex].setTarget(x, y, 3);
                            particleIndex++;
                        }
                    }
                }
            }
        }
        
        // Depois, distribuir partículas para o resto do rosto (valor 0)
        for (let y = 0; y < creeperFace.length; y++) {
            for (let x = 0; x < creeperFace[y].length; x++) {
                if (creeperFace[y][x] === 0) {
                    // Número de partículas por célula do grid
                    const particlesPerCell = 5;
                    
                    for (let p = 0; p < particlesPerCell; p++) {
                        if (particleIndex < particles.length) {
                            particles[particleIndex].setTarget(x, y, 0);
                            particleIndex++;
                        }
                    }
                }
            }
        }
        
        // Distribuir partículas restantes aleatoriamente
        while (particleIndex < particles.length) {
            const x = Math.floor(Math.random() * 8);
            const y = Math.floor(Math.random() * 8);
            particles[particleIndex].setTarget(x, y, creeperFace[y][x]);
            particleIndex++;
        }
    }
    
    // Função para conectar partículas próximas com linhas
    function connectParticles() {
        const maxDistance = 30; // Distância máxima para conectar partículas
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i];
                const p2 = particles[j];
                
                if (!p1.active || !p2.active) continue;
                
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    // Calcular a opacidade com base na distância
                    const opacity = 1 - (distance / maxDistance);
                    
                    // Desenhar a linha conectando as partículas
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    
                    // Cor da linha baseada nas partículas conectadas
                    if (p1.isEyeOrMouth && p2.isEyeOrMouth) {
                        ctx.strokeStyle = `rgba(0, 0, 0, ${opacity * 0.7})`;
                    } else {
                        ctx.strokeStyle = `rgba(50, 120, 50, ${opacity * 0.3})`;
                    }
                    
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }
    
    // Função para simular explosão do Creeper
    function explodeCreeper() {
        particles.forEach(particle => {
            // Definir uma direção aleatória para a explosão
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * canvas.width * 0.5;
            
            // Calcular nova posição alvo
            particle.targetX = particle.x + Math.cos(angle) * distance;
            particle.targetY = particle.y + Math.sin(angle) * distance;
            
            // Aumentar a velocidade para a explosão
            particle.speed = Math.random() * 0.1 + 0.05;
        });
        
        // Após um tempo, recriar o Creeper
        setTimeout(createParticles, 3000);
    }
    
    // Função de animação
    function animate() {
        // Limpar o canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Atualizar e desenhar cada partícula
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Conectar partículas próximas
        connectParticles();
        
        // Continuar a animação
        requestAnimationFrame(animate);
    }
    
    // Inicializar as partículas
    createParticles();
    
    // Iniciar a animação
    animate();
    
    // Adicionar interatividade ao clicar no canvas (simular explosão)
    canvas.addEventListener('click', explodeCreeper);
});
