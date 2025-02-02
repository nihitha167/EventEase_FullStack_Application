const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../models/userModel");

exports.registerUser = (req, res) => {
  const { name, email, password } = req.body;  // 🔄 Use `name` instead of `username`

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: "Error hashing password" });

    createUser(name, email, hashedPassword, (error, result) => {  // Pass `name`
      if (error) {
        console.error("Database Error:", error);
        return res.status(500).json({ error: "Registration failed", details: error });
      }

      res.status(201).json({ message: "User registered successfully!" });
    });
  });
};


exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  findUserByEmail(email, (error, results) => {
    if (error || results.length === 0)
      return res.status(401).json({ error: "Invalid credentials" });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.json({ message: "Login successful", token, user });
    });
  });
};
