import React, { useState } from 'react'
import { CCard, CButton, CCardHeader, CCardBody } from '@coreui/react'
import { cilSend } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { AddNotificationModal } from '../../modal/AddComponentModel'
import NotificationDataTableMui from '../../../components/tblcomponents/NotificationDataTableWithFilter'

/**
 * author Anushka Isuru Lakmal
 * created on 06-01-2025-10h-08m
 * copyright 2025
 */

const PushNotificatons = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <div className="d-flex justify-content-between align-items-center">
            <div>Manage Notifications</div>
            <div className="d-flex align-items-center">
              {/* style={{ height: '100%' }}> */}
              <CButton
                color="info"
                type="button"
                onClick={() => setIsModalVisible(true)}
                className="btn-default text-sm"
              >
                Send New Notification&nbsp;
                <CIcon className="ml-2" icon={cilSend} size="sm" />
              </CButton>

              <AddNotificationModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
              {/* <CButton
                          color="info"
                          type="button"
                          onClick={() => console.log('popup add items!')}
                          className="btn-default text-sm"
                        >
                          Add  
                          <CIcon className="ml-2" icon={cilPlus} size="sm" />
                        </CButton> */}
            </div>
          </div>
        </CCardHeader>

        <CCardBody className="mt-4">
          {/* <ComerWalletCustDataTableMui /> */}
          <NotificationDataTableMui />
        </CCardBody>
      </CCard>
    </>
  )
}

export default PushNotificatons
