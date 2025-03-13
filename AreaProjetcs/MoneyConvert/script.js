let valorSelecionado1 = "op1";
let valorSelecionado2 = "op1";


document.getElementById('meuSelect1').addEventListener('change', function () {
    valorSelecionado1 = this.value;
});
document.getElementById('meuSelect2').addEventListener('change', function () {
    valorSelecionado2 = this.value;
});
/*Chama BRL sempre que digitar*/

document.getElementById("moneyInput").addEventListener("input", function () {
    if (total % 2 !== 0) {
        total += 1;
    } else {
        total += 2;
    }
    input();
    if (valorSelecionado1 === "op1") {
        BRL();
    }
    if (valorSelecionado1 === "op2") {
        USD();
    }
    if (valorSelecionado1 === "op3") {
        EUR();
    }
});

/*Chama BRL sempre que mudar o select*/
let total = 0;
document.getElementById("meuSelect1").addEventListener("change", function () {

    /*PAR*/

    if (total % 2 !== 0) {
        total += 1;
    } else {
        total += 2;
    }
    input();

    if (valorSelecionado1 === "op1") {
        BRL();
    }
    if (valorSelecionado1 === "op2") {
        USD();
    }
    if (valorSelecionado1 === "op3") {
        EUR();
    }
});

/*Chama BRL sempre que mudar o select*/

document.getElementById("meuSelect2").addEventListener("change", function () {

    /*impar*/

    if (total % 2 === 0) {
        total += 1;
    } else {
        total += 2;
    }
    input();
    if (valorSelecionado2 === "op1") {
        BRL();
    }
    if (valorSelecionado2 === "op2") {
        USD();
    }
    if (valorSelecionado2 === "op3") {
        EUR();
    }
});
function BRL() {
    const number = document.getElementById("moneyInput").value;
    let numericValue = parseFloat(number.replace(/\D/g, "")) / 100 || 0;
    const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(numericValue);
    if (total % 2 === 0) {
        document.getElementById("img1").src = "../../Assets/CoinBRL.svg";
        document.getElementById("output1").innerText = formatted;
        moneyInput.value = formatted;
        
    } else {
        document.getElementById("img2").src = "../../Assets/CoinBRL.svg";
        document.getElementById("output1").innerText = numericValue ;
    }
}
function USD() {
    const number = document.getElementById("moneyInput").value;
    const numericValue = parseFloat(number.replace(/\D/g, "")) / 100 || 0;

    const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(numericValue);
    if (total % 2 === 0) {
        document.getElementById("img1").src = "../../Assets/CoinUSD.svg";
        document.getElementById("output1").innerText = formatted;
        moneyInput.value = formatted;
        
    } else {
        document.getElementById("img2").src = "../../Assets/CoinUSD.svg";
    }
}
function EUR() {
    const number = document.getElementById("moneyInput").value;
    const numericValue = parseFloat(number.replace(/\D/g, "")) / 100 || 0;

    const formatted = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    }).format(numericValue);
    if (total % 2 === 0) {
        document.getElementById("img1").src = "../../Assets/CoinEUR.svg";
        document.getElementById("output1").innerText = formatted;
        moneyInput.value = formatted;
        
    } else {
        document.getElementById("img2").src = "../../Assets/CoinEUR.svg";
    }
}
function input(){
    const number = document.getElementById("moneyInput").value;
    let numericValue = parseFloat(number.replace(/\D/g, "")) / 100 || 0;
    if(valorSelecionado1 === "op1" && valorSelecionado2 === "op2"){
        numericValue = numericValue * 0.17;
        const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(numericValue);
        document.getElementById("output2").innerText = formatted;
    }
    if(valorSelecionado1 === "op1" && valorSelecionado2 === "op3"){
        numericValue = numericValue * 0.16;
        const formatted = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
        }).format(numericValue);
        document.getElementById("output2").innerText = formatted;
    }
    if(valorSelecionado1 === "op2" && valorSelecionado2 === "op1"){
        numericValue = numericValue * 5.81
        const formatted = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(numericValue);
        document.getElementById("output2").innerText = formatted;
    }
    if(valorSelecionado1 === "op2" && valorSelecionado2 === "op3"){
        numericValue = numericValue * 0.92
        const formatted = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
        }).format(numericValue);
        document.getElementById("output2").innerText = formatted;
    }
    if(valorSelecionado1 === "op3" && valorSelecionado2 === "op1"){
        numericValue = numericValue * 6.3; 
        const formatted = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(numericValue);
        document.getElementById("output2").innerText = formatted;
    }
    if(valorSelecionado1 === "op3" && valorSelecionado2 === "op2"){
        numericValue = numericValue * 1.09; 
        const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(numericValue);
        document.getElementById("output2").innerText = formatted;
    }
    if(valorSelecionado1 === "op1" && valorSelecionado2 === "op1"){
        const formatted = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(numericValue);
        document.getElementById("output2").innerText = formatted;
    }
    if(valorSelecionado1 === "op2" && valorSelecionado2 === "op2"){
        const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(numericValue);
        document.getElementById("output2").innerText = formatted;
    }
    if(valorSelecionado1 === "op3" && valorSelecionado2 === "op3"){
        const formatted = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
        }).format(numericValue);
        document.getElementById("output2").innerText = formatted;
    }
    
    
}