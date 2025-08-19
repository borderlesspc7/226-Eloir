import React, { useState } from "react";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "./Layout.css";

export const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="app-layout">
      {/* Header fixo no topo */}
      <Header onMenuClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      {/* Container principal com sidebar e conteúdo */}
      <div className="layout-container">
        {/* Sidebar fixa */}
        <aside className="sidebar-fixed">
          <Sidebar isOpen={true} onClose={closeSidebar} isFixed={true} />
        </aside>

        {/* Área principal de conteúdo */}
        <main className="main-content">
          <div className="content-wrapper">
            <Outlet />
          </div>
        </main>

        {/* Sidebar mobile (overlay) */}
        <div className="sidebar-mobile">
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={closeSidebar}
            isFixed={false}
          />
        </div>
      </div>
    </div>
  );
};
