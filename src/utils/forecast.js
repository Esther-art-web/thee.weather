const axios = require("axios");

const forecast = (lat, long) => {
    return new Promise ((resolve, reject) => {
        if (lat || long){
            const response =  axios('https://api.weatherapi.com/v1/forecast.json?key=6578b3a8990f43a0a10234336213009&q=' + encodeURIComponent(lat) +',' + encodeURIComponent(long) + '&hour=6&days=10&aqi=no&alerts=no08&lang=en')
            return resolve(response);
        }
        reject("Longitude and Latitude not provided!")
    })
}

module.exports = forecast;