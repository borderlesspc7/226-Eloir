import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import {
  FaHome,
  FaStore,
  FaPlus,
  FaUser,
  FaTimes,
  FaUserCircle,
  FaCrown,
} from "react-icons/fa";
import { useAuth } from "../../../hooks/useAuth";

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
  isFixed?: boolean;
}

interface MenuItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
  {
    href: "/menu",
    label: "Início",
    icon: <FaHome />,
  },
  {
    href: "/menu/establishments",
    label: "Estabelecimentos próximos",
    icon: <FaStore />,
  },
  {
    href: "/menu/register-place",
    label: "Cadastrar estabelecimento",
    icon: <FaPlus />,
  },
  {
    href: "/menu/meus-estabelecimentos",
    label: "Meus estabelecimentos",
    icon: <FaStore />,
  },
  {
    href: "/menu/plans",
    label: "Planos",
    icon: <FaCrown />,
  },
  {
    href: "/menu/profile",
    label: "Perfil",
    icon: <FaUser />,
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  isFixed = false,
}) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      if (onClose) onClose();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <>
      {isOpen && !isFixed && (
        <div className="sidebar-overlay" onClick={onClose} />
      )}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">Menu</h2>
          {!isFixed && (
            <button
              className="sidebar-close"
              onClick={onClose}
              aria-label="Fechar menu"
            >
              <FaTimes />
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            {menuItems.map((item) => (
              <li key={item.href} className="sidebar-menu-item">
                <Link
                  to={item.href}
                  className={`sidebar-link ${
                    location.pathname === item.href ? "active" : ""
                  }`}
                  onClick={onClose}
                >
                  <span className="sidebar-icon">{item.icon}</span>
                  <span className="sidebar-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="user-avatar">
              <FaUserCircle size={32} />
            </div>
            <div className="user-info">
              <div className="user-name">
                {user?.displayName || user?.email?.split("@")[0] || "Usuário"}
              </div>
              <div className="user-email">
                {user?.email || "usuario@email.com"}
              </div>
            </div>
          </div>
          <button className="sidebar-logout" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </aside>
    </>
  );
};
