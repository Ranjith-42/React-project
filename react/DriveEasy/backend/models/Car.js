const mongoose = require("mongoose");

// Schema that describes how a Car document looks in MongoDB
const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    available: { type: Boolean, default: true },
  },
  { timestamps: true } // automatically adds createdAt and updatedAt
);

module.exports = mongoose.model("Car", carSchema);