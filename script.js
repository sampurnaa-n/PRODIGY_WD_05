const apiKey = 'd0918761e3423cbfe71ba9c4af55dd2e'; 

// Fetch weather data based on city name input
document.getElementById('getWeather').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    if (city) {
        fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    } else {
        document.getElementById('weatherDisplay').innerHTML = '<p style="color: red;">Please enter a city name or use your location.</p>';
    }
});

// Fetch weather data based on user's current location
document.getElementById('getLocationWeather').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
            },
            error => {
                document.getElementById('weatherDisplay').innerHTML = '<p style="color: red;">Unable to retrieve your location.</p>';
            }
        );
    } else {
        document.getElementById('weatherDisplay').innerHTML = '<p style="color: red;">Geolocation is not supported by your browser.</p>';
    }
});

// Fetch weather data from API and display it
function fetchWeatherData(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found or unable to fetch data');
            }
            return response.json();
        })
        .then(data => {
            const weatherDisplay = document.getElementById('weatherDisplay');
            const weatherInfo = `
                <h2>Weather in ${data.name}</h2>
                <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
                <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
            `;
            weatherDisplay.innerHTML = weatherInfo;
        })
        .catch(error => {
            document.getElementById('weatherDisplay').innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        });
}
