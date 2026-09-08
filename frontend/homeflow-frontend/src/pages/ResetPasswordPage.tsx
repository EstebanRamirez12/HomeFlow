import { motion } from "framer-motion"
import { useNavigate, useSearchParams } from "react-router-dom";
import { textDown, imageRight, elementsLeft } from "../utils/animation"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import enterPassImg from "../assets/enter-password.svg"
import warningImg from "../assets/warning.svg"
import { useState, useEffect } from "react";
import { passwordSchema } from "../utils/validations";

const resetFormSchema = z.object({
    password: passwordSchema,
    passwordConfirm: z.string(),
})
    .refine((data) => data.password === data.passwordConfirm, {
        message: "Las contraseñas no coinciden",
        path: ["passwordConfirm"],
    });

type ResetFormData = z.infer<typeof resetFormSchema>;


export default function ResetPasswordPage() {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ResetFormData>({
        resolver: zodResolver(resetFormSchema)
    });

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");


    const [viewOk, setViewOk] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/auth/verifyPassToken?token=${token}`);

                if (response.ok) {
                    setViewOk(true);
                } else {
                    setViewOk(false);
                }
            } catch (error) {
                console.error("Error conectando con el servidor:", error);
                setViewOk(false);
            } finally {
                // 2. Apagamos el estado de carga al terminar
                setIsLoading(false);
            }
        };

        if (token) {
            verifyToken();
        } else {
            setIsLoading(false);
        }
    }, [token]);

    const onSubmit = async (data: ResetFormData) => {
        try {
            const payload = {
                token: token,
                nuevaPassword: data.password
            };

            const response = await fetch("http://localhost:8080/api/auth/resetPassword", {
                method: "PATCH", // Al ser una actualización, PATCH es ideal aquí
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                navigate('/login');
            } else {
                alert("Hubo un error al actualizar la contraseña");
            }

        } catch (error) {
            console.error("Error conectando con el servidor:", error);
        }
    }

    return (
        isLoading ? (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl text-gray-600">Verificando enlace de seguridad...</p>
            </div>
        ) : viewOk ? (

            <div className="md:mt-36 mt-22 p-10">
                <motion.h1 className="text-4xl text-[#1F2937]" variants={textDown} initial="hidden" animate="visible" >CAMBIAR CONTRASEÑA</motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="pt-10 md:mx-20">
                        <motion.form onSubmit={handleSubmit(onSubmit)} className="mb-10" variants={elementsLeft} initial="hidden" animate="visible">

                            {/* Input pass */}
                            <div>
                                <label htmlFor="password">Nueva contraseña</label>
                                <input
                                    {...register('password')}
                                    type="password"
                                    name="password"
                                    id="password"
                                    maxLength={50}
                                    placeholder="•••••••••"
                                    className="border border-gray-300 rounded-md p-2 bg-white w-full" />
                                {errors.password && <p className="text-[#EF4444] text-xs mt-1">{errors.password.message}</p>}
                            </div>

                            {/* Input confirm pass */}

                            <div>
                                <label htmlFor="password">Confirmar contraseña</label>
                                <input
                                    {...register('passwordConfirm')}
                                    type="password"
                                    name="passwordConfirm"
                                    id="passwordConfirm"
                                    maxLength={50}
                                    placeholder="•••••••••"
                                    className="border border-gray-300 rounded-md p-2 bg-white w-full" />
                                {errors.passwordConfirm && <p className="text-[#EF4444] text-xs mt-1">{errors.passwordConfirm.message}</p>}
                            </div>

                            <button type="submit" className="bg-[#00695C] text-white p-2 rounded w-full mt-10">
                                Restablecer contraseña
                            </button>
                        </motion.form>

                    </div>

                    <div>
                        <motion.img src={enterPassImg} alt="pass img" className="w-100" variants={imageRight} initial="hidden" animate="visible" />
                    </div>

                </div>

            </div>

        ) : (
            <div className="mt-10">
                <div className="flex justify-center items-center">
                    <motion.img src={warningImg} alt="register img" className="w-50" variants={imageRight} initial="hidden" animate="visible" />
                </div>
                <div className="text-center mt-20">
                    <motion.h1 className="text-4xl text-[#1F2937]" variants={textDown} initial="hidden" animate="visible" >
                        ENLACE DE VERIFICACIÓN INVÁLIDO O PREVIAMENTE UTILIZADO
                    </motion.h1>

                    <motion.p className="text-[#6B7280]" variants={elementsLeft} initial="hidden" animate="visible">
                        Puedes intentar <a href="/login" className="text-blue-600 underline hover:text-blue-800 transition-colors">iniciar sesión</a>
                        &nbsp;o <a href="/register" className="text-blue-600 underline hover:text-blue-800 transition-colors">registrarte</a>
                    </motion.p>
                </div>
            </div >
        )
    );
}