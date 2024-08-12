const apiKey = "b4e1d7c8410da3f38eca303fef1321d6";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");
const weatherContainer = document.querySelector(".weather");
const weatherIcon = document.querySelector(".weather__image i");
const errorContainer = document.querySelector(".error");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (response.status === 404) {
    errorContainer.style.display = "block";
    weatherContainer.style.display = "none";
  }
  const data = await response.json();

  document.querySelector(".temp").innerHTML =
    Math.round(data.main.temp) + "&#8451";
  document.querySelector(".city").textContent = data.name;
  document.querySelector(".humidity").textContent = data.main.humidity + "%";
  document.querySelector(".wind").textContent = data.wind.speed + " km/h";

  switch (data.weather[0].main) {
    case "Clear":
      weatherIcon.className = "fa-solid fa-sun";
      break;
    case "Rain":
      weatherIcon.className = "fa-solid fa-cloud-rain";
      break;
    case "Mist":
      weatherIcon.className = "fa-solid fa-cloud-mist";
      break;
    case "Drizzle":
      weatherIcon.className = "fa-solid fa-cloud-drizzle";
      break;

    default:
      weatherIcon.className = "fa-solid fa-cloud";
  }

  weatherContainer.style.display = "block";
  errorContainer.style.display = "none";
}

searchButton.addEventListener("click", () => {
  setSearchCity();
});

searchInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    setSearchCity();
  }
});

function setSearchCity() {
  checkWeather(searchInput.value);
  searchInput.value = "";
}
