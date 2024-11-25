import React from "react"
import { GoUpload } from "react-icons/go"

const FileInput = ({ imageLabel, onImageChange, imageSection }) => {
    return (
        <div className="flex flex-col justify-center items-center pb-6">
            <label htmlFor="imageSection" className="cursor-pointer">
                <div className="w-40 h-40 bg-gray-100 shadow-md rounded-full overflow-hidden flex items-center justify-center">
                    {imageSection ? (
                        <img src={imageSection} alt="photoFile" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-gray-600">
                            <GoUpload size={50} />
                        </span>
                    )}
                </div>
                <input
                    id="imageSection"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onImageChange}
                />
            </label>
            <p className="mt-4 text-lg font-semibold">{imageLabel}<span className="text-red-600 ms-1">*</span></p>
        </div>

    )
}

export default FileInput
