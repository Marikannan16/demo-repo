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
        {filters.date==null && (
          <RiCalendar2Line 
            className="absolute right-2 top-3.5 w-4 h-4 cursor-pointer text-black-400 bg-white "
            onClick={handleCalendarIconClick}
          />
        )}

        {filters.date && filters.date.length > 0 && (
          <RiCloseLine
            size={20}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-black bg-white"
            onClick={handleCloseIconClick}
          />
        )}
      </div>

      <button
        onClick={onDownloadClick}
        className="rounded-full bg-yellow-600 px-3 py-3 w-10 text-white lg:ms-2">
        <FaDownload size={16} />
      </button>
    </div>
  );
};

export default Dropdown;