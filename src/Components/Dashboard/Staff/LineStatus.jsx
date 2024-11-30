import React from 'react';

const LineStatus = ({ companies, filters, current, onPageChange, itemsPage }) => {
    const { company } = filters;

    const handlePageClick = (page) => {
        if (page > 0 && page <= total) {
            onPageChange(page);
        }
    };

    const filteredData = companies.filter((row) => !company || row.companyname === company);
    const total = Math.ceil(filteredData.length / itemsPage);

    const startIndex = (current - 1) * itemsPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPage);

    const hasDataOnPage = (page) => {
        const start = (page - 1) * itemsPage;
        const end = start + itemsPage;
        return filteredData.slice(start, end).length > 0;
    };
    const getPaginationButtons = (current, total) => {
        const paginationButtons = [];
        const maxButtons = 3;

        let startPage, endPage;

        if (total <= maxButtons) {
            startPage = 1;
            endPage = total;
        } else {
            if (current <= Math.ceil(maxButtons / 2)) {
                startPage = 1;
                endPage = maxButtons;
            } else if (current + Math.floor(maxButtons / 2) >= total) {
                startPage = total - maxButtons + 1;
                endPage = total;
            } else {
                startPage = current - Math.floor(maxButtons / 2);
                endPage = current + Math.floor(maxButtons / 2);
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

        if (endPage < total) {
            if (endPage < total - 1) finalButtons.push("...");
            finalButtons.push(total);
        }

        return finalButtons;
    };

    return (
        <div>
            <div className='border mt-5 pe-4 ps-4 pb-4 rounded mb-4 border-bordergray'>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                    <table className="min-w-full text-sm text-left rtl:text-right text-black">
                        <thead className="text-black font-semibold">
                            <tr className="bg-bordergray">
                                <th scope="col" className="px-4 py-3">S.No</th>
                                <th scope="col" className="px-4 py-3">Company Name</th>
                                <th scope="col" className="px-4 py-3">Complied</th>
                                <th scope="col" className="px-4 py-3">Not Complied</th>
                                <th scope="col" className="px-4 py-3">Partially Complied</th>
                                <th scope="col" className="px-4 py-3">Overdue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((row) => (
                                <tr key={row.SNO}>
                                    <td className="px-4 py-1 border-b border-bordergray">{row.SNO}</td>
                                    <td className="px-2 py-1 border-b border-bordergray">
                                        <div className='inline-flex items-center'>
                                            <img src={row.logo} alt='' width="30" className='mr-2 rounded-full' />
                                            <span className='mt-1'>{row.companyname}</span>
                                        </div>
                                    </td>
                                    {['complied', 'notComplied', 'partiallyComplied', 'overdue'].map((status, index) => (
                                        <td key={index} className="px-2 py-1 border-b border-bordergray">
                                            <div className="flex flex-col">
                                                <span className="mb-1">{row[status]}</span>
                                                <div className="w-40 bg-bordergray rounded-full h-2.5">
                                                    <div
                                                        className={`h-2.5 rounded-full ${status === 'complied' ? 'bg-green-500' : status === 'notComplied' ? 'bg-red-500' : status === 'partiallyComplied' ? 'bg-yellow-500' : 'bg-orange-500'}`}
                                                        style={{ width: `${row[status]}%` }}>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    ))}
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
                    {total > 1 && (
                        <>
                            <div className="bg-white px-4 py-2 flex-shrink-0 mb-2">
                                <label htmlFor="page-select" className="mr-2 text-sm">Page</label>
                                <select
                                    id="page-select"
                                    value={current}
                                    onChange={(e) => handlePageClick(Number(e.target.value))}
                                    className="border border-bordergray rounded-md p-1 focus:outline-none">
                                    {getPaginationButtons(current, total).map((button, index) => (
                                        <option key={index} value={button}>
                                            {button}
                                        </option>
                                    ))}
                                </select>
                                <span className="ml-2 text-sm">of {total}</span>
                            </div>

                            <div className="flex items-center space-x-1 overflow-x-auto whitespace-nowrap mb-2">
                                {current > 4 && (
                                    <button
                                        onClick={() => handlePageClick(1)}
                                        className={`flex items-center justify-center px-2 py-0 text-sm font-medium text-gray-700 border border-bordergray rounded-full hover:bg-gray-200 transition duration-300 ease-in-out`}>
                                        &laquo;
                                    </button>
                                )}

                                <button
                                    onClick={() => handlePageClick(current - 1)}
                                    disabled={current === 1}
                                    className={`flex items-center justify-center px-2 py-0 text-sm font-medium text-gray-700 bg-white border border-bordergray rounded-full hover:bg-gray-200 transition duration-300 ease-in-out ${current === 1 ? 'cursor-not-allowed opacity-50' : ''}`}>
                                    &lt;
                                </button>

                                {getPaginationButtons(current, total).map((button, index) => {
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
                                            className={`flex items-center justify-center px-2 py-0 text-sm font-medium text-gray-700 bg-white border border-bordergray rounded-full hover:bg-gray-200 transition duration-300 ease-in-out ${current === button ? 'bg-yellow-500 text-white' : ''}`}>
                                            {button}
                                        </button>
                                    );
                                })}

                                <button
                                    onClick={() => handlePageClick(current + 1)}
                                    disabled={current === total}
                                    className={`flex items-center justify-center px-2 py-0 text-sm font-medium text-gray-700 bg-white border border-bordergray rounded-full hover:bg-gray-200 transition duration-300 ease-in-out ${current === total ? 'cursor-not-allowed opacity-50' : ''}`}>
                                    &gt;
                                </button>

                                {current < total - 3 && (
                                    <button
                                        onClick={() => handlePageClick(total)}
                                        className={`flex items-center justify-center px-2 py-0 text-sm font-medium text-gray-700 bg-white border border-bordergray rounded-full hover:bg-gray-200 transition duration-300 ease-in-out`}>
                                        &raquo;
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </div>


            </div>
        </div>
    );
};

export default LineStatus;

