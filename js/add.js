function addNewCityByName(name) {
    addNewCity((callback, errorCallback) => {
        loadWeatherDataByName(name, callback, errorCallback)
    })
}

function addNewCity(loadFunc) {
    let favoritesList = document.getElementsByClassName("favWeather")[0]
    let element = createFavoriteCityElement(favoritesList)
    loadFunc(weather => {
        onCityLoaded(favoritesList, element, weather)
    }, error => {
        errorDuringLoadingFavorite(favoritesList, element, error)
    })
}

function onCityLoaded(parent, element, weather) {
    console.log(weather)
    fillCityElement(parent, element, weather)
}


function errorDuringLoadingFavorite(parent, element, error) {
    console.log(parent, element)
    parent.removeChild(element)
    alert(error)
}

function fillCityElement(parent, element, weather) {
    element.querySelector('.favCity').textContent = weather.name
    element.querySelector('.favImg').src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`
    element.querySelector('.favTemperature').textContent = `${Math.round((weather.main.temp - 273.15))}°C`
    element.querySelector('.favButton').addEventListener("click", () => {
        removeFromFavorites(weather.name, parent, element)
    })
    element.querySelector('#favorites-wind').textContent = `${weather.wind.speed} m/s, ${windDegToText(weather.wind.deg)}`
    element.querySelector('#favorites-cloudiness').textContent = `${weather.clouds.all}%`
    element.querySelector('#favorites-pressure').textContent = `${weather.main.pressure} hpa`
    element.querySelector('#favorites-humidity').textContent = `${weather.main.humidity}%`
    element.querySelector('#favorites-coordinates').textContent = `[${weather.coord.lat}, ${weather.coord.lon}]`
}

function windDegToText(degree) {
    if (degree > 337.5) return 'Northerly'
    if (degree > 292.5) return 'North Westerly'
    if (degree > 247.5) return 'Westerly'
    if (degree > 202.5) return 'South Westerly'
    if (degree > 157.5) return 'Southerly'
    if (degree > 122.5) return 'South Easterly'
    if (degree > 67.5) return 'Easterly'
    if (degree > 22.5) return 'North Easterly'
    return 'Northerly'
}