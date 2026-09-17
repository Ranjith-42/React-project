import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, getApiError } from "../services/api";
import ErrorMessage from "../components/ErrorMessage";

// Registration page: creates a new account and logs the user in right away.
export default function Register({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please fill in all the fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("The two passwords do not match.");
      return;
    }

    setLoading(true);
    registerUser({ name: name.trim(), email: email.trim(), password })
      .then((response) => {
        localStorage.setItem("driveeasy-user", JSON.stringify(response.data.user));
        localStorage.setItem("driveeasy-token", response.data.token);
        onLogin(response.data.user);
        navigate("/");
      })
      .catch((err) => setError(getApiError(err)))
      .finally(() => setLoading(false));
  }

  return (
    <div className="page">
      <div className="auth-card">
        <h1>Create Your Account</h1>
        <p className="auth-subtitle">
          Join DriveEasy and book your perfect car in a few clicks.
        </p>

        {error && <ErrorMessage message={error} />}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="form-label">
            Full Name
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Ravi Kumar"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>

          <label className="form-label">
            Email
            <input
              type="email"
              className="form-input"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <label className="form-label">
            Password
            <input
              type="password"
              className="form-input"
              placeholder="At least 6 characters"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          <label className="form-label">
            Confirm Password
            <input
              type="password"
              className="form-input"
              placeholder="Type the password again"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </label>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}