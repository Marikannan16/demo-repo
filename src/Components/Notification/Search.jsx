// import React from 'react';
// import "rsuite/dist/rsuite.min.css";
// import { DatePicker } from "rsuite";
// import { CiSearch } from 'react-icons/ci';

// const Search = ({ searchTerm, setSearchTerm, dateRange, setDateRange }) => {
//     const handleDateChange = (date) => {
//         setDateRange([date, date]); 
//     };

//     return (
//         <div className="flex items-center p-5 gap-4 px-2 py-2">
//             <DatePicker 
//                 block 
//                 placeholder="Date Range" 
//                 format="dd-MM-yyyy" 
//                 value={dateRange[0]} 
//                 onChange={handleDateChange}
//             />
//             <div className="flex items-center border rounded-lg px-2 py-2">
//                 <CiSearch className="mr-2" />
//                 <input 
//                     type="text" 
//                     placeholder="Search" 
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)} 
//                     className="border-none focus:outline-none" 
//                 />
//             </div>
//         </div>
//     );
// };

// export default Search;





// import React from 'react';
// import "rsuite/dist/rsuite.min.css";
// import { DatePicker } from "rsuite";
// import { CiSearch } from 'react-icons/ci';

// const Search = ({ searchTerm, setSearchTerm}) => {
//     // const handleDateChange = (date) => {
//     //     setDateRange([date, date]); 
//     // };

//     return (
//         <div className="flex flex-col md:flex-row items-center p-5 gap-4 px-2 py-2">
//             <DatePicker 
//                 block 
//                 placeholder="Date Range" 
//                 format="dd-MM-yyyy" 
//                 // value={dateRange[0]} 
//                 // onChange={handleDateChange}
//                 className="w-full md:w-auto"
//             />
//             <div className="flex items-center border rounded-lg px-2 py-2 w-full md:w-auto">
//                 <CiSearch className="mr-2" />
//                 <input 
//                     type="text" 
//                     placeholder="Search" 
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)} 
//                     className="border-none focus:outline-none w-full" 
//                 />
//             </div>
//         </div>
//     );
// };

// export default Search;





// 


import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import flatpickr from 'flatpickr';
import "flatpickr/dist/themes/material_blue.css";
import { RiCalendar2Line } from 'react-icons/ri';
// import { CiSearch } from 'react-icons/ci';

