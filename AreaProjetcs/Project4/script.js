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
                console.log(contacts[i])
                return
            }
    }
}
    