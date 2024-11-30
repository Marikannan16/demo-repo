import React, { useEffect, useState } from 'react';
import "rsuite/dist/rsuite.min.css";
import { DatePicker } from "rsuite";
import { useSelector, useDispatch } from 'react-redux';
import { selectDashboardData, updateFilter, applyFilters, setCurrentPage } from './Dashboardslice';
import { TbReportAnalytics } from "react-icons/tb";
import Dummy from './Dummy';
import Chart from './Curve';
import companies from './companies';
import CircularProgressBar from './CircularProgressBar';
import logo from '../../images/logo.png';

import { LineChart, Line, XAxis, YAxis, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const CustomLegend = (props) => {
  const { payload } = props;
  return (
    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', marginBottom: '20px' }}>
      {payload.map((entry, index) => (
        <li key={`item-${index}`} style={{ margin: '0 10px', display: 'flex', alignItems: 'center' }}>
          <span style={{
            width: '12px',
            height: '12px',
            backgroundColor: entry.color,
            display: 'inline-block',
            marginRight: '5px'
          }} />
          {entry.dataKey}
        </li>
      ))}
    </ul>
  );
};
const Board = () => {

  const [totalclients, setTotalClients] = useState(180)
  const [state, setState] = useState(80)
  const [District, setDistrict] = useState(90)
  const [branch, setBranch] = useState(10)
  const [low, setLow] = useState(10)
  const [medium, setMedium] = useState(10)
  const [high, setHigh] = useState(8)
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const { filters } = useSelector(selectDashboardData);
  const dispatch = useDispatch();
  const handleChange = (filterType, value) => {
    dispatch(updateFilter({ filterType, value }));
  };
  useEffect(() => {
    dispatch(applyFilters());
  }, [filters, dispatch]);
  const handlePageSizeChange = (e) => {
    setItemsPerPage(Number(e.target.value));
  };
  const totalComplied = Chart.reduce((total, item) => total + item.Complied, 0);
  const totalNotComplied = Chart.reduce((total, item) => total + item.NotComplied, 0);
  const totalPartially = Chart.reduce((total, item) => total + item.Partially, 0);
  const totalOverdue = Chart.reduce((total, item) => total + item.Overdue, 0);

  const totalSum = totalComplied + totalNotComplied + totalPartially + totalOverdue;

  const pieData = [
    { name: 'Complied', value: totalComplied, percentage: ((totalComplied / totalSum) * 100).toFixed(2) },
    { name: 'Not Complied', value: totalNotComplied, percentage: ((totalNotComplied / totalSum) * 100).toFixed(2) },
    { name: ' Partially', value: totalPartially, percentage: ((totalPartially / totalSum) * 100).toFixed(2) },
    { name: 'Overdue', value: totalOverdue, percentage: ((totalOverdue / totalSum) * 100).toFixed(2) },
  ];

  const COLORS = ['#40bf40', '#f87171', ' #e4ba4e', '#FF8C00'];
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill="#11111"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="10px"
        fontWeight={"bold"}
      >
        {`${percentage}%`}
      </text>
    );
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const complianceData = useSelector((state) => state.dashboard);

  return (
    <div className="p-6 bg-white">
      <div className="flex space-x-4 p-4 bg-white-100">
        <select className="p-2 border border-selectbg rounded-lg focus:outline-none" value={filters.company} onChange={(e) => handleChange('company', e.target.value)}>
          <option value="">Company</option>
          <option value="Acme Corporation">Acme Corporation</option>
        </select>

        <select className="p-2 border border-selectbg rounded-lg focus:outline-none" value={filters.state} onChange={(e) => handleChange('state', e.target.value)}>
          <option value="">State</option>
          <option value="Tamilnadu">Tamilnadu</option>
          <option value="Mumbai">Mumbai</option>
        </select>

        <select className="p-2 border border-selectbg rounded-lg focus:outline-none" value={filters.branch} onChange={(e) => handleChange('branch', e.target.value)}>
          <option value="">Branch</option>
          <option value="Rayapuram">Rayapuram</option>
          <option value="Indira Nagar">Indira Nagar</option>
          <option value="Madurai">Madurai</option>
          <option value="Adayar">Adayar</option>
          <option value="Nagaon">Nagaon</option>
        </select>

        <select className="p-2 border border-selectbg rounded-lg focus:outline-none" value={filters.area} onChange={(e) => handleChange('area', e.target.value)}>
          <option value="">Area</option>
          <option value="Area1">Area 1</option>
          <option value="Area2">Area 2</option>
        </select>
        <select className="p-2 border border-selectbg rounded-lg focus:outline-none" value={filters.priority} onChange={(e) => handleChange('area', e.target.value)}>
          <option value="">Priority</option>
          <option value="Priority1">Priority 1</option>
          <option value="Priority"> Priority2</option>
        </select>
        <DatePicker block placeholder="Date Range" />
      </div>

      <div className='border rounded mt-2'>
        <div>
          <h5 className='font-semi bold ps-12 mt-3' >Assigned Clients</h5>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 mt-5 mb-5 font-ExtraLight  200">
          <div className=" p-5 ms-14  rounded-lg shadow-md w-3/4 h-32 border-l-4 border-l-purple-500 " style={{ backgroundColor: '#eeeef7', borderColor: '#0000cc' }}>
            <div className="flex items-center ">

              <div className="p-1 rounded " style={{ backgroundColor: '#0000cc' }}>
                <TbReportAnalytics style={{ color: 'white', fontSize: '30px' }} />
              </div>
              <div className="ms-5 ps-2">
                <h5>Total Clients</h5>
                <p className="text-xl font-semibold">{totalclients}</p>
              </div>
            </div>
          </div>

          <div className=" p-5 ms-1  rounded-lg shadow-md w-3/4 h-32 border-l-4 " style={{ backgroundColor: '#c1f0c1', borderColor: '#46d246' }}>
            <div className="flex items-center">
              <div className="p-1 rounded" style={{ backgroundColor: '#46d246' }}>
                <TbReportAnalytics style={{ color: 'white', fontSize: '30px' }} />
              </div>
              <div className="ms-5 ps-2">
                <h5>State</h5>
                <p className="text-xl font-semibold">{state}</p>
              </div>
            </div>
          </div>

          <div className=" p-5 rounded-lg -ms-12 shadow-md w-3/4 h-32 border-l-4 " style={{ backgroundColor: '#ffece6', borderColor: '#ff9d80' }}>
            <div className="flex items-center">
              <div className="p-1  rounded" style={{ backgroundColor: '#ff9d80' }}>
                <TbReportAnalytics style={{ color: 'white', fontSize: '30px' }} />
              </div>
              <div className="ms-5 ps-2">
                <h5>District</h5>
                <p className="text-xl font-semibold">{District}</p>
              </div>
            </div>
          </div>

          <div className=" p-5 rounded-lg -ms-24 shadow-md w-3/4 h-32 border-l-4 " style={{ backgroundColor: 'snow', borderColor: '#e6e600' }}>
            <div className="flex items-center">
              <div className="p-1 rounded" style={{ backgroundColor: '#e6e600' }}>
                <TbReportAnalytics style={{ color: 'white', fontSize: '30px' }} />
              </div>
              <div className="ms-5 ps-2">
                <h5>Branch</h5>
                <p className="text-xl font-semibold">{branch}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='border rounded  mt-8' style={{ height: '240px', width: '950px' }}>
        <div>
          <h5 className='font-semi bold ps-12 mt-3 mb-5 pb-5' >Client Priority</h5>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 mt-5 mb-5 ">
          <div className="p-5 ms-14 rounded-lg shadow-md  h-32 border-l-4 " style={{ backgroundColor: '#c4ede0', borderColor: '#36b089', width: '110%' }}>
            <div className="flex items-center">
              <div className="p-1 rounded" style={{ backgroundColor: '#36b089' }}>
                <TbReportAnalytics style={{ color: 'white', fontSize: '30px' }} />
              </div>
              <div className="ms-5 ps-2">
                <h5>Low</h5>
                <p className="text-xl font-semibold">{low}</p>
              </div>
            </div>
          </div>
          <div className=" p-5 ms-24 rounded-lg shadow-md h-32 border-l-4 " style={{ width: '110%', backgroundColor: '#e6e6e6', borderColor: '#003366' }}>
            <div className="flex items-center ">
              <div className="p-1  rounded " style={{ backgroundColor: '#0d3d6e' }}>
                <TbReportAnalytics style={{ color: 'white', fontSize: '30px' }} />
              </div>
              <div className="ms-5 ps-2">
                <h5>Medium</h5>
                <p className="text-xl font-semibold">{medium}</p>
              </div>
            </div>
          </div>
          <div className="p-5 rounded-lg ms-36 shadow-md h-32 border-l-4" style={{ backgroundColor: ' #fde8fd', borderColor: '#ff1a1a', width: '110%' }}>
            <div className="flex items-center">
              <div className="p-1 rounded" style={{ backgroundColor: '#ff1a1a' }}>
                <TbReportAnalytics style={{ color: 'white', fontSize: '30px' }} />
              </div>
              <div className="ms-5 ps-2">
                <h5>High</h5>
                <p className="text-xl font-semibold">{high}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border shadow-lg p-3 -mt-20" style={{ height: '240px', width: '300px', marginLeft: '16rem' }}>
            <h5 >Compliance status</h5>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={70}
                  dataKey="value"
                  isAnimationActive={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className='border mt-5 pe-4 ps-4 pb-4 rounded '>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
          <table class="w-full text-sm text-left rtl:text-right text-black">
            <thead class="text-xs text-black font-semibold">
              <tr className=" bg-gray-300">
                <th scope="col" class="px-6 py-3">S.No</th>
                <th scope="col" class="px-6 py-3">Date</th>
                <th scope="col" class="px-6 py-3">Company Name</th>
                <th scope="col" class="px-6 py-3">State</th>
                <th scope="col" class="px-6 py-3">Branch</th>
                <th scope="col" class="px-6 py-3">Activity</th>
                <th scope="col" class="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className='me-10'>
              {Dummy.map((row) => (
                <tr key={row.SNO}>
                  <td className="px-6 py-1 border-b border-gray-300">{row.SNO}</td>
                  <td className="px-2 py-1 border-b border-gray-300">{row.Date}</td>
                  <td className="px-2 py-1 border-b border-gray-300">
                    <div className='inline-flex'>
                      <img src={logo} alt='' width="30" className='mr-2 mt-2 rounded-full' />
                      <span className='mt-3'>{row.CompanyName}</span>
                    </div>
                  </td>
                  <td className="px-2 py-1 border-b border-gray-300">{row.State}</td>
                  <td className="px-2 py-1 border-b border-gray-300">{row.Branch}</td>
                  <td className="px-2 py-1 border-b border-gray-300">{row.Activity}</td>
                  <td className="px-2 py-1 border-b border-gray-300">
                    <span className={`px-2 py-1 flex items-center justify-center w-32 h-8 text-sm font-semibold leading-tight rounded-full 
                   ${row.Status === 'Not Complied' ? 'bg-red-400' : row.Status === 'Partially Complied' ? 'bg-amber-500' : row.Status === 'Complied' ? 'bg-green-400' : 'bg-gray-200'}
                   `}>{row.Status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col items-start pt-5">
          <div className="flex justify-between items-center w-full max-w-4xl">
            <div className="ml-4 inline-flex items-center">
              <span> Page </span>
              <select
                onChange={handlePageSizeChange}
                className="border rounded-md p-1 ml-2"
              >
                <option value={1}>1</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
              <span className="ml-2 inline-flex"> of {totalPages} </span>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentPage === 1 ? 'bg-yellow-600 text-white' : ''} disabled:opacity-50`}
              > &laquo;
              </button>

              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentPage === 1 ? 'bg-yellow-600 text-white' : 'bg-gray-200'} disabled:opacity-50`}
              >  &lt;
              </button>

              {totalPages > 1 && (
                <button
                  onClick={() => handlePageChange(1)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${currentPage === 1 ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`}
                >
                  1
                </button>
              )}

              {currentPage > 4 && <span>...</span>}

              {Array.from({ length: 5 }, (_, index) => {
                const page = currentPage - 2 + index;
                if (page > 1 && page < totalPages) {
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${currentPage === page ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`}
                    >
                      {page}
                    </button>
                  );
                }
                return null;
              })}

              {currentPage < totalPages - 3 && <span>...</span>}

              {totalPages > 1 && (
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${currentPage === totalPages ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`}
                >
                  {totalPages}
                </button>
              )}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentPage === totalPages ? 'bg-yellow-600 text-white' : 'bg-gray-200'} disabled:opacity-50`}
              >
                &gt;
              </button>

              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentPage === totalPages ? 'bg-yellow-600 text-white' : 'bg-gray-200'} disabled:opacity-50`}
              >
                &raquo;
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg border mt-5">
        <h6 className="mb-4">Status of Activities</h6>
        <div className="flex justify-between items-center -space-x-5">
          <div>
            <div className='ps-12 mt-3'>
              <lable>Complied </lable>
            </div>
            <CircularProgressBar
              value={complianceData.complied}
              label="Complied"
              color="#28a745"
            />
          </div>
          <div>
            <div className='ps-12 mt-3'>
              <label>Not Complied</label>
            </div>
            <CircularProgressBar
              value={complianceData.notComplied}
              label="Not Complied"
              color="#dc3545"
            />
          </div>
          <div>
            <div className='ps-9 mt-3'>
              <label>Partially Complied</label>
            </div>
            <CircularProgressBar
              value={complianceData.partiallyComplied}
              label="Partially Complied"
              color="#ffc107"
            />
          </div>
          <div>
            <div className='ps-12 mt-3'>
              <label>Overdue</label>
            </div>
            <CircularProgressBar
              value={complianceData.overdue}
              label="Overdue"
              color="#fd7e14"
            />
          </div>
        </div>
      </div>
      <div className='border rounded mt-5'>
        <h5 className='mt-4 ps-2 mb-4'>Compliance Status for the period April 2024 to August 2024</h5>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={Chart}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Legend verticalAlign='top' content={<CustomLegend />} />
            <Line type="monotone" dataKey="Complied" stroke="#40bf40" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="NotComplied" stroke="#f87171" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="Partially" stroke="#e4ba4e" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="Overdue" stroke="#ff8c00" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className='border mt-5 pe-4 ps-4 pb-4 rounded '>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
          <table class="w-full text-sm text-left rtl:text-right text-black">
            <thead class="text-xs text-black font-semibold">
              <tr className=" bg-gray-300">
                <th scope="col" class="px-6 py-3">S.No</th>
                <th scope="col" class="px-6 py-3">Company Name</th>
                <th scope="col" class="px-6 py-3">Complied</th>
                <th scope="col" class="px-6 py-3">NotComplied</th>
                <th scope="col" class="px-6 py-3">PartiallyComplied</th>
                <th scope="col" class="px-6 py-3">Overdue</th>
              </tr>
            </thead>
            <tbody className='me-10'>
              {companies.map((row) => (
                <tr key={row.SNO}>
                  <td className="px-6 py-1 border-b border-gray-300">{row.SNO}</td>
                  <td className="px-2 py-1 border-b border-gray-300">
                    <div className='inline-flex items-center'>
                      <img src={row.logo} alt='' width="30" className='mr-2 rounded-full' />
                      <span className='mt-1'>{row.companyname}</span>
                    </div>
                  </td>
                  <td className="px-2 py-1 border-b border-gray-300">
                    <div className="flex flex-col">
                      <span className="mb-1">{row.complied}</span>
                      <div className="w-40 bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{ width: `${row.complied}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>

                  <td className="px-2 py-1 border-b border-gray-300">
                    <div className="flex flex-col">
                      <span className="mb-1">{row.notComplied}</span>
                      <div className="w-40 bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-red-500 h-2.5 rounded-full"
                          style={{ width: `${row.notComplied}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>

                  <td className="px-2 py-1 border-b border-gray-300">
                    <div className="flex flex-col">
                      <span className="mb-1">{row.partiallyComplied}</span>
                      <div className="w-40 bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-yellow-500 h-2.5 rounded-full"
                          style={{ width: `${row.partiallyComplied}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>

                  <td className="px-2 py-1 border-b border-gray-300">
                    <div className="flex flex-col ">
                      <span className="mb-1">{row.overdue}</span>
                      <div className="w-40 bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-orange-500 h-2.5 rounded-full"
                          style={{ width: `${row.overdue}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col items-start pt-5">
          <div className="flex justify-between items-center w-full max-w-4xl">
            <div className="ml-4  inline-flex items-center">
              <span> Page </span>
              <select
                onChange={handlePageSizeChange}
                className="border rounded-md p-1 ml-2"
              >
                <option value={1}>1</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
              <span className="ml-2 inline-flex"> of {totalPages} </span>
            </div>

            <div className="flex items-end" >
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentPage === 1 ? 'bg-yellow-600 text-white' : ''} disabled:opacity-50`}
              >
                &laquo;
              </button>

              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentPage === 1 ? 'bg-yellow-600 text-white' : 'bg-gray-200'} disabled:opacity-50`}
              >
                &lt;
              </button>

              {totalPages > 1 && (
                <button
                  onClick={() => handlePageChange(1)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${currentPage === 1 ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`}
                >
                  1
                </button>
              )}

              {currentPage > 4 && <span>...</span>}

              {Array.from({ length: 5 }, (_, index) => {
                const page = currentPage - 2 + index;
                if (page > 1 && page < totalPages) {
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${currentPage === page ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`}
                    >
                      {page}
                    </button>
                  );
                }
                return null;
              })}

              {currentPage < totalPages - 3 && <span>...</span>}

              {totalPages > 1 && (
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${currentPage === totalPages ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`}
                >
                  {totalPages}
                </button>
              )}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentPage === totalPages ? 'bg-yellow-600 text-white' : 'bg-gray-200'} disabled:opacity-50`}
              >
                &gt;
              </button>

              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentPage === totalPages ? 'bg-yellow-600 text-white' : 'bg-gray-200'} disabled:opacity-50`}
              >
                &raquo;
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Board;


