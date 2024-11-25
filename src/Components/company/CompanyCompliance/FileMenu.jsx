import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { FiEye } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { HiOutlinePencil } from "react-icons/hi";
import { Data } from "../compliance/Data";
const FileMenu = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);


    };

    return (
        <div className="relative flex">
            <button className="three-dot-icon" onClick={toggleMenu} aria-label="More options">
                <svg className=" h-6 w-6 text-black" viewBox="0 0 25 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.2977 1.35156V7.57378C15.2977 7.98634 15.4616 8.38201 15.7533 8.67373C16.0451 8.96545 16.4407 9.12934 16.8533 9.12934H23.0755M15.2977 1.35156H4.40884C3.58372 1.35156 2.7924 1.67934 2.20895 2.26279C1.62551 2.84623 1.29773 3.63756 1.29773 4.46267V26.2405C1.29773 27.0656 1.62551 27.8569 2.20895 28.4403C2.7924 29.0238 3.58372 29.3516 4.40884 29.3516H19.9644C20.7895 29.3516 21.5808 29.0238 22.1643 28.4403C22.7477 27.8569 23.0755 27.0656 23.0755 26.2405V9.12934M15.2977 1.35156L23.0755 9.12934M7.51995 23.1293H16.8533M7.51995 16.9071H16.8533" stroke={`${data ? 'black' : 'red'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {isOpen && (
                <div className=" absolute right-8 top-0 flex font-medium px-2 bg-white shadow-md  z-30">
                    <div className=" px-1 w-24  bg-gray-300 rounded-lg  ">
                        <div className="flex gap-2 py-1 hover:bg-gray-200 items-center " onClick={() => optionClick("Edit")}>
                            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                            </svg> <button>Update</button>
                        </div>
                        <div className="flex gap-2 py-1 hover:bg-gray-200 items-center" onClick={() => optionClick("Delete")}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                            <button>Delete</button>
                        </div>
                        <div className="flex gap-2 py-1 hover:bg-gray-200 items-center" onClick={() => optionClick("View")}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            <button>View</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileMenu;