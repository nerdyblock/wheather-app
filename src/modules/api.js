const latLongUrl = `http://api.openweathermap.org/geo/1.0/direct?q=Delhi&limit=1&appid=019a9b26ae74668f975f0960e4fdc9ee`;

// temp every 3 hours -- total 40 entries
// const weekWheatherurl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=019a9b26ae74668f975f0960e4fdc9ee&units=metric`;

function getDailyWhether(hourlyData) {
  const hourlyTemp = [];
  const dailyTemp = [];
  for (let i = 0; i < 40; i++) {
    hourlyTemp.push(hourlyData[i].main.temp);
  }

  for (let i = 0; i < 5; i++) {
    const minDayTemp = Math.min(...hourlyTemp.slice(8 * i, 8 * i + 8));
    const maxDayTemp = Math.max(...hourlyTemp.slice(8 * i, 8 * i + 8));
    dailyTemp.push({ minDayTemp, maxDayTemp });
  }
  console.log(hourlyTemp);
  console.log(dailyTemp);
}

// async function getWeekWheather() {
//   const response = await fetch(weekWheatherurl);
//   const data = await response.json();

//   getDailyWhether(data.list);
//   // console.log(data.list);
//   console.log(data);
// }

async function getLatLong() {
  const response = await fetch(latLongUrl);
  const data = await response.json();
  const lattitude = data[0].lat;
  const longitude = data[0].lon;
  return { lattitude, longitude };
//   console.log({ lattitude, longitude });
}

export default async function randomFunction() {
  const value = await getLatLong();

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${value.lattitude}&lon=${value.longitude}&appid=019a9b26ae74668f975f0960e4fdc9ee&units=metric`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

// randomFunction();
// getLatLong();
// getWeekWheather();

navigator.geolocation.getCurrentPosition((position) => console.log(position));
