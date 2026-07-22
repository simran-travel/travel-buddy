import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import DestinationDetails from "./pages/DestinationDetails";
import Favorites from "./pages/Favorites";
import MyTrips from "./pages/MyTrips";
import AddTrip from "./pages/AddTrip";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <button
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/destination/:slug"
          element={<DestinationDetails />}
        />

        <Route
  path="/favorites"
  element={<Favorites />}
/>
<Route
  path="/my-trips"
  element={<MyTrips />}
/>
<Route
  path="/add-trip"
  element={<AddTrip />}
/>

      </Routes>
    </div>
  );
}
export default App;