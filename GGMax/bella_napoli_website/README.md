# Bella Napoli - Site da Pizzaria

Um site moderno e responsivo para a pizzaria italiana Bella Napoli, desenvolvido com Bootstrap 5, HTML5, CSS3 e JavaScript.

## 🍕 Características do Site

### Design e Visual
- **Cores Italianas**: Paleta de cores inspirada na bandeira italiana (vermelho, verde, branco)
- **Tipografia Elegante**: Combinação de fontes Poppins e Dancing Script
- **Imagens Reais**: Fotos de alta qualidade de pizzas, ambiente e chefs
- **Design Responsivo**: Totalmente adaptado para desktop, tablet e mobile

### Seções Incluídas
1. **Navbar Fixo**: Logo da pizzaria e navegação suave
2. **Hero Section**: Imagem impactante com call-to-action
3. **Especialidades**: Showcase das 3 pizzas mais populares
4. **Sobre Nós**: História da pizzaria com fotos do ambiente e chefs
5. **Cardápio Interativo**: Menu organizado por categorias com tabs
6. **Depoimentos**: Avaliações reais de clientes com fotos
7. **Galeria**: Coleção de imagens dos pratos e ambiente
8. **Contato**: Formulário funcional e informações de localização
9. **Footer**: Links úteis e informações de contato

### Funcionalidades Interativas
- **Navegação Suave**: Scroll automático entre seções
- **Menu com Tabs**: Categorias interativas (Tradicionais, Premium, Vegetarianas, Bebidas)
- **Formulário de Contato**: Validação completa com notificações
- **Galeria com Lightbox**: Visualização ampliada das imagens
- **Animações**: Efeitos sutis ao rolar a página
- **Hover Effects**: Interações visuais nos elementos
- **Contadores Animados**: Estatísticas da pizzaria

## 🚀 Como Usar

### Visualização Local
1. Abra o arquivo `index.html` diretamente no navegador
2. Ou use um servidor local:
   ```bash
   python3 -m http.server 8000
   ```
   Depois acesse: `http://localhost:8000`

### Estrutura de Arquivos
```
bella_napoli_website/
├── index.html          # Página principal
├── styles.css          # Estilos personalizados
├── script.js           # Funcionalidades JavaScript
├── images/             # Pasta com todas as imagens
│   ├── hero_pizza.png
│   ├── pizza_specialty_1.jpg
│   ├── pizza_specialty_2.jpg
│   ├── pizza_specialty_3.webp
│   ├── pizzeria_environment_1.jpg
│   ├── pizzeria_environment_2.jpg
│   ├── pizza_chef_1.jpg
│   ├── pizza_chef_2.jpg
│   └── testimonial_customer.png
└── README.md           # Este arquivo
```

## 🎨 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilos modernos com variáveis CSS e animações
- **JavaScript**: Interatividade e funcionalidades dinâmicas
- **Bootstrap 5**: Framework responsivo
- **Font Awesome**: Ícones vetoriais
- **Google Fonts**: Tipografia personalizada

## 📱 Responsividade

O site foi desenvolvido com abordagem mobile-first e é totalmente responsivo:

- **Desktop**: Layout completo com todas as funcionalidades
- **Tablet**: Adaptação dos elementos para telas médias
- **Mobile**: Interface otimizada para dispositivos móveis

## ✨ Recursos Especiais

### Animações CSS
- Fade in ao rolar a página
- Hover effects nos cards e botões
- Transições suaves entre estados
- Parallax sutil na hero section

### Acessibilidade
- Navegação por teclado
- Contraste adequado de cores
- Textos alternativos nas imagens
- Estrutura semântica HTML

### Performance
- Imagens otimizadas
- CSS e JS minificados
- Lazy loading para imagens
- Debounce nos eventos de scroll

## 🔧 Personalização

### Cores
As cores principais podem ser alteradas no arquivo `styles.css`:
```css
:root {
    --primary-color: #d32f2f;    /* Vermelho italiano */
    --secondary-color: #2e7d32;  /* Verde italiano */
    --accent-color: #ff6b35;     /* Laranja accent */
}
```

### Conteúdo
- Textos: Edite diretamente no `index.html`
- Imagens: Substitua os arquivos na pasta `images/`
- Menu: Modifique as seções do cardápio no HTML

### Funcionalidades
- Formulário: Configure o endpoint no `script.js`
- Mapa: Atualize as coordenadas no iframe do Google Maps
- Redes sociais: Adicione os links reais no footer

## 📞 Informações de Contato (Exemplo)

- **Endereço**: Rua das Flores, 123 - Centro, São Paulo, SP
- **Telefone**: (11) 3456-7890 / (11) 98765-4321
- **Email**: contato@bellanapoli.com.br
- **Horário**: Terça a Domingo, 18h às 23h

## 🎯 Próximos Passos

Para colocar o site em produção:

1. **Hospedagem**: Upload dos arquivos para um servidor web
2. **Domínio**: Configurar um domínio personalizado
3. **SSL**: Implementar certificado de segurança
4. **Analytics**: Adicionar Google Analytics
5. **SEO**: Otimizar meta tags e estrutura
6. **Formulário**: Conectar com serviço de email real

---

**Desenvolvido com ❤️ para os amantes da pizza italiana autêntica!**

