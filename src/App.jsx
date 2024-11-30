// import React, { useState } from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import CreateCompany from './Pages/company/CreateCompany';
// import CreateBranch from './Pages/company/CreateBranch';
// import DemoCompany from './Pages/company/DemoCompany';
// import CreateUser from './Pages/user/CreateUser';
// import CreateCompliance from './Pages/compliance/CreateCompliance';
// import CreateCategory from './Pages/category/CreateCategory';
// import CreateSubCategory from './Pages/subCategory/CreateSubCategory';
// import Login from './login/Login';
// import ProtectedRoute from './Components/ProtectedRoutes';
// import ComplianceList from './Pages/compliance/ComplianceList';
// import Outlets from './Navbar/Outlets';
// import Index from './Pages/Dashboard/Admin';
// import CompanywiseReport from './Pages/Reports/CompanyWiseReport';
// import CategoryList from './Pages/category/CategoryList';
// import NatureofCompliance from './Pages/category/CreateNatureOfCompliance';
// import NatureComplianceList from './Pages/category/NatureComplianceList';
// import CreatesubCatList from './Pages/subCategory/CreateSubCatList';
// import SubCategoryList from './Pages/subCategory/SubCategoryList';
// import Viewsub from './Pages/subCategory/ViewSubCategory';
// import UserList from './Pages/user/UserList';
// import Container from './Navbar/Container';
// import ComplianceReport from './Pages/Reports/ComplianceReport';
// import CalendarModule from './Pages/CompanyMaster/CalendarModule';
// import Staff from './Pages/Dashboard/StaffDashBoard';
// import ClientDash from './Pages/Dashboard/ClientDash';
// import ClientManagement from './Pages/company/ClientManagement';
// import ClientBranchManagement from './Pages/company/ClientBranchManagement';
// import CalendarComponent from './Pages/CompanyMaster/CalendarModule';
// import MyCalendar from './Pages/company/MyCalendar';
// import CompanyComplianceList from './Pages/company/CompanyComplianceList';
// import Consolidate from './Pages/compliancefilling/Consolidate';
// import CompanyCompliance from './Pages/company/CompanyCompliance';
// import Message from './Pages/notification/Message';
// import Error from './Components/Error'
// const App = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };
//   const closeSidebar = () => {
//     setIsSidebarOpen(false);
//   };

//   return (
//     <BrowserRouter>
//       {/* <div className="flex">
//         <div
//           className={`shadow-lg ${isSidebarOpen ? 'translate-x-0 w-60' : '-translate-x-full w-0'}
//            transition-transform-w duration-300 ease-in-out fixed lg:static`}
//         >
//           <SideNavbar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
//         </div>
//         <div className="flex-1">
//           <MainNavbar toggleSidebar={toggleSidebar} />
//           <div className="p-4"> */}
//             <Routes>
//               <Route path="/" element={<Login/>} />
//               <Route element={<Container />}>
//                 <Route path="/home" element={<Index/>}/>
//                 <Route path="/company" element={<CreateCompany />} />
//                 <Route path="/branch" element={<CreateBranch />} />
//                 <Route path="/user" element={<CreateUser />} />
//                 <Route path="/userlist" element={<UserList/>} />
//                 <Route path="/compliance" element={<CreateCompliance />} />
//                 <Route path="/compliancelist" element={<ComplianceList/>}/>
//                 <Route path="/category" element={<CreateCategory />} />
//                 <Route path="/categorylist" element={<CategoryList/>} />
//                 <Route path="/createnaturecompliance" element={<NatureofCompliance/>} />
//                 <Route path="/naturecompliancelist" element={<NatureComplianceList/>} />
//                 <Route path="/createsubcategory" element={<CreateSubCategory />} />
//                 <Route path="/createsubcatlist" element={<CreatesubCatList />} />
//                 <Route path="/subcatlist" element={<SubCategoryList />} />
//                 <Route path="/viewsubcatlist" element={<Viewsub />} />
//                 <Route path="/companyreport" element={<CompanywiseReport />} />
//                 <Route path="/compliancereport" element={<ComplianceReport />} />
//                 <Route path="/calendar" element={<MyCalendar/>} />
//                 <Route path="/dash" element={<Staff />} />
//                 <Route path="/admindash" element={<Index/>} />
//                 <Route path="/clientdash" element={<ClientDash/>} />
//                 <Route path="/clientmanagement" element={<ClientManagement/>} />
//                 <Route path="/clientbranchmanagement" element={<ClientBranchManagement/>} />
//                 <Route path="/companycompliancelist" element={<CompanyComplianceList/>} />
//                 <Route path="/compliancefilling" element={<Consolidate/>} />
//                 <Route path="/companycompliance" element={<CompanyCompliance/>} />
//                 <Route path="/notification" element={<Message/>} />
//                 <Route path="*" element={<Error />} />
                  // <Route path="/subcategorycreate" element={<CreatesubCatList/>} />
                  // <Route path="/subcategoryedit" element={<EditSubCategory/>} />
                  // <Route path="/subcategoryview" element={<ViewSubCategory/>} />


//                 {/* <Route path="/reportCompany" element={<CompanywiseReport/>}/> */}
//               </Route>
//             </Routes>
//           {/* </div>
//         </div>
//       </div> */}
//     </BrowserRouter>
//   );
// };

// export default App;

