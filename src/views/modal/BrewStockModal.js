import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CFormSelect,
  CCol,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilTrash } from '@coreui/icons'
import Swal from 'sweetalert2'
import { fetchMachineById, updateMachineById } from '../../actions/machineActions'
import { useDispatch } from 'react-redux'
import { fetchItemsByClient } from '../../actions/itemAction'
/**
 * author Anushka Isuru Lakmal
 * created on 10-04-2025-13h-59m
 * copyright 2025
 */

const AddBrewStockModal = ({ visible, onClose, editData, addOREdit }) => {
  const dispatch = useDispatch()
  const [properties, setProperties] = useState([])
  const [itemData, setItemData] = useState([])
  const [machineData, setmachineData] = useState([])
  const [clients, setClients] = useState([])
  const [selectedId, setSelectedId] = useState('')
  const [selectedClient, setSelectedClient] = useState('')
  const [organizations, setOrganizations] = useState([])
  const [machineName, setMachineName] = useState('')
  const [nozzle, setNozzle] = useState('')
  const [selectedOrg, setSelectedOrg] = useState('')
  const [isActive, setIsActive] = useState(false)

  const addProperty = () => {
    setProperties([...properties, { name: '', values: '' }])
  }

  const removeProperty = (index) => {
    setProperties(properties.filter((_, i) => i !== index))
  }

  // const handlePropertyNameChange = (index, value) => {
  //   const updatedProperties = [...properties]
  //   updatedProperties[index].name = value
  //   setProperties(updatedProperties)
  // }

  const handlePropertyChange = (index, field, value) => {
    // Validate numeric input for 'stock' and 'qty'
    if (field === 'stock' || field === 'qty') {
      value = value.replace(/[^0-9.]/g, '') // Allow only numeric input and decimals
    }

    const updatedProperties = [...properties]
    updatedProperties[index] = { ...updatedProperties[index], [field]: value }
    if (field === 'item_id') {
      const selectedItem = itemData.find((item) => item.id === value)
      if (selectedItem) {
        updatedProperties[index].nozzle = selectedItem.nozzle // 👈 set nozzle here
      } else {
        updatedProperties[index].nozzle = '' // or null or 0
      }
    }
    console.log('[Debugging] : properties - ', updatedProperties)
    setProperties(updatedProperties)
  }

  const getItemData = async () => {
    try {
      const result = await dispatch(fetchItemsByClient('client_id=1&org_id=1'))
      setItemData(result.data)
      console.log(result.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getItemData()
    // console.log(addOREdit)
    if (addOREdit) {
      resetForm()
    }
    // console.log(editData)
    if (editData) {
      console.log(editData)
      setSelectedId(editData.id || '')
      setMachineName(editData.name || '')
      setProperties(
        editData.inventory?.map((item) => ({
          item_id: item.item_id,
          nozzle: item.nozzle,
          stock: item.stock.toString(),
          qty: item.qty.toString(),
          cupcount: item.cupcount.toString(),
        })) || [],
      )
    } else {
      resetForm()
      // console.log(clients)
    }
  }, [editData])

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

    let machine_id = selectedId
    let data = {
      item_id: properties.map((prop) => prop.item_id),
      inventory: properties.map((prop) => ({
        item_id: prop.item_id,
        nozzle: prop.nozzle,
        stock: Number(prop.stock),
        qty: Number(prop.qty),
        cupcount: Number(prop.qty),
      })),
    }
    console.log('in edit mode : ', data)
    // }

    try {
      console.log('[Debugging] : save content - ', data)
      let response = await dispatch(updateMachineById(machine_id, data))
      console.log('responce : ', response)
      if (response) {
        Swal.fire({
          title: 'Saved!',
          text: 'Stock is saved successfully!',
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
        <CModalTitle id="VerticallyCenteredScrollableExample2">Add Stock</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard className="mb-4">
          <CCardBody>
            <CRow>
              <div className="mt-2" md={12}>
                <CRow>
                  <CCol>
                    <CFormLabel>Machine Name :</CFormLabel>
                  </CCol>
                  <CCol>
                    <CBadge color="success">{machineName || ''}</CBadge>
                  </CCol>
                </CRow>
              </div>
              {/* //machineData?.name */}
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
                    properties.map((property, index) => {
                      // Find the selected item based on item_id
                      const selectedItem = itemData.find((item) => item.id === property.item_id)

                      return (
                        <div className="d-flex gap-2 mb-2" key={index}>
                          <CCol>
                            <CFormSelect
                              style={{ minWidth: '200px' }}
                              aria-label="Default select example"
                              value={property.item_id}
                              onChange={(e) =>
                                handlePropertyChange(index, 'item_id', e.target.value)
                              }
                            >
                              <option>- Select -</option>
                              {itemData.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name} (Nozzle: {item.nozzle})
                                </option>
                              ))}
                            </CFormSelect>
                          </CCol>

                          <CFormInput
                            type="text"
                            className="mb-0"
                            value={property.stock}
                            onChange={(e) => handlePropertyChange(index, 'stock', e.target.value)}
                            placeholder="weight in gram"
                          />
                          <CFormInput
                            type="text"
                            className="mb-0"
                            value={property.qty}
                            onChange={(e) => handlePropertyChange(index, 'qty', e.target.value)}
                            placeholder="cup count"
                          />

                          <CButton
                            color="danger"
                            type="button"
                            onClick={() => removeProperty(index)}
                          >
                            <CIcon className="ml-2" icon={cilTrash} size="sm" />
                          </CButton>
                        </div>
                      )
                    })}

                  {/* {properties.length > 0 &&
                    properties.map((property, index) => (
                      <div className="d-flex gap-2 mb-2" key={index}>
                        <CCol>
                          <CFormSelect
                            style={{ minWidth: '200px' }}
                            aria-label="Default select example"
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
                        </CCol>
                        <CCol>
                          <CBadge color="success">{itemdata || ''}</CBadge>
                        </CCol>
                        <CFormInput
                          type="text"
                          className="mb-0"
                          value={property.stock}
                          onChange={(e) => handlePropertyChange(index, 'stock', e.target.value)}
                          placeholder="weight in gram"
                        />
                        <CFormInput
                          type="text"
                          className="mb-0"
                          value={property.qty}
                          onChange={(e) => handlePropertyChange(index, 'qty', e.target.value)}
                          placeholder="cup count"
                        />
                        <CButton color="danger" type="button" onClick={() => removeProperty(index)}>
                          <CIcon className="ml-2" icon={cilTrash} size="sm" />
                        </CButton>
                      </div>
                    ))} */}
                </div>
              </CCol>
              {/* <CCol xs={12} className="mt-3">
                <CFormCheck id="isActiveCheck" label="Is Active" />
              </CCol> */}
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

export default AddBrewStockModal
