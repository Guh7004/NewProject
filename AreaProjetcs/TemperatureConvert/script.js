
function Start(){
   
    let lat;
    let lon;
    
    const apiKey ='05f28c72ce6c434369126d4fc66ee2ff';
    const city = document.getElementById("City").value;
    const state = document.getElementById("State").value;
    const geo = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},BR&limit=5&appid=${apiKey}`;

    fetch (geo)
    .then(response => response.json())
    .then(data=> {
        if (data.length > 0 ){
            lat = data[0].lat;
            lon = data[0].lon;
            console.log('Latitude:', lat);
            console.log('Longitude:', lon);

            const map = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
            return fetch(map);
        }else {
            console.log('Nenhuma Cidade Encontrada')
        }
    })
    .then(response => response.json())
    .then(data =>{
        const Icon = "°C";
        const HumidityTxt = "Humidade:";
        let Humidity = data.main.humidity;
        let HumidadeFormat = Humidity.toFixed(0) + "%";
        console.log(HumidadeFormat);

        let ValorTemp = (data.main.temp - 273.15).toFixed(2);
        console.log(ValorTemp);
        

        document.getElementById("Percent").innerHTML = HumidadeFormat;
        document.getElementById("Graus").innerHTML = ValorTemp;
        document.getElementById("HumidityTxt").textContent = HumidityTxt;
        document.getElementById("Icon").textContent = Icon;
    } )

}