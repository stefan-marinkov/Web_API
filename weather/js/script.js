const input = document.querySelector('#city')
const info = document.querySelector('#canvasInfo')
const btn = document.querySelector('#submit')

const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q='
const apiKeyWeather = '&appid=09d2d09ccf760b1a06f9daacc365ff2a'
const units = '&units=metric'

function weatherData (data) {
    console.log(data.weather)
info.innerHTML = `In ${data.name} temperature is<br> ${Math.floor(data.main.temp)} Celsius and is ${data.weather[0].description}.`

}
input.addEventListener( 'keypress', (e) => {
     if( e.keyCode === 13) {
        weatherAsk()
    }
    })
    btn.addEventListener( 'click', weatherAsk)


async function weatherAsk() {
const response = await fetch(baseUrl + input.value + apiKeyWeather + units)
const data = await response.json()
weatherData(data)
}

weatherAsk()
