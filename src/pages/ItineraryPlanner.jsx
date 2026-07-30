import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ItineraryPlanner() {
  const { tripId } = useParams();

  const [day, setDay] = useState(1);
  const [time, setTime] = useState("");
  const [activity, setActivity] = useState("");
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const groupedItems = items.reduce((groups, item) => {
  if (!groups[item.day]) {
    groups[item.day] = [];
  }

  groups[item.day].push(item);

  return groups;
}, {});

  function addActivity() {
  if (!activity.trim()) return;

  let updatedItems;

if (editingId) {
  updatedItems = items.map((item) =>
    item.id === editingId
      ? {
          ...item,
          day,
          time,
          activity,
        }
      : item
  );
} else {
  const newItem = {
    id: Date.now(),
    day,
    time,
    activity,
  };

  updatedItems = [...items, newItem];
}

  setItems(updatedItems);

  localStorage.setItem(
    `itinerary-${tripId}`,
    JSON.stringify(updatedItems)
  );

  setTime("");
  setActivity("");
  setEditingId(null);
}

function deleteActivity(id) {
  const updatedItems = items.filter((item) => item.id !== id);

  setItems(updatedItems);

  localStorage.setItem(
    `itinerary-${tripId}`,
    JSON.stringify(updatedItems)
  );
}

function editActivity(item) {
  setDay(item.day);
  setTime(item.time);
  setActivity(item.activity);
  setEditingId(item.id);
}

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem(`itinerary-${tripId}`)
    );

    if (saved) {
      setItems(saved);
    }
  }, [tripId]);

  return (
    <div className="page">
      <h1>🗓️ Itinerary Planner</h1>

      <input
        type="number"
        min="1"
        placeholder="Day"
        value={day}
        onChange={(e) => setDay(e.target.value)}
      />

      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <input
        type="text"
        placeholder="Activity"
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
      />

      <button onClick={addActivity}>
  ➕ Add Activity
</button>

      <hr />

      <h2>Saved Itinerary</h2>
      {Object.keys(groupedItems)
  .sort((a, b) => Number(a) - Number(b))
  .map((day) => (
    <div key={day}>
      <h3>🗓️ Day {day}</h3>

      {groupedItems[day]
        .sort((a, b) => a.time.localeCompare(b.time))
        .map((item) => (
          <div key={item.id}>
            <p>
              <strong>{item.time}</strong> — {item.activity}
            </p>

            <button onClick={() => editActivity(item)}>
  ✏️ Edit
</button>

<button onClick={() => deleteActivity(item.id)}>
  🗑️ Delete
</button>

          </div>
        ))}

      <hr />
    </div>
  ))}      

    </div>
  );
}

export default ItineraryPlanner;