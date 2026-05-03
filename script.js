// Clock & greeting
function updateTime() {
    const now = new Date();
    const h = now.getHours();

    const greeting = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
    document.getElementById('greeting').textContent = `${greeting}, Martin`;

    document.getElementById('clock').textContent =
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    document.getElementById('date').textContent =
        now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
}
setInterval(updateTime, 1000);
updateTime();

// Weather
const weatherCodes = {
    113: '☀️', 116: '⛅', 119: '☁️', 122: '☁️',
    143: '🌫️', 176: '🌦️', 179: '🌨️', 182: '🌧️',
    185: '🌧️', 200: '⛈️', 227: '🌨️', 230: '❄️',
    248: '🌫️', 260: '🌫️', 263: '🌦️', 266: '🌧️',
    281: '🌧️', 284: '🌧️', 293: '🌦️', 296: '🌧️',
    299: '🌧️', 302: '🌧️', 305: '🌧️', 308: '🌧️',
    311: '🌧️', 314: '🌧️', 317: '🌨️', 320: '🌨️',
    323: '🌨️', 326: '🌨️', 329: '❄️', 332: '❄️',
    335: '❄️', 338: '❄️', 350: '🌧️', 353: '🌦️',
    356: '🌧️', 359: '🌧️', 362: '🌨️', 365: '🌨️',
    368: '🌨️', 371: '❄️', 374: '🌨️', 377: '🌨️',
    386: '⛈️', 389: '⛈️', 392: '⛈️', 395: '❄️',
};

async function fetchWeather() {
    try {
        const res = await fetch('https://wttr.in/Edinburgh?format=j1');
        const data = await res.json();
        const c = data.current_condition[0];
        const area = data.nearest_area[0];

        const city = area.areaName[0].value;
        const tempC = c.temp_C;
        const feelsC = c.FeelsLikeC;
        const humidity = c.humidity;
        const desc = c.weatherDesc[0].value;
        const code = parseInt(c.weatherCode);
        const icon = weatherCodes[code] || '🌡️';

        document.getElementById('weather-icon').textContent = icon;
        document.getElementById('weather-temp').textContent = `${tempC}°C`;
        document.getElementById('weather-desc').textContent = desc;
        document.getElementById('weather-meta').textContent =
            `${city}  ·  Feels like ${feelsC}°  ·  ${humidity}% humidity`;
    } catch {
        document.getElementById('weather-desc').textContent = 'Weather unavailable';
    }
}
fetchWeather();

// Daily background via Lorem Picsum
function fetchDailyBackground() {
    const seed = new Date().toDateString().replace(/\s/g, '-');
    const url = `https://picsum.photos/seed/${seed}/1920/1080`;
    document.body.style.backgroundImage = `url(${url})`;
}
fetchDailyBackground();
