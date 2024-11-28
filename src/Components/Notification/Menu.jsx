import React from 'react';
import { FaEnvelope, FaDownload } from 'react-icons/fa';

const Menu = ({ onDownload }) => {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h5 className="p-5 font-semibold">Notification</h5>
            </div>
            <div className="flex items-center space-x-2 px-5 py-5">
                <button className="rounded-full bg-primary px-1 ps-2 h-10 w-10 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                </button>
                <button
                    className="rounded-full bg-primary p-2 w-10 h-10 text-white"
                    onClick={onDownload}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>

                </button>
            </div>
        </div>
    );
};

export default Menu;