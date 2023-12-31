const API_KEY = "1985ef3424b24cc60063758e5ba6bca3";

function onGeoOk(position) {
  const weatherContainer = document.querySelector("#weather");
  weatherContainer.classList.remove("hidden");
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then(response => {
      if(!response.ok) {
        const status = `${response.status}(${response.statusText})`;
        alert(`ERROR: ${status}`);
        throw new Error(`ERROR: ${status}`);
      }
      return response.json()
    })
    .then(data => {
      const weather = weatherContainer.querySelector("span:nth-child(2)");
      const city = weatherContainer.querySelector("span:nth-child(3)");
      const icon = weatherContainer.querySelector("img");
      weatherContainer.title = `${data.weather[0].main}(${data.weather[0].description})`;
      weather.innerText = `${Math.round(data.main.temp)} °C`;
      city.innerText = ` / ${data.name}(${data.sys.country})`;
      icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      icon.alt = `${data.weather[0].main}(${data.weather[0].description})`;
    })
    .catch(error => {
      weatherContainer.classList.add("hidden");
      console.error(error)
    });
}

function onGeoError(error) {
  alert(`Can't find you. No weather for you.(ERROR(${error.code}): ${error.message})`);
  console.error(error);
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);