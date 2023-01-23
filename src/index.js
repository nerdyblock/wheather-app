import randomFunction from "./modules/api";
import uiShowCurrentTemperature from "./modules/dom";

async function displayCurrentTemp() {
  const currentTemp = await randomFunction();
  uiShowCurrentTemperature(currentTemp.main.temp);
}

displayCurrentTemp();
// Get current date
const date = new Date();

// Add five days to current date
// date.setDate(date.getDate() + 5);

// get day in form of number 0-6 sun-sat
console.log(date.getDay());
// get current date and day in Mon Jan 23 2023 18:22:25 GMT+0530 (India Standard Time) form
console.log(date);
