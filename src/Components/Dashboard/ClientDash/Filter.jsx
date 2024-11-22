import React, { useState, useRef } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import { RiCalendar2Line, RiCloseLine } from 'react-icons/ri';
import { FaDownload } from 'react-icons/fa';

const Filter = ({ onFilterChange, startDate, setStartDate,onDownloadClick }) => {
  const [company, setCompany] = useState('');
  const [state, setState] = useState('');
  const [branch, setBranch] = useState('');
  const [area, setArea] = useState('');
  const [priority, setPriority] = useState('');
  const [date, setDate] = useState([]);
  const datePickerRef = useRef(null);

  const handleFilterChange = (field, value) => {
    switch (field) {
      case 'company': setCompany(value); break;
      case 'state': setState(value); break;
      case 'branch': setBranch(value); break;
      case 'area': setArea(value); break;
      case 'priority': setPriority(value); break;
      case 'date': setDate(value); break;
      default: break;
    }

    onFilterChange({
      company,
      state,
      branch,
      area,
      priority,
      date,
      [field]: value
    });
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
    setDate([]);
    setStartDate(null); 
  };
  return (
    <div className="flex flex-wrap gap-4 items-center mt-4 mb-4">
      <select className="p-2 border border-bordergray rounded-lg focus:outline-none w-full sm:w-32" value={company} onChange={(e) => handleFilterChange('company', e.target.value)}>
        <option value="">Company</option>
        <option value="Acme Corporation">Acme Corporation</option>
      </select>

      <select className="p-2 border border-bordergray rounded-lg focus:outline-none w-full sm:w-32" value={state} onChange={(e) => handleFilterChange('state', e.target.value)}>
        <option value="">State</option>
        <option value="Tamilnadu">Tamilnadu</option>
        <option value="Kerala">Kerala</option>
      </select>

      <select className="p-2 border border-bordergray rounded-lg focus:outline-none w-full sm:w-32" value={branch} onChange={(e) => handleFilterChange('branch', e.target.value)}>
        <option value="">Branch</option>
        <option value="Ambattur">Ambattur</option>
        <option value="Anna Nagar">Anna Nagar</option>
        <option value="Adayar">Adayar</option>
        <option value="Rayapuram">Rayapuram</option>
        <option value="Adayar">Adayar</option>
        <option value="Nagaon">Nagaon</option>
        <option value="T.Nagar">T.Nagar</option>
        <option value="Perungudi">Perungudi</option>
      </select>

      <select className="p-2 border border-bordergray rounded-lg focus:outline-none w-full sm:w-32" value={area} onChange={(e) => handleFilterChange('area', e.target.value)}>
        <option value="">Area</option>
        <option value="Area1">Area 1</option>
        <option value="Area2">Area 2</option>
      </select>

      <select className="p-2 border border-bordergray rounded-lg focus:outline-none w-full sm:w-32" value={priority} onChange={(e) => handleFilterChange('priority', e.target.value)}>
        <option value="">Priority</option>
        <option value="Priority1">Priority 1</option>
        <option value="Priority2">Priority 2</option>
      </select>

      <div className="relative w-full sm:w-48 lg:w-60 md:w-60">
        <Flatpickr
          mode="range"
          ref={datePickerRef}
          options={{ mode: 'range', dateFormat: 'd/m/Y' }}
          className="p-2 border border-bordergray rounded-lg focus:outline-none w-full"
          placeholder="Date Range"
          value={date}
          onChange={(selectedDates) => handleFilterChange('date', selectedDates)}
        />

        {date.length === 0 && (
          <RiCalendar2Line
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-black-400"
            onClick={handleCalendarIconClick}
          />
        )}

        {date.length > 0 && (
          <RiCloseLine
            size={20}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-black bg-white"
            onClick={handleCloseIconClick}
          />
        )}
      </div>

      <button
        className="rounded-full bg-yellow-600 px-3 py-3 w-10 text-white lg:ml-8"
        onClick={onDownloadClick}
      >
        <FaDownload size={16} />
      </button>
    </div>
  );
};

export default Filter;