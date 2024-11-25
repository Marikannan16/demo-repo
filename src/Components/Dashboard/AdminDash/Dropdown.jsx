import React, { useState, useRef } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import { RiCalendar2Line, RiCloseLine } from 'react-icons/ri';
import { FaDownload } from 'react-icons/fa';

const Dropdown = ({ onFilterChange, startDate, setStartDate, onDownloadClick }) => {
  const [filters, setFilters] = useState({
    company: '',
    state: '',
    branch: '',
    area: '',
    priority: '',
    username: '',
    compliancetype: '',
    date: null,
  });
  const datePickerRef = useRef(null);

  const handleFilterChange = (field, value) => {
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleCalendarIconClick = () => {
    if (datePickerRef.current && datePickerRef.current.flatpickr) {
      datePickerRef.current.flatpickr.open();
    }
  };

  const handleCloseIconClick = () => {
    if (datePickerRef.current && datePickerRef.current.flatpickr) {
      datePickerRef.current.flatpickr.clear();
    }
    setFilters((prev) => ({ ...prev, date: null }));
    setStartDate(null);
  };
  return (
    <div className="flex flex-wrap items-center gap-2 mt-4 mb-4 ">
      <select className="p-2 border border-bordergray bg-selectbg rounded-lg focus:outline-none w-full sm:w-32" value={filters.company} onChange={(e) => handleFilterChange('company', e.target.value)}>
        <option value="">Company</option>
        <option value="Acme Corporation">Acme Corporation</option>
        <option value="Hamll - Gusikowski">Hamll - Gusikowski</option>
        <option value="Lehner Inc">Lehner Inc</option>
        <option value="Han Inc">Han Inc</option>
        <option value="Zeme and Sons">Zeme and Sons</option>
      </select>

      <select className="p-2 border border-bordergray bg-selectbg rounded-lg focus:outline-none  w-full sm:w-32" value={filters.state} onChange={(e) => handleFilterChange('state', e.target.value)}>
        <option value="">State</option>
        <option value="Tamilnadu">Tamilnadu</option>
        <option value="Mumbai">Mumbai</option>
      </select>

      <select className="p-2 border border-bordergray bg-selectbg rounded-lg focus:outline-none   w-full sm:w-32" value={filters.branch} onChange={(e) => handleFilterChange('branch', e.target.value)}>
        <option value="">Branch</option>
        <option value="Rayapuram">Rayapuram</option>
        <option value="Indira Nagar">Indira Nagar</option>
        <option value="Madurai">Madurai</option>
        <option value="Adayar">Adayar</option>
        <option value="Nagaon">Nagaon</option>
      </select>

      <select className="p-2 border border-bordergray bg-selectbg rounded-lg focus:outline-none   w-full sm:w-32" value={filters.area} onChange={(e) => handleFilterChange('area', e.target.value)}>
        <option value="">Area</option>
        <option value="Area1">Area 1</option>
        <option value="Area2">Area 2</option>
      </select>

      <select className="p-2 border border-bordergray bg-selectbg rounded-lg focus:outline-none   w-full sm:w-32" value={filters.username} onChange={(e) => handleFilterChange('username', e.target.value)}>
        <option value="">User Name</option>
        <option value="username 1">Username 1</option>
        <option value="username 2">Username 2</option>
      </select>

      <select className="p-2 border border-bordergray bg-selectbg rounded-lg focus:outline-none   w-full sm:w-40" value={filters.compliancetype} onChange={(e) => handleFilterChange('compliancetype', e.target.value)}>
        <option value="">Compliance Type</option>
        <option value="compliance type 1">Compliance Type 1</option>
        <option value="compliance type 2">Compliance Type 2</option>
      </select>

      <select className="p-2 border border-bordergray bg-selectbg rounded-lg focus:outline-none   w-full sm:w-32" value={filters.priority} onChange={(e) => handleFilterChange('priority', e.target.value)}>
        <option value="">Priority</option>
        <option value="Priority1">Priority 1</option>
        <option value="Priority2">Priority 2</option>
      </select>

      <div className="relative w-full sm:w-48 lg:w-32 md:w-60 ">
        <Flatpickr
          ref={datePickerRef}
          value={filters.date}
          options={{ mode: 'range', dateFormat: 'd/m/Y' }}
          className="py-2 px-1 border border-bordergray rounded-lg focus:outline-none w-full"
          placeholder="Date Range"
          onChange={(dates) => {
            setStartDate(dates);
            handleFilterChange('date', dates);
          }}
        />
        {filters.date == null && (
          <svg className="absolute h-5 w-5 bg-white right-1 top-2.5 cursor-pointer p-0.5" onClick={handleCalendarIconClick} viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M13.875 13.4046C13.875 14.495 12.995 15.375 11.9046 15.375H2.09538C1.005 15.375 0.125 14.495 0.125 13.4046V3.59538C0.125 2.505 1.005 1.625 2.09538 1.625H4.25V0.944375C4.25111 0.782604 4.30812 0.626192 4.41136 0.501646C4.51461 0.3771 4.65774 0.292082 4.8165 0.261L4.9375 0.25C5.317 0.25 5.625 0.54425 5.625 0.944375V1.625H8.375V0.944375C8.37611 0.782604 8.43312 0.626192 8.53636 0.501646C8.63961 0.3771 8.78274 0.292082 8.9415 0.261L9.0625 0.25C9.442 0.25 9.75 0.54425 9.75 0.944375V1.625H11.9046C12.995 1.625 13.875 2.505 13.875 3.59538V13.4046ZM1.5 5.75V13.0787C1.5 13.5875 1.9125 14 2.42125 14H11.5787C12.0875 14 12.5 13.5875 12.5 13.0787V5.75H1.5ZM3.5625 11.25C3.89937 11.25 4.18125 11.5016 4.239 11.8165L4.25 11.9375C4.25 12.2744 3.99837 12.5562 3.6835 12.614L3.5625 12.625C3.38072 12.6232 3.20689 12.5502 3.07834 12.4217C2.9498 12.2931 2.87679 12.1193 2.875 11.9375C2.875 11.6006 3.12663 11.3188 3.4415 11.261L3.5625 11.25ZM7 11.25C7.33687 11.25 7.61875 11.5016 7.6765 11.8165L7.6875 11.9375C7.6875 12.2744 7.43588 12.5562 7.121 12.614L7 12.625C6.81822 12.6232 6.64439 12.5502 6.51584 12.4217C6.3873 12.2931 6.31429 12.1193 6.3125 11.9375C6.3125 11.6006 6.56413 11.3188 6.879 11.261L7 11.25ZM10.4375 11.25C10.7744 11.25 11.0562 11.5016 11.114 11.8165L11.125 11.9375C11.125 12.2744 10.8734 12.5562 10.5585 12.614L10.4375 12.625C10.2557 12.6232 10.0819 12.5502 9.95334 12.4217C9.8248 12.2931 9.75179 12.1193 9.75 11.9375C9.75 11.6006 10.0016 11.3188 10.3165 11.261L10.4375 11.25ZM3.5625 9.1875C3.89937 9.1875 4.18125 9.43913 4.239 9.754L4.25 9.875C4.25 10.2119 3.99837 10.4937 3.6835 10.5515L3.5625 10.5625C3.38072 10.5607 3.20689 10.4877 3.07834 10.3592C2.9498 10.2306 2.87679 10.0568 2.875 9.875C2.875 9.53813 3.12663 9.25625 3.4415 9.1985L3.5625 9.1875ZM7 9.1875C7.33687 9.1875 7.61875 9.43913 7.6765 9.754L7.6875 9.875C7.6875 10.2119 7.43588 10.4937 7.121 10.5515L7 10.5625C6.81822 10.5607 6.64439 10.4877 6.51584 10.3592C6.3873 10.2306 6.31429 10.0568 6.3125 9.875C6.3125 9.53813 6.56413 9.25625 6.879 9.1985L7 9.1875ZM10.4375 9.1875C10.7744 9.1875 11.0562 9.43913 11.114 9.754L11.125 9.875C11.125 10.2119 10.8734 10.4937 10.5585 10.5515L10.4375 10.5625C10.2557 10.5607 10.0819 10.4877 9.95334 10.3592C9.8248 10.2306 9.75179 10.0568 9.75 9.875C9.75 9.53813 10.0016 9.25625 10.3165 9.1985L10.4375 9.1875ZM3.5625 7.125C3.89937 7.125 4.18125 7.37663 4.239 7.6915L4.25 7.8125C4.25 8.14937 3.99837 8.43125 3.6835 8.489L3.5625 8.5C3.38072 8.49821 3.20689 8.4252 3.07834 8.29666C2.9498 8.16811 2.87679 7.99428 2.875 7.8125C2.875 7.47563 3.12663 7.19375 3.4415 7.136L3.5625 7.125ZM7 7.125C7.33687 7.125 7.61875 7.37663 7.6765 7.6915L7.6875 7.8125C7.6875 8.14937 7.43588 8.43125 7.121 8.489L7 8.5C6.81822 8.49821 6.64439 8.4252 6.51584 8.29666C6.3873 8.16811 6.31429 7.99428 6.3125 7.8125C6.3125 7.47563 6.56413 7.19375 6.879 7.136L7 7.125ZM10.4375 7.125C10.7744 7.125 11.0562 7.37663 11.114 7.6915L11.125 7.8125C11.125 8.14937 10.8734 8.43125 10.5585 8.489L10.4375 8.5C10.2557 8.49821 10.0819 8.4252 9.95334 8.29666C9.8248 8.16811 9.75179 7.99428 9.75 7.8125C9.75 7.47563 10.0016 7.19375 10.3165 7.136L10.4375 7.125ZM1.5 4.375H12.5V3.92125C12.5 3.4125 12.0875 3 11.5787 3H2.42125C1.9125 3 1.5 3.4125 1.5 3.92125V4.375Z" fill="black" />
          </svg>
          // <RiCalendar2Line
          //   className="absolute right-2 top-3.5 w-4 h-4 cursor-pointer text-black-400 bg-white "
          //   onClick={handleCalendarIconClick}
          // />
        )}

        {filters.date && filters.date.length > 0 && (
          <svg className="absolute h-5 w-5 bg-white right-1 top-2.5 cursor-pointer" onClick={handleCloseIconClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"></path>
          </svg>
          // <RiCloseLine
          //   size={20}
          //   className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-black bg-white"
          //   onClick={handleCloseIconClick}
          // />
        )}
      </div>

      <button
        onClick={onDownloadClick}
        className="rounded-full bg-primary p-2.5 w-9 h-9 text-white lg:ms-2">
        {/* <FaDownload size={16} /> */}
        <svg viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.10096 12.4503L4.09724 8.44769L4.89821 7.63314L7.5353 10.2702V0.484375H8.66661V10.2702L11.3026 7.63427L12.1047 8.44769L8.10096 12.4503ZM0.181763 16.3228V11.7545H1.31308V15.1914H14.8888V11.7545H16.0201V16.3228H0.181763Z" fill="white" strokeWidth={2} />
        </svg>
      </button>
    </div>
  );
};

export default Dropdown;