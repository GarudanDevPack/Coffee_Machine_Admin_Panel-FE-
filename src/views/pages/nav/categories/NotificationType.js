import React, { useState } from 'react'
import { CCard, CButton, CCardHeader, CCardBody } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import ItemDataTableMui from '../../../../components/tblcomponents/ItemTableWithFilter'
import { AddAlertTypeModal, AddItemTypeModal, AddNotificationTypeModal } from '../../../modal/AddComponentModel'
import ItemTypeDataTableMui from '../../../../components/tblcomponents/categories/ItemTypeTableWithFilter'
import AlertTypeDataTableMui from '../../../../components/tblcomponents/categories/AlertTypeTableWithFilter'
import NotificationTypeDataTableMui from '../../../../components/tblcomponents/categories/NotificationTypeTableWithFilter'

/**
 * author Anushka Isuru Lakmal
 * created on 24-01-2025-15h-24m
 * copyright 2025
*/



const NotificationType = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  // Function to store the time when the tab is hidden
  function saveLastLeftTime() {
    if (document.visibilityState === 'hidden') {
      const time = new Date().toISOString()
      localStorage.setItem('lastLeftTab', time)
      console.log('Tab hidden at:', time)
    }
  }

  // Function to retrieve the last time the tab was left
  function getLastLeftTime() {
    const lastLeft = localStorage.getItem('lastLeftTab')
    if (lastLeft) {
      console.log('Last time you left the tab:', lastLeft)
      return lastLeft
    } else {
      console.log('No record of when the tab was left.')
      return null
    }
  }

  // Add event listener for visibility change
  document.addEventListener('visibilitychange', saveLastLeftTime)

  // On page load, log the last time the tab was left
  window.addEventListener('load', () => {
    const lastLeftTime = getLastLeftTime()
    if (lastLeftTime) {
      const message = `Welcome back! You last left the tab at: ${new Date(lastLeftTime).toLocaleString()}`
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
            <div>Manage Notification Type</div>

            <div className="d-flex align-items-center">
              {/* style={{ height: '100%' }}> */}
              <CButton
                color="info"
                type="button"
                onClick={() => setIsModalVisible(true)}
                className="btn-default text-sm"
              >
                Add New Notification Type&nbsp;
                <CIcon className="ml-2" icon={cilPlus} size="sm" />
              </CButton>
              <AddNotificationTypeModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
            </div>
          </div>
        </CCardHeader>

        <CCardBody className="mt-4">
          {/* <CustomerWalletDataTableMui /> */}
          <NotificationTypeDataTableMui/>
        </CCardBody>
      </CCard>
    </>
  )
}

export default NotificationType
