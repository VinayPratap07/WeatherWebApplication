const inputCityName = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");
const weatherIcon = document.querySelector("#weatherIcon");
const tempNumber = document.querySelector("#tempNumber");
const dayAndTime = document.querySelector("#dayAndTime");
const weatherDescription = document.querySelector("#weatherDescription");
const windSpeed = document.querySelector("#windSpeed");
const windDirection = document.querySelector("#windDirection");
const visibilityDistance = document.querySelector("#visibility");
const visibilityDescription  = document.querySelector("#visibilityDescription");

const apiKey = "99d8e9b7ad274ef8837c47d68126d26b";
searchBtn.addEventListener("click", getWeather);

async function getWeather(){
    const cityName = inputCityName.value.toLowerCase();
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
        if(!response.ok){
            throw new Error ("Couldn't find the city");
        }
        const data = await response.json();
        console.log(data);
        const weatherId = data.weather[0].id;
        const weatherInfo = data.weather[0].description;
        const speed = data.wind.speed;
        const windDirection = data.wind.deg;
        const visibilityInMeter = data.visibility;

        getTemperature(data);
        getTime();
        weatherIcon.src = weatherIconDisplay(weatherId);
        weatherDescriptionInfo(weatherInfo);
        getWindSpeed(speed,windDirection);
        getVisiblity(visibilityInMeter);
        inputCityName.value = "";
    }
    catch(error){
        console.error(error);
    }
}


function getTemperature(data){
    let temperature = data.main.temp;
    temperature = (temperature - 273.15).toFixed(2) + "°C";
    tempNumber.innerText = temperature;
}

function getTime(){
    const now = new Date();
    const options = {
        weekday: 'long', 
        hour: '2-digit',
        minute: '2-digit',
        hour12: true 
    };
    const formatted = now.toLocaleString('en-IN', options);
    dayAndTime.innerText = formatted;
}

function weatherIconDisplay(id){
    switch(true){
        case( id>=200 && id<300):
            return "Q REEL FINAL.00_00_48_24.Still001.jpg";
        case( id>=300 && id<400):
            return "Q REEL FINAL.00_00_48_24.Still001.jpg";  
        case( id>=500 && id<600):
            return "Q REEL FINAL.00_00_48_24.Still001.jpg";  
        case( id>=600 && id<700):
            return "Q REEL FINAL.00_00_48_24.Still001.jpg";  
        case( id >=701 && id<800):
            return "Q REEL FINAL.00_00_48_24.Still001.jpg";  
        case( id===800):
            return "Q REEL FINAL.00_00_48_24.Still001.jpg";
        case( id>=801 && id<900):
            return "Q REEL FINAL.00_00_48_24.Still001.jpg";   
        default:
            return;
    }
}

function weatherDescriptionInfo(description){
    weatherDescription.innerText = description;
}

function getWindSpeed(speed, windDirectionDegree){
    windSpeed.innerText = speed;

    const arr = ["North", "North-East", "East", "Sout-East", "South", "South-West", "West", "North-West"];
    const temp = Math.round(windDirectionDegree / 45) % 8;
    windDirection.innerText = arr[temp];
}

function getVisiblity(visibility){
    let temp = visibility/1000;

    visibilityDistance.innerText = temp;

    if (temp >= 10) {
        visibilityDescription.innerText = "Excellent";
    } else if (temp >= 6) {
        visibilityDescription.innerText = "Good";
    } else if (temp >= 3) {
        visibilityDescription.innerText = "Moderate";
    } else if (temp >= 1) {
        visibilityDescription.innerText = "Poor";
    } else {
        visibilityDescription.innerText = "Very Poor";
    }
}

function sunsetAndSunrise(){
    
}