import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const CreateCompany = lazy(() => import('./Pages/company/CreateCompany'));
const CreateBranch = lazy(() => import('./Pages/company/CreateBranch'));
// import DemoCompany from './Pages/company/DemoCompany';
const CreateUser = lazy(() => import('./Pages/user/CreateUser'));
const CreateCompliance = lazy(() => import('./Pages/compliance/CreateCompliance'));
const CreateCategory = lazy(() => import('./Pages/category/CreateCategory'));
const CreateSubCategory = lazy(() => import('./Pages/subCategory/CreateSubCategory'));
const Login = lazy(() => import('./login/Login'));
// import ProtectedRoute from './Components/ProtectedRoutes';
const ComplianceList = lazy(() => import('./Pages/compliance/ComplianceList'));
// import Outlets from './Navbar/Outlets';
const Index = lazy(() => import('./Pages/Dashboard/Admin'));
const CompanywiseReport = lazy(() => import('./Pages/Reports/CompanyWiseReport'));
const CategoryList = lazy(() => import('./Pages/category/CategoryList'));
const NatureofCompliance = lazy(() => import('./Pages/category/CreateNatureOfCompliance'));
const NatureComplianceList = lazy(() => import('./Pages/category/NatureComplianceList'));
const SubCategoryList = lazy(() => import('./Pages/subCategory/SubCategoryList'));
const Viewsub = lazy(() => import('./Pages/subCategory/ViewSubCategory'));
const UserList = lazy(() => import('./Pages/user/UserList'));
const Container = lazy(() => import('./Navbar/Container'));
const ComplianceReport = lazy(() => import('./Pages/Reports/ComplianceReport'));
import CalendarModule from './Pages/CompanyMaster/CalendarModule';
const Staff = lazy(() => import('./Pages/Dashboard/StaffDashBoard'));
const ClientDash = lazy(() => import('./Pages/Dashboard/ClientDash'));
const ClientManagement = lazy(() => import('./Pages/company/ClientManagement'));
const ClientBranchManagement = lazy(() => import('./Pages/company/ClientBranchManagement'));
import CalendarComponent from './Pages/CompanyMaster/CalendarModule';
const MyCalendar = lazy(() => import('./Pages/company/MyCalendar'));
const CompanyComplianceList = lazy(() => import('./Pages/company/CompanyComplianceList'));
const Consolidate = lazy(() => import('./Pages/compliancefilling/Consolidate'));
const CompanyCompliance = lazy(() => import('./Pages/company/CompanyCompliance'));
const Message = lazy(() => import('./Pages/notification/Message'));
const EditCompliance = lazy(() => import('./Pages/compliance/EditCompliance'));
import './index.css';
const Error =lazy(()=> import('./Components/Error'));
const CreatesubCatList=lazy(()=>import('./Pages/subCategory/CreateSubCatList'));
const EditSubCategory=lazy(()=>import('./Pages/subCategory/EditSubcategorylist'));
const ViewSubCategory=lazy(()=>import('./Pages/subCategory/ViewSubCategory'));
const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <BrowserRouter>
      <Suspense fallback={<div className='grid place-items-center h-screen' ><span id="loader" ></span></div>}>
        {/* <div className="flex">
        <div
          className={`shadow-lg ${isSidebarOpen ? 'translate-x-0 w-60' : '-translate-x-full w-0'}
           transition-transform-w duration-300 ease-in-out fixed lg:static`}
        >
          <SideNavbar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
        </div>
        <div className="flex-1">
          <MainNavbar toggleSidebar={toggleSidebar} />
          <div className="p-4"> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<Container />} >
            <Route path="/home" element={<Index />} />
            <Route path="*" element={<Error />} />
            <Route path="/company" element={<CreateCompany />} />
            <Route path="/branch" element={<CreateBranch />} />
            <Route path="/user" element={<CreateUser />} />
            <Route path="/userlist" element={<UserList />} />
            <Route path="/compliance" element={<CreateCompliance />} />
            <Route path="/editcompliance" element={<EditCompliance />} />
            <Route path="/compliancelist" element={<ComplianceList />} />
            <Route path="/category" element={<CreateCategory />} />
            <Route path="/categorylist" element={<CategoryList />} />
            <Route path="/createnaturecompliance" element={<NatureofCompliance />} />
            <Route path="/naturecompliancelist" element={<NatureComplianceList />} />
            <Route path="/createsubcategory" element={<CreateSubCategory />} />
            {/* <Route path="/createsubcatlist" element={<CreatesubCatList />} /> */}
            <Route path="/subcatlist" element={<SubCategoryList />} />
            <Route path="/viewsubcatlist" element={<Viewsub />} />
            <Route path="/companyreport" element={<CompanywiseReport />} />
            <Route path="/compliancereport" element={<ComplianceReport />} />
            <Route path="/calendar" element={<MyCalendar />} />
            <Route path="/dash" element={<Staff />} />
            <Route path="/admindash" element={<Index />} />
            <Route path="/clientdash" element={<ClientDash />} />
            <Route path="/clientmanagement" element={<ClientManagement />} />
            <Route path="/clientbranchmanagement" element={<ClientBranchManagement />} />
            <Route path="/companycompliancelist" element={<CompanyComplianceList />} />
            <Route path="/compliancefilling" element={<Consolidate />} />
            <Route path="/companycompliance" element={<CompanyCompliance />} />
            <Route path="/notification" element={<Message />} />
            <Route path="/subcategorycreate" element={<CreatesubCatList />} />
            <Route path="/subcategoryedit" element={<EditSubCategory />} />
            <Route path="/subcategoryview" element={<ViewSubCategory />} />


            {/* <Route path="/reportCompany" element={<CompanywiseReport/>}/> */}
          </Route>
        </Routes>
        {/* </div>
        </div>
      </div> */}
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
