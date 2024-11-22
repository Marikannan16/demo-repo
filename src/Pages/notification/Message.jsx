import React, { useState,useRef,useEffect } from 'react';
import Menu from '../../Components/Notification/Menu';
import Search from '../../Components/Notification/Search';
import September from '../../Components/Notification/September';
import { notifications } from '../../Components/Notification/Dummy';
import Item from '../../Components/Notification/Item';
import { data } from '../../Components/Notification/Data';
import moment from 'moment';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Message = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const contentRef = useRef(null);

    const filterItems = (items) => {
        return items.filter(item => {
            const matchesSearch = item.message.toLowerCase().includes(searchTerm.toLowerCase());
            const itemDate = moment(item.time, "MMM DD, hh:mm A");
            let matchesDate = true;

            if (startDate) {
                if (startDate.length === 2) {
                    const startOfDay = moment(startDate[0]).startOf('day');
                    const endOfDay = moment(startDate[1]).endOf('day');
                    matchesDate = itemDate.isBetween(startOfDay, endOfDay, null, '[]');
                } else  {
                    const selectedDate = moment(startDate[0]).startOf('day');
                    matchesDate = itemDate.isSame(selectedDate, 'day');
                }
            }

            return matchesSearch && matchesDate;
        });
    };

    const filteredNotifications = filterItems(notifications);
    const filteredData = filterItems(data);

    

    useEffect(() => {
        let dateMatched = false;
    
        const allItems = [...filteredNotifications, ...filteredData];
    
        allItems.forEach(item => {
            const itemDate = moment(item.time, "MMM DD, hh:mm A");
            if (startDate) {
                let matchesDate = true;
                if (startDate.length === 2) {
                    const startOfDay = moment(startDate[0]).startOf('day');
                    const endOfDay = moment(startDate[1]).endOf('day');
                    matchesDate = itemDate.isBetween(startOfDay, endOfDay, null, '[]');
                    
                } else {
                    const selectedDate = moment(startDate[0]).startOf('day');
                    matchesDate = itemDate.isSame(selectedDate, 'day');                    
                }

                if (matchesDate) {
                    dateMatched = true;
                }
            }
        });
    

        if (!dateMatched && startDate) {
            let errorString = '';
            if (startDate.length === 2) {
                errorString = `Date is not available`;
            }
    
            setErrorMessage(errorString);
        } else {
            setErrorMessage('');
        }
    }, [startDate, filteredNotifications, filteredData]);
    
    
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

            if (imgHeight < pdfHeight - 20) {
                pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
            } else {
                let position = 0;
                let remainingHeight = imgHeight;

                while (remainingHeight > 0) {
                    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                    remainingHeight -= pdfHeight - 20;
                    position = -pdfHeight + 10;
                    if (remainingHeight > 0) {
                        pdf.addPage();
                    }
                }
            }

            pdf.save('filtered_notifications.pdf');
        }
    };
    return (
        <div ref={contentRef} className='ps-5 pe-5 font-poppins'>
            <Menu onDownload={handleDownload} />

            <Search
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                startDate={startDate}
                setStartDate={setStartDate}
            />

            {errorMessage && (
                <div className="error-message mt-10" style={{ color: 'black', fontWeight: 'bold',textAlign:'center' }}>
                    {errorMessage}
                </div>
            )}

            {filteredNotifications.length > 0 && (
                <div className="bg-white border border-bordergray rounded-lg shadow mt-5 p-4">
                    <div className="p-2 font-semibold text-lg">Sep 12, 2024</div>
                    {filteredNotifications.map((notification, index) => (
                        <September
                            key={index}
                            time={notification.time}
                            message={notification.message}
                            status={notification.status}
                        />
                    ))}
                </div>
            )}

            {filteredData.length > 0 && (
                <div className="p-6 bg-white border  border-bordergray rounded-lg shadow mt-5 mb-5">
                    <h6 className="p-2 font-semibold text-lg mb-4">Last Week</h6>
                    {filteredData.map((item, index) => (
                        <Item
                            key={index}
                            time={item.time}
                            message={item.message}
                            status={item.status}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Message;




// // import React, { useState } from 'react'
// // import Menu from './Menu'
// // import Search from './Search'
// // import September from './September'
// // import { notifications } from './Dummy'
// // import Item from './Item'
// // import { data } from './Data'
// // const Message = () => {
// //     const [searchTerm, setSearchTerm] = useState('');

// //     const filteredNotifications = notifications.filter(notification =>
// //         notification.message.toLowerCase().includes(searchTerm.toLowerCase())
// //     );
// //     const filteredData = data.filter(item =>
// //         item.message.toLowerCase().includes(searchTerm.toLowerCase())
// //     );
// //     return (
// //         <div className='ps-5 pe-5 font-poppins'>
// //             <Menu />
// //             <Search
// //                 searchTerm={searchTerm}
// //                 setSearchTerm={setSearchTerm}
// //             />
// //             <div className="bg-white border rounded-lg shadow mt-5 p-5">
// //                 <div className="p-2 font-semibold">Sep 12, 2024</div>
// //                 {filteredNotifications.map((notification, index) => (
// //                     <September
// //                         key={index}
// //                         time={notification.time}
// //                         message={notification.message}
// //                         status={notification.status}
// //                     />
// //                 ))}
// //             </div>
// //             <div className="p-6 bg-white border rounded-lg shadow  mt-5 mb-5">
// //                 <h5 className=" p-2 font-semibold mb-4">Last Weeks</h5>
// //                 {filteredData.map((item, index) => (
// //                     <Item
// //                         key={index}
// //                         time={item.time}
// //                         message={item.message}
// //                         status={item.status}
// //                     />
// //                 ))}
// //             </div>
// //         </div>
// //     )
// // }
// // export default Message

// // import React, { useState } from 'react';
// // import Menu from './Menu';
// // import Search from './Search';
// // import September from './September';
// // import { notifications } from './Dummy';
// // import Item from './Item';
// // import { data } from './Data';

// // const Message = () => {
// //     const [searchTerm, setSearchTerm] = useState('');
// //     const [dateRange, setDateRange] = useState([null, null]);

// //     const filteredNotifications = notifications.filter(notification => {
// //         const matchesSearch = notification.message.toLowerCase().includes(searchTerm.toLowerCase());

// //         // Check if dateRange is selected
// //         const matchesDate = dateRange[0] && dateRange[1]
// //             ? new Date(notification.time) >= dateRange[0] && new Date(notification.time) <= dateRange[1]
// //             : true; // If no date range, include all notifications

// //         return matchesSearch && matchesDate;
// //     });

// //     const filteredData = data.filter(item => {
// //         const matchesSearch = item.message.toLowerCase().includes(searchTerm.toLowerCase());

// //         const matchesDate = dateRange[0] && dateRange[1]
// //             ? new Date(item.time) >= dateRange[0] && new Date(item.time) <= dateRange[1]
// //             : true;

// //         return matchesSearch && matchesDate;
// //     });

// //     return (
// //         <div className='ps-5 pe-5 font-poppins'>
// //             <Menu />
// //             <Search
// //                 searchTerm={searchTerm}
// //                 setSearchTerm={setSearchTerm}
// //                 dateRange={dateRange}
// //                 setDateRange={setDateRange}
// //             />
// //             <div className="bg-white border rounded-lg shadow mt-5 p-5">
// //                 <div className="p-2 font-semibold">Sep 12, 2024</div>
// //                 {filteredNotifications.map((notification, index) => (
// //                     <September
// //                         key={index}
// //                         time={notification.time}
// //                         message={notification.message}
// //                         status={notification.status}
// //                     />
// //                 ))}
// //             </div>
// //             <div className="p-6 bg-white border rounded-lg shadow mt-5 mb-5">
// //                 <h6 className="p-2 font-semibold mb-4">Last Weeks</h6>
// //                 {filteredData.map((item, index) => (
// //                     <Item
// //                         key={index}
// //                         time={item.time}
// //                         message={item.message}
// //                         status={item.status}
// //                     />
// //                 ))}
// //             </div>
// //         </div>
// //     );
// // };

// // export default Message;


// // import React, { useState } from 'react';
// // import Menu from './Menu';
// // import Search from './Search';
// // import September from './September';
// // import { notifications } from './Dummy';
// // import Item from './Item';
// // import { data } from './Data';

// // const Message = () => {
// //     const [searchTerm, setSearchTerm] = useState('');
// //     const [dateRange, setDateRange] = useState([null, null]);

// //     const filterItems = (items) => {
// //         return items.filter(item => {
// //             const matchesSearch = item.message.toLowerCase().includes(searchTerm.toLowerCase());

// //             const matchesDate = dateRange[0] && dateRange[1]
// //                 ? new Date(item.time) >= dateRange[0] && new Date(item.time) <= dateRange[1]
// //                 : true;

// //             return matchesSearch && matchesDate;
// //         });
// //     };

// //     const filteredNotifications = filterItems(notifications);
// //     const filteredData = filterItems(data);

// //     return (
// //         <div className='ps-5 pe-5 font-poppins'>
// //             <Menu />
// //             <Search
// //                 searchTerm={searchTerm}
// //                 setSearchTerm={setSearchTerm}
// //                 dateRange={dateRange}
// //                 setDateRange={setDateRange} 
// //             />
// //             <div className="bg-white border rounded-lg shadow mt-5 p-5">
// //                 <div className="p-2 font-semibold">Sep 12, 2024</div>
// //                 {filteredNotifications.map((notification, index) => (
// //                     <September
// //                         key={index}
// //                         time={notification.time}
// //                         message={notification.message}
// //                         status={notification.status}
// //                     />
// //                 ))}
// //             </div>
// //             <div className="p-6 bg-white border rounded-lg shadow mt-5 mb-5">
// //                 <h6 className="p-2 font-semibold mb-4">Last Weeks</h6>
// //                 {filteredData.map((item, index) => (
// //                     <Item
// //                         key={index}
// //                         time={item.time}
// //                         message={item.message}
// //                         status={item.status}
// //                     />
// //                 ))}
// //             </div>
// //         </div>
// //     );
// // };

// // export default Message;
 





// // import React, { useState } from 'react';
// // import Menu from './Menu';
// // import Search from './Search';
// // import September from './September';
// // import { notifications } from './Dummy';
// // import Item from './Item';
// // import { data } from './Data';

// // const Message = () => {
// //     const [searchTerm, setSearchTerm] = useState('');

// //     const filterItems = (items) => {
// //         return items.filter(item =>
// //             item.message.toLowerCase().includes(searchTerm.toLowerCase())
// //         );
// //     };

// //     const filteredNotifications = filterItems(notifications);
// //     const filteredData = filterItems(data);

// //     return (
// //         <div className='ps-5 pe-5 font-poppins'>
// //             <Menu />
// //             <Search
// //                 searchTerm={searchTerm}
// //                 setSearchTerm={setSearchTerm}
// //             />
// //             <div className="bg-white border rounded-lg shadow mt-5 p-5">
// //                 <div className="p-2 font-semibold">Sep 12, 2024</div>
// //                 {filteredNotifications.map((notification, index) => (
// //                     <September
// //                         key={index}
// //                         time={notification.time}
// //                         message={notification.message}
// //                         status={notification.status}
// //                     />
// //                 ))}
// //             </div>
// //             <div className="p-6 bg-white border rounded-lg shadow mt-5 mb-5">
// //                 <h6 className="p-2 font-semibold mb-4">Last Weeks</h6>
// //                 {filteredData.map((item, index) => (
// //                     <Item
// //                         key={index}
// //                         time={item.time}
// //                         message={item.message}
// //                         status={item.status}
// //                     />
// //                 ))}
// //             </div>
// //         </div>
// //     );
// // };

// // export default Message;




// import React, { useState } from 'react';
// import Menu from '../../Components/Notification/Menu';
// import Search from '../../Components/Notification/Search';
// import September from '../../Components/Notification/September';
// import { notifications } from '../../Components/Notification/Dummy';
// import Item from '../../Components/Notification/Item';
// import { data } from '../../Components/Notification/Data';
// import moment from 'moment';

// const Message = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [startDate, setStartDate] = useState(null);

//     const filterItems = (items) => {
//         return items.filter(item => {
//             const matchesSearch = item.message.toLowerCase().includes(searchTerm.toLowerCase());

//             const itemDate = moment(item.time, "MMM DD, hh:mm A");

//             let matchesDate = true;

//             if (startDate) {
//                 if (startDate.length === 2) {
//                     const startOfDay = moment(startDate[0]).startOf('day');
//                     const endOfDay = moment(startDate[1]).endOf('day');

//                     matchesDate = itemDate.isBetween(startOfDay, endOfDay, null, '[]');
//                 } else if (startDate.length === 2) {
//                     const selectedDate = moment(startDate[0]).startOf('day');
//                     matchesDate = itemDate.isSame(selectedDate, 'day');
//                 }
//             }

//             return matchesSearch && matchesDate;
//         });
//     };

//     const filteredNotifications = filterItems(notifications);
//     const filteredData = filterItems(data);

//     return (
//         <div className='ps-5 pe-5'>
//             <Menu filteredNotifications={filteredNotifications} filteredData={filteredData} />
            
//             <Search
//                 searchTerm={searchTerm}
//                 setSearchTerm={setSearchTerm}
//                 startDate={startDate}
//                 setStartDate={setStartDate}
//             />

//             {filteredNotifications.length > 0 && (
//                 <div className="bg-white border border-bordergray rounded-lg shadow mt-5 p-5">
//                     <div className="p-2 font-semibold">Sep 12, 2024</div>
//                     {filteredNotifications.map((notification, index) => (
//                         <September
//                             key={index}
//                             time={notification.time}
//                             message={notification.message}
//                             status={notification.status}
//                         />
//                     ))}
//                 </div>
//             )}

//             {filteredData.length > 0 && (
//                 <div className="p-6 bg-white border border-bordergray rounded-lg shadow mt-5 mb-5">
//                     <h6 className="p-2 font-semibold mb-4">Last Week</h6>
//                     {filteredData.map((item, index) => (
//                         <Item
//                             key={index}
//                             time={item.time}
//                             message={item.message}
//                             status={item.status}
//                         />
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Message;
