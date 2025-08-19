import "./HomePage.css";
import { FaStore, FaPlus, FaStar, FaUser } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Bem-vindo ao seu painel</h1>
        <p className="dashboard-subtitle">
          Gerencie seus serviços e encontre estabelecimentos próximos
        </p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-icon">
            <FaStore size={48} />
          </div>
          <h3>Estabelecimentos Próximos</h3>
          <p>Encontre comércios, serviços e indústrias na sua região</p>
          <button className="card-button">Ver Estabelecimentos</button>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">
            <FaPlus size={48} />
          </div>
          <h3>Cadastrar Estabelecimento</h3>
          <p>Registre seu negócio na nossa plataforma</p>
          <button className="card-button">Cadastrar Agora</button>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">
            <FaStar size={48} />
          </div>
          <h3>Meus Favoritos</h3>
          <p>Acesse rapidamente seus estabelecimentos favoritos</p>
          <button className="card-button">Ver Favoritos</button>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">
            <FaUser size={48} />
          </div>
          <h3>Meu Perfil</h3>
          <p>Gerencie suas informações pessoais</p>
          <button className="card-button">Editar Perfil</button>
        </div>
      </div>
    </div>
  );
}
