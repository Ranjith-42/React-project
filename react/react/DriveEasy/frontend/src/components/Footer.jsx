import { Link } from "react-router-dom";

// Footer shown on every page
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="footer-logo">🚗 DriveEasy</span>
          <p>Rent your perfect car in a few clicks.</p>
        </div>

        <div className="footer-links">
          <span className="footer-heading">Quick Links</span>
          <Link to="/">Home</Link>
          <Link to="/cars">Cars</Link>
          <Link to="/booking">Book a Car</Link>
          <Link to="/my-bookings">My Bookings</Link>
          <Link to="/about">About Us</Link>
        </div>
      </div>

      <p className="footer-copy">
        © 2026 AAA – Car Booking Website 
      </p>
    </footer>
  );
}