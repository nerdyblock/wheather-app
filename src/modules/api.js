import moment from "moment";

const latLongUrl = `http://api.openweathermap.org/geo/1.0/direct?q=Delhi&limit=1&appid=${process.env.API_KEY}`;

async function getLatLong() {
  const response = await fetch(latLongUrl);
  const data = await response.json();
  const lattitude = data[0].lat;
  const longitude = data[0].lon;
  return { lattitude, longitude };
}

export async function getWeekWheather() {
  const value = await getLatLong();

  const weekWheatherurl = `http://api.openweathermap.org/data/2.5/forecast?lat=${value.lattitude}&lon=${value.longitude}&appid=${process.env.API_KEY}&units=metric`;
  const response = await fetch(weekWheatherurl);
  const data = await response.json();
  console.log(data);
  return data;
}

export async function randomFunction() {
  const value = await getLatLong();

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${value.lattitude}&lon=${value.longitude}&appid=019a9b26ae74668f975f0960e4fdc9ee&units=metric`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
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
  const today = moment(new Date()).format("D-MM-YYYY");

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
    // if (index === 0) {
    //   resetMinMax = true;
    //   prevDate = today;
    // }

    if (resetMinMax) {
      minTemp = Number.MAX_VALUE;
      maxTemp = Number.MIN_VALUE;
    }

    // if (index === hourlyWeather.length - 1) {
    //   // console.log(hourlyWeather.slice(start));
    //   dailyWheather.push({
    //     date: prevDate,
    //     hourlyTemp: hourTemp,
    //     minTemp,
    //     maxTemp,
    //   });
    // }

    if (
      prevDate !== moment(item.dt_txt).format("D-MM-YYYY") ||
      index === hourlyWeather.length - 1
    ) {
      // console.log(weatherStatus);
      // getWheatherStatus(weatherStatus);
      dailyWheather.push({
        date: prevDate,
        hourlyTemp: hourTemp,
        temp: getAvgWeather(hourTemp),
        humidity: getAvgWeather(humidity),
        wind: getAvgWeather(wind),
        minTemp,
        maxTemp,
        weather: getWheatherStatus(weatherStatus),
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
    prevDate = moment(item.dt_txt).format("D-MM-YYYY");
  });

  console.log(dailyWheather);
  return dailyWheather;
}

// randomFunction();
// getLatLong();
// getWeekWheather();

// enable geolocation
// navigator.geolocation.getCurrentPosition((position) => console.log(position));
