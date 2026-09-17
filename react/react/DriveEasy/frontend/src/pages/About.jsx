import { Link } from "react-router-dom";

// Static page: tells visitors about our showroom and how to reach us
export default function About() {
  return (
    <div className="page">
      <h1 className="page-title">About Our Showroom</h1>
      <p className="page-subtitle">
        DriveEasy is a trusted car rental showroom offering clean,
        well-maintained cars at honest prices.
      </p>

      {/* ---------- Our story ---------- */}
      <div className="about-intro">
        <p>
          DriveEasy started with one simple idea: renting a car should be as
          easy as buying a movie ticket. What began as a small family showroom
          with just three cars has grown into a trusted rental business
          serving customers across the city.
        </p>
        <p>
          Every car in our fleet is regularly serviced, deep-cleaned before
          each trip, and inspected by our own mechanics. With transparent
          pricing and no hidden charges, you always know exactly what you are
          paying for.
        </p>
      </div>

      {/* ---------- Quick numbers ---------- */}
      <div className="about-stats">
        <div className="about-stat">
          <span className="about-stat-number">50+</span>
          <span className="about-stat-label">Cars in our fleet</span>
        </div>
        <div className="about-stat">
          <span className="about-stat-number">1,200+</span>
          <span className="about-stat-label">Happy customers</span>
        </div>
        <div className="about-stat">
          <span className="about-stat-number">10+</span>
          <span className="about-stat-label">Years of service</span>
        </div>
        <div className="about-stat">
          <span className="about-stat-number">24/7</span>
          <span className="about-stat-label">Customer support</span>
        </div>
      </div>

      {/* ---------- Showroom details ---------- */}
      <div className="showroom-card">
        <h2>Visit Our Showroom</h2>
        <div className="info-list">
          <div className="info-item">
            <div className="info-icon">📍</div>
            <div>
              <h3>Address</h3>
              <p>
                No. 42, Ground Floor, MG Road,
                <br />
                Bengaluru, Karnataka – 560001
              </p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">📞</div>
            <div>
              <h3>Phone</h3>
              <p>
                <a href="tel:+919876543210">+91 98765 43210</a>
              </p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">✉️</div>
            <div>
              <h3>Email</h3>
              <p>
                <a href="mailto:hello@driveeasy.in">hello@driveeasy.in</a>
              </p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">🕘</div>
            <div>
              <h3>Opening Hours</h3>
              <p>Monday – Saturday: 9:00 AM – 8:00 PM</p>
              <p>Sunday: 10:00 AM – 5:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      <div className="about-cta">
        <Link to="/cars" className="btn btn-primary btn-large">
          Browse Our Cars
        </Link>
      </div>
    </div>
  );
}