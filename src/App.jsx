import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import DestinationDetails from "./pages/DestinationDetails";
import Favorites from "./pages/Favorites";
import MyTrips from "./pages/MyTrips";
import AddTrip from "./pages/AddTrip";
import PackingChecklist from "./pages/PackingChecklist";
import TripNotes from "./pages/TripNotes";
import TripDashboard from "./pages/TripDashboard";
import ItineraryPlanner from "./pages/ItineraryPlanner";
import Documents from "./pages/Documents";
import Wishlist from "./pages/Wishlist";

import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";

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

      <ScrollToTop />

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
          path="/wishlist"
          element={<Wishlist />}
        />

        <Route
          path="/my-trips"
          element={<MyTrips />}
        />

        <Route
          path="/add-trip"
          element={<AddTrip />}
        />

        <Route
          path="/packing/:tripId"
          element={<PackingChecklist />}
        />

        <Route
          path="/notes/:tripId"
          element={<TripNotes />}
        />

        <Route
          path="/itinerary/:tripId"
          element={<ItineraryPlanner />}
        />

        <Route
          path="/documents/:tripId"
          element={<Documents />}
        />

        <Route
          path="/trip-dashboard/:tripId"
          element={<TripDashboard />}
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;