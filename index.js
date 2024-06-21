function updateDate(){
    let today = new Date();
    let date = document.querySelector('#date');
    let formattedDate = today.toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' });
    date.innerHTML = formattedDate;
}

function updateWeather(response){
    let temperature = document.querySelector('#temperature');
    console.log(response);
    temperature.innerHTML = Math.round(response.data.temperature.current) + "°C";
    let city = document.querySelector('#city');
    city.innerHTML = response.data.city;
    let description = document.querySelector('#description');
    description.innerHTML = "Expect " + response.data.condition.description;
    let humidity = document.querySelector('#humidity');
    humidity.innerHTML = response.data.temperature.humidity + "%";
    let wind = document.querySelector('#wind');
    wind.innerHTML = response.data.wind.speed + "km/h"
    let icon = document.querySelector("#icon_url");
    icon.src = response.data.condition.icon_url;
    updateDate();
}
function searchCity(city){
    let apiKey = 'a6t3e024559eaa3385b451317o9c7f98';
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateWeather);
}

function handleSearch(event){
    event.preventDefault();
    let searchInput = document.getElementById('search-input');
    let searchValue = searchInput.value;
    searchCity(searchValue);
    getForecast(searchValue);
}

function displayForecast(response) {
    let forecastElem = document.querySelector('#forecast');
    let forecastHTML = '<div class="row">';
    response.data.daily.forEach(function(day, index) {
        if (index < 5) {
            forecastHTML += `
                <div class="col">
                    <div class="weather-forecast-date">${new Date(day.time * 1000).toLocaleDateString('en-GB', { weekday: 'short' })}</div>
                    <img src="${day.condition.icon_url}" alt="weather icon" class='weather-forecast-img'>
                    <div class="weather-forecast-temp d-flex justify-content-between">
                        <span class="weather-forecast-temp-max"> ${Math.round(day.temperature.maximum)}° </span>
                        <span class="weather-forecast-temp-min">${Math.round(day.temperature.minimum)}°</span>
                    </div>
                </div>
            `;
        }
    });
    forecastHTML += '</div>';
    forecastElem.innerHTML = forecastHTML;
}

function getForecast(city){
    let apiKey = 'a6t3e024559eaa3385b451317o9c7f98';
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener('submit', handleSearch);
searchCity("ilorin");
getForecast("ilorin");