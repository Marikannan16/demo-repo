import React, { useState, useRef } from 'react'
import Drop from '../../Components/Dashboard/Staff/Drop'
import Assignedclients from '../../Components/Dashboard/Staff/Assignedclients'
import Clientpriority from '../../Components/Dashboard/Staff/Clientpriority'
import TableList from '../../Components/Dashboard/Staff/Tablelist'
import data from '../../Components/Dashboard/Staff/Dummy'
import Circle from '../../Components/Dashboard/Staff/Circle'
import Curve from '../../Components/Dashboard/Staff/CustomLegend'
import LineStatus from '../../Components/Dashboard/Staff/LineStatus'
import companies from '../../Components/Dashboard/Staff/Companies'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Staff = () => {
  const [startDate, setStartDate] = useState(null);
  const contentRef = useRef(null);

  const company = { totalclients: 180, state: 80, district: 90, branch: 10 };
  const company1 = { low: 10, medium: 10, high: 8 };
  const complianceData = { complied: 60, notComplied: 20, partiallyComplied: 12, overdue: 8 };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalPages = 10;

  const [current, setCurrent] = useState(1);
  const [itemsPage, setItemsPage] = useState(10);
  const total = 10;

  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleDownload = async () => {
    const content = contentRef.current;

    if (content) {
      const canvas = await html2canvas(content, { scale: 3 });
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 10;
      let remainingHeight = imgHeight;

      if (remainingHeight < pdfHeight - 20) {
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        remainingHeight -= pdfHeight - 20;
      } else {
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, pdfHeight - 20);
        remainingHeight -= pdfHeight - 20;
        position = pdfHeight - 10; pdf.addPage();
      }
      pdf.save('Staff.pdf');
    }
  };

  const chartData = [
    { name: "Jan", Complied: 30, NotComplied: 40, Partially: 20, Overdue: 10 },
    { name: "Feb", Complied: 35, NotComplied: 30, Partially: 25, Overdue: 10 },
    { name: "Mar", Complied: 40, NotComplied: 20, Partially: 30, Overdue: 10 },
    { name: "Apr", Complied: 50, NotComplied: 25, Partially: 45, Overdue: 10 },
    { name: "May", Complied: 45, NotComplied: 15, Partially: 30, Overdue: 10 },
    { name: "Jun", Complied: 50, NotComplied: 20, Partially: 25, Overdue: 5 },
    { name: "Jul", Complied: 60, NotComplied: 15, Partially: 20, Overdue: 5 },
    { name: "Aug", Complied: 55, NotComplied: 30, Partially: 25, Overdue: 10 },
    { name: "Sep", Complied: 65, NotComplied: 20, Partially: 15, Overdue: 10 },
    { name: "Oct", Complied: 60, NotComplied: 10, Partially: 20, Overdue: 30 },
    { name: "Nov", Complied: 70, NotComplied: 5, Partially: 15, Overdue: 10 },
    { name: "Dec", Complied: 75, NotComplied: 5, Partially: 10, Overdue: 10 },
  ];

  return (

    <div ref={contentRef} className="p-5">
      <Drop onFilterChange={handleFilterChange} startDate={startDate} setStartDate={setStartDate} onDownloadClick={handleDownload} />
      <Assignedclients
        totalclients={company.totalclients}
        state={company.state}
        district={company.district}
        branch={company.branch}
      />
      <Clientpriority
        low={company1.low}
        medium={company1.medium}
        high={company1.high}
      />
      <div className="py-4">
        <TableList
          Dummy={data}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
          filters={filters}
        />
      </div>
      <Circle {...complianceData} />

      <Curve
        chartData={chartData}
      />
      <LineStatus
        companies={companies}
        current={current}
        total={total}
        onPageChange={setCurrent}
        itemsPage={itemsPage}
        onItemsPerPageChange={setItemsPage}
        filters={filters}

      />
    </div>
  );
};

export default Staff;
