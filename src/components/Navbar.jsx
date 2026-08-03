import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="logo">
        🌍 <span>Travel Buddy</span>
      </div>

      <button
  className="menu-toggle"
  onClick={() => setMenuOpen(!menuOpen)}
>
  ☰
</button>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li>
  <NavLink to="/" end onClick={() => setMenuOpen(false)}>
  Home
</NavLink>
</li>

        <li>
  <NavLink to="/wishlist" onClick={() => setMenuOpen(false)}>
    ❤️ Wishlist
  </NavLink>
</li>

        <li>
  <NavLink to="/favorites" onClick={() => setMenuOpen(false)}>
    ❤️ Favorites
  </NavLink>
</li>

        <li>
  <NavLink to="/my-trips" onClick={() => setMenuOpen(false)}>
    🧳 My Trips
  </NavLink>
</li>

        <li>
  <NavLink to="/add-trip" onClick={() => setMenuOpen(false)}>
    ➕ Add Trip
  </NavLink>
</li>

      </ul>
    </nav>
  );
}

export default Navbar;