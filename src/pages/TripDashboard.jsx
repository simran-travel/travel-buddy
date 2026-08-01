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
const [expenseCategory, setExpenseCategory] = useState("Transport");
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
  category: expenseCategory,
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
  setExpenseCategory("Transport");
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

    const groupedExpenses = expenses.reduce((groups, expense) => {
  const category = expense.category || "Other";

  if (!groups[category]) {
    groups[category] = [];
  }

  groups[category].push(expense);

  return groups;
}, {});

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
        <div className="dashboard-summary">

  <div className="summary-card">
    <h4>💰 Budget</h4>
    <h2>₹{trip.budget}</h2>
  </div>

  <div className="summary-card">
    <h4>💸 Expenses</h4>
    <h2>₹{totalExpenses}</h2>
  </div>

  <div className="summary-card">
    <h4>💵 Remaining</h4>
    <h2>₹{remainingBudget}</h2>
  </div>

  <div className="summary-card">
  <h4>📈 Budget Status</h4>

  <h2>{budgetUsed}%</h2>

  <span
    className={
      totalExpenses > trip.budget
        ? "budget-badge danger"
        : totalExpenses > trip.budget * 0.8
        ? "budget-badge warning"
        : "budget-badge success"
    }
  >
    {totalExpenses > trip.budget
      ? "🔴 Over Budget"
      : totalExpenses > trip.budget * 0.8
      ? "🟠 Warning"
      : "🟢 On Track"}
  </span>
</div>

</div>

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

  <div className="trip-progress">
  <div
    className="trip-progress-fill"
    style={{
      width: `${progress}%`,
    }}
  />
</div>

<p className="progress-text">
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

<select
  value={expenseCategory}
  onChange={(e) => setExpenseCategory(e.target.value)}
>
  <option value="Transport">✈️ Transport</option>
  <option value="Accommodation">🏨 Accommodation</option>
  <option value="Food">🍽 Food</option>
  <option value="Activities">🎟 Activities</option>
  <option value="Shopping">🛍 Shopping</option>
  <option value="Other">📄 Other</option>
</select>

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
    style={{
      width: `${Math.min(budgetUsed, 100)}%`,
      background:
        totalExpenses > trip.budget
          ? "#f44336"
          : totalExpenses > trip.budget * 0.8
          ? "#ff9800"
          : "#4caf50",
    }}
  ></div>
</div>

<p
  style={{
    fontWeight: "bold",
    color:
      totalExpenses > trip.budget
        ? "#f44336"
        : totalExpenses > trip.budget * 0.8
        ? "#ff9800"
        : "#4caf50",
  }}
>
  {totalExpenses > trip.budget
    ? `⚠️ Budget exceeded by ₹${totalExpenses - trip.budget}`
    : `✅ ₹${remainingBudget} remaining`}
</p>

<hr />

    <h3>Saved Expenses</h3>

    {Object.entries(groupedExpenses).map(([category, items]) => (
  <div key={category} style={{ marginBottom: "25px" }}>

    <h3 className="expense-category">
  {category}
</h3>

    {items.map((expense) => {
      const originalIndex = expenses.findIndex(
        (e) =>
          e.name === expense.name &&
          e.amount === expense.amount &&
          (e.category || "Other") === (expense.category || "Other")
      );

      return (
        <div
          key={originalIndex}
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "12px",
            marginBottom: "10px",
          }}
        >
          <p>
            {expense.name} - ₹{expense.amount}
          </p>

          <button
            onClick={() => editExpense(originalIndex)}
            style={{ marginRight: "8px" }}
          >
            ✏️ Edit
          </button>

          <button
            onClick={() => deleteExpense(originalIndex)}
          >
            🗑️ Delete
          </button>
        </div>
      );
    })}

  </div>
))}

  </div>
)}

</div>

        <h2>Quick Actions</h2>

<div className="quick-actions">

  <Link to={`/packing/${tripId}`}>
    <button className="packing-btn">🎒 Packing</button>
  </Link>

  <Link to={`/notes/${tripId}`}>
    <button className="notes-btn">📝 Notes</button>
  </Link>

  <Link to={`/itinerary/${tripId}`}>
    <button className="itinerary-btn">🗓️ Itinerary</button>
  </Link>

  <Link to={`/documents/${tripId}`}>
    <button className="documents-btn">📄 Documents</button>
  </Link>

  <Link to={`/destination/${trip.destination.toLowerCase()}`}>
    <button className="weather-btn">🌤 Weather</button>
  </Link>

</div>

      </div>

    </div>
  );
}

export default TripDashboard;