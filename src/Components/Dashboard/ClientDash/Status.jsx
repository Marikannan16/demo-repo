import React from 'react';
import CircularProgressBar from './CircularProgressBar'; 

const Status = ({ complied, notComplied, partiallyComplied, overdue }) => {
    return (
      <div className="border border-selectbg shadow mt-5 px-4 pb-4 rounded lg:px-8 md:px-6 sm:px-4">
            <h6 className="mb-4 mt-4 font-bold">Status of Activities</h6>
            <div className="flex flex-wrap justify-between items-center space-y-5 lg:space-y-0">
                <div className="w-full lg:w-auto flex-1 text-center">
                    <div className='mt-3'>
                        <label>Complied</label>
                    </div>
                    <CircularProgressBar
                        value={complied}
                        label="Complied"
                        color="#28a745"
                    />
                </div>
                <div className="w-full lg:w-auto flex-1 text-center">
                    <div className='mt-3'>
                        <label>Not Complied</label>
                    </div>
                    <CircularProgressBar
                        value={notComplied}
                        label="Not Complied"
                        color="#dc3545"
                    />
                </div>
                <div className="w-full lg:w-auto flex-1 text-center">
                    <div className='mt-3'>
                        <label>Partially Complied</label>
                    </div>
                    <CircularProgressBar
                        value={partiallyComplied}
                        label="Partially Complied"
                        color="#ffc107"
                    />
                </div>
                <div className="w-full lg:w-auto flex-1 text-center">
                    <div className='mt-3'>
                        <label>Overdue</label>
                    </div>
                    <CircularProgressBar
                        value={overdue}
                        label="Overdue"
                        color="#fd7e14"
                    />
                </div>
            </div>
        </div>
  );
};

export default Status;