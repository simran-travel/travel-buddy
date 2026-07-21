import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import destinations from "../data/destinations";
import Map from "../components/Map";
import WeatherCard from "../components/WeatherCard";

function DestinationDetails() {
  const { slug } = useParams();

  const destination = destinations.find(
    (place) => place.slug === slug
  );

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch(
  `https://api.open-meteo.com/v1/forecast?latitude=${destination.latitude}&longitude=${destination.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=sunrise,sunset&timezone=auto`
);

        const data = await response.json();
        setWeather({
  ...data.current,
  sunrise: data.daily.sunrise[0],
  sunset: data.daily.sunset[0],
  time: data.current.time
});
      } catch (error) {
        console.error("Weather Error:", error);
      } finally {
        setLoading(false);
      }
    }

    if (destination) {
      fetchWeather();
    }
  }, [destination]);

  if (!destination) {
    return <h2>Destination not found 😔</h2>;
  }

  return (
    <div className="details-page">
      <img
        src={destination.image}
        alt={destination.name}
        className="details-image"
      />

      <div className="title-section">
        <span className="destination-emoji">{destination.emoji}</span>
        <h1>{destination.name}</h1>
      </div>

      <p><strong>⭐ Rating:</strong> {destination.rating}</p>

      <p><strong>💰 Budget:</strong> {destination.budget}</p>

      <p><strong>🌸 Best Season:</strong> {destination.bestSeason}</p>

      <p><strong>🍜 Famous Food:</strong> {destination.food}</p>

      <p><strong>💴 Currency:</strong> {destination.currency}</p>

      <p><strong>🗣️ Language:</strong> {destination.language}</p>

      <p><strong>🗺️ Top Attraction:</strong> {destination.attraction}</p>

      <hr />
<h3>📍 Location Map</h3>

<Map
  latitude={destination.latitude}
  longitude={destination.longitude}
  name={destination.name}
/>

<hr />

      {loading ? (
  <p>Loading weather...</p>
) : weather ? (
  <WeatherCard weather={weather} />
) : (
  <p>Weather data unavailable.</p>
)}

      <Link to="/">
        <button>⬅ Back to Home</button>
      </Link>
    </div>
  );
}

export default DestinationDetails;