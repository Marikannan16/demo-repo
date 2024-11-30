import React from 'react';
import moment from 'moment';

const Table = ({ companies, currentPage, onPageChange, filters, itemsPerPage }) => {
    const { company, state, branch, area, priority, username, compliancetype, date } = filters;
    const handlePageClick = (page) => {
        if (page > 0 && page <= totalPages) {
            onPageChange(page);
        }
    };
    const filteredData = companies.filter((row) => {
        if (company && row.CompanyName !== company) return false;
        if (state && row.State !== state) return false;
        if (branch && row.Branch !== branch) return false;
        if (priority && row.Priority !== priority) return false;
        if (area && row.Area !== area) return false;
        if (username && row.UserName !== username) return false;
        if (compliancetype && row.ComplianceType !== compliancetype) return false;

        if (date && date.length === 2) {
            const [startDate, endDate] = date;
            const rowDate = moment(row.Date, 'DD-MM-YYYY');
            if (!rowDate.isBetween(moment(startDate), moment(endDate), 'day', '[]')) {
                return false;
            }
        }

        return true;
    });

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
        <div className='border mt-5 p-4 rounded border-bordergray'>
            <h6 className='mt-4 font-bold'>Compliance for the period of April 2024 to November 2024</h6>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                <table className="min-w-full text-sm text-left text-black">
                    <thead className="text-xs text-black font-bold">
                        <tr className="bg-bordergray border-bordergray">
                            <th scope="col" className="px-4 py-3">S.No</th>
                            <th scope="col" className="px-4 py-3">Date</th>
                            <th scope="col" className="px-4 py-3">Company Name</th>
                            <th scope="col" className="px-4 py-3">State</th>
                            <th scope="col" className="px-4 py-3">Branch</th>
                            <th scope="col" className="px-4 py-3">Activity</th>
                            <th scope="col" className="px-4 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((row) => (
                            <tr key={row.SNO} className="border-b border-bordergray">
                                <td className="px-4 py-2">{row.SNO}</td>
                                <td className="px-4 py-2">{row.Date}</td>
                                <td className="px-4 py-2">
                                    <div className='flex items-center'>
                                        <img src={row.logo} alt='' width="30" className='mr-2 rounded-full' />
                                        <span>{row.CompanyName}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2">{row.State}</td>
                                <td className="px-4 py-2">{row.Branch}</td>
                                <td className="px-4 py-2">{row.Activity}</td>
                                <td className="px-4 py-2">
                                    <span className={`px-2 py-1 flex items-center justify-center w-32 h-8 text-sm font-semibold leading-tight rounded-full 
                                         ${row.Status === 'Not Complied' ? 'bg-red-400' : row.Status === 'Partially Complied' ? 'bg-amber-500 ps-7' : row.Status === 'Complied' ? 'bg-green-400' : 'bg-gray-200'}`}>
                                        {row.Status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {paginatedData.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center py-4">data is not available</td>
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
    );
};

export default Table;




