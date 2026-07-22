import DestinationCard from "../components/DestinationCard";
import destinations from "../data/destinations";

function Favorites() {

  const favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

  const favoriteDestinations = destinations.filter((place) =>
    favorites.includes(place.slug)
  );

  return (
    <div className="destinations">
      <h1>❤️ My Favorite Destinations</h1>

      {favoriteDestinations.length === 0 ? (
        <h2>No favorites added yet.</h2>
      ) : (
        <div className="card-container">
          {favoriteDestinations.map((place) => (
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
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;