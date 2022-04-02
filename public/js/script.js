const socket = io();
const menuIcon = document.querySelector("#menu");
const closeIcon = document.querySelector("#cancel");
const navBar = document.querySelector(".sidebar");
const weatherDegreeNo = document.querySelector(".weather-degree-no");
const weatherLocationRegion = document.querySelector(".weather-location-region");
const weatherLocationCountry = document.querySelector(".weather-location-country");
const weatherDateTime = document.querySelector(".weather-date-time");
const weatherCondition = document.querySelector(".weather-condition");
const weatherValue1 = document.querySelector(".value-1");
const weatherValue2 = document.querySelector(".value-2");
const weatherValue3 = document.querySelector(".value-3");
const weatherValue4 = document.querySelector(".value-4");
const location1 = document.querySelector(".location-1");
const location2 = document.querySelector(".location-2");
const location3 = document.querySelector(".location-3");
const location4 = document.querySelector(".location-4");
const $searchWeather = document.querySelector("#search-location");
const submitForm = document.querySelector("#form")

var isNavBarOpen = false;

const toogleNavBarIcon = () => {
    if (!isNavBarOpen) {
        menuIcon.style.display = "none";
        closeIcon.style.display = "block";
        navBar.style.display = "block";
        isNavBarOpen = true
    }else {
        menuIcon.style.display = "block";
        closeIcon.style.display = "none";
        navBar.style.display = "none";
        isNavBarOpen = false
    }
    
} 
menuIcon.addEventListener('click', () => toogleNavBarIcon());
closeIcon.addEventListener("click", () => toogleNavBarIcon())

const geoLocation = () => {
  navigator.geolocation.getCurrentPosition(showLocation);
}

const showLocation = (position) => {
    var long = position.coords.longitude;
    var lat = position.coords.latitude;
    socket.emit("currentPosition", {long, lat})
   
}



window.addEventListener('load', () => {
    geoLocation();
    socket.on("displayWeatherDetails", ({...details}) => {
        weatherDegreeNo.textContent = details.temp_degree;
        weatherLocationRegion.textContent = details.name;
        weatherLocationCountry.textContent = `${details.region}, ${details.country}` ;
        weatherCondition.textContent = details.temp_text;
        weatherDateTime.textContent = details.date_time;
        weatherValue1.textContent = details.cloud;
        weatherValue2.textContent = details.humidity;
        weatherValue3.textContent = details.wind_kph;
        weatherValue4.textContent = details.precip_mm;
        location1.textContent = details.cities[0].name;
        location2.textContent = details.cities[1].name;
        location3.textContent = details.cities[2].name;
        location4.textContent = details.cities[4].name;
        
    })
} )

submitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log($searchWeather.value);
    socket.emit("searchWeatherLocation", $searchWeather.value)
})
