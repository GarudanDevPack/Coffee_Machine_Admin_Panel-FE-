import React, { useState } from 'react'
import { CCard, CButton, CCardHeader, CCardBody, CFormInput, CFormSelect } from '@coreui/react'
import { cilPlus, cilFilter } from '@coreui/icons'
import {
  TableViewCustomer,
  TableViewCustomerWithFilter,
  TableViewCustomerWithPagination,
} from '../../../components/tblcomponents/CDataTable'
import CIcon from '@coreui/icons-react'
import { AddMerchantModal } from '../../modal/AddComponentModel'
import CustomerDataTableMui from '../../../components/tblcomponents/DataTableWithFilter'
import MerchantDataTableMui from '../../../components/tblcomponents/MerchantDataTableWithFilter'

/**
 * author Anushka Isuru Lakmal
 * created on 02-01-2025-10h-30m
 * copyright 2025
 */

const Merchants = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          {/* <div>Manage Customer</div> */}
          <div className="d-flex justify-content-between align-items-center">
            <div>Manage Merchants</div>

            <div className="d-flex align-items-center">
              {/* style={{ height: '100%' }}> */}
              <CButton
                color="info"
                type="button"
                onClick={() => setIsModalVisible(true)}
                className="btn-default text-sm"
              >
                Add New Merchant&nbsp;
                <CIcon className="ml-2" icon={cilPlus} size="sm" />
              </CButton>
              <AddMerchantModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
            </div>
          </div>
        </CCardHeader>

        <CCardBody className="mt-4">
          <MerchantDataTableMui />
          {/* <CustomerDataTableMui /> */}
        </CCardBody>
      </CCard>
    </>
  )
}

export default Merchants
