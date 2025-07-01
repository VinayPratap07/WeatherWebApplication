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
const sunRiseTime  = document.querySelector("#sunriseTime");            //Accessed essential html elemtent 
const sunsetTime  = document.querySelector("#sunsetTime");
const humidityPercentage  = document.querySelector("#humidityPercentage");
const humidityDescription  = document.querySelector("#humidityDescription");
const minTempratureNo  = document.querySelector("#minTempratureNo");
const maxTempratureNo  = document.querySelector("#maxTempratureNo");
const atmosphericPressure  = document.querySelector("#atmosphericPressure");
const atmosphericPressureDescription  = document.querySelector("#atmosphericPressureDescription");


const apiKey = "8ac828e0c51cb13ec4d9360c52dd2841";              //Generated api key from https://openweathermap.org/
searchBtn.addEventListener("click", getWeather);                //Added event listner to search button
inputCityName.addEventListener("keypress", function(e) {
    if (e.key === "Enter") getWeather();
});

async function getWeather(){
    const cityName = inputCityName.value.toLowerCase();         //used lower case method if user enters in all caps 


    try{                                                          //Using try, catch function to detect any errors while fetching api
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
        if(!response.ok){
            throw new Error ("Couldn't find the city");
        }
        const data = await response.json();                     //.json() to convert data into readble format
        console.log(data);
        const weatherId = data.weather[0].id;                   
        const weatherInfo = data.weather[0].description;
        const speed = data.wind.speed;
        const windDirection = data.wind.deg;
        const visibilityInMeter = data.visibility;
        const sunRise = data.sys.sunrise;
        const sunSet = data.sys.sunset;
        const countryZone = data.sys.country;
        const timeZone = data.timezone;
        const humidityFromApi = data.main.humidity;
        const minTemp = data.main.temp_min;
        const maxTemp = data.main.temp_max;
        const atmosPressure = data.main.pressure;


        getTemperature(data);                                   //calling functions to do show the stats or resulst
        getTime();
        weatherIcon.src = weatherIconDisplay(weatherId);
        weatherDescriptionInfo(weatherInfo);
        getWindSpeed(speed,windDirection);
        getVisiblity(visibilityInMeter);
        getSunTime(sunRise, sunSet, countryZone, timeZone);
        getHumidity(humidityFromApi);
        getMinAndMaxTemp(minTemp, maxTemp);
        getAtmosphericPressure(atmosPressure);

        inputCityName.value = "";
    }
    catch(error){
        console.error(error);
    }
}


function getTemperature(data){                                      //Function to get temperature from api, convert it into celsius and add it to display the temperature
    let temperature = data.main.temp;
    temperature = (temperature - 273.15).toFixed(2) + "°C";
    tempNumber.innerText = temperature;
}

function getTime(){                                                 //Function to tell weekday and time 
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

function weatherIconDisplay(id){                                    //Function to display weather icon based on weatherID provided in API
        switch (true) {
        case (id >= 200 && id < 300):
            return "icons/storm.png";
        case (id >= 300 && id < 400):
            return "icons/drizzle.png";
        case (id >= 500 && id < 600):
            return "icons/rain.png"; 
        case (id >= 600 && id < 700):
            return "icons/snow.png";
        case (id >= 701 && id < 800):
            return "icons/fog.png";
        case (id === 800):
            return "icons/sun.png";
        case (id >= 801 && id < 900):
            return "icons/cloudy.png";
        default:
            return "icons/unknown.png"; // Fallback icon
    }
}

function weatherDescriptionInfo(description){                       //Function to display weather description
    weatherDescription.innerText = description;
}

function getWindSpeed(speed, windDirectionDegree){                 //Function to display Wind speed and Wind direction
    windSpeed.innerText = speed;

    const arr = ["North", "North-East", "East", "Sout-East", "South", "South-West", "West", "North-West"];
    const temp = Math.round(windDirectionDegree / 45) % 8;
    windDirection.innerText = arr[temp];
}

function getVisiblity(visibility){                                  //Functin to display Visibility distance and description

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


function getSunTime(sunRise, sunSet, countryZone, timeZone){        //Function to dispaly Sunset and Sunrise time
    const sunriseUTC = sunRise * 1000;
    const sunsetUTC = sunSet * 1000;

    const riseTime = new Date(sunriseUTC + timeZone * 1000);
    const setTime = new Date(sunsetUTC + timeZone * 1000);
    const options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC" 
    };

    sunRiseTime.innerText = riseTime.toLocaleTimeString(`en-${countryZone}`, options);
    sunsetTime.innerText = setTime.toLocaleTimeString(`en-${countryZone}`,options);
}

function getHumidity(humidityFromApi){
    humidityPercentage.innerText = humidityFromApi;

    switch(true){
        case (humidityFromApi>=0 && humidityFromApi<=30 ):
            humidityDescription.innerText = "Very Dry";
            break;
        case (humidityFromApi>=31 && humidityFromApi<=50 ):
            humidityDescription.innerText = "Dry ";
            break;
        case (humidityFromApi>=51 && humidityFromApi<=60 ):
            humidityDescription.innerText = "Moderate";
            break;
        case (humidityFromApi>=61 && humidityFromApi<=70 ):
            humidityDescription.innerText = "Humid";
            break;
        case (humidityFromApi>=71 && humidityFromApi<=90 ):
            humidityDescription.innerText = "Very Humid";
            break;
        case (humidityFromApi>=91 && humidityFromApi<=100 ):
            humidityDescription.innerText = "Extremely Humid";
            break;
        default:
            humidityDescription.innerText = "Invalid humidity value";
            break;
    }

}

function getMinAndMaxTemp(minTemperature, maxTemperature){
    minTempratureNo.innerText = (minTemperature - 273.15).toFixed(2) + "°C";
    maxTempratureNo.innerText = (maxTemperature - 273.15).toFixed(2) + "°C";
}

function getAtmosphericPressure(pressureInput){
    atmosphericPressure.innerText = pressureInput;

    if (pressureInput < 1000) {
        atmosphericPressureDescription.innerText = "Low pressure";
    } else if (pressureInput >= 1000 && pressureInput <= 1015) {
        atmosphericPressureDescription.innerText = "Moderate pressure";
    } else if (pressureInput >= 1016 && pressureInput <= 1025 ) {
        atmosphericPressureDescription.innerText = "High pressure";
    } else {
        atmosphericPressureDescription.innerText = "Very high pressure";
    }
}