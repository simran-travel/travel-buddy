import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        🌍 <span>Travel Buddy</span>
      </div>

      <ul className="nav-links">
        <li>
  <NavLink to="/" end>
    Home
  </NavLink>
</li>

        <li>
          <NavLink to="/wishlist">❤️ Wishlist</NavLink>
        </li>

        <li>
          <NavLink to="/favorites">❤️ Favorites</NavLink>
        </li>

        <li>
          <NavLink to="/my-trips">🧳 My Trips</NavLink>
        </li>

        <li>
          <NavLink to="/add-trip">➕ Add Trip</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;