import React from "react";

const SelectInput = ({ label, name, value, onChange, options }) => {
    return (
        <div className="mb-3">
            <label className="block mb-2 font-semibold">{label}<span className="text-red-600 ms-1">*</span></label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full p-2 border border-bordergray bg-selectbg rounded"
                required
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectInput;
