import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
interface HeaderProps {
  onMenuClick: () => void;
  isSidebarOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  isSidebarOpen,
}) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <button
            className="menu-toggle"
            onClick={onMenuClick}
            aria-label="Toggle menu"
          >
            <div className={`hamburger ${isSidebarOpen ? "active" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>

          {/* Nome do sistema */}
          <div className="system-name">
            <h1 className="system-title">Eloir</h1>
            <span className="system-subtitle">Conectando negócios</span>
          </div>
        </div>

        <nav className="header-nav">
          <Link to="/menu" className="nav-link">
            Inicio
          </Link>
          <Link to="/menu/establishments" className="nav-link">
            Estabelecimentos próximos
          </Link>
          <Link to="/menu/register-place" className="nav-link">
            Cadastrar estabelecimento
          </Link>
          <Link to="/menu/plans" className="nav-link">
            Planos
          </Link>
        </nav>

        <div className="header-right"></div>
      </div>
    </header>
  );
};
