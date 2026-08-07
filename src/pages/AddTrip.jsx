import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

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
      budget: "",
      photos: [],
    }
  );

  const [photos, setPhotos] = useState(
    editingTrip?.photos || []
  );

  function handleChange(e) {
    const { name, value } = e.target;

    setTrip({
      ...trip,
      [name]: value,
    });
  }

  function handlePhotoChange(e) {
    const files = Array.from(e.target.files);

    const photoPromises = files.slice(0, 5).map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          resolve(reader.result);
        };

        reader.readAsDataURL(file);
      });
    });

    Promise.all(photoPromises).then((images) => {
      setPhotos(images);

      setTrip({
        ...trip,
        photos: images,
      });
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      console.log("Current User:", auth.currentUser);

      const tripWithPhotos = {
        ...trip,
        photos: trip.photos || photos,
        userId: auth.currentUser.uid,
      };

      const existingTrips =
        JSON.parse(localStorage.getItem("myTrips")) || [];

      if (editingTrip) {
        existingTrips[editingIndex] = tripWithPhotos;
      } else {
        const docRef = await addDoc(
          collection(db, "trips"),
          tripWithPhotos
        );

        console.log("Trip saved successfully:", docRef.id);
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
        budget: "",
        photos: [],
      });

      setPhotos([]);

    } catch (error) {
      console.error("Firestore Error:", error);
      alert(error.message);
    }
  }

  return (
    <div className="page">
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
          <label>📸 Trip Photos (Maximum 5)</label>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoChange}
          />

          <p>{photos.length} photo(s) selected</p>

          <div className="photo-preview">
            {photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Trip ${index + 1}`}
                className="preview-image"
              />
            ))}
          </div>
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