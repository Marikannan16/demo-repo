import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineMail } from "react-icons/ai";
import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { IoIosArrowBack } from "react-icons/io";
import { MdClose, MdNavigateNext, MdOutlineCalendarMonth, MdOutlineFileDownload } from "react-icons/md";
import logo from '../../Images/sky.jpg';
import {Link} from 'react-router-dom'
import { useReactToPrint } from 'react-to-print';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css"; 
const localizer = momentLocalizer(moment);

const events = [
  {
    title: 'ESIC Remittance',
    start: '2024-10-08',
    end: '2024-10-08',
    allDay: true,
    status: 'compiled'
  },
  {
    title: 'event-2',
    start: '2024-10-08',
    end: '2024-10-08',
    allDay: true,
    status: 'not compiled'
  },
  {
    title: 'event-2',
    start: '2024-10-08',
    end: '2024-10-08',
    allDay: true,
    status: 'partially compiled'
  },
  {
    title: 'Trade License + 1',
    start: '2024-10-23',
    end: '2024-10-23',
    allDay: true,
    status: 'compiled'
  },
  {
    title: 'Event',
    start: '2024-10-26',
    end: '2024-10-26',
    allDay: true,
    status: 'partially compiled'
  },
  {
    title: 'event-2',
    start: '2024-10-08',
    end: '2024-10-08',
    allDay: true,
    status: 'not compiled'
  },
  {
    title: 'event-2',
    start: '2024-10-08',
    end: '2024-10-08',
    allDay: true,
    status: 'partially compiled'
  }
];

// Convert string dates into JavaScript date objects
const convertedEvents = events.map(event => ({
  ...event,
  start: new Date(event.start),
  end: new Date(event.end),
}));

const CustomHeader = () => <div className="hidden" />;

