import { useState } from "react";

function TripCalculator() {
  const [days, setDays] = useState(5);
  const [hotel, setHotel] = useState(3000);
  const [food, setFood] = useState(1500);

  const [transport, setTransport] = useState(1000);
const hotelTotal = hotel * days;
const foodTotal = food * days;
const transportTotal = transport * days;
const [departureDate, setDepartureDate] = useState("");
const [returnDate, setReturnDate] = useState("");
const [travelers, setTravelers] = useState(1);

const totalPerPerson = hotelTotal + foodTotal + transportTotal;
const totalCost = totalPerPerson * travelers;

function resetCalculator() {
  setDays(5);
  setDepartureDate("");
  setReturnDate("");
  setTravelers(1);
  setHotel(3000);
  setFood(1500);
  setTransport(1000);
}


  return (
    <div className="trip-calculator">
      <p>👤 Cost Per Person: ₹{totalPerPerson.toLocaleString()}</p>

<h2>
  💰 Total Trip Cost ({travelers} {travelers === 1 ? "Traveler" : "Travelers"}):
  ₹{totalCost.toLocaleString()}
</h2>

      <label>
        Days
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
        />
      </label>
      <label>
  Departure Date
  <input
    type="date"
    value={departureDate}
    onChange={(e) => setDepartureDate(e.target.value)}
  />
</label>

<label>
  Return Date
  <input
    type="date"
    value={returnDate}
    onChange={(e) => setReturnDate(e.target.value)}
  />
</label>
<label>
  Number of Travelers
  <input
    type="number"
    min="1"
    value={travelers}
    onChange={(e) => setTravelers(Number(e.target.value))}
  />
</label>

      <label>
        Hotel / Day (₹)
        <input
          type="number"
          value={hotel}
          onChange={(e) => setHotel(Number(e.target.value))}
        />
      </label>

      <label>
        Food / Day (₹)
        <input
          type="number"
          value={food}
          onChange={(e) => setFood(Number(e.target.value))}
        />
      </label>

      <label>
        Transport / Day (₹)
        <input
          type="number"
          value={transport}
          onChange={(e) => setTransport(Number(e.target.value))}
        />
      </label>
      <hr />

<h3>Estimated Cost</h3>

<p>🏨 Hotel: ₹{hotelTotal.toLocaleString()}</p>

<p>🍜 Food: ₹{foodTotal.toLocaleString()}</p>

<p>🚕 Transport: ₹{transportTotal.toLocaleString()}</p>

<h2>
  💰 Total Trip Cost: ₹{totalCost.toLocaleString()}
</h2>
<button onClick={resetCalculator}>
  🔄 Reset Calculator
</button>

    </div>
  );
}

export default TripCalculator;