// Dados das partículas
const greenParticles = [
  {"x":93,"y":33},{"x":91,"y":34},{"x":92,"y":34},{"x":93,"y":34},{"x":94,"y":34},{"x":89,"y":35},{"x":90,"y":35},
  {"x":91,"y":35},{"x":92,"y":35},{"x":93,"y":35},{"x":94,"y":35},{"x":95,"y":35},{"x":96,"y":35},{"x":116,"y":35},
  {"x":117,"y":35},{"x":118,"y":35},{"x":88,"y":36},{"x":89,"y":36},{"x":90,"y":36},{"x":91,"y":36},{"x":92,"y":36},
  {"x":93,"y":36},{"x":94,"y":36},{"x":95,"y":36},{"x":96,"y":36},{"x":97,"y":36},{"x":98,"y":36},{"x":99,"y":36},
  {"x":100,"y":36},{"x":101,"y":36},{"x":102,"y":36},{"x":103,"y":36},{"x":104,"y":36},{"x":105,"y":36},{"x":106,"y":36},
  {"x":107,"y":36},{"x":108,"y":36},{"x":109,"y":36},{"x":110,"y":36},{"x":111,"y":36},{"x":112,"y":36},{"x":113,"y":36},
  {"x":114,"y":36},{"x":115,"y":36},{"x":116,"y":36},{"x":117,"y":36},{"x":118,"y":36},{"x":119,"y":36},{"x":120,"y":36},
  {"x":121,"y":36},{"x":86,"y":37},{"x":87,"y":37},{"x":88,"y":37},{"x":89,"y":37},{"x":90,"y":37},{"x":91,"y":37},
  {"x":92,"y":37},{"x":93,"y":37},{"x":94,"y":37},{"x":95,"y":37},{"x":96,"y":37},{"x":97,"y":37},{"x":98,"y":37},
  {"x":99,"y":37},{"x":100,"y":37},{"x":101,"y":37},{"x":102,"y":37},{"x":103,"y":37},{"x":104,"y":37},{"x":105,"y":37},
  {"x":106,"y":37},{"x":107,"y":37},{"x":108,"y":37},{"x":109,"y":37},{"x":110,"y":37},{"x":111,"y":37},{"x":112,"y":37},
  {"x":113,"y":37},{"x":114,"y":37},{"x":115,"y":37},{"x":116,"y":37},{"x":117,"y":37},{"x":118,"y":37},{"x":119,"y":37},
  {"x":120,"y":37},{"x":121,"y":37},{"x":122,"y":37},{"x":123,"y":37},{"x":124,"y":37},{"x":125,"y":37},{"x":126,"y":37},
  {"x":127,"y":37},{"x":128,"y":37},{"x":129,"y":37},{"x":130,"y":37},{"x":131,"y":37},{"x":132,"y":37},{"x":133,"y":37},
  {"x":134,"y":37},{"x":135,"y":37},{"x":136,"y":37},{"x":85,"y":38},{"x":86,"y":38},{"x":87,"y":38},{"x":88,"y":38},
  {"x":89,"y":38},{"x":90,"y":38},{"x":91,"y":38},{"x":92,"y":38},{"x":93,"y":38},{"x":94,"y":38},{"x":95,"y":38},
  {"x":96,"y":38},{"x":97,"y":38},{"x":98,"y":38},{"x":99,"y":38},{"x":100,"y":38},{"x":101,"y":38},{"x":102,"y":38},
  {"x":103,"y":38},{"x":104,"y":38},{"x":105,"y":38},{"x":106,"y":38},{"x":107,"y":38},{"x":108,"y":38},{"x":109,"y":38},
  {"x":110,"y":38},{"x":111,"y":38},{"x":112,"y":38},{"x":113,"y":38},{"x":114,"y":38},{"x":115,"y":38},{"x":116,"y":38},
  {"x":117,"y":38},{"x":118,"y":38},{"x":119,"y":38},{"x":120,"y":38},{"x":121,"y":38},{"x":122,"y":38},{"x":123,"y":38},
  {"x":124,"y":38},{"x":125,"y":38},{"x":126,"y":38},{"x":127,"y":38},{"x":128,"y":38},{"x":129,"y":38},{"x":130,"y":38},
  {"x":131,"y":38},{"x":132,"y":38},{"x":133,"y":38},{"x":134,"y":38},{"x":135,"y":38},{"x":136,"y":38},{"x":83,"y":39},
  {"x":84,"y":39},{"x":85,"y":39},{"x":86,"y":39},{"x":87,"y":39},{"x":88,"y":39},{"x":89,"y":39},{"x":90,"y":39},
  {"x":91,"y":39},{"x":92,"y":39},{"x":93,"y":39},{"x":94,"y":39},{"x":95,"y":39},{"x":96,"y":39},{"x":97,"y":39},
  {"x":98,"y":39},{"x":99,"y":39},{"x":100,"y":39},{"x":101,"y":39},{"x":102,"y":39},{"x":103,"y":39},{"x":104,"y":39},
  {"x":105,"y":39},{"x":106,"y":39},{"x":107,"y":39},{"x":108,"y":39},{"x":109,"y":39},{"x":110,"y":39},{"x":111,"y":39},
  {"x":112,"y":39},{"x":113,"y":39},{"x":114,"y":39},{"x":115,"y":39},{"x":116,"y":39},{"x":117,"y":39},{"x":118,"y":39},
  {"x":119,"y":39},{"x":120,"y":39},{"x":121,"y":39},{"x":122,"y":39},{"x":123,"y":39},{"x":124,"y":39},{"x":125,"y":39},
  {"x":126,"y":39},{"x":127,"y":39},{"x":128,"y":39},{"x":129,"y":39},{"x":130,"y":39},{"x":131,"y":39},{"x":132,"y":39},
  {"x":133,"y":39},{"x":134,"y":39},{"x":135,"y":39},{"x":136,"y":39},{"x":77,"y":40},{"x":78,"y":40},{"x":79,"y":40},
  {"x":80,"y":40},{"x":81,"y":40},{"x":82,"y":40},{"x":83,"y":40},{"x":84,"y":40},{"x":85,"y":40},{"x":86,"y":40},
  {"x":87,"y":40},{"x":88,"y":40},{"x":89,"y":40},{"x":90,"y":40},{"x":91,"y":40},{"x":92,"y":40},{"x":93,"y":40},
  {"x":94,"y":40},{"x":95,"y":40},{"x":96,"y":40},{"x":97,"y":40},{"x":98,"y":40},{"x":99,"y":40},{"x":100,"y":40},
  {"x":101,"y":40},{"x":102,"y":40},{"x":103,"y":40},{"x":104,"y":40},{"x":105,"y":40},{"x":106,"y":40},{"x":107,"y":40},
  {"x":108,"y":40},{"x":109,"y":40},{"x":110,"y":40},{"x":111,"y":40},{"x":112,"y":40},{"x":113,"y":40},{"x":114,"y":40},
  {"x":115,"y":40},{"x":116,"y":40},{"x":117,"y":40},{"x":118,"y":40},{"x":119,"y":40},{"x":120,"y":40},{"x":121,"y":40},
  {"x":122,"y":40},{"x":123,"y":40},{"x":124,"y":40},{"x":125,"y":40},{"x":126,"y":40},{"x":127,"y":40},{"x":128,"y":40},
  {"x":129,"y":40},{"x":130,"y":40},{"x":131,"y":40},{"x":132,"y":40},{"x":133,"y":40},{"x":134,"y":40},{"x":135,"y":40},
  {"x":136,"y":40}
  // Adicionando mais partículas verdes para completar o creeper
];

