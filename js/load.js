function loadWeatherDataByName(name, callback, errorCallback) {
    let url = `/weather/city?name=${name}`
    loadDataByUrl(url, callback, errorCallback)
}

function loadWeatherDataByPos(position, callback, errorCallback) {
    let url = `/weather/coordinates?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
    loadDataByUrl(url, callback, errorCallback)
}

function loadDataByUrl(url, callback, errorCallback) {
    fetch(url)
        .then(response => {
            if (response.status === 200) {
                response.json().then(json => {
                    callback(json)
                })
            } else {
                errorCallback()
            }
        })
        .catch((err) => {
            errorCallback()
        })
}

function loadCurrentCity() {
    navigator.geolocation.getCurrentPosition(
        position => {
            console.log(position)
            loadWeatherDataByPos(position, onCurrentCityLoaded, errorDuringLoadingCurrent)
        },
        error => {
            console.log(error)
            loadWeatherDataByName("Saint Petersburg", onCurrentCityLoaded, errorDuringLoadingCurrent)
        }, {timeout: 5000}
    )
}

function errorDuringLoadingCurrent() {
    alert("Can't load city")
}

function postDataByUrl(url, callback, errorCallback, toDelete) {
    let method = "POST"
    if (toDelete === true) {
        method = "DELETE"
    }
    fetch(url, {
        method: method
    })
        .then(response => {
            if (response.status === 200) {
                callback()
            } else {
                response.text().then(text => {
                    errorCallback(text)
                })
            }
        })
        .catch((err) => {
            errorCallback(err)
        })
}
