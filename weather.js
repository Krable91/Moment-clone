const weather = document.querySelector(".js-weather");
const API_KEY = "54fa039968941dd936a6aaf91f814f80";
const COORDS = "coords";


function getWeather(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    )
    .then(res => res.json())
    .then(json => {
        const temp = json.main.temp;
        const place = json.name;
        weather.innerHTML = `${Math.floor(temp - 273)} @ ${place}`;
    })
        
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("위치를 가져오지 못했습니다.");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        console.log(parseCoords);
        getWeather(parseCoords.latitude, parseCoords. longitude);
            //getWeather();
    }
}


function init() {
    loadCoords();

}

init();