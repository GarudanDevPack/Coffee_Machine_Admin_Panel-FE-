
// import React, { useEffect, useState } from 'react';

// import { useDispatch, useSelector } from 'react-redux'

// import {
// CCard,
// CCardBody,
// CCardHeader,
// CCol,
// CProgress,
// CRow
// } from '@coreui/react'

// import {
 
//   cilUser,
//   cilUserFemale,
// } from '@coreui/icons'


// import GlobalAlertMonitor from '../../components/GlobalAlertMonitor'
// import WidgetsDropdown from '../widgets/WidgetsDropdown'
// import MainChart from './MainChart'
// import { fetchClientsForDashBoard } from '../../actions/dashboardActions';
// import { useParams } from 'react-router-dom';

// const colors = ['primary', 'success', 'warning', 'danger', 'info', 'secondary'];

// const Dashboard = () => {
//    const dispatch = useDispatch();
  
//   // Get data from Redux store (same as WidgetsDropdown)
//   const dashboardState = useSelector((state) => state.dashboard);
//   const { 
//     clientStats = { 
//       machineStats: [], 
//       monthlyBreakdown: [],
//       monthlyItemAnalysis: [],
//       overallItemStats: []
//     }, 
//     loading = false, 
//     errors = {} 
//   } = dashboardState || {};

//   // ALL HOOKS MUST BE DECLARED FIRST - BEFORE ANY CONDITIONAL RETURNS
//     const [chartData, setChartData] = useState([]);
//     const authUser = useSelector((state) => state.auth.user)
//     //const [showPopup, setShowPopup] = useState(false);
//     const clientId = authUser?.id
//     const [monthlyItemData, setMonthlyItemData] = useState([]);
//     const [itemColors, setItemColors] = useState({});

//     const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//   // Handle client ID prompt (similar to WidgetsDropdown)
//  // useEffect(() => {
//   //   if (showPopup && !client_id) {
//   //     const inputId = prompt("Enter Client ID (e.g., 1):");
//   //     if (inputId) {
//   //       setClientId(inputId);
//   //       setShowPopup(false);
//   //     } else {
//   //       setShowPopup(false);
//   //     }
//   //   }
//   // }, [showPopup, client_id]);

//   // Fetch data when clientId changes
//  useEffect(() => {
//   if (clientId) {
//     dispatch(fetchClientsForDashBoard(clientId))
//       .then(data => {
//         console.log('Fetched dashboard data:', data)
//       })
//       .catch(err => {
//         console.error('Dashboard fetch error:', err)
//       })
//   }
// }, [clientId, dispatch])

//   // Process chart data when clientStats changes
//   useEffect(() => {
//     if (clientStats.monthlyBreakdown && clientStats.monthlyBreakdown.length > 0) {
//       const monthlyData = clientStats.monthlyBreakdown;
      
//       // Create data for all months (January-July 2025)
//       const fullYearData = Array.from({ length: 12 }, (_, i) => {
//         const month = i + 1; // 1-7 for January-July
//         const monthData = monthlyData.find(d => d.month === month && d.year === 2025);
//         return {
//           month,
//           orders: monthData ? monthData.orders : 0,
//           sales: monthData ? monthData.sales : 0,
//           customers: monthData ? monthData.customers : 0
//         };
//       });
      
//       setChartData(fullYearData);
//       console.log('Chart data updated:', fullYearData);
//     }
//   }, [clientStats]);

//   // Process monthly item data
//   useEffect(() => {
//     if (clientStats.monthlyItemAnalysis && clientStats.monthlyItemAnalysis.length > 0) {
//       const itemAnalysis = clientStats.monthlyItemAnalysis;
      
//       // Get unique items and assign colors
//       const uniqueItems = [...new Set(itemAnalysis.map(item => item.item_name))];
//       const colorMap = {};
//       uniqueItems.forEach((item, index) => {
//         colorMap[item] = colors[index % colors.length];
//       });
//       setItemColors(colorMap);
      
//       // Create monthly data structure
//       const monthlyData = Array.from({ length: 12 }, (_, i) => {
//         const month = i + 1;
//         const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','aug','sep','oct','nov','dec'][i];
        
//         // Get items for this month
//         const monthItems = itemAnalysis.filter(item => 
//           item.month === month && item.year === 2025
//         );
        
//         // Calculate total orders for this month to get percentages
//         const totalOrders = monthItems.reduce((sum, item) => sum + item.totalOrders, 0);
        
//         return {

//           month,
//           monthName,
//           items: monthItems.map(item => ({
//             name: item.item_name,
//             orders: item.totalOrders,
//             quantity: item.totalQuantity,
//             sales: item.totalSales,
//             percentage: totalOrders > 0 ? Math.round((item.totalOrders / totalOrders) * 100) : 0,
//             color: colorMap[item.item_name]
//           })),
//           totalOrders
//         };
//       });
      
//       setMonthlyItemData(monthlyData);
//       console.log('Monthly item data:', monthlyData);
//     }
//   }, [clientStats]);

//   // NOW HANDLE CONDITIONAL RENDERING AFTER ALL HOOKS ARE DECLARED
//   const progressGroupExample2 = [
//     { title: 'Male', icon: cilUser, value: 53 },
//     { title: 'Female', icon: cilUserFemale, value: 43 },
//   ];

//   // Show loading state
//   if (loading.clientStats) {
//     return <div className="text-center">Loading dashboard data...</div>;
//   }

//   // Show error state
//   if (errors.clientStats) {
//     return (
//       <div className="text-center text-danger">
//         Error loading data: {errors.clientStats}
//         <br />
//         <button 
//           className="btn btn-primary mt-2" 
//           onClick={() => setShowPopup(true)}
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <>
//       <WidgetsDropdown className="mb-4" />
//        <GlobalAlertMonitor />
//       <CCard className="mb-4">
//         <CCardBody>
//           <CRow>
//             <CCol sm={5}>
//               <h4 id="traffic" className="card-title mb-0">
//                 Orders
//               </h4>
//               <div className="small text-body-secondary">January - July 2025</div>
//             </CCol>
//             <CCol sm={7} className="d-none d-md-block">
//               {/* Optional buttons remain here */}
//             </CCol>
//           </CRow>
          
//           {chartData.length === 0 ? (
//             <div>Loading chart...</div>
//           ) : (
//             <MainChart 
//               data={chartData.map(item => item.orders)}
//               labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','aug','sep','oct','nov','dec']}
//             />
//           )}
//         </CCardBody>
//       </CCard>
      
//       <CRow>
//         <CCol xs>
//           <CCard className="mb-4">
//             <CCardHeader>Monthly Item Analysis</CCardHeader>
//             <CCardBody>
//               <CRow>
//                 <CCol xs={12} md={6} xl={6}>
//                   <hr className="mt-0" />
//                   {progressGroupExample2.map((item, index) => (
//                     <div className="progress-group mb-4" key={index}>
//                       {/* Progress bars for gender data if needed */}
//                     </div>
//                   ))}
//                 </CCol>
//               </CRow>
//               <CRow>
//                 <CCol xs={12} md={8} xl={8}>
//                   <hr className="mt-0" />
//                   {monthlyItemData.map((monthData, monthIndex) => (
//                     <div key={monthIndex} className="mb-4">
//                       <div className="mb-3">
//                         <h6 className="text-primary">{monthData.monthName} 2025</h6>
//                         <small className="text-body-secondary">
//                           Total Orders: {monthData.totalOrders}
//                         </small>
//                       </div>
                      
