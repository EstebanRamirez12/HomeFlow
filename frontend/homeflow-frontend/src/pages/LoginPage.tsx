import { motion } from "framer-motion"
import { textDown, imageRight, elementsLeft } from "../utility/animation"
import loginImg from "../assets/login.svg"

export default function Login() {
    return (
        <div className="md:mt-36 mt-22 p-22 md:p-10">
            <motion.h1 className="text-4xl text-[#1F2937]" variants={textDown} initial="hidden" animate="visible" >INICIAR SESIÓN</motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2">
                <motion.form className="pt-10 mx-20" variants={elementsLeft} initial="hidden" animate="visible">
                    <label>
                        Nombre:
                        <input type="text" name="nombre" id="nombre" className="border border-gray-300 rounded-md p-2 bg-white w-full" />
                    </label>
                </motion.form>
                <div>
                    <motion.img src={loginImg} alt="home img" className="w-[400px]" variants={imageRight} initial="hidden" animate="visible" />
                </div>
            </div>

        </div>
    );
}