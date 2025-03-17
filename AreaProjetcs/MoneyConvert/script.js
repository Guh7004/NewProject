let valorSelecionado1 = "op1";
let valorSelecionado2 = "op1";
let data = {}; 
document.addEventListener("DOMContentLoaded", async function () {
    await valor(); // Carrega os dados da API assim que a página for carregada
});

document.getElementById('meuSelect1').addEventListener('change', function () {
    valorSelecionado1 = this.value;
});
document.getElementById('meuSelect2').addEventListener('change', function () {
    valorSelecionado2 = this.value;
});

async function valor(){
    data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,EUR-USD,USD-EUR,BRL-USD,BRL-EUR")
    .then(response => response.json());
console.log(data); // Verifique se os dados foram carregados corretamente
}
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
        numericValue = numericValue * data.BRLUSD.high;
        const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(numericValue);
        document.getElementById("output2").innerText = formatted;
    }
    if(valorSelecionado1 === "op1" && valorSelecionado2 === "op3"){
        numericValue = numericValue * data.BRLEUR.high;
        const formatted = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
        }).format(numericValue);
        document.getElementById("output2").innerText = formatted;
    }

    if(valorSelecionado1 === "op2" && valorSelecionado2 === "op1"){
        numericValue = numericValue * data.USDBRL.high;
        const formatted = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(numericValue);
        document.getElementById("output2").innerText = formatted;
    }
    if(valorSelecionado1 === "op2" && valorSelecionado2 === "op3"){
        numericValue = numericValue * data.USDEUR.high;
        const formatted = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
        }).format(numericValue);
        document.getElementById("output2").innerText = formatted;
    }
    if(valorSelecionado1 === "op3" && valorSelecionado2 === "op1"){
        numericValue = numericValue * data.EURBRL.high; 
        const formatted = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(numericValue);
        document.getElementById("output2").innerText = formatted;
    }
    if(valorSelecionado1 === "op3" && valorSelecionado2 === "op2"){
        numericValue = numericValue * data.EURUSD.high; 
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