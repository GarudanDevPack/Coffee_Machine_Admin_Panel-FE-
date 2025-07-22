import React, { useState,useEffect } from 'react'
import { CCard, CButton, CCardHeader, CCardBody, CFormInput, CFormSelect } from '@coreui/react'
import { cilPlus, cilFilter } from '@coreui/icons'
import {
  TableViewCustomer,
  TableViewCustomerWithFilter,
  TableViewCustomerWithPagination,
} from '../../../components/tblcomponents/CDataTable'
import CIcon from '@coreui/icons-react'
import { AddCustomerWalletModal } from '../../modal/AddComponentModel'
import { CustomerWalletDataTableMui } from '../../../components/tblcomponents/CustomerWalletsTableWithFilter'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { fetchWallets } from '../../../actions/customerWalletAction'
/**
 * author Anushka Isuru Lakmal
 * created on 03-01-2025-09h-33m
 * copyright 2025
 */

const CustomerWallets = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [dataLength, setdataLength] = useState(null)  
const getData = async () => {
    try {
      const result = await dispatch(fetchWallets())
      console.log("data", result)
      console.log('[Debugging] : p result - ', dataLength, 'now - ', result.length);
      if (dataLength !== result.length) {
        console.log('changed length')
        setData(result)
        setdataLength(result.length)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getData()
    const interval = setInterval(() => {
      console.log('Function called at interval')
      getData()
    }, 2000)

    return () => clearInterval(interval)
  }, [!isModalVisible, refresh])

  // Function to save the last time the tab was left
  function saveLastLeftTime() {
    if (document.visibilityState === 'hidden') {
      const time = new Date().toISOString()
      localStorage.setItem('lastLeftTab', time)
      console.log('Tab hidden at:', time)
    }
  }

  // Function to retrieve and display the last time the tab was left in your local timezone
  function getLastLeftTime() {
    const lastLeft = localStorage.getItem('lastLeftTab')
    if (lastLeft) {
      const localTime = new Date(lastLeft).toLocaleString('en-US', {
        timeZone: 'Asia/Colombo', // Replace with your region's time zone
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      console.log('Last time you left the tab (local time):', localTime)
      return localTime
    } else {
      console.log('No record of when the tab was left.')
      return null
    }
  }

  // Add event listener for visibility change
  document.addEventListener('visibilitychange', saveLastLeftTime)

  // On page load, log the last time the tab was left in the local timezone
  window.addEventListener('load', () => {
    const lastLeftTime = getLastLeftTime()
    if (lastLeftTime) {
      const message = `Welcome back! You last left the tab at: ${lastLeftTime}`
      console.log(message)
      alert(message) // Optional: Show a friendly alert
    }
  })
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          {/* <div>Manage Customer</div> */}
          <div className="d-flex justify-content-between align-items-center">
            <div>Manage Customer Wallets</div>

            <div className="d-flex align-items-center">
              {/* style={{ height: '100%' }}> */}
              {/* <CButton
                color="info"
                type="button"
                onClick={() => setIsModalVisible(true)}
                className="btn-default text-sm"
              >
                Add New Walltet&nbsp;
                <CIcon className="ml-2" icon={cilPlus} size="sm" />
              </CButton> */}
              <AddCustomerWalletModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
            </div>
          </div>
        </CCardHeader>

        <CCardBody className="mt-4">
          <CustomerWalletDataTableMui 
           tableData={data}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default CustomerWallets
