function opcaoAlterada() {
    const select = document.getElementById("categorias");
    console.log("Nova opção selecionada:", select.value);

    if (select.value === "Vermelhas") {
        const camisetas = document.querySelectorAll(".Produtos-Card-Preto");
        camisetas.forEach(camiseta => {
            camiseta.style.display = "none"; 
        });
    } else {
        const camisetas = document.querySelectorAll(".Produtos-Card-Preto");
        camisetas.forEach(camiseta => {
            camiseta.style.display = "block";
        });
    }
    if(select.value === "Pretas"){
        const bermudas = document.querySelectorAll(".Produtos-Card-Vermelho");
        bermudas.forEach(bermuda => {
            bermuda.style.display = "none";
        })
    }else{
        const bermudas = document.querySelectorAll(".Produtos-Card-Vermelho");
        bermudas.forEach(bermuda => {
            bermuda.style.display = "block";
        });
    }
}
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    // Selecionar elementos para mudar no modo escuro
    const h1Header = document.querySelector(".header");
    const categorias = document.querySelector("#categorias");
    const menu = document.querySelectorAll(".menu, .footer");
    const body = document.querySelector("body");
    const titles = document.querySelectorAll(".Inf_Products,.Rodape, .h1_header,#categorias");
    const darkModeButton = document.querySelector(".Dark");
    const cards = document.querySelectorAll(".Produtos-Card-Preto, .Produtos-Card-Vermelho")

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        if (body) body.style.backgroundColor = "white";
        if (h1Header) h1Header.style.backgroundColor = "white";
        if (categorias) categorias.style.backgroundColor = "white";
        titles.forEach(title => title.style.color = "#000");
        cards.forEach(card => card.style.backgroundColor = "white");
        menu.forEach(fundo => fundo.style.backgroundColor = "rgb(0,0,0,.2)") 

        // Alterar botão no modo escuro
        if (darkModeButton) {
            darkModeButton.style.backgroundColor = "#f3f3f3";
            darkModeButton.style.color = "#fff";
            darkModeButton.textContent = "🌙";
        }

    } else {
        localStorage.setItem("theme", "light");

        if (body) body.style.backgroundColor = "";
        if (h1Header) h1Header.style.backgroundColor = "";
        if (categorias) categorias.style.backgroundColor = "";
        titles.forEach(title => title.style.color = "");
        cards.forEach(card => card.style.backgroundColor = "");
        menu.forEach(fundo => fundo.style.backgroundColor = "") 


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