const blackParticles = [
  {"x":93,"y":33},{"x":91,"y":34},{"x":92,"y":34},{"x":93,"y":34},{"x":94,"y":34},{"x":89,"y":35},{"x":90,"y":35},
  {"x":94,"y":35},{"x":95,"y":35},{"x":96,"y":35},{"x":116,"y":35},{"x":117,"y":35},{"x":118,"y":35},{"x":88,"y":36},
  {"x":89,"y":36},{"x":96,"y":36},{"x":97,"y":36},{"x":98,"y":36},{"x":99,"y":36},{"x":100,"y":36},{"x":101,"y":36},
  {"x":102,"y":36},{"x":103,"y":36},{"x":104,"y":36},{"x":105,"y":36},{"x":106,"y":36},{"x":107,"y":36},{"x":108,"y":36},
  {"x":109,"y":36},{"x":110,"y":36},{"x":111,"y":36},{"x":112,"y":36},{"x":113,"y":36},{"x":114,"y":36},{"x":115,"y":36},
  {"x":116,"y":36},{"x":119,"y":36},{"x":120,"y":36},{"x":121,"y":36},{"x":86,"y":37},{"x":87,"y":37},{"x":95,"y":37},
  {"x":122,"y":37},{"x":123,"y":37},{"x":124,"y":37},{"x":125,"y":37},{"x":126,"y":37},{"x":127,"y":37},{"x":128,"y":37},
  {"x":129,"y":37},{"x":130,"y":37},{"x":131,"y":37},{"x":132,"y":37},{"x":133,"y":37},{"x":134,"y":37},{"x":135,"y":37},
  {"x":136,"y":37},{"x":85,"y":38},{"x":86,"y":38},{"x":95,"y":38},{"x":136,"y":38},{"x":83,"y":39},{"x":84,"y":39},
  {"x":95,"y":39},{"x":136,"y":39},{"x":77,"y":40},{"x":78,"y":40},{"x":79,"y":40},{"x":80,"y":40},{"x":81,"y":40},
  {"x":82,"y":40},{"x":94,"y":40},{"x":136,"y":40},{"x":77,"y":41},{"x":78,"y":41},{"x":87,"y":41},{"x":94,"y":41},
  {"x":124,"y":41},{"x":125,"y":41},{"x":130,"y":41},{"x":136,"y":41},{"x":78,"y":42},{"x":94,"y":42},{"x":103,"y":42},
  {"x":110,"y":42},{"x":111,"y":42},{"x":136,"y":42},{"x":78,"y":43},{"x":94,"y":43},{"x":136,"y":43},{"x":137,"y":43},
  {"x":78,"y":44},{"x":83,"y":44},{"x":95,"y":44},{"x":137,"y":44},{"x":78,"y":45},{"x":92,"y":45},{"x":95,"y":45},
  {"x":115,"y":45},{"x":137,"y":45},{"x":78,"y":46},{"x":87,"y":46},{"x":95,"y":46},{"x":103,"y":46},{"x":104,"y":46},
  {"x":105,"y":46},{"x":106,"y":46},{"x":107,"y":46},{"x":108,"y":46},{"x":109,"y":46},{"x":110,"y":46},{"x":111,"y":46},
  {"x":137,"y":46},{"x":78,"y":47},{"x":87,"y":47},{"x":95,"y":47},{"x":101,"y":47},{"x":102,"y":47},{"x":103,"y":47},
  {"x":104,"y":47},{"x":105,"y":47},{"x":106,"y":47},{"x":107,"y":47},{"x":108,"y":47},{"x":109,"y":47},{"x":110,"y":47},
  {"x":111,"y":47},{"x":121,"y":47},{"x":122,"y":47},{"x":123,"y":47},{"x":124,"y":47},{"x":125,"y":47},{"x":130,"y":47},
  {"x":137,"y":47},{"x":138,"y":47}
  // Adicionando mais partículas pretas para completar o creeper
];