const Search = ({ searchTerm, setSearchTerm, startDate, setStartDate }) => {
    const datePickerRef = useRef(null);
    const searchRef = useRef(null);

    useEffect(() => {
        if (datePickerRef.current) {
            flatpickr(datePickerRef.current, {
                mode: "range",
                dateFormat: "d/m/Y",
                defaultDate: startDate || null,
                onChange: (selectedDates) => {
                    setStartDate(selectedDates.length === 2 ? selectedDates : null);
                },
                // allowInput: true, 
            });
        }
    }, [startDate, setStartDate]);

    const handleCalendarIconClick = () => {
        if (datePickerRef.current && datePickerRef.current._flatpickr) {
            datePickerRef.current._flatpickr.open();
        }
    };

    const handleSearchClick = () => {
        if (searchRef.current) {
            searchRef.current.focus();
        }
    };

    const formattedDateRange = startDate && startDate.length === 2
        ? moment(startDate[0]).isSame(startDate[1], 'day')
            ? `${moment(startDate[0]).format('DD/MM/YYYY')}`
            : `${moment(startDate[0]).format('DD/MM/YYYY')} to ${moment(startDate[1]).format('DD/MM/YYYY')}`
        : startDate && startDate.length === 1
            ? `${moment(startDate[0]).format('DD/MM/YYYY')}`
            : '';

    return (
        <div className="flex flex-col md:flex-row items-center gap-4 px-4 py-2 text-black">
            <div className="relative flex items-center border border-bordergray rounded-lg px-4 py-2 w-full md:w-64">
                <input
                    ref={datePickerRef}
                    type="text"
                    value={formattedDateRange}
                    placeholder="Date Range"
                    className="w-full border-none focus:outline-none"
                // readOnly  
                />
                {/* <RiCalendar2Line
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer ${startDate && startDate.length === 1 ? 'text-gray-400' : ''}`}
                    onClick={handleCalendarIconClick}
                    disabled={startDate && startDate.length === 1}  
                /> */}
                <svg viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                    className={`absolute w-5 h-5 right-3 top-1/2 transform -translate-y-1/2 cursor-pointer ${startDate && startDate.length === 1 ? 'text-gray-400' : ''}`}
                    onClick={handleCalendarIconClick}
                    disabled={startDate && startDate.length === 1}
                >
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.875 13.4046C13.875 14.495 12.995 15.375 11.9046 15.375H2.09538C1.005 15.375 0.125 14.495 0.125 13.4046V3.59538C0.125 2.505 1.005 1.625 2.09538 1.625H4.25V0.944375C4.25111 0.782604 4.30812 0.626192 4.41136 0.501646C4.51461 0.3771 4.65774 0.292082 4.8165 0.261L4.9375 0.25C5.317 0.25 5.625 0.54425 5.625 0.944375V1.625H8.375V0.944375C8.37611 0.782604 8.43312 0.626192 8.53636 0.501646C8.63961 0.3771 8.78274 0.292082 8.9415 0.261L9.0625 0.25C9.442 0.25 9.75 0.54425 9.75 0.944375V1.625H11.9046C12.995 1.625 13.875 2.505 13.875 3.59538V13.4046ZM1.5 5.75V13.0787C1.5 13.5875 1.9125 14 2.42125 14H11.5787C12.0875 14 12.5 13.5875 12.5 13.0787V5.75H1.5ZM3.5625 11.25C3.89937 11.25 4.18125 11.5016 4.239 11.8165L4.25 11.9375C4.25 12.2744 3.99837 12.5562 3.6835 12.614L3.5625 12.625C3.38072 12.6232 3.20689 12.5502 3.07834 12.4217C2.9498 12.2931 2.87679 12.1193 2.875 11.9375C2.875 11.6006 3.12663 11.3188 3.4415 11.261L3.5625 11.25ZM7 11.25C7.33687 11.25 7.61875 11.5016 7.6765 11.8165L7.6875 11.9375C7.6875 12.2744 7.43588 12.5562 7.121 12.614L7 12.625C6.81822 12.6232 6.64439 12.5502 6.51584 12.4217C6.3873 12.2931 6.31429 12.1193 6.3125 11.9375C6.3125 11.6006 6.56413 11.3188 6.879 11.261L7 11.25ZM10.4375 11.25C10.7744 11.25 11.0562 11.5016 11.114 11.8165L11.125 11.9375C11.125 12.2744 10.8734 12.5562 10.5585 12.614L10.4375 12.625C10.2557 12.6232 10.0819 12.5502 9.95334 12.4217C9.8248 12.2931 9.75179 12.1193 9.75 11.9375C9.75 11.6006 10.0016 11.3188 10.3165 11.261L10.4375 11.25ZM3.5625 9.1875C3.89937 9.1875 4.18125 9.43913 4.239 9.754L4.25 9.875C4.25 10.2119 3.99837 10.4937 3.6835 10.5515L3.5625 10.5625C3.38072 10.5607 3.20689 10.4877 3.07834 10.3592C2.9498 10.2306 2.87679 10.0568 2.875 9.875C2.875 9.53813 3.12663 9.25625 3.4415 9.1985L3.5625 9.1875ZM7 9.1875C7.33687 9.1875 7.61875 9.43913 7.6765 9.754L7.6875 9.875C7.6875 10.2119 7.43588 10.4937 7.121 10.5515L7 10.5625C6.81822 10.5607 6.64439 10.4877 6.51584 10.3592C6.3873 10.2306 6.31429 10.0568 6.3125 9.875C6.3125 9.53813 6.56413 9.25625 6.879 9.1985L7 9.1875ZM10.4375 9.1875C10.7744 9.1875 11.0562 9.43913 11.114 9.754L11.125 9.875C11.125 10.2119 10.8734 10.4937 10.5585 10.5515L10.4375 10.5625C10.2557 10.5607 10.0819 10.4877 9.95334 10.3592C9.8248 10.2306 9.75179 10.0568 9.75 9.875C9.75 9.53813 10.0016 9.25625 10.3165 9.1985L10.4375 9.1875ZM3.5625 7.125C3.89937 7.125 4.18125 7.37663 4.239 7.6915L4.25 7.8125C4.25 8.14937 3.99837 8.43125 3.6835 8.489L3.5625 8.5C3.38072 8.49821 3.20689 8.4252 3.07834 8.29666C2.9498 8.16811 2.87679 7.99428 2.875 7.8125C2.875 7.47563 3.12663 7.19375 3.4415 7.136L3.5625 7.125ZM7 7.125C7.33687 7.125 7.61875 7.37663 7.6765 7.6915L7.6875 7.8125C7.6875 8.14937 7.43588 8.43125 7.121 8.489L7 8.5C6.81822 8.49821 6.64439 8.4252 6.51584 8.29666C6.3873 8.16811 6.31429 7.99428 6.3125 7.8125C6.3125 7.47563 6.56413 7.19375 6.879 7.136L7 7.125ZM10.4375 7.125C10.7744 7.125 11.0562 7.37663 11.114 7.6915L11.125 7.8125C11.125 8.14937 10.8734 8.43125 10.5585 8.489L10.4375 8.5C10.2557 8.49821 10.0819 8.4252 9.95334 8.29666C9.8248 8.16811 9.75179 7.99428 9.75 7.8125C9.75 7.47563 10.0016 7.19375 10.3165 7.136L10.4375 7.125ZM1.5 4.375H12.5V3.92125C12.5 3.4125 12.0875 3 11.5787 3H2.42125C1.9125 3 1.5 3.4125 1.5 3.92125V4.375Z" fill="black" />
                </svg>
            </div>

            <div className="flex items-center border border-bordergray rounded-lg px-2 py-2 w-full md:w-64">
                {/* <CiSearch size={20} className="mr-2 text-black cursor-pointer" onClick={handleSearchClick} /> */}
                <svg className="mr-2 text-black cursor-pointer h-6 w-6" onClick={handleSearchClick} viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 19.5L13 13.5M1 8.5C1 9.41925 1.18106 10.3295 1.53284 11.1788C1.88463 12.0281 2.40024 12.7997 3.05025 13.4497C3.70026 14.0998 4.47194 14.6154 5.32122 14.9672C6.1705 15.3189 7.08075 15.5 8 15.5C8.91925 15.5 9.82951 15.3189 10.6788 14.9672C11.5281 14.6154 12.2997 14.0998 12.9497 13.4497C13.5998 12.7997 14.1154 12.0281 14.4672 11.1788C14.8189 10.3295 15 9.41925 15 8.5C15 7.58075 14.8189 6.6705 14.4672 5.82122C14.1154 4.97194 13.5998 4.20026 12.9497 3.55025C12.2997 2.90024 11.5281 2.38463 10.6788 2.03284C9.82951 1.68106 8.91925 1.5 8 1.5C7.08075 1.5 6.1705 1.68106 5.32122 2.03284C4.47194 2.38463 3.70026 2.90024 3.05025 3.55025C2.40024 4.20026 1.88463 4.97194 1.53284 5.82122C1.18106 6.6705 1 7.58075 1 8.5Z" stroke="gray" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-none focus:outline-none w-full"
                />
            </div>
        </div>
    );
};

export default Search;