//                       {monthData.items.length > 0 ? (
//                         monthData.items.map((item, itemIndex) => (
//                           <div className="progress-group mb-3" key={itemIndex}>
//                             <div className="progress-group-prepend">
//                               <span className="text-body-secondary small">
//                                 {item.name}
//                               </span>
//                               <span className="ms-auto text-body-secondary small">
//                                 {item.orders} orders ({item.percentage}%)
//                               </span>
//                             </div>
//                             <div className="progress-group-bars">
//                               <CProgress 
//                                 thin 
//                                 color={item.color} 
//                                 value={item.percentage} 
//                                 className="mb-1"
//                               />
//                             </div>
//                             <div className="small text-body-secondary">
//                               Quantity: {item.quantity} | Sales: LKR {item.sales}
//                             </div>
//                           </div>
//                         ))
//                       ) : (
//                         <div className="text-body-secondary small mb-3">
//                           No orders this month
//                         </div>
//                       )}
                      
//                       {monthIndex < monthlyItemData.length - 1 && (
//                         <hr className="my-4" />
//                       )}
//                     </div>
//                   ))}
//                 </CCol>
                
//                 <CCol xs={12} md={4} xl={4}>
//                   <div className="sticky-top" style={{ top: '20px' }}>
//                     <h6 className="text-primary mb-3">Item Legend</h6>
//                     <hr className="mt-0" />
                    
//                     {clientStats.overallItemStats && clientStats.overallItemStats.length > 0 ? (
//                       clientStats.overallItemStats.map((item, index) => (
//                         <div key={index} className="d-flex align-items-center mb-3">
//                           <div 
//                             className={`rounded-circle me-3`}
//                             style={{
//                               width: '12px',
//                               height: '12px',
//                               backgroundColor: itemColors[item.item_name] ? 
//                                 `var(--cui-${itemColors[item.item_name]})` : 
//                                 'var(--cui-info)'
//                             }}
//                           ></div>
//                           <div className="flex-grow-1">
//                             <div className="fw-semibold small">{item.item_name}</div>
//                             <div className="text-body-secondary small">
//                               Total: {item.totalOrders} orders
//                             </div>
//                             <div className="text-body-secondary small">
//                               Quantity: {item.totalQuantity}
//                             </div>
//                             <div className="text-body-secondary small">
//                               Sales: LKR {item.totalSales}
//                             </div>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <div className="text-body-secondary small">
//                         No item data available
//                       </div>
//                     )}
                    
//                     <hr className="my-4" />
                    
//                     {/* Additional statistics */}
//                     <h6 className="text-primary mb-3">Summary</h6>
//                     <div className="mb-2">
//                       <div className="text-body-secondary small">Total Items</div>
//                       <div className="fw-semibold">
//                         {clientStats.overallItemStats ? clientStats.overallItemStats.length : 0}
//                       </div>
//                     </div>
//                     <div className="mb-2">
//                       <div className="text-body-secondary small">Total Orders</div>
//                       <div className="fw-semibold">
//                         {clientStats.overallItemStats ? 
//                           clientStats.overallItemStats.reduce((sum, item) => sum + item.totalOrders, 0) : 0
//                         }
//                       </div>
//                     </div>
//                     <div className="mb-2">
//                       <div className="text-body-secondary small">Total Sales</div>
//                       <div className="fw-semibold">
//                         LKR {clientStats.overallItemStats ? 
//                           clientStats.overallItemStats.reduce((sum, item) => sum + item.totalSales, 0) : 0
//                         }
//                       </div>
//                     </div>
//                   </div>
//                 </CCol>
//               </CRow>
//             </CCardBody>
//           </CCard>
//         </CCol>
//       </CRow>
//     </>
//   )
// }

// export default Dashboard
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux'
// import {
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CProgress,
//   CRow,
//   CButton,
//   CButtonGroup,
//   CDropdown,
//   CDropdownToggle,
//   CDropdownMenu,
//   CDropdownItem,
// } from '@coreui/react'
// import GlobalAlertMonitor from '../../components/GlobalAlertMonitor'
// import WidgetsDropdown from '../widgets/WidgetsDropdown'
// import MainChart from './MainChart'
// import { fetchClientsForDashBoard } from '../../actions/dashboardActions';
// import MachineChart from './MachineChart';
// const colors = ['primary', 'success', 'warning', 'danger', 'info', 'secondary'];

// const Dashboard = () => {
//   const dispatch = useDispatch();
  
//   const dashboardState = useSelector((state) => state.dashboard);
//   const { 
//     clientStats = { 
//       machineStats: [], 
//       monthlyBreakdown: [],
//       monthlyItemAnalysis: [],
//       overallItemStats: [],
//       availableYears: []
//     }, 
//     loading = false, 
//     errors = {} 
//   } = dashboardState || {};

//   const [chartData, setChartData] = useState([]);
//   const authUser = useSelector((state) => state.auth.user)
//   const clientId = authUser?.id
//   const [monthlyItemData, setMonthlyItemData] = useState([]);
//   const [itemColors, setItemColors] = useState({});
  
//   // Filter states
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [selectedMonth, setSelectedMonth] = useState(null); // null = all months
//   const [filterMode, setFilterMode] = useState('yearly'); // 'yearly' or 'monthly'

//   const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//   // Fetch data when clientId or filters change
//   useEffect(() => {
//     if (clientId) {
//       const filters = {
//         year: selectedYear,
//         ...(filterMode === 'monthly' && selectedMonth ? { month: selectedMonth } : {})
//       };
      
//       dispatch(fetchClientsForDashBoard(clientId, filters))
//         .then(data => {
//           console.log('Fetched dashboard data:', data)
//         })
//         .catch(err => {
//           console.error('Dashboard fetch error:', err)
//         })
//     }
//   }, [clientId, selectedYear, selectedMonth, filterMode, dispatch])

//   // Process chart data when clientStats changes
//   useEffect(() => {
//     if (clientStats.monthlyBreakdown && clientStats.monthlyBreakdown.length > 0) {
//       const monthlyData = clientStats.monthlyBreakdown;
      
//       // Create data for all months
//       const fullYearData = Array.from({ length: 12 }, (_, i) => {
//         const month = i + 1;
//         const monthData = monthlyData.find(d => d.month === month && d.year === selectedYear);
//         return {
//           month,
//           orders: monthData ? monthData.orders : 0,
//           sales: monthData ? monthData.sales : 0,
//           customers: monthData ? monthData.customers : 0
//         };
//       });
      
//       setChartData(fullYearData);
//     }
//   }, [clientStats, selectedYear]);

//   // Process monthly item data
//   useEffect(() => {
//     if (clientStats.monthlyItemAnalysis && clientStats.monthlyItemAnalysis.length > 0) {
//       const itemAnalysis = clientStats.monthlyItemAnalysis;
      
