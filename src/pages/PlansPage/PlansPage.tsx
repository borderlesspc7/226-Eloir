import React from "react";
import "./PlansPage.css";
import { FaCheck, FaCrown, FaRocket, FaStar } from "react-icons/fa";

const PlansPage: React.FC = () => {
  return (
    <div className="plans-page">
      <div className="plans-header">
        <h1>Escolha o Plano Ideal</h1>
        <p>
          Selecione o plano que melhor se adequa ao seu negócio e maximize sua
          presença online
        </p>
      </div>

      <div className="plans-container">
        {/* Plano Básico */}
        <div className="plan-card basic">
          <div className="plan-header">
            <div className="plan-icon">
              <FaStar size={32} />
            </div>
            <h3>Básico</h3>
            <div className="plan-price">
              <span className="currency">R$</span>
              <span className="amount">29</span>
              <span className="period">/mês</span>
            </div>
          </div>

          <div className="plan-features">
            <div className="feature">
              <FaCheck className="check-icon" />
              <span>Cadastro do estabelecimento</span>
            </div>
            <div className="feature">
              <FaCheck className="check-icon" />
              <span>Informações de contato</span>
            </div>
            <div className="feature">
              <FaCheck className="check-icon" />
              <span>Horário de funcionamento</span>
            </div>
            <div className="feature">
              <FaCheck className="check-icon" />
              <span>Até 5 produtos/serviços</span>
            </div>
            <div className="feature">
              <FaCheck className="check-icon" />
              <span>Suporte básico</span>
            </div>
          </div>

          <button className="plan-button">Escolher Plano</button>
        </div>

        {/* Plano Premium */}
        <div className="plan-card premium recommended">
          <div className="recommended-badge">Recomendado</div>
          <div className="plan-header">
            <div className="plan-icon">
              <FaCrown size={32} />
            </div>
            <h3>Premium</h3>
            <div className="plan-price">
              <span className="currency">R$</span>
              <span className="amount">59</span>
              <span className="period">/mês</span>
            </div>
          </div>

          <div className="plan-features">
            <div className="feature">
              <FaCheck className="check-icon" />
              <span>Tudo do plano Básico</span>
            </div>
            <div className="feature">
              <FaCheck className="check-icon" />
              <span>Até 20 produtos/serviços</span>
            </div>
            <div className="feature">
              <FaCheck className="check-icon" />
              <span>Galeria de fotos (10 fotos)</span>
            </div>
            <div className="feature">
              <FaCheck className="check-icon" />
              <span>Destaque na busca</span>
            </div>
            <div className="feature">
              <FaCheck className="check-icon" />
              <span>Analytics básico</span>
            </div>
            <div className="feature">
              <FaCheck className="check-icon" />
              <span>Suporte prioritário</span>
            </div>
          </div>

          <button className="plan-button">Escolher Plano</button>
        </div>

        {/* Plano Pro */}
        <div className="plan-card pro">
          <div className="plan-header">
            <div className="plan-icon">
              <FaRocket size={32} />
            </div>
            <h3>Profissional</h3>
            <div className="plan-price">
              <span className="currency">R$</span>
              <span className="amount">99</span>
              <span className="period">/mês</span>
            </div>
          </div>

          <div className="plan-features">
            <div className="feature">
              <FaCheck className="check-icon" />
              <span>Tudo do plano Premium</span>
            </div>
            <div className="feature">
              <FaCheck className="check-icon" />
              <span>Produtos/serviços ilimitados</span>
            </div>
            <div className="feature">
              <FaCheck className="check-icon" />
              <span>Galeria ilimitada</span>
            </div>
            <div className="feature">
              <FaCheck className="check-icon" />
              <span>Destaque premium</span>
            </div>
            <div className="feature">
              <FaCheck className="check-icon" />
              <span>Analytics avançado</span>
            </div>
            <div className="feature">
              <FaCheck className="check-icon" />
              <span>API personalizada</span>
            </div>
            <div className="feature">
              <FaCheck className="check-icon" />
              <span>Suporte 24/7</span>
            </div>
          </div>

          <button className="plan-button">Escolher Plano</button>
        </div>
      </div>

      <div className="plans-footer">
        <h3>Todos os planos incluem:</h3>
        <div className="common-features">
          <div className="common-feature">
            <FaCheck className="check-icon" />
            <span>Página personalizada do estabelecimento</span>
          </div>
          <div className="common-feature">
            <FaCheck className="check-icon" />
            <span>Localização no mapa</span>
          </div>
          <div className="common-feature">
            <FaCheck className="check-icon" />
            <span>Integração com redes sociais</span>
          </div>
          <div className="common-feature">
            <FaCheck className="check-icon" />
            <span>Atualizações automáticas</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansPage;
