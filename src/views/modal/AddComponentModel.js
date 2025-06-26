import React, { useState } from 'react'
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
import CIcon from '@coreui/icons-react'
import { cilPlus, cilTrash } from '@coreui/icons'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { InputMaskCreditCard, InputMaskPhone } from '../../components/common/CInputForms'
import { renderTimeViewClock, TimePicker } from '@mui/x-date-pickers'

export const AddCustomerModal = ({ visible, onClose }) => {
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
        <CModalTitle id="VerticallyCenteredScrollableExample2">Add Customer</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard className="mb-4">
          {/* <CCardHeader>Manage Machines</CCardHeader> */}
          <CCardBody>
            <CRow>
              <CCol md={12}>
                <CFormInput type="text" id="machineName" label="Customer Name" placeholder="Name" />
              </CCol>
              <CCol className="mt-2" md={12}>
                <CCol>
                  <CFormLabel>Phone Number</CFormLabel>
                </CCol>
                <InputMaskPhone />
              </CCol>
              <CCol className="mt-2" md={12}>
                <CFormInput type="text" id="machineType" label="E-mail" placeholder="E mail" />
              </CCol>
              <div className="mt-2" md={12}>
                <CCol>
                  <CFormLabel>Gender</CFormLabel>
                </CCol>
                <CCol>
                  <CFormSelect aria-label="Default select example">
                    <option>- Select -</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3" disabled>
                      Other
                    </option>
                  </CFormSelect>
                </CCol>
              </div>
              <div className="mt-2" md={12}>
                <CCol>
                  <CFormLabel>Date of Birth</CFormLabel>
                </CCol>
                <CCol>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker />
                  </LocalizationProvider>
                </CCol>
              </div>

              <CCol xs={12} className="mt-3">
                <CFormCheck id="isActiveCheck" label="Is Active" />
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


export const AddCustomerWalletModal = ({ visible, onClose }) => {
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
        <CModalTitle id="VerticallyCenteredScrollableExample2">Add a Wallet</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard className="mb-4">
          <CCardBody>
            <CRow>
              <div className="mt-2" md={12}>
                <CCol>
                  <CFormLabel>Customer</CFormLabel>
                </CCol>
                <CCol>
                  <CFormSelect aria-label="Default select example">
                    <option>- Select -</option>
                    <option value="1">CUS-00001 John</option>
                    <option value="2">CUS-00011 Mark</option>
                    <option value="3" disabled>
                      CUS-00011 Kane
                    </option>
                  </CFormSelect>
                </CCol>
              </div>
              <CCol md={12}>
                <CFormInput
                  type="number"
                  id="walletAmount"
                  label="Amount"
                  placeholder="0.00"
                  step="0.01" // Allow decimals
                  min="0" // Optional: Prevent negative amounts
                />
              </CCol>
              <CCol className="mt-2" md={12}>
                <CCol>
                  <CFormLabel>Serial Number</CFormLabel>
                </CCol>
                <InputMaskCreditCard />
              </CCol>
              <CCol md={12}>
                <CFormInput
                  type="number"
                  id="walletAmount"
                  label="CVV"
                  placeholder="000"
                  step="0" // Allow decimals
                  min="0" // Prevent negative amounts
                  maxLength="3" // Limit to 3 digits
                  onInput={(e) => {
                    if (e.target.value.length > 3) {
                      e.target.value = e.target.value.slice(0, 3) // Enforce the limit
                    }
                  }}
                />
              </CCol>

              <CCol xs={12} className="mt-3">
                <CFormCheck id="isActiveCheck" label="Is Active" />
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

export const AddNotificationModal = ({ visible, onClose }) => {
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
        <CModalTitle id="VerticallyCenteredScrollableExample2">Add New Notification</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard className="mb-4">
          {/* <CCardHeader>Manage Machines</CCardHeader> */}
          <CCardBody>
            <CRow>
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
                <CFormInput type="text" id="machineName" label="Name" placeholder="Name" />
              </CCol>
              <div className="mt-2" md={12}>
                <CCol>
                  <CFormLabel>Type</CFormLabel>
                </CCol>
                <CCol>
                  <CFormSelect aria-label="Default select example">
                    <option>- Select -</option>
                    <option value="1">Type 01</option>
                    <option value="2">Type 02</option>
                    <option value="3" disabled>
                      Type 03
                    </option>
                  </CFormSelect>
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
              <CCol xs={12} className="mt-3">
                <CFormCheck id="isActiveCheck" label="Is Active" />
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

export const AddPromotionModal = ({ visible, onClose }) => {
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
        <CModalTitle id="VerticallyCenteredScrollableExample2">Add New Notification</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard className="mb-4">
          <CCardBody>
            <CRow>
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
                <CFormInput type="text" id="machineName" label="Name" placeholder="Name" />
              </CCol>
              <div className="mt-2" md={12}>
                <CCol>
                  <CFormLabel>Type</CFormLabel>
                </CCol>
                <CCol>
                  <CFormSelect aria-label="Default select example">
                    <option>- Select -</option>
                    <option value="1">IMAGE</option>
                    <option value="2">TEXT</option>
                    <option value="3" disabled>
                      Type 03
                    </option>
                  </CFormSelect>
                </CCol>
              </div>
              <div className="mt-2" md={12}>
                <CCol>
                  <CFormLabel>Page</CFormLabel>
                </CCol>
                <CCol>
                  <CFormSelect aria-label="Default select example">
                    <option>- Select -</option>
                    <option value="1">Home</option>
                    <option value="2">Home-Ani</option>
                    <option value="3" disabled>
                      Type 03
                    </option>
                  </CFormSelect>
                </CCol>
              </div>
              <CCol xs={12} className="mt-3">
                <CFormCheck id="isActiveCheck" label="Is Active" />
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

export const AddItemTypeModal = ({ visible, onClose }) => {
  const [properties, setProperties] = useState([])
  const [images, setImages] = useState([])

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

  function updateImagesOrder(images) {
    //console.log(arguments);
    setImages(images)
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
        <CModalTitle id="VerticallyCenteredScrollableExample2">Add Item Type</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard className="mb-4">
          {/* <CCardHeader>Manage Machines</CCardHeader> */}
          <CCardBody>
            <CRow>
              <div className="mt-2" md={12}>
                <CCol>
                  <CFormLabel>Client</CFormLabel>
                </CCol>
                <CCol>
                  <CFormSelect aria-label="Default select example">
                    <option>- Select -</option>
                    <option value="1">CUS-00001 John</option>
                    <option value="2">CUS-00011 Mark</option>
                    <option value="3" disabled>
                      CUS-00011 Kane
                    </option>
                  </CFormSelect>
                </CCol>
              </div>
              <div className="mt-2" md={12}>
                <CCol>
                  <CFormLabel>Organization</CFormLabel>
                </CCol>
                <CCol>
                  <CFormSelect aria-label="Default select example">
                    <option>- Select -</option>
                    <option value="1">CUS-00001 John</option>
                    <option value="2">CUS-00011 Mark</option>
                    <option value="3" disabled>
                      CUS-00011 Kane
                    </option>
                  </CFormSelect>
                </CCol>
              </div>
              <CCol className="mt-2" md={12}>
                <CFormInput
                  type="text"
                  id="machineType"
                  label="Item Type Name"
                  placeholder="Name"
                />
              </CCol>
              <div className="mt-2" md={12}>
                <CCol>
                  <CFormLabel>Item Size</CFormLabel>
                </CCol>
                <CCol>
                  <CFormSelect aria-label="Default select example">
                    <option>- Select -</option>
                    <option value="1">Small</option>
                    <option value="2">Medium</option>
                    <option value="3" disabled>
                      Large
                    </option>
                  </CFormSelect>
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

              <div className="mt-2">
                <CFormInput type="file" id="formFile" label="Upload Image" />
              </div>
              {/* image uploader end */}

              <CCol xs={12} className="mt-3">
                <CFormCheck id="isActiveCheck" label="Is Active" />
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

// export const AddAlertTypeModal = ({ visible, onClose }) => {
//   const [properties, setProperties] = useState([])
//   const [images, setImages] = useState([])

//   const addProperty = () => {
//     setProperties([...properties, { name: '', values: '' }])
//   }

//   const removeProperty = (index) => {
//     setProperties(properties.filter((_, i) => i !== index))
//   }

//   const handlePropertyNameChange = (index, value) => {
//     const updatedProperties = [...properties]
//     updatedProperties[index].name = value
//     setProperties(updatedProperties)
//   }

//   const handlePropertyValuesChange = (index, value) => {
//     const updatedProperties = [...properties]
//     updatedProperties[index].values = value
//     setProperties(updatedProperties)
//   }

//   function updateImagesOrder(images) {
//     //console.log(arguments);
//     setImages(images)
//   }

//   return (
//     <CModal
//       alignment="center"
//       scrollable
//       visible={visible}
//       onClose={onClose}
//       aria-labelledby="VerticallyCenteredScrollableExample2"
//     >
//       <CModalHeader>
//         <CModalTitle id="VerticallyCenteredScrollableExample2">Add Alert Type</CModalTitle>
//       </CModalHeader>
//       <CModalBody>
//         <CCard className="mb-4">
//           {/* <CCardHeader>Manage Machines</CCardHeader> */}
//           <CCardBody>
//             <CRow>
//               <div className="mt-2" md={12}>
//                 <CCol>
//                   <CFormLabel>Client</CFormLabel>
//                 </CCol>
//                 <CCol>
//                   <CFormSelect aria-label="Default select example">
//                     <option>- Select -</option>
//                     <option value="1">CUS-00001 John</option>
//                     <option value="2">CUS-00011 Mark</option>
//                     <option value="3" disabled>
//                       CUS-00011 Kane
//                     </option>
//                   </CFormSelect>
//                 </CCol>
//               </div>
//               <div className="mt-2" md={12}>
//                 <CCol>
//                   <CFormLabel>Organization</CFormLabel>
//                 </CCol>
//                 <CCol>
//                   <CFormSelect aria-label="Default select example">
//                     <option>- Select -</option>
//                     <option value="1">CUS-00001 John</option>
//                     <option value="2">CUS-00011 Mark</option>
//                     <option value="3" disabled>
//                       CUS-00011 Kane
//                     </option>
//                   </CFormSelect>
//                 </CCol>
//               </div>
//               <CCol className="mt-2" md={12}>
//                 <CFormInput
//                   type="text"
//                   id="machineType"
//                   label="Alert Type Name"
//                   placeholder="Name"
//                 />
//               </CCol>
//               <CCol xs={12} className="mt-3">
//                 <CFormCheck id="isActiveCheck" label="Is Active" />
//               </CCol>
//             </CRow>
//           </CCardBody>
//         </CCard>
//       </CModalBody>
//       <CModalFooter>
//         <CButton color="primary">Save changes</CButton>
//       </CModalFooter>
//     </CModal>
//   )
// }

