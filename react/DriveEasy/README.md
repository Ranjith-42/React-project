# 🚗 DriveEasy – Car Booking Website

DriveEasy is a simple full-stack **Car Booking Website** built as a college project.
Customers can browse cars, book a car with pickup/return dates, and see all
saved bookings. An **About page** shares the showroom story, contact details
and opening hours.

The project is intentionally kept **simple and beginner-friendly** –
plain JavaScript, simple CSS, and no complicated architecture.

---

## ✨ Features

- **Home page** – hero section with a big car image, "Browse Cars" button,
  popular cars, and a "Why Choose Us" section.
- **Cars page** – all cars shown as responsive cards with image, name,
  price per day, availability, and a **Book Now** button. Search by car name.
- **Booking page** – customer name, phone, car, pickup date and return date.
  The total days and total price are calculated live. A booking ID is
  generated after confirmation.
- **My Bookings page** – shows every booking saved in MongoDB with
  booking ID, customer, car, dates, days, total price, and status.
- **About page** – showroom story, quick stats, address, phone, email, and
  opening hours.
- **Sample data** – 8 demo cars are inserted automatically the first time
  the backend starts.
- **Fully responsive** – works on desktop, tablet, and mobile.

---

## 🧰 Technologies

| Part | Technology |
| --- | --- |
| Frontend | React.js, Vite, JavaScript (JSX), CSS, React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| Other | CORS, dotenv |

---

## 📁 Folder Structure

```text
DriveEasy/
│
├── frontend/                 # React + Vite app
│   ├── src/
│   │   ├── components/       # Navbar, Footer, CarCard, Loading, ErrorMessage
│   │   ├── pages/            # Home, Cars, Booking, MyBookings, About
│   │   ├── services/         # api.js (all Axios API calls)
│   │   ├── App.jsx           # App layout + routes
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # All styles
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── backend/                  # Express + MongoDB API
    ├── models/               # Car.js, Booking.js (Mongoose schemas)
    ├── routes/               # cars.js, bookings.js
    ├── server.js             # Server + MongoDB connection
    ├── seed.js               # Adds the 8 sample cars
    ├── .env                  # Environment variables
    └── package.json
```

---

## 🛠 Requirements

- **Node.js** (version 16 or newer) – https://nodejs.org
- **MongoDB** Community Server – https://www.mongodb.com/try/download/community

---

## 📦 MongoDB Setup

1. Install MongoDB Community Server on your computer.
2. Make sure the MongoDB service is running:

   ```bash
   mongod
   ```

   On Windows, MongoDB usually starts automatically as a service after install.
3. The backend connects to `mongodb://127.0.0.1:27017/driveeasy`
   (set in `backend/.env`). The database name is `driveeasy`.

> The first time the backend starts, it automatically adds **8 sample cars**
> to the database so the website is not empty.

---

## ▶️ How to Run

Open **two** terminal windows.

### 1. Backend (terminal 1)

```bash
cd backend
npm install
npm run server
```

Expected output:

```text
Connected to MongoDB
8 sample cars were added to the database.
DriveEasy server running on http://localhost:5000
```

### 2. Frontend (terminal 2)

```bash
cd frontend
npm install
npm run dev
```

Then open **http://localhost:5173** in your browser.

---

## 🧭 Demo Flow (try this)

1. Open the **Home** page and click **Browse Cars**.
2. On the **Cars** page, click **Book Now** on any car.
3. Fill in your name, phone, pickup date, and return date.
4. Watch the **Total days** and **Total amount** update live.
5. Click **Confirm Booking** – a booking ID is shown and the booking is
   saved in MongoDB.
6. Open **My Bookings** to see the saved booking.
7. Open **About** to see the showroom address, contact details and opening hours.

---

## 🔌 API Endpoints

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/cars` | Get all cars |
| POST | `/api/cars` | Add a new car (still in the backend; no longer used by the UI) |
| DELETE | `/api/cars/:id` | Delete a car (still in the backend; no longer used by the UI) |
| POST | `/api/bookings` | Create a new booking |
| GET | `/api/bookings` | Get all bookings |

**POST /api/bookings** expects JSON:

```json
{
  "customerName": "Ravi Kumar",
  "phone": "9876543210",
  "carId": "6649f2c0b8c9662f2207b57e",
  "pickupDate": "2026-09-15",
  "returnDate": "2026-09-18"
}
```

The backend calculates `totalDays` and `totalPrice` automatically
(price per day × number of days).

---

## 🚗 Sample Cars

The following 8 demo cars are added automatically on the first start:

1. Toyota Innova Crysta – ₹3,500/day
2. Hyundai Creta – ₹2,800/day
3. Mahindra XUV700 – ₹3,200/day
4. Kia Seltos – ₹2,600/day
5. Maruti Suzuki Swift – ₹1,800/day
6. Tata Nexon – ₹2,200/day
7. Honda City – ₹2,400/day
8. Hyundai Verna – ₹2,100/day

All prices are **demo prices only**. Car images are loaded from the internet
(Wikimedia Commons). If an image cannot load, a fallback image is shown
automatically.

---

## 📸 Screenshots

Add your own screenshots here before submitting the project, for example:

```text
Screenshot 1: Home page
Screenshot 2: Cars page
Screenshot 3: Booking form
Screenshot 4: My Bookings
Screenshot 5: About page
```

---

## 🧹 Notes for the Submission

- This project has **no login/password system** – it is a database demo that
  focuses on the full booking flow. For a real website you would add
  authentication (e.g. JWT) and per-user bookings.
- The CORS setting in `backend/server.js` allows all origins for simplicity.
  For production, restrict it to your frontend URL only.
- The image URLs in `backend/seed.js` need internet access the first time
  the images are shown in the browser.

---

## 🔮 Future Improvements

- User registration and login (JWT authentication)
- Each user sees only their own bookings
- Cancel and update booking status (Completed / Cancelled)
- Booking edit and invoice/PDF download
- Car filters (brand, fuel type, seats) and car details page
- Photo upload for new cars
- Deploy the backend (Render/Railway) and frontend (Vercel/Netlify)