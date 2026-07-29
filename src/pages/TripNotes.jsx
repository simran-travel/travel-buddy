import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function TripNotes() {

  const { tripId } = useParams();

  const trips = JSON.parse(
    localStorage.getItem("myTrips")
  ) || [];

  const trip = trips[tripId];

  const storageKey = `notes-${tripId}`;

  const [notes, setNotes] = useState("");

  useEffect(() => {
    const savedNotes =
      localStorage.getItem(storageKey) || "";

    setNotes(savedNotes);
  }, [storageKey]);


  function saveNotes() {
    localStorage.setItem(
      storageKey,
      notes
    );

    alert("Notes saved successfully!");
  }


  return (
    <div className="page">

      <h1>
        📝 {trip?.destination || "Trip"} Notes
      </h1>

      <Link to="/my-trips">
        ← Back to My Trips
      </Link>

      <br />
      <br />

      <textarea
        placeholder="Write your travel memories, plans, places to visit..."
        value={notes}
        onChange={(e) =>
          setNotes(e.target.value)
        }
        rows="10"
      />

      <br />

      <button onClick={saveNotes}>
        💾 Save Notes
      </button>

    </div>
  );
}

export default TripNotes;