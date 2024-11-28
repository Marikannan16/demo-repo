import React, { useRef, useState } from 'react'
import DataTable from 'react-data-table-component';
import data from "../../Components/category/Datas";
import { Link } from "react-router-dom";
import html2pdf from "html2pdf.js";
import ActionMenu from "../../Components/ActionMenu";

const CategoryList = () => {
  const [Data] = useState(data)
  const pdfref = useRef();
  const [selectedRow, setSelectedRow] = useState(null);
  const [DownloadMenu, setDownloadMenu] = useState(false)
  const [search, setSearch] = useState('')
  const filterData = Data.filter((row) => {
    return (
      row.category.toLowerCase().includes(search.toLowerCase())
    );
  })

  const toggleAction = (Rowid) => {
    setSelectedRow(selectedRow === Rowid ? null : Rowid)
  }

  const customStyles = {
    rows: {
      style: {
        minHeight: '55px',
      },
    },
    headCells: {
      style: {
        paddingLeft: '0px',
        paddingRight: '60px',
        backgroundColor: '#000',
        color: '#fff',
        fontSize: '14px'
      }
    },
    cells: {
      style: {
        paddingLeft: '0px',
        paddingRight: '70px',
        fontSize: '14px'
      }
    },
  }

  const downloadCSV = () => {
    const headers = Object.keys(filterData[0]);
    const csv = [
      headers.join(','),
      ...filterData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'categorylist.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadPDF = () => {
    const element = pdfref.current;
    html2pdf()
      .set({
        // margin:5,  
        filename: 'companywisereport.pdf',
        html2canvas: { scale: 5 },  // Lower the scale for better alignment
        jsPDF: { unit: 'mm', format: 'a2', orientation: 'landscape' }  // Larger page format
      })
      .from(element)
      .save();
  };
  const handleView = ({ id }) => {
    alert(`${id} was viewed`)
  }

  const handleEdit = ({ id }) => {
    alert(`${id} was Edited`)
  }

  const handleDelete = ({ id }) => {
    alert(`${id} was Deleted`)
  }

  return (
    <>
      <div className='flex flex-col justify-center gap-2 items-start lg:flex-row m-5 lg:items-center lg:justify-between'>
        <h2 className='font-semibold text-lg'>Category List</h2>
        <div className='flex gap-3 items-center'>
          <div className='relative'>
            <button className="bg-primary text-white rounded-full p-2 cursor-pointer" onClick={() => setDownloadMenu(!DownloadMenu)}><svg className="h-4 w-4" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.10096 12.4503L4.09724 8.44769L4.89821 7.63314L7.5353 10.2702V0.484375H8.66661V10.2702L11.3026 7.63427L12.1047 8.44769L8.10096 12.4503ZM0.181763 16.3228V11.7545H1.31308V15.1914H14.8888V11.7545H16.0201V16.3228H0.181763Z" fill="white" stroke="white" />
            </svg>
            </button>
            {DownloadMenu && <div className='absolute mt-5 lg:right-0 left-0 w-40 h-[80px] rounded-md bg-selectbg  z-30 border border-bordergray'>
              <span className='flex justify-start gap-5  items-center hover:bg-slate-200  hover:rounded py-2.5 px-2 cursor-pointer' onClick={downloadPDF} >Download PDF</span>
              <span className='flex justify-start gap-5  items-center hover:bg-slate-200  hover:rounded py-2.5 px-2 cursor-pointer' onClick={downloadCSV} >Download CSV</span>
            </div>}
          </div>
          {/* <HiOutlineDownload onClick={downloadCSV} className='w-9 h-9 p-2 rounded-full bg-primary text-light' /> */}
          <Link to="/category"><button className='py-2 w-36 rounded-md text-white bg-primary'>Create Category</button></Link>
        </div>
      </div>
      <div className='relative'>
        <input type='text' className='m-5 focus-visible focus-visible:outline-none  mt-2 bg-gray-100 border text-md text-black border-bordergray  px-9 py-2 rounded-md placeholder:text-black' placeholder='Search' onChange={(e) => setSearch(e.target.value)}  ></input>
        <div className='absolute top-5 left-7 ' >
          <svg className="h-5 w-5" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 19.5L13 13.5M1 8.5C1 9.41925 1.18106 10.3295 1.53284 11.1788C1.88463 12.0281 2.40024 12.7997 3.05025 13.4497C3.70026 14.0998 4.47194 14.6154 5.32122 14.9672C6.1705 15.3189 7.08075 15.5 8 15.5C8.91925 15.5 9.82951 15.3189 10.6788 14.9672C11.5281 14.6154 12.2997 14.0998 12.9497 13.4497C13.5998 12.7997 14.1154 12.0281 14.4672 11.1788C14.8189 10.3295 15 9.41925 15 8.5C15 7.58075 14.8189 6.6705 14.4672 5.82122C14.1154 4.97194 13.5998 4.20026 12.9497 3.55025C12.2997 2.90024 11.5281 2.38463 10.6788 2.03284C9.82951 1.68106 8.91925 1.5 8 1.5C7.08075 1.5 6.1705 1.68106 5.32122 2.03284C4.47194 2.38463 3.70026 2.90024 3.05025 3.55025C2.40024 4.20026 1.88463 4.97194 1.53284 5.82122C1.18106 6.6705 1 7.58075 1 8.5Z" stroke="gray" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div ref={pdfref}>
        <DataTable
          columns={[
            {
              name: 'S NO',
              selector: row => row.sno,
              sortable: true
            },
            {
              name: 'Category',
              selector: row => row.category,
              sortable: true,

            },
            {
              name: 'Actions',
              ignoreClick: true,
              right: 1,
              grow: 1,
              cell: (row) => (
                <div className='absolute h-5 w-5' onClick={() => toggleAction(row.sno)}>
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
            }

          ]}
          className="pb-24"
          customStyles={customStyles} selectableRows
          data={filterData} >

        </DataTable>


      </div>
    </>
  )
}
export default CategoryList
