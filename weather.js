const apiKey = "bf941a4b19119d5a005a6534750dff40";

var weather = {
    location: null,
    temperature: null,
    weather_icon: null,
    weather_description: null
}

function displayWeather() {
    // Display Location
    let div_weather_location = document.getElementsByClassName("weather-location");
    div_weather_location[0].innerHTML = weather.location;

    // Display Temperature
    let div_temperature = document.getElementsByClassName("weather-temp");
    div_temperature[0].innerHTML = weather.temperature;

    let div_weather_icon = document.getElementsByClassName("weather-icon");
    //div_weather_icon[0].innerHTML = `<img id="image_icon" src="weather_icons/${weather.weather_icon}.png" alt="${weather.weather_description}">`;
    div_weather_icon[0].innerHTML = `<img id="image_icon" src="anim_weather_icons/${weather.weather_icon}.svg" alt="${weather.weather_description}">`;
    console.log(weather.weather_icon);

    // Display weather description
    let div_weather_description = document.getElementsByClassName("weather-description");
    div_weather_description[0].innerHTML = weather.weather_description;

    let weather_container = document.getElementById("myData");
    if(weather_container.style.display === "none") {
        weather_container.style.display = "block";
    }
}


function searchWeather() {
    // Define the API call URL
    let location_name = document.getElementById("location_name").value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location_name}&appid=${apiKey}&units=imperial`
    console.log(url);

    // Perform the API GET request using fetch
    fetch(url)
        .then(response => response.json())
        //Grab the JSON Data and put into our jsonResponse Variable
        .then(data => {
            // Grab json data and output the temperature only IF VALID. 200 = Valid
            if (data.cod == 200) {
                console.log(data);
                // Store weather data into weather object
                weather.location = data.name.toString();
                weather.temperature = data.main.temp.toString() + "°";
                weather.weather_icon = data.weather[0].icon;
                weather.weather_description = data.weather[0].description;
                // display weather
                displayWeather();
            } else {
                // Throw error if input is invalid
                throw Error(data.cod);
            }

        })
        // Catch Error in the case that the input is invalid
        .catch(err => {
            console.log(err);
            let div_err = document.getElementById("errInput");
            div_err.innerHTML = ("Invalid Input");
        });

    // Use XHR object to
}



document.getElementById('myButton').addEventListener('click', searchWeather);
