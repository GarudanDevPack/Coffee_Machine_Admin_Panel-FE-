import React from 'react'
import { CChartDoughnut } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'
import { CRow, CCol, CCard, CCardBody } from '@coreui/react'

const MachineChart = ({ data, year, month }) => {
  // Sort machines by total sales (descending)
  const sortedData = [...data].sort((a, b) => b.totalSales - a.totalSales);
  
  // Prepare chart data
  const machineLabels = sortedData.map(m => m.machineName || `Machine ${m.machine_id}`);
  const salesData = sortedData.map(m => m.totalSales);
  
  // Generate vibrant colors for each machine
  const generateColors = (count) => {
    const baseColors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', 
      '#FF9F40', '#FF6384', '#C9CBCF', '#4BC0C0', '#FF9F40'
    ];
    return baseColors.slice(0, count);
  };
  
  const chartColors = generateColors(sortedData.length);

  return (
    <>
      {/* Main Chart - Modern Doughnut Chart */}
      <CRow className="mb-4">
        <CCol lg={6} className="mb-4 mb-lg-0">
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '15px',
            padding: '30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <h5 className="text-white mb-4 fw-bold">Coffee Machines Sales Distribution</h5>
            <div style={{ 
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <CChartDoughnut
                data={{
                  labels: machineLabels,
                  datasets: [
                    {
                      data: salesData,
                      backgroundColor: chartColors,
                      borderWidth: 3,
                      borderColor: '#fff',
                      hoverBorderWidth: 5,
                      hoverBorderColor: '#fff',
                    }
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  cutout: '65%',
                  plugins: {
                    legend: {
                      display: true,
                      position: 'bottom',
                      labels: {
                        padding: 15,
                        font: {
                          size: 12,
                          weight: 'bold'
                        },
                        usePointStyle: true,
                        pointStyle: 'circle'
                      }
                    },
                    tooltip: {
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      padding: 12,
                      titleFont: {
                        size: 14,
                        weight: 'bold'
                      },
                      bodyFont: {
                        size: 13
                      },
                      callbacks: {
                        label: function(context) {
                          const label = context.label || '';
                          const value = context.parsed;
                          const total = context.dataset.data.reduce((a, b) => a + b, 0);
                          const percentage = ((value / total) * 100).toFixed(1);
                          return [
                            `${label}`,
                            `Sales: LKR ${value.toLocaleString()}`,
                            `Share: ${percentage}%`
                          ];
                        }
                      }
                    }
                  }
                }}
                style={{ height: '400px' }}
              />
            </div>
          </div>
        </CCol>
        
        {/* Top Performers Cards */}
        <CCol lg={6}>
          <h5 className="mb-3 fw-bold text-primary">Top Performing Machines</h5>
          {sortedData.slice(0, 3).map((machine, index) => (
            <CCard 
              key={index} 
              className="mb-3"
              style={{
                borderLeft: `5px solid ${chartColors[index]}`,
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <CCardBody>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="d-flex align-items-center mb-2">
                      <span 
                        className="badge rounded-pill me-2"
                        style={{ 
                          backgroundColor: chartColors[index],
                          fontSize: '0.75rem',
                          padding: '0.35rem 0.65rem'
                        }}
                      >
                        #{index + 1}
                      </span>
                      <h6 className="mb-0 fw-bold">
                        {machine.machineName || `Machine ${machine.machine_id}`}
                      </h6>
                    </div>
                    <div className="text-muted small">
                      <span className="me-3">
                        <i className="bi bi-cart3 me-1"></i>
                        {machine.totalOrders} orders
                      </span>
                      <span>
                        <i className="bi bi-people me-1"></i>
                        {machine.uniqueCustomers} customers
                      </span>
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="h4 mb-0 text-success fw-bold">
                      LKR {machine.totalSales.toLocaleString()}
                    </div>
                    <small className="text-muted">Total Sales</small>
                  </div>
                </div>
              </CCardBody>
            </CCard>
          ))}
        </CCol>
      </CRow>

      {/* Modern Table */}
      <CRow className="mt-4">
        <CCol>
          <div style={{
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            borderRadius: '15px',
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
          }}>
            <h5 className="mb-4 fw-bold text-dark">Machine Performance Overview</h5>
            <div className="table-responsive" style={{ 
              background: 'white',
              borderRadius: '12px',
              overflow: 'hidden'
            }}>
              <table className="table table-hover mb-0">
                <thead style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white'
                }}>
                  <tr>
                    <th className="border-0 py-3">Rank</th>
                    <th className="border-0 py-3">Machine Name</th>
                    <th className="border-0 py-3 text-center">Total Orders</th>
                    <th className="border-0 py-3 text-center">Total Sales</th>
                    <th className="border-0 py-3 text-center">Customers</th>
                    <th className="border-0 py-3 text-center">Avg. per Order</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((machine, index) => (
                    <tr 
                      key={index}
                      style={{
                        transition: 'all 0.2s',
                        borderLeft: `4px solid ${chartColors[index]}`
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                        e.currentTarget.style.transform = 'scale(1.01)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <td className="align-middle">
                        <span 
                          className="badge rounded-pill"
                          style={{ 
                            backgroundColor: chartColors[index],
                            fontSize: '0.85rem',
                            padding: '0.4rem 0.8rem'
                          }}
                        >
                          {index + 1}
                        </span>
                      </td>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <div 
                            className="rounded-circle me-3"
                            style={{
                              width: '12px',
                              height: '12px',
                              backgroundColor: chartColors[index]
                            }}
                          ></div>
                          <span className="fw-semibold">
                            {machine.machineName || `Machine ${machine.machine_id}`}
                          </span>
                        </div>
                      </td>
                      <td className="text-center align-middle">
                        <span className="badge bg-primary-subtle text-primary px-3 py-2">
                          {machine.totalOrders}
                        </span>
                      </td>
                      <td className="text-center align-middle">
                        <span className="fw-bold text-success">
                          LKR {machine.totalSales.toLocaleString()}
                        </span>
                      </td>
                      <td className="text-center align-middle">
                        <span className="badge bg-info-subtle text-info px-3 py-2">
                          {machine.uniqueCustomers}
                        </span>
                      </td>
                      <td className="text-center align-middle text-muted">
                        LKR {machine.totalOrders > 0 
                          ? (machine.totalSales / machine.totalOrders).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })
                          : '0.00'
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot style={{ 
                  background: '#f8f9fa',
                  fontWeight: 'bold'
                }}>
                  <tr>
                    <td colSpan="2" className="py-3 border-0">
                      <span className="text-primary fw-bold">TOTALS</span>
                    </td>
                    <td className="text-center py-3 border-0">
                      <span className="badge bg-primary px-3 py-2">
                        {sortedData.reduce((sum, m) => sum + m.totalOrders, 0)}
                      </span>
                    </td>
                    <td className="text-center py-3 border-0">
                      <span className="fw-bold text-success">
                        LKR {sortedData.reduce((sum, m) => sum + m.totalSales, 0).toLocaleString()}
                      </span>
                    </td>
                    <td className="text-center py-3 border-0">
                      <span className="badge bg-info px-3 py-2">
                        {sortedData.reduce((sum, m) => sum + m.uniqueCustomers, 0)}
                      </span>
                    </td>
                    <td className="text-center py-3 border-0 text-muted">-</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </CCol>
      </CRow>
    </>
  )
}

export default MachineChart