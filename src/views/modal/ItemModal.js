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
import {
  fetchItemsTypes,
  fetchItemTypeById,
  updateItemTypeById,
} from '../../actions/types/itemTypeAction'
import Swal from 'sweetalert2'
import { addItem, updateItemById } from '../../actions/itemAction'

const AddItemModal = ({ visible, onClose, editData, addOREdit }) => {
  const [properties, setProperties] = useState([])
  const [images, setImages] = useState([])
  const dispatch = useDispatch()
  const [clients, setClients] = useState([])
  const [organizations, setOrganizations] = useState([])
  const [itemTypes, setItemTypes] = useState([])
  const [nozzles, setNozzles] = useState([])
  const [selectedId, setSelectedId] = useState('')
  const [selectedClient, setSelectedClient] = useState('')
  const [selectedOrg, setSelectedOrg] = useState('')
  const [selectedItemType, setSelectedItemType] = useState('')
  const [itemName, setItemName] = useState('')
  const [price, setPrice] = useState('')
  const [selectedNozzle, setSelectedNozzle] = useState('')
  const [description, setDescription] = useState('')
  const [isActive, setIsActive] = useState(false)

  const resetForm = () => {
    setProperties([])
    setClients([])
    setOrganizations([])
    setItemTypes([])
    setSelectedId('')
    setSelectedClient('')
    setSelectedOrg('')
    setSelectedItemType('')
    setItemName('')
    setPrice('')
    setSelectedNozzle('')
    setDescription('')
    setIsActive(false)
  }

  useEffect(() => {
    // console.log(addOREdit)
    if (addOREdit) {
      resetForm()
    }

    if (editData) {
      console.log(editData.nozzle)
      setSelectedId(editData.id || '')
      setItemName(editData.name || '')
      setSelectedClient(editData.client_id?.id?.toString() || '')
      setPrice(editData.price || '')
      setSelectedNozzle(editData.nozzle || '')
      setDescription(editData.description || '')

      setSelectedItemType(editData.item_type?.id || '')
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
          }
        } catch (error) {
          console.error(error)
        }
      }
      // getItemTypesData()
      fetchOrganizationsForClient()
    } else {
      const getClientData = async () => {
        try {
          const result = await dispatch(fetchClients())
          setClients(result.data)
        } catch (error) {
          console.error(error)
        }
      }
      const getItemTypesData = async () => {
        try {
          const res = await dispatch(fetchItemsTypes())
          setItemTypes(res.data)
        } catch (error) {
          console.error(error)
        }
      }

      getClientData()
      getItemTypesData()
    }
  }, [editData, visible])

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
    setImages(images)
  }

  const handleSave = async () => {
    let data = {}
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
        name: itemName,
        price: Number(price),
        item_size: 'full',
        item_type: {
          id: String(selectedItemType),
          name: itemTypes.find((type) => type.id.toString() === selectedItemType)?.name || '',
        },
        nozzle: Number(selectedNozzle),
        description: description,
        rate: 1,
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
        name: itemName,
        price: Number(price),
        item_size: 'full',
        item_type: {
          id: String(selectedItemType),
          name: itemTypes.find((type) => type.id.toString() === selectedItemType)?.name || '',
        },
        nozzle: Number(selectedNozzle),
        description: description,
        rate: 1,
      }
    }

    try {
      let response = {}
      if (!editData) {
        response = await dispatch(addItem(data))
      } else {
        console.log(data)
        response = await dispatch(updateItemById(data))
      }
      if (response) {
        Swal.fire({
          title: 'Saved!',
          text: 'Item is saved successfully!',
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
                    {/* {Array.isArray(itemTypes) ? (
                      itemTypes.map((type) => (
                        <option key={type.id} value={type.name}>
                          {type.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>Loading...</option>
                    )} */}

                    {itemTypes.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
              </div>
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
