function soma(){
    let num1 = parseFloat(document.getElementById('num1').value);
    let num2 = parseFloat(document.getElementById('num2').value);
    let resultadoDiv = document.getElementById('resultado');
    if (isNaN(num1) || isNaN(num2)) {
        resultadoDiv.innerHTML = "Por favor, insira dois números válidos.";
        return;
    }

    let soma = num1 + num2;
    // Verificação de par ou ímpar
    //let parOuImpar1 = num1 % 2 === 0 ? "par" : "ímpar";
    //let parOuImpar2 = num2 % 2 === 0 ? "par" : "ímpar";
    //let subtracao = num1 - num2;
    //let multiplicacao = num1 * num2;
    //let divisao = num2 !== 0 ? (num1 / num2).toFixed(2) : "Não é possível dividir por zero";
    //let potencia = Math.pow(num1, num2);

    resultadoDiv.innerHTML = `
    <p>Soma: ${soma}</p>
    `;
}
