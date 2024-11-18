import React from 'react'
import { FaBars, FaRegBell, FaRegUserCircle } from "react-icons/fa";

const MainNavbar = ({ toggleSidebar }) => {
    return (
        <div className="bg-blue-600 shadow-lg text-white py-2 px-3 flex items-center justify-between">
            <FaBars onClick={toggleSidebar} className='cursor-pointer text-2xl rounded bg-primary p-1 ' />

            <div className="flex gap-2">
                <FaRegBell className='cursor-pointer p-2 rounded-full bg-primary' size={30} />
                <FaRegUserCircle className='cursor-pointer p-1 rounded-full bg-primary' size={30} />
            </div>
        </div>
    );
}

export default MainNavbar