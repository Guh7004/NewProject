function genereta_Number(){

    const min = Math.ceil(document.querySelector('.Min').value)
    const max = Math.floor(document.querySelector('.Max').value)

    const result = Math.floor(Math.random()* (max-min+1)) + min;
    alert (result)
}