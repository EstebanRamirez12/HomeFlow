import imgAhorro from "../../assets/ahorro.svg"
import imgGraph from "../../assets/graph.svg"
import imgClock from "../../assets/clock.svg"

export default function Feature() {
    return (
        <section className="md:mt-30 mt-20 p-22 md:p-10">
            <div className="flex justify-center items-center mb-10">
                <h2 className="text-2xl text-[#1F2937]">Diseñado para ser simple</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-4 py-3 sm:py-6 md:px-12">

                <div className="mb-10 md:mx-2 p-5 border border-[#E5E7EB] bg-white">
                    <div className="flex justify-center items-center">
                        <h3 className="text-[#1F2937] text-lg">Registro Ágil</h3>
                    </div>
                    <div className="mt-5 mb-8 flex justify-center items-center">
                        <img className="w-[100px]" src={imgClock} alt="imagen ahorro" />
                    </div>
                    <p className="text-[#6B7280] text-center pb-5">Agrega tus gastos recurrentes u ocasionales sin formularios infinitos.</p>
                </div>

                <div className="mb-10 md:mx-2 p-5 border border-[#E5E7EB] bg-white">
                    <div className="flex justify-center items-center">
                        <h3 className="text-[#1F2937] text-lg">Ahorro Inteligente</h3>
                    </div>
                    <div className="mt-10 mb-10 flex justify-center items-center">
                        <img className="w-[150px]" src={imgAhorro} alt="imagen ahorro" />
                    </div>
                    <p className="text-[#6B7280] text-center pb-5">Te sugerimos metas realistas basadas en la regla del 20% de ahorro saludable.</p>
                </div>

                <div className="mb-10 md:mx-2 p-5 border border-[#E5E7EB] bg-white">
                    <div className="flex justify-center items-center">
                        <h3 className="text-[#1F2937] text-lg">Control Total</h3>
                    </div>
                    <div className="mt-13 mb-10 flex justify-center items-center">
                        <img className="w-[200px]" src={imgGraph} alt="imagen ahorro" />
                    </div>
                    <p className="text-[#6B7280] text-center pb-5">Mira de un vistazo cuánto te queda disponible después de tus compromisos obligatorios.</p>
                </div>
            </div>
        </section>
    );

}