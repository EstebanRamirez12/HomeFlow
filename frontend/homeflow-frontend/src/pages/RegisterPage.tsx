import { motion } from "framer-motion";
import { textDown, imageRight, elementsLeft } from "../utils/animation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { emailSchema, passwordSchema, nameSchema, phoneSchema } from "../utils/validations";
import fillRegisterImg from "../assets/form-register.svg";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";

const registerFormSchema = z.object({
    correo: emailSchema,
    password: passwordSchema,
    nombre: nameSchema,
    materno: nameSchema,
    paterno: nameSchema,
    telefono: phoneSchema,
    passwordConfirm: z.string(),
})
    .refine((data) => data.password === data.passwordConfirm, {
        message: "Las contraseñas no coinciden",
        path: ["passwordConfirm"],
    });

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function Register() {

    const navigate = useNavigate();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerFormSchema)
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            const response = await fetch("http://localhost:8080/api/auth/registro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            console.log(JSON.stringify(data));
            console.log(response);

            const result = await response.json();

            if (response.ok) {
                //redirige a verificar correo
                navigate('/verifyEmail');
            } else {
                if (result.mensaje == "El correo ya está registrado") {
                    console.log("correo ya registrado");
                }
                //ese correo ya está registrado
            }

        } catch (error) {
            console.error("Error conectando con el servidor:", error);
        }
    }

    return (
        <div className="md:mt-36 mt-22 p-10">
            <motion.h1 className="text-4xl text-[#1F2937]" variants={textDown} initial="hidden" animate="visible" >REGISTRARSE</motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                <div className="pt-10 md:mx-20">
                    Carrusel de cerditos
                    <motion.form onSubmit={handleSubmit(onSubmit)} className="mb-10" variants={elementsLeft} initial="hidden" animate="visible" >
                        <div className="mt-2">
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                id="nombre"
                                type="text"
                                placeholder="Ej. Joe"
                                {...register("nombre")}
                                className="border border-gray-300 rounded-md p-2 bg-white w-full"
                            />
                            {errors.nombre && <p className="text-[#EF4444] text-xs mt-1">{errors.nombre.message}</p>}
                        </div>

                        <div className="mt-2">
                            <label htmlFor="paterno">Apellido paterno</label>
                            <input
                                id="paterno"
                                type="text"
                                placeholder="ej. Lopez"
                                {...register("paterno")}
                                className="border border-gray-300 rounded-md p-2 bg-white w-full"
                            />
                            {errors.paterno && <p className="text-[#EF4444] text-sm mt-1">{errors.paterno.message}</p>}
                        </div>

                        <div className="mt-2">
                            <label htmlFor="materno">Apellido materno</label>
                            <input
                                id="materno"
                                type="text"
                                placeholder="ej. Ramírez"
                                {...register("materno")}
                                className="border border-gray-300 rounded-md p-2 bg-white w-full"
                            />
                            {errors.materno && <p className="text-[#EF4444] text-sm mt-1">{errors.materno.message}</p>}
                        </div>

                        <div className="mt-2">
                            <label htmlFor="telefono">Teléfono</label>

                            <Controller
                                name="telefono"
                                control={control}
                                render={({ field }) => (
                                    <PhoneInput
                                        id="telefono"
                                        international
                                        defaultCountry="MX"
                                        placeholder="55 1234 5678"
                                        value={field.value}
                                        onChange={(value) => field.onChange(value ?? "")}
                                        className="border border-gray-300 rounded-md p-2 bg-white w-full"
                                    />
                                )}
                            />

                            {errors.telefono && (
                                <p className="text-[#EF4444] text-sm mt-1">
                                    {errors.telefono.message}
                                </p>
                            )}
                        </div>

                        <div className="mt-10">
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

                        <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-2">
                            <div className="mt-2">
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

                            <div className="mt-2">
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
                        </div>

                        <button type="submit" className="bg-[#00695C] text-white p-2 rounded w-full mt-10">
                            Registrarse
                        </button>

                    </motion.form>
                </div>
                <div>
                    <motion.img src={fillRegisterImg} alt="register img" className="w-200" variants={imageRight} initial="hidden" animate="visible" />
                </div>
            </div>
        </div>
    );
}