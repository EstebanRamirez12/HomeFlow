import { Outlet } from "react-router-dom";
import { Receipt, Apple, ShoppingCart, StickyNote, Users, Settings, HandCoins, Banknote, CookingPot } from "lucide-react";
import Sidebar, { SidebarItem } from "../components/app/Sidebar";


export default function AppLayout() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2">
            <Sidebar>
                <SidebarItem icon={<Receipt size={20} />} text={"Finanzas"} href="/finance" alert={true} />
                <SidebarItem icon={<Apple size={20} />} text={"Meal Preps"} href="/" alert={true} />
                <SidebarItem icon={<ShoppingCart size={20} />} text={"Lista de compras"} href="/" alert={false} />
                <SidebarItem icon={<StickyNote size={20} />} text={"Notas"} href="/" alert={true} />
                <SidebarItem icon={<Users size={20} />} text={"Miembros"} href="/" alert={true} />
                <SidebarItem icon={<Settings size={20} />} text={"Configuración"} href="/" alert={true} />
                <hr className="my-3 border-gray-200 my-5"  />
                <SidebarItem icon={<HandCoins size={20} />} text={"Próximos pagos"} href="/" alert={true} />
                <SidebarItem icon={<Banknote size={20} />} text={"Presupuesto restante"} href="/" alert={true} />
                <SidebarItem icon={<CookingPot size={20} />} text={"Menú de la semana"} href="/" alert={true} />
            </Sidebar>
            <main className="mb-10">
                <Outlet />
            </main>
        </div>
    );
}