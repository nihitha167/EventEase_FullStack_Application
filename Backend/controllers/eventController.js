const db = require("../config/db");
const { createEvent, getEvents, getUserEvents } = require("../models/eventModel");

exports.createNewEvent = (req, res) => {
  const { title, description, event_date } = req.body;

  console.log("🚀 Received request to create event:");
  console.log("🟢 User ID:", req.user?.id);
  console.log("🟢 Title:", title);
  console.log("🟢 Description:", description);
  console.log("🟢 Event Date:", event_date);

  if (!req.user || !req.user.id) {
    console.error("🔴 Unauthorized: Token is missing or invalid");
    return res.status(401).json({ error: "Unauthorized, token invalid or missing" });
  }

  createEvent(req.user.id, title, description, event_date, (error, result) => {
    if (error) {
      console.error("🔴 Database Error:", error);
      return res.status(500).json({ error: "Failed to create event", details: error });
    }
    console.log("✅ Event created successfully!");
    res.status(201).json({ message: "Event created successfully!" });
  });
};



exports.fetchEvents = (req, res) => {
  getEvents((error, results) => {
    if (error) return res.status(500).json({ error: "Failed to fetch events" });
    res.json(results);
  });
};

exports.fetchUserEvents = (req, res) => {
  getUserEvents(req.user.id, (error, results) => {
    if (error) return res.status(500).json({ error: "Failed to fetch user events" });
    res.json(results);
  });
};

exports.deleteEvent = (req, res) => {
  const eventId = req.params.id;

  console.log("🚀 Received DELETE request for event ID:", eventId);

  if (!req.user || !req.user.id) {
    console.error("🔴 Unauthorized: Token is missing or invalid");
    return res.status(401).json({ error: "Unauthorized, token invalid or missing" });
  }

  const sql = "DELETE FROM events WHERE id = ? AND user_id = ?";
  db.query(sql, [eventId, req.user.id], (error, result) => {
    if (error) {
      console.error("🔴 Database Error:", error);
      return res.status(500).json({ error: "Failed to delete event", details: error });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Event not found or unauthorized" });
    }

    console.log("✅ Event deleted successfully!");
    res.json({ message: "Event deleted successfully!" });
  });
};

exports.updateEvent = (req, res) => {
  const eventId = req.params.id;
  const { title, description, event_date } = req.body;

  console.log("🚀 Received PUT request for event ID:", eventId);
  console.log("🟢 New Title:", title);
  console.log("🟢 New Description:", description);
  console.log("🟢 New Event Date:", event_date);

  if (!req.user || !req.user.id) {
    console.error("🔴 Unauthorized: Token is missing or invalid");
    return res.status(401).json({ error: "Unauthorized, token invalid or missing" });
  }

  const sql = "UPDATE events SET title = ?, description = ?, event_date = ? WHERE id = ? AND user_id = ?";
  db.query(sql, [title, description, event_date, eventId, req.user.id], (error, result) => {
    if (error) {
      console.error("🔴 Database Error:", error);
      return res.status(500).json({ error: "Failed to update event", details: error });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Event not found or unauthorized" });
    }

    console.log("✅ Event updated successfully!");
    res.json({ message: "Event updated successfully!" });
  });
};

exports.fetchUserAddedEvents = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT events.* FROM user_events
    JOIN events ON user_events.event_id = events.id
    WHERE user_events.user_id = ?`;

  db.query(sql, [userId], (error, results) => {
    if (error) {
      console.error("Database Error:", error);
      return res.status(500).json({ error: "Failed to fetch user-added events", details: error });
    }
    res.json(results);
  });
};

exports.addUserEvent = (req, res) => {
  const userId = req.user.id;
  const { event_id } = req.body;

  if (!event_id) {
    return res.status(400).json({ error: "Event ID is required" });
  }

  const sql = "INSERT INTO user_events (user_id, event_id) VALUES (?, ?)";
  db.query(sql, [userId, event_id], (error, result) => {
    if (error) {
      console.error("Database Error:", error);
      return res.status(500).json({ error: "Failed to add event to My Events", details: error });
    }
    res.status(201).json({ message: "Event added successfully!" });
  });
};

exports.removeUserEvent = (req, res) => {
  const userId = req.user.id;
  const eventId = req.params.id;

  const sql = "DELETE FROM user_events WHERE user_id = ? AND event_id = ?";
  db.query(sql, [userId, eventId], (error, result) => {
    if (error) {
      console.error("Database Error:", error);
      return res.status(500).json({ error: "Failed to remove event from My Events", details: error });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Event not found in My Events" });
    }

    res.json({ message: "Event removed successfully!" });
  });
};


