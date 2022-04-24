const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
//const locationEl = document.getElementById('location');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

const button = document.getElementById("btn");

button.addEventListener("click",()=>{
    const searchElement = document.getElementById("city_input").value;
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchElement}&limit=5&appid=22bfdce89a6b55d193e506d6827ae2c4`)
    .then(response => response.json()).then(data =>   
   show_data(data)
   )
})
//let loc

function show_data(data){
    console.log(data)
  
   let lt=data[0].lat  
   let ln=data[0].lon   
   //loc=data[0].name;

   fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lt}&lon=${ln}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
    })   

}


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY ='9f99fc729185f035ac6d2deda66bd983';


setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);

getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;
        
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        })

    })
}

function showWeatherData (data){
    let {humidity, pressure, sunrise, sunset, wind_speed,clouds} = data.current;

    timezone.innerHTML = data.timezone;
    //locationEl.innerHTML= loc;
    countryEl.innerHTML = data.lat + 'N ' + data.lon+'E'

    currentWeatherItemsEl.innerHTML = 
    `
    <p>CURRENT WEATHER<br></p>
    <div class="weather-item">
        <div>Humidity</div>
        <div>${humidity} %</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure} hPa</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed} m/s</div>
    </div>
    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
    </div>
    
    
    
    `;

    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        /* if(idx == 0){
            currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }else{ */
            otherDayForcast += `
            <div class="weather-forecast-item">
            <img src="https://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            
            <div class="other">
                <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
                <div class="temp">${day.weather[0].description}</div>
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            </div>
            
            `
        //}
    })


    weatherForecastEl.innerHTML = otherDayForcast;
}

const toggleButton = document.getElementById('togglebtn')
const navbarLinks = document.getElementById('nlink')

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
  console.log('toggle')
})



