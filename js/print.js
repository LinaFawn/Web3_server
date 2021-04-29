
function onCurrentCityLoaded(weather) {
    console.log(weather)
    let curCel = document.getElementsByClassName("headerTemp")[0]
    let curCity = document.getElementsByClassName("headerCity")[0]
    let curImg = document.getElementsByClassName("headerImg")[0]
    let curWind = document.getElementById("hWind")
    let curCloudiness = document.getElementById("hCloudiness")
    let curPressure = document.getElementById("hPressure")
    let curHumidity = document.getElementById("hHumidity")
    let curCoordinates = document.getElementById("hCoordinates")

    curCel.textContent = `${Math.round((weather.main.temp - 273.15))}°C`
    curCity.textContent = weather.name
    curImg.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
    curWind.textContent = `${weather.wind.speed} m/s, ${windDegToText(weather.wind.deg)}`
    curCloudiness.textContent = `${weather.clouds.all}%`
    curPressure.textContent = `${weather.main.pressure} hpa`
    curHumidity.textContent = `${weather.main.humidity}%`
    curCoordinates.textContent = `[${weather.coord.lat}, ${weather.coord.lon}]`
}