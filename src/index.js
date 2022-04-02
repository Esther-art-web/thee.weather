const {Server} = require ("socket.io");
const http = require("http");
const path = require("path")
const express = require("express");
const axios = require("axios");
const nearbyCities = require("nearby-cities");
const date = require("date-and-time")
const forecast = require("./utils/forecast")
const searchGeoLocation = require("./utils/searchGeoLocation");
const res = require("express/lib/response");
const port = 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const publicDir = path.join(__dirname, "../public")

app.use(express.static(publicDir))

// app.get('', (req, res) => {
//     console.log(req.query);
//     res.send("Hello");
// })
app.get("*", (req, res) => {
    res.send("<div><h1>404</h1><p>Page not found</p></div>")
})

axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/Lagos.json?access_token=pk.eyJ1IjoiZXN0aGVyNTUiLCJhIjoiY2t1OHEwNjEyMjUyeDJ2bzYxczdkY2ExNCJ9.RlOJc2bhzPDENVoL8W9soQ&limit=1")
    // .then((res) => console.log(res.body))

const assignWeatherDetails = (response, cities) => {
    const res = response.data;
    const {name, region, country} = res.location;
    const date_time_unformatted = res.current.last_updated;
    const pattern = date.compile("hh:mm - dddd D MMM 'YY")
    const date_time = date.format(new Date(), pattern);
    const temp_degree = res.current.temp_c;
    const temp_text = res.current.condition.text
    const {wind_kph, precip_mm, humidity, cloud} = res.current;
    return  {name, region, country, date_time, temp_degree, temp_text, wind_kph, precip_mm, humidity, cloud, cities}
}
io.on("connection", (socket) => {
    
    console.log("New Websocket connection!");
    socket.on("currentPosition", ({long, lat}) => {
        const work = async() => {
            const response = await forecast(lat, long);
            const cities = nearbyCities({latitude: lat,longitude : long});
            return {response, cities};
        }
        work().then(({response, cities}) => {
            const values = assignWeatherDetails(response, cities)
            socket.emit("displayWeatherDetails", 
             {...values})
        }).catch((err) => {
            console.log(err);
        })
    }) 
    socket.on("searchWeatherLocation", async(value) => {
        const {longitude, latitude} = await searchGeoLocation(value);
        const response = await forecast(latitude, longitude)
        const values = assignWeatherDetails(response);
        socket.emit("displayWeatherDetails", 
             {...values})
    })
})


server.listen(port, () => {
    console.log(`App is running on port ${port}`)
}) 