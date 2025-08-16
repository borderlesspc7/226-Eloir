"use client";

import "./PlanSelection.css";

interface Plan {
  id: string;
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}

interface PlanSelectorProps {
  selectedPlan: string;
  onChange: (planId: string) => void;
  error?: string;
}

const plans: Plan[] = [
  {
    id: "plus",
    name: "Plus",
    price: "R$ 29,90/mês",
    features: ["Até 50 produtos", "Suporte básico", "Estatísticas simples"],
  },
  {
    id: "premium",
    name: "Premium",
    price: "R$ 59,90/mês",
    features: [
      "Até 200 produtos",
      "Suporte prioritário",
      "Estatísticas avançadas",
      "Destaque na busca",
    ],
    popular: true,
  },
  {
    id: "gold",
    name: "Gold",
    price: "R$ 99,90/mês",
    features: [
      "Produtos ilimitados",
      "Suporte 24/7",
      "Analytics completo",
      "Posição premium",
      "API personalizada",
    ],
  },
  {
    id: "max",
    name: "Max",
    price: "R$ 199,90/mês",
    features: [
      "Tudo do Gold",
      "Gerente dedicado",
      "Integração personalizada",
      "Relatórios customizados",
      "Suporte técnico",
    ],
  },
];

export function PlanSelector({
  selectedPlan,
  onChange,
  error,
}: PlanSelectorProps) {
  return (
    <div className="plan-selector-container">
      <div className="plan-selector-grid">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`plan-selector-card ${
              selectedPlan === plan.id ? "plan-selector-selected" : ""
            } ${plan.popular ? "plan-selector-popular" : ""}`}
            onClick={() => onChange(plan.id)}
          >
            {plan.popular && (
              <div className="plan-selector-popular-badge">Mais Popular</div>
            )}

            <div className="plan-selector-header">
              <h4 className="plan-selector-name">{plan.name}</h4>
              <div className="plan-selector-price">{plan.price}</div>
            </div>

            <ul className="plan-selector-features">
              {plan.features.map((feature, index) => (
                <li key={index} className="plan-selector-feature">
                  <svg
                    className="plan-selector-check"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M13.5 4.5L6 12L2.5 8.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="plan-selector-radio">
              <input
                type="radio"
                name="plan"
                value={plan.id}
                checked={selectedPlan === plan.id}
                onChange={() => onChange(plan.id)}
                className="plan-selector-radio-input"
              />
              <div className="plan-selector-radio-custom"></div>
            </div>
          </div>
        ))}
      </div>

      {error && <span className="plan-selector-error-message">{error}</span>}
    </div>
  );
}
