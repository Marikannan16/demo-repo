import React, { useState } from 'react'
import data from '../../Components/compliancefilling/ConsolidateData'
import columns from '../../Components/compliancefilling/ConsolidateColumns'
import DataTable from 'react-data-table-component'
import { HiOutlineDownload } from "react-icons/hi";
import { FiMail } from "react-icons/fi";
import { PiCaretUpDownFill } from "react-icons/pi";
import { IoIosSearch } from 'react-icons/io';
import { BsSliders } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";
import CustomPage from '../../Components/compliancefilling/CustomPage';
import Dummy from '../../Components/compliancefilling/ScoreDum';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import CustomPagination from '../../Components/CustomPagination';
import EditCompliances from '../../Components/compliancefilling/EditCompliances';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { IoCloseSharp } from 'react-icons/io5';

import { MdOutlineLocationOn } from "react-icons/md";
import img from "../../Images/sky.jpg"
import Dummy2 from "../../Components/compliancefilling/ScoreDummy";
import ActionMenu from '../../Components/ActionMenu';
const Consolidate = () => {
    const [dateRange, setdateRange] = useState([null, null]);
    const [Page, setPage] = useState(1)
    const [Itemsperpage, setItemsperpage] = useState(5)
    const [modelopen, setmodelopen] = useState(false)


    const [Percent, setPercent] = useState({
        totalCom: {
            value: 65,
            label: 'totalCom'
        },
        complied: {
            value: 15,
            label: 'complied'
        },
        notComplied: {
            value: 25,
            label: 'notComplied'
        },
        partiallyCom: {
            value: 12,
            label: 'partiallyCom'
        },
        overDue: {
            value: 16,
            label: 'overDue'
        },
    })


    const [slide, setSlide] = useState(false)
    const [DownMenu, setDownMenu] = useState(false)
    const [Data] = useState(data)
    const [selectedRow, setSelectedRow] = useState(null);
    const [search, setSearch] = useState('')
    const [selectValue, setSelectValue] = useState({ Company: "", State: '', Status: '', Branch: '', Compliance: '', AssignStaff: '', Priority: '' })
    var filterdata = Data.filter((row) => {
        // const formattedFiledDate = startDate ? moment(startDate).format('DD-MM-YYYY') : '';
        return (
            (selectValue.Company ? row.company === selectValue.Company : true) &&
            (selectValue.State ? row.state === selectValue.State : true) &&
            (selectValue.Branch ? row.branch === selectValue.Branch : true) &&
            (selectValue.Compliance ? row.compliance === selectValue.Compliance : true) &&
            (selectValue.AssignStaff ? row.assignstaff === selectValue.AssignStaff : true) &&
            (selectValue.Priority ? row.priority === selectValue.Priority : true) &&
            (selectValue.Status ? row.status === selectValue.Status : true) &&
            (row.company.toLowerCase().includes(search.toLowerCase()) ||
                row.state.toLowerCase().includes(search.toLowerCase()) ||
                row.branch.toLowerCase().includes(search.toLowerCase()) ||
                row.compliance.toLowerCase().includes(search.toLowerCase()) ||
                row.assignstaff.toLowerCase().includes(search.toLowerCase()) ||
                row.priority.toLowerCase().includes(search.toLowerCase()))

        )
    });
    const [checkFilter, setCheckFilter] = useState({
        company: true,
        state: true,
        branch: true,
        compliance: true,
        staff: true,
        priority: true,

    })
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

    const handleCheckBox = (getName) => {
        setCheckFilter({
            ...checkFilter,
            [getName]: !checkFilter[getName]
        })
    }

    const customStyles = {
        rows: {
            style: {
                minHeight: '75px',
            },
        },
        headCells: {
            style: {
                backgroundColor: '#000',
                color: '#fff',
                paddingLeft: '10px',
                fontSize: '11px',
                whiteSpace: 'normal'
            },
        },
        cells: {
            style: {
                fontSize: '13px',
            },
        },
    }
    const toggleModal = () => {
        setmodelopen(!modelopen)
    }
    const downloadCSV = () => {
        const headers = Object.keys(data[0]);
        const csv = [
            headers.join(','),
            ...data.map(row => Object.values(row).join(','))
        ].join('\n');

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'ConsolidateCompliance.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const handleMail = () => {
        window.location.href = 'mailto:';
    }


    const totalPages = Math.ceil(filterdata.length / Itemsperpage)
    var filterdata = filterdata.slice((Page - 1) * Itemsperpage, Page * Itemsperpage)


    return (
        <>
            <div className='flex flex-col justify-center gap-2 items-start lg:flex-row m-5 lg:items-center lg:justify-between'>
                <h2 className='font-semibold text-lg '>Consolidated Compliance Filling</h2>
                <div className='flex gap-3 items-center'>
                    <button className='rounded-full w-9 h-9 p-2 mt-0.5 text-white bg-primary'>
                        {/* <FiMail className='rounded-full w-9 h-9 p-2 mt-0.5 text-white' style={{ backgroundColor: '#D7B95F' }} /> */}
                        <svg viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 2.55512C1 2.08363 1.1873 1.63144 1.5207 1.29804C1.8541 0.964645 2.30628 0.777344 2.77778 0.777344H15.2222C15.6937 0.777344 16.1459 0.964645 16.4793 1.29804C16.8127 1.63144 17 2.08363 17 2.55512M1 2.55512V11.444C1 11.9155 1.1873 12.3677 1.5207 12.7011C1.8541 13.0345 2.30628 13.2218 2.77778 13.2218H15.2222C15.6937 13.2218 16.1459 13.0345 16.4793 12.7011C16.8127 12.3677 17 11.9155 17 11.444V2.55512M1 2.55512L9 7.88845L17 2.55512" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <div className='relative'><button className="w-9 h-9 bg-primary text-white rounded-full  p-2 cursor-pointer" onClick={() => setDownMenu(!DownMenu)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>

                    </button>
                        {DownMenu && <div className='absolute mt-2 lg:right-0 w-44 h-[80px] rounded-md bg-selectbg  z-30 border border-bordergray'>
                            <span className='flex justify-center gap-5 items-center hover:bg-slate-200  hover:rounded py-2.5 px-2 cursor-pointer' onClick={() => window.print()} >Download PDF</span>
                            <span className='flex justify-center gap-5 items-center hover:bg-slate-200  hover:rounded py-2.5 px-2 cursor-pointer' onClick={downloadCSV} >Download CSV</span>
                        </div>}
                    </div>

                </div>
            </div>

            <div className=' flex flex-nowrap lg:justify-start items-center overflow-x-scroll mx-5 my-2 gap-2 '>

                <div onClick={(e) => setSelectValue({ ...selectValue, Status: '' })}
                    className='flex flex-col gap-6 p-4 relative overflow-hidden min-w-60 h-40  bg-fuchsia-100 rounded-lg border-l-8 border-fuchsia-600  hover:border-4 hover:pt-3 hover:pe-3 hover:ps-5  hover:border-fuchsia-500 '>
                    <span className='flex items-center font-semibold  text-wrap text-xl w-52'>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className=' text-white border bg-fuchsia-500 w-12 h-11 rounded-lg me-3 '>
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
                            <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                            <path d="M9 17v-5" />
                            <path d="M12 17v-1" />
                            <path d="M15 17v-3" />
                        </svg>
                        Total Compliance </span>
                    <div className='flex justify-between items-end ps-1'>
                        <h2 className='font-semibold text-3xl'>{Percent.totalCom.value}</h2>
                        <Dummy percent={(Percent.totalCom.value / Percent.totalCom.value * 100)} things={Percent.totalCom} />

                    </div>
                    <div className=' absolute -top-2 -left-14 bg-fuchsia-400 w-52 h-52 rounded-full bg-opacity-5 overflow-hidden'>
                        <div className='absolute left-24 bottom-20 bg-fuchsia-400 w-52 h-52 rounded-full bg-opacity-10'></div>
                    </div>
                </div>

                <div onClick={(e) => setSelectValue({ ...selectValue, Status: 'Complied' })} className='flex flex-col gap-8 p-4 relative overflow-hidden min-w-[240px] h-40  bg-green-100 rounded-lg border-l-8 border-green-600  hover:border-4 hover:pt-3 hover:pe-3 hover:ps-5  hover:border-green-500'>
                    <span className='flex items-center font-semibold  text-wrap text-xl w-52'>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className=' text-white border bg-green-500 w-12 h-11 rounded-lg me-3 '>
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
                            <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                            <path d="M9 17v-5" />
                            <path d="M12 17v-1" />
                            <path d="M15 17v-3" />
                        </svg>
                        Compiled</span>
                    <div className='flex justify-between items-end ps-1'>
                        <h2 className='font-semibold text-3xl' >{Percent.complied.value}</h2>
                        <Dummy percent={(Percent.complied.value / Percent.totalCom.value * 100).toFixed(1)} things={Percent.complied} />
                    </div>
                    <div className=' absolute -top-2 -left-14 bg-green-400 w-52 h-52 rounded-full bg-opacity-5 overflow-hidden'>
                        <div className='absolute left-24 bottom-20 bg-green-400 w-52 h-52 rounded-full bg-opacity-10'></div>
                    </div>
                </div>


                <div onClick={(e) => setSelectValue({ ...selectValue, Status: 'Not Complied' })}
                    className='flex flex-col gap-8 p-4 relative overflow-hidden min-w-60 h-40  bg-red-100 rounded-lg border-l-8 border-red-600  hover:border-4 hover:pt-3 hover:pe-3 hover:ps-5   hover:border-red-500'>
                    <span className='flex items-center font-semibold mt-0.5 text-wrap text-xl w-52 '>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className=' text-white border bg-red-500 w-12 h-11 rounded-lg me-3 '>
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
                            <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                            <path d="M9 17v-5" />
                            <path d="M12 17v-1" />
                            <path d="M15 17v-3" />
                        </svg>
                        Not Complied</span>
                    <div className='flex justify-between items-end ps-1'>
                        <h2 className='font-semibold text-3xl'>{Percent.notComplied.value}</h2>
                        <Dummy percent={(Percent.notComplied.value / Percent.totalCom.value * 100).toFixed(1)} things={Percent.notComplied} />
                    </div>
                    <div className=' absolute -top-2 -left-14 bg-red-400 w-52 h-52 rounded-full bg-opacity-5 overflow-hidden'>
                        <div className='absolute left-24 bottom-20 bg-red-400 w-52 h-52 rounded-full bg-opacity-10'></div>
                    </div>
                </div>

                <div onClick={(e) => setSelectValue({ ...selectValue, Status: 'Partially Complied' })}
                    className='flex flex-col gap-6 p-4 relative overflow-hidden min-w-60 h-40  bg-yellow-100 rounded-lg border-l-8 border-yellow-600  hover:border-4 hover:pt-3 hover:pe-3 hover:ps-5   hover:border-yellow-500'>
                    <span className='flex items-center font-semibold mt-0.5 w-52 text-wrap text-xl '>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className=' text-white border bg-yellow-500 w-12 h-11 rounded-lg me-3 '>
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
                            <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                            <path d="M9 17v-5" />
                            <path d="M12 17v-1" />
                            <path d="M15 17v-3" />
                        </svg>
                        Partially Complied</span>
                    <div className='flex justify-between items-end ps-1'>
                        <h2 className='font-semibold text-3xl'>{Percent.partiallyCom.value}</h2>
                        <Dummy percent={(Percent.partiallyCom.value / Percent.totalCom.value * 100).toFixed(1)} things={Percent.partiallyCom} />
                    </div>
                    <div className=' absolute -top-2 -left-14 bg-yellow-400 w-52 h-52 rounded-full bg-opacity-5 overflow-hidden'>
                        <div className='absolute left-24 bottom-20 bg-yellow-400 w-52 h-52 rounded-full bg-opacity-10'></div>
                    </div>
                </div>

                <div onClick={(e) => setSelectValue({ ...selectValue, Status: 'Over Due' })}
                    className='flex flex-col gap-8 p-4 relative overflow-hidden min-w-[240px] h-40  bg-orange-100 rounded-lg border-l-8 border-orange-600  hover:border-4 hover:pt-3 hover:pe-3 hover:ps-5   hover:border-orange-500'>
                    <span className='flex items-center font-semibold mt-0.5 text-wrap text-xl w-52'>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className=' text-white border bg-orange-500 w-12 h-11 rounded-lg me-3 '>
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
                            <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                            <path d="M9 17v-5" />
                            <path d="M12 17v-1" />
                            <path d="M15 17v-3" />
                        </svg>
                        Over Due</span>
                    <div className='flex justify-between items-end ps-1'>
                        <h2 className='font-semibold text-3xl'>{Percent.overDue.value}</h2>
                        <Dummy percent={(Percent.overDue.value / Percent.totalCom.value * 100).toFixed(1)} things={Percent.overDue} />
                    </div>
                    <div className=' absolute -top-2 -left-14 bg-orange-400 w-52 h-52 rounded-full bg-opacity-5 overflow-hidden'>
                        <div className='absolute left-24 bottom-20 bg-orange-400 w-52 h-52 rounded-full bg-opacity-10'></div>
                    </div>
                </div>



            </div>

            <div className='ps-5 flex flex-wrap items-center gap-2' >
                {checkFilter.company && <select className='bg-white border border-bordergray  mt-2  text-sm  h-9  px-4 rounded-md w-full lg:w-32  ' value={selectValue.Company} onChange={(e) => setSelectValue({ ...selectValue, Company: e.target.value })} >
                    <option value=""> Company</option>
                    {[...new Set(data.map((data) => data.company))].map((company, index) => (
                        <option key={index} value={company}>{company}</option>
                    ))}
                </select>}
                {checkFilter.state && <select className=' bg-white border border-bordergray mt-2 text-sm  h-9  px-4 rounded-md w-full lg:w-32 ' value={selectValue.State} onChange={(e) => setSelectValue({ ...selectValue, State: e.target.value })}>
                    <option value=""> State</option>
                    {[...new Set(data.map((data) => data.state))].map((state, index) => (
                        <option key={index} value={state}>{state}</option>
                    ))}
                </select>}
                {checkFilter.branch && <select className=' bg-white border border-bordergray mt-2  text-sm  h-9  px-4 rounded-md w-full lg:w-32 ' value={selectValue.Branch} onChange={(e) => setSelectValue({ ...selectValue, Branch: e.target.value })}>
                    <option value=""> Branch</option>
                    {[...new Set(data.map((data) => data.branch))].map((branch, index) => (
                        <option key={index} value={branch}>{branch}</option>
                    ))}
                </select>}
                {checkFilter.compliance && <select className=' bg-white border border-bordergray mt-2  text-sm  h-9  px-4 rounded-md w-full lg:w-32 ' value={selectValue.Compliance} onChange={(e) => setSelectValue({ ...selectValue, Compliance: e.target.value })}>
                    <option value=""> Compliance</option>
                    {[...new Set(data.map((data) => data.compliance))].map((compliance, index) => (
                        <option key={index} value={compliance}>{compliance}</option>
                    ))}
                </select>}
                {checkFilter.staff && <select className=' bg-white border border-bordergray mt-2  text-sm  h-9  px-4 rounded-md w-full lg:w-32 ' value={selectValue.AssignStaff} onChange={(e) => setSelectValue({ ...selectValue, AssignStaff: e.target.value })}>
                    <option value="">Staff</option>
                    {[...new Set(data.map((data) => data.assignstaff))].map((assignstaff, index) => (
                        <option key={index} value={assignstaff}>{assignstaff}</option>
                    ))}
                </select>}


                {checkFilter.priority && <select className=' bg-white border border-bordergray mt-2  text-sm h-9 px-4 rounded-md w-full lg:w-32 ' value={selectValue.Priority} onChange={(e) => setSelectValue({ ...selectValue, Priority: e.target.value })}>
                    <option value="">Priority</option>
                    {[...new Set(data.map((data) => data.priority))].map((priority, index) => (
                        <option key={index} value={priority}>{priority}</option>
                    ))}
                </select>}

                <div className='relative lg:w-32 w-full'>

                    <Flatpickr
                        className="bg-white border border-bordergray text-black mt-2 text-sm h-9 ps-2 rounded-md lg:w-32 w-full "
                        value={dateRange}
                        onChange={(selectedDates) => setdateRange(selectedDates)}
                        options={{
                            mode: 'range',
                            dateFormat: "d-m-Y",
                            allowInput: true,
                        }}
                        placeholder="Date Range"
                    />
                    {dateRange[0] === null &&
                        <svg className='absolute top-4 right-2 bg-white h-5 w-5' viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M13.875 13.4046C13.875 14.495 12.995 15.375 11.9046 15.375H2.09538C1.005 15.375 0.125 14.495 0.125 13.4046V3.59538C0.125 2.505 1.005 1.625 2.09538 1.625H4.25V0.944375C4.25111 0.782604 4.30812 0.626192 4.41136 0.501646C4.51461 0.3771 4.65774 0.292082 4.8165 0.261L4.9375 0.25C5.317 0.25 5.625 0.54425 5.625 0.944375V1.625H8.375V0.944375C8.37611 0.782604 8.43312 0.626192 8.53636 0.501646C8.63961 0.3771 8.78274 0.292082 8.9415 0.261L9.0625 0.25C9.442 0.25 9.75 0.54425 9.75 0.944375V1.625H11.9046C12.995 1.625 13.875 2.505 13.875 3.59538V13.4046ZM1.5 5.75V13.0787C1.5 13.5875 1.9125 14 2.42125 14H11.5787C12.0875 14 12.5 13.5875 12.5 13.0787V5.75H1.5ZM3.5625 11.25C3.89937 11.25 4.18125 11.5016 4.239 11.8165L4.25 11.9375C4.25 12.2744 3.99837 12.5562 3.6835 12.614L3.5625 12.625C3.38072 12.6232 3.20689 12.5502 3.07834 12.4217C2.9498 12.2931 2.87679 12.1193 2.875 11.9375C2.875 11.6006 3.12663 11.3188 3.4415 11.261L3.5625 11.25ZM7 11.25C7.33687 11.25 7.61875 11.5016 7.6765 11.8165L7.6875 11.9375C7.6875 12.2744 7.43588 12.5562 7.121 12.614L7 12.625C6.81822 12.6232 6.64439 12.5502 6.51584 12.4217C6.3873 12.2931 6.31429 12.1193 6.3125 11.9375C6.3125 11.6006 6.56413 11.3188 6.879 11.261L7 11.25ZM10.4375 11.25C10.7744 11.25 11.0562 11.5016 11.114 11.8165L11.125 11.9375C11.125 12.2744 10.8734 12.5562 10.5585 12.614L10.4375 12.625C10.2557 12.6232 10.0819 12.5502 9.95334 12.4217C9.8248 12.2931 9.75179 12.1193 9.75 11.9375C9.75 11.6006 10.0016 11.3188 10.3165 11.261L10.4375 11.25ZM3.5625 9.1875C3.89937 9.1875 4.18125 9.43913 4.239 9.754L4.25 9.875C4.25 10.2119 3.99837 10.4937 3.6835 10.5515L3.5625 10.5625C3.38072 10.5607 3.20689 10.4877 3.07834 10.3592C2.9498 10.2306 2.87679 10.0568 2.875 9.875C2.875 9.53813 3.12663 9.25625 3.4415 9.1985L3.5625 9.1875ZM7 9.1875C7.33687 9.1875 7.61875 9.43913 7.6765 9.754L7.6875 9.875C7.6875 10.2119 7.43588 10.4937 7.121 10.5515L7 10.5625C6.81822 10.5607 6.64439 10.4877 6.51584 10.3592C6.3873 10.2306 6.31429 10.0568 6.3125 9.875C6.3125 9.53813 6.56413 9.25625 6.879 9.1985L7 9.1875ZM10.4375 9.1875C10.7744 9.1875 11.0562 9.43913 11.114 9.754L11.125 9.875C11.125 10.2119 10.8734 10.4937 10.5585 10.5515L10.4375 10.5625C10.2557 10.5607 10.0819 10.4877 9.95334 10.3592C9.8248 10.2306 9.75179 10.0568 9.75 9.875C9.75 9.53813 10.0016 9.25625 10.3165 9.1985L10.4375 9.1875ZM3.5625 7.125C3.89937 7.125 4.18125 7.37663 4.239 7.6915L4.25 7.8125C4.25 8.14937 3.99837 8.43125 3.6835 8.489L3.5625 8.5C3.38072 8.49821 3.20689 8.4252 3.07834 8.29666C2.9498 8.16811 2.87679 7.99428 2.875 7.8125C2.875 7.47563 3.12663 7.19375 3.4415 7.136L3.5625 7.125ZM7 7.125C7.33687 7.125 7.61875 7.37663 7.6765 7.6915L7.6875 7.8125C7.6875 8.14937 7.43588 8.43125 7.121 8.489L7 8.5C6.81822 8.49821 6.64439 8.4252 6.51584 8.29666C6.3873 8.16811 6.31429 7.99428 6.3125 7.8125C6.3125 7.47563 6.56413 7.19375 6.879 7.136L7 7.125ZM10.4375 7.125C10.7744 7.125 11.0562 7.37663 11.114 7.6915L11.125 7.8125C11.125 8.14937 10.8734 8.43125 10.5585 8.489L10.4375 8.5C10.2557 8.49821 10.0819 8.4252 9.95334 8.29666C9.8248 8.16811 9.75179 7.99428 9.75 7.8125C9.75 7.47563 10.0016 7.19375 10.3165 7.136L10.4375 7.125ZM1.5 4.375H12.5V3.92125C12.5 3.4125 12.0875 3 11.5787 3H2.42125C1.9125 3 1.5 3.4125 1.5 3.92125V4.375Z" fill="black" />
                        </svg>
                    }
                    {dateRange[0] && <button onClick={() => setdateRange([null, null])} className='absolute top-4 right-2 cursor-pointer bg-white'> ✖</button>}
                </div>
                {/* <DatePicker className=' mt-2  text-sm rounded-md bg- w-full lg:w-32'
                    placeholder="Date Range"
                    block /> */}
                {/* <div className='relative bg-white border border-bordergray mt-2  text-sm h-9 px-4 rounded-md w-full'> */}
                {/* <div className='relative z-20 lg:w-36 w-96'> */}
                {/* <DatePicker className='bg-white border border  text-sm h-9 w-full'selected={startDate} onChange={(date) => { setStartDate(date); setSelectValue({ ...selectValue, Filed_Date: date});}}
                        placeholderText="Select Date"
                        dateFormat="dd-MM-yyyy"
                        />
                        <span className='absolute top-3.5 right-2'><MdOutlineCalendarMonth size={20}/></span>
                    </div> */}



                <div className=' relative '>
                    <input type='text' className=' bg-white lg:w-32 w-full   text-md text-black border border-bordergray mt-2 pl-8 py-1.5  rounded-md ' placeholder='Search' onChange={(e) => setSearch(e.target.value)} ></input>
                    <div className='absolute inset-y-0 top-3.5 text-input left-1.5' >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>

                    </div>
                </div>
                <div className='relative'>
                    <button className=' bg-white shadow-sm  p-1 w-9 h-9 mt-2  border border-bordergray text-md rounded-lg' onClick={() => setSlide(!slide)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                        </svg>

                    </button>
                    {slide && (
                        <div className='absolute bg-white shadow-lg border border-bordergray z-20 top-15 py-2 px-3 w-48 rounded'>
                            <input className='me-2 accent-black' type='checkbox' checked={checkFilter.company} onChange={() => handleCheckBox('company')} id='company' />
                            <label htmlFor="company">Company</label><br />
                            <input className='me-2 accent-black' type='checkbox' checked={checkFilter.state} onChange={() => handleCheckBox('state')} id='state' />
                            <label htmlFor="state">State</label><br />
                            <input className='me-2 accent-black' type='checkbox' checked={checkFilter.branch} onChange={() => handleCheckBox('branch')} id='branch' />
                            <label htmlFor="branch">Branch</label><br />
                            <input className='me-2 accent-black' type='checkbox' checked={checkFilter.compliance} onChange={() => handleCheckBox('compliance')} id='compliance' />
                            <label htmlFor="compliance">Compliance</label><br />
                            <input className='me-2 accent-black' type='checkbox' checked={checkFilter.staff} onChange={() => handleCheckBox('staff')} id='staff' />
                            <label htmlFor="staff">Staff</label><br />
                            <input className='me-2 accent-black' type='checkbox' checked={checkFilter.priority} onChange={() => handleCheckBox('priority')} id='priority' />
                            <label htmlFor="priority">Priority</label>
                        </div>
                    )}
                </div>
            </div>
            <DataTable className='p-5'
                columns={
                    [
                        {
                            name: 'S NO',
                            selector: row => row.sno,
                            sortable: true,
                            width: '80px'
                        },
                        {
                            name: 'Company',
                            cell: (row) => <span className="flex justify-center items-center gap-3"> <img src={img} alt="Picture" className="w-9 h-9  rounded-full" /> {row.company}</span>,
                            sortable: true,
                            width: '220px',
                            center: 1
                        },
                        {
                            name: <p className='text-center ms-10'>State</p>,
                            cell: (row) => <span className="flex justify-center items-center gap-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>

                                {row.state}</span>,
                            sortable: true,
                            // center: 1,
                            width: '160px'
                        },
                        {
                            name: 'Branch',
                            cell: (row) => <span className="flex justify-center items-center gap-0.5"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                                {row.branch}</span>,
                            sortable: true,
                            width: '130px',
                            center: 1
                        },
                        {
                            name: 'Compliance',
                            selector: row => row.compliance,
                            sortable: true,
                            width: '140px',
                            center: 1
                        },
                        {
                            name: 'Assign staff',
                            selector: row => row.assignstaff,
                            sortable: true,
                            width: '130px',
                        },
                        {
                            name: 'Priority',
                            selector: row => row.priority,
                            sortable: true,
                            width: '100px',
                        },
                        {
                            name: 'Score',
                            cell: (row) => (<Dummy2 percent={row.score} />),
                            selector: row => row.score,
                            width: '90px',
                            center: 1
                        },
                        {
                            name: 'Status',
                            cell: (row) => <span className={`${row.status === 'Complied' ? 'bg-green-400'
                                : `${row.status === 'Not Complied' ? 'bg-red-400'
                                    : `${row.status === 'Partially Complied' ? 'bg-yellow-400'
                                        : `${row.status === 'Over Due' ? 'bg-orange-400' : ''}`}`}`
                                } rounded-full  items-center w-44 text-center py-1 px-2 text-sm text-nowrap`}>{row.status}</span>,
                            sortable: true,
                            width: '160px',
                            center: 1
                        },
                        {
                            name: 'Action',
                            selector: row => row.action,
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
                            right: 1,
                            width: '100px',
                            center: 1
                        },
                    ]
                } selectableRows customStyles={customStyles}
                data={filterdata} >
            </DataTable>
            <div className='flex flex-col lg:flex-row lg:justify-between justify-start p-5'>
                <select className='  border border-gray-200 mt-2  text-sm h-9 px-4 shadow-md rounded-md w-32 justify-end' value={Itemsperpage} onChange={(e) => setItemsperpage(e.target.value)}>
                    <option value="5">Show Option</option>
                    <option value="5">Page 5</option>
                    <option value="10">Page 10</option>
                    <option value="15">page 15</option>

                </select>
                <CustomPagination page={Page} totalPages={totalPages} onPageChange={(page) => setPage(page)} />
            </div>
            <div className='flex justify-center'>
                {/* <button className='h-10 w-36 text-center bg-primary' onClick={toggleModal}>edit</button> */}
                {modelopen &&
                    <div className='absolute w-full top-0 left-0 h-full py-52 bg-black bg-opacity-50 z-50'>
                        <div className="bg-white mx-auto rounded-lg shadow-lg w-4/5">
                            <EditCompliances onClose={toggleModal} />
                        </div>
                    </div>
                }
            </div>

        </>
    )
}

export default Consolidate
