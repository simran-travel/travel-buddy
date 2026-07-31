import { useParams, Link } from "react-router-dom";
import { useState } from "react";

function TripDashboard() {

  const { tripId } = useParams();
  const trips =
    JSON.parse(localStorage.getItem("myTrips")) || [];
    const savedExpenses =
  JSON.parse(localStorage.getItem(`expenses-${tripId}`)) || [];

  const trip = trips[tripId];
  const [expenses, setExpenses] = useState(savedExpenses);
  const [expenseName, setExpenseName] = useState("");
const [expenseAmount, setExpenseAmount] = useState("");
const [editingIndex, setEditingIndex] = useState(null);

  const today = new Date();

const start = new Date(trip?.startDate);
const end = new Date(trip?.endDate);

const oneDay = 1000 * 60 * 60 * 24;

const daysUntilTrip = Math.ceil((start - today) / oneDay);

const tripDuration = Math.ceil((end - start) / oneDay) + 1;

// Trip Status
let tripStatus = "🟢 Upcoming";

if (today >= start && today <= end) {
  tripStatus = "🟠 Ongoing";
} else if (today > end) {
  tripStatus = "🔴 Completed";
}

// Progress %
let progress = 0;

if (today >= start && today <= end) {
  const daysPassed = Math.ceil((today - start) / oneDay);
  progress = Math.min(
    100,
    Math.round((daysPassed / tripDuration) * 100)
  );
} else if (today > end) {
  progress = 100;
}

function addExpense() {
  console.log("Add expense clicked");
  if (!expenseName || !expenseAmount) {
    alert("Please enter expense details");
    return;
  }

  const newExpense = {
    name: expenseName,
    amount: Number(expenseAmount),
  };

  let updatedExpenses;

if (editingIndex !== null) {
  updatedExpenses = [...expenses];

  updatedExpenses[editingIndex] = newExpense;

  setEditingIndex(null);
} else {
  updatedExpenses = [
    ...expenses,
    newExpense,
  ];
}

  setExpenses(updatedExpenses);

  localStorage.setItem(
    `expenses-${tripId}`,
    JSON.stringify(updatedExpenses)
  );

  setExpenseName("");
  setExpenseAmount("");
  setEditingIndex(null);
}
function editExpense(index) {
  const expense = expenses[index];

  setExpenseName(expense.name);
  setExpenseAmount(expense.amount);
  setEditingIndex(index);
}

function deleteExpense(indexToDelete) {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this expense?"
  );

  if (!confirmDelete) {
    return;
  }

  const updatedExpenses = expenses.filter(
    (_, index) => index !== indexToDelete
  );

  setExpenses(updatedExpenses);

  localStorage.setItem(
    `expenses-${tripId}`,
    JSON.stringify(updatedExpenses)
  );
}

const totalExpenses = expenses.reduce(
  (total, expense) => total + expense.amount,
  0
);

const remainingBudget = trip.budget - totalExpenses;

const budgetUsed =
  trip.budget > 0
    ? ((totalExpenses / trip.budget) * 100).toFixed(1)
    : 0;

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
    {tripStatus === "🟢 Upcoming"
      ? `${daysUntilTrip} day(s) left`
      : tripStatus === "🟠 Ongoing"
      ? "Trip in progress ✈️"
      : "Trip completed 🎉"}
  </p>

  <h4 style={{ marginTop: "12px" }}>
    {tripStatus}
  </h4>

  <div
    style={{
      width: "100%",
      height: "10px",
      background: "#ddd",
      borderRadius: "20px",
      overflow: "hidden",
      marginTop: "10px",
    }}
  >
    <div
      style={{
        width: `${progress}%`,
        height: "100%",
        background: "#4caf50",
        transition: "0.5s",
      }}
    />
  </div>

  <p style={{ marginTop: "8px" }}>
    {progress}% Completed
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

<h2>💸 Expenses</h2>

<div className="expense-form">

  <input
  type="text"
  placeholder="Expense name (Flight, Hotel...)"
  value={expenseName || ""}
  onChange={(e) => setExpenseName(e.target.value)}
/>

  <input
  type="number"
  placeholder="Amount"
  value={expenseAmount || ""}
  onChange={(e) => setExpenseAmount(e.target.value)}
/>

  <button onClick={addExpense}>
  {editingIndex !== null
    ? "💾 Update Expense"
    : "➕ Add Expense"}
</button>

{expenses.length > 0 && (
  <div className="expense-list">
    <h3>📊 Expense Summary</h3>

<p>💸 Total Expenses: ₹{totalExpenses}</p>

<p>💰 Remaining Budget: ₹{remainingBudget}</p>

<p>📈 Budget Used: {budgetUsed}%</p>
<div className="budget-bar">
  <div
    className="budget-progress"
    style={{ width: `${budgetUsed}%` }}
  ></div>
</div>

<hr />

    <h3>Saved Expenses</h3>

    {expenses.map((expense, index) => (
  <p key={index}>
    {expense.name} - ₹{expense.amount}

    <button
  onClick={() => editExpense(index)}
  style={{ marginLeft: "10px" }}
>
  ✏️
</button>

<button
  onClick={() => deleteExpense(index)}
  style={{ marginLeft: "5px" }}
>
  🗑️
</button>

  </p>
))}

  </div>
)}

</div>

        <h2>Quick Actions</h2>

<Link to={`/packing/${tripId}`}>
  <button>🎒 Packing List</button>
</Link>

<Link to={`/notes/${tripId}`}>
  <button>📝 Notes</button>
</Link>

<Link to={`/itinerary/${tripId}`}>
  <button>🗓️ Itinerary</button>
</Link>

<Link to={`/documents/${tripId}`}>
  <button>📄 Documents</button>
</Link>

<Link to={`/destination/${trip.destination.toLowerCase()}`}>
  <button>🌤 Weather</button>
</Link>

      </div>

    </div>
  );
}

export default TripDashboard;