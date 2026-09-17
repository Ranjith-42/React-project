// Simple loading indicator used while API requests are running
export default function Loading({ text = "Loading..." }) {
  return (
    <div className="loading">
      <span className="spinner"></span>
      <p>{text}</p>
    </div>
  );
}