//       const uniqueItems = [...new Set(itemAnalysis.map(item => item.item_name))];
//       const colorMap = {};
//       uniqueItems.forEach((item, index) => {
//         colorMap[item] = colors[index % colors.length];
//       });
//       setItemColors(colorMap);
      
//       const monthlyData = Array.from({ length: 12 }, (_, i) => {
//         const month = i + 1;
//         const monthName = monthNames[i];
        
//         const monthItems = itemAnalysis.filter(item => 
//           item.month === month && item.year === selectedYear
//         );
        
//         const totalOrders = monthItems.reduce((sum, item) => sum + item.totalOrders, 0);
        
//         return {
//           month,
//           monthName,
//           items: monthItems.map(item => ({
//             name: item.item_name,
//             orders: item.totalOrders,
//             quantity: item.totalQuantity,
//             sales: item.totalSales,
//             percentage: totalOrders > 0 ? Math.round((item.totalOrders / totalOrders) * 100) : 0,
//             color: colorMap[item.item_name]
//           })),
//           totalOrders
//         };
//       });
      
//       setMonthlyItemData(monthlyData);
//     }
//   }, [clientStats, selectedYear]);

//   // Handle filter changes
//   const handleYearChange = (year) => {
//     setSelectedYear(year);
//     setSelectedMonth(null); // Reset month when year changes
//   };

//   const handleMonthChange = (month) => {
//     setSelectedMonth(month);
//   };

//   const handleFilterModeChange = (mode) => {
//     setFilterMode(mode);
//     if (mode === 'yearly') {
//       setSelectedMonth(null);
//     }
//   };

//   if (loading.clientStats) {
//     return <div className="text-center">Loading dashboard data...</div>;
//   }

//   if (errors.clientStats) {
//     return (
//       <div className="text-center text-danger">
//         Error loading data: {errors.clientStats}
//       </div>
//     );
//   }

//   return (
//     <>
//       <WidgetsDropdown className="mb-4" />
//       <GlobalAlertMonitor />
      
//       {/* Filter Controls */}
//       <CCard className="mb-4">
//         <CCardBody>
//           <CRow className="align-items-center">
//             <CCol sm={12} md={6} className="mb-3 mb-md-0">
//               <h6 className="mb-2">Filter Mode</h6>
//               <CButtonGroup>
//                 <CButton 
//                   color={filterMode === 'yearly' ? 'primary' : 'secondary'}
//                   onClick={() => handleFilterModeChange('yearly')}
//                 >
//                   Yearly View
//                 </CButton>
//                 <CButton 
//                   color={filterMode === 'monthly' ? 'primary' : 'secondary'}
//                   onClick={() => handleFilterModeChange('monthly')}
//                 >
//                   Monthly View
//                 </CButton>
//               </CButtonGroup>
//             </CCol>
            
//             <CCol sm={12} md={6}>
//               <CRow>
//                 <CCol xs={6}>
//                   <h6 className="mb-2">Year</h6>
//                   <CDropdown>
//                     <CDropdownToggle color="info">
//                       {selectedYear}
//                     </CDropdownToggle>
//                     <CDropdownMenu>
//                       {clientStats.availableYears && clientStats.availableYears.length > 0 ? (
//                         clientStats.availableYears.map(year => (
//                           <CDropdownItem 
//                             key={year}
//                             onClick={() => handleYearChange(year)}
//                             active={selectedYear === year}
//                           >
//                             {year}
//                           </CDropdownItem>
//                         ))
//                       ) : (
//                         [2024, 2025].map(year => (
//                           <CDropdownItem 
//                             key={year}
//                             onClick={() => handleYearChange(year)}
//                             active={selectedYear === year}
//                           >
//                             {year}
//                           </CDropdownItem>
//                         ))
//                       )}
//                     </CDropdownMenu>
//                   </CDropdown>
//                 </CCol>
                
//                 {filterMode === 'monthly' && (
//                   <CCol xs={6}>
//                     <h6 className="mb-2">Month</h6>
//                     <CDropdown>
//                       <CDropdownToggle color="info">
//                         {selectedMonth ? monthNames[selectedMonth - 1] : 'All Months'}
//                       </CDropdownToggle>
//                       <CDropdownMenu>
//                         <CDropdownItem 
//                           onClick={() => handleMonthChange(null)}
//                           active={selectedMonth === null}
//                         >
//                           All Months
//                         </CDropdownItem>
//                         {monthNames.map((month, index) => (
//                           <CDropdownItem 
//                             key={index}
//                             onClick={() => handleMonthChange(index + 1)}
//                             active={selectedMonth === index + 1}
//                           >
//                             {month}
//                           </CDropdownItem>
//                         ))}
//                       </CDropdownMenu>
//                     </CDropdown>
//                   </CCol>
//                 )}
//               </CRow>
//             </CCol>
//           </CRow>
//         </CCardBody>
//       </CCard>

//       {/* Orders Chart */}
//       <CCard className="mb-4">
//         <CCardBody>
//           <CRow>
//             <CCol sm={5}>
//               <h4 id="traffic" className="card-title mb-0">
//                 Orders
//               </h4>
//               <div className="small text-body-secondary">
//                 {filterMode === 'monthly' && selectedMonth 
//                   ? `${monthNames[selectedMonth - 1]} ${selectedYear}`
//                   : `${selectedYear}`
//                 }
//               </div>
//             </CCol>
//           </CRow>
          
//           {chartData.length === 0 ? (
//             <div>Loading chart...</div>
//           ) : (
//             <MainChart 
//               data={chartData.map(item => item.orders)}
//               labels={monthNames}
//             />
//           )}
//         </CCardBody>
//       </CCard>

//       {/* Machine Sales Chart */}
//       <CCard className="mb-4">
//         <CCardHeader>Machine Sales Performance</CCardHeader>
//         <CCardBody>
//           {clientStats.machineStats && clientStats.machineStats.length > 0 ? (
//             <MachineChart 
//               data={clientStats.machineStats}
//               year={selectedYear}
//               month={selectedMonth}
//             />
//           ) : (
//             <div className="text-center text-body-secondary">
//               No machine data available
//             </div>
//           )}
//         </CCardBody>
//       </CCard>
      
//       {/* Monthly Item Analysis */}
//       <CRow>
//         <CCol xs>
//           <CCard className="mb-4">
//             <CCardHeader>Monthly Item Analysis</CCardHeader>
//             <CCardBody>
//               <CRow>
//                 <CCol xs={12} md={8} xl={8}>
//                   <hr className="mt-0" />
//                   {monthlyItemData.map((monthData, monthIndex) => (
//                     <div key={monthIndex} className="mb-4">
//                       <div className="mb-3">
//                         <h6 className="text-primary">{monthData.monthName} {selectedYear}</h6>
//                         <small className="text-body-secondary">
//                           Total Orders: {monthData.totalOrders}
//                         </small>
//                       </div>
                      
