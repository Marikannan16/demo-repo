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
const Consolidate = () => {
    const [dateRange, setdateRange] = useState([null, null]);
    const [Page, setPage] = useState(1)
    const [Itemsperpage,setItemsperpage] = useState(5)
    const [modelopen, setmodelopen] = useState(false)
    const toggleModal = () => {
        setmodelopen(!modelopen)
    }

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

    console.log(Percent.overDue.label);

    const [slide, setSlide] = useState(false)
    const [Data] = useState(data)
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
    const downloadCSV = () => {
        const headers = Object.keys(data[0]);
        const csv = [
            headers.join(','),
            ...data.map(row => Object.values(row).join(','))
        ].join('\n');

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'Factory.csv');
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
                <div className='flex gap-3'>
                    <button onClick={handleMail} ><FiMail className='rounded-full w-9 h-9 p-2 mt-0.5 text-white' style={{ backgroundColor: '#D7B95F' }} /> </button>
                    <button><HiOutlineDownload onClick={downloadCSV} className='rounded-full w-9 h-9 p-2 mt-0.5 text-white' style={{ backgroundColor: '#D7B95F' }} /> </button>
                </div>
            </div>

            <div className=' flex flex-nowrap lg:justify-start items-center overflow-x-scroll mx-5 my-2 gap-2 '>

                <div onClick={(e) => setSelectValue({ ...selectValue, Status: '' })}
                    className='flex flex-col gap-6 p-4 relative overflow-hidden min-w-60 h-40  bg-fuchsia-100 rounded-lg border-l-8 border-fuchsia-600  hover:border-4 hover:pt-3 hover:pe-3 hover:ps-5  hover:border-fuchsia-500 '>
                    <span className='flex items-center font-semibold  text-wrap text-xl w-52'><TbReportAnalytics className=' text-white border bg-fuchsia-500 w-12 h-11 rounded-lg me-3 ' /> Total Compliance </span>
                    <div className='flex justify-between items-end ps-1'>
                        <h2 className='font-semibold text-3xl'>{Percent.totalCom.value}</h2>
                        <Dummy percent={(Percent.totalCom.value / Percent.totalCom.value * 100)} things={Percent.totalCom} />

                    </div>
                    <div className=' absolute -top-2 -left-14 bg-fuchsia-400 w-52 h-52 rounded-full bg-opacity-5 overflow-hidden'>
                        <div className='absolute left-24 bottom-20 bg-fuchsia-400 w-52 h-52 rounded-full bg-opacity-10'></div>
                    </div>
                </div>

                <div onClick={(e) => setSelectValue({ ...selectValue, Status: 'Complied' })} className='flex flex-col gap-8 p-4 relative overflow-hidden min-w-[240px] h-40  bg-green-100 rounded-lg border-l-8 border-green-600  hover:border-4 hover:pt-3 hover:pe-3 hover:ps-5  hover:border-green-500'>
                    <span className='flex items-center font-semibold  text-wrap text-xl w-52'><TbReportAnalytics className=' text-white border bg-green-500 w-10 h-11 rounded-lg me-5 ' /> Compiled</span>
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
                    <span className='flex items-center font-semibold mt-0.5 text-wrap text-xl w-52 '><TbReportAnalytics className=' text-white border bg-red-500 w-10 h-11 rounded-lg me-3 ' /> Not Complied</span>
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
                    <span className='flex items-center font-semibold mt-0.5 w-52 text-wrap text-xl '><TbReportAnalytics className=' text-white border bg-yellow-500 w-14 h-11 rounded-lg me-6 ' /> Partially Complied</span>
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
                    <span className='flex items-center font-semibold mt-0.5 text-wrap text-xl w-52'><TbReportAnalytics className=' text-white border bg-orange-500 w-10 h-11 rounded-lg me-5 ' /> Over Due</span>
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
                    className="bg-white border border-bordergray text-black mt-2 text-sm h-9 px-4 rounded-md lg:w-32 w-full "
                    value={dateRange}
                        onChange={(selectedDates) => setdateRange(selectedDates)}
                        options={{
                            mode: 'range',
                            dateFormat: "d-m-Y",
                            allowInput: true,
                        }}
                        placeholder="Date Range"
                    />
                    {dateRange[0]===null && <MdOutlineCalendarMonth size={20} className='absolute top-4 right-2 bg-white' />}
                    {dateRange[0] && <IoCloseSharp size={20} onClick={()=>setdateRange([null,null])} className='absolute top-4 right-2 cursor-pointer bg-white' />}
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
                    <div className='absolute inset-y-0 top-3.5 text-input left-2.5' >
                        <IoIosSearch size={23} />
                    </div>
                </div>
                <div className='relative'>
                    <button className=' bg-white shadow-sm  p-2 w-9 h-9 mt-2  border border-bordergray text-md rounded-lg'> <BsSliders size={20} className='p-0.5 ' onClick={() => setSlide(!slide)} /></button>
                    {slide && (
                        <div className='absolute bg-white shadow-lg border z-20 top-15 py-2 px-3 rounded'>
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
                columns={columns} selectableRows customStyles={customStyles} sortIcon={<PiCaretUpDownFill style={{ color: 'white' }} />}
                data={filterdata} >
            </DataTable>
            <div className='flex flex-col lg:flex-row lg:justify-between justify-start p-5'>
                <select className='  border border-gray-200 mt-2  text-sm h-9 px-4 shadow-md rounded-md w-32 justify-end' value={Itemsperpage} onChange={(e)=>setItemsperpage(e.target.value)}>
                    <option value="5">Show Option</option>
                    <option value="5">Page 5</option>
                    <option value="10">Page 10</option>
                    <option value="15">page 15</option>

                </select>
                <CustomPagination page={Page} totalPages={totalPages} onPageChange={(page) => setPage(page)} />
            </div>
            <div className='flex justify-center'>
                <button className='h-10 w-36 text-center bg-primary' onClick={toggleModal}>edit</button>
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
