import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function MyTrips() {
  const [trips, setTrips] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
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
        index: index,
      },
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
        className: "upcoming",
      };
    }


    if (today >= start && today <= end) {
      return {
        text: "🟢 Ongoing Trip",
        className: "ongoing",
      };
    }


    return {
      text: "✅ Trip Completed",
      className: "completed",
    };
  }

const filteredTrips = trips.filter((trip) => {
  const matchesSearch = trip.destination
    .toLowerCase()
    .includes(search.toLowerCase());

  const status = getTripStatus(
    trip.startDate,
    trip.endDate
  );

  const matchesStatus =
    statusFilter === "All" ||
    status.className === statusFilter.toLowerCase();

  return matchesSearch && matchesStatus;
});

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

<input
  type="text"
  placeholder="🔍 Search trips..."
  className="trip-search"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

<div className="trip-filters">

  <button onClick={() => setStatusFilter("All")}>
    All
  </button>

  <button onClick={() => setStatusFilter("Upcoming")}>
    Upcoming
  </button>

  <button onClick={() => setStatusFilter("Ongoing")}>
    Ongoing
  </button>

  <button onClick={() => setStatusFilter("Completed")}>
    Completed
  </button>

</div>

      {trips.length === 0 ? (
        <p>No trips planned yet.</p>
      ) : (

        filteredTrips.map((trip, index) => (

          <div key={index} className="trip-card">


            {trip.photos && trip.photos.length > 0 && (
              <div className="trip-image-container">

                <img
                  className="trip-cover"
                  src={trip.photos[0]}
                  alt="Trip cover"
                />

              </div>
            )}


            <h2>{trip.destination}</h2>


            <div
              className={`trip-status ${
                getTripStatus(
                  trip.startDate,
                  trip.endDate
                ).className
              }`}
            >

              {
                getTripStatus(
                  trip.startDate,
                  trip.endDate
                ).text
              }

            </div>


            <p>
              <strong>Start:</strong> {trip.startDate}
            </p>


            <p>
              <strong>End:</strong> {trip.endDate}
            </p>


            <p>
              <strong>Travelers:</strong> {trip.travelers}
            </p>


            <p>
              <strong>Budget:</strong> ₹{trip.budget}
            </p>



            {trip.photos && trip.photos.length > 0 && (

              <div className="trip-photos">

                {trip.photos.map((photo, index) => (

                  <img
                    key={index}
                    src={photo}
                    alt="Trip"
                    width="120"
                  />

                ))}

              </div>

            )}



            <div className="trip-actions">


              <Link to={`/trip-dashboard/${index}`}>
                <button>
                  🌍 Dashboard
                </button>
              </Link>


              <Link to={`/packing/${index}`}>
                <button>
                  🎒 Packing
                </button>
              </Link>


              <Link to={`/notes/${index}`}>
                <button>
                  📝 Notes
                </button>
              </Link>


              <button onClick={() => editTrip(index)}>
                ✏️ Edit
              </button>


              <button onClick={() => deleteTrip(index)}>
                🗑 Delete
              </button>


            </div>


          </div>

        ))

      )}

    </div>
  );
}

export default MyTrips;