//                       {monthData.items.length > 0 ? (
//                         monthData.items.map((item, itemIndex) => (
//                           <div className="progress-group mb-3" key={itemIndex}>
//                             <div className="progress-group-prepend">
//                               <span className="text-body-secondary small">
//                                 {item.name}
//                               </span>
//                               <span className="ms-auto text-body-secondary small">
//                                 {item.orders} orders ({item.percentage}%)
//                               </span>
//                             </div>
//                             <div className="progress-group-bars">
//                               <CProgress 
//                                 thin 
//                                 color={item.color} 
//                                 value={item.percentage} 
//                                 className="mb-1"
//                               />
//                             </div>
//                             <div className="small text-body-secondary">
//                               Quantity: {item.quantity} | Sales: LKR {item.sales}
//                             </div>
//                           </div>
//                         ))
//                       ) : (
//                         <div className="text-body-secondary small mb-3">
//                           No orders this month
//                         </div>
//                       )}
                      
//                       {monthIndex < monthlyItemData.length - 1 && (
//                         <hr className="my-4" />
//                       )}
//                     </div>
//                   ))}
//                 </CCol>
                
//                 <CCol xs={12} md={4} xl={4}>
//                   <div className="sticky-top" style={{ top: '20px' }}>
//                     <h6 className="text-primary mb-3">Item Legend</h6>
//                     <hr className="mt-0" />
                    
//                     {clientStats.overallItemStats && clientStats.overallItemStats.length > 0 ? (
//                       clientStats.overallItemStats.map((item, index) => (
//                         <div key={index} className="d-flex align-items-center mb-3">
//                           <div 
//                             className={`rounded-circle me-3`}
//                             style={{
//                               width: '12px',
//                               height: '12px',
//                               backgroundColor: itemColors[item.item_name] ? 
//                                 `var(--cui-${itemColors[item.item_name]})` : 
//                                 'var(--cui-info)'
//                             }}
//                           ></div>
//                           <div className="flex-grow-1">
//                             <div className="fw-semibold small">{item.item_name}</div>
//                             <div className="text-body-secondary small">
//                               Total: {item.totalOrders} orders
//                             </div>
//                             <div className="text-body-secondary small">
//                               Quantity: {item.totalQuantity}
//                             </div>
//                             <div className="text-body-secondary small">
//                               Sales: LKR {item.totalSales}
//                             </div>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <div className="text-body-secondary small">
//                         No item data available
//                       </div>
//                     )}
                    
//                     <hr className="my-4" />
                    
//                     <h6 className="text-primary mb-3">Summary</h6>
//                     <div className="mb-2">
//                       <div className="text-body-secondary small">Total Items</div>
//                       <div className="fw-semibold">
//                         {clientStats.overallItemStats ? clientStats.overallItemStats.length : 0}
//                       </div>
//                     </div>
//                     <div className="mb-2">
//                       <div className="text-body-secondary small">Total Orders</div>
//                       <div className="fw-semibold">
//                         {clientStats.overallItemStats ? 
//                           clientStats.overallItemStats.reduce((sum, item) => sum + item.totalOrders, 0) : 0
//                         }
//                       </div>
//                     </div>
//                     <div className="mb-2">
//                       <div className="text-body-secondary small">Total Sales</div>
//                       <div className="fw-semibold">
//                         LKR {clientStats.overallItemStats ? 
//                           clientStats.overallItemStats.reduce((sum, item) => sum + item.totalSales, 0).toFixed(2) : 0
//                         }
//                       </div>
//                     </div>
//                   </div>
//                 </CCol>
//               </CRow>
//             </CCardBody>
//           </CCard>
//         </CCol>
//       </CRow>
//     </>
//   )
// }

// export default Dashboard
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux'
// import {
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CProgress,
//   CRow,
//   CButton,
//   CButtonGroup,
//   CDropdown,
//   CDropdownToggle,
//   CDropdownMenu,
//   CDropdownItem,
//   CBadge,
// } from '@coreui/react'
// // REMOVED: GlobalAlertMonitor - this was causing the popup alerts
// // import GlobalAlertMonitor from '../../components/GlobalAlertMonitor'
// import WidgetsDropdown from '../widgets/WidgetsDropdown'
// import MainChart from './MainChart'
// import { fetchClientsForDashBoard } from '../../actions/dashboardActions';
// import MachineChart from './MachineChart';

// const colors = ['primary', 'success', 'warning', 'danger', 'info', 'secondary'];

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const dashboardState = useSelector((state) => state.dashboard);
//   const {
//     clientStats = {
//       machineStats: [],
//       monthlyBreakdown: [],
//       monthlyItemAnalysis: [],
//       overallItemStats: [],
//       availableYears: [],
//       isSuperAdmin: false
//     },
//     loading = false,
//     errors = {}
//   } = dashboardState || {};

//   const [chartData, setChartData] = useState([]);
//   const authUser = useSelector((state) => state.auth.user)
//   const clientId = authUser?.id
//   const isSuperAdmin = authUser?.role === 'super_admin' || 
//                        authUser?.role === 'admin' || 
//                        authUser?.is_super_admin === true || 
//                        authUser?.user_type === 'super_admin' || 
//                        authUser?.userType === 'super_admin';

//   const [monthlyItemData, setMonthlyItemData] = useState([]);
//   const [itemColors, setItemColors] = useState({});

//   // Filter states
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [selectedMonth, setSelectedMonth] = useState(null);
//   const [filterMode, setFilterMode] = useState('yearly');

//   const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//   // Fetch dashboard data - FIXED: Silent fetch without alerts
//   useEffect(() => {
//     if (clientId || isSuperAdmin) {
//       const filters = {
//         year: selectedYear,
//         ...(filterMode === 'monthly' && selectedMonth ? { month: selectedMonth } : {})
//       };
      
//       const effectiveClientId = isSuperAdmin ? 'all' : clientId;
      
//       // Silent fetch - no error handling that triggers alerts
//       dispatch(fetchClientsForDashBoard(effectiveClientId, filters, isSuperAdmin))
//         .catch(() => {
//           // Silently catch errors - no user-facing alerts
//           console.log('Dashboard fetch completed');
//         });
//     }
//   }, [clientId, selectedYear, selectedMonth, filterMode, isSuperAdmin, dispatch])

//   // Process chart data
//   useEffect(() => {
//     if (clientStats.monthlyBreakdown && clientStats.monthlyBreakdown.length > 0) {
//       const monthlyData = clientStats.monthlyBreakdown;

//       if (filterMode === 'monthly' && selectedMonth) {
//         const monthData = monthlyData.find(d => d.month === selectedMonth && d.year === selectedYear);
//         if (monthData) {
//           setChartData([{
//             month: selectedMonth,
//             orders: monthData.orders,
//             sales: monthData.sales,
//             customers: monthData.customers
//           }]);
//         } else {
//           setChartData([]);
//         }
//       } else {
//         const fullYearData = Array.from({ length: 12 }, (_, i) => {
//           const month = i + 1;
//           const monthData = monthlyData.find(d => d.month === month && d.year === selectedYear);
//           return {
//             month,
//             orders: monthData ? monthData.orders : 0,
//             sales: monthData ? monthData.sales : 0,
//             customers: monthData ? monthData.customers : 0
//           };
//         });
//         setChartData(fullYearData);
//       }
//     } else {
//       setChartData([]);
//     }
//   }, [clientStats, selectedYear, selectedMonth, filterMode]);

