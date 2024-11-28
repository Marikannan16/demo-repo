import React, { useRef, useState } from 'react'
import DataTable from 'react-data-table-component';
import NatureDatas from '../../Components/category/NatureDatas';
import { Link } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ActionMenu from '../../Components/ActionMenu';

const NatureComplianceList = () => {
  const [Data] = useState(NatureDatas)
  const pdfref = useRef()
  const [selectedRow, setSelectedRow] = useState(null);
  const [DownMenu, setDownMenu] = useState(false)
  const [search, setSearch] = useState('')
  const filterData = Data.filter((row) => {
    return (
      row.category.toLowerCase().includes(search.toLowerCase())
    );
  })
  const toggleAction = (Rowid) => {
    setSelectedRow(selectedRow === Rowid ? null : Rowid)
  }
  const handleView=({id})=>{
    alert(`${id} was viewed`)
  }

  const handleEdit=({id})=>{
    alert(`${id} was Edited`)
  }

  const handleDelete=({id})=>{
    alert(`${id} was Deleted`)
  }
  const customStyles = {
    rows: {
      style: {
        height: '100%'
      },
    },
    headCells: {
      style: {
        paddingLeft: '0px',
        paddingRight: '60px',
        backgroundColor: '#000',
        color: '#fff',
        fontSize: '12px'
      },
    },
    cells: {
      style: {
        paddingLeft: '0px',
        paddingRight: '80px',
        fontSize: '12px'
      },
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
    link.setAttribute('download', 'Nature of Compliance.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadPDF = () => {
    const element = pdfref.current;
    html2pdf()
      .set({
        margin: 0.5,
        filename: 'Nature of Compliance.pdf',
        html2canvas: { scale: 2.5, useCORS: true },  // Lower the scale for better alignment
        jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }  // Larger page format
      })
      .from(element)
      .save();
  };

  return (
    <>

      <div className='flex flex-col justify-center gap-2 items-start lg:flex-row m-5 lg:items-center lg:justify-between'>
        <h2 className='  font-semibold text-lg'>Nature Of Compliance List</h2>
        <div className='flex gap-3'>
          <div className='relative'><button className="bg-primary text-white rounded-full p-2 cursor-pointer" onClick={() => setDownMenu(!DownMenu)}>
            <svg className='h-5 w-5' viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.10096 12.4503L4.09724 8.44769L4.89821 7.63314L7.5353 10.2702V0.484375H8.66661V10.2702L11.3026 7.63427L12.1047 8.44769L8.10096 12.4503ZM0.181763 16.3228V11.7545H1.31308V15.1914H14.8888V11.7545H16.0201V16.3228H0.181763Z" fill="white" />
          </svg>
          </button>
            {DownMenu && <div className='absolute mt-5 lg:right-0 left-0 w-40 h-[80px] rounded-md bg-selectbg  z-30 border border-bordergray'>
              <span className='flex justify-start gap-5  items-center hover:bg-slate-200  hover:rounded py-2.5 px-2 cursor-pointer' onClick={downloadPDF} >  Download PDF</span>
              <span className='flex justify-start gap-5  items-center hover:bg-slate-200  hover:rounded py-2.5 px-2 cursor-pointer' onClick={downloadCSV} >  Download CSV</span>
            </div>

            }
          </div>
          <Link to="/createnaturecompliance"><button className=' py-2 w-56  rounded-md text-white bg-primary' >Create Nature Of Compliance </button></Link>
        </div>
      </div>

      <div className='relative -z-50 items-center'>
        <input type='text' className='m-5 focus-visible focus-visible:outline-none w-44  mt-2 bg-white border text-md text-black border-bordergray  px-7 py-2 rounded-md placeholder:text-black ' placeholder='Search' onChange={(e) => setSearch(e.target.value)} ></input>
        <div className='absolute  top-[18px] left-7 text-gray'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>

        </div>
      </div>

      <div className='p-5' ref={pdfref}>
        <DataTable
          className='pb-10'
          columns={
            [
              {
                  name: 'S NO',
                  selector: row => row.sno,
                  sortable: true,
                  grow:1
              },
              {
                  name: 'Category',
                  selector: row => row.category,
                  sortable: 1,
                  
                  
              },
              {
                  name: 'Actions', 
                  ignoreClick:1,  
                  right:1,
                  cell: (row) =>(
                    <div className='h-5 w-5 relative' onClick={()=>toggleAction(row.sno)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                      </svg>
                      {selectedRow=== row.sno&&(
                        <ActionMenu 
                        onView={()=>handleView(row.sno)}
                        onEdit={()=>handleEdit(row.sno)}
                        onDelete={()=>handleDelete(row.sno)}
                        />
                      )
                      }
    
                    </div>),                  
                       
              }
          
          ] 
          }
          selectableRows
          data={filterData} highlightOnHover
          customStyles={customStyles}>
        </DataTable>
      </div>


    </>
  )
}

export default NatureComplianceList
