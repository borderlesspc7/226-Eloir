import { TextInput } from "../../components/ui/TextInput/TextInput";
import { Button } from "../../components/ui/Button/Button";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import { paths } from "../../routes/paths";
import { Logo } from "../../components/ui/Logo/Logo";
import { useNavigation } from "../../hooks/useNavigation";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function LoginPage() {
  const { goTo } = useNavigation();
  const { login, user, loading, error, clearError } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      goTo(paths.menu);
    }
  }, [user, goTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="form-section">
          <div className="form-wrapper">
            <h1 className="form-title">Entrar na sua conta</h1>
            <p className="form-subtitle">
              Conecte-se aos melhores servicos locais
            </p>

            <form className="login-form" onSubmit={handleSubmit}>
              <TextInput
                type="email"
                placeholder="Seu e-mail"
                label="E-mail"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) clearError();
                }}
              />
              <TextInput
                type="password"
                placeholder="Sua senha"
                label="Senha"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) clearError();
                }}
              />

              <div className="forgot-link">
                <a href="/forgot-password">Esqueceu sua senha?</a>
              </div>

              {error && <div className="form-error">{error}</div>}

              <Button type="submit" fullWidth loading={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </Button>

              <div className="register-link">
                <span>Não tem uma conta?</span>
                <Link to={paths.register}>Registre-se</Link>
              </div>
            </form>
          </div>
        </div>
        <div className="brand-section">
          <div className="brand-content">
            <Logo />
            <h2 className="brand-title">Conectando você ao comércio local</h2>
            <p className="brand-description">
              Encontre os melhores prestadores de serviços, fábricas, indústrias
              e comércios da sua região.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
