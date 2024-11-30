import React from 'react'
import { FaBars, FaRegBell, FaRegUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

const MainNavbar = ({ toggleSidebar }) => {
    return (
        <div className="bg-white shadow-lg text-white py-2 px-3 flex items-center justify-between">
            {/* <FaBars onClick={toggleSidebar} className='cursor-pointer text-2xl rounded bg-primary p-1 ' /> */}
            <svg className=' h-7 w-7 text-white cursor-pointer text-2xl' onClick={toggleSidebar} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M2.41343 25.1766C4.36809 27.1286 7.50943 27.1286 13.7948 27.1286C20.0801 27.1286 23.2228 27.1286 25.1748 25.1752C27.1281 23.2246 27.1281 20.0806 27.1281 13.7952C27.1281 7.50991 27.1281 4.36725 25.1748 2.41391C23.2241 0.461914 20.0801 0.461914 13.7948 0.461914C7.50943 0.461914 4.36676 0.461914 2.41343 2.41391C0.461426 4.36858 0.461426 7.50991 0.461426 13.7952C0.461426 20.0806 0.461426 23.2246 2.41343 25.1766ZM22.7948 19.1286C22.7948 19.3938 22.6894 19.6482 22.5019 19.8357C22.3143 20.0232 22.06 20.1286 21.7948 20.1286H5.79476C5.52954 20.1286 5.27519 20.0232 5.08765 19.8357C4.90012 19.6482 4.79476 19.3938 4.79476 19.1286C4.79476 18.8634 4.90012 18.609 5.08765 18.4215C5.27519 18.2339 5.52954 18.1286 5.79476 18.1286H21.7948C22.06 18.1286 22.3143 18.2339 22.5019 18.4215C22.6894 18.609 22.7948 18.8634 22.7948 19.1286ZM21.7948 14.7952C22.06 14.7952 22.3143 14.6899 22.5019 14.5024C22.6894 14.3148 22.7948 14.0605 22.7948 13.7952C22.7948 13.53 22.6894 13.2757 22.5019 13.0881C22.3143 12.9006 22.06 12.7952 21.7948 12.7952H5.79476C5.52954 12.7952 5.27519 12.9006 5.08765 13.0881C4.90012 13.2757 4.79476 13.53 4.79476 13.7952C4.79476 14.0605 4.90012 14.3148 5.08765 14.5024C5.27519 14.6899 5.52954 14.7952 5.79476 14.7952H21.7948ZM22.7948 8.46191C22.7948 8.72713 22.6894 8.98148 22.5019 9.16902C22.3143 9.35656 22.06 9.46191 21.7948 9.46191H5.79476C5.52954 9.46191 5.27519 9.35656 5.08765 9.16902C4.90012 8.98148 4.79476 8.72713 4.79476 8.46191C4.79476 8.1967 4.90012 7.94234 5.08765 7.75481C5.27519 7.56727 5.52954 7.46191 5.79476 7.46191H21.7948C22.06 7.46191 22.3143 7.56727 22.5019 7.75481C22.6894 7.94234 22.7948 8.1967 22.7948 8.46191Z" fill="#d7b95f" />
            </svg>

            <div className="flex gap-2">
                <Link to='/notification'>
                    {/* <FaRegBell className='cursor-pointer p-2 rounded-full bg-primary' size={30} /> */}
                    <svg className='h-[30px] w-[30px] rounded-full bg-primary p-1.5 text-white' viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 15V16C6 16.7956 6.31607 17.5587 6.87868 18.1213C7.44129 18.6839 8.20435 19 9 19C9.79565 19 10.5587 18.6839 11.1213 18.1213C11.6839 17.5587 12 16.7956 12 16V15M7 3C7 2.46957 7.21071 1.96086 7.58579 1.58579C7.96086 1.21071 8.46957 1 9 1C9.53043 1 10.0391 1.21071 10.4142 1.58579C10.7893 1.96086 11 2.46957 11 3C12.1484 3.54303 13.1274 4.38833 13.8321 5.4453C14.5367 6.50227 14.9404 7.73107 15 9V12C15.0753 12.6217 15.2954 13.2171 15.6428 13.7381C15.9902 14.2592 16.4551 14.6914 17 15H1C1.54494 14.6914 2.00981 14.2592 2.35719 13.7381C2.70457 13.2171 2.92474 12.6217 3 12V9C3.05956 7.73107 3.4633 6.50227 4.16795 5.4453C4.8726 4.38833 5.85159 3.54303 7 3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
                <svg className='h-[30px] w-[30px] rounded-full bg-primary p-1.5 text-white' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.87196 20.371C5.17447 19.3642 5.79348 18.4817 6.63715 17.8544C7.48082 17.2272 8.50422 16.8886 9.55552 16.8889H14.4444C15.4971 16.8885 16.5217 17.2279 17.366 17.8566C18.2103 18.4853 18.8291 19.3697 19.1304 20.3783M1 12C1 13.4445 1.28452 14.8749 1.83733 16.2095C2.39013 17.5441 3.20038 18.7567 4.22183 19.7782C5.24327 20.7996 6.4559 21.6099 7.79048 22.1627C9.12506 22.7155 10.5555 23 12 23C13.4445 23 14.8749 22.7155 16.2095 22.1627C17.5441 21.6099 18.7567 20.7996 19.7782 19.7782C20.7996 18.7567 21.6099 17.5441 22.1627 16.2095C22.7155 14.8749 23 13.4445 23 12C23 10.5555 22.7155 9.12506 22.1627 7.79048C21.6099 6.4559 20.7996 5.24327 19.7782 4.22183C18.7567 3.20038 17.5441 2.39013 16.2095 1.83733C14.8749 1.28452 13.4445 1 12 1C10.5555 1 9.12506 1.28452 7.79048 1.83733C6.4559 2.39013 5.24327 3.20038 4.22183 4.22183C3.20038 5.24327 2.39013 6.4559 1.83733 7.79048C1.28452 9.12506 1 10.5555 1 12ZM8.33333 9.55556C8.33333 10.528 8.71964 11.4606 9.40727 12.1483C10.0949 12.8359 11.0275 13.2222 12 13.2222C12.9725 13.2222 13.9051 12.8359 14.5927 12.1483C15.2804 11.4606 15.6667 10.528 15.6667 9.55556C15.6667 8.58309 15.2804 7.65046 14.5927 6.96283C13.9051 6.2752 12.9725 5.88889 12 5.88889C11.0275 5.88889 10.0949 6.2752 9.40727 6.96283C8.71964 7.65046 8.33333 8.58309 8.33333 9.55556Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {/* <FaRegUserCircle className='cursor-pointer p-1 rounded-full bg-primary' size={30} /> */}
            </div>
        </div>
    );
}

export default MainNavbar
