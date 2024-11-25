import React, { useEffect, useRef, useState } from 'react'
import DataTable from 'react-data-table-component';
import { Data } from '../../Components/compliance list/data'
import { columns } from "../../Components/compliance list/Columns";
import { Link } from 'react-router-dom';
import CustomPagination from '../../Components/CustomPagination';
import ActionMenu from '../../Components/category/ActionMenu';
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const ComplianceList = () => {
  const [data] = useState(Data)
  const [downMenu, setDownMenu] = useState(false)
  const [search, setSearch] = useState('')
  const [showMenu, setShowMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectValue, setSelectValue] = useState({
    compliance: '',
    formname: '',
    acttype: '',
    frequency: ''
  });


  const [filters, setFilters] = useState({
    sno: true,
    natureofactivity: true,
    activity: true,
    formname: true,
    applicablelaw: true,
    acttype: true,
    actualfilling: true,
    lastfill: true,
    frequency: true,
    section: false,
    action: true,
  });
  const handleCheckboxChange = (filterName) => {
    setFilters({
      ...filters,
      [filterName]: !filters[filterName],
    });
  };


  // const [selectValue,setSelectValue]=useState({activity: "",
  //       formname: "",
  //       applicablelaw: "",
  //       acttype: "",
  //       priority: "",
  //       frequency: ""})



  const filter = Data.filter((row) => {
    return (
      (selectValue.compliance ? row.natureOfActivity === selectValue.compliance : true) &&
      (selectValue.formname ? row.nameOfForm === selectValue.formname : true) &&
      (selectValue.acttype ? row.typeOfAct === selectValue.acttype : true) &&
      // (selectValue.priority ? row.priority === selectValue.priority:true)&&
      (selectValue.frequency ? row.fillingFrequency === selectValue.frequency : true) &&
      (row.natureOfActivity.toLowerCase().includes(search.toLowerCase()) || row.activity.toLowerCase().includes(search.toLowerCase()) ||
        row.nameOfForm.toLowerCase().includes(search.toLowerCase()) || row.typeOfAct.toLowerCase().includes(search.toLowerCase()) ||
        row.applicationLaw.toLowerCase().includes(search.toLowerCase()) || row.section.toLowerCase().includes(search.toLowerCase()) ||
        row.actualFillingFrequency.toLowerCase().includes(search.toLowerCase()) || row.lastFilledDate.toLowerCase().includes(search.toLowerCase()) ||
        row.fillingFrequency.toLowerCase().includes(search.toLowerCase()))
    );
  })

  const totalPages = Math.ceil(filter.length / itemsPerPage)
  const pagination = filter.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  // useEffect(()=>{setCount(selectValue.length)},[selectValue])
  const customStyles = {
    rows: {
      style: {
        minHeight: '55px',
      },
    },
    headCells: {
      style: {
        overflowWrap:'break-word',
        backgroundColor:'#000',
        color:'white'
      }
    },
    cells: {
      style: {
        overflowWrap: 'break-word'
        //     paddingLeft: '30px',
        //     paddingRight: '80px',
        //     fontSize:'14px'
      }
    },
  }
  // const downloadPdf = () => {
  //   const input = pdfref.current;
  //   html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF('p', 'pt', 'a4');
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = pdf.internal.pageSize.getHeight();

  //     const imgWidth = canvas.width;
  //     const imgHeight = canvas.height;
  //     const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  //     const finalWidth = imgWidth * ratio;
  //     const finalHeight = imgHeight * ratio;

  //     pdf.addImage(imgData, 'PNG', 0, 0, finalWidth, finalHeight);
  //     pdf.save("compliance-list.pdf");
  //   });
  // };

  // const downloadCsv = () => {
  //   const csvData = [
  //     ["SNO", "Nature Of Activity", "Activity", "Name of the Form", "Section", "Applicable Law", "Type of Act", "Actual Filing Frequency", "Last Filed Date", "Filing Frequency"],
  //     ...data.map(row => [
  //       row.sno,
  //       row.natureOfActivity,
  //       row.activity,
  //       row.nameOfForm,
  //       row.section,
  //       row.applicationLaw,
  //       row.typeOfAct,
  //       row.actualFillingFrequency,
  //       row.lastFilledDate,
  //       row.fillingFrequency,
  //     ])
  //   ];

  //   const csvContent = "data:text/csv;charset=utf-8," + csvData.map(e => e.join(",")).join("\n");
  //   const encodedUri = encodeURI(csvContent);
  //   const link = document.createElement("a");
  //   link.setAttribute("href", encodedUri);
  //   link.setAttribute("download", "compliance-list.csv");
  //   document.body.appendChild(link); // Required for FF
  //   link.click();
  //   document.body.removeChild(link); // Clean up
  // };
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [filter, currentPage, totalPages,search])
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  return (
    <div className='p-2 -z-50' >
      <div className='flex flex-col justify-center gap/-2 items-start lg:flex-row lg:items-center lg:justify-between'>
        <h2 className='font-bold  text-lg'>Compliance List</h2>
        {/* <div className='flex gap-3 items-center'>
          <Link to="/compliance"><button className='py-2 w-44 lg:w-40 rounded-md text-white print:text-white bg-primary print:bg-primary'>Create Compliance</button> </Link>
        </div> */}
      </div>

      <div className='relative py-6 flex justify-start items-center flex-wrap gap-4 mb-4'>
        {filters.natureofactivity && (<select className='w-full lg:w-40 bg-selectbg py-2 px-4 rounded-md border border-bordergray' value={selectValue.compliance} onChange={(e) => setSelectValue({ ...selectValue, compliance: e.target.value })}>
          <option value="">Activity</option>
          {/* {Data.map((item)=><option value={item.natureOfActivity}>{item.natureOfActivity}</option>)} */}
          {[...new Set(Data.map((data) => data.natureOfActivity))].map((natureofactivity, index) => (
            <option key={index} value={natureofactivity}>{natureofactivity}</option>
          ))}
        </select>)}
        {filters.formname && (
          <select className='w-full lg:w-40 bg-selectbg py-2 px-4 rounded-md border border-bordergray print:border-bordergray' value={selectValue.formname} onChange={(e) => setSelectValue({ ...selectValue, formname: e.target.value })}>
            <option value="">Name of the form</option>
            {/* {Data.map((item)=><option value={item.nameOfForm}>{item.nameOfForm}</option>)} */}
            {[...new Set(Data.map((data) => data.nameOfForm))].map((formname, index) => (
              <option key={index} value={formname}>{formname}</option>
            ))}
          </select>)}
        {filters.acttype && (
          <select className='w-full lg:w-40 bg-selectbg print:bg-selectbg py-2 px-4 rounded-md border border-bordergray' value={selectValue.acttype} onChange={(e) => setSelectValue({ ...selectValue, acttype: e.target.value })}>
            <option value="">Type of Act</option>
            {/* {Data.map((item)=><option value={item.typeOfAct}>{item.typeOfAct}</option>)} */}
            {[...new Set(Data.map((data) => data.typeOfAct))].map((acttype, index) => (
              <option key={index} value={acttype}>{acttype}</option>
            ))}
          </select>)}
        {filters.priority && (
          <select className='w-full lg:w-40 bg-selectbg py-2 px-4 rounded-md border border-bordergray'
          // value={selectValue.priority} onChange={(e)=>setSelectValue({...selectValue,priority:e.target.value})}
          >
            <option value="">Priority</option>
            {/* {Data.map((item)=><option value={item.priority}>{item.priority}</option>)} */}
          </select>)}
        {filters.frequency && (
          <select className='w-full lg:w-40 bg-selectbg py-2 px-4 rounded-md border border-bordergray' value={selectValue.frequency} onChange={(e) => setSelectValue({ ...selectValue, frequency: e.target.value })}>
            <option value="">Frequency</option>
            {/* {Data.map((item)=><option value={item.fillingFrequency}>{item.fillingFrequency}</option>)} */}
            {[...new Set(Data.map((data) => data.fillingFrequency))].map((frequency, index) => (
              <option key={index} value={frequency}>{frequency}</option>
            ))}
          </select>)}
        <span className='w-full lg:w-40 relative'>
          <input type='text' className=' focus-visible focus-visible:outline-none w-full py-1.5 ps-8 border border-bordergray rounded-md ' placeholder='Search' onChange={(e) => setSearch(e.target.value)} />
          <svg className='absolute h-5 w-5 top-2 right-1.5' viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 19.5L13 13.5M1 8.5C1 9.41925 1.18106 10.3295 1.53284 11.1788C1.88463 12.0281 2.40024 12.7997 3.05025 13.4497C3.70026 14.0998 4.47194 14.6154 5.32122 14.9672C6.1705 15.3189 7.08075 15.5 8 15.5C8.91925 15.5 9.82951 15.3189 10.6788 14.9672C11.5281 14.6154 12.2997 14.0998 12.9497 13.4497C13.5998 12.7997 14.1154 12.0281 14.4672 11.1788C14.8189 10.3295 15 9.41925 15 8.5C15 7.58075 14.8189 6.6705 14.4672 5.82122C14.1154 4.97194 13.5998 4.20026 12.9497 3.55025C12.2997 2.90024 11.5281 2.38463 10.6788 2.03284C9.82951 1.68106 8.91925 1.5 8 1.5C7.08075 1.5 6.1705 1.68106 5.32122 2.03284C4.47194 2.38463 3.70026 2.90024 3.05025 3.55025C2.40024 4.20026 1.88463 4.97194 1.53284 5.82122C1.18106 6.6705 1 7.58075 1 8.5Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className='relative'>
        <svg className='h-10 w-10 p-2.5 rounded-md border border-bordergray' viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => setShowMenu(!showMenu)} >
            <path d="M9 2.50391C9 3.03434 9.21071 3.54305 9.58579 3.91812C9.96086 4.29319 10.4696 4.50391 11 4.50391C11.5304 4.50391 12.0391 4.29319 12.4142 3.91812C12.7893 3.54305 13 3.03434 13 2.50391M9 2.50391C9 1.97347 9.21071 1.46477 9.58579 1.08969C9.96086 0.71462 10.4696 0.503906 11 0.503906C11.5304 0.503906 12.0391 0.71462 12.4142 1.08969C12.7893 1.46477 13 1.97347 13 2.50391M9 2.50391H1M13 2.50391H17M3 8.50391C3 9.03434 3.21071 9.54305 3.58579 9.91812C3.96086 10.2932 4.46957 10.5039 5 10.5039C5.53043 10.5039 6.03914 10.2932 6.41421 9.91812C6.78929 9.54305 7 9.03434 7 8.50391M3 8.50391C3 7.97347 3.21071 7.46477 3.58579 7.08969C3.96086 6.71462 4.46957 6.50391 5 6.50391C5.53043 6.50391 6.03914 6.71462 6.41421 7.08969C6.78929 7.46477 7 7.97347 7 8.50391M3 8.50391H1M7 8.50391H17M12 14.5039C12 15.0343 12.2107 15.543 12.5858 15.9181C12.9609 16.2932 13.4696 16.5039 14 16.5039C14.5304 16.5039 15.0391 16.2932 15.4142 15.9181C15.7893 15.543 16 15.0343 16 14.5039M12 14.5039C12 13.9735 12.2107 13.4648 12.5858 13.0897C12.9609 12.7146 13.4696 12.5039 14 12.5039C14.5304 12.5039 15.0391 12.7146 15.4142 13.0897C15.7893 13.4648 16 13.9735 16 14.5039M12 14.5039H1M16 14.5039H17" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {/* <FaSliders size={35} className="p-1.5 bg-white print:bg-white border border-gray-400 rounded-md cursor-pointer" onClick={() => setShowMenu(!showMenu)} /> */}
          <div className='absolute z-30 top-10 lg:'>
            {showMenu &&
              (
                <div className='border border-bordergray rounded-md p-4 w-56 bg-white shadow-md'>
                  <label >
                    <input type='checkbox' checked={filters.sno} onChange={() => handleCheckboxChange('sno')} className='me-3 accent-black' />
                    Sno
                  </label><br />
                  <label >
                    <input type='checkbox' checked={filters.natureofactivity} onChange={() => handleCheckboxChange('natureofactivity')} className='me-3 accent-black' />
                    Nature of Activity
                  </label><br />
                  <label >
                    <input type='checkbox' checked={filters.activity} onChange={() => handleCheckboxChange('activity')} className='me-3 accent-black' />
                    Activity
                  </label><br />
                  <label>
                    <input type='checkbox' checked={filters.formname} onChange={() => handleCheckboxChange('formname')} className='me-3 accent-black' />
                    Name of the Form
                  </label><br />
                  <label>
                    <input type='checkbox' checked={filters.section} onChange={() => handleCheckboxChange('section')} className='me-3 accent-black' />
                    Section
                  </label><br />
                  <label >
                    <input type='checkbox' checked={filters.applicablelaw} onChange={() => handleCheckboxChange('applicablelaw')} className='me-3 accent-black' />
                    Applicable Law
                  </label><br />
                  <label>
                    <input type='checkbox' checked={filters.acttype} onChange={() => handleCheckboxChange('acttype')} className='me-3 accent-black' />
                    Type of Act
                  </label><br />
                  <label className='text-nowrap' >
                    <input type='checkbox' checked={filters.actualfilling} onChange={() => handleCheckboxChange('actualfilling')} className='me-3 accent-black' />
                    Actual Filling Frequency
                  </label><br />

                  <label >
                    <input type='checkbox' checked={filters.lastfill} onChange={() => handleCheckboxChange('lastfill')} className='me-3 accent-black' />
                    Last Filed Date
                  </label><br />
                  <label>
                    <input type='checkbox' checked={filters.frequency} onChange={() => handleCheckboxChange('frequency')} className='me-3 accent-black' />
                    Priority
                  </label><br />

                </div>
              )}
          </div>
        </span>
      </div>

      <div className='w-auto -z-40 text-wrap'>

        <DataTable
          columns={[
            {
              name: 'SNO',
              selector: (row) => row.sno,
              sortable: true,
              width: '100px',
              omit: filters.sno == false,

            },
            {
              name: 'Nature Of Activity',
              selector: (row) => row.natureOfActivity,
              sortable: true,
              width:'155px',
              omit: filters.natureofactivity == false,

            },
            {
              name: 'Activity',
              selector: (row) => row.activity,
              sortable: true,
              width:'170px',
              left:true,
              omit: filters.activity == false,

            },
            {
              name: 'Name of the Form',
              selector: (row) =><p className='text-wrap'>{row.nameOfForm}</p> ,
              sortable: true,
              width:'180px',
              omit: filters.formname == false,
              grow: 2
            },
            {
              name: 'Section',
              selector: (row) => row.section,
              sortable: true,
              omit: filters.section == false,

            },
            {
              name: 'Applicable Law',
              selector: (row) =><p className='text-wrap'>{row.applicationLaw}</p>,
              sortable: true,
              omit: filters.applicablelaw == false,
              width:'200px'
            },
            {
              name: 'Type of Act',
              selector: (row) => row.typeOfAct,
              sortable: true,
              width: '120px',
              omit: filters.acttype == false,
            },
            {
              name: <p>Actual Filling Frequency</p>,
              selector: (row) => row.actualFillingFrequency,
              sortable: true,
              width:'150px',
              omit: filters.actualfilling == false,

            },
            // {
            //   name: 'Last Filed Date',
            //   cell: (row) => <div className='flex gap-2 items-center justify-start'><p>{row.lastFilledDate}</p><IoCalendarOutline className='text-black' /></div>,
            //   sortable: true,
            //   width:'150px',
            //   omit: filters.lastfill == false,

            // },
            // {
            //   name: 'Filling Frequency',
            //   selector: (row) => row.fillingFrequency,
            //   sortable: true,
            //   width:'130px',
            //   omit: filters.frequency == false,
            // },
            {
              name: 'Actions',
              cell: (row) => <ActionMenu row={row} />,
              ignoreClick: true,
              // right:true,
              width: '100px',
            },
          ]} 
          data={pagination}
          responsive
          selectableRows
          fixedHeader
          highlightOnHover
          customStyles={customStyles} 
          className='text-wrap'>
        </DataTable>
      </div>
      <div className="py-2 lg:flex lg:justify-between items-center w-auto flex-row justify-center">
        <select value={itemsPerPage} onChange={(e) => setItemsPerPage(e.target.value)}
          className="p-2 rounded w-24"
        >
          <option value="10">Show 10</option>
          <option value="20">Show 20</option>
          <option value="30">Show 30</option>
        </select>
        <CustomPagination page={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
      <div className="flex justify-center items-center gap-5">
        <button className='w-36 py-1 rounded bg-primary print:bg-primary'>Active</button>
        <button className='w-36 py-1 rounded bg-light print:bg-light border'>Cancel</button>
      </div>
    </div>
  )
}
export default ComplianceList;