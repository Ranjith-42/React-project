const express = require("express");
const router = express.Router();
const Car = require("../models/Car");

// GET /api/cars  -> returns all cars
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Could not fetch cars. Please try again." });
  }
});

// POST /api/cars  -> adds a new car (used by the Admin page)
router.post("/", async (req, res) => {
  try {
    const { name, price, image, available } = req.body;

    // Simple validation
    if (!name || !price || !image) {
      return res
        .status(400)
        .json({ message: "Car name, price and image are required." });
    }

    const car = new Car({
      name,
      price,
      image,
      available: available === undefined ? true : available,
    });

    await car.save();
    res.status(201).json(car);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Could not add the car. Please try again." });
  }
});

// DELETE /api/cars/:id  -> deletes a car (used by the Admin page)
router.delete("/:id", async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);

    if (!car) {
      return res.status(404).json({ message: "Car not found." });
    }

    res.json({ message: "Car deleted successfully." });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Could not delete the car. Please try again." });
  }
});

module.exports = router;