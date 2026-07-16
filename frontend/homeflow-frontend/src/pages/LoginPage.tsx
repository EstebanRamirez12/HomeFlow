import { motion } from "framer-motion"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { emailSchema, passwordSchema } from "../utils/validations"
import { textDown, imageRight, elementsLeft, elementsUp } from "../utils/animation"
import loginImg from "../assets/login.svg"

const loginFormSchema = z.object({
    email: emailSchema,
    password: passwordSchema
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export default function Login() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginFormSchema),
    });

    const onSubmit = (data: LoginFormData) => {
        console.log('Datos válidos:', data);
    };

    return (
        <div className="md:mt-36 mt-22 p-10">
            <motion.h1 className="text-4xl text-[#1F2937]" variants={textDown} initial="hidden" animate="visible" >INICIAR SESIÓN</motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="pt-10 md:mx-20">
                    <motion.form onSubmit={handleSubmit(onSubmit)} className="mb-10" variants={elementsLeft} initial="hidden" animate="visible">

                        {/* Input Email */}
                        <div>
                            <label htmlFor="email">correo</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="mail@company.com"
                                {...register("email")}
                                className="border border-gray-300 rounded-md p-2 bg-white w-full"
                            />
                            {errors.email && <p className="text-[#EF4444] text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Input pass */}
                        <div>
                            <label htmlFor="password">Contraseña</label>
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

                        <button type="submit" className="bg-[#00695C] text-white p-2 rounded w-full mt-10">
                            Iniciar sesión
                        </button>
                    </motion.form>

                    <motion.div variants={elementsUp} initial="hidden" animate="visible">
                        <p className="text-[#6B7280]">¿No tienes cuenta aún? <a href="/register" className="text-blue-600 underline hover:text-blue-800 transition-colors">Registrate</a></p>
                        <a href="#" className="text-blue-600 underline hover:text-blue-800 transition-colors">Olividé mi contraseña</a>
                    </motion.div>
                </div>

                <div>
                    <motion.img src={loginImg} alt="home img" className="w-[400px]" variants={imageRight} initial="hidden" animate="visible" />
                </div>
            </div>

        </div>
    );
}