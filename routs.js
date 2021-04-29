
const asyncHandler = require('express-async-handler')
const loaderS = require(__dirname + '/loader.js')
const MongoClient = require('mongodb').MongoClient;
const port = process.env.PORT || '3000';
const apiKey = process.env.APIKEY;
var db = null;
const url =process.env.URL

module.exports = function (server) {
    server.get('/weather/coordinates', asyncHandler(async function (req, res) {
        if (!Object.keys(req.query).includes('lat') || !Object.keys(req.query).includes('lon')) {
            res.status(400).send("No coordinates keys in query");
        }
        await loaderS.loadWeatherDataByPosToRes(req.query.lat, req.query.lon, res)

    }));

    server.get('/weather/city', asyncHandler(async function (req, res) {
        if (!Object.keys(req.query).includes('name')) {
            res.status(400).send("No city key in query");
        }
        await loaderS.loadWeatherDataByNameToRes(req.query.name, res);

    }));

    server.get('/favorites', asyncHandler(async function (req, res){
        db.collection('favorites').find().toArray(function (error, result) {
            res.status(200).send(result);
        });
    }));



    server.post('/favorites', asyncHandler(async function (req, res) {
        if (!Object.keys(req.query).includes('name')) {
            res.status(400).send("No city key in query")
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=${apiKey}`
        await loaderS.loadDataByUrl(
            url,
            data => {
                db.collection('favorites').find({id: data.id}).toArray((error, result) => {
                    if (result.length !== 0) {
                        res.status(409).send("Already in favorites");
                    } else {
                        db.collection('favorites').insertOne({id: data.id, name: data.name});
                        res.status(200).send("OK");
                    }
                });
            },
            (code, error) => {
                res.status(code).send(error)
            }
        )

    }));

    server.delete('/favorites', asyncHandler(async function (req, res) {
        if (!Object.keys(req.query).includes('name')) {
            res.status(400).send("No city key in query")
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=${apiKey}`
        await loaderS.loadDataByUrl(
            url,
            data => {
                db.collection('favorites').remove({ id: data.id }, function (err) {
                    if (err) {
                        res.status(404).send("Can't remove");
                    } else {
                        res.status(200).send("OK");
                    }
                });
            },
            (code, error) => {
                res.status(code).send(error);
            }
        )
    }))

    MongoClient.connect(url, (err, client) => {
        useUnifiedTopology: true;

        if (err) throw err;

        db = client.db('db');
        server.listen(port);
    });
}
