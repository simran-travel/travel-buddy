import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function MyTrips() {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTrips =
      JSON.parse(localStorage.getItem("myTrips")) || [];
    setTrips(savedTrips);
  }, []);

  function editTrip(index) {
    navigate("/add-trip", {
      state: {
        trip: trips[index],
        index: index
      }
    });
  }

  function deleteTrip(indexToDelete) {
    if (!window.confirm("Are you sure you want to delete this trip?")) {
      return;
    }

    const updatedTrips = trips.filter(
      (_, index) => index !== indexToDelete
    );

    setTrips(updatedTrips);

    localStorage.setItem(
      "myTrips",
      JSON.stringify(updatedTrips)
    );
  }

  function getTripStatus(startDate, endDate) {
  const today = new Date();

  const start = new Date(startDate);
  const end = new Date(endDate);

  today.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  if (today < start) {
    const daysLeft = Math.ceil(
      (start - today) / (1000 * 60 * 60 * 24)
    );

    return {
      text: `⏳ ${daysLeft} day(s) left`,
      className: "upcoming"
    };
  }

  if (today >= start && today <= end) {
    return {
      text: "🟢 Ongoing Trip",
      className: "ongoing"
    };
  }

  return {
    text: "✅ Trip Completed",
    className: "completed"
  };
}

  return (
  <div className="my-trips">

    <div className="page-navigation">
      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <Link to="/">
        <button className="home-btn">
          🏠 Home
        </button>
      </Link>
    </div>
    
      <h1>🧳 My Trips</h1>

      {trips.length === 0 ? (
        <p>No trips planned yet.</p>
      ) : (
        trips.map((trip, index) => (
          <div key={index} className="trip-card">
            <h2>{trip.destination}</h2>

            <p>
              <strong>Start:</strong> {trip.startDate}
            </p>

            <p>
              <strong>End:</strong> {trip.endDate}
            </p>

          <p>
  <strong>Status:</strong>{" "}
  <span
    className={getTripStatus(trip.startDate, trip.endDate).className}
  >
    {getTripStatus(trip.startDate, trip.endDate).text}
  </span>
</p>  
            <p>
              <strong>Travelers:</strong> {trip.travelers}
            </p>

            <p>
              <strong>Budget:</strong> ₹{trip.budget}
            </p>

            <button onClick={() => editTrip(index)}>
              ✏️ Edit Trip
            </button>

            <button onClick={() => deleteTrip(index)}>
              🗑 Delete Trip
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default MyTrips;