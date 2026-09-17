import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, getApiError } from "../services/api";
import ErrorMessage from "../components/ErrorMessage";

// Login page: checks the email and password against the database.
// On success the session is saved in localStorage and App is told who logged in.
export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    loginUser({ email: email.trim(), password })
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
        <h1>Welcome Back 👋</h1>
        <p className="auth-subtitle">
          Log in to your DriveEasy account.
        </p>

        {error && <ErrorMessage message={error} />}

        <form className="auth-form" onSubmit={handleSubmit}>
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
              placeholder="Your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-switch">
          New to DriveEasy? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}