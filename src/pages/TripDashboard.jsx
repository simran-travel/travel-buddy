import { useParams, Link } from "react-router-dom";

function TripDashboard() {

  const { tripId } = useParams();

  const trips =
    JSON.parse(localStorage.getItem("myTrips")) || [];

  const trip = trips[tripId];

  const today = new Date();

const start = new Date(trip?.startDate);
const end = new Date(trip?.endDate);

const daysUntilTrip = Math.ceil(
  (start - today) / (1000 * 60 * 60 * 24)
);

const tripDuration = Math.ceil(
  (end - start) / (1000 * 60 * 60 * 24)
);

  if (!trip) {
    return (
      <div className="page">
        <h2>Trip not found</h2>
        <Link to="/my-trips">
          ← Back to My Trips
        </Link>
      </div>
    );
  }


  return (
    <div className="page">

      {trip.photos && trip.photos.length > 0 && (
  <img
    className="dashboard-cover"
    src={trip.photos[0]}
    alt="Trip cover"
  />
)}

<h1>
  🌍 {trip.destination} Dashboard
</h1>

      <Link to="/my-trips">
        ← Back to My Trips
      </Link>


      <div className="dashboard-card">

        <div className="dashboard-info-card">
  <h3>📅 Travel Dates</h3>
  <p>{trip.startDate} → {trip.endDate}</p>
</div>

<div className="dashboard-info-card">
  <h3>⏳ Countdown</h3>
  <p>
    {daysUntilTrip > 0
      ? `${daysUntilTrip} day(s) left`
      : "Trip started 🎉"}
  </p>
</div>

<div className="dashboard-info-card">
  <h3>🗓 Duration</h3>
  <p>{tripDuration} day(s)</p>
</div>

<div className="dashboard-info-card">
  <h3>👥 Travelers</h3>
  <p>{trip.travelers}</p>
</div>

<div className="dashboard-info-card">
  <h3>💰 Budget</h3>
  <p>₹{trip.budget}</p>
</div>

        <h2>Quick Actions</h2>

        <Link to={`/packing/${tripId}`}>
          <button>
            🎒 Packing List
          </button>
        </Link>


        <Link to={`/notes/${tripId}`}>
          <button>
            📝 Notes
          </button>
        </Link>

<Link
  to={`/destination/${trip.destination.toLowerCase()}`}
>
  <button>
    🌤 Weather
  </button>
</Link>

      </div>

    </div>
  );
}

export default TripDashboard;