import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function PackingChecklist() {
  const { tripId } = useParams();

  const trips = JSON.parse(localStorage.getItem("myTrips")) || [];
  const trip = trips[tripId];

  const storageKey = `packing-${tripId}`;

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    const savedItems =
      JSON.parse(localStorage.getItem(storageKey)) || [];

    setItems(savedItems);
  }, [storageKey]);


  useEffect(() => {
    localStorage.setItem(
      storageKey,
      JSON.stringify(items)
    );
  }, [items, storageKey]);


  function addItem() {
    if (!newItem.trim()) return;

    setItems([
      ...items,
      {
        id: Date.now(),
        text: newItem,
        packed: false,
      },
    ]);

    setNewItem("");
  }


  function handleKeyPress(e) {
    if (e.key === "Enter") {
      addItem();
    }
  }


  function toggleItem(id) {
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              packed: !item.packed,
            }
          : item
      )
    );
  }


  function deleteItem(id) {
    setItems(
      items.filter((item) => item.id !== id)
    );
  }


  const packed =
    items.filter((item) => item.packed).length;
const progress =
  items.length === 0
    ? 0
    : Math.round((packed / items.length) * 100);

  return (
    <div className="page">

      <h1>
        🎒 {trip?.destination || "Packing Checklist"}
      </h1>


      <Link to="/my-trips">
        ← Back to My Trips
      </Link>


      <br />
      <br />


      <input
        type="text"
        placeholder="Add item (Passport, Charger...)"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        onKeyDown={handleKeyPress}
      />


      <button onClick={addItem}>
        ➕ Add
      </button>

<div className="quick-items">
  <p>Quick Add:</p>

  {[
    "🛂 Passport",
    "🔌 Charger",
    "👕 Clothes",
    "💊 Medicines",
    "👟 Shoes",
    "🧴 Toiletries"
  ].map((item) => (
    <button
      key={item}
      onClick={() =>
        setItems([
          ...items,
          {
            id: Date.now(),
            text: item,
            packed: false,
          },
        ])
      }
    >
      {item}
    </button>
  ))}
</div>

      <h3>
  Packed {packed} / {items.length}
</h3>

<div className="progress-container">
  <div
    className="progress-bar"
    style={{ width: `${progress}%` }}
  >
    {progress}%
  </div>
</div>


      {items.length === 0 ? (
        <p>No items yet.</p>
      ) : (

        items.map((item) => (

          <div
  key={item.id}
  className={`packing-item ${
    item.packed ? "packed" : ""
  }`}
>

            <label>

              <input
                type="checkbox"
                checked={item.packed}
                onChange={() =>
                  toggleItem(item.id)
                }
              />

              {item.text}

            </label>


            <button
              onClick={() =>
                deleteItem(item.id)
              }
            >
              ❌
            </button>


          </div>

        ))

      )}

    </div>
  );
}

export default PackingChecklist;