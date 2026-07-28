import { motion } from "framer-motion"
import { useSearchParams } from "react-router-dom";
import { textDown, imageRight, elementsLeft } from "../utils/animation"
import happyImg from "../assets/happy.svg"
import warningImg from "../assets/warning.svg"
import { useState, useEffect } from "react";
import { vi } from "zod/v4/locales";

export default function ActiveAccount() {

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [viewOk, setViewOk] = useState(false);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/auth/verifyToken", {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "text/plain",
                    },
                    body: token,
                });

                console.log(token);
                console.log(response);

                if (response.ok) {
                    setViewOk(true);
                } else {
                    setViewOk(false);
                }
            } catch (error) {
                console.error("Error conectando con el servidor:", error);
                setViewOk(false);
            }
        };

        if (token) {
            verifyToken();
        }
    }, [token]);

    return (
        <div className="mt-10">
            <div className="flex justify-center items-center">
                {viewOk ? <motion.img src={happyImg} alt="register img" className="w-50" variants={imageRight} initial="hidden" animate="visible" />
                    :
                    <motion.img src={warningImg} alt="register img" className="w-50" variants={imageRight} initial="hidden" animate="visible" />
                }
            </div>
            <div className="text-center mt-20">
                <motion.h1 className="text-4xl text-[#1F2937]" variants={textDown} initial="hidden" animate="visible" >
                    {viewOk ? "TE DAMOS LA BIENVENIDA A HOMEFLOW ONE" : "EL ENLACE DE VERIFICACIÓN ES INVÁLIDO O YA FUE UTILIZADO"}
                </motion.h1>

                {viewOk ?
                    <motion.p className="text-2xl text-[#6B7280]" variants={elementsLeft} initial="hidden" animate="visible">
                        Solo falta <a href="/login" className="text-blue-600 underline hover:text-blue-800 transition-colors">iniciar sesión</a>
                    </motion.p>
                    :
                    <motion.p className="text-2xl text-[#6B7280]" variants={elementsLeft} initial="hidden" animate="visible">
                        Puedes intentar <a href="/login" className="text-blue-600 underline hover:text-blue-800 transition-colors">iniciar sesión</a>
                        &nbsp;o <a href="/register" className="text-blue-600 underline hover:text-blue-800 transition-colors">registrarte</a>
                    </motion.p>
                }

            </div>
        </div >
    );
}