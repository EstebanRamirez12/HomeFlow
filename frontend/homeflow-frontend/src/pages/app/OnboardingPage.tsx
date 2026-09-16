import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import homeImg from "../../assets/home_admin.svg";
import { textDown, imageRight } from "../../utils/animation";

// Reemplaza estas rutas por tus 6 imágenes reales
import home1 from "../../assets/ahorro.svg";
import home2 from "../../assets/clock.svg";
import home3 from "../../assets/graph.svg";
import home4 from "../../assets/happy.svg";
import home5 from "../../assets/login.svg";
import home6 from "../../assets/mail.svg";

const homeOptions = [
    { id: 1, image: home1 },
    { id: 2, image: home2 },
    { id: 3, image: home3 },
    { id: 4, image: home4 },
    { id: 5, image: home5 },
    { id: 6, image: home6 },
];

export default function OnboardingPage() {
    const navigate = useNavigate();

    const [mode, setMode] = useState(null);
    const [homeName, setHomeName] = useState("");
    const [selectedHome, setSelectedHome] = useState(null);
    const [groupKey, setGroupKey] = useState("");

    const handleCreateHome = (e) => {
        e.preventDefault();

        if (!homeName.trim() || !selectedHome) return;

        // Aquí puedes enviar los datos a tu API
        const homeData = {
            name: homeName.trim(),
            image: selectedHome,
        };

        console.log("Creando hogar:", homeData);

        navigate("/finanzas");
    };

    const handleJoinHome = (e) => {
        e.preventDefault();

        if (!groupKey.trim()) return;

        // Aquí puedes enviar la clave a tu API
        console.log("Uniéndose al hogar:", groupKey);

        navigate("/finanzas");
    };

    const handleBack = () => {
        setMode(null);
        setHomeName("");
        setSelectedHome(null);
        setGroupKey("");
    };

    return (
        <section className="min-h-[calc(100vh-80px)] flex items-center px-6 py-12 md:px-12 lg:px-20">
            <div className="w-full max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-center">

                    {/* CONTENIDO */}
                    <motion.div
                        variants={textDown}
                        initial="hidden"
                        animate="visible"
                        className="w-full mb-15"
                    >
                        <AnimatePresence mode="wait">

                            {/* =========================
                                ESTADO INICIAL
                            ========================== */}
                            {!mode && (
                                <motion.div
                                    key="welcome"
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <p className="text-sm font-semibold tracking-widest text-[#00695C] mb-3">
                                        COMENCEMOS
                                    </p>

                                    <h1 className="text-4xl sm:text-5xl font-bold text-[#1F2937] leading-tight">
                                        ¡BIENVENIDO A
                                    </h1>

                                    <h1 className="text-4xl sm:text-5xl font-bold text-[#00695C] leading-tight">
                                        HOMEFLOW ONE!
                                    </h1>

                                    <p className="text-[#6B7280] text-base sm:text-lg leading-relaxed py-6 max-w-lg">
                                        Para comenzar, necesitas pertenecer a un hogar.
                                        Puedes crear uno nuevo o unirte a uno existente.
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setMode("create")}
                                            className="w-full sm:w-auto min-w-[180px] bg-[#00695C] py-3 px-6 rounded-full text-white font-medium hover:bg-[#00a88f] transition-all duration-300 hover:shadow-lg active:scale-95"
                                        >
                                            Crear un hogar
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setMode("join")}
                                            className="w-full sm:w-auto min-w-[180px] border-2 border-[#00695C] py-3 px-6 rounded-full text-[#00695C] font-medium hover:bg-[#00695C] hover:text-white transition-all duration-300 active:scale-95"
                                        >
                                            Unirme a un hogar
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* =========================
                                CREAR HOGAR
                            ========================== */}
                            {mode === "create" && (
                                <motion.form
                                    key="create"
                                    onSubmit={handleCreateHome}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#00695C] transition-colors mb-6"
                                    >
                                        <span className="text-lg">←</span>
                                        Volver
                                    </button>

                                    <p className="text-sm font-semibold tracking-widest text-[#00695C] mb-2">
                                        CREAR HOGAR
                                    </p>

                                    <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937]">
                                        Personaliza tu hogar
                                    </h2>

                                    <p className="text-[#6B7280] mt-3 mb-6">
                                        Elige una imagen y dale un nombre a tu nuevo hogar.
                                    </p>

                                    {/* Nombre */}
                                    <div className="mb-6">
                                        <label
                                            htmlFor="homeName"
                                            className="block text-sm font-medium text-[#374151] mb-2"
                                        >
                                            Nombre del hogar
                                        </label>

                                        <input
                                            id="homeName"
                                            type="text"
                                            value={homeName}
                                            onChange={(e) => setHomeName(e.target.value)}
                                            placeholder="Ej. Casa González"
                                            maxLength={50}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-[#1F2937] outline-none focus:border-[#00695C] focus:ring-2 focus:ring-[#00695C]/10 transition-all"
                                            required
                                        />
                                    </div>

                                    {/* Selección de imagen */}
                                    <div className="mb-7">
                                        <p className="block text-sm font-medium text-[#374151] mb-3">
                                            Elige una imagen
                                        </p>

                                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                                            {homeOptions.map((home) => (
                                                <button
                                                    key={home.id}
                                                    type="button"
                                                    onClick={() => setSelectedHome(home.id)}
                                                    className={`
                                                        relative aspect-square rounded-2xl p-2
                                                        border-2 transition-all duration-200
                                                        hover:-translate-y-1 hover:shadow-md
                                                        ${
                                                            selectedHome === home.id
                                                                ? "border-[#00695C] bg-[#E6F4F1] shadow-md"
                                                                : "border-gray-100 bg-gray-50"
                                                        }
                                                    `}
                                                >
                                                    <img
                                                        src={home.image}
                                                        alt={`Imagen de hogar ${home.id}`}
                                                        className="w-full h-full object-contain"
                                                    />

                                                    {selectedHome === home.id && (
                                                        <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#00695C] text-white rounded-full flex items-center justify-center text-xs">
                                                            ✓
                                                        </span>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={!homeName.trim() || !selectedHome}
                                        className="w-full bg-[#00695C] py-3.5 px-6 rounded-full text-white font-semibold transition-all duration-300 hover:bg-[#00a88f] hover:shadow-lg disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                                    >
                                        Guardar y continuar
                                    </button>
                                </motion.form>
                            )}

                            {/* =========================
                                UNIRSE A HOGAR
                            ========================== */}
                            {mode === "join" && (
                                <motion.form
                                    key="join"
                                    onSubmit={handleJoinHome}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                    className="mb-70 md:mb-30"
                                >
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#00695C] transition-colors mb-6"
                                    >
                                        <span className="text-lg">←</span>
                                        Volver
                                    </button>

                                    <p className="text-sm font-semibold tracking-widest text-[#00695C] mb-2">
                                        UNIRME A UN HOGAR
                                    </p>

                                    <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937]">
                                        Ingresa a tu hogar
                                    </h2>

                                    <p className="text-[#6B7280] mt-3 mb-7 max-w-md">
                                        Introduce la clave que te compartió el administrador
                                        del hogar.
                                    </p>

                                    <div className="mb-7">
                                        <label
                                            htmlFor="groupKey"
                                            className="block text-sm font-medium text-[#374151] mb-2"
                                        >
                                            Clave del grupo
                                        </label>

                                        <input
                                            id="groupKey"
                                            type="text"
                                            value={groupKey}
                                            onChange={(e) => setGroupKey(e.target.value)}
                                            placeholder="Ej. HF-8K29-XP"
                                            maxLength={30}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-[#1F2937] outline-none focus:border-[#00695C] focus:ring-2 focus:ring-[#00695C]/10 transition-all uppercase"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={!groupKey.trim()}
                                        className="w-full bg-[#00695C] py-3.5 px-6 rounded-full text-white font-semibold transition-all duration-300 hover:bg-[#00a88f] hover:shadow-lg disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                                    >
                                        Unirme y continuar
                                    </button>
                                </motion.form>
                            )}

                        </AnimatePresence>
                    </motion.div>

                    {/* =========================
                        IMAGEN / PANEL DERECHO
                    ========================== */}
                    <div className="hidden md:flex items-center justify-center min-h-[450px]">
                        <AnimatePresence mode="wait">
                            {!mode ? (
                                <motion.img
                                    key="home-image"
                                    src={homeImg}
                                    alt="Ilustración de un hogar"
                                    className="w-full max-w-[500px]"
                                    variants={imageRight}
                                    initial="hidden"
                                    animate="visible"
                                    exit={{
                                        opacity: 0,
                                        scale: 0.95,
                                        x: 30,
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                            ) : (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="w-full max-w-[420px] aspect-square rounded-[3rem] bg-[#E6F4F1] flex items-center justify-center"
                                >
                                    <div className="text-center px-10">
                                        <div className="text-6xl mb-5">
                                            {mode === "create" ? "🏡" : "🔑"}
                                        </div>

                                        <h3 className="text-2xl font-bold text-[#00695C]">
                                            {mode === "create"
                                                ? "Tu hogar, a tu manera"
                                                : "Bienvenido a tu hogar"}
                                        </h3>

                                        <p className="text-[#6B7280] mt-3">
                                            {mode === "create"
                                                ? "Personalízalo y comienza a organizar tus finanzas."
                                                : "Usa la clave que te proporcionó el administrador."}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
}
