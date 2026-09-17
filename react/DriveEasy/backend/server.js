// DriveEasy Backend Server
// Run it with:  npm run server  (inside the backend folder)

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const carRoutes = require("./routes/cars");
const bookingRoutes = require("./routes/bookings");
const seedCars = require("./seed");

const app = express();
const PORT = process.env.PORT || 5000;

// ---------- Middleware ----------
// cors() allows the React frontend (http://localhost:5173) to call this API
app.use(cors());
// express.json() lets us read JSON data sent from the frontend
app.use(express.json());

// ---------- Routes ----------
app.use("/api/cars", carRoutes);
app.use("/api/bookings", bookingRoutes);

// Simple message when someone visits http://localhost:5000
app.get("/", (req, res) => {
  res.send("DriveEasy Backend is running!");
});

// ---------- Connect to MongoDB and start the server ----------
mongoose
  .connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 })
  .then(async () => {
    console.log("Connected to MongoDB");

    // Add the sample cars the first time so the website is not empty
    await seedCars();

    app.listen(PORT, () => {
      console.log("DriveEasy server running on http://localhost:" + PORT);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err.message);
    console.log("Make sure MongoDB is installed and running on your computer.");
    process.exit(1);
  });