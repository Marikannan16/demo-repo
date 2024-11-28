import React from 'react';

const Menu = ({ onDownload }) => {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h5 className="p-5 font-semibold">Notification</h5>
            </div>
            <div className="flex items-center space-x-2 px-5 py-5">
                <button className='w-10 h-10 bg-primary p-2 rounded-full'>
                    <svg viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 2.55512C1 2.08363 1.1873 1.63144 1.5207 1.29804C1.8541 0.964645 2.30628 0.777344 2.77778 0.777344H15.2222C15.6937 0.777344 16.1459 0.964645 16.4793 1.29804C16.8127 1.63144 17 2.08363 17 2.55512M1 2.55512V11.444C1 11.9155 1.1873 12.3677 1.5207 12.7011C1.8541 13.0345 2.30628 13.2218 2.77778 13.2218H15.2222C15.6937 13.2218 16.1459 13.0345 16.4793 12.7011C16.8127 12.3677 17 11.9155 17 11.444V2.55512M1 2.55512L9 7.88845L17 2.55512" strokeWidth={1} stroke="white" />
                    </svg>
                </button>
                <button
                    className='w-10 h-10 bg-primary p-2.5 rounded-full'
                    onClick={onDownload}>
                    <svg viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.10096 12.4503L4.09724 8.44769L4.89821 7.63314L7.5353 10.2702V0.484375H8.66661V10.2702L11.3026 7.63427L12.1047 8.44769L8.10096 12.4503ZM0.181763 16.3228V11.7545H1.31308V15.1914H14.8888V11.7545H16.0201V16.3228H0.181763Z" fill="white" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Menu;


// import React from 'react';
// import { FaEnvelope, FaDownload } from 'react-icons/fa';

// const Menu = () => {
//     return (
//         <div className="flex flex-col mb-4 justify-center gap-2 items-start lg:flex-row lg:items-center lg:justify-between">
//             <div>
//                 <h3 className="text-xl font-bold">Notification</h3>
//             </div>
//             <div className="flex items-center gap-2 ">
//                 <button className="rounded-full bg-primary px-3 py-3 text-white">
//                     <FaEnvelope />
//                 </button>
//                 <button className="rounded-full bg-primary px-3 py-3 text-white">
//                     <FaDownload size={15} />
//                 </button>
//             </div>
//         </div>
//     );

// }
// export default Menu;