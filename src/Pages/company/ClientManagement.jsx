import React, { useEffect, useState } from 'react'
import { CiBoxList, CiGrid41, CiSearch } from 'react-icons/ci'
import { GoDownload, GoPencil } from 'react-icons/go'
import { MdAdd } from "react-icons/md"
import logo from '../../Images/sky.jpg'
import { IoNotificationsOffOutline, IoTrashOutline } from 'react-icons/io5'
import { AiOutlineFileSearch, AiOutlineMail } from 'react-icons/ai'
import DataTable from 'react-data-table-component'
import ActionMenu from '../../Components/ActionMenu'
import { Clients } from '../../Components/company/Data'
import { Link, useNavigate } from 'react-router-dom'
const ClientManagement = () => {
    const navigate = useNavigate()
    const [selectedRow, setSelectedRow] = useState(null);
    const columns = [
        {
            sno: 1,
            name: "sno",
            selector: row => row.sno,
            sortable: true,
            width: '90px',
            grow: 1
        },
        {
            sno: 2,
            name: "Company",
            cell: (row) => (<span className='flex items-center gap-4 '><img src={logo} className='w-10 h-10 rounded-full' /><p className='text-wrap'>{row.company}</p></span>),
            sortable: true,
            width: '300px'
        },
        {
            sno: 3,
            name: "Branch",
            selector: row => row.branches,
            sortable: true,
            width: '200px',
            center: true

        },
        {
            sno: 4,
            name: "Level",
            selector: row => row.level,
            sortable: true,
            center: true

        },
        {
            sno: 5,
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
            center: true

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
    const [Data, setData] = useState(Clients)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState({ company: "", branches: "", level: "" })
    const [filterData, setfilterData] = useState(Data)
    const [view, setView] = useState('grid')
    useEffect(() => {
        const filtered = Data.filter((data) => {
            return (
                (filter.company ? data.company === filter.company : true) &&
                (data.company.toLowerCase().includes(search.toLowerCase()) ||
                    data.branches.toLowerCase().includes(search.toLowerCase()) ||
                    data.level.toLowerCase().includes(search.toLowerCase()))
            );
        });
        setfilterData(filtered);

    }, [Data, filter, search]);
    const branch = () => {
        navigate('/clientbranchmanagement')
    }
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

    return (
        <div className='h-screen'>
            <div className="flex flex-col justify-center gap-2 items-start lg:flex-row lg:items-center lg:justify-between">
                <h1 className='font-bold text-lg mt-3 ms-4'>Client Management({Data.length})</h1>
                <div className='flex justify-evenly items-center gap-3 me-5 p-3'>
                    {/* <GoDownload className='rounded-full bg-primary text-white h-8 w-8 p-1.5' size={15} onClick={()=>window.print()}/> */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className='bg-primary h-8 w-8 p-1.5 rounded-full'>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    <Link to='/company' className='flex rounded-md bg-primary text-white h-8 w-28 justify-center items-center'>+ Add Client</Link>
                </div>
            </div>

            <div className='flex my-3 justify-between gap-3 p-2 ms-3 items-center flex-wrap'>
                <div className='flex items-center gap-3 flex-wrap'>
                    <select className='bg-white rounded-lg border  border-bordergray px-4 h-9 w-full lg:w-44 ' value={filter.company} onChange={(e) => setFilter({ ...filter, company: e.target.value })}>
                        <option value="">Company</option>
                        {[...new Set(Data.map((data) => data.company))].map((company, index) => (
                            <option key={index} value={company}>{company}</option>
                        ))}
                        {/* {Data.map((item)=><option value={item.company}>{item.company}</option>)} */}
                    </select>
                    <div className='relative w-full lg:w-44'>
                        <input type="text" className='bg-white rounded-lg border  border-bordergray  w-full lg:w-44 py-1.5 ps-8 ' placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
                        <svg className='absolute w-5 h-5 top-2 left-2' viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 19.5L13 13.5M1 8.5C1 9.41925 1.18106 10.3295 1.53284 11.1788C1.88463 12.0281 2.40024 12.7997 3.05025 13.4497C3.70026 14.0998 4.47194 14.6154 5.32122 14.9672C6.1705 15.3189 7.08075 15.5 8 15.5C8.91925 15.5 9.82951 15.3189 10.6788 14.9672C11.5281 14.6154 12.2997 14.0998 12.9497 13.4497C13.5998 12.7997 14.1154 12.0281 14.4672 11.1788C14.8189 10.3295 15 9.41925 15 8.5C15 7.58075 14.8189 6.6705 14.4672 5.82122C14.1154 4.97194 13.5998 4.20026 12.9497 3.55025C12.2997 2.90024 11.5281 2.38463 10.6788 2.03284C9.82951 1.68106 8.91925 1.5 8 1.5C7.08075 1.5 6.1705 1.68106 5.32122 2.03284C4.47194 2.38463 3.70026 2.90024 3.05025 3.55025C2.40024 4.20026 1.88463 4.97194 1.53284 5.82122C1.18106 6.6705 1 7.58075 1 8.5Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {/* <CiSearch className='absolute top-1.5 left-2' size={23} /> */}

                    </div>
                </div>
                <div className='flex items-start gap-2 me-6'>
                    <button onClick={(e) => setView('grid')} className={`${view === 'grid' ? 'bg-black text-white' : 'bg-white text-black'} p-2.5 border-1 border-gray-400 rounded-md `}>
                        <svg className='h-4 w-4' viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1.5C1 1.23478 1.10536 0.98043 1.29289 0.792893C1.48043 0.605357 1.73478 0.5 2 0.5H6C6.26522 0.5 6.51957 0.605357 6.70711 0.792893C6.89464 0.98043 7 1.23478 7 1.5V5.5C7 5.76522 6.89464 6.01957 6.70711 6.20711C6.51957 6.39464 6.26522 6.5 6 6.5H2C1.73478 6.5 1.48043 6.39464 1.29289 6.20711C1.10536 6.01957 1 5.76522 1 5.5V1.5Z" stroke={`${view == 'grid' ? "white" : "black"}`} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M11 1.5C11 1.23478 11.1054 0.98043 11.2929 0.792893C11.4804 0.605357 11.7348 0.5 12 0.5H16C16.2652 0.5 16.5196 0.605357 16.7071 0.792893C16.8946 0.98043 17 1.23478 17 1.5V5.5C17 5.76522 16.8946 6.01957 16.7071 6.20711C16.5196 6.39464 16.2652 6.5 16 6.5H12C11.7348 6.5 11.4804 6.39464 11.2929 6.20711C11.1054 6.01957 11 5.76522 11 5.5V1.5Z" stroke={`${view == 'grid' ? "white" : "black"}`} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1 11.5C1 11.2348 1.10536 10.9804 1.29289 10.7929C1.48043 10.6054 1.73478 10.5 2 10.5H6C6.26522 10.5 6.51957 10.6054 6.70711 10.7929C6.89464 10.9804 7 11.2348 7 11.5V15.5C7 15.7652 6.89464 16.0196 6.70711 16.2071C6.51957 16.3946 6.26522 16.5 6 16.5H2C1.73478 16.5 1.48043 16.3946 1.29289 16.2071C1.10536 16.0196 1 15.7652 1 15.5V11.5Z" stroke={`${view == 'grid' ? "white" : "black"}`} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M11 11.5C11 11.2348 11.1054 10.9804 11.2929 10.7929C11.4804 10.6054 11.7348 10.5 12 10.5H16C16.2652 10.5 16.5196 10.6054 16.7071 10.7929C16.8946 10.9804 17 11.2348 17 11.5V15.5C17 15.7652 16.8946 16.0196 16.7071 16.2071C16.5196 16.3946 16.2652 16.5 16 16.5H12C11.7348 16.5 11.4804 16.3946 11.2929 16.2071C11.1054 16.0196 11 15.7652 11 15.5V11.5Z" stroke={`${view == 'grid' ? "white" : "black"}`} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button onClick={(e) => setView('list')} className={`${view === 'list' ? 'bg-black text-white' : 'bg-white text-black'} p-2.5 border-1 border-gray-400 rounded-md `}>
                        <svg className='h-4 w-4' viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 1H16M5 7H16M5 13H16M1 1V1.01M1 7V7.01M1 13V13.01" stroke={`${view == 'list' ? "white" : "black"}`} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
            {view === 'list' ? <div className='w-full p-5'>
                <DataTable columns={columns} data={filterData} customStyles={customStyles} fixedHeader selectableRows />
            </div> :

                <div className='p-4'>
                    {/* <div className={`grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 xl:grid-cols-4 bg-red-200 ` }> */}
                    <div className="flex justify-start gap-10 flex-wrap w-full">

                        {filterData.map((data, index) =>
                            // <div className='relative py-8 px-16 rounded-md bg-white items-center' style={{borderLeft:`40px solid ${data.level == 'high' ? 'blue': data.level==='medium'?'green':data.level==='low'?'orange':'white'}`}}>
                            <div key={index} className='flex items-center border border-bordergray rounded-md bg-white w-min' onClick={branch}>
                                <span className={`w-8 h-full  ${data.level == 'high' ? 'bg-highBlue' : data.level === 'medium' ? 'bg-medgreen' : data.level === 'low' ? 'bg-lowOrange' : 'bg-white'} text-center text-white flex items-center justify-center rounded-s-md`}>
                                    <p className='transform -rotate-90 font-bold'>{data.level.toUpperCase()}</p>
                                </span>
                                <div className='p-3'>
                                    <div className='flex justify-start gap-4 items-center'>
                                        <img src={logo} className='rounded-full h-16 w-16' />
                                        <div className=''>
                                            <h5 className='font-semibold flex-wrap'>{data.company}</h5>
                                            <p className=''>Branches - {data.branches}</p>
                                        </div>
                                    </div>
                                    {/* <h6 className='transform rotate-90 font-bold -left-8 bg-yellow-500 items-center text-white'>{data.level}</h6> */}

                                    <div className='flex gap-3 border-t py-2 w-full mt-3 justify-center'>

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

                                    </div>
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

export default ClientManagement


// style={{borderLeft:`40px solid ${data.level == 'high' ? 'blue': data.level==='medium'?'green':data.level==='low'?'orange':'white'}`}}