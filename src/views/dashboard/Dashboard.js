
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'

import {
CCard,
CCardBody,
CCardHeader,
CCol,
CProgress,
CRow
} from '@coreui/react'

import {
 
  cilUser,
  cilUserFemale,
} from '@coreui/icons'



import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'
import { fetchClientsForDashBoard } from '../../actions/dashboardActions';
import { useParams } from 'react-router-dom';

const colors = ['primary', 'success', 'warning', 'danger', 'info', 'secondary'];

const Dashboard = () => {
  const { client_id } = useParams();
  const dispatch = useDispatch();
  
  // Get data from Redux store (same as WidgetsDropdown)
  const dashboardState = useSelector((state) => state.dashboard);
  const { 
    clientStats = { 
      machineStats: [], 
      monthlyBreakdown: [],
      monthlyItemAnalysis: [],
      overallItemStats: []
    }, 
    loading = false, 
    errors = {} 
  } = dashboardState || {};

  // ALL HOOKS MUST BE DECLARED FIRST - BEFORE ANY CONDITIONAL RETURNS
  const [chartData, setChartData] = useState([]);
  const [clientId, setClientId] = useState(client_id || null);
  const [showPopup, setShowPopup] = useState(!client_id);
  const [monthlyItemData, setMonthlyItemData] = useState([]);
  const [itemColors, setItemColors] = useState({});

  // Handle client ID prompt (similar to WidgetsDropdown)
  useEffect(() => {
    if (showPopup && !client_id) {
      const inputId = prompt("Enter Client ID (e.g., 1):");
      if (inputId) {
        setClientId(inputId);
        setShowPopup(false);
      } else {
        setShowPopup(false);
      }
    }
  }, [showPopup, client_id]);

  // Fetch data when clientId changes
  useEffect(() => {
    if (clientId) {
      dispatch(fetchClientsForDashBoard(clientId))
        .then(data => {
          console.log('Fetched data:', data);
        })
        .catch(error => {
          console.error('Fetch error:', error);
        });
    }
  }, [clientId, dispatch]);

  // Process chart data when clientStats changes
  useEffect(() => {
    if (clientStats.monthlyBreakdown && clientStats.monthlyBreakdown.length > 0) {
      const monthlyData = clientStats.monthlyBreakdown;
      
      // Create data for all months (January-July 2025)
      const fullYearData = Array.from({ length: 7 }, (_, i) => {
        const month = i + 1; // 1-7 for January-July
        const monthData = monthlyData.find(d => d.month === month && d.year === 2025);
        return {
          month,
          orders: monthData ? monthData.orders : 0,
          sales: monthData ? monthData.sales : 0,
          customers: monthData ? monthData.customers : 0
        };
      });
      
      setChartData(fullYearData);
      console.log('Chart data updated:', fullYearData);
    }
  }, [clientStats]);

  // Process monthly item data
  useEffect(() => {
    if (clientStats.monthlyItemAnalysis && clientStats.monthlyItemAnalysis.length > 0) {
      const itemAnalysis = clientStats.monthlyItemAnalysis;
      
      // Get unique items and assign colors
      const uniqueItems = [...new Set(itemAnalysis.map(item => item.item_name))];
      const colorMap = {};
      uniqueItems.forEach((item, index) => {
        colorMap[item] = colors[index % colors.length];
      });
      setItemColors(colorMap);
      
      // Create monthly data structure
      const monthlyData = Array.from({ length: 7 }, (_, i) => {
        const month = i + 1;
        const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][i];
        
        // Get items for this month
        const monthItems = itemAnalysis.filter(item => 
          item.month === month && item.year === 2025
        );
        
        // Calculate total orders for this month to get percentages
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
      console.log('Monthly item data:', monthlyData);
    }
  }, [clientStats]);

  // NOW HANDLE CONDITIONAL RENDERING AFTER ALL HOOKS ARE DECLARED
  const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: 53 },
    { title: 'Female', icon: cilUserFemale, value: 43 },
  ];

  // Show loading state
  if (loading.clientStats) {
    return <div className="text-center">Loading dashboard data...</div>;
  }

  // Show error state
  if (errors.clientStats) {
    return (
      <div className="text-center text-danger">
        Error loading data: {errors.clientStats}
        <br />
        <button 
          className="btn btn-primary mt-2" 
          onClick={() => setShowPopup(true)}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      <WidgetsDropdown className="mb-4" />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Orders
              </h4>
              <div className="small text-body-secondary">January - July 2025</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              {/* Optional buttons remain here */}
            </CCol>
          </CRow>
          
          {chartData.length === 0 ? (
            <div>Loading chart...</div>
          ) : (
            <MainChart 
              data={chartData.map(item => item.orders)}
              labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']}
            />
          )}
        </CCardBody>
      </CCard>
      
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Monthly Item Analysis</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <hr className="mt-0" />
                  {progressGroupExample2.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      {/* Progress bars for gender data if needed */}
                    </div>
                  ))}
                </CCol>
              </CRow>
              <CRow>
                <CCol xs={12} md={8} xl={8}>
                  <hr className="mt-0" />
                  {monthlyItemData.map((monthData, monthIndex) => (
                    <div key={monthIndex} className="mb-4">
                      <div className="mb-3">
                        <h6 className="text-primary">{monthData.monthName} 2025</h6>
                        <small className="text-body-secondary">
                          Total Orders: {monthData.totalOrders}
                        </small>
                      </div>
                      
                      {monthData.items.length > 0 ? (
                        monthData.items.map((item, itemIndex) => (
                          <div className="progress-group mb-3" key={itemIndex}>
                            <div className="progress-group-prepend">
                              <span className="text-body-secondary small">
                                {item.name}
                              </span>
                              <span className="ms-auto text-body-secondary small">
                                {item.orders} orders ({item.percentage}%)
                              </span>
                            </div>
                            <div className="progress-group-bars">
                              <CProgress 
                                thin 
                                color={item.color} 
                                value={item.percentage} 
                                className="mb-1"
                              />
                            </div>
                            <div className="small text-body-secondary">
                              Quantity: {item.quantity} | Sales: LKR {item.sales}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-body-secondary small mb-3">
                          No orders this month
                        </div>
                      )}
                      
                      {monthIndex < monthlyItemData.length - 1 && (
                        <hr className="my-4" />
                      )}
                    </div>
                  ))}
                </CCol>
                
                <CCol xs={12} md={4} xl={4}>
                  <div className="sticky-top" style={{ top: '20px' }}>
                    <h6 className="text-primary mb-3">Item Legend</h6>
                    <hr className="mt-0" />
                    
                    {clientStats.overallItemStats && clientStats.overallItemStats.length > 0 ? (
                      clientStats.overallItemStats.map((item, index) => (
                        <div key={index} className="d-flex align-items-center mb-3">
                          <div 
                            className={`rounded-circle me-3`}
                            style={{
                              width: '12px',
                              height: '12px',
                              backgroundColor: itemColors[item.item_name] ? 
                                `var(--cui-${itemColors[item.item_name]})` : 
                                'var(--cui-info)'
                            }}
                          ></div>
                          <div className="flex-grow-1">
                            <div className="fw-semibold small">{item.item_name}</div>
                            <div className="text-body-secondary small">
                              Total: {item.totalOrders} orders
                            </div>
                            <div className="text-body-secondary small">
                              Quantity: {item.totalQuantity}
                            </div>
                            <div className="text-body-secondary small">
                              Sales: LKR {item.totalSales}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-body-secondary small">
                        No item data available
                      </div>
                    )}
                    
                    <hr className="my-4" />
                    
                    {/* Additional statistics */}
                    <h6 className="text-primary mb-3">Summary</h6>
                    <div className="mb-2">
                      <div className="text-body-secondary small">Total Items</div>
                      <div className="fw-semibold">
                        {clientStats.overallItemStats ? clientStats.overallItemStats.length : 0}
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="text-body-secondary small">Total Orders</div>
                      <div className="fw-semibold">
                        {clientStats.overallItemStats ? 
                          clientStats.overallItemStats.reduce((sum, item) => sum + item.totalOrders, 0) : 0
                        }
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="text-body-secondary small">Total Sales</div>
                      <div className="fw-semibold">
                        LKR {clientStats.overallItemStats ? 
                          clientStats.overallItemStats.reduce((sum, item) => sum + item.totalSales, 0) : 0
                        }
                      </div>
                    </div>
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard