import { LuDelete } from "react-icons/lu";
import { LuLayoutGrid } from "react-icons/lu";
import { FaBell, FaListUl } from "react-icons/fa6";
import React, { useEffect, useRef, useState } from 'react'
import { LuDownload } from "react-icons/lu";
import { Data } from "./Data";
import { IoIosAdd, IoIosSearch } from "react-icons/io";
import { Columns } from "./Columns";
import DataTable from "react-data-table-component";
import CustomPagination from "../../Components/CustomPagination";
import { Link } from "react-router-dom";
import { HiViewList } from "react-icons/hi";
import { GoDownload } from "react-icons/go";
import html2pdf from 'html2pdf.js'
import { BsFiletypeCsv, BsFiletypePdf } from "react-icons/bs";
import Actions from "./Actions";
import CompanyIcon from "./CompanyIcon";
import UserIcon from "./UserIcon";
import ActionMenu from "../../Components/ActionMenu";

const UserList = () => {
    const [search, setSearch] = useState("")
    const [view, setView] = useState('list')
    const [tableData] = useState(Data)
    const [selectedRow, setSelectedRow] = useState(null);
    const pdfref = useRef()
    const [DownMenu, setDownMenu] = useState(false)
    const [filter, setFilter] = useState({
        company: '', designation: '', modules: '',
    })
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    // const handleInputChange = (e) => {
    //     const { name, value } = e.target
    //     setFilter({ ...filter, [name]: value, })
    // }
    const handleListView = () => {
        if (view === 'grid') {
            setView('list')
        }
    }
    const handleGridView = () => {
        if (view === 'list') {
            setView('grid')
        }
    }
    const toggleAction = (Rowid) => {
        setSelectedRow(selectedRow === Rowid ? null : Rowid)
    }
    const handleView = ({ id }) => {
        alert(`${id} was viewed`)
    }

    const handleEdit = ({ id }) => {
        alert(`${id} was Edited`)
    }

    const handleDelete = ({ id }) => {
        alert(`${id} was Deleted`)
    }

    var filterData = tableData.filter((item) => {
        return (
            (filter.company ? item.company === filter.company : true) &&
            (filter.designation ? item.designation === filter.designation : true) &&
            (filter.modules ? item.modules === filter.modules : true) && (
                item.company.toLowerCase().includes(search.toLowerCase()) ||
                item.designation.toLowerCase().includes(search.toLowerCase()) ||
                item.modules.toLowerCase().includes(search.toLowerCase()))
        );
    });
    const customStyles = {
        rows: {
            style: {
                minHeight: '20px',
            },
        },
        headCells: {
            style: {
                backgroundColor: '#000',
                color: '#fff',
                fontSize: '14px',
                padding: '0px 10px'
            },
        },
        cells: {
            style: {
                borderBottom: '1px solid rgba(0,0,0,0.15)',
                padding: '10px 10px',
                fontSize: '14px',
            },
        },
    };

    const downloadCSV = () => {
        const headers = Object.keys(filterData[0]);
        const csv = [
            headers.join(','),
            ...filterData.map(row => Object.values(row).join(','))
        ].join('\n');

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'userlist.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    const downloadPDF = () => {
        const element = pdfref.current;
        html2pdf()
            .set({
                margin: 0.5,
                filename: 'userlist.pdf',
                //   html2canvas: { scale: 2.5, useCORS: true },  // Lower the scale for better alignment
                jsPDF: { unit: 'in', format: 'a3', orientation: 'landscape' }  // Larger page format
            })
            .from(element)
            .save();
    };
    const totalPages = Math.ceil(filterData.length / itemsPerPage)
    var filterData = filterData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    useEffect(() => {
        if (currentPage > totalPages) {
          setCurrentPage(totalPages);
        }
      }, [filterData, currentPage, totalPages])
      const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
      };

    return (
        <div className='h-full w-full p-5 shadow-lg'>
            <div className="flex flex-col justify-center gap-2 items-start lg:flex-row mb-6 lg:items-center lg:justify-between">
                <h2 className='text-xl font-bold '>User Management({filterData.length})</h2>
                <div className="flex items-center justify-center gap-2 lg:gap-4">
                    <div className='relative'><button className="bg-primary text-white rounded-full p-2 cursor-pointer" onClick={() => setDownMenu(!DownMenu)}>
                        <svg viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 p-0.5" >
                            <path d="M8.10096 12.4503L4.09724 8.44769L4.89821 7.63314L7.5353 10.2702V0.484375H8.66661V10.2702L11.3026 7.63427L12.1047 8.44769L8.10096 12.4503ZM0.181763 16.3228V11.7545H1.31308V15.1914H14.8888V11.7545H16.0201V16.3228H0.181763Z" fill="white" />
                        </svg>
                    </button>
                        {DownMenu && <div className='absolute mt-5 lg:right-0 left-0 w-44 h-[80px] rounded-md bg-selectbg  z-30 border border-bordergray'>
                            <span className='flex justify-center gap-5  items-center hover:bg-slate-200  hover:rounded py-2.5 px-2 cursor-pointer' onClick={downloadPDF} > Download PDF</span>
                            <span className='flex justify-center gap-5  items-center hover:bg-slate-200  hover:rounded py-2.5 px-2 cursor-pointer' onClick={downloadCSV} > Download CSV</span>
                        </div>}
                    </div>
                    <Link to='/user' className="w-32 py-1.5 bg-primary text-white rounded cursor-pointer flex items-center justify-center gap-2">
                        <span className="text-white">+ Add user</span>
                    </Link>
                </div>
            </div>
            <div className="flex justify-between items-center flex-wrap gap-2 lg:gap:3">
                <div className="flex items-center gap-4 flex-wrap">
                    <select onChange={(e) => setFilter({ ...filter, company: e.target.value })} value={filter.company} className='w-full lg:w-44 bg-white border border-bordergray py-2 px-4 rounded '>
                        <option value="">Company</option>
                        {/* {Data.map((data) => <option value={data.company}>{data.company}</option>)} */}
                        {[...new Set(Data.map((data) => data.company))].map((company, index) => (
                            <option key={index} value={company}>{company}</option>
                        ))}
                    </select>
                    <select onChange={(e) => setFilter({ ...filter, designation: e.target.value })} value={filter.designation} className='w-full lg:w-44 bg-white border border-bordergray py-2 px-4 rounded '>
                        <option value="">Designation</option>
                        {/* {Data.map((data) => <option value={data.designation}>{data.designation}</option>)} */}
                        {[...new Set(Data.map((data) => data.designation))].map((designation, index) => (
                            <option key={index} value={designation}>{designation}</option>
                        ))}
                    </select>
                    <select onChange={(e) => setFilter({ ...filter, modules: e.target.value })} value={filter.modules} className='w-full lg:w-44 bg-white border border-bordergray py-2 px-4 rounded '>
                        <option value="">Modules</option>
                        {/* {Data.map((data) => <option value={data.modules}>{data.modules}</option>)} */}
                        {[...new Set(Data.map((data) => data.modules))].map((modules, index) => (
                            <option key={index} value={modules}>{modules}</option>
                        ))}
                    </select>
                    <span className='w-full lg:w-44 relative'>
                        <input type='text' className='w-full focus-visible focus-visible:outline-none py-2 ps-8 border border-bordergray rounded placeholder:text-black' placeholder='Search' onChange={(e) => setSearch(e.target.value)} value={search} />
                        <svg className="absolute top-2.5 left-1.5 w-6 h-6" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 19.5L13 13.5M1 8.5C1 9.41925 1.18106 10.3295 1.53284 11.1788C1.88463 12.0281 2.40024 12.7997 3.05025 13.4497C3.70026 14.0998 4.47194 14.6154 5.32122 14.9672C6.1705 15.3189 7.08075 15.5 8 15.5C8.91925 15.5 9.82951 15.3189 10.6788 14.9672C11.5281 14.6154 12.2997 14.0998 12.9497 13.4497C13.5998 12.7997 14.1154 12.0281 14.4672 11.1788C14.8189 10.3295 15 9.41925 15 8.5C15 7.58075 14.8189 6.6705 14.4672 5.82122C14.1154 4.97194 13.5998 4.20026 12.9497 3.55025C12.2997 2.90024 11.5281 2.38463 10.6788 2.03284C9.82951 1.68106 8.91925 1.5 8 1.5C7.08075 1.5 6.1705 1.68106 5.32122 2.03284C4.47194 2.38463 3.70026 2.90024 3.05025 3.55025C2.40024 4.20026 1.88463 4.97194 1.53284 5.82122C1.18106 6.6705 1 7.58075 1 8.5Z" stroke="gray" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                </div>
                <div className="flex items-center justify-center gap-2 py-2">
                    {/* <LuLayoutGrid className={`${view === 'grid' ? 'bg-black text-white' : 'bg-white text-black'} p-1.5 rounded-md cursor-pointer`} size={30} onClick={handleGridView} /> */}
                    <svg className={`${view === 'grid' ? 'bg-black text-white' : 'bg-white text-black'} p-2.5 h-10 w-10 rounded-md cursor-pointer`} viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleGridView} >
                        <path d="M1 1.5C1 1.23478 1.10536 0.98043 1.29289 0.792893C1.48043 0.605357 1.73478 0.5 2 0.5H6C6.26522 0.5 6.51957 0.605357 6.70711 0.792893C6.89464 0.98043 7 1.23478 7 1.5V5.5C7 5.76522 6.89464 6.01957 6.70711 6.20711C6.51957 6.39464 6.26522 6.5 6 6.5H2C1.73478 6.5 1.48043 6.39464 1.29289 6.20711C1.10536 6.01957 1 5.76522 1 5.5V1.5Z" stroke={`${view == 'grid' ? "white" : "black"}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} />
                        <path d="M11 1.5C11 1.23478 11.1054 0.98043 11.2929 0.792893C11.4804 0.605357 11.7348 0.5 12 0.5H16C16.2652 0.5 16.5196 0.605357 16.7071 0.792893C16.8946 0.98043 17 1.23478 17 1.5V5.5C17 5.76522 16.8946 6.01957 16.7071 6.20711C16.5196 6.39464 16.2652 6.5 16 6.5H12C11.7348 6.5 11.4804 6.39464 11.2929 6.20711C11.1054 6.01957 11 5.76522 11 5.5V1.5Z" stroke={`${view == 'grid' ? "white" : "black"}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} />
                        <path d="M1 11.5C1 11.2348 1.10536 10.9804 1.29289 10.7929C1.48043 10.6054 1.73478 10.5 2 10.5H6C6.26522 10.5 6.51957 10.6054 6.70711 10.7929C6.89464 10.9804 7 11.2348 7 11.5V15.5C7 15.7652 6.89464 16.0196 6.70711 16.2071C6.51957 16.3946 6.26522 16.5 6 16.5H2C1.73478 16.5 1.48043 16.3946 1.29289 16.2071C1.10536 16.0196 1 15.7652 1 15.5V11.5Z" stroke={`${view == 'grid' ? "white" : "black"}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} />
                        <path d="M11 11.5C11 11.2348 11.1054 10.9804 11.2929 10.7929C11.4804 10.6054 11.7348 10.5 12 10.5H16C16.2652 10.5 16.5196 10.6054 16.7071 10.7929C16.8946 10.9804 17 11.2348 17 11.5V15.5C17 15.7652 16.8946 16.0196 16.7071 16.2071C16.5196 16.3946 16.2652 16.5 16 16.5H12C11.7348 16.5 11.4804 16.3946 11.2929 16.2071C11.1054 16.0196 11 15.7652 11 15.5V11.5Z" stroke={`${view == 'grid' ? "white" : "black"}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} />
                    </svg>
                    {/* <FaListUl className={`${view === 'list' ? 'bg-black text-white' : 'bg-white text-black'} p-1.5 rounded cursor-pointer`} size={30} onClick={handleListView} /> */}
                    <svg className={`${view === 'list' ? 'bg-black text-white' : 'bg-white text-black'} p-2.5 h-10 w-10 rounded-md cursor-pointer`} viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleListView}>
                        <path d="M5 1H16M5 7H16M5 13H16M1 1V1.01M1 7V7.01M1 13V13.01" stroke={`${view == 'list' ? "white" : "black"}`} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                </div>
            </div>
            {view === 'list' ?
                (<div className='mt-6' ref={pdfref} >
                    <DataTable
                        columns={[
                            {
                                name: 'Sno',
                                selector: (row) => row.sno,
                                sortable: true,
                                left: 1,
                                width: '100px',
                            },
                            {
                                name: 'User',
                                selector: (row) => (<UserIcon user={row.user} />),
                                sortable: true,
                            },
                            {
                                name: 'Designation',
                                selector: (row) => row.designation,
                                sortable: true,
                            },
                            {
                                name: 'Company',
                                selector: (row) => <CompanyIcon row={row.company} />,
                                sortable: true,
                            },
                            {
                                name: 'Modules',
                                selector: (row) => row.modules,
                                sortable: true,
                            },
                            {
                                name: 'Actions',
                                cell: (row) => (
                                    <div className='h-5 w-5 relative' onClick={() => toggleAction(row.sno)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                        </svg>
                                        {selectedRow === row.sno && (
                                            <ActionMenu
                                                onView={() => handleView(row.sno)}
                                                onEdit={() => handleEdit(row.sno)}
                                                onDelete={() => handleDelete(row.sno)}
                                            />
                                        )
                                        }
                                    </div>),
                              
                                center: 1,
                                width: '100px',
                            },]
                        }
                        data={filterData} selectableRows fixedHeader customStyles={customStyles} responsive />
                </div>) : (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4">
                    {filterData.map((user, index) => (
                        <div key={index} className="border-t-8 border-red-500 flex flex-col justify-center items-center rounded-lg shadow pb-4 pt-8">
                            <img src="https://png.pngtree.com/thumb_back/fh260/background/20230516/pngtree-wolfs-full-hd-wallpaper-art-wallpaper-1920x1080-1080p-image_2571308.jpg" alt="wolf of walk street" width={200} />
                            <div className='flex flex-col justify-center items-center mt-4'>
                                <h3 className="font-bold">{user.user}</h3>
                                <p className="text-gray-600">{user.designation}</p>
                                <p className="text-gray-600">{user.company}</p>
                            </div>
                            <div className="flex justify-between mt-6 gap-4">
                                <button className="bg-yellow-500 text-white p-2 rounded-full"><FaBell /></button>
                                <button className="bg-yellow-500 text-white p-2 rounded-full"><LuDelete /></button>
                                <button className="bg-yellow-500 text-white p-2 rounded-full"><HiViewList /></button>
                                <button className="bg-yellow-500 text-white p-2 rounded-full"><GoDownload /></button>
                            </div>
                        </div>
                    ))}
                </div>)
            }
            {totalPages > 1 && (
                <div className="py-2 px-4 flex justify-between items-center mt-2 w-full">
                    <select value={itemsPerPage} onChange={(e) => setItemsPerPage(e.target.value)}
                        className="p-2 rounded w-24"
                    >
                        <option value="10">Show 10</option>
                        <option value="20">Show 20</option>
                        <option value="30">Show 30</option>
                    </select>
                    <CustomPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </div>
            )}
        </div>
    )
}

