import React from 'react';
import { TbReportAnalytics } from 'react-icons/tb';

const ClientList = ({ totalCompany, state, district, branch }) => {
  return (
    <div className='border border-bordergray rounded mt-2'>
      <div>
        <h5 className='font-semibold ps-9 mt-3'>Clients list</h5>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 ">

        <div className=" relative overflow-hidden p-4 sm:ms-5 md:ms-4 rounded-lg w-11/12 h-auto min-h-[7rem] border-l-4 border-l-purple-500" style={{ backgroundColor: '#e6e6e6', borderColor: '#003366', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div className=' absolute -top-2 -left-20 bg-violet-400 w-44 h-44 rounded-full bg-opacity-10'></div>
          <div className='absolute left-5 -top-20 bg-violet-400 w-44 h-44 rounded-full bg-opacity-5'></div>

          <div className="flex items-center mb-2">
            <div className="p-1 rounded" style={{ backgroundColor: '#0d3d6e' }}>
              <TbReportAnalytics style={{ color: 'white', fontSize: '30px' }} />
            </div>
            <div className="ms-5 ps-2">
              <h5>Total Company</h5>
            </div>
          </div>
          <p className="text-xl font-semibold">{totalCompany}</p>
        </div>

        <div className=" relative overflow-hidden p-4 sm:ms-5 md:ms-4 rounded-lg w-11/12 h-auto min-h-[7rem] border-l-4" style={{ backgroundColor: '#ffece6', borderColor: '#ff9d80', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div className=' absolute -top-2 -left-20 bg-pink-400 w-44 h-44 rounded-full bg-opacity-10'></div>
          <div className='absolute left-5 -top-20 bg-pink-400 w-44 h-44 rounded-full bg-opacity-5'></div>

          <div className="flex items-center mb-2">
            <div className="p-1 rounded" style={{ backgroundColor: '#ff9d80' }}>
              <TbReportAnalytics style={{ color: 'white', fontSize: '30px' }} />
            </div>
            <div className="ms-5 ps-2">
              <h5>State</h5>
            </div>
          </div>
          <p className="text-xl font-semibold">{state}</p>
        </div>

        <div className=" relative overflow-hidden p-4 sm:ms-5 md:ms-4 rounded-lg w-11/12 h-auto min-h-[7rem] border-l-4" style={{ backgroundColor: '#f4fafd', borderColor: '#00bfff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div className=' absolute -top-2 -left-20 bg-blue-400 w-44 h-44 rounded-full bg-opacity-10'></div>
          <div className='absolute left-5 -top-20 bg-blue-400 w-44 h-44 rounded-full bg-opacity-5'></div>

          <div className="flex items-center mb-2">
            <div className="p-1 rounded" style={{ backgroundColor: '#00bfff' }}>
              <TbReportAnalytics style={{ color: 'white', fontSize: '30px' }} />
            </div>
            <div className="ms-5 ps-2">
              <h5>District</h5>
            </div>
          </div>
          <p className="text-xl font-semibold">{district}</p>
        </div>

        <div className=" relative overflow-hidden p-4 sm:ms-5 md:ms-4 rounded-lg w-11/12 h-auto min-h-[7rem] border-l-4" style={{ backgroundColor: '#f0fdfd', borderColor: '#36b089', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div className=' absolute -top-2 -left-20 bg-green-400 w-44 h-44 rounded-full bg-opacity-15'></div>
          <div className='absolute left-5 -top-20 bg-green-400 w-44 h-44 rounded-full bg-opacity-5'></div>

          <div className="flex items-center mb-2">
            <div className="p-1 rounded" style={{ backgroundColor: '#36b089' }}>
              <TbReportAnalytics style={{ color: 'white', fontSize: '30px' }} />
            </div>
            <div className="ms-5 ps-2">
              <h5>Branch</h5>
            </div>
          </div>
          <p className="text-xl font-semibold">{branch}</p>
        </div>

      </div>
    </div>
  );
};

export default ClientList;