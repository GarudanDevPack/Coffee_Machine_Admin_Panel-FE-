import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
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
import { fetchAllData, getAllData, getAllQueryData, postData } from '../../api'
import Swal from 'sweetalert2'
// import ImageUploader from 'react-image-upload'
// import Spinner from '../../components/loaders/Spinner'
// import { ReactSortable } from 'react-sortablejs'

export const AddMachineModal = ({ visible, onClose }) => {
  const [properties, setProperties] = useState([])
  const [itemData, setItemData] = useState([])
  const [clients, setClients] = useState([])
  const [selectedClient, setSelectedClient] = useState('')
  const [organizations, setOrganizations] = useState([])
  const [machineName, setMachineName] = useState('')
  const [selectedOrg, setSelectedOrg] = useState('')
  const [isActive, setIsActive] = useState(false)

  // Add a new property (inventory item)
  const addProperty = () => {
    setProperties([...properties, { item_id: '', stock: '', qty: '' }])
  }

  // Remove a property (inventory item)
  const removeProperty = (index) => {
    setProperties(properties.filter((_, i) => i !== index))
  }

  // Handle changes in inventory item fields
  const handlePropertyChange = (index, field, value) => {
    const updatedProperties = [...properties]
    updatedProperties[index][field] = value
    setProperties(updatedProperties)
  }

  // Fetch clients and item data on component mount
  useEffect(() => {
    const getClientData = async () => {
      try {
        const result = await fetchAllData('clientlogs') // Fetch from /api/items
        setClients(result.data)
      } catch (error) {
        console.error(error)
      }
    }

    const getItemData = async () => {
      try {
        const result = await getAllQueryData('itemsbyclient', 'client_id=1&org_id=1') // Fetch data
        setItemData(result.data)
      } catch (error) {
        console.error(error)
      }
    }

    getClientData()
    getItemData()
  }, [])

  // Handle client selection change
  const handleClientChange = (event) => {
    const clientId = event.target.value
    setSelectedClient(clientId)

    // Find the selected client and update organizations
    const client = clients.find((c) => c.id.toString() === clientId)
    setOrganizations(client ? client.org : [])
  }

  // Handle organization selection change
  const handleOrgChange = (event) => {
    setSelectedOrg(event.target.value)
  }

  // Handle machine name change
  const handleMachineNameChange = (event) => {
    setMachineName(event.target.value)
  }

  // Handle isActive checkbox change
  const handleIsActiveChange = (event) => {
    setIsActive(event.target.checked)
  }

  // Handle save button click
  const handleSave = async () => {
    // Construct the data object
    console.log('in save function')
    const data = {
      //id: String(Math.random().toString(36).substr(2, 9)), // Generate a unique ID
      client_id: {
        id: Number(selectedClient),
        name: clients.find((c) => c.id.toString() === selectedClient)?.name || '',
      },
      org_id: {
        id: Number(selectedOrg),
        name: organizations.find((org) => org.id.toString() === selectedOrg)?.name || '',
      },
      name: machineName,
      item_id: properties.map((prop) => prop.item_id),
      status: isActive ? 'online' : 'offline',
      last_maintenance: new Date(),
      expire_at: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // Set expire_at to 1 year from now
      inventory: properties.map((prop) => ({
        item_id: prop.item_id,
        stock: Number(prop.stock),
        qty: Number(prop.qty),
      })),
      //qr_id: String(Math.random().toString(36).substr(2, 9)),
      //error: '',
    }

    // Log the data (for testing)
    console.log('Saved Data:', data)

    try {
      // Call the postData function to save the data
      const response = await postData('createmachinelog', data)
      console.log('Data saved successfully:', response)
      if (response) {
        Swal.fire({
          title: 'Saved !',
          text: 'Machine is Save Successfully!',
          icon: 'success',
        })
      }
      if (!response) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          //footer: '<a href="#">Why do I have this issue?</a>'
        })
      }

      // Close the modal
      onClose()
    } catch (error) {
      console.error('Error saving data:', error)
    }
  }

  return (
    <CModal alignment="center" scrollable visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Add Machine</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard className="mb-4">
          <CCardBody>
            <CRow>
              <div className="mt-2" md={12}>
                <CCol>
                  <CFormLabel>Client</CFormLabel>
                </CCol>
                <CCol>
                  <CFormSelect
                    aria-label="Select Client"
                    value={selectedClient}
                    onChange={handleClientChange}
                  >
                    <option value="">- Select -</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
              </div>
              <div className="mt-2" md={12}>
                <CCol>
                  <CFormLabel>Organization</CFormLabel>
                </CCol>
                <CCol>
                  <CFormSelect
                    aria-label="Select Organization"
                    value={selectedOrg}
                    onChange={handleOrgChange}
                  >
                    <option value="">- Select -</option>
                    {organizations.map((org) => (
                      <option key={org.id} value={org.id}>
                        {org.name}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
              </div>
              <CCol md={12}>
                <CFormInput
                  type="text"
                  id="machineName"
                  label="Machine Name"
                  placeholder="Name"
                  value={machineName}
                  onChange={handleMachineNameChange}
                />
              </CCol>
              <CCol xs={12} md={12} className="mt-3">
                <div className="mb-2">
                  <CRow>
                    <CFormLabel className="mb-3">Inventory</CFormLabel>
                  </CRow>
                  <CButton
                    color="info"
                    type="button"
                    onClick={addProperty}
                    className="btn-default text-sm mb-4"
                  >
                    Add Inventory&nbsp;
                    <CIcon className="ml-2" icon={cilPlus} size="sm" />
                  </CButton>
                  {properties.length > 0 &&
                    properties.map((property, index) => (
                      <div className="d-flex gap-2 mb-2" key={index}>
                        <CFormSelect
                          aria-label="Select Item"
                          value={property.item_id}
                          onChange={(e) => handlePropertyChange(index, 'item_id', e.target.value)}
                        >
                          <option>- Select -</option>
                          {itemData.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </CFormSelect>
                        <CFormInput
                          type="text"
                          className="mb-0"
                          value={property.stock}
                          onChange={(e) => handlePropertyChange(index, 'stock', e.target.value)}
                          placeholder="Stock"
                        />
                        <CFormInput
                          type="text"
                          className="mb-0"
                          value={property.qty}
                          onChange={(e) => handlePropertyChange(index, 'qty', e.target.value)}
                          placeholder="QTY of machine"
                        />
                        <CButton color="danger" type="button" onClick={() => removeProperty(index)}>
                          <CIcon className="ml-2" icon={cilTrash} size="sm" />
                        </CButton>
                      </div>
                    ))}
                </div>
              </CCol>
              <CCol xs={12} className="mt-3">
                <CFormCheck
                  id="isActiveCheck"
                  label="Is Online"
                  checked={isActive}
                  onChange={handleIsActiveChange}
                />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={handleSave}>
          Save changes
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
// export const AddMachineModal = ({ visible, onClose }) => {
//   const [properties, setProperties] = useState([])

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

//   const [itemData, setItemData] = useState([])
//   const [clients, setClients] = useState([])
//   const [selectedClient, setSelectedClient] = useState('')
//   const [organizations, setOrganizations] = useState([])

//   useEffect(() => {
//     const getClientData = async () => {
//       try {
//         const result = await fetchAllData('clientlogs') // Fetch from /api/items
//         console.log(result.data)
//         setClients(result.data)
//       } catch (error) {
//         console.error(error)
//       }
//     }

//     const getItemData = async () => {
//       try {
//         const result = await getAllQueryData('itemsbyclient', 'client_id=1&org_id=1') // Fetch data
//         console.log(result.data)
//         setItemData(result.data)
//       } catch (error) {
//         console.error(error)
//       }
//     }

//     getClientData()
//     getItemData()
//   }, [])

//   const handleClientChange = (event) => {
//     const clientId = event.target.value
//     setSelectedClient(clientId)

//     // Find the selected client and update organizations
//     const client = clients.find((c) => c.id.toString() === clientId)
//     setOrganizations(client ? client.org : [])
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
//         <CModalTitle id="VerticallyCenteredScrollableExample2">Add Machine</CModalTitle>
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
//                   <CFormSelect
//                     aria-label="Select Client"
//                     value={selectedClient}
//                     onChange={handleClientChange}
//                   >
//                     <option value="">- Select -</option>
//                     {clients.map((client) => (
//                       <option key={client.id} value={client.id}>
//                         {client.name}
//                       </option>
//                     ))}
//                   </CFormSelect>
//                 </CCol>
//               </div>
//               <div className="mt-2" md={12}>
//                 <CCol>
//                   <CFormLabel>Organization</CFormLabel>
//                 </CCol>
//                 <CCol>
//                   <CFormSelect aria-label="Select Organization">
//                     <option value="">- Select -</option>
//                     {organizations.map((org) => (
//                       <option key={org.id} value={org.id}>
//                         {org.name}
//                       </option>
//                     ))}
//                   </CFormSelect>
//                 </CCol>
//               </div>
//               <CCol md={12}>
//                 <CFormInput type="text" id="machineName" label="Machine Name" placeholder="Name" />
//               </CCol>
//               <CCol xs={12} md={12} className="mt-3">
//                 <div className="mb-2">
//                   <CRow>
//                     <CFormLabel className="mb-3">Inventory</CFormLabel>
//                   </CRow>
//                   <CButton
//                     color="info"
//                     type="button"
//                     onClick={addProperty}
//                     className="btn-default text-sm mb-4"
//                   >
//                     Add Inventory&nbsp;
//                     <CIcon className="ml-2" icon={cilPlus} size="sm" />
//                   </CButton>
//                   {properties.length > 0 &&
//                     properties.map((property, index) => (
//                       <div className="d-flex gap-2 mb-2" key={index}>
//                         <CFormSelect aria-label="Default select example">
//                           <option>- Select -</option>
//                           {itemData.map((item) => (
//                             <option key={item.id} value={item.id}>
//                               {item.name}
//                             </option>
//                           ))}
//                           {/* <option value="1">Male</option>
//                           <option value="2">Female</option>
//                           <option value="3" disabled>
//                             Other
//                           </option> */}
//                         </CFormSelect>
//                         <CFormInput
//                           type="text"
//                           className="mb-0"
//                           value={property.values}
//                           onChange={(e) => handlePropertyValuesChange(index, e.target.value)}
//                           placeholder="Stock"
//                         />
//                         <CFormInput
//                           type="text"
//                           className="mb-0"
//                           value={property.values}
//                           onChange={(e) => handlePropertyValuesChange(index, e.target.value)}
//                           placeholder="QTY of machine"
//                         />
//                         <CButton color="danger" type="button" onClick={() => removeProperty(index)}>
//                           <CIcon className="ml-2" icon={cilTrash} size="sm" />
//                         </CButton>
//                       </div>
//                     ))}
//                 </div>
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
                {/* <CFormInput
                  type="text"
                  id="machineType"
                  label="Mobile Number"
                  placeholder="Mobile Number"
                /> */}
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
              {/* <CCol xs={12} md={12} className="mt-3">
                <div className="mb-2">
                  <CRow>
                    <CFormLabel className="mb-3">Features</CFormLabel>
                  </CRow>
                  <CButton
                    color="info"
                    type="button"
                    onClick={addProperty}
                    className="btn-default text-sm mb-4"
                  >
                    Add Features
                    <CIcon className="ml-2" icon={cilPlus} size="sm" />
                  </CButton>
                  {properties.length > 0 &&
                    properties.map((property, index) => (
                      <div className="d-flex gap-2 mb-2" key={index}>
                        <CFormInput
                          type="text"
                          className="mb-0"
                          value={property.name}
                          onChange={(e) => handlePropertyNameChange(index, e.target.value)}
                          placeholder="Property name (e.g., color)"
                        />
                        <CFormInput
                          type="text"
                          className="mb-0"
                          value={property.values}
                          onChange={(e) => handlePropertyValuesChange(index, e.target.value)}
                          placeholder="Values, comma-separated"
                        />
                        <CButton
                          color="danger"
                          type="button"
                          onClick={() => removeProperty(index)}
                        >
                          <CIcon className="ml-2" icon={cilTrash} size="sm" />
                        </CButton>
                      </div>
                    ))}
                </div>
              </CCol> */}
              <CCol xs={12} className="mt-3">
                <CFormCheck id="isActiveCheck" label="Is Active" />
              </CCol>
              {/* <CCol xs={12} className="mt-3">
                <CButton color="primary">Submit</CButton>
              </CCol> */}
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

export const AddMerchantModal = ({ visible, onClose }) => {
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
        <CModalTitle id="VerticallyCenteredScrollableExample2">Add Merchant</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard className="mb-4">
          <CCardBody>
            <CRow>
              <CCol md={12}>
                <CFormInput
                  type="text"
                  id="merchantName"
                  label="Merchant Name"
                  placeholder="Name"
                />
              </CCol>
              <CCol className="mt-2" md={12}>
                <CCol>
                  <CFormLabel>Phone Number</CFormLabel>
                </CCol>
                <InputMaskPhone />
                {/* <CFormInput
                  type="text"
                  id="machineType"
                  label="Mobile Number"
                  placeholder="Mobile Number"
                /> */}
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
              {/* <CCol xs={12} md={12} className="mt-3">
                <div className="mb-2">
                  <CRow>
                    <CFormLabel className="mb-3">Features</CFormLabel>
                  </CRow>
                  <CButton
                    color="info"
                    type="button"
                    onClick={addProperty}
                    className="btn-default text-sm mb-4"
                  >
                    Add Features
                    <CIcon className="ml-2" icon={cilPlus} size="sm" />
                  </CButton>
                  {properties.length > 0 &&
                    properties.map((property, index) => (
                      <div className="d-flex gap-2 mb-2" key={index}>
                        <CFormInput
                          type="text"
                          className="mb-0"
                          value={property.name}
                          onChange={(e) => handlePropertyNameChange(index, e.target.value)}
                          placeholder="Property name (e.g., color)"
                        />
                        <CFormInput
                          type="text"
                          className="mb-0"
                          value={property.values}
                          onChange={(e) => handlePropertyValuesChange(index, e.target.value)}
                          placeholder="Values, comma-separated"
                        />
                        <CButton
                          color="danger"
                          type="button"
                          onClick={() => removeProperty(index)}
                        >
                          <CIcon className="ml-2" icon={cilTrash} size="sm" />
                        </CButton>
                      </div>
                    ))}
                </div>
              </CCol> */}
              <CCol xs={12} className="mt-3">
                <CFormCheck id="isActiveCheck" label="Is Active" />
              </CCol>
              {/* <CCol xs={12} className="mt-3">
                <CButton color="primary">Submit</CButton>
              </CCol> */}
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

export const AddBrewStockModal = ({ visible, onClose }) => {
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
        <CModalTitle id="VerticallyCenteredScrollableExample2">Add Stock</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard className="mb-4">
          {/* <CCardHeader>Manage Machines</CCardHeader> */}
          <CCardBody>
            <CRow>
              <div className="mt-2" md={12}>
                <CCol>
                  <CFormLabel>Machine Name</CFormLabel>
                </CCol>
                <CCol>
                  <CFormSelect aria-label="Default select example">
                    <option>- Select -</option>
                    <option value="1">MC-000001</option>
                    <option value="2">MC-000002</option>
                    <option value="3" disabled>
                      MC-000201
                    </option>
                  </CFormSelect>
                </CCol>
              </div>
              <div className="mt-2" md={12}>
                <CCol>
                  <CFormLabel>Outlet Name</CFormLabel>
                </CCol>
                <CCol>
                  <CFormSelect aria-label="Default select example">
                    <option>- Select -</option>
                    <option value="1">Outlet 01</option>
                    <option value="2">Outlet 02</option>
                    <option value="3" disabled>
                      Outlet 03
                    </option>
                  </CFormSelect>
                </CCol>
              </div>
              {/* <CCol className="mt-2" md={12}>
                <CFormInput
                  type="text"
                  id="machineType"
                  label="Loading Quantity"
                  placeholder="Type"
                />
              </CCol> */}
              <CCol xs={12} md={12} className="mt-3">
                <div className="mb-2">
                  <CRow>
                    <CFormLabel className="mb-3">Stocks</CFormLabel>
                  </CRow>
                  <CButton
                    color="info"
                    type="button"
                    onClick={addProperty}
                    className="btn-default text-sm mb-4"
                  >
                    Add Stock&nbsp;
                    <CIcon className="ml-2" icon={cilPlus} size="sm" />
                  </CButton>
                  {properties.length > 0 &&
                    properties.map((property, index) => (
                      <div className="d-flex gap-2 mb-2" key={index}>
                        {/* <CFormInput
                          type="text"
                          className="mb-0"
                          value={property.name}
                          onChange={(e) => handlePropertyNameChange(index, e.target.value)}
                          placeholder="Property name (e.g., color)"
                        /> */}
                        <CCol>
                          <CFormSelect
                            style={{ minWidth: '200px' }}
                            aria-label="Default select example"
                          >
                            <option>- Select -</option>
                            <option value="1">Tea Stock</option>
                            <option value="2">Milk Stock</option>
                            <option value="3">Coffee Stock</option>
                            <option value="4" disabled>
                              Food Stock
                            </option>
                          </CFormSelect>
                        </CCol>
                        <CFormInput
                          type="text"
                          className="mb-0"
                          value={property.values}
                          onChange={(e) => handlePropertyValuesChange(index, e.target.value)}
                          placeholder="Qty"
                        />
                        <CButton color="danger" type="button" onClick={() => removeProperty(index)}>
                          <CIcon className="ml-2" icon={cilTrash} size="sm" />
                        </CButton>
                      </div>
                    ))}
                </div>
              </CCol>
              <CCol xs={12} className="mt-3">
                <CFormCheck id="isActiveCheck" label="Is Active" />
              </CCol>
              {/* <CCol xs={12} className="mt-3">
                <CButton color="primary">Submit</CButton>
              </CCol> */}
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
          {/* <CCardHeader>Manage Machines</CCardHeader> */}
          <CCardBody>
            <CRow>
              {/* <div className="mt-2" md={12}>
                <CCol>
                  <CFormLabel>Outlet Name</CFormLabel>
                </CCol>
                <CCol>
                  <CFormSelect aria-label="Default select example">
                    <option>- Select -</option>
                    <option value="1">Outlet 01</option>
                    <option value="2">Outlet 02</option>
                    <option value="3" disabled>
                      Outlet 03
                    </option>
                  </CFormSelect>
                </CCol>
              </div> */}
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
              {/* <CCol md={12}>
                <CFormInput type="text" id="walletAmount" label="Amount" placeholder="0.00" />
              </CCol> */}
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
              {/* <CCol xs={12} className="mt-3">
                <CButton color="primary">Submit</CButton>
              </CCol> */}
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

export const ViewSalesRepotingModal = ({ visible, onClose, rowData }) => {
  const [properties, setProperties] = useState([])
  const dummyData = ['Cappuccino 01', 'Tea 01', 'Water 01']

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
                    <CFormLabel>{rowData?.salesId || ''}</CFormLabel>
                  </CCol>
                </CRow>
              </div>

              <div className="mt-2" md={12}>
                <CRow>
                  <CCol>
                    <CFormLabel>Outlet :</CFormLabel>
                  </CCol>
                  <CCol>
                    <CFormLabel>{rowData?.outlet || ''}</CFormLabel>
                  </CCol>
                </CRow>
              </div>
              <div className="mt-2" md={12}>
                <CRow>
                  <CCol>
                    <CFormLabel>Customer :</CFormLabel>
                  </CCol>
                  <CCol>
                    <CFormLabel>John Clerk</CFormLabel>
                  </CCol>
                </CRow>
              </div>
              {/* <div className="mt-2" md={12}>
                <CRow>
                  <CCol>
                    <CFormLabel>Items :</CFormLabel>
                  </CCol>
                </CRow>
                {rowData?.amount?.split(',').map((item, index) => (
                  <CRow key={index} className="mt-1">
                    <CCol>
                      <CFormLabel>{item.trim()}</CFormLabel>
                    </CCol>
                  </CRow>
                ))}
              </div> */}
              <div className="mt-2" md={12}>
                <CRow>
                  <CCol md={6}>
                    <CFormLabel>Items :</CFormLabel>
                  </CCol>
                  <CCol md={6}>
                    {dummyData.map((item, index) => (
                      <CRow key={index}>
                        <CCol>
                          <CFormLabel>{item}</CFormLabel>
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
                    <CFormLabel>{rowData?.amount || ''}</CFormLabel>
                  </CCol>
                </CRow>
              </div>
              <div className="mt-2" md={12}>
                <CRow>
                  <CCol>
                    <CFormLabel>Mobile Number :</CFormLabel>
                  </CCol>
                  <CCol>
                    <CFormLabel>{rowData?.mobileNumber || ''}</CFormLabel>
                  </CCol>
                </CRow>
              </div>
              <div className="mt-2" md={12}>
                <CRow>
                  <CCol>
                    <CFormLabel>Date :</CFormLabel>
                  </CCol>
                  <CCol>
                    <CFormLabel>{rowData?.createdDate || ''}</CFormLabel>
                  </CCol>
                </CRow>
              </div>
              <div className="mt-2" md={12}>
                <CRow>
                  <CCol>
                    <CFormLabel>Status :</CFormLabel>
                  </CCol>
                  <CCol>
                    <CBadge color={rowData?.status === 'Paid' ? 'success' : 'info'}>
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
      {/* <CModalFooter>
        <CButton color="primary">Save changes</CButton>
      </CModalFooter> */}
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
              {/* <CCol md={12}>
                <CFormInput type="text" id="machineName" label="Machine Name" placeholder="Name" />
              </CCol>
              <CCol className="mt-2" md={12}>
                <CFormInput type="text" id="machineType" label="Outlet Name" placeholder="Type" />
              </CCol>
              <CCol className="mt-2" md={12}>
                <CFormInput
                  type="text"
                  id="machineType"
                  label="Loading Quantity"
                  placeholder="Type"
                />
              </CCol> */}
              {/* <CCol xs={12} md={12} className="mt-3">
                <div className="mb-2">
                  <CRow>
                    <CFormLabel className="mb-3">Features</CFormLabel>
                  </CRow>
                  <CButton
                    color="info"
                    type="button"
                    onClick={addProperty}
                    className="btn-default text-sm mb-4"
                  >
                    Add Features&nbsp;
                    <CIcon className="ml-2" icon={cilPlus} size="sm" />
                  </CButton>
                  {properties.length > 0 &&
                    properties.map((property, index) => (
                      <div className="d-flex gap-2 mb-2" key={index}>
                        <CFormInput
                          type="text"
                          className="mb-0"
                          value={property.name}
                          onChange={(e) => handlePropertyNameChange(index, e.target.value)}
                          placeholder="Property name (e.g., color)"
                        />
                        <CFormInput
                          type="text"
                          className="mb-0"
                          value={property.values}
                          onChange={(e) => handlePropertyValuesChange(index, e.target.value)}
                          placeholder="Values, comma-separated"
                        />
                        <CButton color="danger" type="button" onClick={() => removeProperty(index)}>
                          <CIcon className="ml-2" icon={cilTrash} size="sm" />
                        </CButton>
                      </div>
                    ))}
                </div>
              </CCol> */}
              {/* <CCol xs={12} className="mt-3">
                <CFormCheck id="isActiveCheck" label="Is Active" />
              </CCol> */}
              {/* <CCol xs={12} className="mt-3">
                <CButton color="primary">Submit</CButton>
              </CCol> */}
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
              {/* <CCol className="mt-2" md={12}>
                <CFormInput type="text" id="machineType" label="Outlet Name" placeholder="Type" />
              </CCol> */}
              {/* <CCol className="mt-2" md={12}>
                <CFormInput
                  type="text"
                  id="machineType"
                  label="Loading Quantity"
                  placeholder="Type"
                />
              </CCol> */}
              {/* <CCol xs={12} md={12} className="mt-3">
                <div className="mb-2">
                  <CRow>
                    <CFormLabel className="mb-3">Features</CFormLabel>
                  </CRow>
                  <CButton
                    color="info"
                    type="button"
                    onClick={addProperty}
                    className="btn-default text-sm mb-4"
                  >
                    Add Features&nbsp;
                    <CIcon className="ml-2" icon={cilPlus} size="sm" />
                  </CButton>
                  {properties.length > 0 &&
                    properties.map((property, index) => (
                      <div className="d-flex gap-2 mb-2" key={index}>
                        <CFormInput
                          type="text"
                          className="mb-0"
                          value={property.name}
                          onChange={(e) => handlePropertyNameChange(index, e.target.value)}
                          placeholder="Property name (e.g., color)"
                        />
                        <CFormInput
                          type="text"
                          className="mb-0"
                          value={property.values}
                          onChange={(e) => handlePropertyValuesChange(index, e.target.value)}
                          placeholder="Values, comma-separated"
                        />
                        <CButton color="danger" type="button" onClick={() => removeProperty(index)}>
                          <CIcon className="ml-2" icon={cilTrash} size="sm" />
                        </CButton>
                      </div>
                    ))}
                </div>
              </CCol> */}
              <CCol xs={12} className="mt-3">
                <CFormCheck id="isActiveCheck" label="Is Active" />
              </CCol>
              {/* <CCol xs={12} className="mt-3">
                <CButton color="primary">Submit</CButton>
              </CCol> */}
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

export const AddItemModal = ({ visible, onClose }) => {
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
        <CModalTitle id="VerticallyCenteredScrollableExample2">Add a Item</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard className="mb-4">
          {/* <CCardHeader>Manage Machines</CCardHeader> */}
          <CCardBody>
            <CRow>
              {/* <div className="mt-2" md={12}>
                <CCol>
                  <CFormLabel>Outlet Name</CFormLabel>
                </CCol>
                <CCol>
                  <CFormSelect aria-label="Default select example">
                    <option>- Select -</option>
                    <option value="1">Outlet 01</option>
                    <option value="2">Outlet 02</option>
                    <option value="3" disabled>
                      Outlet 03
                    </option>
                  </CFormSelect>
                </CCol>
              </div> */}
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
                <CFormInput type="text" id="machineType" label="Item Name" placeholder="Name" />
              </CCol>
              {/* <CCol md={12}>
                <CFormInput type="text" id="walletAmount" label="Amount" placeholder="0.00" />
              </CCol> */}
              <CCol className="mt-2" md={12}>
                <CFormInput
                  type="number"
                  id="walletAmount"
                  label="Price"
                  placeholder="0.00"
                  step="0.01" // Allow decimals
                  min="0" // Optional: Prevent negative amounts
                />
              </CCol>
              <div className="mt-2" md={12}>
                <CCol>
                  <CFormLabel>Item Type</CFormLabel>
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
                  <CFormLabel>Item Size</CFormLabel>
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
              {/* <div>
                <ImageUploader
                  style={{ height: 200, width: 200, background: 'rgb(0 182 255)' }}
                  deleteIcon={<CIcon className="ml-2" icon={cilPlus} size="sm" />}
                  uploadIcon={<CIcon className="ml-2" icon={cilTrash} size="sm" />}
                />
              </div> */}
              {/* <CCol className="mt-2" md={12}>
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
              </CCol> */}
              <CCol className="mt-2" md={12}>
                <CFormTextarea
                  id="exampleFormControlTextarea1"
                  label="Description"
                  rows={3}
                  text="Must be 8-75 words long."
                ></CFormTextarea>
              </CCol>
              {/* image uploader */}
              {/* <div className="mb-2 flex flex-wrap gap-1">
                <ReactSortable
                  list={images}
                  className="flex flex-wrap gap-1"
                  setList={updateImagesOrder}
                >
                  {!!images?.length &&
                    images.map((link) => (
                      <div key={link} className="h-24 bg-white p-4 shadow-sm rounded-md">
                        <img src={link} alt="" className="rounded-lg" />
                      </div>
                    ))}
                </ReactSortable>
                {isuploading && (
                  <div className="h-24 p-1 flex items-center">
                    <Spinner />
                  </div>
                )}
                <label className="w-16 h-16 cursor-pointer border rounded-md text-center flex flex-col items-center justify-center text-gray-400 shadow-sm mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 16"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  <div>Upload</div>
                  <input type="file" className="hidden" />
                </label>
                {!images?.length && (
                    <div>No images</div>
                )}
              </div> */}
              <div className="mt-2">
                <CFormInput type="file" id="formFile" label="Upload Image" />
              </div>
              {/* image uploader end */}

              <CCol xs={12} className="mt-3">
                <CFormCheck id="isActiveCheck" label="Is Active" />
              </CCol>
              {/* <CCol xs={12} className="mt-3">
                <CButton color="primary">Submit</CButton>
              </CCol> */}
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
              {/* <div className="mt-2" md={12}>
                <CCol>
                  <CFormLabel>Outlet Name</CFormLabel>
                </CCol>
                <CCol>
                  <CFormSelect aria-label="Default select example">
                    <option>- Select -</option>
                    <option value="1">Outlet 01</option>
                    <option value="2">Outlet 02</option>
                    <option value="3" disabled>
                      Outlet 03
                    </option>
                  </CFormSelect>
                </CCol>
              </div> */}
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
              {/* <CCol md={12}>
                <CFormInput type="text" id="walletAmount" label="Amount" placeholder="0.00" />
              </CCol> */}
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
              {/* <CCol xs={12} className="mt-3">
                <CButton color="primary">Submit</CButton>
              </CCol> */}
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

export const AddAlertTypeModal = ({ visible, onClose }) => {
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
        <CModalTitle id="VerticallyCenteredScrollableExample2">Add Alert Type</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard className="mb-4">
          {/* <CCardHeader>Manage Machines</CCardHeader> */}
          <CCardBody>
            <CRow>
              {/* <div className="mt-2" md={12}>
                <CCol>
                  <CFormLabel>Outlet Name</CFormLabel>
                </CCol>
                <CCol>
                  <CFormSelect aria-label="Default select example">
                    <option>- Select -</option>
                    <option value="1">Outlet 01</option>
                    <option value="2">Outlet 02</option>
                    <option value="3" disabled>
                      Outlet 03
                    </option>
                  </CFormSelect>
                </CCol>
              </div> */}
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
                  label="Alert Type Name"
                  placeholder="Name"
                />
              </CCol>
              <CCol xs={12} className="mt-3">
                <CFormCheck id="isActiveCheck" label="Is Active" />
              </CCol>
              {/* <CCol xs={12} className="mt-3">
                <CButton color="primary">Submit</CButton>
              </CCol> */}
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

export const AddNotificationTypeModal = ({ visible, onClose }) => {
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
        <CModalTitle id="VerticallyCenteredScrollableExample2">Add Notification Type</CModalTitle>
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
                  label="Notification Type Name"
                  placeholder="Name"
                />
              </CCol>
              <CCol xs={12} className="mt-3">
                <CFormCheck id="isActiveCheck" label="Is Active" />
              </CCol>
              {/* <CCol xs={12} className="mt-3">
                <CButton color="primary">Submit</CButton>
              </CCol> */}
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
