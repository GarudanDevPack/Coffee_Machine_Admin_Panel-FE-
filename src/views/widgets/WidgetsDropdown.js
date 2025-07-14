
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchClientsForDashBoard } from '../../actions/dashboardActions'

const WidgetsDropdown = (props) => {
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)
  const dispatch = useDispatch()
  
  // Get state from Redux store
  const dashboardState = useSelector((state) => state.dashboard)
  const { 
    clientStats = { 
      machineStats: [], 
      monthlyBreakdown: [] 
    }, 
    loading = false, 
    errors = {} 
  } = dashboardState || {}

  const [clientId, setClientId] = useState(null)
  const [showPopup, setShowPopup] = useState(true)

  // Handle client ID prompt
  useEffect(() => {
    if (showPopup) {
      const inputId = prompt("Enter Client ID (e.g., 1):")
      if (inputId) {
        setClientId(inputId)
        setShowPopup(false)
      } else {
        setShowPopup(false)
      }
    }
  }, [showPopup])

  // Fetch data when clientId changes
 useEffect(() => {
  if (clientId) {
    dispatch(fetchClientsForDashBoard(clientId))
      .then(data => {
        console.log('Fetched data:', data);
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setShowPopup(true);
      });
  }
}, [clientId, dispatch]);

  // Extract data from clientStats
  const { machineStats = [], monthlyBreakdown = [] } = clientStats

  // Calculate totals
  const totalCustomers = monthlyBreakdown.length 
    ? monthlyBreakdown[monthlyBreakdown.length - 1]?.customers || 0
    : 0
  
  const totalOrders = monthlyBreakdown.reduce((sum, m) => sum + (m.orders || 0), 0)
  const totalSales = monthlyBreakdown.reduce((sum, m) => sum + (m.sales || 0), 0)
  const machineCount = machineStats.length

  // Prepare chart data
  const ordersChartData = monthlyBreakdown.map((m) => m.orders || 0)
  const salesChartData = monthlyBreakdown.map((m) => m.sales || 0)
  const labels = monthlyBreakdown.map((m) => 
    `${m.year}-${String(m.month).padStart(2, '0')}`
  )

  // Show loading state
  if (loading.clientStats) {
    return (
      <CRow className={props.className} xs={{ gutter: 4 }}>
        <CCol xs={12}>
          <div className="text-center">Loading dashboard data...</div>
        </CCol>
      </CRow>
    )
  }

  // Show error state
  if (errors.clientStats) {
    return (
      <CRow className={props.className} xs={{ gutter: 4 }}>
        <CCol xs={12}>
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
        </CCol>
      </CRow>
    )
  }

  // Main render with widgets
  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      {/* Customers Widget */}
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="primary"
          value={<>{totalCustomers}</>}
          title="Customers"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                <CIcon icon={cilOptions} />
              </CDropdownToggle>
            </CDropdown>
          }
          chart={
            <CChartLine
              ref={widgetChartRef1}
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: labels.length ? labels : ['No Data'],
                datasets: [
                  {
                    label: 'Orders',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-primary'),
                    data: ordersChartData.length ? ordersChartData : [0],
                  },
                ],
              }}
              options={{
                plugins: { legend: { display: false } },
                maintainAspectRatio: false,
                scales: {
                  x: { grid: { display: false }, ticks: { display: false } },
                  y: { grid: { display: false }, ticks: { display: false } },
                },
                elements: {
                  line: { borderWidth: 1, tension: 0.4 },
                  point: { radius: 4, hitRadius: 10, hoverRadius: 4 },
                },
              }}
            />
          }
        />
      </CCol>
      
      {/* Coffee Machines Widget */}
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="info"
          value={<>{machineCount}</>}
          title="Coffee Machines"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                <CIcon icon={cilOptions} />
              </CDropdownToggle>
            </CDropdown>
          }
          chart={
            <CChartLine
              ref={widgetChartRef2}
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: labels.length ? labels : ['No Data'],
                datasets: [
                  {
                    label: 'Machines',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-info'),
                    data: machineStats.map(machine => machine.totalOrders || 0),
                  },
                ],
              }}
              options={{
                plugins: { legend: { display: false } },
                maintainAspectRatio: false,
                scales: {
                  x: { grid: { display: false }, ticks: { display: false } },
                  y: { grid: { display: false }, ticks: { display: false } },
                },
                elements: {
                  line: { borderWidth: 1 },
                  point: { radius: 4, hitRadius: 10, hoverRadius: 4 },
                },
              }}
            />
          }
        />
      </CCol>

      {/* Merchant Widget */}
      {/* <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="warning"
          value={<>{clientStats.merchantCount || 0}</>}
          title="Merchant"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                <CIcon icon={cilOptions} />
              </CDropdownToggle>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3"
              style={{ height: '70px' }}
              data={{
                labels: labels.length ? labels : ['No Data'],
                datasets: [
                  {
                    label: 'Merchant Data',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: monthlyBreakdown.map(m => m.merchants || 0),
                    fill: true,
                  },
                ],
              }}
              options={{
                plugins: { legend: { display: false } },
                maintainAspectRatio: false,
                scales: { x: { display: false }, y: { display: false } },
                elements: { line: { borderWidth: 2, tension: 0.4 }, point: { radius: 0 } },
              }}
            />
          }
        />
      </CCol> */}

      {/* Sales Widget */}
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="danger"
          value={<>{totalSales.toLocaleString()} LKR</>}
          title="Sales"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                <CIcon icon={cilOptions} />
              </CDropdownToggle>
            </CDropdown>
          }
          chart={
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: labels.length ? labels : ['No Data'],
                datasets: [
                  {
                    label: 'Sales',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(67, 31, 71, 0.55)',
                    data: salesChartData.length ? salesChartData : [0],
                    barPercentage: 0.6,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  x: { grid: { display: false, drawTicks: false }, ticks: { display: false } },
                  y: { border: { display: false }, grid: { display: false }, ticks: { display: false } },
                },
              }}
            />
          }
        />
      </CCol>
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown