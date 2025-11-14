import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CFormSelect,
  CCol,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CFormTextarea,
} from '@coreui/react'
import { useDispatch } from 'react-redux'
import { fetchClients } from '../../actions/clientAction'
import Swal from 'sweetalert2'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers'

export const AddAlertModal = ({ visible, onClose }) => {
  const [properties, setProperties] = useState([])

  const addProperty = () => {
    setProperties([...properties, { name: '', values: '' }])
  }

  const removeProperty = (index) => {
    setProperties(properties.filter((_, i) => i !== index))
  }

  const handlePropertyNameChange = (index, value) => {
    const updatedProperties = [...properties]
    updatedProperties[index].name = value
    setProperties(updatedProperties)
  }

  const handlePropertyValuesChange = (index, value) => {
    const updatedProperties = [...properties]
    updatedProperties[index].values = value
    setProperties(updatedProperties)
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
        <CModalTitle id="VerticallyCenteredScrollableExample2">Add an Alert</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard className="mb-4">
          {/* <CCardHeader>Manage Machines</CCardHeader> */}
          <CCardBody>
            <CRow>
              <div className="mt-2" md={12}>
                <CCol>
                  <CFormLabel>Machine</CFormLabel>
                </CCol>
                <CCol>
                  <CFormSelect aria-label="Default select example">
                    <option>- Select -</option>
                    <option value="1">Espresso Maker Pro MC-00001</option>
                    <option value="2" disabled>
                      Espresso Maker Pro MC-00002
                    </option>
                  </CFormSelect>
                </CCol>
              </div>
              <div className="mt-2" md={12}>
                <CCol>
                  <CFormLabel>Type</CFormLabel>
                </CCol>
                <CCol>
                  <CFormSelect aria-label="Default select example">
                    <option>- Select -</option>
                    <option value="1">High</option>
                    <option value="1">Normal</option>
                    <option value="2" disabled>
                      Low
                    </option>
                  </CFormSelect>
                </CCol>
              </div>
              <div className="mt-2" md={12}>
                <CCol>
                  <CFormLabel>Status</CFormLabel>
                </CCol>
                <CCol>
                  <CFormSelect aria-label="Default select example">
                    <option>- Select -</option>
                    <option value="1">Level 01</option>
                    <option value="1">Level 02</option>
                    <option value="2" disabled>
                      Level 03
                    </option>
                  </CFormSelect>
                </CCol>
              </div>
              <div md={12}>
                <CCol>
                  <CFormLabel>Date</CFormLabel>
                </CCol>
                <CCol>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker />
                  </LocalizationProvider>
                </CCol>
              </div>
              <div className="mt-2" md={6}>
                <CCol>
                  <CFormLabel>Time</CFormLabel>
                </CCol>
                <CCol>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/* <DemoContainer components={['TimePicker']}> */}
                    <TimePicker
                      label=""
                      viewRenderers={{
                        hours: renderTimeViewClock,
                        minutes: renderTimeViewClock,
                        seconds: renderTimeViewClock,
                      }}
                    />
                    {/* </DemoContainer> */}
                  </LocalizationProvider>
                </CCol>
              </div>
              <CCol className="mt-2" md={12}>
                <CFormTextarea
                  id="exampleFormControlTextarea1"
                  label="Description"
                  rows={3}
                  text="Must be 8-75 words long."
                ></CFormTextarea>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary">Save changes</CButton>
      </CModalFooter>
    </CModal>
  )
}
