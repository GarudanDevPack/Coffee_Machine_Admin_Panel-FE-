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
import { addAlertType, updateAlertTypeById } from '../../actions/types/alertTypeAction'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchClients } from '../../actions/clientAction'
import Swal from 'sweetalert2'

export const AddAlertTypeModal = ({ visible, onClose,editData,addOREdit  }) => {
const [properties, setProperties] = useState([])
const [images, setImages] = useState([])
const dispatch = useDispatch()
const [selectedClient, setSelectedClient] = useState('')
const [alerttTypename, setalerttTypename] = useState('')
const [isActive, setIsActive] = useState(false)
const [clients, setClients] = useState([])
const [organizations, setOrganizations] = useState([])
const [selectedOrg, setSelectedOrg] = useState('')
const [selectedId, setSelectedId] = useState('');

const resetForm = () => {
    setProperties([])
    setClients([])
    setOrganizations([])
   // setItemTypes([])
    setSelectedId('')
    setSelectedClient('')
    setSelectedOrg('')
   // setSelectedItemType('')
   // setItemName('')
    //setPrice('')
    //setSelectedNozzle('')
    //setDescription('')
    setIsActive(false)
    setSelectedClient('');
    setSelectedOrg('');
  }
  useEffect(() => {
      // console.log(addOREdit)
      if (addOREdit) {
        resetForm()
      }
  
      if (editData) {
        console.log(editData.nozzle)
        setSelectedId(editData.clientId|| '')
        setalerttTypename(editData.name || '')
        setSelectedClient(editData.client_id?.id?.toString() || '')
        // setPrice(editData.price || '')
        // setSelectedNozzle(editData.nozzle || '')
        // setDescription(editData.description || '')
  
       // setSelectedItemType(editData.item_type?.id || '')
        // console.log('slected: ',item)
  
        // const getItemTypesData = async () => {
        //   try {
        //     //console.log(editData.item_type?.id)
        //     const res = await dispatch(fetchItemTypeById(editData.item_type?.id.toString()))
        //     setSelectedItemType(res.data)
        //     console.log(res.data)
        //   } catch (error) {
        //     console.error(error)
        //   }
        // }
        // Fetch organizations for the client in editData
        const fetchOrganizationsForClient = async () => {
          try {
            const result = await dispatch(fetchClients())
            const client = result.data.find(
              (c) => c.id.toString() === editData.client_id.id.toString(),
            )
            if (client) {
              setOrganizations(client.org)
              setSelectedOrg(editData.org_id?.id?.toString() || '')
              setSelectedOrg(''); // Reset selectedOrg to empty string
            }
          } catch (error) {
            console.error(error)
          }
        }
         //getItemTypesData()
        fetchOrganizationsForClient()
      } else {
           resetForm();
        const getClientData = async () => {
          try {
            const result = await dispatch(fetchClients())
            setClients(result.data)
          } catch (error) {
            console.error(error)
          }
        }
        // const getItemTypesData = async () => {
        //   try {
        //     const res = await dispatch(fetchItemsTypes())
        //     setItemTypes(res.data)
        //   } catch (error) {
        //     console.error(error)
        //   }
        // }
  
        getClientData()
       // getItemTypesData()
      }
    }, [editData, visible])

  const addProperty = () => {
    setProperties([...properties, { name: '', values: '' }])
  }

  const handleIsActiveChange = (event) => {
    setIsActive(event.target.checked)
  }

    const handleOrgChange = (event) => {
    setSelectedOrg(event.target.value)
  }

  const handleClientChange = (event) => {
    const clientId = event.target.value
    setSelectedClient(clientId)

    const client = clients.find((c) => c.id.toString() === clientId)
    setOrganizations(client ? client.org : [])
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

  const handleAlertTypeName = (event) => {
    setalerttTypename(event.target.value)
  }
  const handleSave = async () => {
        let data = {}
        let dataToSend = {}
        let dataToUpdate = {}
        if (!editData) {
          data = {
            client_id: {
              id: Number(selectedClient),
              name: clients.find((type) => type.id.toString() === selectedClient)?.name || '',
            },
            org_id: {
              id: Number(selectedOrg),
              name: organizations.find((type) => type.id.toString() === selectedOrg)?.name || '',
            },
            name: alerttTypename,
            is_active: isActive,
            
          }
        } else {
          data = {
            id: selectedId,
            client_id: {
              id: Number(selectedClient),
              name: clients.find((type) => type.id.toString() === selectedClient)?.name || '',
            },
            org_id: {
              id: Number(selectedOrg),
              name: organizations.find((type) => type.id.toString() === selectedOrg)?.name || '',
            },
            name: alerttTypename,
            is_active: isActive,
          }
        }
         dataToSend = {
    client_id: data.client_id.id,
    org_id: data.org_id.id,
    name:alerttTypename,
    is_active: isActive
     
    
  },
  dataToUpdate = {
     id: selectedId,
      client_id: data.client_id.id,
    org_id: data.org_id.id,
    name:alerttTypename,
    is_active: isActive
  }
        try {
          let response = {}
          if (!editData) {
            response = await dispatch(addAlertType(dataToSend))
          } else {
            console.log(data)
            response = await dispatch(updateAlertTypeById(dataToUpdate))
          }
          if (response) {
            Swal.fire({
              title: 'Saved!',
              text: 'alert is saved successfully!',
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
        <CModalTitle id="VerticallyCenteredScrollableExample2">Add Alert Type</CModalTitle>
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
                                 <CFormSelect
                                                     aria-label="Default select example"
                                                     value={selectedClient}
                                                     onChange={handleClientChange}
                                                   >
                                                     <option>- Select -</option>
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
                                                    aria-label="Default select example"
                                                    value={selectedOrg}
                                                    onChange={handleOrgChange}
                                                  >
                                                    <option>- Select -</option>
                                                    {organizations.map((org) => (
                                                      <option key={org.id} value={org.id}>
                                                        {org.name}
                                                      </option>
                                                    ))}
                                                  </CFormSelect>
                                                </CCol>
              </div>
              <CCol className="mt-2" md={12}>
                <CFormInput
                  type="text"
                  id="machineType"
                  label="Alert Type Name"
                  placeholder="Name"
                  value={alerttTypename}
                  onChange={handleAlertTypeName}
                />
              </CCol>
              <CCol xs={12} className="mt-3">
                <CFormCheck id="isActiveCheck" label="Is Active"
                checked={isActive}
                onChange={handleIsActiveChange}
                />
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

export default AddAlertTypeModal