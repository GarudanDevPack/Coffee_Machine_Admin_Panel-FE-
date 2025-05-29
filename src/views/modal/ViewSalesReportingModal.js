import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CFormLabel,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
  CBadge,
} from '@coreui/react'

/**
 * author Anushka Isuru Lakmal
 * created on 25-02-2025-10h-30m
 * copyright 2025
 */

const ViewSalesRepotingModal = ({ visible, onClose, rowData }) => {
  const [properties, setProperties] = useState([])
  const dummyData = ['Cappuccino 01', 'Tea 01', 'Water 01']

  const formatDate = (dateString) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // For 12-hour clock (AM/PM)
    }
    const date = new Date(dateString)
    return date.toLocaleString('en-GB', options) // 'en-GB' ensures DD/MM/YYYY format
  }

  return (
    <CModal
      alignment="center"
      scrollable
      visible={visible}
      onClose={onClose}
      aria-labelledby="VerticallyCenteredScrollableExample2"
    >
      <CModalHeader>
        <CModalTitle id="VerticallyCenteredScrollableExample2">View Sale</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard className="mb-4">
          <CCardBody>
            <CRow>
              {/* Display selected row data */}
              <div className="mt-2" md={12}>
                <CRow>
                  <CCol>
                    <CFormLabel>Sales ID :</CFormLabel>
                  </CCol>
                  <CCol>
                    <CFormLabel>{rowData?.id || ''}</CFormLabel>
                  </CCol>
                </CRow>
              </div>
              <div className="mt-2" md={12}>
                <CRow>
                  <CCol>
                    <CFormLabel>Outlet :</CFormLabel>
                  </CCol>
                  <CCol>
                    <CFormLabel>{rowData?.client?.name || ''}</CFormLabel>
                  </CCol>
                </CRow>
              </div>
              <div className="mt-2" md={12}>
                <CRow>
                  <CCol>
                    <CFormLabel>Floor :</CFormLabel>
                  </CCol>
                  <CCol>
                    <CFormLabel>{rowData?.org?.name || ''}</CFormLabel>
                  </CCol>
                </CRow>
              </div>
              <div className="mt-2" md={12}>
                <CRow>
                  <CCol>
                    <CFormLabel>Customer :</CFormLabel>
                  </CCol>
                  <CCol>
                    <CFormLabel>{rowData?.user?.name}</CFormLabel>
                  </CCol>
                </CRow>
              </div>
              <div className="mt-2" md={12}>
                <CRow>
                  <CCol md={6}>
                    <CFormLabel>Items :</CFormLabel>
                  </CCol>
                  <CCol md={6}>
                    {rowData?.items?.map((item, index) => (
                      <CRow key={index}>
                        <CCol>
                          <CFormLabel className="d-flex align-items-center">
                            <CBadge
                              className="mr-2"
                              color="light"
                              style={{ flex: 1, color: 'black' }}
                            >
                              {item.item_name}
                            </CBadge>
                            <CBadge color="light" style={{ flex: 0, color: 'black' }}>
                              x
                            </CBadge>
                            <CBadge
                              className="ml-2"
                              color="light"
                              style={{ flex: 1, color: 'black' }}
                            >
                              {item.qty}
                            </CBadge>
                          </CFormLabel>
                        </CCol>
                      </CRow>
                    ))}
                  </CCol>
                </CRow>
              </div>
              <div className="mt-4" md={12}>
                <CRow>
                  <CCol>
                    <CFormLabel>Amount :</CFormLabel>
                  </CCol>
                  <CCol>
                    <CFormLabel>
                      <CBadge className="ml-4" color="light" style={{ color: 'black' }}>
                        {rowData?.amount ? rowData.amount.toFixed(2) : ''}
                      </CBadge>

                      <CBadge className="ml-4" color="light" style={{ color: 'black' }}>
                        {rowData?.currency || ''}
                      </CBadge>
                    </CFormLabel>
                  </CCol>
                </CRow>
              </div>
              {/* <div className="mt-2" md={12}>
                <CRow>
                  <CCol>
                    <CFormLabel>Mobile Number :</CFormLabel>
                  </CCol>
                  <CCol>
                    <CFormLabel>{rowData?.mobileNumber || ''}</CFormLabel>
                  </CCol>
                </CRow>
              </div> */}
              <div className="mt-2" md={12}>
                <CRow>
                  <CCol>
                    <CFormLabel>Created Date :</CFormLabel>
                  </CCol>
                  <CCol>
                    <CFormLabel>{formatDate(rowData?.createdAt) || ''}</CFormLabel>
                  </CCol>
                </CRow>
              </div>
              <div className="mt-2" md={12}>
                <CRow>
                  <CCol>
                    <CFormLabel>Updated Date :</CFormLabel>
                  </CCol>
                  <CCol>
                    <CFormLabel>{formatDate(rowData?.updatedAt) || ''}</CFormLabel>
                  </CCol>
                </CRow>
              </div>
              <div className="mt-2" md={12}>
                <CRow>
                  <CCol>
                    <CFormLabel>Payment Status :</CFormLabel>
                  </CCol>
                  <CCol>
                    <CBadge color={rowData?.payment_status === 'completed' ? 'success' : 'danger'}>
                      {rowData?.payment_status || ''}
                    </CBadge>
                    {/* <CFormLabel>{rowData?.status || ''}</CFormLabel> */}
                  </CCol>
                </CRow>
              </div>
              <div className="mt-2" md={12}>
                <CRow>
                  <CCol>
                    <CFormLabel>Status :</CFormLabel>
                  </CCol>
                  <CCol>
                    <CBadge color={rowData?.status === 'completed' ? 'success' : 'danger'}>
                      {rowData?.status || ''}
                    </CBadge>
                    {/* <CFormLabel>{rowData?.status || ''}</CFormLabel> */}
                  </CCol>
                </CRow>
              </div>
            </CRow>
          </CCardBody>
        </CCard>
      </CModalBody>
    </CModal>
  )
}

export default ViewSalesRepotingModal
