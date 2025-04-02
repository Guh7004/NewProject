const filterRed = document.querySelector('.Red');
const filterBlack = document.querySelector('.Black');
const imagemGrande = document.querySelector('.imagemgrande');
const imagempequena1 = document.querySelector('.imagempequena1');
const imagempequena2 = document.querySelector('.imagempequena2');

const camisetas = [
    {cor: 'vermelha', imagem1:'../../Assets/CamisaVer.webp', imagem2:'../../Assets/CamisaVer1.webp'},
    {cor: 'preta', imagem1:"../../Assets/CamisaPre.jpg", imagem2:"../../Assets/CamisaPre1.jpg"}
    
]
function pequena1(){
    console.log(imagempequena1);
   imagemGrande.src = imagempequena1.src;
}
function pequena2(){
    console.log(imagempequena2)
    imagemGrande.src = imagempequena2.src;    
}
function altere(){
    filterColorBlack()
}
function filterColorBlack(){
    const filterDark = camisetas.filter( (product) => product.cor === 'preta')
    console.log(filterDark[0].imagem1)
    console.log(filterDark[0].imagem2)
    
    imagemGrande.src = (filterDark[0].imagem1);
    imagempequena1.src = (filterDark[0].imagem1);
    imagempequena2.src = (filterDark[0].imagem2);
}
function filterColorRed(){
    const filterRed = camisetas.filter( (product) => product.cor === 'vermelha')
    console.log(filterRed)
    imagemGrande.src = (filterRed[0].imagem1);
    imagempequena1.src = (filterRed[0].imagem1);
    imagempequena2.src = (filterRed[0].imagem2);
}
filterBlack.addEventListener('click', filterColorBlack);
filterRed.addEventListener('click', filterColorRed);
const buttons = document.querySelectorAll('.buttons');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    // Selecionar elementos para mudar no modo escuro
    const header = document.querySelector(".head");
    const h1Header = document.querySelector(".h1_header");
    const paragraphs = document.querySelectorAll("p");
    const valor = document.querySelector(".textValor");
    const Buy = document.querySelector(".Buy");
    const titles = document.querySelectorAll("h1, h2, h3");
    const darkModeButton = document.querySelector(".Dark");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");

        if (header) header.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
        if (h1Header) h1Header.style.color = "#000";
        if (valor) valor.style.color = "#000";
        if (Buy) Buy.style.backgroundColor = "#000";

        paragraphs.forEach(p => p.style.color = "#000");
        titles.forEach(title => title.style.color = "#000");

        // Alterar botão no modo escuro
        if (darkModeButton) {
            darkModeButton.style.backgroundColor = "#f3f3f3";
            darkModeButton.style.color = "#fff";
            darkModeButton.textContent = "🌙";
        }

    } else {
        localStorage.setItem("theme", "light");

        if (header) header.style.backgroundColor = "";
        if (h1Header) h1Header.style.color = "";
        if (valor) valor.style.color = "";
        if (Buy) Buy.style.backgroundColor = "";

        paragraphs.forEach(p => p.style.color = "");
        titles.forEach(title => title.style.color = "");

        // Voltar ao botão original no modo claro
        if (darkModeButton) {
            darkModeButton.style.backgroundColor = "";
            darkModeButton.style.color = "";
            darkModeButton.textContent = "☀️";
        }
    }
}

// Verificar o tema salvo ao carregar a página
window.onload = function() {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        toggleDarkMode(); // Aplica as mudanças ao carregar
    }
};


