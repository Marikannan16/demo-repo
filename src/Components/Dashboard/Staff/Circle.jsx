import React from 'react';
import CircularProgressBar from './CircularProgressBar';

const Circle = ({ complied, notComplied, partiallyComplied, overdue }) => {
  return (
    <div className="border border-bordergray mt-5 px-4 pb-4 rounded lg:px-8 md:px-6 sm:px-4">
      <h6 className="mb-4 mt-4 font-bold text-gray-700">Status of Activities</h6>
      <div className="flex flex-wrap justify-between items-center flex-col md:flex-row space-y-5 md:space-y-0">
        <div className="w-full md:w-1/4 text-center">
          <div className="mt-3">
            <label className="font-medium text-gray-600">Complied</label>
          </div>
          <div className="p-2">
            <CircularProgressBar
              value={complied}
              label="Complied"
              gradientId="gradient-complied"
              colors={['#34c759', '#a3e8b7']}
            />
          </div>
        </div>

        <div className="w-full md:w-1/4 text-center">
          <div className="mt-3">
            <label className="font-medium text-gray-600">Not Complied</label>
          </div>
          <div className="p-2">
            <CircularProgressBar
              value={notComplied}
              label="Not Complied"
              gradientId="gradient-notComplied"
              colors={['#ff3b30', '#ff8a8a']}
            />
          </div>
        </div>

        <div className="w-full md:w-1/4 text-center">
          <div className="mt-3">
            <label className="font-medium text-gray-600">Partially Complied</label>
          </div>
          <div className="p-2">
            <CircularProgressBar
              value={partiallyComplied}
              label="Partially Complied"
              gradientId="gradient-partiallyComplied"
              colors={['#ffcc00', '#ffe08a']}
            />
          </div>
        </div>

        <div className="w-full md:w-1/4 text-center">
          <div className="mt-3">
            <label className="font-medium text-gray-600">Overdue</label>
          </div>
          <div className="p-2">
            <CircularProgressBar
              value={overdue}
              label="Overdue"
              gradientId="gradient-overdue"
              colors={['#ff9500', '#ffb766']}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Circle;
