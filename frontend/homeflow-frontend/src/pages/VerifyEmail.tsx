import { motion } from "framer-motion"
import { textDown, imageRight, elementsLeft } from "../utils/animation"
import emailImg from "../assets/mail.svg"

export default function VerifyEmail() {
    return (
        <div className="mt-10">
            <div className="flex justify-center items-center">
                <motion.img src={emailImg} alt="register img" className="w-50" variants={imageRight} initial="hidden" animate="visible" />
            </div>
            <div className="text-center mt-20">
                <motion.h1 className="text-4xl text-[#1F2937]" variants={textDown} initial="hidden" animate="visible" >VERIFICA TU CORREO</motion.h1>
                <motion.p className="text-[#6B7280]" variants={elementsLeft} initial="hidden" animate="visible">Te hemos enviado un enlace de verificación a tu correo.</motion.p>
                <motion.p className="text-[#6B7280]" variants={elementsLeft} initial="hidden" animate="visible">Haz clic en él para activar tu cuenta.</motion.p>
            </div>
        </div>

    );
}