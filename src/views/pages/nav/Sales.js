import React, { useState } from 'react'
import { CCard, CButton, CCardHeader, CCardBody, CFormInput, CFormSelect } from '@coreui/react'
import { cilPlus, cilFilter } from '@coreui/icons'
import {
  TableViewCustomer,
  TableViewCustomerWithFilter,
  TableViewCustomerWithPagination,
} from '../../../components/tblcomponents/CDataTable'
import CIcon from '@coreui/icons-react'
import { AddCustomerWalletModal } from '../../modal/AddComponentModel'
import ComerWalletCustDataTableMui from '../../../components/tblcomponents/CustomerWalletsTableWithFilter'
import ViewSalesDataTableMui from '../../../components/tblcomponents/ViewSalesDataTableWithFilter'

/**
 * author Anushka Isuru Lakmal
 * created on 03-01-2025-09h-33m
 * copyright 2025
 */

const SalesReporting = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          {/* <div>Manage Customer</div> */}
          <div className="d-flex justify-content-between align-items-center">
            <div>View Sales</div>

            {/* <div className="d-flex align-items-center"> */}
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
              {/* <AddCustomerWalletModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} /> */}
            {/* </div> */}
          </div>
        </CCardHeader>

        <CCardBody className="mt-4">
          {/* <ComerWalletCustDataTableMui /> */}
          <ViewSalesDataTableMui/>
        </CCardBody>
      </CCard>
    </>
  )
}

export default SalesReporting
