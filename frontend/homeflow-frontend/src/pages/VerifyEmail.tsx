import { useState } from "react";

export default function VerifyEmail() {
    const [seconds, setSeconds] = useState(60);

    return (
        <div className="text-center mt-20">
            <h2 className="text-2xl font-bold">Verifica tu correo</h2>
            <p>Te hemos enviado un enlace de verificación a tu correo.</p>
            <p>Haz clic en él para activar tu cuenta.</p>
        </div>
    );
}