// Custom Toolbar component
const CustomToolbar = (toolbar) => {
  const goToBack = () => toolbar.onNavigate('PREV');
  const goToNext = () => toolbar.onNavigate('NEXT');
  const label = () => {
    const date = moment(toolbar.date);
    if (toolbar.view === 'week') {
      const startOfWeek = moment(toolbar.date).startOf('week').format('DD MMMM YYYY');
      const endOfWeek = moment(toolbar.date).endOf('week').format('DD MMMM YYYY');
      return `${startOfWeek} - ${endOfWeek}`;
    }
    return date.format(toolbar.view === 'month' ? 'MMMM YYYY' : 'DD MMMM YYYY');
  };

  return (
    <div className="lg:w-96 items-center">
      <div className="flex justify-between items-center mb-4">
        <button onClick={goToBack} className="px-2 py-2 bg-primary bg-opacity-20 rounded-full">
        <svg width="20" height="20" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.06 8L5 7.06L1.94667 4L5 0.94L4.06 8.21774e-08L0.0599996 4L4.06 8Z" fill="#d7b95f" />
          </svg>
        </button>
        <span className="text-lg text-center font-semibold text-wrap">{label()}</span>
        <button onClick={goToNext} className="px-2 py-2 bg-primary bg-opacity-20 rounded-full">
        <svg width="20" height="20" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.94 0L0 0.94L3.05333 4L0 7.06L0.94 8L4.94 4L0.94 0Z" fill="#d7b95f" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const MyCalendar = () => {
  
  const [view, setView] = useState('month');
  const [dateRange, setDateRange] = useState([null, null]);
  const [filter, setFilter] = useState({ status: "", view: "", range: "" });
  const [search, setSearch] = useState("");
  const [calendarDate, setCalendarDate] = useState(new Date());
  const componentRef=useRef(null)
  const handlePrint=useReactToPrint({content:()=>componentRef.current})

  const eventStyleGetter = (event) => {
    const backgroundColor = event.status === 'compiled' ? '#6DAf45' : event.status === 'not compiled' ? '#Df4343' : event.status === 'partially compiled' ? '#d7b95f' : 'white';
    return { style: { backgroundColor, borderRadius: '5px', color: 'text-black', padding: '5px',zIndex:0 ,marginTop:'7px',marginBottom:'-6px',overflowY:scroll} };
  };

  const filteredEvents = convertedEvents.filter((event) => {
    const startDate = dateRange[0];
    const endDate = dateRange[1];
    return (
      (!filter.status || event.status === filter.status) &&
      (!startDate || !endDate || (event.start >= startDate && event.end <= endDate))
    );
  });

  // Update calendar view and date based on selected date range
  useEffect(() => {
    if (dateRange[0] && dateRange[1]) {
      const rangeDays = moment(dateRange[1]).diff(moment(dateRange[0]), 'days');
      setCalendarDate(dateRange[0]);

      if (rangeDays <= 1) {
        setView('day');
      } else if (rangeDays <= 7) {
        setView('week');
      } else {
        setView('month');
      }
    }
  }, [dateRange]);
  const CustomDateCellWrapper = ({ value }) => {
      const dayName = moment(value).format('ddd'); // Get the day name (e.g., "Monday", "Tuesday")
      // const date = moment(value).format('DD'); // Get the day number (e.g., "1", "2")
    
      return (
        <div className="relative h-full w-full flex justify-center items-start p-1 overflow-y-scroll">
          <span className="absolute top-1 left-3 text-xs md:text-sm lg:text-base text-gray-500 -z-50">
            {dayName} 
          </span>
          {/* No default children content is rendered here */}
        </div>
      );
    };

  return (
    <>
      <div className="p-5 flex justify-between" ref={componentRef}>
        <span className="flex justify-between gap-3 items-center ">
          <img src={logo} alt="" className="h-9 w-9 rounded-full" />
          <h4 className="text-md font-bold">Ace Corporation, <span className="text-md font-medium">Bangalore</span></h4>
        </span>
        <span className="flex justify-between items-center gap-3">
          <AiOutlineMail className="w-8 h-8 p-1.5 bg-primary text-white rounded-full" size={15} />
          <MdOutlineFileDownload className="w-8 h-8 p-1.5 bg-primary text-white rounded-full" size={15} onClick={handlePrint}/>
          <Link to="/clientbranchmanagement">
          <IoIosArrowBack className="w-8 h-8 p-1.5 bg-primary text-white rounded-full" size={15} />
          </Link>
        </span>
      </div>

      <div className="flex flex-wrap justify-start lg:w-full my-4 ms-5 gap-3">
        <select className="bg-white border w-full border-bordergray text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block lg:w-48 p-2.5" value={filter.status} onChange={(e) => setFilter({ ...filter, status: e.target.value })}>
          <option value="">Status</option>
          <option value="compiled">Compiled</option>
          <option value="not compiled">Not Compiled</option>
          <option value="partially compiled">Partially Compiled</option>
        </select>
        <select value={view} onChange={(e) => setView(e.target.value)} className="bg-white border border-bordergray text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block lg:w-48 w-full p-2.5">
          <option value="month">Month</option>
          <option value="week">Week</option>
          <option value="day">Day</option>
        </select>
        <div className='relative'>
      <Flatpickr value={dateRange} 
      onChange={(selectedDates) => setDateRange(selectedDates)}
      options={{
        mode: "range", // Enables date range selection
        dateFormat: "Y-m-d", // Customize the date format
        allowInput: true, // Allows manual input
        enableTime: false, // Removes time selection if not needed
      }}
      className="bg-gray-50 border border-bordergray text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 lg:w-48 w-full p-2.5"
      placeholder="Date Range"
      style={{ zIndex: 1000 }}
    />
    {!dateRange[0] &&
      <MdOutlineCalendarMonth className="absolute top-3 right-2 bg-white " size={18}/>}
    {dateRange[0] &&
      <MdClose className="absolute top-3 right-2 bg-white " size={18} onClick={()=>setDateRange([null,null])}/>} 
    </div>
        {/* <DatePicker
          selected={dateRange[0]}
          onChange={(update) => setDateRange(update)}
          startDate={dateRange[0]}
          endDate={dateRange[1]}
          selectsRange
          isClearable
          showMonthDropdown
          showYearDropdown
          placeholderText="Date Range"
          className="bg-gray-50 border border-bordergray text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 lg:w-48 w-full p-2.5"
          style={{ zIndex: 1000 }}
        /> */}
        <input type="text" placeholder="search" value={search} onChange={(e) => setSearch(e.target.value)} className="bg-gray-50 border border-bordergray text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block lg:w-48 w-full p-2.5" />
      </div>

      <div className="w-full overflow-x-scroll scroll">
        <Calendar
        className='-z-50 lg:w-full md:w-full sm:w-screen'
          localizer={localizer}
          events={filteredEvents}
          style={{ height: 800,width:'100%', margin: '20px' }}
          view={view}
          date={calendarDate}
          onView={(newView) => setView(newView)}
          onNavigate={(date) => setCalendarDate(date)}
          selectable
          eventPropGetter={eventStyleGetter}
          components={{
            toolbar: CustomToolbar,
            header: CustomHeader,
            dateCellWrapper:CustomDateCellWrapper,
          }}
        />
      </div>
    </>
  );
};

export default MyCalendar;



// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { AiOutlineMail } from "react-icons/ai";
// import React, { useState } from 'react';
// import moment from 'moment';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { IoIosArrowBack } from "react-icons/io";
// import { MdNavigateNext, MdOutlineFileDownload } from "react-icons/md";
// import logo from '../../Images/sky.jpg'

// const localizer = momentLocalizer(moment);

// const events = [
//   {
//     title: 'ESIC Remittance',
//     start: '2024-10-08',
//     end: '2024-10-08',
//     allDay: true,
//     status:'compiled'
//   },
//   {
//     title: 'event-2',
//     start: '2024-10-08',
//     end: '2024-10-08',
//     allDay: true,
//     status:'not compiled'
//   },
//   {
//     title: 'event-2',
//     start: '2024-10-08',
//     end: '2024-10-08',
//     allDay: true,
//     status:'partially compiled'
//   },
//   {
//     title: 'Trade License + 1',
//     start: '2024-10-23',
//     end: '2024-10-23',
//     allDay: true,
//     status:'compiled'
//   },
//   {
//     title: 'Event',
//     start: '2024-10-26',
//     end: '2024-10-26',
//     allDay: true,
//     status:'partially compiled'
//   },
// ];

// // Convert string dates into JavaScript date objects
// const convertedEvents = events.map(event => ({
//   ...event,
//   start: new Date(event.start),
//   end: new Date(event.end),
// }));
// const CustomHeader = () => {
//   return <div className="hidden" />; // Return an empty div to hide the header
// };
// // Custom Toolbar component
// const CustomToolbar = (toolbar) => {
//   const goToBack = () => {
//     toolbar.onNavigate('PREV');
//   };

//   const goToNext = () => {
//     toolbar.onNavigate('NEXT');
//   };

//   const label = () => {
//     const date = moment(toolbar.date);

//     if (toolbar.view === 'week') {
//       const startOfWeek = moment(toolbar.date).startOf('week').format('DD MMMM YYYY');
//       const endOfWeek = moment(toolbar.date).endOf('week').format('DD MMMM YYYY');
//       return `${startOfWeek} - ${endOfWeek}`;
//     }

//     return date.format(`${toolbar.view=="month" ? 'MMMM YYYY':'DD MMMM YYYY'}`);
//   };
  

//   return (
//     <div className='lg:w-2/5 w-full '>
//       <div className="flex justify-between mb-4">
//         <button onClick={goToBack} className="px-2 py-2 bg-yellow-100 rounded-full">
//           <IoIosArrowBack className='text-yellow-500 ' size={25} />
//         </button>
//         <span className="text-xl font-semibold">{label()}</span>
//         <button onClick={goToNext} className="px-2 py-2 bg-yellow-100 rounded-full">
//           <MdNavigateNext className='text-yellow-500 ' size={25} />
//         </button>
//       </div>
//     </div>
//   );
// };

// // Custom date cell component to show the date in the top-left corner and the day in the top-right corner
// const CustomDateCellWrapper = ({ value }) => {
//   const dayName = moment(value).format('ddd'); // Get the day name (e.g., "Monday", "Tuesday")
//   const date = moment(value).format('DD'); // Get the day number (e.g., "1", "2")

//   return (
//     <div className="relative h-full w-full flex justify-center items-start p-1 overflow-x-scroll">
//       <span className="absolute top-1 left-0 text-xs md:text-sm lg:text-base text-gray-500 -z-50">
//         {dayName} 
//       </span>
//       {/* No default children content is rendered here */}
//     </div>
//   );
// };

// const MyCalendar = () => {
//   const [view, setView] = useState('month');
//   const [startDate, setStartDate] = useState(null);
//   const [filter, setFilter] = useState({ status: "", view: "", range: "" });
//   const [search, setSearch] = useState("");

//   const eventStyleGetter = (event) => {
//     let style = {
//       backgroundColor: event.status==='compiled' ? 'green' : event.status==='not compiled' ? 'red':event.status==='partially compiled'? 'yellow':'white' ,
//       borderRadius: '5px',
//       color: 'text-black',
//       marginTop:'10px',
//       border: '0px',
//       display: 'block',
//       // height:'100%',
//       padding: '5px',
//       overflowWrap:'break-word',
//       whiteSpace:'pre-wrap'
//     };
//     return { style };
//   };

//   return (
//     <>
//       <div className='p-5 flex justify-between'>
//         <span className="flex justify-between gap-3 items-center">
//           <img src={logo} alt="" className='h-9 w-9 rounded-full' />
//           <h4 className="text-md font-bold">Ace Corporation, <span className="text-md font-medium">Bangalore</span></h4>
//         </span>
//         <span className="flex justify-between items-center gap-3">
//           <AiOutlineMail className='w-8 h-8 p-1.5 bg-primary text-white rounded-full' size={15} />
//           <MdOutlineFileDownload className='w-8 h-8 p-1.5 bg-primary text-white rounded-full' size={15} />
//         </span>
//       </div>

//       <div className="flex flex-wrap justify-start lg:w-full my-4 ms-5 gap-3">
//         <select className="bg-white border w-full border-bordergray text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block lg:w-48 p-2.5" value={filter.status} onChange={(e)=>setFilter({...filter,status:e.target.value})}>
//           <option>Status</option>
//         </select>
//         <select
//           value={view}
//           onChange={(e) => setView(e.target.value)}
//           className="bg-white border border-bordergray text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block lg:w-48 w-full p-2.5">
//           <option value="month">Month</option>
//           <option value="week">Week</option>
//           <option value="day">Day</option>
//         </select>
//         <DatePicker
//           selected={startDate}
//           onChange={(date) => setStartDate(date)}
//           placeholderText="Date Range"
//           className="bg-gray-50 border border-bordergray text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  lg:w-48 w-full p-2.5 z-50"
//         />
//         <input type='text' placeholder='search' value={search} onChange={(e) => setSearch(e.target.value)} className="bg-gray-50 border border-bordergray text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block lg:w-48 w-full p-2.5" />
//       </div>

//       <div className="max-w-full ">
//         <Calendar className='-z-50  overflow-x-scroll'
//           localizer={localizer}
//           events={convertedEvents}
//           style={{ height: 800, margin: '20px', }}
//           view={view}
//           onView={(newView) => setView(newView)}
//           header={false}
//           selectable={true}
//           eventPropGetter={eventStyleGetter}
//           components={{
//             toolbar: CustomToolbar,
//             dateCellWrapper: CustomDateCellWrapper,
//             header: CustomHeader,
//           }}
//         />
//       </div>
//     </>
//   );
// };

// export default MyCalendar;