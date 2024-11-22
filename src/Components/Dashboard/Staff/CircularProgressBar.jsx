import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularProgressBar = ({ value, label, color }) => {
  return (
    <div className="relative flex flex-col items-center">
      <div className="w-40 h-40 mt-5">
        <CircularProgressbar
          value={value}
          styles={buildStyles({
            pathColor: color,
            trailColor: '#f2f2f2',
            textColor: 'transparent',
          })}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center ">
          <span>{label}</span>
          <span className=" font-bold">{`${value}%`}</span>
        </div>
      </div>
    </div>
  );
};

export default CircularProgressBar;