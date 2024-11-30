import React from 'react';
import { TbReportAnalytics } from 'react-icons/tb';

const CompanyList = ({ Active, InActive, district, branch }) => {
  return (
    <div className='border border-bordergray shadow rounded py-2 px-5'>
      <div>
      </div>
      <h5 className='font-semibold  my-2 mx-5 justify-start '>Company</h5>
      <div className=' w-full  flex flex-col lg:flex-row gap-0'>
        <div className='flex flex-col md:flex-row lg:flex-row lg:w-1/2 w-full px-4 gap-9 border border-light border-e-slate-400 p-3 sm:border-hidden'>
          <div className=" relative overflow-hidden p-4  rounded-lg w-64  border-l-4" style={{ backgroundColor: '#d9f7d9', borderColor: '#46d246' }}>

            <div className=' absolute -top-2 -left-20 bg-green-400 w-44 h-44 rounded-full bg-opacity-15'></div>
            <div className='absolute left-5 -top-20 bg-green-400 w-44 h-44 rounded-full bg-opacity-5'></div>
            <div className="flex items-center mb-2">

              <div className="p-1 rounded " style={{ backgroundColor: '#46d246' }}>
                <TbReportAnalytics style={{ color: 'white', fontSize: '30px' }} />
              </div>
              <div className="ms-5 ps-2 font-bold">
                <h5>Active</h5>
              </div>
            </div>
            <p className="text-xl font-semibold">{Active}</p>
          </div>

          <div className=" relative overflow-hidden p-4  rounded-lg w-64  border-l-4" style={{ backgroundColor: '#ffece6', borderColor: '#ff9d80'}}>
            <div className=' absolute -top-2 -left-20 bg-pink-400 w-44 h-44 rounded-full bg-opacity-10'></div>
            <div className='absolute left-5 -top-20 bg-pink-400 w-44 h-44 rounded-full bg-opacity-5'></div>

            <div className="flex items-center mb-2 ">
              <div className="p-1 rounded " style={{ backgroundColor: '#ff9d80' }}>
                <TbReportAnalytics style={{ color: 'white', fontSize: '30px' }} />
              </div>
              <div className="ms-5 ps-2 font-bold">
                <h5>In-Active</h5>
              </div>
            </div>
            <p className="text-xl font-semibold">{InActive}</p>
          </div>
        </div>
        <div className='flex flex-col lg:flex-row md:flex-row  lg:w-1/2 w-full   gap-6 border border-light border-l-slate-400 p-2 px-5'>
          <div className=" relative overflow-hidden p-4  rounded-lg w-64  border-l-4" style={{ backgroundColor: '#f4fafd', borderColor: '#00bfff'}}>

          <div className=' absolute -top-2 -left-20 bg-blue-400 w-44 h-44 rounded-full bg-opacity-10'></div>
          <div className='absolute left-5 -top-20 bg-blue-400 w-44 h-44 rounded-full bg-opacity-5'></div>            <div className="flex items-center mb-2">

              <div className="p-1 rounded " style={{ backgroundColor: '#00bfff' }}>
                <TbReportAnalytics style={{ color: 'white', fontSize: '30px' }} />
              </div>
              <div className="ms-5 ps-2 font-bold">
                <h5>District</h5>
              </div>
            </div>
            <p className="text-xl font-semibold">{district}</p>
          </div>

          <div className=" relative overflow-hidden p-4  rounded-lg w-64  border-l-4"style={{ backgroundColor: '#f0fdfd', borderColor: '#36b089'}}>
          <div className=' absolute -top-2 -left-20 bg-green-400 w-44 h-44 rounded-full bg-opacity-15'></div>
          <div className='absolute left-5 -top-20 bg-green-400 w-44 h-44 rounded-full bg-opacity-5'></div>
            <div className="flex items-center mb-2 ">
              <div className="p-1 rounded " style={{ backgroundColor: '#36b089' }}>
                <TbReportAnalytics style={{ color: 'white', fontSize: '30px' }} />
              </div>
              <div className="ms-5 ps-2 font-bold">
                <h5>Branch</h5>
              </div>
            </div>
            <p className="text-xl font-semibold">{branch}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyList;


