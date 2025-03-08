const cart = [10, 255, 340, 5, 1];
let SomaDisc = 0;
let SomaNoDisc = 0;

function discount() {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i] > 30) {
            let Disc = cart[i] / 100 * 10; // 10% de desconto
            SomaDisc += Disc; // Corrigido o escopo
            
        }
    }
    return SomaDisc; // Retorna o total de descontos
    
}
function ValorPaga(){
    for(let i = 0; i <cart.length; i++)
        {
        SomaNoDisc += cart[i];
        }
    return SomaNoDisc;
}
let totalDesconto = discount();
let TotalPagar = ValorPaga();
console.log(`Total de desconto: ${totalDesconto}`);
console.log(`Você iria pagar R$ ${TotalPagar} porém com o desconto pagará R$ ${TotalPagar - totalDesconto}`);
