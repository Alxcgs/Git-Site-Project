import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
    return (
        <div className='flex'>
            <Sidebar />
            <div className='max-w-5xl my-5 text-white mx-auto transition-all duration-300 flex-1'>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;