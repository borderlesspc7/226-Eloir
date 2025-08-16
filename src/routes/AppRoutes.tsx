import { BrowserRouter, Routes, Route } from "react-router-dom";
import { paths } from "./paths";
import { ProtectedRoute } from "./ProtectedRoute";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import RegisterPlace from "../pages/RegisterPlace/RegisterPlace";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.home} element={<LoginPage />} />
        <Route path={paths.login} element={<LoginPage />} />
        <Route path={paths.register} element={<RegisterPage />} />
        <Route
          path={paths.menu}
          element={
            <ProtectedRoute>
              <RegisterPlace />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
