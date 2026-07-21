function formatTime(time) {
  const date = new Date(time);

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function WeatherCard({ weather }) {
  return (
    <div className="weather-card">

      <h3>🌤️ Live Weather</h3>

      <div className="weather-info">

        <div>
          <span>🌡️</span>
          <p>{weather.temperature_2m}°C</p>
          <small>Temperature</small>
        </div>

        <div>
          <span>💧</span>
          <p>{weather.relative_humidity_2m}%</p>
          <small>Humidity</small>
        </div>

        <div>
          <span>💨</span>
          <p>{weather.wind_speed_10m}</p>
          <small>Wind km/h</small>
        </div>

      </div>


      <div className="sun-info">

        <div>
          🌅
          <p>{formatTime(weather.sunrise)}</p>
          <small>Sunrise</small>
        </div>

        <div>
          🌇
          <p>{formatTime(weather.sunset)}</p>
          <small>Sunset</small>
        </div>

      </div>


      <div className="local-time">
        🕒
        <p>{formatTime(weather.time)}</p>
        <small>Local Time</small>
      </div>


    </div>
  );
}

export default WeatherCard;