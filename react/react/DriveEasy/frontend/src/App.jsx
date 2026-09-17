import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
// It also keeps track of the logged-in user (saved in localStorage).
export default function App() {
  // Read the saved user when the app starts (null if nobody is logged in)
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("driveeasy-user"));
    } catch {
      return null;
    }
  });

  // Called by the Login and Register pages after a successful request
  function handleLogin(loggedInUser) {
    setUser(loggedInUser);
  }

  // Clears the saved session
  function handleLogout() {
    localStorage.removeItem("driveeasy-user");
    localStorage.removeItem("driveeasy-token");
    setUser(null);
  }

  return (
    <div className="app">
      <Navbar user={user} onLogout={handleLogout} />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking/:carId" element={<Booking />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onLogin={handleLogin} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}