//   // Process monthly item data
//   useEffect(() => {
//     if (clientStats.monthlyItemAnalysis && clientStats.monthlyItemAnalysis.length > 0) {
//       const itemAnalysis = clientStats.monthlyItemAnalysis;
//       const uniqueItems = [...new Set(itemAnalysis.map(item => item.item_name))];
//       const colorMap = {};
//       uniqueItems.forEach((item, index) => {
//         colorMap[item] = colors[index % colors.length];
//       });
//       setItemColors(colorMap);

//       if (filterMode === 'monthly' && selectedMonth) {
//         const monthItems = itemAnalysis.filter(item => 
//           item.month === selectedMonth && item.year === selectedYear
//         );
        
//         if (monthItems.length > 0) {
//           const totalOrders = monthItems.reduce((sum, item) => sum + item.totalOrders, 0);
//           setMonthlyItemData([{
//             month: selectedMonth,
//             monthName: monthNames[selectedMonth - 1],
//             items: monthItems.map(item => ({
//               name: item.item_name,
//               orders: item.totalOrders,
//               quantity: item.totalQuantity,
//               sales: item.totalSales,
//               percentage: totalOrders > 0 ? Math.round((item.totalOrders / totalOrders) * 100) : 0,
//               color: colorMap[item.item_name]
//             })),
//             totalOrders
//           }]);
//         } else {
//           setMonthlyItemData([]);
//         }
//       } else {
//         const monthlyData = Array.from({ length: 12 }, (_, i) => {
//           const month = i + 1;
//           const monthName = monthNames[i];
//           const monthItems = itemAnalysis.filter(item => 
//             item.month === month && item.year === selectedYear
//           );
//           const totalOrders = monthItems.reduce((sum, item) => sum + item.totalOrders, 0);

//           return {
//             month,
//             monthName,
//             items: monthItems.map(item => ({
//               name: item.item_name,
//               orders: item.totalOrders,
//               quantity: item.totalQuantity,
//               sales: item.totalSales,
//               percentage: totalOrders > 0 ? Math.round((item.totalOrders / totalOrders) * 100) : 0,
//               color: colorMap[item.item_name]
//             })),
//             totalOrders
//           };
//         });
//         setMonthlyItemData(monthlyData);
//       }
//     } else {
//       setMonthlyItemData([]);
//     }
//   }, [clientStats, selectedYear, selectedMonth, filterMode]);

//   const handleYearChange = (year) => {
//     setSelectedYear(year);
//     setSelectedMonth(null);
//   };

//   const handleMonthChange = (month) => {
//     setSelectedMonth(month);
//   };

//   const handleFilterModeChange = (mode) => {
//     setFilterMode(mode);
//     if (mode === 'yearly') {
//       setSelectedMonth(null);
//     }
//   };

//   if (loading.clientStats) {
//     return <div className="text-center p-5">Loading dashboard data...</div>;
//   }

//   // REMOVED: Error alert display - errors are now handled silently
//   // if (errors.clientStats) {
//   //   return (
//   //     <CCard className="mb-4">
//   //       <CCardBody>
//   //         <div className="text-danger">
//   //           Error loading data: {errors.clientStats}
//   //         </div>
//   //       </CCardBody>
//   //     </CCard>
//   //   );
//   // }

//   const hasData = chartData.length > 0 || 
//                   (clientStats.machineStats && clientStats.machineStats.length > 0) || 
//                   monthlyItemData.length > 0;

//   return (
//     <>
//       {/* REMOVED: GlobalAlertMonitor component */}
      
//       {isSuperAdmin && (
//         <CCard className="mb-3 bg-info text-white">
//           <CCardBody>
//             <strong>🔐 SUPER ADMIN VIEW</strong>
//             <p className="mb-0">You are viewing aggregated data across all clients and machines</p>
//           </CCardBody>
//         </CCard>
//       )}

//       {/* Filter Controls */}
//       <CCard className="mb-4">
//         <CCardBody>
//           <CRow>
//             <CCol md={4}>
//               <label className="form-label">Filter Mode</label>
//               <CButtonGroup className="w-100">
//                 <CButton 
//                   color="primary" 
//                   variant={filterMode === 'yearly' ? 'solid' : 'outline'}
//                   onClick={() => handleFilterModeChange('yearly')}
//                 >
//                   Yearly View
//                 </CButton>
//                 <CButton 
//                   color="primary" 
//                   variant={filterMode === 'monthly' ? 'solid' : 'outline'}
//                   onClick={() => handleFilterModeChange('monthly')}
//                 >
//                   Monthly View
//                 </CButton>
//               </CButtonGroup>
//             </CCol>

//             <CCol md={4}>
//               <label className="form-label">Year</label>
//               <CDropdown className="w-100">
//                 <CDropdownToggle color="secondary" className="w-100">
//                   {selectedYear}
//                 </CDropdownToggle>
//                 <CDropdownMenu>
//                   {clientStats.availableYears && clientStats.availableYears.length > 0 ? (
//                     clientStats.availableYears.map(year => (
//                       <CDropdownItem 
//                         key={year}
//                         onClick={() => handleYearChange(year)}
//                         active={selectedYear === year}
//                       >
//                         {year}
//                       </CDropdownItem>
//                     ))
//                   ) : (
//                     [2024, 2025].map(year => (
//                       <CDropdownItem 
//                         key={year}
//                         onClick={() => handleYearChange(year)}
//                         active={selectedYear === year}
//                       >
//                         {year}
//                       </CDropdownItem>
//                     ))
//                   )}
//                 </CDropdownMenu>
//               </CDropdown>
//             </CCol>

//             {filterMode === 'monthly' && (
//               <CCol md={4}>
//                 <label className="form-label">Month</label>
//                 <CDropdown className="w-100">
//                   <CDropdownToggle color="secondary" className="w-100">
//                     {selectedMonth ? monthNames[selectedMonth - 1] : 'All Months'}
//                   </CDropdownToggle>
//                   <CDropdownMenu>
//                     <CDropdownItem 
//                       onClick={() => handleMonthChange(null)}
//                       active={selectedMonth === null}
//                     >
//                       All Months
//                     </CDropdownItem>
//                     {monthNames.map((month, index) => (
//                       <CDropdownItem 
//                         key={index}
//                         onClick={() => handleMonthChange(index + 1)}
//                         active={selectedMonth === index + 1}
//                       >
//                         {month}
//                       </CDropdownItem>
//                     ))}
//                   </CDropdownMenu>
//                 </CDropdown>
//               </CCol>
//             )}
//           </CRow>
//         </CCardBody>
//       </CCard>

//       {!hasData && (
//         <CCard className="mb-4">
//           <CCardBody className="text-center p-5">
//             <h4>No Data Available</h4>
//             <p className="text-muted">
//               There are no orders for the selected {filterMode === 'monthly' && selectedMonth ? 'month' : 'year'}.
//             </p>
//             <p className="text-muted">Try selecting a different time period.</p>
//           </CCardBody>
//         </CCard>
//       )}

