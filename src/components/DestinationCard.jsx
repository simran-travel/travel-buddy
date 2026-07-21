import { useState } from "react";
import { Link } from "react-router-dom";

function DestinationCard(props) {
  const [showDetails, setShowDetails] = useState(false);
    return (
    <div className="card">
        <img
  src={props.image}
  alt={props.name}
  className="destination-image"
/>

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
{showDetails && (
  <div className="details">
    <p>🌸 <strong>Best Season:</strong> {props.bestSeason}</p>
    <p>🍜 <strong>Food:</strong> {props.food}</p>
    <p>💴 <strong>Currency:</strong> {props.currency}</p>
    <p>🗣️ <strong>Language:</strong> {props.language}</p>
    <p>🗺️ <strong>Top Attraction:</strong> {props.attraction}</p>
  </div>
)}

    </div>
  );
}

export default DestinationCard;