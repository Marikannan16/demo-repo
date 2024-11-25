import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Columns } from '../../Components/company/compliance/Columns'
import { Data } from '../../Components/company/compliance/Data'
import { IoIosSearch } from 'react-icons/io'
import { BsSliders } from "react-icons/bs";
import EditCompliances from '../../Components/company/EditCompliances'
import CustomPagination from '../user/CustomPagination'

const CompanyComplianceList = () => {
    const [modal, setModal] = useState(false)
    const toggleModal = () => {
        setModal(!modal)
    }
    const [search, setSearch] = useState("")
    const [showMenu, setShowMenu] = useState(false)
    const [tableData] = useState(Data)
    const [filter, setFilter] = useState({
        natureOfActivity: '', nameOfForm: '', typeOfAct: '', activity: '', actualFillingFrequency: '',
    })
    const [checkedFilter, setCheckedFilter] = useState({
        compliance: 'true',
        formName: 'true',
        actType: '',
        activities: '',
        actualFilling: '',
    })
    const handleCheckedBox = (filterName) => {
        setCheckedFilter({
            ...checkedFilter,
            [filterName]: !checkedFilter[filterName]
        })
    }
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const filterData = tableData.filter((item) => {
        return (
            (filter.natureOfActivity ? item.natureOfActivity === filter.natureOfActivity : true) &&
            (filter.nameOfForm ? item.nameOfForm === filter.nameOfForm : true) &&
            (filter.typeOfAct ? item.typeOfAct === filter.typeOfAct : true) &&
            (filter.activity ? item.activity === filter.activity : true) &&
            (filter.actualFillingFrequency ? item.actualFillingFrequency === filter.actualFillingFrequency : true) && (
                item.natureOfActivity.toLowerCase().includes(search.toLowerCase()) ||
                item.activity.toLowerCase().includes(search.toLowerCase()) ||
                item.nameOfForm.toLowerCase().includes(search.toLowerCase()) ||
                item.applicationLaw.toLowerCase().includes(search.toLowerCase()) ||
                item.typeOfAct.toLowerCase().includes(search.toLowerCase()) ||
                item.actualFillingFrequency.toLowerCase().includes(search.toLowerCase()) ||
                item.lastFilledDate.toLowerCase().includes(search.toLowerCase()) ||
                item.fillingFrequency.toLowerCase().includes(search.toLowerCase()))
        );
    });
    const totalPages = Math.ceil(filterData.length / itemsPerPage)
    const pagination = filterData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
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
            },
        },
        cells: {
            style: {
                borderBottom: '1px solid rgba(0,0,0,0.15)',
                padding: '15px 20px',
                fontSize: '14px',
            },
        },
    };
    return (
        <div className='h-full w-full p-5 shadow-lg'>
            <div className="flex items-center justify-between mb-8">
                <h2 className='text-xl font-bold'>Compliance List ({filterData.length})</h2>
            </div>
            <div className="flex justify-between items-center flex-wrap gap-2 lg:gap:4">
                <div className="flex items-center gap-4 flex-wrap">
                    {checkedFilter.compliance && <select onChange={(e) => setFilter({ ...filter, natureOfActivity: e.target.value })} value={filter.natureOfActivity} className='w-full lg:w-40 py-2 px-4 rounded '>
                        <option value="">Compliance</option>
                        {Data.map((data) => <option value={data.natureOfActivity}>{data.natureOfActivity}</option>)}
                    </select>}
                    {checkedFilter.formName && <select onChange={(e) => setFilter({ ...filter, nameOfForm: e.target.value })} value={filter.nameOfForm} className='w-full lg:w-40 py-2 px-4 rounded '>
                        <option value="">Name of Form</option>
                        {Data.map((data) => <option value={data.nameOfForm}>{data.nameOfForm}</option>)}
                    </select>}
                    {checkedFilter.actType && <select onChange={(e) => setFilter({ ...filter, typeOfAct: e.target.value })} value={filter.typeOfAct} className='w-full lg:w-40 py-2 px-4 rounded '>
                        <option value="">Type of Act</option>
                        {Data.map((data) => <option value={data.typeOfAct}>{data.typeOfAct}</option>)}
                    </select>}
                    {checkedFilter.activities && <select onChange={(e) => setFilter({ ...filter, activity: e.target.value })} value={filter.activity} className='w-full lg:w-40 py-2 px-4 rounded '>
                        <option value="">Activity</option>
                        {Data.map((data) => <option value={data.activity}>{data.activity}</option>)}
                    </select>}
                    {checkedFilter.actualFilling && <select onChange={(e) => setFilter({ ...filter, actualFillingFrequency: e.target.value })} value={filter.actualFillingFrequency} className='w-full lg:w-40 py-2 px-4 rounded '>
                        <option value="">Actual Filling Frequency</option>
                        {Data.map((data) => <option value={data.actualFillingFrequency}>{data.actualFillingFrequency}</option>)}
                    </select>}
                    <span className='w-full lg:w-40 relative'>
                        <input type='text' className='w-full focus-visible focus-visible:outline-none py-1.5 ps-8 border border-gray-300 rounded' placeholder='Search' onChange={(e) => setSearch(e.target.value)} value={search} />
                        <IoIosSearch className='absolute top-2 left-2' size={20} />
                    </span>
                    <div className='border border-gray-300 p-2 rounded cursor-pointer relative'>
                        <BsSliders size={20} onClick={() => setShowMenu(!showMenu)} />
                        {showMenu && (
                            <div className='absolute w-40 z-20 top-10 px-4 py-2 rounded bg-white shadow-md border'>
                                <input className='me-2' type="checkbox" checked={checkedFilter.compliance} onChange={() => handleCheckedBox('compliance')} id='compliance' />
                                <label className='cursor-pointer' htmlFor="compliance">Compliance</label><br />
                                <input className='me-2' type="checkbox" checked={checkedFilter.formName} onChange={() => handleCheckedBox('formName')} id='formName' />
                                <label className='cursor-pointer' htmlFor="formName">Name of form</label><br />
                                <input className='me-2' type="checkbox" checked={checkedFilter.actType} onChange={() => handleCheckedBox('actType')} id='actType' />
                                <label className='cursor-pointer' htmlFor="actType">Type of act</label><br />
                                <input className='me-2' type="checkbox" checked={checkedFilter.activities} onChange={() => handleCheckedBox('activities')} id='activities' />
                                <label className='cursor-pointer' htmlFor="activities">Activity</label><br />
                                <input className='me-2' type="checkbox" checked={checkedFilter.actualFilling} onChange={() => handleCheckedBox('actualFilling')} id='actualFilling' />
                                <label className='cursor-pointer' htmlFor="actualFilling">Actual Filling</label>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='mt-6'>
                <DataTable columns={Columns} data={filterData} customStyles={customStyles} />
            </div>
            {/* <div className="py-2 px-4 flex justify-between items-center mt-2 w-full">
                <select value={itemsPerPage} onChange={(e) => setItemsPerPage(e.target.value)}
                    className="p-2 rounded w-24"
                >
                    <option value="10">Show 10</option>
                    <option value="20">Show 20</option>
                    <option value="30">Show 30</option>
                </select>
                {totalPages > 1 && (
                    <CustomPagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
                )}
            </div> */}
            <button onClick={toggleModal} className="bg-blue-500 text-white mt-5 px-4 py-2 
            rounded hover:bg-blue-600">Open Modal</button>
            {modal &&
                <div className='absolute w-full top-0 left-0 h-full py-52 bg-black bg-opacity-50'>
                    <div className="bg-white mx-auto rounded-lg shadow-lg w-4/5">
                        <EditCompliances onClose={toggleModal} />
                    </div>
                </div>
            }
        </div>
    )
}

export default CompanyComplianceList