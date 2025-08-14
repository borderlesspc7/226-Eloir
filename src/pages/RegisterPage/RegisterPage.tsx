import { Logo } from "../../components/ui/Logo/Logo";
import { TextInput } from "../../components/ui/TextInput/TextInput";
import { Button } from "../../components/ui/Button/Button";
import "./RegisterPage.css";
import { Link } from "react-router-dom";
import { paths } from "../../routes/paths";
import { useState, useEffect } from "react";
import { useNavigation } from "../../hooks/useNavigation";
import { useAuth } from "../../hooks/useAuth";

export default function RegisterPage() {
  const { register, user, loading, error, clearError } = useAuth();
  const { goTo } = useNavigation();

  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      goTo(paths.menu);
    }
  }, [user, goTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (password !== confirmPassword) {
      setLocalError("As senhas não correspondem");
      return;
    }

    try {
      await register({ displayName, phone, email, password });
    } catch (error) {
      console.error("Erro ao criar conta:", error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <div className="form-section">
          <div className="form-wrapper">
            <h1 className="form-title">Criar sua conta</h1>
            <p className="form-subtitle">
              Junte-se a nossa comunidade e descubra os melhores serviços locais
            </p>

            <form className="register-form" onSubmit={handleSubmit}>
              <TextInput
                type="text"
                placeholder="Seu nome"
                label="Nome Completo"
                required
                value={displayName}
                onChange={(e) => {
                  setDisplayName(e.target.value);
                  if (error) clearError();
                  if (localError) setLocalError(null);
                }}
              />

              <TextInput
                type="email"
                placeholder="Seu e-mail"
                label="E-mail"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) clearError();
                  if (localError) setLocalError(null);
                }}
              />

              <TextInput
                type="tel"
                placeholder="(11) 99999-9999"
                label="Telefone"
                required
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (error) clearError();
                  if (localError) setLocalError(null);
                }}
              />

              <TextInput
                type="password"
                placeholder="Crie uma senha"
                label="Senha"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) clearError();
                  if (localError) setLocalError(null);
                }}
              />

              <TextInput
                type="password"
                placeholder="Confirme sua senha"
                label="Confirmar Senha"
                required
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (error) clearError();
                  if (localError) setLocalError(null);
                }}
              />

              {(localError || error) && (
                <div className="form-error">{localError ?? error}</div>
              )}

              <Button type="submit" fullWidth loading={loading}>
                {loading ? "Criando conta..." : "Criar Conta"}
              </Button>

              <div className="login-link">
                <span>Já tem uma conta?</span>
                <Link to={paths.login}>Fazer login</Link>
              </div>
            </form>
          </div>
        </div>

        <div className="brand-section">
          <div className="brand-content">
            <Logo />
            <h2 className="brand-title">Descubra oportunidades locais</h2>
            <p className="brand-description">
              Cadastre-se gratuitamente e tenha acesso aos melhores serviços e
              produtos da sua região.
            </p>
            <div className="features-list">
              <div className="feature-item">✓ Cadastro gratuito</div>
              <div className="feature-item">✓ Acesso a serviços locais</div>
              <div className="feature-item">✓ Conecte-se com fornecedores</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
