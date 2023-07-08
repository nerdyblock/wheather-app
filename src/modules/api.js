import moment from "moment";

let latLongUrl = `https://api.openweathermap.org/geo/1.0/direct?q=Delhi&limit=1&appid=${process.env.API_KEY}`;

export function setLatLongUrl(city) {
  latLongUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.API_KEY}`;
}

export async function getLatLong() {
  const response = await fetch(latLongUrl);
  const data = await response.json();

  // if (!data.length) {
  //   data = JSON.parse(sessionStorage.getItem("city"));
  // } else {
  //   sessionStorage.setItem("city", JSON.stringify(data));
  // }

  return data;
}

export async function getWeekWheather() {
  const value = await getLatLong();

  const weekWheatherurl = `https://api.openweathermap.org/data/2.5/forecast?lat=${value[0].lat}&lon=${value[0].lon}&appid=${process.env.API_KEY}&units=metric`;

  const response = await fetch(weekWheatherurl);
  const data = await response.json();

  return data;
}

export async function currentWeather() {
  const value = await getLatLong();
  sessionStorage.setItem("city", JSON.stringify(value));

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${value[0].lat}&lon=${value[0].lon}&appid=019a9b26ae74668f975f0960e4fdc9ee&units=metric`;

  const response = await fetch(url);
  const data = await response.json();

  return data;
}

function getWheatherStatus(weatherStatus) {
  let max = 0;
  let status;

  Object.keys(weatherStatus).forEach((key) => {
    if (max < weatherStatus[key]) {
      status = key;
      max = weatherStatus[key];
    }
  });

  return status;
}

function getAvgWeather(data) {
  let sum = 0;
  data.forEach((item) => {
    sum += item;
  });
  return (sum / data.length).toFixed(2);
}

export async function getDailyWeather() {
  const data = await getWeekWheather();
  const hourlyWeather = await data.list;
  const today = moment(new Date()).format("YYYY-MM-DD");

  let resetMinMax = true;
  let prevDate = today;
  let minTemp;
  let maxTemp;
  const dailyWheather = [];
  let humidity = [];
  let wind = [];
  let hourTemp = [];
  let weatherStatus = {};

  hourlyWeather.forEach((item, index) => {
    if (resetMinMax) {
      minTemp = Number.MAX_VALUE;
      maxTemp = Number.MIN_VALUE;
    }

    if (
      prevDate.split(" ")[0] !== item.dt_txt.split(" ")[0] ||
      index === hourlyWeather.length - 1
    ) {
      dailyWheather.push({
        main: {
          humidity: getAvgWeather(humidity),
          temp: getAvgWeather(hourTemp),
          maxTemp,
          minTemp,
        },
        wind: {
          speed: getAvgWeather(wind),
        },
        weather: [{ main: getWheatherStatus(weatherStatus) }],
        date: prevDate,
        hourlyTemp: hourTemp,
      });

      humidity = [];
      wind = [];
      hourTemp = [];
      weatherStatus = {};
    } else {
      resetMinMax = false;
    }

    if (weatherStatus[item.weather[0].main]) {
      weatherStatus[item.weather[0].main] += 1;
    } else {
      weatherStatus[item.weather[0].main] = 1;
    }

    humidity.push(item.main.humidity);
    wind.push(item.wind.speed);
    hourTemp.push(item.main.temp);
    minTemp = Math.min(minTemp, item.main.temp_min);
    maxTemp = Math.max(maxTemp, item.main.temp_max);
    prevDate = item.dt_txt;
  });

  sessionStorage.setItem("daily-weather", JSON.stringify(dailyWheather));
  return dailyWheather;
}
