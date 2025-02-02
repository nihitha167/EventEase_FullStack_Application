const db = require("../config/db");

const createEvent = (userId, title, description, eventDate, callback) => {
  const sql = "INSERT INTO events (user_id, title, description, event_date) VALUES (?, ?, ?, ?)";
  db.query(sql, [userId, title, description, eventDate], callback);
};

const getEvents = (callback) => {
  const sql = "SELECT * FROM events";
  db.query(sql, callback);
};

const getUserEvents = (userId, callback) => {
  const sql = "SELECT * FROM events WHERE user_id = ?";
  db.query(sql, [userId], callback);
};

module.exports = { createEvent, getEvents, getUserEvents };
