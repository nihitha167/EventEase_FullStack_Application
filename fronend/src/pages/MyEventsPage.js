import { useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../styles/App.css";

const MyEventsPage = () => {
  const [createdEvents, setCreatedEvents] = useState([]);
  const [addedEvents, setAddedEvents] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchUserEvents = async () => {
      try {
        const createdResponse = await api.get("/events/user");
        setCreatedEvents(createdResponse.data);

        const addedResponse = await api.get("/events/user-added");
        setAddedEvents(addedResponse.data);
      } catch (error) {
        console.error("Error fetching user events:", error);
      }
    };

    fetchUserEvents();
  }, [user]);

  const deleteEvent = async (id, type) => {
    try {
      if (type === "created") {
        await api.delete(`/events/${id}`);
        setCreatedEvents(createdEvents.filter(event => event.id !== id));
      } else {
        await api.delete(`/events/remove/${id}`);
        setAddedEvents(addedEvents.filter(event => event.id !== id));
      }
      alert("Event removed successfully!");
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to remove event.");
    }
  };

  const editEvent = async (id, title, description, event_date) => {
    const newTitle = prompt("Enter new title:", title);
    const newDescription = prompt("Enter new description:", description);
    const newDate = prompt("Enter new date (YYYY-MM-DD):", event_date);

    if (!newTitle || !newDescription || !newDate) return;

    try {
      await api.put(`/events/${id}`, {
        title: newTitle,
        description: newDescription,
        event_date: newDate
      });
      setCreatedEvents(createdEvents.map(event => event.id === id ? { ...event, title: newTitle, description: newDescription, event_date: newDate } : event));
      alert("Event updated successfully!");
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event.");
    }
  };

  return (
    <div className="events-container">
      <h1 className="page-title">My Events</h1>

      <div className="event-section">
        <h2>Events Created</h2>
        {createdEvents.length > 0 ? (
          <ul className="event-list">
            {createdEvents.map(event => (
              <li key={event.id} className="event-card">
                <div className="event-details">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <span className="event-date">📅 {event.event_date}</span>
                </div>
                <div className="event-actions">
                  <button className="edit-btn" onClick={() => editEvent(event.id, event.title, event.description, event.event_date)}>✏ Edit</button>
                  <button className="delete-btn" onClick={() => deleteEvent(event.id, "created")}>🗑 Delete</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-events">No events created yet.</p>
        )}
      </div>

      <div className="event-section">
        <h2>Events Added</h2>
        {addedEvents.length > 0 ? (
          <ul className="event-list">
            {addedEvents.map(event => (
              <li key={event.id} className="event-card">
                <div className="event-details">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <span className="event-date">📅 {event.event_date}</span>
                </div>
                <div className="event-actions">
                  <button className="remove-btn" onClick={() => deleteEvent(event.id, "added")}>❌ Remove</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-events">No events added yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyEventsPage;
