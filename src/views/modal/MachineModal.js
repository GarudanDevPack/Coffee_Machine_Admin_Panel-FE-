/**
 * author Anushka Isuru Lakmal
 * created on 20-02-2025-10h-18m
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilTrash } from '@coreui/icons'
import Swal from 'sweetalert2'
import { addMachine, updateMachineById } from '../../actions/machineActions'
import { useDispatch } from 'react-redux'
import { fetchClients } from '../../actions/clientAction'
import { fetchItemsByClient } from '../../actions/itemAction'

const AddMachineModal = ({ visible, onClose, editData, addOREdit }) => {
  const dispatch = useDispatch()
  const [properties, setProperties] = useState([])
  const [itemData, setItemData] = useState([])
  const [clients, setClients] = useState([])
  const [selectedId, setSelectedId] = useState('')
  const [selectedClient, setSelectedClient] = useState('')
  const [organizations, setOrganizations] = useState([])
  const [machineName, setMachineName] = useState('')
  const [selectedOrg, setSelectedOrg] = useState('')
  const [isActive, setIsActive] = useState(false)


  const addProperty = () => {
    if (properties.length >= itemData.length) {
      Swal.fire({
        icon: 'warning',
        title: 'Limit Reached',
        text: 'You can only add up to 3 inventory items.',
      })
      return
    }

    setProperties([...properties, { item_id: '', stock: '', qty: '' }])
  }

  const removeProperty = (index) => {
    setProperties(properties.filter((_, i) => i !== index))
  }


  const handlePropertyChange = (index, field, value) => {
    // Validate numeric input for 'stock' and 'qty'
    if (field === 'stock' || field === 'qty') {
      value = value.replace(/[^0-9.]/g, '') // Allow only numeric input and decimals
    }

    const updatedProperties = [...properties]
    updatedProperties[index] = { ...updatedProperties[index], [field]: value }
    setProperties(updatedProperties)
  }

  useEffect(() => {
    // console.log(addOREdit)
    if (addOREdit) {
      resetForm()
    }
    if (editData) {
      // console.log(editData)
      setSelectedId(editData.id || '')
      setMachineName(editData.name || '')
      setSelectedClient(editData.client_id?.id?.toString() || '')
      setIsActive(editData.status === 'online')
      setProperties(
        editData.inventory?.map((item) => ({
          item_id: item.item_id,
          stock: item.stock.toString(),
          qty: item.qty.toString(),
        })) || [],
      )

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

      fetchOrganizationsForClient()
    } else {
      resetForm()
      // console.log(clients)
      const getClientData = async () => {
        try {
          const result = await dispatch(fetchClients())
          setClients(result.data)
        } catch (error) {
          console.error(error)
        }
      }

      const getItemData = async () => {
        try {
          const result = await dispatch(fetchItemsByClient('client_id=1&org_id=1'))
          setItemData(result.data)
          // console.log(result.data)
        } catch (error) {
          console.error(error)
        }
      }

      getClientData()
      getItemData()
    }
  }, [editData])

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

  const resetForm = () => {
    setProperties([])
    setMachineName('') // Clear machine name
    setSelectedClient('')
    setSelectedOrg('')
    setIsActive(false)
  }

  // Handle save button click
  const handleSave = async () => {
    // Construct the data object
    let data = {}
    if (!editData) {
      data = {
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
      }
    } else {
      data = {
        id: selectedId,
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
      }
      //console.log('in edit mode : ', data)
    }

    try {
      let response = {}
      if (!editData) {
        response = await dispatch(addMachine(data))
      } else {
        response = await dispatch(updateMachineById(data))
      }
      // console.log('responce : ', response)
      if (response) {
        Swal.fire({
          title: 'Saved!',
          text: 'Machine is saved successfully!',
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
    <CModal alignment="center" scrollable visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>{editData ? 'Edit Machine' : 'Add Machine'}</CModalTitle>
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
                    disabled={properties.length >= itemData.length}
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
          {editData ? 'Update changes' : 'Save changes'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default AddMachineModal
