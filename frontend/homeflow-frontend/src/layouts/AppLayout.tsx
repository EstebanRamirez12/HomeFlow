import { Outlet } from "react-router-dom";
export default function AppLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="mb-10">
                <div>Vista App</div>
                <Outlet />
            </main>
        </div>
    );
}