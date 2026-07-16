import homeImg from "../../assets/home_admin.svg"
import { motion } from "framer-motion"
import { textDown, imageRight } from "../../utility/animation"
export default function Hero() {
    return (
        <section className="md:mt-36">
            <div className="grid grid-cols-1 md:grid-cols-2">
                <motion.div variants={textDown} initial="hidden" animate="visible" className="p-22 md:p-10">
                    <h1 className="text-4xl text-[#1F2937]" >ADMINISTRA TU HOGAR CON</h1>
                    <h1 className="text-4xl text-[#00695C]" >HOME FLOW ONE</h1>
                    <p className="text-[#6B7280] py-5">Controla tus gastos, tareas del hogar y más.</p>
                    <a className="w-[200px] bg-[#00695C] py-2 px-12 rounded-3xl text-white hover:bg-[#00b09a] transition-all duration-300 flex items-center cursor-pointer" >Probar ahora</a>
                </motion.div>

                <div>
                    <motion.img src={homeImg} alt="home img" className="w-[500px]" variants={imageRight} initial="hidden" animate="visible" />
                </div>
            </div>
        </section>
    );
}