import { Routes, Route } from "react-router-dom";

import PublicLayout from '../layouts/PublicLayout'
import LandingPage from "../pages/LandingPage"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import AppLayout from "../layouts/AppLayout";
import FinancePage from "../pages/app/FinancePage";
import VerifyEmail from "../pages/VerifyEmail";
import ActiveAccount from "../pages/ActiveAccount";

export default function AppRoutes() {
    return (
        <Routes>
            {/* Landing y autenticación */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/verifyEmail" element={<VerifyEmail />} />
                <Route path="activar-cuenta" element={<ActiveAccount />} />
            </Route>

            {/* Aplicación */}
            <Route element={<AppLayout />}>
                <Route path="/finance" element={<FinancePage />} />
            </Route>
        </Routes>
    )
}