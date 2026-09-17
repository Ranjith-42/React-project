import axios from "axios";

// URL of the backend server. The backend must be running on port 5000.
const API_URL = "http://localhost:5000/api";

const api = axios.create({ baseURL: API_URL });

// Returns a friendly error message from an axios error
export function getApiError(err) {
  if (err && err.response && err.response.data && err.response.data.message) {
    return err.response.data.message;
  }
  return "Something went wrong. Please try again.";
}

// ---------- Car API calls ----------
export const getCars = () => api.get("/cars");

// ---------- Booking API calls ----------
export const createBooking = (bookingData) => api.post("/bookings", bookingData);
export const getBookings = () => api.get("/bookings");

// ---------- Auth API calls ----------
export const registerUser = (userData) => api.post("/auth/register", userData);
export const loginUser = (userData) => api.post("/auth/login", userData);

export default api;