export default UserList



// import { LuList } from "react-icons/lu";
// import { LuLayoutGrid } from "react-icons/lu";
// import { FaAngleLeft } from "react-icons/fa6";
// import React, { useState } from 'react'
// import { LuDownload } from "react-icons/lu";
// import { Data } from "../../Components/user/Data";
// import { IoIosAdd, IoIosSearch } from "react-icons/io";
// import DataTable from "react-data-table-component";
// import CustomPagination from "../../Components/compliance list/CustomPagination";
// import { Columns } from "../../Components/user/Columns";
// import { Link } from "react-router-dom";

// const UserList = () => {
//     const [search, setSearch] = useState("")
//     const [tableData, setTableData] = useState(Data)
//     const [filter, setFilter] = useState({
//         company: '', designation: '', modules: '',
//     })
//     const [currentPage, setCurrentPage] = useState(1)
//     const [itemsPerPage, setItemsPerPage] = useState(10)
//     // const handleInputChange = (e) => {
//     //     const { name, value } = e.target
//     //     setFilter({ ...filter, [name]: value, })
//     // }
//     var filterData = tableData.filter((item) => {
//         return (
//             (filter.company ? item.company === filter.company : true) &&
//             (filter.designation ? item.designation === filter.designation : true) &&
//             (filter.modules ? item.modules === filter.modules : true) && (
//                 item.company.toLowerCase().includes(search.toLowerCase()) ||
//                 item.designation.toLowerCase().includes(search.toLowerCase()) ||
//                 item.modules.toLowerCase().includes(search.toLowerCase()))
//         );
//     });
//     const customStyles = {
//         rows: {
//             style: {
//                 minHeight: '20px',
//             },
//         },
//         headCells: {
//             style: {
//                 backgroundColor: '#000',
//                 color: '#fff',
//                 fontSize: '14px',
//             },
//         },
//         cells: {
//             style: {
//                 borderBottom: '1px solid rgba(0,0,0,0.15)',
//                 padding: '15px 20px',
//                 fontSize: '14px',
//             },
//         },
//     };
//     const totalPages = Math.ceil(filterData.length / itemsPerPage)
//     var filterData = filterData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
//     return (
//         <div className='h-full lg:w-full w-screen p-5 shadow-lg'>
//             <div className="flex items-center justify-between mb-4">
//                 <h2 className='text-xl font-bold'>User List</h2>
//                 <div className="flex items-center justify-center gap-4">
//                     <LuDownload className="bg-yellow-600 text-white rounded-full p-2 cursor-pointer" size={35} />
//                     <Link to="/user" className="w-36 py-1.5 bg-yellow-600 text-white rounded cursor-pointer flex items-center justify-center gap-2">
//                         <IoIosAdd size={20} /><span>Add User</span>
//                     </Link>
//                 </div>
//             </div>
//             <div className="flex justify-between items-center flex-wrap gap-2">
//                 <div className="flex justify-center items-center gap-4 flex-wrap">
//                     <select onChange={(e) => setFilter({ ...filter, company: e.target.value })} value={filter.company} className='w-full lg:w-44 py-2 px-4 rounded '>
//                         <option value="">Company</option>
//                         {Data.map((data) => <option value={data.company}>{data.company}</option>)}
//                     </select>
//                     <select onChange={(e) => setFilter({ ...filter, designation: e.target.value })} value={filter.designation} className='w-full lg:w-56 py-2 px-4 rounded '>
//                         <option value="">Designation</option>
//                         {Data.map((data) => <option value={data.designation}>{data.designation}</option>)}
//                     </select>
//                     <select onChange={(e) => setFilter({ ...filter, modules: e.target.value })} value={filter.modules} className='w-full lg:w-56 py-2 px-4 rounded '>
//                         <option value="">Modules</option>
//                         {Data.map((data) => <option value={data.modules}>{data.modules}</option>)}
//                     </select>
//                     <span className='w-full lg:w-56 relative'>
//                         <input type='text' className='w-full focus-visible focus-visible:outline-none py-1.5 ps-8 border border-gray-300 rounded' placeholder='Search' onChange={(e) => setSearch(e.target.value)} value={search} />
//                         <IoIosSearch className='absolute top-2 left-2' size={20} />
//                     </span>
//                 </div>
//                 <div className="flex items-center justify-center gap-2 py-2">
//                     <LuLayoutGrid className="bg-black text-white p-1 rounded cursor-pointer" size={30} />
//                     <LuList className="bg-white border p-1 rounded cursor-pointer" size={30} />
//                 </div>
//             </div>
//             <div className='my-6'>
//                 <DataTable columns={Columns} data={filterData} selectableRows fixedHeader customStyles={customStyles} responsive />
//             </div>
//             <div className="py-2 px-4 flex justify-between items-center">
//                 <select value={itemsPerPage} onChange={(e) => setItemsPerPage(e.target.value)}
//                     className="p-2 rounded w-24"
//                 >
//                     <option value="10">Show 10</option>
//                     <option value="20">Show 20</option>
//                     <option value="30">Show 30</option>
//                 </select>
//                 <CustomPagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
//             </div>
//         </div>
//     )
// }

// export default UserList