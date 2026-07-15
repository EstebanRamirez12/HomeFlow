import { Routes, Route } from "react-router-dom";

import PublicLayout from '../layouts/PublicLayout'

import LandingPage from "../pages/LandingPage"

export default function AppRoutes() {
    return (
        <Routes>
            {/* Landing y autenticación */}
            <Route element={<PublicLayout/>}>
                <Route path="/" element={<LandingPage />} />
                {/* <Route path="/login" element={<LoginPage />}/> */}
                {/* <Route path="/register" element={<RegisterPage />}/> */}
            </Route>

           {/* Aplicación */}
           {/* <Route element={<AppLayout />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/finance" element={<FinancePage />} />
            </Route>*/}
        </Routes>
    )
}