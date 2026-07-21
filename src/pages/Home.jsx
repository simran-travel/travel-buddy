import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import DestinationCard from "../components/DestinationCard";
import destinations from "../data/destinations";
import "../App.css";

function Home() {
  const [search, setSearch] = useState("");

  const filteredDestinations = destinations.filter((place) =>
    place.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
  <div className="app">
    <Navbar />
    <Hero />

    <section className="destinations">
      <h1>🌎 Popular Destinations</h1>

      <input
        type="text"
        placeholder="Search your dream destination 🔍"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />

      <div className="card-container">
        {filteredDestinations.length > 0 ? (
          filteredDestinations.map((place, index) => (
            <DestinationCard
              key={place.id}
              emoji={place.emoji}
              slug={place.slug}
              image={place.image}
              name={place.name}
              description={place.description}
              budget={place.budget}
              rating={place.rating}
              bestSeason={place.bestSeason}
              food={place.food}
              currency={place.currency}
              language={place.language}
              attraction={place.attraction}
            />
          ))
        ) : (
          <h2>No destinations found 😔</h2>
        )}
      </div>
    </section>
  </div>
);
}
export default Home;