// Configurações da animação
const config = {
  particleSize: 4,
  explosionForce: 10,
  gravity: 0.05,
  friction: 0.98,
  formationSpeed: 0.03,
  explosionDuration: 2000, // ms
  formationDelay: 1000, // ms após a explosão
  centerX: null,
  centerY: null,
  scale: 1
};

// Classe para representar uma partícula
class Particle {
  constructor(targetX, targetY, color) {
    // Posição inicial (centro da tela)
    this.x = config.centerX;
    this.y = config.centerY;
    
    // Posição final (alvo)
    this.targetX = targetX * config.scale;
    this.targetY = targetY * config.scale;
    
    // Velocidade inicial (aleatória para explosão)
    const angle = Math.random() * Math.PI * 2;
    const force = Math.random() * config.explosionForce;
    this.vx = Math.cos(angle) * force;
    this.vy = Math.sin(angle) * force;
    
    // Estado
    this.color = color;
    this.size = config.particleSize;
    this.state = 'waiting'; // waiting, exploding, forming, formed
    this.alpha = 1;
    
    // Variáveis para animação de formação
    this.formationProgress = 0;
  }
  
  update(deltaTime) {
    if (this.state === 'waiting') {
      // Aguardando início da animação
      return;
    }
    
    if (this.state === 'exploding') {
      // Aplicar física à partícula durante a explosão
      this.vx *= config.friction;
      this.vy *= config.friction;
      this.vy += config.gravity;
      
      this.x += this.vx;
      this.y += this.vy;
      
      // Efeito de desvanecimento gradual
      this.alpha = Math.max(0.2, this.alpha - 0.005);
      
      return;
    }
    
    if (this.state === 'forming') {
      // Animação de formação da imagem
      this.formationProgress += config.formationSpeed * deltaTime / 16;
      
      if (this.formationProgress >= 1) {
        this.formationProgress = 1;
        this.state = 'formed';
      }
      
      // Interpolação entre posição atual e posição alvo
      this.x = this.x + (this.targetX - this.x) * this.formationProgress;
      this.y = this.y + (this.targetY - this.y) * this.formationProgress;
      
      // Aumentar opacidade gradualmente
      this.alpha = Math.min(1, 0.2 + this.formationProgress * 0.8);
      
      return;
    }
  }
  
