import React, { useState } from 'react'
import { CCard, CButton, CCardHeader, CCardBody, CFormInput, CFormSelect } from '@coreui/react'
import { cilPlus, cilFilter } from '@coreui/icons'
import {
  TableViewCustomer,
  TableViewCustomerWithFilter,
  TableViewCustomerWithPagination,
} from '../../../components/tblcomponents/CDataTable'
import CIcon from '@coreui/icons-react'
import { AddCustomerModal } from '../../modal/AddComponentModel'
import CustomerDataTableMui from '../../../components/tblcomponents/DataTableWithFilter'

const Customers = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          {/* <div>Manage Customer</div> */}
          <div className="d-flex justify-content-between align-items-center">
            <div>Manage Customers</div>

            <div className="d-flex align-items-center">
              {/* style={{ height: '100%' }}> */}
              <CButton
                color="info"
                type="button"
                onClick={() => setIsModalVisible(true)}
                className="btn-default text-sm"
              >
                Add New Cusomer&nbsp;
                <CIcon className="ml-2" icon={cilPlus} size="sm" />
              </CButton>
              <AddCustomerModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
            </div>
          </div>
        </CCardHeader>

        <CCardBody className="mt-4">
          <CustomerDataTableMui />
          {/* <CustomerDataTableMui /> */}
          {/* <TableViewCustomerWithFilter /> */}
          {/* <TableViewCustomerWithFilter/> */}
          {/* <DataTableMe /> */}
        </CCardBody>
      </CCard>
    </>
  )
}

export default Customers
