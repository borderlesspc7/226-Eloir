import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { paths } from "./paths";
import { ProtectedRoute } from "./ProtectedRoute";
import { Layout } from "../components/Layout/Layout";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import HomePage from "../pages/HomePage/HomePage";
import RegisterPlace from "../pages/RegisterPlace/RegisterPlace";
import EstablishmentsPage from "../pages/EstablishmentsPage/EstablishmentsPage";
import MyEstablishmentsPage from "../pages/MyEstablishmentsPage/MyEstablishmentsPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import PlansPage from "../pages/PlansPage/PlansPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota raiz - redireciona para o login */}
        <Route path="/" element={<Navigate to={paths.login} replace />} />

        {/* Rotas públicas */}
        <Route path={paths.login} element={<LoginPage />} />
        <Route path={paths.register} element={<RegisterPage />} />

        {/* Rotas protegidas com Layout */}
        <Route
          path={paths.menu}
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="estabelecimentos" element={<EstablishmentsPage />} />
          <Route path="register-place" element={<RegisterPlace />} />
          <Route
            path="meus-estabelecimentos"
            element={<MyEstablishmentsPage />}
          />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="plans" element={<PlansPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
