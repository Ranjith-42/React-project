import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBookings, getApiError } from "../services/api";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

// Formats a date like  12 Sep 2026
function formatDate(value) {
  const date = new Date(value);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Shows the bookings saved in MongoDB (newest first)
export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all bookings when the page opens
  useEffect(() => {
    getBookings()
      .then((response) => setBookings(response.data))
      .catch((err) => setError(getApiError(err)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <h1 className="page-title">My Bookings</h1>
      <p className="page-subtitle">Here are all the bookings saved in the database.</p>

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && bookings.length === 0 && (
        <p className="empty-message">
          No bookings yet.{" "}
          <Link to="/cars">Browse cars</Link> and make your first booking!
        </p>
      )}

      {!loading && !error && bookings.length > 0 && (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Car</th>
                <th>Pickup</th>
                <th>Return</th>
                <th>Days</th>
                <th>Total Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="booking-id">BK-{booking._id.slice(-6).toUpperCase()}</td>
                  <td>{booking.customerName}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.car ? booking.car.name : "—"}</td>
                  <td>{formatDate(booking.pickupDate)}</td>
                  <td>{formatDate(booking.returnDate)}</td>
                  <td>{booking.totalDays}</td>
                  <td>₹{booking.totalPrice.toLocaleString("en-IN")}</td>
                  <td>
                    <span className={`badge ${booking.status === "Confirmed" ? "badge-green" : "badge-gray"}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}