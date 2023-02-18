import moment from "moment";
import { currentWeather, getDailyWeather, getLatLong } from "./api";
import clearDay from "../assets/day-sunny.svg";
import haze from "../assets/haze.svg";
import cloudy from "../assets/cloudy.svg";
import rain from "../assets/rain.svg";
import showers from "../assets/showers.svg";
import snow from "../assets/snowflake-cold.svg";
import thunderstorm from "../assets/thunderstorm.svg";
import dayRain from "../assets/day-rain.svg";
import searchImg from "../assets/search.svg";

document.getElementById("search-button").querySelector("img").src = searchImg;

const weatherIcon = {
  Clear: clearDay,
  Haze: haze,
  Rain: rain,
  Thunderstorm: thunderstorm,
  Clouds: cloudy,
  Drizzle: showers,
  Snow: snow,
  dayRain: dayRain,
};

export function renderCurrentWeather(currentTemp, cityName) {
  const currentTempDisplay = document.getElementById("current-temp");
  let currentDate = currentTemp.date;
  const humidityDisplay = document.querySelector(".humidity");
  const windSpeedDisplay = document.querySelector(".wind");
  const currentWeatherIcon = document.querySelector(".current-weather-icon");
  const city = document.querySelector(".city");
  const day = document.querySelector(".current-day");
  const status = document.querySelector(".weather-status");
  let weatherStatus = currentTemp.weather[0].main;

  if (!weatherIcon[weatherStatus]) {
    weatherStatus = "Haze";
  }

  if (!currentDate) {
    currentDate = new Date();
  }

  city.textContent = cityName[0].name;
  day.textContent = moment(currentDate).format("dddd");
  status.textContent = currentTemp.weather[0].main;
  currentWeatherIcon.src = weatherIcon[weatherStatus];
  windSpeedDisplay.textContent = `${currentTemp.wind.speed}km/h`;
  humidityDisplay.textContent = `${currentTemp.main.humidity}%`;
  currentTempDisplay.textContent = currentTemp.main.temp;
}

function renderDailyWeather(dailyWeather) {
  dailyWeather.forEach((item, index) => {
    const day = document.querySelector(`#day${index + 1}`);
    const maxTemp = document.querySelector(`#max-temp${index + 1}`);
    const minTemp = document.querySelector(`#min-temp${index + 1}`);
    const dailyWeatherIcon = document.querySelector(`
    #weather-icon${index + 1}`);
    let weatherStatus = item.weather[0].main;

    if (!weatherIcon[weatherStatus]) {
      weatherStatus = "Haze";
    }

    dailyWeatherIcon.src = weatherIcon[weatherStatus];
    day.textContent = moment(item.date).format("dddd").slice(0, 3);
    maxTemp.textContent = item.main.maxTemp;
    minTemp.textContent = item.main.minTemp;
  });
}

export function showError() {
  const errorDiv = document.getElementById("error");
  errorDiv.style.visibility = "visible";
}

export function hideError() {
  const errorDiv = document.getElementById("error");
  errorDiv.style.visibility = "hidden";
}

export default async function uiShowCurrentTemperature() {
  try {
    const currentTemp = await currentWeather();
    const cityName = await getLatLong();
    renderCurrentWeather(currentTemp, cityName);
    document.querySelector("body").style.visibility = "visible";
  } catch (err) {
    showError();
  }
}

export async function uiDailyWeather() {
  try {
    const dailyWeather = await getDailyWeather();
    renderDailyWeather(dailyWeather);
  } catch (err) {
    showError();
  }
}
