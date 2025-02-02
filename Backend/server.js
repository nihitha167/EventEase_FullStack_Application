const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
  });

app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
      console.log(`Registered Route: ${r.route.path}`);
    }
  });
  

app.listen(5000, () => console.log("Server running on port 5000"));
