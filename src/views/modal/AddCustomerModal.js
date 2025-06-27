import React, { useState,useEffect } from 'react'
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
  CBadge,
  CFormTextarea,
} from '@coreui/react'
import { useDispatch } from 'react-redux'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { addCustomer } from '../../actions/customerAction'
import Swal from 'sweetalert2'
export const AddCustomerModal = ({ visible, onClose, editData, addOREdit }) => {
  const [properties, setProperties] = useState([])
  const dispatch = useDispatch()
  const [customername, setCustomername] = useState('')
  const [customerphoneNumber, setCustomerphoneNumber] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPassword, setCustomerPassword] = useState('')

  const resetForm = () => {
    
    }
    useEffect(() => {
       
        if (addOREdit) {
          resetForm()
        }
    
        if (editData) {
          console.log(editData.nozzle)
          setSelectedId(editData.clientId|| '')
          setalerttTypename(editData.name || '')
          setSelectedClient(editData.client_id?.id?.toString() || '')
         
         
          getClientData()
        
        }
      }, [editData, visible])
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
   const handleCustomerName = (event) => {
    setCustomername(event.target.value)
  }
  const handleSave = async () => {
          let data = {}
          let dataToSend = {}
          let dataToUpdate = {}
          
           dataToSend = {
      name: customername,
      email: customerEmail,
      password:customerPassword,
      phone_number: customerphoneNumber
       
      
    }
          try {
            let response = {}
            if (!editData) {
              response = await dispatch(addCustomer(dataToSend))
            } ``
            if (response) {
              Swal.fire({
                title: 'Saved!',
                text: 'customer is saved successfully!',
                icon: 'success',
              })
              resetForm()
              onClose() // Close the modal
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
              })
            }
          } catch (error) {
            console.error('Error saving data:', error)
          }
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
        <CModalTitle id="VerticallyCenteredScrollableExample2">Add Customer</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard className="mb-4">
          {/* <CCardHeader>Manage Machines</CCardHeader> */}
          <CCardBody>
            <CRow>
              <CCol md={12}>
               <CFormInput
  type="text"
  id="customerName"
  label="Customer Name"
  placeholder="Name"
  value={customername}
  onChange={(e) => setCustomername(e.target.value)}
/>
              </CCol>
              <CCol className="mt-2" md={12}>
                <CCol>
                  {/* <CFormLabel>Phone Number</CFormLabel> */}
                </CCol>
                   <CFormInput
  type="text"
  id="phoneNumber"
  label="Phone Number"
  placeholder="Phone number"
  value={customerphoneNumber}
  onChange={(e) => setCustomerphoneNumber(e.target.value)}
/>
              </CCol>
              <CCol className="mt-2" md={12}>
                <CFormInput
  type="text"
  id="machineType"
  label="E-mail"
  placeholder="E mail"
  value={customerEmail}
  onChange={(e) => setCustomerEmail(e.target.value)}
/>
              </CCol>
              <div className="mt-2" md={12}>
                <CCol>
                  <CFormLabel>password</CFormLabel>
                </CCol>
                <CCol>
                   <CFormInput
  type="text"
  id="customerPassword"
  // label="Password"
  placeholder="Password"
  value={customerPassword}
  onChange={(e) => setCustomerPassword(e.target.value)}
/>
                </CCol>
              </div>
              {/* <div className="mt-2" md={12}>
                <CCol>
                  <CFormLabel>Date of Birth</CFormLabel>
                </CCol>
                <CCol>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker />
                  </LocalizationProvider>
                </CCol>
              </div> */}

              <CCol xs={12} className="mt-3">
                <CFormCheck id="isActiveCheck" label="Is Active" />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={handleSave}>Save changes</CButton>
      </CModalFooter>
    </CModal>
  )
}
export default AddCustomerModal