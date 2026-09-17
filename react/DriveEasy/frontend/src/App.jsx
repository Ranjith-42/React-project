import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import About from "./pages/About";

// Small page shown when a URL does not match any route
function NotFound() {
  return (
    <div className="not-found">
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">
        Go to Home
      </Link>
    </div>
  );
}

// The App component is the outer layout: Navbar on top, the current
// page in the middle, and the Footer at the bottom.
export default function App() {
  return (
    <div className="app">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking/:carId" element={<Booking />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}