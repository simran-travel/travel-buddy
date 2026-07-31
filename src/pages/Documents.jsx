import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function Documents() {
  const { tripId } = useParams();

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [documents, setDocuments] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem(`documents-${tripId}`)) || [];
    setDocuments(saved);
  }, [tripId]);

  const saveDocuments = (list) => {
    localStorage.setItem(
      `documents-${tripId}`,
      JSON.stringify(list)
    );
    setDocuments(list);
  };

  const handleSave = () => {
    if (!name.trim()) return;

    if (editingId) {
      const updated = documents.map((doc) =>
        doc.id === editingId
          ? { ...doc, name, number }
          : doc
      );

      saveDocuments(updated);
      setEditingId(null);
    } else {
      const newDoc = {
        id: Date.now(),
        name,
        number,
      };

      saveDocuments([...documents, newDoc]);
    }

    setName("");
    setNumber("");
  };

  const handleEdit = (doc) => {
    setEditingId(doc.id);
    setName(doc.name);
    setNumber(doc.number);
  };

  const handleDelete = (id) => {
    const updated = documents.filter(
      (doc) => doc.id !== id
    );
    saveDocuments(updated);
  };

  return (
    <div className="dashboard">
      <h1>📄 Travel Documents</h1>

      <Link to={`/trip-dashboard/${tripId}`}>
        ← Back to Dashboard
      </Link>

      <br />
      <br />

      <input
        type="text"
        placeholder="Document Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Document Number / Notes"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />

      <button onClick={handleSave}>
        {editingId ? "💾 Update" : "➕ Add"}
      </button>

      <hr />

      <h2>Saved Documents</h2>

      {documents.length === 0 ? (
        <p>No documents added yet.</p>
      ) : (
        documents.map((doc) => (
          <div key={doc.id}>
            <strong>{doc.name}</strong>

            {doc.number && (
              <p>{doc.number}</p>
            )}

            <button onClick={() => handleEdit(doc)}>
              ✏️
            </button>

            <button
              onClick={() => handleDelete(doc.id)}
            >
              🗑️
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Documents;