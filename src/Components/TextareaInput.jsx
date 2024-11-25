import React from "react";

const TextareaInput = ({ label, name, value, placeholder, onChange }) => {
    return (
        <div className="mb-2">
            <label className="block mb-2 font-semibold ">{label}<span className="text-red-600 ms-1">*</span></label>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={1}
                className="w-full p-2 border border-bordergray rounded"
                required
            />
        </div>
    );
};

export default TextareaInput;
