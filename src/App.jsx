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
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import ProtectedRoute from "./components/ProtectedRoute";

  function App() {
    
  const [user, setUser] = useState(null);
    const [darkMode, setDarkMode] = useState(() => {
      return localStorage.getItem("theme") === "dark";
    });
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  return () => unsubscribe();
}, []);

  useEffect(() => {
    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      
    } else {
      console.log("No user logged in");
    }
  });

  return () => unsubscribe();
}, []);

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
<Route path="/signup" element={<SignUp />} />
<Route path="/login" element={<Login />} />
       
        <Route
  path="/favorites"
  element={
    <ProtectedRoute>
      <Favorites />
    </ProtectedRoute>
  }
/>

<Route
  path="/wishlist"
  element={
    <ProtectedRoute>
      <Wishlist />
    </ProtectedRoute>
  }
/>

<Route
  path="/my-trips"
  element={
    <ProtectedRoute>
      <MyTrips />
    </ProtectedRoute>
  }
/>

<Route
  path="/add-trip"
  element={
    <ProtectedRoute>
      <AddTrip />
    </ProtectedRoute>
  }
/>

<Route
  path="/packing/:tripId"
  element={
    <ProtectedRoute>
      <PackingChecklist />
    </ProtectedRoute>
  }
/>

<Route
  path="/notes/:tripId"
  element={
    <ProtectedRoute>
      <TripNotes />
    </ProtectedRoute>
  }
/>

<Route
  path="/itinerary/:tripId"
  element={
    <ProtectedRoute>
      <ItineraryPlanner />
    </ProtectedRoute>
  }
/>

<Route
  path="/documents/:tripId"
  element={
    <ProtectedRoute>
      <Documents />
    </ProtectedRoute>
  }
/>

<Route
  path="/trip-dashboard/:tripId"
  element={
    <ProtectedRoute>
      <TripDashboard />
    </ProtectedRoute>
  }
/>
      </Routes>

      <Footer />
    </div>
  );
}

export default App; 