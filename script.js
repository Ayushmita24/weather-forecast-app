const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-body');


function refreshPageAfterDelay(delay) {
    setTimeout(function() {
        location.reload();
    }, delay);
}

//function enter-work(event){



async function checkWeather(city){
    const api_key = "ebeca6594724f885cdf024615f5ad78c";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    
    const weather_data = await fetch(`${url}`).then(response => response.json());
     
   
   if(weather_data.cod === `404`){
    location_not_found.style.display = "flex";
    weather_body.style.display = "none";
    console.log("error");
    refreshPageAfterDelay(2000);
    return;
   }  
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";

    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}km/H`;

    console.log(weather_data.weather[0].main);

    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "/assets/cloudy1.png";
            break;
        case 'Clear':
            weather_img.src = "/assets/sunny.jpg";
            break;
        case 'Rain':
            weather_img.src = "/assets/rainny1.jpg";
            break;
        case 'Mist':
            weather_img.src = "/assets/wiind.png";
            break;
        case 'Snow':
            weather_img.src = "/assets/snow.jpg";
            break;
        case 'Haze':
            weather_img.src = "/assets/haze.png";
        }
    
    console.log(weather_data)
}

searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
})

function handleKeyPress(event) {
    if (event.keyCode === 13) { // 13 is the keycode for "Enter" key
      // Call your function here
      checkWeather(inputBox.value);
    }
  }
  

