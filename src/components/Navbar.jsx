import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return () => unsubscribe();
}, []);

  const handleLogout = async () => {
  try {
    await signOut(auth);
    navigate("/login");
  } catch (error) {
    console.error(error);
  }
};
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

{!user && (
  <>
    <li>
      <NavLink to="/login" onClick={() => setMenuOpen(false)}>
        🔑 Login
      </NavLink>
    </li>

    <li>
      <NavLink to="/signup" onClick={() => setMenuOpen(false)}>
        📝 Sign Up
      </NavLink>
    </li>
  </>
)}

{user && (
  <li>
    <button
      className="logout-btn"
      onClick={handleLogout}
    >
      🚪 Logout
    </button>
  </li>
)}

      </ul>
    </nav>
  );
}

export default Navbar;