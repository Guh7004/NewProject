document.getElementById('moneyInput').addEventListener('input', function (e) {
    let value = e.target.value;

    value = value.replace(/\D/g, "");
    if (value === "") {
        e.target.value = "R$ 0,00";
        return;
    }
    value = (parseFloat(value) / 100).toFixed(2);
    value = value.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    e.target.value = "R$ " + value;
});

let valorSelecionado1 = "op1";
let valorSelecionado2 = "op1";


document.getElementById('meuSelect1').addEventListener('change', function () {
    valorSelecionado1 = this.value;
    console.log("Selecionado:", valorSelecionado1);
});
document.getElementById('meuSelect2').addEventListener('change', function () {
    valorSelecionado2 = this.value;
    console.log("Selecionado:", valorSelecionado2);
});

function converter() {
    
    let valorInput = document.getElementById('moneyInput').value;

    valorInput = valorInput.replace("R$", "").replace(/\./g, "").replace(",", ".");

    let valorNumerico = parseFloat(valorInput);
    document.getElementById('output1').innerText = "R$" + valorNumerico;
    if (valorSelecionado1 === "op1" && valorSelecionado2 === "op2") {
        console.log(valorNumerico * 6);
        document.getElementById('output2').innerText = "R$" + valorNumerico * 6;
    }else{
        console.log(valorNumerico)
    }
}


