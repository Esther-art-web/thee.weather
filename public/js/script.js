const socket = io();
const main = document.querySelector('.main-content:not(.nav-bar)');
const menuIcon = document.querySelector("#menu");
const closeIcon = document.querySelector("#cancel");
const navBar = document.querySelector(".sidebar");
const weatherContent = document.querySelector(".weather-content");
const weatherDegreeNo = document.querySelector(".weather-degree-no");
const weatherLocationRegion = document.querySelector(".weather-location-region");
const weatherLocationCountry = document.querySelector(".weather-location-country");
const weatherDateTime = document.querySelector(".weather-date-time");
const weatherCondition = document.querySelector(".weather-condition");
const weatherIcon = document.querySelector(".weather-icon");
const weatherValue1 = document.querySelector(".value-1");
const weatherValue2 = document.querySelector(".value-2");
const weatherValue3 = document.querySelector(".value-3");
const weatherValue4 = document.querySelector(".value-4");
const location1 = document.querySelector(".location-1");
const location2 = document.querySelector(".location-2");
const location3 = document.querySelector(".location-3");
const location4 = document.querySelector(".location-4");
const $searchWeather = document.querySelector("#search-location");
const submitForm = document.querySelector("#form");
const searchIcon = document.querySelector(".search-icon");
const errorMssg = document.querySelector("#error-mssg");

var isNavBarOpen = false;
var navBarClicks = 0;

const toogleNavBarIcon = () => {
    if (!isNavBarOpen) {
        menuIcon.style.display = "none";
        closeIcon.style.display = "block";
        navBar.style.display = "block";
        isNavBarOpen = true;
        navBarClicks = 1;
    }else {
        menuIcon.style.display = "block";
        closeIcon.style.display = "none";
        navBar.style.display = "none";
        isNavBarOpen = false;
    }
    
} 

menuIcon.addEventListener('click', () => {
    toogleNavBarIcon();
});

closeIcon.addEventListener("click", () => toogleNavBarIcon());

const geoLocation = () => {
  navigator.geolocation.getCurrentPosition(showLocation);
}

const showLocation = (position) => {
    var long = position.coords.longitude;
    var lat = position.coords.latitude;
    socket.emit("currentPosition", {long, lat});
   
}

window.addEventListener('load', () => {
    $searchWeather.focus();
    geoLocation();
    socket.on("displayWeatherDetails", ({...details}) => {
        weatherIcon.style.display= "block";
        weatherDegreeNo.textContent = `${details.temp_degree}\xB0`;
        weatherLocationRegion.textContent = details.name;
        weatherLocationCountry.textContent = `${details.region}, ${details.country}` ;
        weatherCondition.textContent = details.temp_text;
        weatherDateTime.textContent = details.date_time;
        weatherValue1.textContent = `${details.cloud}%`;
        weatherValue2.textContent = `${details.humidity}%`;
        weatherValue3.textContent = `${details.wind_kph}km/h`;
        weatherValue4.textContent = `${details.precip_mm}mm`;
        weatherIcon.src = details.weatherIcon;
        location1.textContent = details.cities[0].name;
        location2.textContent = details.cities[1].name;
        location3.textContent = details.cities[2].name;
        location4.textContent = details.cities[4].name;
        errorMssg.textContent = "";
    });
});
$searchWeather.addEventListener('change', () => {
    searchIcon.disabled = false;
});

submitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = $searchWeather.value.trim();
    $searchWeather.value = '';
    if (location){
        socket.emit("searchWeatherLocation", location);
        if(screen.width < 993){
            menuIcon.style.display = "block";
            closeIcon.style.display = "none";
            navBar.style.display = "none";
            isNavBarOpen = false;
        }
    }
    else{
        weatherIcon.style.display= "none";
        weatherDegreeNo.textContent = ``;
        weatherLocationRegion.textContent = ``;
        weatherLocationCountry.textContent = `` ;
        weatherCondition.textContent = ``;
        weatherDateTime.textContent = ``;
        errorMssg.textContent = "Please enter a valid location";
        errorMssg.style.fontSize= "3em";
    }
    
});
location1.addEventListener("click", (e) => {
    const location = e.target.innerText;
    socket.emit("searchWeatherLocation", location);

});
location2.addEventListener("click", (e) => {
    const location = e.target.innerText;
    socket.emit("searchWeatherLocation", location);

});
location3.addEventListener("click", (e) => {
    const location = e.target.innerText;
    socket.emit("searchWeatherLocation", location);

});
location4.addEventListener("click", (e) => {
    const location = e.target.innerText;
    socket.emit("searchWeatherLocation", location);

});
