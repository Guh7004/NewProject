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
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});
