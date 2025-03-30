function opcaoAlterada() {
    const select = document.getElementById("categorias");
    console.log("Nova opção selecionada:", select.value);

    if (select.value === "camisetas") {
        const camisetas = document.querySelectorAll(".Produtos-Card-Bermudas");
        camisetas.forEach(camiseta => {
            camiseta.style.display = "none"; 
        });
    } else {
        const camisetas = document.querySelectorAll(".Produtos-Card-Bermudas");
        camisetas.forEach(camiseta => {
            camiseta.style.display = "block";
        });
    }
    if(select.value === "bermudas"){
        const bermudas = document.querySelectorAll(".Produtos-Card-Camisetas");
        bermudas.forEach(bermuda => {
            bermuda.style.display = "none";
        })
    }else{
        const bermudas = document.querySelectorAll(".Produtos-Card-Camisetas");
        bermudas.forEach(bermuda => {
            bermuda.style.display = "block";
        });
    }
}