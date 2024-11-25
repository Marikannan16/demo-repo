import React, { useState } from 'react';
import { FaAngleDown } from "react-icons/fa6";

const CheckedSelect = ({ selectedOptions, setSelectedOptions }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const options = [
        { id: 'Low', label: 'Low' },
        { id: 'Medium', label: 'Medium' },
        { id: 'High', label: 'High' },
    ];
    
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const handleSelectAll = () => {
        if (!selectAll) {
            setSelectedOptions(options.map(option => option.id));
            toggleDropdown()
        } else {
            setSelectedOptions([]);
            toggleDropdown()
        }
        setSelectAll(!selectAll);
        toggleDropdown()
    };
    const handleOptionChange = (id) => {
        if (selectedOptions.includes(id)) {
            setSelectedOptions(selectedOptions.filter(optionId => optionId !== id));
            toggleDropdown()
        } else {
            setSelectedOptions([...selectedOptions, id]);
            toggleDropdown()
        }
    };
    return (
        <>
            <button
                type='button'
                onClick={toggleDropdown}
                className="flex justify-between items-center w-full p-2 bg-gray-200 border border-bordergray rounded-md shadow-sm"
            >
                {selectedOptions.length > 0
                    ? 

                    ` ${selectedOptions} `
                    : <label>Select Priority Type<span className="text-red-600 ms-1">*</span></label>}
                <FaAngleDown />
            </button>
            {dropdownOpen && (
                // here we can change the checkbox floating logic
                <div className="absolute top-20 z-10 w-full p-1 bg-white rounded-md shadow-lg border border-bordergray focus:outline-none">
                    <label htmlFor="selectAll" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                        <input
                            type="checkbox"
                            id="selectAll"
                            checked={selectAll && selectedOptions.length === 3}
                            onChange={handleSelectAll}
                            className="mr-2"
                        />
                        <span>Select All</span>
                    </label>
                    <hr />
                    {options.map((option) => (
                        <label
                            key={option.id}
                            htmlFor={option.id}
                            className="text-sm text-gray-700 flex items-center px-4 py-2 hover:bg-gray-200"
                        >
                            <input
                                type="checkbox"
                                id={option.id}
                                checked={selectedOptions.includes(option.id)}
                                onChange={() => handleOptionChange(option.id)}
                                className="mr-2"
                            />
                            {option.label}
                        </label>
                    ))}
                </div>
            )}
        </>
    );
};

export default CheckedSelect;
