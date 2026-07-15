import { Link } from "react-router-dom";
import Hero from "../components/landing/Hero";

export default function LandingPage() {
    return (
        <main>
            <p>landing page</p>
            <Hero />
            <Link to="/login">
            Iniciar sesión
          </Link>
        </main>
    );
}