import React, { useState } from 'react'
import { CCard, CButton, CCardHeader, CCardBody } from '@coreui/react'
import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { AddAlertModal, AddPromotionModal } from '../../modal/AddComponentModel'
import AlertDataTableMui from '../../../components/tblcomponents/AlertDataTableWithFilter'
import PromotionDataTableMui from '../../../components/tblcomponents/PromotionDataTableWithFilter'

/**
 * author Anushka Isuru Lakmal
 * created on 07-01-2025-09h-54m
 * copyright 2025
 */

const Promotions = () => {
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
                Add Advertisement&nbsp;
                <CIcon className="ml-2" icon={cilPlus} size="sm" />
              </CButton>

              <AddPromotionModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
              />
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
          <PromotionDataTableMui />
          {/* <ComerWalletCustDataTableMui /> */}
          {/* <AlertDataTableMui /> */}
        </CCardBody>
      </CCard>
    </>
  )
}

export default Promotions
