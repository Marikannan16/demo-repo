import { LuDelete } from "react-icons/lu";
import { LuLayoutGrid } from "react-icons/lu";
import { FaBell, FaListUl } from "react-icons/fa6";
import React, { useRef, useState } from 'react'
import { LuDownload } from "react-icons/lu";
import { Data } from "./Data";
import { IoIosAdd, IoIosSearch } from "react-icons/io";
import { Columns } from "./Columns";
import DataTable from "react-data-table-component";
import CustomPagination from "./CustomPagination";
import { Link } from "react-router-dom";
import { HiViewList } from "react-icons/hi";
import { GoDownload } from "react-icons/go";
import html2pdf from 'html2pdf.js'
import { BsFiletypeCsv, BsFiletypePdf } from "react-icons/bs";
const UserList = () => {
    const [search, setSearch] = useState("")
    const [view, setView] = useState('list')
    const [tableData] = useState(Data)
    const pdfref = useRef()
    const [DownMenu, setDownMenu] = useState(false)
    const [filter, setFilter] = useState({
        company: '', designation: '', modules: '',
    })
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(30)
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
        link.setAttribute('download', 'subcategory.csv');
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
    return (
        <div className='h-full w-full p-5 shadow-lg'>
            <div className="flex flex-col justify-center gap-2 items-start lg:flex-row mb-6 lg:items-center lg:justify-between">
                <h2 className='text-xl font-bold '>User Management({filterData.length})</h2>
                <div className="flex items-center justify-center gap-2 lg:gap-4">
                    <div className='relative'><button className="bg-primary text-white rounded-full p-2 cursor-pointer" onClick={() => setDownMenu(!DownMenu)}><LuDownload size={20} /></button>
                        {DownMenu && <div className='absolute mt-5 lg:right-0 left-0 w-40 h-[80px] rounded-md bg-selectbg  z-30 border border-bordergray'>
                            <span className='flex justify-start gap-5  items-center hover:bg-slate-200  hover:rounded py-2.5 px-2 cursor-pointer' onClick={downloadPDF} ><BsFiletypePdf size={18} />  Download PDF</span>
                            <span className='flex justify-start gap-5  items-center hover:bg-slate-200  hover:rounded py-2.5 px-2 cursor-pointer' onClick={downloadCSV} ><BsFiletypeCsv size={18} />  Download CSV</span>
                        </div>}
                    </div>
                    <Link to='/user' className="w-32 py-1.5 bg-primary text-white rounded cursor-pointer flex items-center justify-center gap-2">
                        <IoIosAdd /><span>Add user</span>
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
                        <IoIosSearch className='absolute top-2 left-2 text-input' size={23} />
                    </span>
                </div>
                <div className="flex items-center justify-center gap-2 py-2">
                    <LuLayoutGrid className={`${view === 'grid' ? 'bg-black text-white' : 'bg-white text-black'} p-1.5 rounded-md cursor-pointer`} size={30} onClick={handleGridView} />
                    <FaListUl className={`${view === 'list' ? 'bg-black text-white' : 'bg-white text-black'} p-1.5 rounded cursor-pointer`} size={30} onClick={handleListView} />
                </div>
            </div>
            {view === 'list' ?
                (<div className='mt-6' ref={pdfref} >
                    <DataTable columns={Columns} data={filterData} selectableRows fixedHeader customStyles={customStyles} responsive />
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
                    <CustomPagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
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