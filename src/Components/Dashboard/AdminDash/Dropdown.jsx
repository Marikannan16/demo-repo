import React, { useState, useRef } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/dark.css';

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
      <select className="p-2 border border-bordergray rounded-lg focus:outline-none w-full lg:w-36 sm:w-32" value={filters.company} onChange={(e) => handleFilterChange('company', e.target.value)}>
        <option value="">Company</option>
        <option value="Acme Corporation">Acme Corporation</option>
        <option value="Hamll - Gusikowski">Hamll - Gusikowski</option>
        <option value="Lehner Inc">Lehner Inc</option>
        <option value="Han Inc">Han Inc</option>
        <option value="Zeme and Sons">Zeme and Sons</option>
      </select>

      <select className="p-2 border border-bordergray rounded-lg focus:outline-none  w-full sm:w-32 lg:w-36" value={filters.state} onChange={(e) => handleFilterChange('state', e.target.value)}>
        <option value="">State</option>
        <option value="Tamilnadu">Tamilnadu</option>
        <option value="Mumbai">Mumbai</option>
      </select>

      <select className="p-2 border border-bordergray rounded-lg focus:outline-none   w-full sm:w-32 lg:w-36" value={filters.branch} onChange={(e) => handleFilterChange('branch', e.target.value)}>
        <option value="">Branch</option>
        <option value="Rayapuram">Rayapuram</option>
        <option value="Indira Nagar">Indira Nagar</option>
        <option value="Madurai">Madurai</option>
        <option value="Adayar">Adayar</option>
        <option value="Nagaon">Nagaon</option>
      </select>

      <select className="p-2 border border-bordergray rounded-lg focus:outline-none   w-full sm:w-32 lg:w-36" value={filters.area} onChange={(e) => handleFilterChange('area', e.target.value)}>
        <option value="">Area</option>
        <option value="Area1">Area 1</option>
        <option value="Area2">Area 2</option>
      </select>

      <select className="p-2 border border-bordergray rounded-lg focus:outline-none   w-full sm:w-32 lg:w-36" value={filters.username} onChange={(e) => handleFilterChange('username', e.target.value)}>
        <option value="">User Name</option>
        <option value="username 1">Username 1</option>
        <option value="username 2">Username 2</option>
      </select>

      <select className="p-2 border border-bordergray rounded-lg focus:outline-none   w-full sm:w-40 lg:w-36" value={filters.compliancetype} onChange={(e) => handleFilterChange('compliancetype', e.target.value)}>
        <option value="">Compliance Type</option>
        <option value="compliance type 1">Compliance Type 1</option>
        <option value="compliance type 2">Compliance Type 2</option>
      </select>

      <select className="p-2 border border-bordergray rounded-lg focus:outline-none   w-full sm:w-32 lg:w-36" value={filters.priority} onChange={(e) => handleFilterChange('priority', e.target.value)}>
        <option value="">Priority</option>
        <option value="Priority1">Priority 1</option>
        <option value="Priority2">Priority 2</option>
      </select>

      <div className="relative w-full sm:w-48 lg:w-36 md:w-60 ">
        <Flatpickr
          ref={datePickerRef}
          value={filters.date}
          options={{ mode: 'range', dateFormat: 'd/m/Y' }}
          className="p-2 border border-bordergray rounded-lg focus:outline-none w-full placeholder-black"
          placeholder="Date Range"
          onChange={(dates) => {
            setStartDate(dates);
            handleFilterChange('date', dates);
          }}
        />
        {!filters.date && (
          <span onClick={handleCalendarIconClick} className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-black-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
            </svg>
 
          </span>
        )}

        {filters.date && filters.date.length > 0 && (
          <span onClick={handleCloseIconClick} className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-black bg-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 18L18 6M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </div>
      <span className="bg-primary rounded-full h-11 w-11 flex items-center justify-center cursor-pointer lg:ml-auto"
        onClick={onDownloadClick}>
        <svg width="30" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3V16M12 16L8 12M12 16L16 12" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 19H20" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
};

export default Dropdown;
