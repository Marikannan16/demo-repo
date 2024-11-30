import React from 'react';

const CircularProgressBar = ({ value, label, gradientId, colors }) => {
  return (
    <div className="relative flex flex-col items-center lg:flex-row">
      <div className="w-40 h-40 mt-5">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 36 36">
          <defs>
            <linearGradient id={gradientId} x1="10%" y1="0%" x2="100%" y2="20%">
              <stop offset="0%" stopColor={colors[0]} />
              <stop offset="100%" stopColor={colors[1]} />
            </linearGradient>
          </defs>
          <circle cx="18" cy="18" r="16" fill="none" stroke="#e6e6e6" strokeWidth="4" />
          <circle cx="18" cy="18" r="16" fill="none" stroke={`url(#${gradientId})`}
            strokeWidth="4"
            strokeDasharray="100"
            strokeDashoffset={100 - value}
            transform="rotate(-90 18 18)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-sm sm:text-base md:text-lg lg:text-xl">
          <span className="text-gray-600 text-sm">{label}</span>
          <span className="font-bold text-gray-800">{`${value}%`}</span>
        </div>
      </div>
    </div>
  );
};

export default CircularProgressBar;
