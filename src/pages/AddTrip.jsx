import { useState } from "react";

function AddTrip() {

  const [trip, setTrip] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    travelers: 1,
    budget: ""
  });


  function handleChange(e) {
    setTrip({
      ...trip,
      [e.target.name]: e.target.value
    });
  }


  function handleSubmit(e) {
    e.preventDefault();

    console.log(trip);
    alert("Trip created successfully!");
  }


  return (
    <div className="add-trip">

      <h1>➕ Plan New Trip</h1>

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

        <button type="submit">
          💾 Save Trip
        </button>

      </form>

    </div>
  );
}

export default AddTrip;