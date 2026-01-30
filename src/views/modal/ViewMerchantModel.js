import React, { useEffect, useState } from 'react'
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
import { fetchItemById } from '../../actions/itemAction';
import { useDispatch } from 'react-redux';
/**
 * author Anushka Isuru Lakmal
 * created on 25-04-2025-09h-30m
 * copyright 2025
 */

const ViewMerchantModal = ({ visible, onClose, rowData }) => {
  const [items, setItems] = useState([])
  const dispatch = useDispatch();
  //   const [properties, setProperties] = useState([])
  //   const dummyData = ['Cappuccino 01', 'Tea 01', 'Water 01']
  useEffect(() => {

    console.log('merchant data Data:', rowData);
  });
 
useEffect(() => {
  const fetchItems = async () => {
    if (visible && rowData?.inventory) {
      const itemNames = {};

      for (const inv of rowData.inventory) {
        try {
          const res = await dispatch(fetchItemById(inv.item_id));
          const name = res?.data?.[0]?.name || 'Unknown Item';
          itemNames[inv.item_id] = name;
        } catch (e) {
          itemNames[inv.item_id] = 'Error Fetching';
        }
      }

      setItems(itemNames);
    }
  };

  fetchItems();
}, [visible, rowData]);
        ////
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
        <CModalTitle id="VerticallyCenteredScrollableExample2">View merchant</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard className="mb-4">
          <CCardBody>
            <CRow>
              {/* Display selected row data */}
              <div className="mt-2" md={12}>
                <CRow>
                  <CCol>
                    <CFormLabel>merchant id ID :</CFormLabel>
                  </CCol>
                  <CCol>
                    <CFormLabel>{rowData?.id || ''}</CFormLabel>
                  </CCol>
                </CRow>
              </div>
              <div className="mt-2" md={12}>
                <CRow>
                  <CCol>
                    <CFormLabel>merchant name :</CFormLabel>
                  </CCol>
                  <CCol>
                    <CFormLabel>{rowData?.name}</CFormLabel>
                  </CCol>
                </CRow>
              </div>
              {/* <div className="mt-2" md={12}>
                <CRow>
                  <CCol>
                    <CFormLabel>weight of packet :</CFormLabel>
                  </CCol>
                  <CCol>
                    <CFormLabel>{rowData?.inventory?.packetofstock || ''}</CFormLabel>
                  </CCol>
                </CRow>
              </div>
              <div className="mt-2" md={12}>
                <CRow>
                  <CCol>
                    <CFormLabel>remaining grams :</CFormLabel>
                  </CCol>
                  <CCol>
                    <CFormLabel>{rowData?.org?.stock || ''}</CFormLabel>
                  </CCol>
                </CRow>
              </div> */}
              <div className="mt-2" md={12}>
 <CRow>
  <CCol>
    <CFormLabel>Organization Names:</CFormLabel>
  </CCol>
  {/* <CCol>
    {rowData?.org?.map((org, index) => (
      <div key={index} style={{ marginBottom: '8px', paddingLeft: '10px' }}>
        <div><strong>Organization {index + 1}:</strong></div>
        <div>Organization name: {org.name}</div>
        <div>
          Location: Latitude {org.location.latitude}, Longitude {org.location.longitude}
        </div>
      </div>
    ))}
  </CCol> */}
  <CCol>
  {rowData?.org?.length > 0 ? (
    rowData.org.map((org, index) => (
      <div
        key={index}
        style={{ marginBottom: '8px', paddingLeft: '10px' }}
      >
        <div>
          <strong>Organization {index + 1}:</strong>
        </div>

        <div>
          Organization name: {org?.name || 'N/A'}
        </div>

        <div>
          Location:
          Latitude {org?.location?.latitude ?? 'N/A'},
          Longitude {org?.location?.longitude ?? 'N/A'}
        </div>
      </div>
    ))
  ) : (
    <span className="text-muted">No organizations available</span>
  )}
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

              
              
            </CRow>
          </CCardBody>
        </CCard>
      </CModalBody>
    </CModal>
  )
}

export default ViewMerchantModal
