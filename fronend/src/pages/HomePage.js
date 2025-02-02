import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import "../styles/App.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [events.length]);

  const addToMyEvents = async (event) => {
    if (!user) {
      navigate("/login"); // Redirect to login if not authenticated
      return;
    }
    try {
      await api.post("/events/add", { event_id: event.id });  // ✅ Fix API request
      alert("Event added successfully!");
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add event.");
    }
  };
  

  return (
    <div className="home-container">
      <div className="background-overlay">
        <h1>Upcoming Events</h1>
        {events.length > 0 ? (
          <div className="event-slideshow">
            <h2>{events[currentIndex]?.title}</h2>
            <p>{events[currentIndex]?.description}</p>
            <p>Date: {events[currentIndex]?.event_date}</p>
            {user && (
              <button className="add-event-btn" onClick={() => addToMyEvents(events[currentIndex])}>
                Add to My Events
              </button>
            )}
          </div>
        ) : (
          <p>No upcoming events</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
