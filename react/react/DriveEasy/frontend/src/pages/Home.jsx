import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCars } from "../services/api";
import CarCard, { FALLBACK_IMAGE } from "../components/CarCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

// Large picture used in the hero section on top of the page
const HERO_IMAGE =
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/ba/2021_Mahindra_XUV700_2.2_AX7_%28India%29_front_view.png/960px-2021_Mahindra_XUV700_2.2_AX7_%28India%29_front_view.png";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch cars from the backend when the page opens
  useEffect(() => {
    getCars()
      .then((response) => setCars(response.data))
      .catch(() =>
        setError("Could not load cars. Make sure the backend server is running.")
      )
      .finally(() => setLoading(false));
  }, []);

  // Show only the first 4 cars in the "Popular Cars" section
  const popularCars = cars.slice(0, 4);

  function handleHeroImageError(event) {
    event.target.src = FALLBACK_IMAGE;
  }

  return (
    <div className="home-page">
      {/* ---------- Hero section ---------- */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Perfect Car</h1>
          <p className="hero-text">
            DriveEasy makes car booking simple, fast and affordable.
            Choose from our collection of clean, well-maintained cars
            and book it in just a few clicks.
          </p>
          <Link to="/cars" className="btn btn-primary btn-large">
            Browse Cars
          </Link>
        </div>
        <div className="hero-image">
          <img
            src={HERO_IMAGE}
            alt="A clean SUV available for rent"
            onError={handleHeroImageError}
          />
        </div>
      </section>

      {/* ---------- Popular Cars section ---------- */}
      <section className="section">
        <h2 className="section-title">Popular Cars</h2>

        {loading && <Loading />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && popularCars.length === 0 && (
          <p className="empty-message">
            No cars available yet. Please check back soon.
          </p>
        )}

        {!loading && !error && popularCars.length > 0 && (
          <div className="car-grid">
            {popularCars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        )}

        {!loading && !error && (
          <Link to="/cars" className="btn btn-primary btn-block">
            View All Cars
          </Link>
        )}
      </section>

      {/* ---------- Why Choose Us section ---------- */}
      <section className="section features">
        <h2 className="section-title">Why Choose DriveEasy?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">₹</div>
            <h3>Affordable Prices</h3>
            <p>Transparent per-day pricing with no hidden charges.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Easy Booking</h3>
            <p>Pick your dates, see the total instantly, and confirm in seconds.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Well-Maintained Cars</h3>
            <p>Every car is cleaned, serviced and ready for your trip.</p>
          </div>
        </div>
      </section>
    </div>
  );
}