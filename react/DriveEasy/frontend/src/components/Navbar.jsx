import { NavLink } from "react-router-dom";

// Navigation bar shown on every page
export default function Navbar() {
  // Helper to add an "active" class to the current page link
  const linkClass = ({ isActive }) =>
    "nav-link" + (isActive ? " active" : "");

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        🚗 AAA
      </NavLink>

      <div className="navbar-links">
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/cars" className={linkClass}>
          Cars
        </NavLink>
        <NavLink to="/booking" className={linkClass}>
          Book a Car
        </NavLink>
        <NavLink to="/my-bookings" className={linkClass}>
          My Bookings
        </NavLink>
        <NavLink to="/about" className={linkClass}>
          About
        </NavLink>
      </div>
    </nav>
  );
}