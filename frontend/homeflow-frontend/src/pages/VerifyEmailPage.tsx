import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { textDown, imageRight, elementsLeft } from "../utils/animation";
import emailImg from "../assets/mail.svg";

interface VerifyEmailProps {
    mode?: "registro" | "recuperacion";
}

export default function VerifyEmail({ mode = "registro" }: VerifyEmailProps) {
    const location = useLocation();
    // Extraemos el correo que enviamos desde LoginPage o RegisterPage
    const correo = location.state?.correo;

    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState<string | null>(null);

    const isRegistro = mode === "registro";

    const title = isRegistro ? "VERIFICA TU CORREO" : "REVISA TU BANDEJA";
    const line1 = isRegistro 
        ? "Te hemos enviado un enlace de verificación a tu correo." 
        : "Si el correo existe, te enviamos un enlace para restablecer tu contraseña.";
    const line2 = isRegistro 
        ? "Haz clic en él para activar tu cuenta." 
        : "Haz clic en él para crear tu nueva contraseña.";

    const handleResend = async () => {
        if (!correo) return;

        setLoading(true);
        setMensaje(null);

        try {
            const response = await fetch("http://localhost:8080/api/auth/resend-verification", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ correo }),
            });

            const data = await response.json();
            setMensaje(data.mensaje);
        } catch (error) {
            console.error("Error al reenviar correo:", error);
            setMensaje("No se pudo reenviar el correo. Intenta más tarde.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-10">
            <div className="flex justify-center items-center">
                <motion.img 
                    src={emailImg} 
                    alt="email status" 
                    className="w-50" 
                    variants={imageRight} 
                    initial="hidden" 
                    animate="visible" 
                />
            </div>
            <div className="text-center mt-12">
                <motion.h1 className="text-4xl text-[#1F2937]" variants={textDown} initial="hidden" animate="visible">
                    {title}
                </motion.h1>
                <motion.p className="text-[#6B7280] mt-2" variants={elementsLeft} initial="hidden" animate="visible">
                    {line1}
                </motion.p>
                <motion.p className="text-[#6B7280]" variants={elementsLeft} initial="hidden" animate="visible">
                    {line2}
                </motion.p>

                {/* Opción de reenvío solo si venimos de un flujo de registro/verificación y tenemos un correo */}
                {isRegistro && correo && (
                    <motion.div className="mt-8" variants={elementsLeft} initial="hidden" animate="visible">
                        <p className="text-sm text-gray-500">¿No recibiste el correo o el enlace caducó?</p>
                        <button
                            onClick={handleResend}
                            disabled={loading}
                            className="mt-2 text-[#00695C] font-semibold underline hover:text-[#004D40] disabled:opacity-50"
                        >
                            {loading ? "Reenviando..." : "Reenviar correo de verificación"}
                        </button>

                        {mensaje && (
                            <p className="mt-3 text-sm font-medium text-teal-700 bg-teal-50 py-2 px-4 rounded-md inline-block">
                                {mensaje}
                            </p>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
}