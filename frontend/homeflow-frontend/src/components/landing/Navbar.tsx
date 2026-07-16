import Logo from "../../assets/pig_icon2.png"
import { useState } from "react";

const navbarlinks = [
    {
        id: 1,
        title: "Inicio",
        link: "/"
    },
    {
        id: 2,
        title: "Nosotros",
        link: "/"
    },
    {
        id: 3,
        title: "Contacto",
        link: "/"
    },
    {
        id: 4,
        title: "Soporte",
        link: "/"
    }
]

const navbarLogReg = [
    {
        id: 1,
        title: "Registrarse",
        link: "/register"
    },
    {
        id: 2,
        title: "Iniciar sesión",
        link: "/login"
    }
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <nav>
            <div className="flex justify-between items-center sm:px-12 sm:py-6 px-4 padding py-3">
                <div>
                    <img src={Logo} alt="logo" className="w-[80px]" />
                </div>

                {/* Boton hamburguesa*/}
                <button className="text-[#00695C] md:hidden" onClick={toggleMenu}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                        {isOpen ?
                            (<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />) :
                            (<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />)
                        }
                    </svg>
                </button>

                {/* Menu Desktop */}
                <div className="hidden md:block">
                    <ul className="flex sm:space-x-8 space-x-4">
                        {navbarlinks.map((link) => (
                            <li key={link.id} >
                                <a href={link.link} className="text-[#00695C] sm:text-lg text-sm transition-transform hover:scale-110 tranform inline-block duration-300">
                                    {link.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="hidden md:block">
                    <ul className="flex sm:space-x-8 space-x-4">
                        {navbarLogReg.map((link) => (
                            <li key={link.id} >
                                <a href={link.link} className="text-[#00695C] sm:text-lg text-sm transition-transform hover:scale-110 tranform inline-block duration-300">
                                    {link.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Menu Movil */}
            <div className={`md:hidden absolute w-full bg-[#e4e6eb] transition-all duration-400 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                <ul className="flex flex-col px-4 py-2">
                    {navbarlinks.map((link) => (
                        <li key={link.id} className="py-2 text-center">
                            <a href={link.link} className="text-[#00695C] hover:text-sky-50" onClick={() => setIsOpen(false)}>
                                {link.title}
                            </a>
                        </li>
                    ))}
                </ul>

                <ul className="flex flex-col px-4 py-2 border-t border-white">
                    {navbarLogReg.map((link) => (
                        <li key={link.id} className="py-2 text-center">
                            <a href={link.link} className="text-[#00695C] hover:text-sky-50" onClick={() => setIsOpen(false)}>
                                {link.title}
                            </a>
                        </li>
                    ))}
                </ul>

            </div>

        </nav>
    );
} 