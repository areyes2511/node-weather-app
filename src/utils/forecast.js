const request = require("request");

function forecast(latitude, longitude, callback) {
    const url = `https://api.darksky.net/forecast/b6902a9569d76479ab564c19309cf235/${latitude},${longitude}`;

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined);
        } else if (body.error) {
            callback("Unable to find location!", undefined);
        } else {
            callback(undefined, {
                temp: body.currently.temperature
            });
        }
    });
}

module.exports = forecast;