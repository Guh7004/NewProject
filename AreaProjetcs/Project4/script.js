let p = document.querySelector('p')
let input = document.querySelector('input')

const contacts = [
    { name: 'Gustavo', number: '1234' },
    { name: 'João', number: '4568' },
    { name: 'Matheus', number: '98745' },
    { name: 'Luiz', number: '1235748' },
]
function search(){
    for (let i = 0; i < contacts.length ;i++){
            if(input.value === contacts[i].name)
            {
                p.innerHTML = `Contato Encontrado Name:${contacts[i].name} Tel: ${contacts[i].number}`
                console.log(contacts[i])
                break
            }else{
                p.innerHTML =  'Contato Não Encontrado'
            }
    }
}
function addContact() {
    let newName = prompt("Digite o nome do contato:");
    let newNumber = prompt("Digite o número do contato:");

    if (newName && newNumber) {
        contacts.push({ name: newName, number: newNumber });
        alert(`Contato ${newName} adicionado com sucesso!`);
    } else {
        alert("Nome e número são obrigatórios!");
    }
}
