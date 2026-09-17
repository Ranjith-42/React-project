import { useEffect, useState } from "react";
import { getCars } from "../services/api";
import CarCard from "../components/CarCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

// Page that shows all cars as cards, with a simple search box
export default function Cars() {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all cars when the page opens
  useEffect(() => {
    getCars()
      .then((response) => setCars(response.data))
      .catch(() =>
        setError("Could not load cars. Make sure the backend server is running.")
      )
      .finally(() => setLoading(false));
  }, []);

  // Filter cars by the text typed in the search box
  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <h1 className="page-title">Our Cars</h1>
      <p className="page-subtitle">Choose a car and book it for your next trip.</p>

      {/* Search box */}
      <input
        type="text"
        className="search-input"
        placeholder="Search by car name..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && filteredCars.length === 0 && (
        <p className="empty-message">No cars match your search.</p>
      )}

      {!loading && !error && filteredCars.length > 0 && (
        <div className="car-grid">
          {filteredCars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}