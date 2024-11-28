import React, { useEffect, useState } from 'react'
import { CiBoxList, CiGrid41, CiSearch } from 'react-icons/ci'
import { GoDownload, GoPencil } from 'react-icons/go'
import { MdAdd } from "react-icons/md"
import logo from '../../Images/sky.jpg'
import { IoNotificationsOffOutline, IoTrashOutline } from 'react-icons/io5'
import { AiOutlineFileSearch, AiOutlineMail } from 'react-icons/ai'
import DataTable from 'react-data-table-component'
import ActionMenu from '../../Components/ActionMenu'
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
const ClientBranchManagement = () => {
    const [selectedRow, setSelectedRow] = useState(null);
    const toggleAction = (Rowid) => {
        setSelectedRow(selectedRow === Rowid ? null : Rowid)
    }
    const handleView = ({ id }) => {
        alert(`${id} was viewed`)
    }

    const handleEdit = (id) => {
        toggleModal(id);
    }

    const handleDelete = ({ id }) => {
        console.log(`${id} was Deleted`)
    }
    const Branch = [
        {
            sno:1,
            company: "ace catering equipment",
            Area: 'karntaka',
            Branch: "bangolore",
            pincode: "560004",
            prioriy: "complete"
        },
        {
            sno:2,
            company: "ace catering equipment",
            Area: 'karntaka',
            email: "isabella235@gmail.com",
            user: "isabella",
            Branch: "agra",
            prioriy: "complete"
        },
        { 
            sno:3,
            company: "ace catering equipment",
            Area: 'karntaka',
            email: "paulacecatering@gmail.com",
            user: "Joshup",
            Branch: "koramangala-bangalore",
            prioriy: "incomplete"
        },

        {
            sno:4,
            company: "ace catering equipment",
            Area: 'karntaka',
            email: "rachel@gmail.com",
            user: "rachel",
            Branch: "Mumbai",
            prioriy: "complete",
        },
    ]
    const columns = [
        {
            name: "sno",
            selector: row => row.sno,
            sortable: true,
            width: '100px',
            grow: 1
        },
        {
            name: "Company",
            cell: (row) => (<span className='flex items-center gap-4'><img src={logo} className='w-10 h-10 rounded-full' /> {row.company}</span>),
            sortable: true,
            grow: 2,
            width: '300px'
        },
        {
            name: "Branch",
            selector: row => row.Branch,
            sortable: true,
            grow: 1.5

        },
        {
            name: "Area",
            selector: row => row.Area,
            sortable: true,

        },
        {
            name: "Email",
            selector: row => row.email,
            sortable: true,
        },
        {
            name: "User",
            selector: row => row.user,
            sortable: true,

        },
        {
            name: "Priority",
            selector: row => row.prioriy,
            sortable: true,

        },
        {
            name: "Action",
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
            ignoreClick: true,
            center:1

        }
    ]

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#000000',
                color: 'white',
                fontSize: '14px',
                paddingLeft: '30px'
            },
            rows: {
                minHeight: '20px',
            }
        }
    }
    const [Data, setData] = useState(Branch)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState({ company: "", email: "", user: "", Branch: "", pincode: "", prioriy: "", area: "" })
    const [filterData, setfilterData] = useState(Data)
    const [view, setView] = useState('grid')
    useEffect(() => {
        const filtered = Data.filter((data) => {
            return (
                (filter.company ? data.company === filter.company : true) &&
                (filter.email ? data.email === filter.email : true) &&
                (filter.area ? data.area === filter.area : true) &&
                (filter.user ? data.user === filter.user : true) &&
                (filter.Branch ? data.Branch === filter.Branch : true) &&
                (filter.pincode ? data.pincode === filter.pincode : true) &&
                (filter.prioriy ? data.prioriy === filter.prioriy : true) &&
                (
                    data.company.toLowerCase().includes(search.toLowerCase()) ||
                    data.Branch.toLowerCase().includes(search.toLowerCase()) ||
                    data.email.toLowerCase().includes(search.toLowerCase()) ||
                    data.user.toLowerCase().includes(search.toLowerCase()) ||
                    data.pincode.toLowerCase().includes(search.toLowerCase()) ||
                    data.prioriy.toLowerCase().includes(search.toLowerCase())
                )
            );
        });
        setfilterData(filtered);
    }, [Data, filter, search]);
    return (
        <div className='shadow-md p-2 h-full w-full'>
            <div className="flex justify-between flex-wrap">
                <h1 className='font-bold text-lg mt-3 ms-4'>Client Branch Management({Data.length})</h1>
                <div className='flex justify-evenly items-center gap-3 me-5 p-3'>
                    {/* <GoDownload className='rounded-full bg-primary text-white h-9 w-9 p-2' size={15} onClick={() => window.print()} /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" className='rounded-full bg-primary text-white h-9 w-9 p-2' fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>

                    <Link to="/clientmanagement">
                        <svg className='rounded-full bg-primary text-white h-9 w-9 p-2.5' viewBox="0 0 5 8" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.06 8L5 7.06L1.94667 4L5 0.94L4.06 8.21774e-08L0.0599996 4L4.06 8Z" fill="white" />
                        </svg>
                    </Link>
                    <Link to='/branch'><button className='flex rounded-md bg-primary text-white h-10 w-36 justify-center gap-3 items-center'>+ Add Branch</button> </Link>
                </div>
            </div>

            <div className='flex my-3 justify-between gap-3 p-2 ms-3 items-center flex-wrap'>
                <div className='flex items-center gap-3 flex-wrap'>
                    <select className='bg-white rounded-lg border border-1 border-bordergray px-4 w-full lg:w-36 h-10 ' value={filter.company} onChange={(e) => setFilter({ ...filter, company: e.target.value })}>
                        <option value="">Company</option>
                        {[...new Set(Data.map((data) => data.company))].map((company, index) => (
                            <option key={index} value={company}>{company}</option>
                        ))}
                    </select>
                    <select className='bg-white rounded-lg border border-1 border-bordergray px-4 w-full lg:w-36 h-10' value={filter.area} onChange={(e) => setFilter({ ...filter, area: e.target.value })}>
                        <option value="">area</option>
                        {[...new Set(Data.map((data) => data.Area))].map((area, index) => (
                            <option key={index} value={area}>{area}</option>
                        ))}
                    </select>
                    <select className='bg-white rounded-lg border border-1 border-bordergray px-4 w-full lg:w-36 h-10 ' value={filter.Branch} onChange={(e) => setFilter({ ...filter, Branch: e.target.value })}>
                        <option value="">Branch</option>
                        {[...new Set(Data.map((data) => data.Branch))].map((branch, index) => (
                            <option key={index} value={branch}>{branch}</option>
                        ))}
                    </select>
                    <select className='bg-white rounded-lg border border-1 border-bordergray px-4 w-full lg:w-36 h-10 ' value={filter.prioriy} onChange={(e) => setFilter({ ...filter, prioriy: e.target.value })}>
                        <option value="">Priority</option>
                        {[...new Set(Data.map((data) => data.prioriy))].map((prioriy, index) => (
                            <option key={index} value={prioriy}>{prioriy}</option>
                        ))}
                    </select>
                    <div className='relative w-full lg:w-36 h-10'>
                        <input type="text" className='bg-white rounded-lg border border-1 border-bordergray  w-full lg:w-40 py-1.5 ps-8 ' placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
                        <svg className='h-6 w-6 absolute top-2 left-2' viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 19.5L13 13.5M1 8.5C1 9.41925 1.18106 10.3295 1.53284 11.1788C1.88463 12.0281 2.40024 12.7997 3.05025 13.4497C3.70026 14.0998 4.47194 14.6154 5.32122 14.9672C6.1705 15.3189 7.08075 15.5 8 15.5C8.91925 15.5 9.82951 15.3189 10.6788 14.9672C11.5281 14.6154 12.2997 14.0998 12.9497 13.4497C13.5998 12.7997 14.1154 12.0281 14.4672 11.1788C14.8189 10.3295 15 9.41925 15 8.5C15 7.58075 14.8189 6.6705 14.4672 5.82122C14.1154 4.97194 13.5998 4.20026 12.9497 3.55025C12.2997 2.90024 11.5281 2.38463 10.6788 2.03284C9.82951 1.68106 8.91925 1.5 8 1.5C7.08075 1.5 6.1705 1.68106 5.32122 2.03284C4.47194 2.38463 3.70026 2.90024 3.05025 3.55025C2.40024 4.20026 1.88463 4.97194 1.53284 5.82122C1.18106 6.6705 1 7.58075 1 8.5Z" stroke="gray" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
                <div className='flex items-center gap-2 me-16 mb-1'>
                    <button onClick={(e) => setView('grid')} className={`${view === 'grid' ? 'bg-black text-white' : 'bg-white text-black'} p-2.5 border-1 border-gray-400 rounded-md `}><CiGrid41 size={17} /></button>
                    <button onClick={(e) => setView('list')} className={`${view === 'list' ? 'bg-black text-white' : 'bg-white text-black'} p-2.5 border-1 border-gray-400 rounded-md `}><CiBoxList size={17} /></button>
                </div>
            </div>
            {view === 'list' ? <div className='w-full p-5'>
                <DataTable columns={columns} data={filterData} customStyles={customStyles} fixedHeader selectableRows />
            </div> :

                <div className='p-4'>
                    <div className='flex justify-center lg:justify-start gap-2 flex-wrap w-full'>
                        {filterData.map((data, index) =>
                            // <div className='relative py-8 px-16 rounded-md bg-white items-center' style={{borderLeft:`40px solid ${data.level == 'high' ? 'blue': data.level==='medium'?'green':data.level==='low'?'orange':'white'}`}}>
                            <div key={index} className={`py-3 border border-bordergray rounded-md px-2 justify-center h-52 relative overflow-hidden ${data.prioriy === 'incomplete' ? 'bg-red-50' : data.prioriy === 'complete' ? 'bg-green-50' : ''}`} style={{ width: '300px' }} >
                                <div className='w-36 h-8 absolute top-6 -right-8 '>
                                    <div className={`${data.prioriy === "incomplete" ? 'text-black' : 'text-white'} h-full w-full px-2 bg-yellow-400 text-center leading-8  transform rotate-45`}>{data.prioriy}</div>
                                </div>
                                <div className='flex justify-start gap-4'>
                                    <img src={logo} className='rounded-full h-16 w-16' />
                                    <div className='h-36 w-52'>
                                        <h5 className='font-semibold pe-10 text-wrap mb-0'>{data.company}</h5>
                                        <p className=' text-sm'>Branches - {data.Branch}</p>
                                        {data.Area && <p className=' text-sm'>Area - {data.Area}</p>}
                                        {data.user && <p className='mb-0 text-sm'>Assigned User :{data.user}</p>}

                                    </div>
                                </div>
                                {/* <h6 className='transform rotate-90 font-bold -left-8 bg-yellow-500 items-center text-white'>{data.level}</h6> */}

                                <div className='flex gap-2 border-t w-full justify-center pt-1.5'>
                                    {/* <AiOutlineFileSearch className={`${data.prioriy === "incomplete" ? 'bg-red-600' : 'bg-green-600'} h-9 w-9  text-white rounded-full p-2.5`} /> */}
                                    {data.prioriy == "complete" ? <Link to="/calendar">
                                        <svg className={`${data.prioriy === "incomplete" ? 'bg-red-600' : 'bg-green-600'} w-9 h-9 p-2 rounded-full`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                        </svg></Link> : <svg className={`${data.prioriy === "incomplete" ? 'bg-red-600' : 'bg-green-600'} w-9 h-9 p-2 rounded-full`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                    </svg>}
                                    <svg className='w-9 h-9 bg-primary p-2 rounded-full' viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 15V16C6 16.7956 6.31607 17.5587 6.87868 18.1213C7.44129 18.6839 8.20435 19 9 19C9.79565 19 10.5587 18.6839 11.1213 18.1213C11.6839 17.5587 12 16.7956 12 16V15M7 3C7 2.46957 7.21071 1.96086 7.58579 1.58579C7.96086 1.21071 8.46957 1 9 1C9.53043 1 10.0391 1.21071 10.4142 1.58579C10.7893 1.96086 11 2.46957 11 3C12.1484 3.54303 13.1274 4.38833 13.8321 5.4453C14.5367 6.50227 14.9404 7.73107 15 9V12C15.0753 12.6217 15.2954 13.2171 15.6428 13.7381C15.9902 14.2592 16.4551 14.6914 17 15H1C1.54494 14.6914 2.00981 14.2592 2.35719 13.7381C2.70457 13.2171 2.92474 12.6217 3 12V9C3.05956 7.73107 3.4633 6.50227 4.16795 5.4453C4.8726 4.38833 5.85159 3.54303 7 3Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <svg className='w-9 h-9 bg-primary p-2 rounded-full' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                    </svg>
                                    <svg className='w-9 h-9 bg-primary p-2 rounded-full' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                    </svg>
                                    <svg className='w-9 h-9 bg-primary p-2 rounded-full' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                    <svg className='w-9 h-9 bg-primary p-2 rounded-full' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                    </svg>
                                    {/* <IoNotificationsOffOutline className='h-9 w-9 bg-primary text-white rounded-full p-2.5'/>
                <AiOutlineMail className='h-9 w-9 bg-primary text-white rounded-full p-2.5'/>
                <GoPencil className='h-9 w-9 bg-primary text-white rounded-full p-2.5'/>
                <IoTrashOutline className='h-9 w-9 bg-primary text-white rounded-full p-2.5'/>
                <AiOutlineFileSearch className='h-9 w-9 bg-primary text-white rounded-full p-2.5'/> */}
                                </div>

                                {/* <div className='flex'>
                <img src={logo} className='rounded-full h-16 w-16'/>
                <h5 className='font-semibold ms-3 '>{data.company}</h5>
                
            </div>
            <h6 className='absolute transform rotate-90 font-bold -left-8 bg-yellow-500 items-center text-white'>{data.level}</h6>
            <p className='text-start ms-20'>Branches - {data.branches}</p>
            <hr/>
            <div className='flex gap-3'>
                <button className='p-2.5 bg-yellow-300 text-white rounded-full'><IoNotificationsOffOutline/></button>
                <button className='p-2.5 bg-yellow-300 text-white rounded-full'><AiOutlineMail/></button>
                <button className='p-2.5 bg-yellow-300 text-white rounded-full'><GoPencil/></button>
                <button className='p-2.5 bg-yellow-300 text-white rounded-full'><IoTrashOutline/></button>
                <button className='p-2.5 bg-yellow-300 text-white rounded-full'><AiOutlineFileSearch/></button>
            </div> */}

                            </div>
                        )}
                    </div>
                </div>}
        </div>
    )
}

export default ClientBranchManagement
