const weather = document.querySelector(".js-weather");
const API_KEY = "ac14e58ea2d75f732b33ef06c79182f6";
const COORDS = 'coords';


function getWeather(lat, lon){    
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`)
    .then(function(response){
        return response.json();
    })
    .then (function (json){
        console.log(json);
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    })
}

function saveCoords(coordObj){
    localStorage.setItem(COORDS, JSON.stringify(coordObj));
}

function handleGeoSucces(position){
    console.log("Successfully access geo location.")
    console.log(position.coords);

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordObj = {
        latitude,
        longitude,
    };
    saveCoords(coordObj);
    getWeather(latitude,longitude);

}

function handleGeoError(){
    console.log("Can't access geo location.")
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
    const loadedCords = localStorage.getItem(COORDS);
    if (loadedCords === null){
        askForCoords();
    }else{
        const parsedCoords = JSON.parse(loadedCords);
        console.log(parsedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();

    
}

init();