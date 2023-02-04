import { getDailyWeather } from "./api";

export default function uiShowCurrentTemperature(currentTemp) {
  const currentTempDisplay = document.getElementById("current-temp");
  const humidityDisplay = document.querySelector(".humidity");
  const windSpeedDisplay = document.querySelector(".wind");
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

    day.textContent = item.date;
    maxTemp.textContent = item.maxTemp;
    minTemp.textContent = item.minTemp;
  });
}