  draw(ctx) {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.globalAlpha = 1;
  }
  
  startExplosion() {
    this.state = 'exploding';
  }
  
  startFormation() {
    this.state = 'forming';
    this.formationProgress = 0;
  }
}

// Classe principal da animação
class ParticleAnimation {
  constructor() {
    this.canvas = document.getElementById('particleCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.lastTime = 0;
    this.explosionStartTime = 0;
    this.isExploding = false;
    this.isForming = false;
    
    this.resizeCanvas();
    this.initParticles();
    this.setupEventListeners();
    
    // Iniciar loop de animação
    requestAnimationFrame(this.animate.bind(this));
  }
  
  resizeCanvas() {
    const container = document.getElementById('canvas-container');
    this.canvas.width = container.offsetWidth;
    this.canvas.height = container.offsetHeight;
    
    // Atualizar centro da tela
    config.centerX = this.canvas.width / 2;
    config.centerY = this.canvas.height / 2;
    
    // Calcular escala para ajustar a imagem ao tamanho da tela
    const maxX = Math.max(...greenParticles.concat(blackParticles).map(p => p.x));
    const maxY = Math.max(...greenParticles.concat(blackParticles).map(p => p.y));
    const minX = Math.min(...greenParticles.concat(blackParticles).map(p => p.x));
    const minY = Math.min(...greenParticles.concat(blackParticles).map(p => p.y));
    
    const imageWidth = maxX - minX;
    const imageHeight = maxY - minY;
    
    // Calcular escala e offset para centralizar a imagem
    const scaleX = (this.canvas.width * 0.8) / imageWidth;
    const scaleY = (this.canvas.height * 0.8) / imageHeight;
    config.scale = Math.min(scaleX, scaleY);
    
    // Ajustar posição central da imagem
    const centerImageX = (minX + maxX) / 2;
    const centerImageY = (minY + maxY) / 2;
    
    // Aplicar offset para centralizar
    this.offsetX = config.centerX - centerImageX * config.scale;
    this.offsetY = config.centerY - centerImageY * config.scale;
  }
  
  initParticles() {
    this.particles = [];
    
    // Criar partículas verdes
    greenParticles.forEach(p => {
      const particle = new Particle(
        p.x + this.offsetX / config.scale, 
        p.y + this.offsetY / config.scale, 
        '#4CAF50' // Verde
      );
      this.particles.push(particle);
    });
    
    // Criar partículas pretas
    blackParticles.forEach(p => {
      const particle = new Particle(
        p.x + this.offsetX / config.scale, 
        p.y + this.offsetY / config.scale, 
        '#000000' // Preto
      );
      this.particles.push(particle);
    });
  }
  
  setupEventListeners() {
    // Botão de explosão
    document.getElementById('explode').addEventListener('click', () => {
      this.startExplosion();
    });
    
    // Botão de reiniciar
    document.getElementById('reset').addEventListener('click', () => {
      this.resetAnimation();
    });
    
    // Redimensionamento da janela
    window.addEventListener('resize', () => {
      this.resizeCanvas();
      this.resetAnimation();
    });
  }
  
  startExplosion() {
    if (this.isExploding) return;
    
    this.isExploding = true;
    this.isForming = false;
    this.explosionStartTime = performance.now();
    
    // Iniciar explosão para todas as partículas
    this.particles.forEach(p => p.startExplosion());
    
    // Agendar início da formação após o delay
    setTimeout(() => {
      this.startFormation();
    }, config.explosionDuration + config.formationDelay);
  }
  
  startFormation() {
    this.isForming = true;
    
    // Iniciar formação para todas as partículas
    this.particles.forEach(p => p.startFormation());
  }
  
  resetAnimation() {
    this.isExploding = false;
    this.isForming = false;
    this.initParticles();
  }
  
  animate(currentTime) {
    // Calcular delta time para animação suave
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
    
    // Limpar canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Atualizar e desenhar partículas
    this.particles.forEach(particle => {
      particle.update(deltaTime);
      particle.draw(this.ctx);
    });
    
    // Continuar loop de animação
    requestAnimationFrame(this.animate.bind(this));
  }
}

// Iniciar animação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  const animation = new ParticleAnimation();
  
  // Iniciar explosão automaticamente após 1 segundo
  setTimeout(() => {
    animation.startExplosion();
  }, 1000);
});
