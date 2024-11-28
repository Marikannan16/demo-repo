import React, { useRef, useState } from 'react'
import DataTable from 'react-data-table-component';
import data from '../../Components/subCategory/SubCatListData';
import { Link } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ActionMenu from '../../Components/ActionMenu';

const Sublist = () => {
  const [Data] = useState(data)
  const pdfref = useRef()
  const [selectedRow, setSelectedRow] = useState(null);
  const [DownMenu, setDownMenu] = useState(false)
  const [search, setSearch] = useState('')
  const [selectValue, setSelectValue] = useState({ subcategory: "", category: "" })
  const filter = Data.filter((row) => {
    return (
      (selectValue.category ? row.category === selectValue.category : true) &&
      (selectValue.subcategory ? row.subcategory === selectValue.subcategory : true) &&
      (row.subcategory.toLowerCase().includes(search.toLowerCase()) || row.category.toLowerCase().includes(search.toLowerCase()))
    );
  })
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

  const customStyles = {
    rows: {
      style: {
        minHeight: '55px',
      },
    },
    headCells: {
      style: {
        paddingLeft: '30px',
        paddingRight: '60px',
        backgroundColor: '#000',
        color: '#fff',
        fontSize: '14px'
      }
    },
    cells: {
      style: {
        paddingLeft: '30px',
        paddingRight: '80px',
        fontSize: '14px'
      }
    },
  }
  const downloadCSV = () => {
    const headers = Object.keys(filter[0]);
    const csv = [
      headers.join(','),
      ...filter.map(row => Object.values(row).join(','))
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
        filename: 'subcategory.pdf',
        html2canvas: { scale: 2.5, useCORS: true },  // Lower the scale for better alignment
        jsPDF: { unit: 'mm', format: 'a3', orientation: 'landscape' }  // Larger page format
      })
      .from(element)
      .save();
  };


  return (
    <div className='p-5 mt-5 '>
      <div className='flex flex-col justify-center gap-2 items-start lg:flex-row lg:items-center lg:justify-between'>
        <h2 className='font-semibold text-lg'>Sub Category List</h2>
        <div className='flex gap-3'>
          <div className='relative'><button className="bg-primary text-white rounded-full p-2 cursor-pointer" onClick={() => setDownMenu(!DownMenu)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>

          </button>
            {DownMenu && <div className='absolute mt-5 lg:right-0 left-0 w-40 h-[80px] rounded-md bg-selectbg  z-30 border border-bordergray'>
              <span className='flex  gap-5  items-center hover:bg-slate-200  hover:rounded py-2.5 px-2 cursor-pointer justify-center' onClick={() => window.print()} >Download PDF</span>
              <span className='flex  gap-5  items-center hover:bg-slate-200  hover:rounded py-2.5 px-2 cursor-pointer justify-center' onClick={downloadCSV} >Download CSV</span>
            </div>}
          </div>
          <Link to="/createsubcategory"><button className='py-2 w-44 lg:w-44 rounded-md text-white bg-primary' >Create Sub Category</button> </Link>
        </div>
      </div>
      <div className='py-6 flex justify-start items-center flex-wrap gap-6 mb-4'>
        <select className='w-full lg:w-56 bg-selectbg py-2 px-4 rounded-md border border-bordergray' value={selectValue.subcategory} onChange={(e) => setSelectValue({ ...selectValue, subcategory: e.target.value })}>
          <option value="">Sub Category</option>
          {[...new Set(Data.map((data) => data.subcategory))].map((subcategory, index) => (
            <option key={index} value={subcategory}>{subcategory}</option>
          ))}
          {/* {Data.map((item)=><option value={item.subcategory}>{item.subcategory}</option>)} */}
        </select>
        <select className='w-full lg:w-56 bg-selectbg py-2 px-4 rounded-md border border-bordergray' value={selectValue.category} onChange={(e) => setSelectValue({ ...selectValue, category: e.target.value })}>
          <option value="">Category</option>
          {[...new Set(Data.map((data) => data.category))].map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
          {/* {Data.map((item)=><option value={item.category}>{item.category}</option>)} */}
        </select>
        <span className='w-full lg:w-56 bg-selectbg relative'>
          <input type='text' className=' focus-visible focus-visible:outline-none w-full py-1.5 ps-8 border border-bordergray rounded-md ' placeholder='Search' onChange={(e) => setSearch(e.target.value)} />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="absolute w-6 h-6 top-2 left-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>

        </span>
      </div>
      <div ref={pdfref}>
        <DataTable
          className='pb-10'
          columns={
            [

              {
                name: 'S NO',
                selector: row => row.sno,
                sortable: true,
              },
              {
                name: 'Sub Category',
                selector: row => row.subcategory,
                sortable: true,
                grow: 2,
              },
              {
                name: 'Category',
                selector: row => row.category,
                sortable: true,
                grow: 2,
              },
              {
                name: 'Actions',
                ignoreClick: true,
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
                right: 1,
              },
            ]
          }
          data={filter}
          selectableRows
          highlightOnHover
          customStyles={customStyles} >
        </DataTable>
      </div>
    </div>
  )
}
export default Sublist
