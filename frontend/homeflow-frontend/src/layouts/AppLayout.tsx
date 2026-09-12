import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import {
    Receipt,
    Apple,
    ShoppingCart,
    StickyNote,
    Users,
    Settings,
    HandCoins,
    Banknote,
    CookingPot,
    HelpCircle,
} from "lucide-react";
import Sidebar, { SidebarItem } from "../components/app/Sidebar";
import { api } from "../api/axiosConfig";
import type { Key } from "react";

interface Menu {
    idMenu: Key;
    icono: string;
    opcion: string;
    ruta: string;
}

interface LayoutData {
    menus: Menu[];
}

export const renderIcon = (iconName: string, size = 20) => {
    const icons: Record<string, React.ReactNode> = {
        Receipt: <Receipt size={size} />,
        Apple: <Apple size={size} />,
        ShoppingCart: <ShoppingCart size={size} />,
        StickyNote: <StickyNote size={size} />,
        Users: <Users size={size} />,
        Settings: <Settings size={size} />,
        HandCoins: <HandCoins size={size} />,
        Banknote: <Banknote size={size} />,
        CookingPot: <CookingPot size={size} />,
    };

    return icons[iconName] || <HelpCircle size={size} />;
};

export default function AppLayout() {
    const [layoutData, setLayoutData] = useState<LayoutData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getLayoutData = async () => {
            try {
                const response = await api.get<LayoutData>("/app/layout-data");
                setLayoutData(response.data);
            } catch (error) {
                console.error("Error obteniendo los datos del layout:", error);
                setError("No se pudo cargar el menú");
            } finally {
                setLoading(false);
            }
        };

        getLayoutData();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2">
            <Sidebar nombre={layoutData?.nombre} correo={layoutData?.correo} iniciales={layoutData?.iniciales}>
                {layoutData?.menus.map((menu) => (
                    <SidebarItem
                        key={menu.idMenu}
                        icon={renderIcon(menu.icono)}
                        text={menu.opcion}
                        href={menu.ruta}
                        alert={false}
                    />
                ))}

                <hr className="my-5 border-gray-200" />

                <SidebarItem
                    icon={<HandCoins size={20} />}
                    text="Próximos pagos"
                    href="/"
                    alert={true}
                />

                <SidebarItem
                    icon={<Banknote size={20} />}
                    text="Presupuesto restante"
                    href="/"
                    alert={true}
                />

                <SidebarItem
                    icon={<CookingPot size={20} />}
                    text="Menú de la semana"
                    href="/"
                    alert={true}
                />
            </Sidebar>

            <main className="mb-10">
                <Outlet />
            </main>
        </div>
    );
}
