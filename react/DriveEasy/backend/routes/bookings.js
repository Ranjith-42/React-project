const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Car = require("../models/Car");

// POST /api/bookings  -> creates a new booking
router.post("/", async (req, res) => {
  try {
    const { customerName, phone, carId, pickupDate, returnDate } = req.body;

    // 1. Basic validation
    if (!customerName || !phone || !carId || !pickupDate || !returnDate) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // 2. Make sure the car exists and is available
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found." });
    }
    if (!car.available) {
      return res.status(400).json({ message: "Sorry, this car is not available." });
    }

    // 3. Validate the dates
    const pickup = new Date(pickupDate);
    const ret = new Date(returnDate);

    if (isNaN(pickup.getTime()) || isNaN(ret.getTime())) {
      return res.status(400).json({ message: "Please select valid dates." });
    }

    if (ret < pickup) {
      return res
        .status(400)
        .json({ message: "Return date cannot be before pickup date." });
    }

    // 4. Calculate total days (minimum 1 day) and total price
    const ONE_DAY = 24 * 60 * 60 * 1000; // milliseconds in one day
    const totalDays = Math.max(1, Math.round((ret - pickup) / ONE_DAY));
    const totalPrice = totalDays * car.price;

    // 5. Save the booking in MongoDB
    const booking = new Booking({
      customerName,
      phone,
      car: car._id,
      pickupDate: pickup,
      returnDate: ret,
      totalDays,
      totalPrice,
      status: "Confirmed",
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Booking failed. Please try again." });
  }
});

// GET /api/bookings  -> returns all bookings (newest first)
router.get("/", async (req, res) => {
  try {
    // populate("car") replaces the car _id with the full car object
    const bookings = await Booking.find().populate("car").sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Could not fetch bookings. Please try again." });
  }
});

module.exports = router;