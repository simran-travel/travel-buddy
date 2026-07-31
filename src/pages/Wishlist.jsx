import { useState, useEffect } from "react";

function Wishlist() {
  const [place, setPlace] = useState("");
const [notes, setNotes] = useState("");
const [priority, setPriority] = useState("Medium");

const [wishlist, setWishlist] = useState([]);
const [editingId, setEditingId] = useState(null);
const [filter, setFilter] = useState("All");

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(saved);
  }, []);

  const saveWishlist = (list) => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(list)
    );
    setWishlist(list);
  };

  const addPlace = () => {
  if (!place.trim()) return;

  if (editingId) {
    const updated = wishlist.map((item) =>
      item.id === editingId
        ? {
            ...item,
            name: place,
            notes,
            priority,
          }
        : item
    );

    saveWishlist(updated);
    setEditingId(null);
  } else {
    const newPlace = {
      id: Date.now(),
      name: place,
      notes,
      priority,
      visited: false,
    };

    saveWishlist([...wishlist, newPlace]);
  }

  setPlace("");
  setNotes("");
  setPriority("Medium");
};

function editPlace(item) {
  setEditingId(item.id);
  setPlace(item.name);
  setNotes(item.notes);
  setPriority(item.priority);
}
  const toggleVisited = (id) => {
    const updated = wishlist.map((item) =>
      item.id === id
        ? { ...item, visited: !item.visited }
        : item
    );

    saveWishlist(updated);
  };

  const deletePlace = (id) => {
    saveWishlist(
      wishlist.filter((item) => item.id !== id)
    );
  };
const filteredWishlist = wishlist.filter((item) => {
  if (filter === "Wishlist") return !item.visited;
  if (filter === "Visited") return item.visited;
  return true;
});

  return (
    <div className="dashboard">
      <h1>❤️ Travel Wishlist</h1>

      <input
        type="text"
        placeholder="Dream Destination"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
      />

      <input
  type="text"
  placeholder="Notes (Best season, attractions...)"
  value={notes}
  onChange={(e) => setNotes(e.target.value)}
/>

<select
  value={priority}
  onChange={(e) => setPriority(e.target.value)}
>
  <option>High</option>
  <option>Medium</option>
  <option>Low</option>
</select>

      <button onClick={addPlace}>
  {editingId ? "💾 Update" : "➕ Add"}
</button>

<select
  value={filter}
  onChange={(e) => setFilter(e.target.value)}
>
  <option>All</option>
  <option>Wishlist</option>
  <option>Visited</option>
</select>

      <hr />

      {filteredWishlist.length === 0 ? (
        <p>No destinations yet.</p>
      ) : (
        filteredWishlist.map((item) => (
          <div key={item.id}>

            <h3>{item.name}</h3>

<p>
  <strong>⭐ Priority:</strong> {item.priority}
</p>

{item.notes && (
  <p>
    <strong>📝 Notes:</strong> {item.notes}
  </p>
)}

            <button
  onClick={() => editPlace(item)}
>
  ✏️ Edit
</button>
            <button
              onClick={() => toggleVisited(item.id)}
            >
              {item.visited
                ? "✅ Visited"
                : "📍 Mark Visited"}
            </button>

            <button
              onClick={() => deletePlace(item.id)}
            >
              🗑️ Delete
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Wishlist;