import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        🌍 <span>Travel Buddy</span>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/">Explore</Link>
        </li>

        <li>
          <Link to="/favorites">❤️ Favorites</Link>
        </li>

        <li>
  <Link to="/my-trips">
    🧳 My Trips
  </Link>
</li>

      </ul>
    </nav>
  );
}

export default Navbar;