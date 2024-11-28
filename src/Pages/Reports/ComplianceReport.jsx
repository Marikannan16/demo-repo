import React, { useEffect, useState } from 'react'

import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import CustomPagination from '../../Components/CustomPagination';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import CompanyData from '../../Components/reports/CompanyDatas';
import ActionMenu from '../../Components/ActionMenu';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

const ComplianceReport = () => {
  const [data] = useState(CompanyData);
  const [startDate, setStartDate] = useState(null);
  const [EndDate, setEndDate] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDatePickerActive, setIsDatePickerActive] = useState(false);
  const [search, setSearch] = useState('');
  const [count, setCount] = useState(0);
  const [DownMenu, setDownMenu] = useState(false)
  const [showMenu, setShowMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectValue, setSelectValue] = useState({
    Company_Name: "",
    Branch: "",
    Activity: "",
    Form_name: "",
    Acts: "",
    ActType: "",
    state: "",
    Filed_Date: "",
    Period: "",
    Document: "",
    priority: "",
    Status: ""
  });

  const [filters, setFilters] = useState({
    sno: true,
    companyname: true,
    state: true,
    branch: true,
    activity: true,
    formname: true,
    act: true,
    acttype: true,
    state: true,
    period: true,
    document: true,
    priority: true,
    status: true,
    natureact: false,
    actions: true,
    filtedate: true
  });

  const handleCheckboxChange = (filterName) => {
    setFilters({
      ...filters,
      [filterName]: !filters[filterName],
    });
  };
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

  var filter = CompanyData.filter((item) => {
    const formattedFiledDate = moment(item.Filed_Date, 'DD-MM-YYYY');
    const dateRangeValid =
      startDate &&
      moment(startDate[0]).isSameOrBefore(formattedFiledDate) &&
      moment(startDate[1]).isSameOrAfter(formattedFiledDate);
    return (

      (selectValue.Company_Name ? item.Company_Name === selectValue.Company_Name : true) &&
      (selectValue.Branch ? item.Branch === selectValue.Branch : true) &&
      (selectValue.Activity ? item.Activity === selectValue.Activity : true) &&
      (selectValue.Status ? item.Status === selectValue.Status : true) &&
      (startDate ? dateRangeValid : true) &&
      (item.Company_Name.toLowerCase().includes(search.toLowerCase()) ||
        item.Branch.toLowerCase().includes(search.toLowerCase()) ||
        item.Activity.toLowerCase().includes(search.toLowerCase()) ||
        item.Form_name.toLowerCase().includes(search.toLowerCase()) ||
        item.Acts.toLowerCase().includes(search.toLowerCase()) ||
        item.ActType.toLowerCase().includes(search.toLowerCase()) ||
        item.state.toLowerCase().includes(search.toLowerCase()) ||
        item.Filed_Date.toLowerCase().includes(search.toLowerCase()) ||
        item.Period.toLowerCase().includes(search.toLowerCase()) ||
        item.Document.toLowerCase().includes(search.toLowerCase()) ||
        item.Priority.toLowerCase().includes(search.toLowerCase()) ||
        item.Status.toLowerCase().includes(search.toLowerCase()))
    );
  });

  // const filter = CompanyData.filter((item) => {
  //   const formattedFiledDate = startDate && EndDate ? moment(startDate,EndDate).format('DD-MM-YYYY') : '';

  //   return (
  //     (selectValue.Company_Name ? item.Company_Name === selectValue.Company_Name : true) &&
  //     (selectValue.Branch ? item.Branch === selectValue.Branch : true) &&
  //     (selectValue.Activity ? item.Activity === selectValue.Activity : true) &&
  //     (selectValue.Status ? item.Status === selectValue.Status : true) &&
  //     (formattedFiledDate ? item.Filed_Date === formattedFiledDate : true) &&
  //     (item.Company_Name.toLowerCase().includes(search.toLowerCase()) ||
  //       item.Branch.toLowerCase().includes(search.toLowerCase()) ||
  //       item.Activity.toLowerCase().includes(search.toLowerCase()) ||
  //       item.Form_name.toLowerCase().includes(search.toLowerCase()) ||
  //       item.Acts.toLowerCase().includes(search.toLowerCase()) ||
  //       item.ActType.toLowerCase().includes(search.toLowerCase()) ||
  //       item.state.toLowerCase().includes(search.toLowerCase()) ||
  //       item.Filed_Date.toLowerCase().includes(search.toLowerCase()) ||
  //       item.Period.toLowerCase().includes(search.toLowerCase()) ||
  //       item.Document.toLowerCase().includes(search.toLowerCase()) ||
  //       item.Priority.toLowerCase().includes(search.toLowerCase()) ||
  //       item.Status.toLowerCase().includes(search.toLowerCase()))
  //   );
  // });

  const totalPages = Math.ceil(filter.length / itemsPerPage);
  var filter = filter.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    setCount(selectValue.length);
  }, [selectValue]);

  const customStyles = {
    rows: {
      style: {
        minHeight: '55px',
      },
    },
    headCells: {
      style: {
        backgroundColor: '#000',
        color: '#fff',
      }
    },
    cells: {
      style: {
        overflowWrap: 'break-word',
      }
    },
  };

  const downloadCSV = () => {
    const csv = data.map(row => Object.values(row).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'ComplianceReport.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [filter, currentPage, totalPages])
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  return (
    <div className='p-2 -z-50'>
      <div className='flex flex-col justify-center gap-2 items-start lg:flex-row lg:items-center lg:justify-between'>
        <h2 className='font-semibold text-lg'>Compliance Report</h2>
        <div className='flex gap-3'>
          <button onClick={() => window.print()} className='w-9 h-9 p-2 rounded-full mt-1 bg-primary text-white'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
            </svg>
          </button>
          <button className='w-9 h-9 p-2 rounded-full mt-1 bg-primary text-white'>
            <svg viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 2.55512C1 2.08363 1.1873 1.63144 1.5207 1.29804C1.8541 0.964645 2.30628 0.777344 2.77778 0.777344H15.2222C15.6937 0.777344 16.1459 0.964645 16.4793 1.29804C16.8127 1.63144 17 2.08363 17 2.55512M1 2.55512V11.444C1 11.9155 1.1873 12.3677 1.5207 12.7011C1.8541 13.0345 2.30628 13.2218 2.77778 13.2218H15.2222C15.6937 13.2218 16.1459 13.0345 16.4793 12.7011C16.8127 12.3677 17 11.9155 17 11.444V2.55512M1 2.55512L9 7.88845L17 2.55512" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className='relative'><button className="w-9 h-9 bg-primary text-white rounded-full mt-1 p-2 cursor-pointer" onClick={() => setDownMenu(!DownMenu)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>

          </button>
            {DownMenu && <div className='absolute mt-5 lg:right-0 w-44 h-[80px] rounded-md bg-selectbg  z-30 border border-bordergray'>
              <span className='flex justify-center gap-5 items-center hover:bg-slate-200  hover:rounded py-2.5 px-2 cursor-pointer' onClick={() => window.print()} >Download PDF</span>
              <span className='flex justify-center gap-5 items-center hover:bg-slate-200  hover:rounded py-2.5 px-2 cursor-pointer' onClick={downloadCSV} >Download CSV</span>
            </div>}
          </div>
        </div>
      </div>

      <div className='relative py-6 flex justify-start items-center flex-wrap gap-3 mb-4'>
        {filters.companyname && (
          <select className='w-full lg:w-36 bg-white py-2 px-4 rounded-md border border-bordergray' value={selectValue.Company_Name} onChange={(e) => setSelectValue({ ...selectValue, Company_Name: e.target.value })}>
            <option value="">Company</option>
            {/* {CompanyData.map((item) => <option key={item.Company_Name} value={item.Company_Name}>{item.Company_Name}</option>)} */}
            {[...new Set(CompanyData.map((data) => data.Company_Name))].map((company, index) => (
              <option key={index} value={company}>{company}</option>
            ))}
          </select>

        )}

        {filters.branch && (
          <select className='w-full lg:w-36 bg-white py-2 px-4 rounded-md border border-bordergray' value={selectValue.Branch} onChange={(e) => setSelectValue({ ...selectValue, Branch: e.target.value })}>
            <option value="">Branch</option>
            {[...new Set(CompanyData.map((data) => data.Branch))].map((branch, index) => (
              <option key={index} value={branch}>{branch}</option>
            ))}
          </select>
        )}
        {filters.activity && (
          <select className='w-full lg:w-36 bg-white py-2 px-4 rounded-md border border-bordergray' value={selectValue.Activity} onChange={(e) => setSelectValue({ ...selectValue, Activity: e.target.value })}>
            <option value="">Activity</option>
            {[...new Set(CompanyData.map((data) => data.Activity))].map((activity, index) => (
              <option key={index} value={activity}>{activity}</option>
            ))}
          </select>
        )}
        {filters.status && (
          <select className='w-full lg:w-36 bg-white py-2 px-4 rounded-md border border-bordergray' value={selectValue.Status} onChange={(e) => setSelectValue({ ...selectValue, Status: e.target.value })}>
            <option value="">Status</option>
            {[...new Set(CompanyData.map((data) => data.Status))].map((status, index) => (
              <option key={index} value={status}>{status}</option>
            ))}
          </select>
        )}
        {filters.filtedate && (
          <div className='relative z-20 lg:w-32 w-full bg-white'>
            <Flatpickr
              className='focus-visible focus-visible:outline-none lg:w-32 w-full py-1.5 ps-1 text-sm border border-bordergray rounded-md'
              value={startDate}
              onChange={(selectedDates) => {
                if (selectedDates.length === 2) {
                  setStartDate(selectedDates);
                  setSelectValue({
                    ...selectValue,
                    Filed_Date: {
                      start: moment(selectedDates[0]).format('DD-MM-YYYY'),
                      end: moment(selectedDates[1]).format('DD-MM-YYYY'),
                    },
                  });
                } else {
                  setStartDate(null);
                  setSelectValue({
                    ...selectValue,
                    Filed_Date: "",
                  });
                }
              }}
              options={{
                mode: "range",
                dateFormat: "d-m-Y",
                maxDate: "today",
              }}
              placeholder="Date Range"
            />
            {startDate && (
              <button
                className="absolute top-1 right-0.5 bg-white px-2 py-1 rounded text-gray-600 hover:text-red-600"
                onClick={() => {
                  setStartDate(null);
                  handleFilterReset();
                  setSelectValue({
                    ...selectValue,
                    Filed_Date: "",
                  });
                }}
              >
                ✖
              </button>
            )}
            {!startDate && (

              <span className='absolute top-2 right-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                </svg>
              </span>
            )}
          </div>
        )}
        <span className='w-full lg:w-36 relative'>
          <input type='text' className=' focus-visible focus-visible:outline-none w-full py-1.5 ps-8 border border-bordergray rounded-md placeholder:text-black' placeholder='Search' onChange={(e) => setSearch(e.target.value)} />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='absolute top-1.5 left-2 h-7 w-6  text-input'>
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </span>
        <span className='relative'>
          {/* <FaSliders size={35} className="p-1.5 bg-white border border-bordergray rounded-md cursor-pointer" onClick={() => setShowMenu(!showMenu)} /> */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="p-1.5 h-10 w-10 bg-white border border-bordergray rounded-md cursor-pointer" onClick={() => setShowMenu(!showMenu)}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
          </svg>
          <div className='absolute z-30 top-10 lg:-left-44 lg:top-10'>
            {showMenu && (
              <div className='border border-bordergray rounded-md p-4 w-64 bg-white shadow-md'>
                <label>
                  <input type='checkbox' checked={filters.sno} onChange={() => handleCheckboxChange('sno')} className='me-3 accent-black' />
                  S No
                </label><br />
                <label>
                  <input type='checkbox' checked={filters.companyname} onChange={() => handleCheckboxChange('companyname')} className='me-3 accent-black' />
                  Company Name
                </label><br />
                <label>
                  <input type='checkbox' checked={filters.branch} onChange={() => handleCheckboxChange('branch')} className='me-3 accent-black' />
                  Branch
                </label><br />
                <label>
                  <input type='checkbox' checked={filters.activity} onChange={() => handleCheckboxChange('activity')} className='me-3 accent-black' />
                  Activity
                </label><br />
                <label>
                  <input type='checkbox' checked={filters.natureact} onChange={() => handleCheckboxChange('natureact')} className='me-3 accent-black' />
                  Nature of Activity
                </label><br />
                <label>
                  <input type='checkbox' checked={filters.formname} onChange={() => handleCheckboxChange('formname')} className='me-3 accent-black' />
                  Name of the Form
                </label><br />
                <label>
                  <input type='checkbox' checked={filters.act} onChange={() => handleCheckboxChange('act')} className='me-3 accent-black' />
                  Applicable Labour Act
                </label><br />
                <label>
                  <input type='checkbox' checked={filters.acttype} onChange={() => handleCheckboxChange('acttype')} className='me-3 accent-black' />
                  Type of Act
                </label><br />
                <label>
                  <input type='checkbox' checked={filters.filtedate} onChange={() => handleCheckboxChange('filtedate')} className='me-3 accent-black' />
                  Filed Date
                </label><br />
                <label>
                  <input type='checkbox' checked={filters.period} onChange={() => handleCheckboxChange('period')} className='me-3 accent-black' />
                  Period
                </label><br />
                <label>
                  <input type='checkbox' checked={filters.document} onChange={() => handleCheckboxChange('document')} className='me-3 accent-black' />
                  Document
                </label><br />
                <label>
                  <input type='checkbox' checked={filters.state} onChange={() => handleCheckboxChange('state')} className='me-3 accent-black' />
                  State
                </label><br />
                <label>
                  <input type='checkbox' checked={filters.priority} onChange={() => handleCheckboxChange('priority')} className='me-3 accent-black' />
                  priority
                </label><br />
                <label>
                  <input type='checkbox' checked={filters.status} onChange={() => handleCheckboxChange('status')} className='me-3 accent-black' />
                  Status
                </label><br />
                <label>
                  <input type='checkbox' checked={filters.actions} onChange={() => handleCheckboxChange('actions')} className='me-3 accent-black' />
                  Actions
                </label><br />
              </div>
            )}
          </div>
        </span>
      </div>
      <div className='-z-50 w-auto'>
        <DataTable className='z-0'
          columns={
            [
              {
                name: "Sno",
                selector: row => row.Sno,
                sortable: true,
                width: '80px',
                omit: filters.sno == false
              },
              {
                name: "Company Name",
                selector: row => row.Company_Name,
                sortable: true,
                width: '170px',
                omit: filters.companyname == false
              },
              {
                name: "Branch",
                selector: row => row.Branch,
                sortable: true,
                width: '100px',
                omit: filters.branch == false
              },
              {
                name: "Activity",
                selector: row => row.Activity,
                sortable: true,
                width: '150px',
                omit: filters.activity == false
              },
              {
                name: " Nature of Activity",
                selector: row => row.NatureofActivity,
                sortable: true,
                width: '150px',
                omit: filters.natureact == false
              },
              {
                name: "Name of the Form",
                selector: row => row.Form_name,
                sortable: true,
                omit: filters.formname == false
              },
              {
                name: "Applicable Labour Act",
                cell: (row) => row.Acts,
                sortable: true,
                omit: filters.act == false
              },
              {
                name: "Type of  Act",
                selector: row => row.ActType,
                sortable: true,
                width: '140px',
                omit: filters.acttype == false
              },
              {
                name: "state",
                selector: row => row.state,
                sortable: true,
                width: '120px',
                omit: filters.state == false
              },
              {
                name: "Fild Date",
                selector: row => row.Filed_Date,
                sortable: true,
                width: '130px',
                omit: filters.filtedate == false
              },
              {
                name: "Period",
                selector: row => row.Period,
                sortable: true,
                width: '100px',
                omit: filters.period == false
              },
              {
                name: "Document",
                selector: row => row.Document,
                sortable: true,
                omit: filters.document == false
              },
              {
                name: "Priority",
                selector: row => row.Priority,
                sortable: true,
                width: '100px',
                omit: filters.priority == false
              },
              {
                name: "Status",
                cell: (row) => <p className={`${row.Status === 'Complied' ? 'text-green-600' : row.Status === 'Not Complied' ? 'text-red-600' : 'text-yellow-500'}`}>{row.Status}</p>,
                sortable: true,
                width: '130px',
                omit: filters.status == false
              },
              {
                // name:"Action",
                // selector:row=>row.Action,
                // cell:(row)=><button><SlOptionsVertical/></button>,
                name: 'Actions',
                cell: (row) => (
                  <div className='h-5 w-5 relative' onClick={() => toggleAction(row.Sno)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    </svg>
                    {selectedRow === row.Sno && (
                      <ActionMenu
                        onView={() => handleView(row.Sno)}
                        onEdit={() => handleEdit(row.Sno)}
                        onDelete={() => handleDelete(row.Sno)}
                      />
                    )
                    }

                  </div>),
                ignoreRowClick: true,
                width: '89px',
                center: 1,
                omit: filters.actions == false

              }


            ]
          }
          data={filter}
          responsive
          selectableRows
          fixedHeader
          highlightOnHover
          customStyles={customStyles} >
        </DataTable>
      </div>
      <div className="py-2 lg:flex lg:justify-between items-center w-auto flex-row justify-center">
        <select value={itemsPerPage} onChange={(e) => setItemsPerPage(e.target.value)}
          className="p-2 rounded w-24 items-center justify-center"
        >
          <option value="10">Show 10</option>
          <option value="20">Show 20</option>
          <option value="30">Show 30</option>
        </select>
        <CustomPagination page={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default ComplianceReport;
