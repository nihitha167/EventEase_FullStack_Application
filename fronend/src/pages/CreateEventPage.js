import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const CreateEventPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const createEvent = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/events", { title, description, event_date: eventDate });
      if (response.status === 201) {
        alert("Event created successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-event-page"> {/* ✅ Added background wrapper */}
      <div className="create-event-container">
        <h1>Create an Event</h1>
        <form onSubmit={createEvent}>
          <input type="text" placeholder="Event Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
          <button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Event"}</button>
        </form>
      </div>
    </div>
  );
};

export default CreateEventPage;
