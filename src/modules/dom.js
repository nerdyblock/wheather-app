export default function uiShowCurrentTemperature(value) {
  const currentTempDisplay = document.getElementById("current-temp");
  currentTempDisplay.textContent = value;
}