//       {chartData.length > 0 && (
//         <CCard className="mb-4">
//           <CCardHeader>
//             <strong>Orders</strong> {isSuperAdmin && <CBadge color="info">All Clients</CBadge>}
//             <div className="float-end">
//               {filterMode === 'monthly' && selectedMonth 
//                 ? `${monthNames[selectedMonth - 1]} ${selectedYear}` 
//                 : `${selectedYear}`
//               }
//             </div>
//           </CCardHeader>
//           <CCardBody>
//             <MainChart 
//               data={chartData.map(item => item.orders)} 
//               labels={filterMode === 'monthly' && selectedMonth 
//                 ? [monthNames[selectedMonth - 1]] 
//                 : monthNames
//               }
//             />
//           </CCardBody>
//         </CCard>
//       )}

//       {clientStats.machineStats && clientStats.machineStats.length > 0 && (
//         <MachineChart 
//           data={clientStats.machineStats} 
//           year={selectedYear}
//           month={selectedMonth}
//           isSuperAdmin={isSuperAdmin}
//         />
//       )}

//       {monthlyItemData.length > 0 && (
//         <CCard className="mb-4">
//           <CCardHeader>
//             <strong>Monthly Item Analysis</strong> {isSuperAdmin && <CBadge color="info">All Items</CBadge>}
//           </CCardHeader>
//           <CCardBody>
//             {monthlyItemData.map((monthData, monthIndex) => (
//               <div key={monthIndex}>
//                 <h5 className="mb-3">
//                   {monthData.monthName} {selectedYear}
//                   <small className="text-muted ms-2">
//                     Total Orders: {monthData.totalOrders}
//                   </small>
//                 </h5>

//                 {monthData.items.length > 0 ? (
//                   monthData.items.map((item, itemIndex) => (
//                     <div key={itemIndex} className="mb-3">
//                       <div className="d-flex justify-content-between mb-1">
//                         <span>{item.name}</span>
//                         <span>{item.orders} orders ({item.percentage}%)</span>
//                       </div>
//                       <CProgress value={item.percentage} color={item.color} />
//                       <small className="text-muted">
//                         Quantity: {item.quantity} | Sales: LKR {item.sales}
//                       </small>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-muted">No orders this month</p>
//                 )}

//                 {monthIndex < monthlyItemData.length - 1 && (
//                   <hr className="my-4" />
//                 )}
//               </div>
//             ))}

//             <hr className="my-4" />

//             <h5>Item Legend</h5>
//             <CRow>
//               {clientStats.overallItemStats && clientStats.overallItemStats.length > 0 ? (
//                 clientStats.overallItemStats.map((item, index) => (
//                   <CCol md={4} key={index} className="mb-3">
//                     <CBadge color={itemColors[item.item_name] || 'secondary'} className="me-2">
//                       {item.item_name}
//                     </CBadge>
//                     <div className="small text-muted">
//                       Total: {item.totalOrders} orders<br />
//                       Quantity: {item.totalQuantity}<br />
//                       Sales: LKR {item.totalSales}
//                     </div>
//                   </CCol>
//                 ))
//               ) : (
//                 <CCol>
//                   <p className="text-muted">No item data available</p>
//                 </CCol>
//               )}
//             </CRow>

//             <hr className="my-4" />

//             <h5>Summary</h5>
//             <CRow>
//               <CCol md={4}>
//                 <strong>Total Items</strong>
//                 <div className="h4">
//                   {clientStats.overallItemStats ? clientStats.overallItemStats.length : 0}
//                 </div>
//               </CCol>
//               <CCol md={4}>
//                 <strong>Total Orders</strong>
//                 <div className="h4">
//                   {clientStats.overallItemStats 
//                     ? clientStats.overallItemStats.reduce((sum, item) => sum + item.totalOrders, 0)
//                     : 0
//                   }
//                 </div>
//               </CCol>
//               <CCol md={4}>
//                 <strong>Total Sales</strong>
//                 <div className="h4">
//                   LKR {clientStats.overallItemStats 
//                     ? clientStats.overallItemStats.reduce((sum, item) => sum + item.totalSales, 0).toFixed(2)
//                     : 0
//                   }
//                 </div>
//               </CCol>
//             </CRow>
//           </CCardBody>
//         </CCard>
//       )}
//     </>
//   )
// }

// export default Dashboard
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CButton,
  CButtonGroup,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CBadge,
} from '@coreui/react'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'
import { fetchClientsForDashBoard } from '../../actions/dashboardActions';
import MachineChart from './MachineChart';
import { CChartLine } from '@coreui/react-chartjs'

const colors = ['primary', 'success', 'warning', 'danger', 'info', 'secondary'];

