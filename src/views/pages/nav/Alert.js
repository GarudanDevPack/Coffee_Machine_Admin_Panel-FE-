import React, { useState } from 'react'
import { CCard, CButton, CCardHeader, CCardBody } from '@coreui/react'
import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { AddAlertModal } from '../../modal/AddComponentModel'
import AlertDataTableMui from '../../../components/tblcomponents/AlertDataTableWithFilter'


/**
 * author Anushka Isuru Lakmal
 * created on 06-01-2025-11h-09m
 * copyright 2025
*/

const Alerts = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <div className="d-flex justify-content-between align-items-center">
            <div>Manage Alerts</div>
            <div className="d-flex align-items-center">
              {/* style={{ height: '100%' }}> */}
              <CButton
                color="info"
                type="button"
                onClick={() => setIsModalVisible(true)}
                className="btn-default text-sm"
              >
                Add Alert&nbsp;
                <CIcon className="ml-2" icon={cilPlus} size="sm" />
              </CButton>

              <AddAlertModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
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
          <AlertDataTableMui />
        </CCardBody>
      </CCard>
    </>
  )
}

export default Alerts
