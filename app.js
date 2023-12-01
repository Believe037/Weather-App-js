

const apiKey = "e6d53e030521dda7db93436424c8f567";

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city){
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if(response.status === 404){
    document.querySelector('.error').style.display = "block";
    setTimeout(()=>{
      document.querySelector('.error').style.display = "none";
      
    }, 5000)
    document.querySelector('.weather').style.display = "none";
  } else {

    var data = await response.json();
    const d = new Date(data.dt * 1000);
    const timeNow = d.toLocaleTimeString();
    document.querySelector(".current-time").innerHTML = timeNow;


  document.querySelector('.city').innerHTML = data.name;
  document.querySelector('.temp').innerHTML = Math.round(data.main.temp)+`°c`;
  document.querySelector('.humidity').innerHTML = data.main.humidity+`%`;
  document.querySelector('.wind').innerHTML = data.wind.speed+` km/hr`;
  const weatherCondition = document.querySelector('.weather-condition')
  weatherCondition.innerHTML = data.weather[0].main;

  if(data.weather[0].main === "Clouds"){
    weatherIcon.src = "./images/clouds.png";
  } else if(data.weather[0].main === "Clear"){
    weatherIcon.src = "./images/clear.png";
  } else if(data.weather[0].main === "Rain"){
    weatherIcon.src = "./images/rain.png";
  } else if(data.weather[0].main === "Drizzle"){
    weatherIcon.src = "./images/drizzle.png";
  } else {
    weatherIcon.src = "./images/mist.png"
  }

  document.querySelector('.weather').style.display = "block";

  }

  searchBox.value = "";
}


searchBtn.addEventListener('click', (e)=>{

  let cityName = searchBox.value
  checkWeather(cityName);

  e.preventDefault()
})

document.addEventListener('keypress', function(event){
  if(event.key === "Enter"){
    let cityName = searchBox.value
    checkWeather(cityName);
  }
})










