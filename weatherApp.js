const key = "0a7ded8a2db1b42ce85e09262760b415";

const getWeather = async (city) => {
    try {
        let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}`,
        {mode: 'cors'});
        let weatherData = await response.json();
        
        const data = {
            'city': weatherData.name,
            'country': weatherData.sys.country,
            'temp': weatherData.main.temp,
            'icon': weatherData.weather[0].icon,
            'windSpeed': weatherData.wind.speed,
            'pressure': weatherData.main.pressure,
            'status': weatherData.weather[0].main,
            'description': weatherData.weather[0].description}
            return (data)
        } catch (err){
        console.log(`WUPS ${err}`)
    }
}

const kelvToCels = (temp) => {
    return Math.round((temp-273.15))
}

const createWeatherDOM = async (city) => {
    
    const list = document.querySelector(".ajax-section .cities")
    
    const weather = await getWeather(city);
    const icon = `https://openweathermap.org/img/wn/${
    weather.icon}@2x.png`;
    
    const li = document.createElement("li");
    li.classList.add("city");
    const markup = `
    <h2 class="city-name" data-name="${weather.city},${weather.country}">
        <span>${weather.city}</span>
        <sup>${weather.country}</sup>
    <div>Wind ${weather.windSpeed} km/h Pressure ${weather.pressure/10} kPa</div>
    </h2>
    <div class="city-temp">${kelvToCels(weather.temp)}<sup>°C</sup>
    </div>
    <figure>
        <img class="city-icon" src=${icon} alt=${weather.icon}>
        <figcaption>${weather.description}</figcaption>
    </figure>
    `;
    li.innerHTML = markup;
    list.appendChild(li);
    
}

const form = document.querySelector('.top-banner form')
form.addEventListener('submit',e => {
    e.preventDefault()
    const input = document.querySelector(".top-banner input");
    const msg = document.querySelector(".top-banner .msg");
    const city = input.value
    createWeatherDOM(city)
    msg.textContent = "";
    form.reset();
    input.focus();
})
