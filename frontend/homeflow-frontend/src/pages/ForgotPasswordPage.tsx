import { motion } from "framer-motion"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { textDown, imageRight, elementsLeft } from "../utils/animation"
import forgotPass from "../assets/forgot-password.svg"
import { useNavigate } from "react-router-dom";
import { emailSchema } from "../utils/validations";

const forgotPasswordFormSchema = z.object({
    correo: emailSchema
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>;



export default function ForgotPassword() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordFormSchema),
    });

    const onSubmit = async (data: ForgotPasswordFormData) => {
        try {
            const response = await fetch("http://localhost:8080/api/auth/recuperar-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data), // Aquí envia { correo: "..."}
            });

            navigate('/revisa-tu-correo');

        } catch (error) {
            console.error("Error conectando con el servidor:", error);
        }
    };

    return (
        <div className="md:mt-36 mt-22 p-10">
            <motion.h1 className="text-4xl text-[#1F2937]" variants={textDown} initial="hidden" animate="visible" >RECUPERAR CONTRASEÑA</motion.h1>
            <motion.p className="mb-4 text-gray-600" variants={textDown} initial="hidden" animate="visible">Ingresa tu correo y te enviaremos las instrucciones.</motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="pt-10 md:mx-20">
                    <motion.form onSubmit={handleSubmit(onSubmit)} className="mb-10" variants={elementsLeft} initial="hidden" animate="visible">

                        {/* Input Email */}
                        <div>
                            <label htmlFor="email">Correo</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="mail@company.com"
                                {...register("correo")}
                                className="border border-gray-300 rounded-md p-2 bg-white w-full"
                            />
                            {errors.correo && <p className="text-[#EF4444] text-xs mt-1">{errors.correo.message}</p>}
                        </div>

                        <button type="submit" className="bg-[#00695C] text-white p-2 rounded w-full mt-10">
                            Enviar enlace
                        </button>
                    </motion.form>

                </div>

                <div>
                    <motion.img src={forgotPass} alt="register img" className="w-80" variants={imageRight} initial="hidden" animate="visible" />
                </div>
            </div>
        </div>
    );
}