import React, { useState,useRef } from 'react';
import Dropdown from '../../Components/Dashboard/AdminDash/Dropdown';
import ClientList from '../../Components/Dashboard/AdminDash/ClientList';
import Status from '../../Components/Dashboard/AdminDash/Status'
import Table from '../../Components/Dashboard/AdminDash/Table';
import companies from '../../Components/Dashboard/AdminDash/companies';
import CustomLegend from '../../Components/Dashboard/AdminDash/CustomLegend';
import Stafftable from '../../Components/Dashboard/AdminDash/Stafftable';
import Staffdata from '../../Components/Dashboard/AdminDash/Staffdata';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Admin = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [filters, setFilters] = useState({});
    const [startDate, setStartDate] = useState(null);
    const contentRef = useRef(null);

    const company = { totalCompany: 1567, state: 454, district: 219, branch: 53 };
    const complianceData = { complied: 60, notComplied: 20, partiallyComplied: 12, overdue: 8 };
    const totalPages = 10;
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
                position = pdfHeight - 10; 
                pdf.addPage();
            }
      
            while (remainingHeight > 0) {
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                remainingHeight -= pdfHeight - 20;
                position = -pdfHeight + 10;
                if (remainingHeight > 0) {
                    pdf.addPage();
                }
            }
      
            pdf.save('Admin.pdf');
        }
      };
    
    const chartData = [
        { name: "Jan", Complied: 30, "NotComplied": 40, Partially: 20, Overdue: 10 },
        { name: "Feb", Complied: 35, "NotComplied": 30, Partially: 25, Overdue: 10 },
        { name: "Mar", Complied: 40, "NotComplied": 20, Partially: 30, Overdue: 10 },
        { name: "Apr", Complied: 50, "NotComplied": 25, Partially: 45, Overdue: 10 },
        { name: "May", Complied: 45, "NotComplied": 15, Partially: 30, Overdue: 10 },
        { name: "Jun", Complied: 50, "NotComplied": 20, Partially: 25, Overdue: 5 },
        { name: "Jul", Complied: 60, "NotComplied": 15, Partially: 20, Overdue: 5 },
        { name: "Aug", Complied: 55, "NotComplied": 30, Partially: 25, Overdue: 10 },
        { name: "Sep", Complied: 65, "NotComplied": 20, Partially: 15, Overdue: 10 },
        { name: "Oct", Complied: 60, "NotComplied": 10, Partially: 20, Overdue: 30 },
        { name: "Nov", Complied: 70, "NotComplied": 5, Partially: 15, Overdue: 10 },
        { name: "Dec", Complied: 75, "NotComplied": 5, Partially: 10, Overdue: 10 },
    ];
    return (
        <div ref={contentRef} className="p-5">
            <Dropdown onFilterChange={handleFilterChange} startDate={startDate} setStartDate={setStartDate} onDownloadClick={handleDownload}/>
            <ClientList
                totalCompany={company.totalCompany}
                state={company.state}
                district={company.district}
                branch={company.branch} />
                <Status {...complianceData} />

            <div className="py-4">
                <Table
                    companies={companies}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    onItemsPerPageChange={setItemsPerPage}
                    filters={filters}
                />
             </div>
            <CustomLegend
                chartData={chartData}
            />
            <Stafftable Staffdata={Staffdata} />

        </div>
    );
};

export default Admin;