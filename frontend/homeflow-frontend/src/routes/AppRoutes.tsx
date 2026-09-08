import { Routes, Route } from "react-router-dom";

import PublicLayout from '../layouts/PublicLayout'
import LandingPage from "../pages/LandingPage"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import AppLayout from "../layouts/AppLayout";
import FinancePage from "../pages/app/FinancePage";
import VerifyEmail from "../pages/VerifyEmailPage";
import ActiveAccount from "../pages/ActiveAccountPage";
import ForgotPassword from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";

export default function AppRoutes() {
    return (
        <Routes>
            {/* Landing y autenticación */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                // Ruta para cuando se registran
                <Route path="/verifyEmail" element={<VerifyEmail mode="registro" />} />
                // Ruta para cuando olvidan la contraseña (a la que apunta tu navigate)
                <Route path="/revisa-tu-correo" element={<VerifyEmail mode="recuperacion" />} />
                <Route path="/activar-cuenta" element={<ActiveAccount />} />
                <Route path="/olvide-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
            </Route>

            {/* Aplicación */}
            <Route element={<AppLayout />}>
                <Route path="/finance" element={<FinancePage />} />
            </Route>
        </Routes>
    )
}