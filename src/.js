/** @format */

let now = new Date();

let hours = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];

let ispis = document.querySelector("small");
ispis.innerHTML = `${day}, ${hours}:${minutes}`;

/////////////////////////////  Kada upisem u search grad, taj isti grad se pojavi u h1 tj dijelu gdje treba pisat grad

function displayWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#stupnjevi").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#press").innerHTML = `${Math.round(
    response.data.main.pressure
  )} hPa`;

  document.querySelector(
    "#humi"
  ).innerHTML = `${response.data.main.humidity} %`;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#windd").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
}

function entercity(city) {
  let apiKey = "edcf4fc59c059b96ad50120b120b3c02";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  entercity(city);
}

function searchLocation(position) {
  let apiKey = "edcf4fc59c059b96ad50120b120b3c02";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-temp-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

entercity("Rijeka");
