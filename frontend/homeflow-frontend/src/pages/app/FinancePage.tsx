import { motion } from "framer-motion"
import { textDown, imageRight, elementsLeft, elementsUp } from "../../utils/animation";

export default function FinancePage() {
    return (
        <div className="md:mt-2 mt-2 p-10">
            <motion.h1 className="text-4xl text-[#1F2937]" variants={textDown} initial="hidden" animate="visible" >FINANZAS</motion.h1>
        </div>
    );
}