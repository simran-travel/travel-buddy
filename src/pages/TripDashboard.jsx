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

const daysUntilTrip = Math.ceil(
  (start - today) / (1000 * 60 * 60 * 24)
);

const tripDuration = Math.ceil(
  (end - start) / (1000 * 60 * 60 * 24)
);

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
          <button>
            🎒 Packing List
          </button>
        </Link>


        <Link to={`/notes/${tripId}`}>
          <button>
            📝 Notes
          </button>
        </Link>

        <Link to={`/itinerary/${trip.id}`}>
  <button>🗓️ Itinerary</button>
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