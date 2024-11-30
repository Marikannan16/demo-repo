import React from 'react';
const Table = ({ companies, filters, currentPage, onPageChange, itemsPerPage }) => {
  const { branch } = filters;
  const handlePageClick = (page) => {
    if (page > 0 && page <= totalPages) {
        onPageChange(page);
    }
};

  const filteredData = companies.filter((row) => !branch || row.branch === branch);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const hasDataOnPage = (page) => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredData.slice(start, end).length > 0;
  };

  const getPaginationButtons = (currentPage, totalPages) => {
    const paginationButtons = [];
    const maxButtons = 3;

    let startPage, endPage;

    if (totalPages <= maxButtons) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= Math.ceil(maxButtons / 2)) {
        startPage = 1;
        endPage = maxButtons;
      } else if (currentPage + Math.floor(maxButtons / 2) >= totalPages) {
        startPage = totalPages - maxButtons + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - Math.floor(maxButtons / 2);
        endPage = currentPage + Math.floor(maxButtons / 2);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      if (hasDataOnPage(i)) {
        paginationButtons.push(i);
      }
    }

    const finalButtons = [];

    if (startPage > 1) {
      finalButtons.push(1);
      if (startPage > 2) finalButtons.push("...");
    }

    paginationButtons.forEach((button) => {
      finalButtons.push(button);
    });

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) finalButtons.push("...");
      finalButtons.push(totalPages);
    }

    return finalButtons;
  };

  return (
    <div className='border mt-5 pe-4 ps-4 pb-4 rounded border-bordergray'>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <table className="w-full text-sm text-left text-black">
          <thead className="text-black font-semibold">
            <tr className="bg-bordergray">
              <th scope="col" className="px-6 py-3">S.No</th>
              <th scope="col" className="px-6 py-3">Branch</th>
              <th scope="col" className="px-6 py-3">Complied</th>
              <th scope="col" className="px-6 py-3">Not Complied</th>
              <th scope="col" className="px-6 py-3">Partially Complied</th>
              <th scope="col" className="px-6 py-3">Overdue</th>
            </tr>
          </thead>
          <tbody className='me-10'>
            {paginatedData.map((row) => (
              <tr key={row.SNO}>
                <td className="px-6 py-1 border-b border-bordergray">{row.SNO}</td>
                <td className="px-2 py-1 border-b border-bordergray">
                  <div className='inline-flex items-center'>
                    <span className='mt-1'>{row.branch}</span>
                  </div>
                </td>
                <td className="px-2 py-1 border-b border-bordergray">
                  <div className="flex flex-col">
                    <span className="mb-1">{row.complied}</span>
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
                    <span className="mb-1">{row.notComplied}</span>
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
                    <span className="mb-1">{row.partiallyComplied}</span>
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
                    <span className="mb-1">{row.overdue}</span>
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
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4">Data is not available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        {totalPages > 1 && (
          <>
            <div className="bg-white px-4 py-2 flex-shrink-0 mb-2">
              <label htmlFor="page-select" className="mr-2 text-sm">Page</label>
              <select
                id="page-select"
                value={currentPage}
                onChange={(e) => handlePageClick(Number(e.target.value))}
                className="border border-bordergray rounded-md p-1 focus:outline-none">
                {getPaginationButtons(currentPage, totalPages).map((button, index) => (
                  <option key={index} value={button}>
                    {button}
                  </option>
                ))}
              </select>
              <span className="ml-2 text-sm">of {totalPages}</span>
            </div>

            <div className="flex items-center space-x-1 overflow-x-auto whitespace-nowrap mb-2">
              {currentPage > 4 && (
                <button
                  onClick={() => handlePageClick(1)}
                  className={`flex items-center justify-center px-2 py-0 text-sm font-medium text-gray-700 border border-bordergray rounded-full hover:bg-gray-200 transition duration-300 ease-in-out`}>
                  &laquo;
                </button>
              )}

              <button
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center justify-center px-2 py-0 text-sm font-medium text-gray-700 bg-white border border-bordergray rounded-full hover:bg-gray-200 transition duration-300 ease-in-out ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}>
                &lt;
              </button>

              {getPaginationButtons(currentPage, totalPages).map((button, index) => {
                if (button === '...') {
                  return (
                    <span key={index} className="px-2 py-0 text-sm font-medium text-gray-700">
                      {button}
                    </span>
                  );
                }
                return (
                  <button
                    key={index}
                    onClick={() => handlePageClick(button)}
                    className={`flex items-center justify-center px-2 py-0 text-sm font-medium text-gray-700 bg-white border border-bordergray rounded-full hover:bg-gray-200 transition duration-300 ease-in-out ${currentPage === button ? 'bg-yellow-500 text-white' : ''}`}>
                    {button}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center justify-center px-2 py-0 text-sm font-medium text-gray-700 bg-white border border-bordergray rounded-full hover:bg-gray-200 transition duration-300 ease-in-out ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}>
                &gt;
              </button>

              {currentPage < totalPages - 3 && (
                <button
                  onClick={() => handlePageClick(totalPages)}
                  className={`flex items-center justify-center px-2 py-0 text-sm font-medium text-gray-700 bg-white border border-bordergray rounded-full hover:bg-gray-200 transition duration-300 ease-in-out`}>
                  &raquo;
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
};
export default Table;
