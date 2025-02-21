/**
 * author Anushka Isuru Lakmal
 * created on 20-02-2025-10h-24m
 * copyright 2025
 */

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
import { fetchItemsTypes } from '../../actions/types/itemTypeAction'
import Swal from 'sweetalert2'
import { addItem } from '../../actions/itemAction'

const AddItemModal = ({ visible, onClose }) => {
  const [properties, setProperties] = useState([])
  const [images, setImages] = useState([])
  const dispatch = useDispatch()
  const [clients, setClients] = useState([])
  const [organizations, setOrganizations] = useState([])
  const [itemTypes, setItemTypes] = useState([])
  const [nozzles, setNozzles] = useState([])
  const [selectedClient, setSelectedClient] = useState('')
  const [selectedOrg, setSelectedOrg] = useState('')
  const [selectedItemType, setSelectedItemType] = useState('')
  const [itemName, setItemName] = useState('')
  const [price, setPrice] = useState('')
  const [selectedNozzle, setSelectedNozzle] = useState('')
  const [description, setDescription] = useState('')
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    //resetForm()
    const getClientData = async () => {
      try {
        const result = await dispatch(fetchClients())
        // console.log(result.data)
        setClients(result.data)
      } catch (error) {
        console.error(error)
      }
    }
    const getItemTypesData = async () => {
      try {
        const res = await dispatch(fetchItemsTypes())
        // console.log(res.data)
        setItemTypes(res.data)
      } catch (error) {
        console.error(error)
      }
    }

    getClientData()
    getItemTypesData()
  }, [])

  const handleSave = async () => {
    // Construct the data object
    let data = {}
    //if (!editData) {
    data = {
      client_id: Number(selectedClient),
      org_id: Number(selectedOrg),
      name: itemName,
      price: Number(price),
      item_size: "full",
      item_type_id: selectedItemType,
      nozzle: Number(selectedNozzle),
      description: description,
      rate: 1,
    }
    // } else {
    //   data = {
    //     id: selectedId,
    //     client_id: {
    //       id: Number(selectedClient),
    //       name: clients.find((c) => c.id.toString() === selectedClient)?.name || '',
    //     },
    //     org_id: {
    //       id: Number(selectedOrg),
    //       name: organizations.find((org) => org.id.toString() === selectedOrg)?.name || '',
    //     },
    //     name: machineName,
    //     item_id: properties.map((prop) => prop.item_id),
    //     status: isActive ? 'online' : 'offline',
    //     last_maintenance: new Date(),
    //     expire_at: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // Set expire_at to 1 year from now
    //     inventory: properties.map((prop) => ({
    //       item_id: prop.item_id,
    //       stock: Number(prop.stock),
    //       qty: Number(prop.qty),
    //     })),
    //   }
    //   //console.log('in edit mode : ', data)
    //}

    try {
      let response = {}
      //if (!editData) {
      console.log(data)
      response = await dispatch(addItem(data))
      // } else {
      //   response = await dispatch(updateMachineById(data))
      // }
      // console.log('responce : ', response)
      if (response) {
        Swal.fire({
          title: 'Saved!',
          text: 'Item is saved successfully!',
          icon: 'success',
        })
        //resetForm()
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

  // Handle organization selection change
  const handleItemTypeChange = (event) => {
    setSelectedItemType(event.target.value)
  }

  // Handle machine name change
  const handleItemNameChange = (event) => {
    setItemName(event.target.value)
  }

  const handleNozzleChange = (event) => {
    setSelectedNozzle(event.target.value)
  }

  const handlePriceChange = (event) => {
    setPrice(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  // Handle isActive checkbox change
  const handleIsActiveChange = (event) => {
    setIsActive(event.target.checked)
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
                  id="itemName"
                  label="Item Name"
                  placeholder="Name"
                  value={itemName}
                  onChange={handleItemNameChange}
                />
              </CCol>
              <CCol className="mt-2" md={12}>
                <CFormInput
                  type="number"
                  id="walletAmount"
                  label="Price"
                  placeholder="0.00"
                  step="0.01" // Allow decimals
                  min="0" // Optional: Prevent negative amounts
                  value={price}
                  onChange={handlePriceChange}
                />
              </CCol>
              <div className="mt-2" md={12}>
                <CCol>
                  <CFormLabel>Item Type</CFormLabel>
                </CCol>
                <CCol>
                  <CFormSelect
                    aria-label="Default select example"
                    value={selectedItemType}
                    onChange={handleItemTypeChange}
                  >
                    <option>- Select -</option>
                    {itemTypes.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
              </div>
              {/* <div className="mt-2" md={12}>
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
              </div> */}
              <div className="mt-2" md={12}>
                <CCol>
                  <CFormLabel>Item Nozzle</CFormLabel>
                </CCol>
                <CCol>
                  <CFormSelect
                    aria-label="Default select example"
                    value={selectedNozzle}
                    onChange={handleNozzleChange}
                  >
                    <option>- Select -</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5} disabled>
                      5
                    </option>
                  </CFormSelect>
                </CCol>
              </div>
              <CCol className="mt-2" md={12}>
                <CFormTextarea
                  id="exampleFormControlTextarea1"
                  label="Description"
                  rows={2}
                  text="Must be 8-75 words long."
                  value={description}
                  onChange={handleDescriptionChange}
                ></CFormTextarea>
              </CCol>
              <div className="mt-2">
                <CFormInput type="file" id="formFile" label="Upload Image" />
              </div>
              {/* image uploader end */}

              <CCol xs={12} className="mt-3">
                <CFormCheck
                  id="isActiveCheck"
                  label="Is Active"
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
export default AddItemModal
