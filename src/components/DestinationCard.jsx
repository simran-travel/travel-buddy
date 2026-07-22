import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function DestinationCard(props) {

  const [favorite, setFavorite] = useState(() => {
    const favorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    return favorites.includes(props.slug);
  });

  useEffect(() => {
    let favorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorite) {
      if (!favorites.includes(props.slug)) {
        favorites.push(props.slug);
      }
    } else {
      favorites = favorites.filter(
        (slug) => slug !== props.slug
      );
    }

    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorite, props.slug]);


    return (
    <div className="card">
        <img
  src={props.image}
  alt={props.name}
  className="destination-image"
/>
<button
  onClick={() => setFavorite(!favorite)}
  className="favorite-btn"
>
  {favorite ? "❤️" : "🤍"}
</button>

      <h2>{props.name}</h2>
      <p className="rating">
  ⭐ {props.rating}
</p>

      <p>{props.description}</p>

      <strong className="budget">
  {props.budget}
</strong>

      <Link to={`/destination/${props.slug}`}>
  <button>Explore</button>
</Link>

    </div>
  );
}

export default DestinationCard;