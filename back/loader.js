const https = require('https');
const apiKey = process.env.APIKEY;

module.exports = {
    loadWeatherByPos: async function(lat, lon, res){
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
        await loadDataByUrlToRes(url, res);
    },

    loadWeatherByName: async function(name, res){
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}`
        await loadDataByUrlToRes(url, res)
    },

    loadDataByUrl: async function (url, callback, errorCallback) {
    https.get(url, (response) => {
        if (response.statusCode === 404) {
            errorCallback(404, "Not found")
            return
        }

        let data = ''
        response.on('data', (chunk) => {
            data += chunk
        });
        response.on('end', () => {
            data = JSON.parse(data)
            callback(data)
        })
    }).on("error", (err) => {
        errorCallback(404, "Not found")
    })
    }

}

function loadDataByUrlToRes(url, res) {
    loadDataByUrl(
        url,
        data => {
            res.status(200).send(data)
        },
        (code, error) => {
            res.status(code).send(error)
        }
    )
}

function loadDataByUrl(url, callback, errorCallback) {
    https.get(url, (response) => {
        if (response.statusCode === 404) {
            errorCallback(404, "Not found")
            return
        }

        let data = ''
        response.on('data', (chunk) => {
            data += chunk
        });
        response.on('end', () => {
            data = JSON.parse(data)
            callback(data)
        })
    }).on("error", (err) => {
        errorCallback(404, "Not found")
    })
}


