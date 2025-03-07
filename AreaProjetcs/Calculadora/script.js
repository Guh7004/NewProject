function soma(){
    let num1 = parseFloat(document.getElementById('num1').value);
    let num2 = parseFloat(document.getElementById('num2').value);
    let resultadoDiv = document.getElementById('resultado');
    if (isNaN(num1) || isNaN(num2)) {
        resultadoDiv.innerHTML = "Por favor, insira dois números válidos.";
        return;
    }

    let soma = num1 + num2;
    let parOuImpar1 = soma % 2 === 0 ? "Par" : "Ímpar";
    resultadoDiv.innerHTML = `
    <p>Soma: ${soma}</p>
    <p>O número é: ${parOuImpar1}</p>
    `;
}
    function subtraçao(){
        let num1 = parseFloat(document.getElementById('num1').value);
        let num2 = parseFloat(document.getElementById('num2').value);
        let resultadoDiv = document.getElementById('resultado');
        
        if (isNaN(num1) || isNaN(num2)) {
            resultadoDiv.innerHTML = "Por favor, insira dois números válidos.";
            return;
        }
    
        let sub = num1 - num2;
        let parOuImpar1 = sub % 2 === 0 ? "Par" : "Ímpar";
        resultadoDiv.innerHTML = `
        <p>Subtração: ${sub}</p>
        <p>O número é: ${parOuImpar1}</p>
        `;
    }
    function multiplicacao(){
        let num1 = parseFloat(document.getElementById('num1').value);
        let num2 = parseFloat(document.getElementById('num2').value);
        let resultadoDiv = document.getElementById('resultado');
        if (isNaN(num1) || isNaN(num2)) {
            resultadoDiv.innerHTML = "Por favor, insira dois números válidos.";
            return;
        }
    
        let mult = num1 * num2;
        let parOuImpar1 = mult % 2 === 0 ? "Par" : "Ímpar";
        resultadoDiv.innerHTML = `
        <p>Multiplicação: ${mult}</p>
        <p>O número é: ${parOuImpar1}</p>
        `;
    }
    function divisao(){
        let num1 = parseFloat(document.getElementById('num1').value);
        let num2 = parseFloat(document.getElementById('num2').value);
        let resultadoDiv = document.getElementById('resultado');
        if (isNaN(num1) || isNaN(num2)) {
            resultadoDiv.innerHTML = "Por favor, insira dois números válidos.";
            return;
        }
    
        let divisao = num2 !== 0 ? (num1 / num2).toFixed(2) : "Não é possível dividir por zero";
        let parOuImpar1 = divisao % 2 === 0 ? "Par" : "Ímpar";
        resultadoDiv.innerHTML = `
        <p>Divisão: ${divisao}</p>
        <p>O número é: ${parOuImpar1}</p>
        `;
    }
    
    function potencia(){
        let num1 = parseFloat(document.getElementById('num1').value);
        let num2 = parseFloat(document.getElementById('num2').value);
        let resultadoDiv = document.getElementById('resultado');
        if (isNaN(num1) || isNaN(num2)) {
            resultadoDiv.innerHTML = "Por favor, insira dois números válidos.";
            return;
        }
    
        let potencia = Math.pow(num1, num2);
        let parOuImpar1 = potencia % 2 === 0 ? "Par" : "Ímpar";
        resultadoDiv.innerHTML = `
        <p>Potencia: ${potencia}</p>
        <p>O número é: ${parOuImpar1}</p>
        `;
    }
    

   

