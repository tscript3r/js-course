// Get your API key from: https://openweathermap.org/api
$OPEN_WEATHER_MAP_API_KEY = "";

class IOElements {

    constructor() {
        this.input = document.querySelector("input");
        this.btn = document.querySelector("button");
        this.cityName = document.querySelector(".city-name");
        this.warning = document.querySelector(".warning");
        this.photo = document.querySelector(".photo");
        this.weather = document.querySelector(".weather");
        this.temperature = document.querySelector(".temp");
        this.humidity = document.querySelector(".humidity");
    }

}

class OpenWeatherApi {

    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    getWeather(city) {
        return axios.get(this._getUrl(city))
            .then(response => response.data)
            .catch(error => console.error(error));
    }

    _getUrl(city) {
        return `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${this.apiKey}`;
    }

}

class Weather {

    constructor(openWeatherApiKey, cityElement, temperatureElement, humidityElement, weatherElement, photoElement, warningElement) {
        this.openWeatherApi = new OpenWeatherApi(openWeatherApiKey);
        this.cityElement = cityElement;
        this.temperatureElement = temperatureElement;
        this.humidityElement = humidityElement;
        this.weatherElement = weatherElement;
        this.photoElement = photoElement;
        this.warningElement = warningElement;
    }

    getWeather(city) {
        this.openWeatherApi.getWeather(city)
            .then(data => {
                this.cityElement.textContent = data.name;
                this.temperatureElement.textContent = `${Math.floor(data.main.temp)}C`;
                this.humidityElement.textContent = `${data.main.humidity}%`;
                this.weatherElement.textContent = data.weather[0].main;
                this.photoElement.setAttribute("src", this._getWeatherImage(data.weather[0].main.id));
            })
            .catch(error => {
                console.error(error)
                this.warningElement.textContent = "Enter existing city name";
            });
    }

    _getWeatherImage(statusId) {
        if(statusId >= 200 && statusId < 300)
            return "./img/thunderstorm.png";
        if(statusId >= 300 && statusId < 400)
            return "./img/drizzle.png";
        if(statusId >= 500 && statusId < 600)
            return "./img/rain.png";
        if(statusId >= 600 && statusId < 700)
            return "./img/ice.png";
        if(statusId >= 700 && statusId < 800)
            return "./img/fog.png";
        if(statusId == 800)
            return "./img/sun.png";
        if(statusId >= 800 && statusId < 900)
            return "./img/cloud.png";
        return "./img/unknown.png";
    }

}

const main = () => {
    const io = new IOElements();
    const weather = new Weather($OPEN_WEATHER_MAP_API_KEY, io.cityName, io.temperature, io.humidity, io.weather, io.photo, io.warning);
    const onClick = () => {
        io.warning.textContent = "";
        if(io.input.value)
            weather.getWeather(io.input.value);
        else
            io.warning.textContent = "Enter city name";
    }
    io.btn.addEventListener("click", onClick);
    io.input.addEventListener("keyup", (e) => {
        if(e.keyCode == 13) // 13 === enter
            onClick();
    });
    weather.getWeather("Warsaw");
}

document.addEventListener("DOMContentLoaded", main);