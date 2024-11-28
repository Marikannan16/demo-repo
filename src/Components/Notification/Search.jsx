import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import flatpickr from 'flatpickr';
import "flatpickr/dist/themes/material_blue.css";


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
            });
        }
    }, [startDate, setStartDate]);

    const handleCalendarIconClick = () => {
        if (datePickerRef.current && datePickerRef.current._flatpickr) {
            datePickerRef.current._flatpickr.open();
        }
    };

    const handleCloseIconClick = () => {
        if (datePickerRef.current && datePickerRef.current._flatpickr) {
            datePickerRef.current._flatpickr.clear();
        }
        setStartDate(null);
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
                    readOnly
                />
                {!startDate && (
                    // <RiCalendar2Line
                    //     className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer text--400"
                    //     onClick={handleCalendarIconClick}
                    // />
                    <svg onClick={handleCalendarIconClick} className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer text--400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                    </svg>

                )}
                {startDate && (
                    <button
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-black bg-white"
                        onClick={handleCloseIconClick}>✖</button>
                )}
            </div>

            <div className="flex items-center border border-bordergray rounded-lg px-2 py-2 w-full md:w-64">
                {/* <CiSearch size={20} className="mr-2 text-black cursor-pointer" onClick={handleSearchClick} /> */}
                <svg className="mr-2 text-black cursor-pointer" onClick={handleSearchClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
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
