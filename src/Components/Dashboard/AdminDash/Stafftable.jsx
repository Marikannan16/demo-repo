import React from 'react';
import Staffdata from './Staffdata';

const Stafftable = () => {
  return (
    <div>
      <div className='border border-bordergray mt-5 pe-4 ps-4 pb-4 rounded mb-4'>
        <h6 className='mt-4 font-bold'>Staff Performance for the month of September 24</h6>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
          <table className="w-full text-sm text-left rtl:text-right text-black border-bordergray">
            <thead className="text-black font-semibold bg-bordergray border-bordergray">
              <tr className="bg-gray-300">
                <th scope="col" className="px-6 py-3">S.No</th>
                <th scope="col" className="px-6 py-3">SPOC Name</th>
                <th scope="col" className="px-6 py-3">Complied</th>
                <th scope="col" className="px-6 py-3">Not Complied</th>
                <th scope="col" className="px-6 py-3">Partially Complied</th>
                <th scope="col" className="px-6 py-3">Overdue</th>
              </tr>
            </thead>
            <tbody className='me-10'>
              {Staffdata.map((row) => (
                <tr key={row.SNO}>
                  <td className="px-6 py-1 border-b border-bordergray">{row.SNO}</td>
                  <td className="px-2 py-1 border-b border-bordergray">
                    <div className='inline-flex items-center'>
                      <span className='mt-1'>{row.name}</span>
                    </div>
                  </td>
                  <td className="px-2 py-1 border-b border-bordergray">
                    <div className="flex flex-col">
                      <span className="mb-1">{row.complied || 0}</span>
                      <div className="w-40 bg-bordergray rounded-full h-2.5">
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{ width: `${row.complied}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-1 border-b border-bordergray">
                    <div className="flex flex-col">
                      <span className="mb-1">{row.notComplied || 0}</span>
                      <div className="w-40 bg-bordergray rounded-full h-2.5">
                        <div
                          className="bg-red-500 h-2.5 rounded-full"
                          style={{ width: `${row.notComplied}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-1 border-b border-bordergray">
                    <div className="flex flex-col">
                      <span className="mb-1">{row.partiallyComplied || 0}</span>
                      <div className="w-40 bg-bordergray rounded-full h-2.5">
                        <div
                          className="bg-yellow-500 h-2.5 rounded-full"
                          style={{ width: `${row.partiallyComplied}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-1 border-b border-bordergray">
                    <div className="flex flex-col ">
                      <span className="mb-1">{row.overdue || 0}</span>
                      <div className="w-40 bg-bordergray rounded-full h-2.5">
                        <div
                          className="bg-orange-500 h-2.5 rounded-full"
                          style={{ width: `${row.overdue}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Stafftable;