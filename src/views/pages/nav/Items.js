import React, { useState } from 'react'
import { CCard, CButton, CCardHeader, CCardBody, CFormInput, CFormSelect } from '@coreui/react'
import { cilPlus, cilFilter } from '@coreui/icons'
import {
  TableViewCustomer,
  TableViewCustomerWithFilter,
  TableViewCustomerWithPagination,
} from '../../../components/tblcomponents/CDataTable'
import CIcon from '@coreui/icons-react'
import { AddCustomerWalletModal, AddItemModal } from '../../modal/AddComponentModel'
import { CustomerWalletDataTableMui } from '../../../components/tblcomponents/CustomerWalletsTableWithFilter'
import ItemDataTableMui from '../../../components/tblcomponents/ItemTableWithFilter'
// import ItemDataTableMui from '../../../components/tblcomponents/ItemTableWithFilter'

/**
 * author Anushka Isuru Lakmal
 * created on 23-01-2025-14h-01m
 * copyright 2025
 */

const Items = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

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
            <div>Manage Items</div>

            <div className="d-flex align-items-center">
              {/* style={{ height: '100%' }}> */}
              <CButton
                color="info"
                type="button"
                onClick={() => setIsModalVisible(true)}
                className="btn-default text-sm"
              >
                Add New Item&nbsp;
                <CIcon className="ml-2" icon={cilPlus} size="sm" />
              </CButton>
              <AddItemModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
            </div>
          </div>
        </CCardHeader>

        <CCardBody className="mt-4">
          {/* <CustomerWalletDataTableMui /> */}
          <ItemDataTableMui />
        </CCardBody>
      </CCard>
    </>
  )
}

export default Items
