import React, { useState } from 'react'
import { CCard, CButton, CCardHeader, CCardBody, CFormInput, CFormSelect } from '@coreui/react'
import { cilPlus, cilFilter } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { AddBrewStockModal } from '../../modal/AddComponentModel'
import BrewStocksDataTableMui from '../../../components/tblcomponents/BrewStockDataTableWithFilter'

/**
 * author Anushka Isuru Lakmal
 * created on 02-01-2025-13h-41m
 * copyright 2025
 */

const BrewStocks = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          {/* <div>Manage Customer</div> */}
          <div className="d-flex justify-content-between align-items-center">
            <div>Manage Stocks</div>

            <div className="d-flex align-items-center">
              {/* style={{ height: '100%' }}> */}
              <CButton
                color="info"
                type="button"
                onClick={() => setIsModalVisible(true)}
                className="btn-default text-sm"
              >
                Add New Stock&nbsp;
                <CIcon className="ml-2" icon={cilPlus} size="sm" />
              </CButton>
              <AddBrewStockModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
              />
            </div>
          </div>
        </CCardHeader>

        <CCardBody className="mt-4">
          <BrewStocksDataTableMui />
        </CCardBody>
      </CCard>
    </>
  )
}

export default BrewStocks
