import { Outlet } from "react-router-dom";
import Navbar from "../components/landing/Navbar";

export default function PublicLayout() {
    return(
        <>
            <Navbar />
            <Outlet />
            <footer>Footer</footer>
        </>
    );
}