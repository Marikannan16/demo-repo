import React from "react";

const TextInput = ({ label, name, value, placeholder, onChange, type = "text",required=true }) => {
    return (
        <div className="mb-2">
            <label className="block mb-2 font-semibold">{label}{required &&<span className="text-red-600 ms-1">*</span>}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full p-2 border border-bordergray text-input bg-selectbg rounded"
                required={required}
            />
        </div>
    );
};

export default TextInput;
