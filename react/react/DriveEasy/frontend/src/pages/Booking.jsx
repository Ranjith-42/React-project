import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCars, createBooking, getApiError } from "../services/api";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

// Number of days between the pickup and return date (minimum 1 day)
function calculateDays(pickup, ret) {
  if (!pickup || !ret) return 0;
  const diff = new Date(ret) - new Date(pickup);
  return Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)));
}

// Page where a customer fills in their details and books a car
export default function Booking() {
  const { carId } = useParams(); // carId comes from the URL /booking/:carId

  const [cars, setCars] = useState([]);
  const [loadingCars, setLoadingCars] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [selectedCarId, setSelectedCarId] = useState(carId || "");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(null);

  // Load all cars once when the page opens (for the dropdown)
  useEffect(() => {
    getCars()
      .then((response) => setCars(response.data))
      .catch((err) => setLoadError(getApiError(err)))
      .finally(() => setLoadingCars(false));
  }, []);

  // If the user clicks "Book Now" on another car while already on this page
  useEffect(() => {
    if (carId) {
      setSelectedCarId(carId);
    }
  }, [carId]);

  // The car that is currently selected in the dropdown
  const selectedCar = cars.find((car) => car._id === selectedCarId);

  // Live calculation of total days and total amount
  const totalDays = calculateDays(pickupDate, returnDate);
  const totalPrice = selectedCar ? totalDays * selectedCar.price : 0;

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    // ---------- Validation ----------
    if (!customerName.trim()) {
      return setError("Please enter your name.");
    }
    if (!/^[0-9]{10}$/.test(phone)) {
      return setError("Please enter a valid 10-digit phone number.");
    }
    if (!selectedCar) {
      return setError("Please select a car.");
    }
    if (!selectedCar.available) {
      return setError("Sorry, this car is not available.");
    }
    if (!pickupDate || !returnDate) {
      return setError("Please select pickup and return dates.");
    }
    if (new Date(returnDate) < new Date(pickupDate)) {
      return setError("Return date cannot be before pickup date.");
    }
    // Today's date in YYYY-MM-DD format (dates can be compared like text)
    const today = new Date().toISOString().slice(0, 10);
    if (pickupDate < today) {
      return setError("Pickup date cannot be in the past.");
    }

    // ---------- Send the booking to the backend ----------
    setSubmitting(true);
    createBooking({
      customerName,
      phone,
      carId: selectedCarId,
      pickupDate,
      returnDate,
    })
      .then((response) => {
        // Save the important booking information for the success screen
        setConfirmed({
          id: response.data._id,
          carName: selectedCar.name,
          totalDays: response.data.totalDays,
          totalPrice: response.data.totalPrice,
        });
      })
      .catch((err) => setError(getApiError(err)))
      .finally(() => setSubmitting(false));
  }

  // ---------- Success screen after booking ----------
  if (confirmed) {
    return (
      <div className="page">
        <div className="success-panel">
          <div className="success-icon">✅</div>
          <h1>Booking Confirmed!</h1>
          <p>
            Your booking ID is{" "}
            <strong className="booking-id">{confirmed.id}</strong>
          </p>
          <p>Car: <strong>{confirmed.carName}</strong></p>
          <p>
            Total: <strong>{confirmed.totalDays} day(s)</strong> –{" "}
            <strong>₹{confirmed.totalPrice.toLocaleString("en-IN")}</strong>
          </p>
          <div className="success-actions">
            <Link to="/my-bookings" className="btn btn-primary">
              View My Bookings
            </Link>
            <Link to="/cars" className="btn btn-secondary">
              Book Another Car
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ---------- Booking form ----------
  return (
    <div className="page">
      <h1 className="page-title">Book Your Car</h1>
      <p className="page-subtitle">
        Fill in your details and pick the dates for your trip.
      </p>

      {loadingCars && <Loading text="Loading cars..." />}
      {loadError && <ErrorMessage message={loadError} />}

      {!loadingCars && !loadError && (
        <form className="booking-form" onSubmit={handleSubmit}>
          <ErrorMessage message={error} />

          {/* Select a car */}
          <label className="form-label">
            Select Car
            <select
              className="form-input"
              value={selectedCarId}
              onChange={(event) => setSelectedCarId(event.target.value)}
            >
              <option value="">-- Choose a car --</option>
              {cars.map((car) => (
                <option key={car._id} value={car._id}>
                  {car.name} – ₹{car.price.toLocaleString("en-IN")} / day
                  {car.available ? "" : " (Not Available)"}
                </option>
              ))}
            </select>
          </label>

          {/* Customer details */}
          <label className="form-label">
            Customer Name
            <input
              type="text"
              className="form-input"
              placeholder="Enter your full name"
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
            />
          </label>

          <label className="form-label">
            Phone Number
            <input
              type="tel"
              className="form-input"
              placeholder="10-digit mobile number"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </label>

          {/* Dates */}
          <label className="form-label">
            Pickup Date
            <input
              type="date"
              className="form-input"
              value={pickupDate}
              onChange={(event) => setPickupDate(event.target.value)}
            />
          </label>

          {/* Return date can never be before pickup date */}
          <label className="form-label">
            Return Date
            <input
              type="date"
              className="form-input"
              value={returnDate}
              min={pickupDate}
              onChange={(event) => setReturnDate(event.target.value)}
            />
          </label>

          {/* Price summary */}
          <div className="price-summary">
            <div className="price-row">
              <span>Price per day</span>
              <span>
                {selectedCar
                  ? "₹" + selectedCar.price.toLocaleString("en-IN")
                  : "—"}
              </span>
            </div>
            <div className="price-row">
              <span>Total days</span>
              <span>{pickupDate && returnDate ? totalDays : "—"}</span>
            </div>
            <div className="price-row price-total">
              <span>Total amount</span>
              <span>
                {totalPrice > 0 ? "₹" + totalPrice.toLocaleString("en-IN") : "—"}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block btn-large"
            disabled={submitting}
          >
            {submitting ? "Booking..." : "Confirm Booking"}
          </button>
        </form>
      )}
    </div>
  );
}