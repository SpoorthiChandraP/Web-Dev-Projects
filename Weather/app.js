function getWeather() {
    const apiKey = 'YOU_API_KEY'; // Replace with your actual API key
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

    const cityInput = document.getElementById('city-input');
    const city = cityInput.value;

    if (city === '') {
        alert('Please enter a city');
        return;
    }

    const url = `${apiUrl}?q=${city}&appid=${apiKey}`;
    console.log('Fetching data from URL:', url);

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Weather data:', data);
            displayWeatherData(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
}

function displayWeatherData(data) {
    const weatherDataContainer = document.getElementById('weather-data');
    const temperature = Math.round(data.main.temp - 273.15); // Convert from Kelvin to Celsius

    const weatherHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>${data.weather[0].description}</p>
        <p>Temperature: ${temperature}°C</p>
    `;

    weatherDataContainer.innerHTML = weatherHTML;
}
