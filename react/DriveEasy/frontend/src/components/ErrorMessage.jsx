// Shows an error message in red. Renders nothing when there is no error.
export default function ErrorMessage({ message }) {
  if (!message) {
    return null;
  }
  return <div className="error-message">{message}</div>;
}