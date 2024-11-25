import React, { useState } from 'react';
import { FaAngleDown } from "react-icons/fa6";

const CheckedSelect = ({ selectedOptions, setSelectedOptions }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const options = [
        { id: 'joseph', label: 'joseph' },
        { id: 'isabella', label: 'isabella' },
        { id: 'olivia', label: 'olivia' },
        { id: 'victoria', label: 'victoria' },
        { id: 'rachal', label: 'rachal' },
        { id: 'michael', label: 'michael' },
        { id: 'elizabeth', label: 'elizabeth' },
    ];
    
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
   
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
                    : 'Select Assign Staff'}
                <FaAngleDown />
            </button>
            {dropdownOpen && (
                // here we can change the checkbox floating logic
                <div className="absolute bottom-20 z-10 w-full p-1 bg-white rounded-md shadow-lg border border-bordergray focus:outline-none">
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
                                className="mr-2 accent-dark"
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
