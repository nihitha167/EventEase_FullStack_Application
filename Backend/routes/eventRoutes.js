const express = require("express");
const { createNewEvent, fetchEvents, fetchUserEvents , deleteEvent , updateEvent , fetchUserAddedEvents, addUserEvent, removeUserEvent} = require("../controllers/eventController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", verifyToken, createNewEvent); // ✅ Requires authentication
router.get("/", fetchEvents);
router.get("/user", verifyToken, fetchUserEvents);
router.delete("/:id", verifyToken, deleteEvent); 
router.put("/:id", verifyToken, updateEvent);
router.get("/user-added", verifyToken, fetchUserAddedEvents);
router.post("/add", verifyToken, addUserEvent);
router.delete("/remove/:id", verifyToken, removeUserEvent);





module.exports = router;
