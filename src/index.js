import { getDailyWeather, setLatLongUrl } from "./modules/api";
import uiShowCurrentTemperature, {
  renderCurrentWeather,
  uiDailyWeather,
} from "./modules/dom";
import "./styles/style.css";

const searchCity = document.getElementById("search");
document.querySelector("body").style.visibility = "hidden";

searchCity.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    setLatLongUrl(e.target.value);
    e.target.value = "";
    uiShowCurrentTemperature();
    uiDailyWeather();
    getDailyWeather();
  }
});

document.getElementById("search-button").addEventListener("click", () => {
  setLatLongUrl(searchCity.value);
  searchCity.value = "";
  uiShowCurrentTemperature();
  uiDailyWeather();
  getDailyWeather();
});

window.addEventListener("DOMContentLoaded", () => {
  uiShowCurrentTemperature();
  uiDailyWeather();
  getDailyWeather();
});

document
  .querySelector(".daily-temp-container")
  .addEventListener("click", (e) => {
    const dailyTempInfo = JSON.parse(sessionStorage.getItem("daily-weather"));
    const cityName = JSON.parse(sessionStorage.getItem("city"));
    const index = e.target.closest("[data-key]").dataset.key;

    if (index === 0) {
      uiShowCurrentTemperature();
    } else {
      renderCurrentWeather(dailyTempInfo[index], cityName);
    }
  });
