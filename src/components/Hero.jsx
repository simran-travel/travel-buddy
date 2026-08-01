import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="hero-section">
      <h1>✈️ Plan Your Dream Journey</h1>

      <h2>Your next adventure starts here.</h2>

      <p>
        Discover places, plan trips, manage budgets,
        and create unforgettable memories.
      </p>

      <button onClick={() => navigate("/add-trip")}>
        Start Planning 🌍
      </button>
    </div>
  );
}

export default Hero;