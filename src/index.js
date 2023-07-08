import moment from "moment";
import { getDailyWeather, setLatLongUrl } from "./modules/api";
import uiShowCurrentTemperature, {
  hideError,
  renderCurrentWeather,
  uiDailyWeather,
} from "./modules/dom";
import "./styles/style.css";

const searchCity = document.getElementById("search");
const todayTempCard = document.querySelector('[data-key="0"]');

hideError();

function activeClass(tempCard) {
  tempCard.classList.add("active");
}

function showSearchedCity() {
  setLatLongUrl(searchCity.value);
  searchCity.value = "";
  activeClass(todayTempCard);
  uiShowCurrentTemperature();
  uiDailyWeather();
}

searchCity.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    showSearchedCity();
  }
});

document
  .getElementById("search-button")
  .addEventListener("click", showSearchedCity);

window.addEventListener("DOMContentLoaded", () => {
  activeClass(todayTempCard);
  uiShowCurrentTemperature();
  uiDailyWeather();
});

function removeActiveClass() {
  document.querySelectorAll(".daily-temp-card").forEach((item) => {
    item.classList.remove("active");
  });
}

// if tab is open for whole day and not refreshed
function refreshSessionStorage() {
  const getDailyWeatherFromStorage = JSON.parse(
    sessionStorage.getItem("daily-weather")
  );

  const sessionStorageCurrentDate = moment(
    getDailyWeatherFromStorage[0].date
  ).format("DD-MM-YYYY");

  const currentDate = moment(new Date()).format("DD-MM-YYYY");

  if (sessionStorageCurrentDate !== currentDate) {
    getDailyWeather();
  }
}

document
  .querySelector(".daily-temp-container")
  .addEventListener("click", (e) => {
    refreshSessionStorage();
    const dailyTempInfo = JSON.parse(sessionStorage.getItem("daily-weather"));
    const cityName = JSON.parse(sessionStorage.getItem("city"));
    const tempCard = e.target.closest("[data-key]");
    if (tempCard) {
      const index = tempCard.dataset.key;
      removeActiveClass();
      activeClass(tempCard);

      if (index === 0) {
        uiShowCurrentTemperature();
      } else {
        renderCurrentWeather(dailyTempInfo[index], cityName);
      }
    }
  });
