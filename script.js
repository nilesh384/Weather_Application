// script.js

const searchBar = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temp");
const description = document.querySelector(".description");
const humidity = document.querySelector(".humid-degree");
const windSpeed = document.querySelector(".windSpeed");
const temp_sup = document.querySelector(".temp-sup");
const humidity_icon = document.querySelector(".fa-droplet");
const wind_icon = document.querySelector(".fa-wind");

const API_KEY = "b167300729msh9af3142aab02a77p1dd36ejsna1722ffef940";
const API_HOST = "open-weather13.p.rapidapi.com";

async function fetchWeather(city) {
    const url = `https://open-weather13.p.rapidapi.com/city/${city}/EN`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "x-rapidapi-host": API_HOST,
                "x-rapidapi-key": API_KEY
            }
        });

        if (!response.ok) {
            throw new Error('City not found or API request failed');
        }

        const data = await response.json();
        const weather = data.weather[0];
        const main = data.main;
        const wind = data.wind;

        temperature.innerHTML = `${Math.floor((main.temp-32)*.56)}`;
        description.innerHTML = `${weather.description}`;
        humidity.innerHTML = `${main.humidity}%`;
        windSpeed.innerHTML = `${wind.speed} m/s`;
        temp_sup.classList.remove('hidden');

        // Set weather icon based on the icon code returned by the API
        weatherIcon.src = `http://openweathermap.org/img/wn/${weather.icon}.png`;
        weatherIcon.alt = weather.description;

    } catch (error) {
        console.error(error);
        temperature.innerHTML = 'Error';
        description.innerHTML = 'Unable to fetch weather data';
        humidity.innerHTML = '';
        windSpeed.innerHTML = '';
        weatherIcon.src = ''
        temp_sup.innerHTML = ''
        humidity_icon.classList.add('hidden');
        wind_icon.classList.add('hidden');

    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBar.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please enter a city name');
    }
});

searchBar.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        const city = searchBar.value.trim();
        if (city) {
            fetchWeather(city);
        } else {
            alert('Please enter a city name');
        }
    }
})
