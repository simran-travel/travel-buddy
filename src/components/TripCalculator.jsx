import { useState } from "react";

function TripCalculator() {
  const [days, setDays] = useState(5);
  const [hotel, setHotel] = useState(3000);
  const [food, setFood] = useState(1500);

  const [transport, setTransport] = useState(1000);
const hotelTotal = hotel * days;
const foodTotal = food * days;
const transportTotal = transport * days;

const totalCost = hotelTotal + foodTotal + transportTotal;
  return (
    <div className="trip-calculator">
      <h2>💰 Trip Cost Calculator</h2>

      <label>
        Days
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
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

    </div>
  );
}

export default TripCalculator;