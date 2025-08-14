import "./Logo.css";

export function Logo() {
  return (
    <div className="logo-container">
      <div className="logo-icon">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="48"
            height="48"
            rx="12"
            fill="currentColor"
            fillOpacity="0.1"
          />
          <path
            d="M24 8L36 16V32L24 40L12 32V16L24 8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M24 16L30 20V28L24 32L18 28V20L24 16Z" fill="currentColor" />
          <circle cx="24" cy="24" r="3" fill="white" />
        </svg>
      </div>
      <div className="logo-text">
        <h1 className="logo-title">Eloir</h1>
        <p className="logo-tagline">Conectando negócios</p>
      </div>
    </div>
  );
}
