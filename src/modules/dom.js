import moment from "moment";
import { getDailyWeather } from "./api";
import clearDay from "../assets/day-sunny.svg";
import haze from "../assets/haze.svg";
import cloudy from "../assets/cloudy.svg";
import rain from "../assets/rain.svg";
import showers from "../assets/showers.svg";
import snow from "../assets/snowflake-cold.svg";
import thunderstorm from "../assets/thunderstorm.svg";
import dayRain from "../assets/day-rain.svg";

// const today = new Date();
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

// const getDay = {
//   0: "Sun",
//   1: "Mon",
//   2: "Tue",
//   3: "Wed",
//   4: "Thu",
//   5: "Fri",
//   6: "Sat",
// };

export default function uiShowCurrentTemperature(currentTemp) {
  const currentTempDisplay = document.getElementById("current-temp");
  let currentDate = currentTemp.date;
  const humidityDisplay = document.querySelector(".humidity");
  const windSpeedDisplay = document.querySelector(".wind");
  const currentWeatherIcon = document.querySelector(".current-weather-icon");
  const date = document.querySelector(".date");
  const day = document.querySelector(".day");
  const status = document.querySelector(".weather-status");
  let weatherStatus = currentTemp.weather[0].main;

  if (!weatherIcon[weatherStatus]) {
    weatherStatus = "Haze";
  }

  if (!currentDate) {
    currentDate = new Date();
  }

  date.textContent = moment(currentDate).format("DD-MM-YYYY");
  // const dateFormat = moment(today).format("MM-DD-YYYY");
  day.textContent = moment(currentDate).format("dddd").slice(0, 3);
  status.textContent = currentTemp.weather[0].main;
  currentWeatherIcon.src = weatherIcon[weatherStatus];
  windSpeedDisplay.textContent = currentTemp.wind.speed;
  humidityDisplay.textContent = currentTemp.main.humidity;
  currentTempDisplay.textContent = currentTemp.main.temp;
}

export async function uiDailyWeather() {
  const dailyWeather = await getDailyWeather();
  dailyWeather.forEach((item, index) => {
    const day = document.querySelector(`.day${index + 1}`);
    const maxTemp = document.querySelector(`.max-temp${index + 1}`);
    const minTemp = document.querySelector(`.min-temp${index + 1}`);
    const dailyWeatherIcon = document.querySelector(`
    .weather-icon${index + 1}`);
    let weatherStatus = item.weather;

    if (!weatherIcon[weatherStatus]) {
      weatherStatus = "Haze";
    }

    dailyWeatherIcon.src = weatherIcon[weatherStatus];
    // const dateFormat = moment(item.date).format("MM-DD-YYYY");
    // day.textContent = getDay[new Date(dateFormat).getDay()];
    day.textContent = moment(item.date).format("dddd").slice(0, 3);
    maxTemp.textContent = item.maxTemp;
    minTemp.textContent = item.minTemp;
  });
}
