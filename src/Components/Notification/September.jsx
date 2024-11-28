import React, { useState } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaEllipsisV } from 'react-icons/fa';

const September = ({ time, message, status }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [currentStatus, setCurrentStatus] = useState('unread');
    const [isChecked, setIsChecked] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(prev => !prev);
    };

    const handleToggleReadStatus = () => {
        setCurrentStatus(prevStatus => (prevStatus === 'unread' ? 'read' : 'unread'));
        setDropdownOpen(false);
    };

    const handleCheckboxToggle = () => {
        setIsChecked(prevState => !prevState);
    };

    const handleDateClick = () => {
        handleCheckboxToggle();
    };

    return (
        <div
            className={`flex justify-between md:items-start lg:items-center p-5 ${currentStatus === 'unread' ? 'bg-white' : 'bg-bordergray'}`}
        >
            <div className="flex items-start gap-2">
                <span className="flex items-start lg:items-center justify-center gap-2">
                    <input
                        type="checkbox"
                        className="text-black font-semi-bold"
                        checked={isChecked}
                        onChange={handleCheckboxToggle}
                    />
                    <p className="text-sm text-black w-10 lg:w-40" onClick={handleDateClick}>
                        {time}
                    </p>
                </span>

                <div className="flex flex-col sm:flex-row md:flex-row lg:ps-32 md:ps-20">
                    <div>
                        {status === 'success' ? (
                            // <FaCheckCircle className="text-green-500 h-5 w-5" />
                            <svg className="rounded-full p-1 bg-green-500 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                        ) : (
                            // <FaExclamationCircle className="text-red-500 h-5 w-5" />
                            <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                            </svg>
                        )}
                    </div>
                </div>
                <div>
                    <p className="text-sm text-black">{message}</p>
                </div>
            </div>

            <div className="relative text-black cursor-pointer sm:ps-10">
                <div onClick={toggleDropdown}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    </svg>

                </div>
                {dropdownOpen && (
                    <div className="absolute right-0 mt-1 w-36 bg-white border border-bordergray rounded-md shadow-lg">
                        <button
                            onClick={handleToggleReadStatus}
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-bordergray"
                        >
                            {currentStatus === 'unread' ? 'Mark as Read' : 'Mark as Unread'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default September;