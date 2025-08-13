import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function Layout() {
    return (
        <>
        <Navbar />
        <div className="container">
        <Outlet></Outlet>
        </div>
            
        </>
    )
}

export default Layout;
