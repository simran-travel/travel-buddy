import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function AddTrip() {
  const location = useLocation();
  const navigate = useNavigate();

  const editingTrip = location.state?.trip;
  const editingIndex = location.state?.index;

  const [trip, setTrip] = useState(
    editingTrip || {
      destination: "",
      startDate: "",
      endDate: "",
      travelers: 1,
      budget: ""
    }
  );

  const [photos, setPhotos] = useState([]);

  function handleChange(e) {
    setTrip({
      ...trip,
      [e.target.name]: e.target.value
    });
  }

  function handlePhotoChange(e) {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 5) {
      alert("You can upload a maximum of 5 photos.");
      return;
    }

    setPhotos(selectedFiles);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const existingTrips =
      JSON.parse(localStorage.getItem("myTrips")) || [];

    if (editingTrip) {
      existingTrips[editingIndex] = trip;
    } else {
      existingTrips.push(trip);
    }

    localStorage.setItem(
      "myTrips",
      JSON.stringify(existingTrips)
    );

    alert(
      editingTrip
        ? "Trip updated successfully!"
        : "Trip created successfully!"
    );

    setTrip({
      destination: "",
      startDate: "",
      endDate: "",
      travelers: 1,
      budget: ""
    });

    setPhotos([]);
  }

  return (
  <div className="add-trip">

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

      <h1>
        {editingTrip
          ? "✏️ Edit Trip"
          : "➕ Plan New Trip"}
      </h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={trip.destination}
          onChange={handleChange}
        />

        <input
          type="date"
          name="startDate"
          value={trip.startDate}
          onChange={handleChange}
        />

        <input
          type="date"
          name="endDate"
          value={trip.endDate}
          onChange={handleChange}
        />

        <input
          type="number"
          name="travelers"
          min="1"
          value={trip.travelers}
          onChange={handleChange}
        />

        <input
          type="number"
          name="budget"
          placeholder="Budget ₹"
          value={trip.budget}
          onChange={handleChange}
        />

        <div className="photo-upload">
          <label>
            📸 Trip Photos (Maximum 5)
          </label>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoChange}
          />

          <p>
            {photos.length} photo(s) selected
          </p>
        </div>

        <button type="submit">
          {editingTrip
            ? "💾 Update Trip"
            : "💾 Save Trip"}
        </button>

      </form>
    </div>
  );
}

export default AddTrip;