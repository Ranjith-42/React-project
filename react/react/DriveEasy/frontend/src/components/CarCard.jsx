import { Link } from "react-router-dom";

// If a car image fails to load, we show this simple fallback image instead
export const FALLBACK_IMAGE =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">' +
      '<rect width="100%" height="100%" fill="#dceaff"/>' +
      '<text x="50%" y="46%" font-size="60" text-anchor="middle">🚗</text>' +
      '<text x="50%" y="62%" font-size="22" text-anchor="middle" fill="#1668b8" font-family="sans-serif">Car Image Unavailable</text>' +
      "</svg>"
  );

// One car shown as a card (used on the Home and Cars pages)
export default function CarCard({ car }) {
  // Called if the image URL does not load -> swap in the fallback image
  function handleImageError(event) {
    event.target.src = FALLBACK_IMAGE;
  }

  return (
    <div className={"car-card" + (car.available ? "" : " car-card-disabled")}>
      <div className="car-card-image">
        <img src={car.image} alt={car.name} onError={handleImageError} />
        {!car.available && <span className="car-not-available">Not Available</span>}
      </div>

      <div className="car-card-body">
        <h3 className="car-card-name">{car.name}</h3>
        <p className="car-card-price">
          ₹{car.price.toLocaleString("en-IN")}
          <span className="car-card-per-day"> / day</span>
        </p>

        {car.available ? (
          <Link to={"/booking/" + car._id} className="btn btn-primary btn-block">
            Book Now
          </Link>
        ) : (
          <button className="btn btn-block" disabled>
            Not Available
          </button>
        )}
      </div>
    </div>
  );
}