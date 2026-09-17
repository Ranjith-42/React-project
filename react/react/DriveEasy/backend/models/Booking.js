const mongoose = require("mongoose");

// Schema that describes how a Booking document looks in MongoDB
const bookingSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    // We store the car _id here and "link" it to the Car collection
    car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    pickupDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    totalDays: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Confirmed", "Cancelled", "Completed"],
      default: "Confirmed",
    },
  },
  { timestamps: true } // automatically adds createdAt and updatedAt
);

module.exports = mongoose.model("Booking", bookingSchema);