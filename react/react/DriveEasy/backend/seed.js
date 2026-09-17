// This file adds 8 sample cars to MongoDB the first time the server starts.
// You can also run it by yourself with:  npm run seed

const mongoose = require("mongoose");
const Car = require("./models/Car");
require("dotenv").config();

// Sample cars so the website is not empty when it starts
const sampleCars = [
  {
    name: "Toyota Innova Crysta",
    price: 3500,
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c5/Innova_Crysta_car_near_Janampeta.jpg/960px-Innova_Crysta_car_near_Janampeta.jpg",
    available: true,
  },
  {
    name: "Hyundai Creta",
    price: 2800,
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/HYUNDAI_CRETA_%2C_iX25_%28SU2%29_China_%281%29.jpg/960px-HYUNDAI_CRETA_%2C_iX25_%28SU2%29_China_%281%29.jpg",
    available: true,
  },
  {
    name: "Mahindra XUV700",
    price: 3200,
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/ba/2021_Mahindra_XUV700_2.2_AX7_%28India%29_front_view.png/960px-2021_Mahindra_XUV700_2.2_AX7_%28India%29_front_view.png",
    available: true,
  },
  {
    name: "Kia Seltos",
    price: 2600,
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/06/Kia_Seltos_IMG_9152.jpg/960px-Kia_Seltos_IMG_9152.jpg",
    available: true,
  },
  {
    name: "Maruti Suzuki Swift",
    price: 1800,
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/43/Maruti_Suzuki_Swift_4456.JPG/960px-Maruti_Suzuki_Swift_4456.JPG",
    available: true,
  },
  {
    name: "Tata Nexon",
    price: 2200,
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/88/2018_Tata_Nexon_XM.jpg/960px-2018_Tata_Nexon_XM.jpg",
    available: true,
  },
  {
    name: "Honda City",
    price: 2400,
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5c/2022_Honda_City_ZX_i-VTEC_%28India%29_front_view.jpg/960px-2022_Honda_City_ZX_i-VTEC_%28India%29_front_view.jpg",
    available: true,
  },
  {
    name: "Hyundai Verna",
    price: 2100,
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e8/HYUNDAI_VERNA_%28HYUNDAI_ACCENT%29_%28RB%2CRC%29_China_%289%29.jpg/960px-HYUNDAI_VERNA_%28HYUNDAI_ACCENT%29_%28RB%2CRC%29_China_%289%29.jpg",
    available: true,
  },
];

// Inserts the sample cars only if the Cars collection is empty
async function seedCars() {
  const count = await Car.countDocuments();

  if (count === 0) {
    await Car.insertMany(sampleCars);
    console.log("8 sample cars were added to the database.");
  } else {
    console.log("Cars already exist in the database. Skipping seed.");
  }
}

// This block runs only when you execute "node seed.js" directly
if (require.main === module) {
  mongoose
    .connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 })
    .then(async () => {
      console.log("Connected to MongoDB");
      await seedCars();
      mongoose.disconnect();
      console.log("Seeding finished.");
    })
    .catch((err) => {
      console.log("MongoDB connection error:", err.message);
      process.exit(1);
    });
}

module.exports = seedCars;