const Dashboard = () => {
  const dispatch = useDispatch();
  const dashboardState = useSelector((state) => state.dashboard);
  const {
    clientStats = {
      machineStats: [],
      monthlyBreakdown: [],
      monthlyItemAnalysis: [],
      overallItemStats: [],
      availableYears: [],
      isSuperAdmin: false
    },
    loading = false,
    errors = {}
  } = dashboardState || {};

  const [chartData, setChartData] = useState([]);
  const [customerChartData, setCustomerChartData] = useState([]);
  const [salesChartData, setSalesChartData] = useState([]);
  const [machinesChartData, setMachinesChartData] = useState([]);
  
  const authUser = useSelector((state) => state.auth.user)
  const clientId = authUser?.id
  const isSuperAdmin = authUser?.role === 'super_admin' || 
                       authUser?.role === 'admin' || 
                       authUser?.is_super_admin === true || 
                       authUser?.user_type === 'super_admin' || 
                       authUser?.userType === 'super_admin';

  const [monthlyItemData, setMonthlyItemData] = useState([]);
  const [itemColors, setItemColors] = useState({});

  // Filter states
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [filterMode, setFilterMode] = useState('yearly');

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Fetch dashboard data
  useEffect(() => {
    if (clientId || isSuperAdmin) {
      const filters = {
        year: selectedYear,
        ...(filterMode === 'monthly' && selectedMonth ? { month: selectedMonth } : {})
      };
      
      const effectiveClientId = isSuperAdmin ? 'all' : clientId;
      
      dispatch(fetchClientsForDashBoard(effectiveClientId, filters, isSuperAdmin))
        .catch(() => {
          console.log('Dashboard fetch completed');
        });
    }
  }, [clientId, selectedYear, selectedMonth, filterMode, isSuperAdmin, dispatch])

  // Process chart data - Orders, Customers, Sales, and Machines
  useEffect(() => {
    if (clientStats.monthlyBreakdown && clientStats.monthlyBreakdown.length > 0) {
      const monthlyData = clientStats.monthlyBreakdown;

      if (filterMode === 'monthly' && selectedMonth) {
        const monthData = monthlyData.find(d => d.month === selectedMonth && d.year === selectedYear);
        if (monthData) {
          setChartData([{
            month: selectedMonth,
            orders: monthData.orders,
            sales: monthData.sales,
            customers: monthData.customers
          }]);
          setCustomerChartData([monthData.customers]);
          setSalesChartData([monthData.sales]);
        } else {
          setChartData([]);
          setCustomerChartData([]);
          setSalesChartData([]);
        }
      } else {
        // Yearly view - show all 12 months
        const fullYearData = Array.from({ length: 12 }, (_, i) => {
          const month = i + 1;
          const monthData = monthlyData.find(d => d.month === month && d.year === selectedYear);
          return {
            month,
            orders: monthData ? monthData.orders : 0,
            sales: monthData ? monthData.sales : 0,
            customers: monthData ? monthData.customers : 0
          };
        });
        setChartData(fullYearData);
        setCustomerChartData(fullYearData.map(item => item.customers));
        setSalesChartData(fullYearData.map(item => item.sales));
      }
    } else {
      setChartData([]);
      setCustomerChartData([]);
      setSalesChartData([]);
    }

    // Process machines data for chart
    if (clientStats.machineStats && clientStats.machineStats.length > 0) {
      // Group machines by month for the chart
      const machinesByMonth = Array.from({ length: 12 }, (_, i) => {
        const month = i + 1;
        // Count active machines (machines with orders) in each month
        const machinesInMonth = clientStats.machineStats.filter(m => m.totalOrders > 0).length;
        return machinesInMonth;
      });
      setMachinesChartData(machinesByMonth);
    } else {
      setMachinesChartData([]);
    }
  }, [clientStats, selectedYear, selectedMonth, filterMode]);

  // Process monthly item data
  useEffect(() => {
    if (clientStats.monthlyItemAnalysis && clientStats.monthlyItemAnalysis.length > 0) {
      const itemAnalysis = clientStats.monthlyItemAnalysis;
      const uniqueItems = [...new Set(itemAnalysis.map(item => item.item_name))];
      const colorMap = {};
      uniqueItems.forEach((item, index) => {
        colorMap[item] = colors[index % colors.length];
      });
      setItemColors(colorMap);

      if (filterMode === 'monthly' && selectedMonth) {
        const monthItems = itemAnalysis.filter(item => 
          item.month === selectedMonth && item.year === selectedYear
        );
        
        if (monthItems.length > 0) {
          const totalOrders = monthItems.reduce((sum, item) => sum + item.totalOrders, 0);
          setMonthlyItemData([{
            month: selectedMonth,
            monthName: monthNames[selectedMonth - 1],
            items: monthItems.map(item => ({
              name: item.item_name,
              orders: item.totalOrders,
              quantity: item.totalQuantity,
              sales: item.totalSales,
              percentage: totalOrders > 0 ? Math.round((item.totalOrders / totalOrders) * 100) : 0,
              color: colorMap[item.item_name]
            })),
            totalOrders
          }]);
        } else {
          setMonthlyItemData([]);
        }
      } else {
        const monthlyData = Array.from({ length: 12 }, (_, i) => {
          const month = i + 1;
          const monthName = monthNames[i];
          const monthItems = itemAnalysis.filter(item => 
            item.month === month && item.year === selectedYear
          );
          const totalOrders = monthItems.reduce((sum, item) => sum + item.totalOrders, 0);

          return {
            month,
            monthName,
            items: monthItems.map(item => ({
              name: item.item_name,
              orders: item.totalOrders,
              quantity: item.totalQuantity,
              sales: item.totalSales,
              percentage: totalOrders > 0 ? Math.round((item.totalOrders / totalOrders) * 100) : 0,
              color: colorMap[item.item_name]
            })),
            totalOrders
          };
        });
        setMonthlyItemData(monthlyData);
      }
    } else {
      setMonthlyItemData([]);
    }
  }, [clientStats, selectedYear, selectedMonth, filterMode]);

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setSelectedMonth(null);
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const handleFilterModeChange = (mode) => {
    setFilterMode(mode);
    if (mode === 'yearly') {
      setSelectedMonth(null);
    }
  };

  if (loading.clientStats) {
    return <div className="text-center p-5">Loading dashboard data...</div>;
  }

  const hasData = chartData.length > 0 || 
                  (clientStats.machineStats && clientStats.machineStats.length > 0) || 
                  monthlyItemData.length > 0;

  const chartLabels = filterMode === 'monthly' && selectedMonth 
    ? [monthNames[selectedMonth - 1]] 
    : monthNames;

  return (
    <>
      {isSuperAdmin && (
        <CCard className="mb-3 bg-info text-white">
          <CCardBody>
            <strong>🔐 SUPER ADMIN VIEW</strong>
            <p className="mb-0">You are viewing aggregated data across all clients and machines</p>
          </CCardBody>
        </CCard>
      )}

      {/* Filter Controls */}
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol md={4}>
              <label className="form-label">Filter Mode</label>
              <CButtonGroup className="w-100">
                <CButton 
                  color="primary" 
                  variant={filterMode === 'yearly' ? 'solid' : 'outline'}
                  onClick={() => handleFilterModeChange('yearly')}
                >
                  Yearly View
                </CButton>
                <CButton 
                  color="primary" 
                  variant={filterMode === 'monthly' ? 'solid' : 'outline'}
                  onClick={() => handleFilterModeChange('monthly')}
                >
                  Monthly View
                </CButton>
              </CButtonGroup>
            </CCol>

            <CCol md={4}>
              <label className="form-label">Year</label>
              <CDropdown className="w-100">
                <CDropdownToggle color="secondary" className="w-100">
                  {selectedYear}
                </CDropdownToggle>
                <CDropdownMenu>
                  {clientStats.availableYears && clientStats.availableYears.length > 0 ? (
                    clientStats.availableYears.map(year => (
                      <CDropdownItem 
                        key={year}
                        onClick={() => handleYearChange(year)}
                        active={selectedYear === year}
                      >
                        {year}
                      </CDropdownItem>
                    ))
                  ) : (
                    [2024, 2025].map(year => (
                      <CDropdownItem 
                        key={year}
                        onClick={() => handleYearChange(year)}
                        active={selectedYear === year}
                      >
                        {year}
                      </CDropdownItem>
                    ))
                  )}
                </CDropdownMenu>
              </CDropdown>
            </CCol>

            {filterMode === 'monthly' && (
              <CCol md={4}>
                <label className="form-label">Month</label>
                <CDropdown className="w-100">
                  <CDropdownToggle color="secondary" className="w-100">
                    {selectedMonth ? monthNames[selectedMonth - 1] : 'All Months'}
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem 
                      onClick={() => handleMonthChange(null)}
                      active={selectedMonth === null}
                    >
                      All Months
                    </CDropdownItem>
                    {monthNames.map((month, index) => (
                      <CDropdownItem 
                        key={index}
                        onClick={() => handleMonthChange(index + 1)}
                        active={selectedMonth === index + 1}
                      >
                        {month}
                      </CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
              </CCol>
            )}
          </CRow>
        </CCardBody>
      </CCard>

      {!hasData && (
        <CCard className="mb-4">
          <CCardBody className="text-center p-5">
            <h4>No Data Available</h4>
            <p className="text-muted">
              There are no orders for the selected {filterMode === 'monthly' && selectedMonth ? 'month' : 'year'}.
            </p>
            <p className="text-muted">Try selecting a different time period.</p>
          </CCardBody>
        </CCard>
      )}

      {/* THREE CHARTS IN A ROW - Customers (Blue), Sales (Red), Machines (Green) */}
      {chartData.length > 0 && (
        <CRow className="mb-4">
          {/* CUSTOMERS CHART - Tide Blue */}
          <CCol md={4}>
            <CCard>
              <CCardHeader className="bg-info text-white">
                <strong>👥 Customers</strong>
                {isSuperAdmin && <CBadge color="light" className="ms-2">All Clients</CBadge>}
              </CCardHeader>
              <CCardBody>
                <div className="text-center mb-2">
                  <h3 className="text-info">
                    {customerChartData.reduce((a, b) => a + b, 0)}
                  </h3>
                  <small className="text-muted">Total Customers</small>
                </div>
                <CChartLine
                  data={{
                    labels: chartLabels,
                    datasets: [
                      {
                        label: 'Customers',
                        backgroundColor: 'rgba(23, 162, 184, 0.2)',
                        borderColor: 'rgba(23, 162, 184, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(23, 162, 184, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(23, 162, 184, 1)',
                        data: customerChartData,
                        fill: true,
                        tension: 0.4
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          stepSize: 1
                        }
                      }
                    }
                  }}
                  style={{ height: '200px' }}
                />
              </CCardBody>
            </CCard>
          </CCol>

          {/* SALES CHART - Red */}
          <CCol md={4}>
            <CCard>
              <CCardHeader className="bg-danger text-white">
                <strong>💰 Sales</strong>
                {isSuperAdmin && <CBadge color="light" className="ms-2">All Clients</CBadge>}
              </CCardHeader>
              <CCardBody>
                <div className="text-center mb-2">
                  <h3 className="text-danger">
                    LKR {salesChartData.reduce((a, b) => a + b, 0).toLocaleString()}
                  </h3>
                  <small className="text-muted">Total Sales</small>
                </div>
                <CChartLine
                  data={{
                    labels: chartLabels,
                    datasets: [
                      {
                        label: 'Sales (LKR)',
                        backgroundColor: 'rgba(220, 53, 69, 0.2)',
                        borderColor: 'rgba(220, 53, 69, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(220, 53, 69, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(220, 53, 69, 1)',
                        data: salesChartData,
                        fill: true,
                        tension: 0.4
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true
                      }
                    }
                  }}
                  style={{ height: '200px' }}
                />
              </CCardBody>
            </CCard>
          </CCol>

          {/* MACHINES CHART - Green */}
          <CCol md={4}>
            <CCard>
              <CCardHeader className="bg-success text-white">
                <strong>☕ Active Machines</strong>
                {isSuperAdmin && <CBadge color="light" className="ms-2">All Machines</CBadge>}
              </CCardHeader>
              <CCardBody>
                <div className="text-center mb-2">
                  <h3 className="text-success">
                    {clientStats.machineStats ? clientStats.machineStats.filter(m => m.totalOrders > 0).length : 0}
                  </h3>
                  <small className="text-muted">Active Machines</small>
                </div>
                <CChartLine
                  data={{
                    labels: chartLabels,
                    datasets: [
                      {
                        label: 'Active Machines',
                        backgroundColor: 'rgba(40, 167, 69, 0.2)',
                        borderColor: 'rgba(40, 167, 69, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(40, 167, 69, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(40, 167, 69, 1)',
                        data: machinesChartData.length > 0 
                          ? machinesChartData 
                          : Array(12).fill(clientStats.machineStats?.filter(m => m.totalOrders > 0).length || 0),
                        fill: true,
                        tension: 0.4
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          stepSize: 1
                        }
                      }
                    }
                  }}
                  style={{ height: '200px' }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}

      {/* ORDERS CHART - Main Chart */}
      {chartData.length > 0 && (
        <CCard className="mb-4">
          <CCardHeader>
            <strong>📊 Orders Overview</strong> {isSuperAdmin && <CBadge color="info">All Clients</CBadge>}
            <div className="float-end">
              {filterMode === 'monthly' && selectedMonth 
                ? `${monthNames[selectedMonth - 1]} ${selectedYear}` 
                : `${selectedYear}`
              }
            </div>
          </CCardHeader>
          <CCardBody>
            <MainChart 
              data={chartData.map(item => item.orders)} 
              labels={chartLabels}
            />
          </CCardBody>
        </CCard>
      )}

      {/* Machine Sales Distribution */}
      {clientStats.machineStats && clientStats.machineStats.length > 0 && (
        <MachineChart 
          data={clientStats.machineStats} 
          year={selectedYear}
          month={selectedMonth}
          isSuperAdmin={isSuperAdmin}
        />
      )}

      {/* Monthly Item Analysis */}
      {monthlyItemData.length > 0 && (
        <CCard className="mb-4">
          <CCardHeader>
            <strong>📈 Monthly Item Analysis</strong> {isSuperAdmin && <CBadge color="info">All Items</CBadge>}
          </CCardHeader>
          <CCardBody>
            {monthlyItemData.map((monthData, monthIndex) => (
              <div key={monthIndex}>
                <h5 className="mb-3">
                  {monthData.monthName} {selectedYear}
                  <small className="text-muted ms-2">
                    Total Orders: {monthData.totalOrders}
                  </small>
                </h5>

                {monthData.items.length > 0 ? (
                  monthData.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span>{item.name}</span>
                        <span>{item.orders} orders ({item.percentage}%)</span>
                      </div>
                      <CProgress value={item.percentage} color={item.color} />
                      <small className="text-muted">
                        Quantity: {item.quantity} | Sales: LKR {item.sales}
                      </small>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No orders this month</p>
                )}

                {monthIndex < monthlyItemData.length - 1 && (
                  <hr className="my-4" />
                )}
              </div>
            ))}

            <hr className="my-4" />

            <h5>Item Legend</h5>
            <CRow>
              {clientStats.overallItemStats && clientStats.overallItemStats.length > 0 ? (
                clientStats.overallItemStats.map((item, index) => (
                  <CCol md={4} key={index} className="mb-3">
                    <CBadge color={itemColors[item.item_name] || 'secondary'} className="me-2">
                      {item.item_name}
                    </CBadge>
                    <div className="small text-muted">
                      Total: {item.totalOrders} orders<br />
                      Quantity: {item.totalQuantity}<br />
                      Sales: LKR {item.totalSales}
                    </div>
                  </CCol>
                ))
              ) : (
                <CCol>
                  <p className="text-muted">No item data available</p>
                </CCol>
              )}
            </CRow>

            <hr className="my-4" />

            <h5>Summary</h5>
            <CRow>
              <CCol md={4}>
                <strong>Total Items</strong>
                <div className="h4">
                  {clientStats.overallItemStats ? clientStats.overallItemStats.length : 0}
                </div>
              </CCol>
              <CCol md={4}>
                <strong>Total Orders</strong>
                <div className="h4">
                  {clientStats.overallItemStats 
                    ? clientStats.overallItemStats.reduce((sum, item) => sum + item.totalOrders, 0)
                    : 0
                  }
                </div>
              </CCol>
              <CCol md={4}>
                <strong>Total Sales</strong>
                <div className="h4">
                  LKR {clientStats.overallItemStats 
                    ? clientStats.overallItemStats.reduce((sum, item) => sum + item.totalSales, 0).toFixed(2)
                    : 0
                  }
                </div>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      )}
    </>
  )
}

export default Dashboard