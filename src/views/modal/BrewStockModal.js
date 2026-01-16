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
  const [focusedField, setFocusedField] = useState(null)
  const [packetAlertShown, setPacketAlertShown] = useState(false)
  const [focusedInputIndex, setFocusedInputIndex] = useState(null);
  const ALLOWED_CUP_SIZES = [90, 120, 150, 180, 200];
  const toNumeric = (v) => (v || '').toString().replace(/[^0-9.]/g, '');
  

  const addProperty = () => {
    
    // setProperties([...properties, { name: '', values: '' }])
    setProperties([...properties, { item_id: '', packetofstock: '', qty: '',cupsize:'90', nozzle: '', gramsPerCup: '0.00' }])
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

    if (field === 'stock' || field === 'qty') {
      //value = value.replace(/[^0-9.]/g, '') // Allow only numeric input and decimals
      
    }

if (field === 'cupsize') value = String(value);
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
    //new 
       if ((field === 'packetofstock' || field === 'qty') && 
        updatedProperties[index].packetofstock && 
        updatedProperties[index].qty) {
      const packet = Number(updatedProperties[index].packetofstock)
      const qty = Number(updatedProperties[index].qty)
      if (qty !== 0) {
        updatedProperties[index].gramsPerCup = (packet / qty).toFixed(2)
      } else {
        updatedProperties[index].gramsPerCup = '0.00'
      }
    }
    console.log('[Debugging] : properties - ', updatedProperties)
    setProperties(updatedProperties)
  }

  const getItemData = async () => {
    try {
      const clientId = selectedClient || editData?.client_id?.id || 1
      const orgId = selectedOrg || editData?.org_id?.id || 1
      const queryString = `client_id=${clientId}&org_id=${orgId}`
      const result = await dispatch(fetchItemsByClient(queryString))
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
      console.log("In here Edit data : ", editData)
      setSelectedId(editData.id || '')
      setMachineName(editData.name || '')
       setSelectedClient(editData.client_id?.id || '')
      setSelectedOrg(editData.org_id?.id || '')
      
      setProperties(
        // editData.inventory?.map((item) => ({
        //   item_id: item.item_id,
        //   nozzle: item.nozzle,
        //   packetofstock: item.packetofstock != null ? item.packetofstock.toString() : '',
        //   stock: item.stock != null ? item.stock.toString() : '',
        //   qty: item.qty.toString(),
        //   cupcount: item.cupcount.toString(),
        //    cupsize: item.cupsize != null ? String(item.cupsize) : '120',
        //    gramsPerCup: gramsPerCup
        // })) || [],
        editData.inventory?.map((item) => {
          // Calculate gramsPerCup properly
          const packet = item.packetofstock != null ? Number(item.packetofstock) : 0
          const qty = item.qty != null ? Number(item.qty) : 0
          let calculatedGramsPerCup = '0.00'
          
          if (qty !== 0) {
            calculatedGramsPerCup = (packet / qty).toFixed(2)
          }

          return {
            item_id: item.item_id,
            nozzle: item.nozzle,
            packetofstock: item.packetofstock != null ? item.packetofstock.toString() : '',
            stock: item.stock != null ? item.stock.toString() : '',
            qty: item.qty.toString(),
            cupcount: item.cupcount.toString(),
            cupsize: item.cupsize != null ? String(item.cupsize) : '120',
            gramsPerCup: calculatedGramsPerCup
          }
        }) || [],
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
//   const handleSave = async () => {
//    for (const prop of properties) {
//     const packet = Number(prop.packetofstock)
//     const qty = Number(prop.qty)

//     if (!packet || !qty || qty === 0) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Invalid Input',
//         text: 'Packet or cup count cannot be zero or empty.',
//       })
//       return
//     }

    // const ratio = packet / qty
    // if (ratio < 3 || ratio > 50) {
    //   Swal.fire({
    //     icon: 'warning',
    //     title: 'Invalid Ratio',
    //     text: `Packet to cup ratio must be between 3 grams  and 20 grans . Found ratio: ${ratio.toFixed(2)}`,
    //   })
    //   return
    // }
//   }
//  const initialProperties = editData.inventory?.map((item) => {
//         const packet = item.packetofstock != null ? Number(item.packetofstock) : 0
//         const qty = item.qty != null ? Number(item.qty) : 0
       

//    let gramsPerCup = 0
//     if (item.gramsPerCup !== undefined && item.gramsPerCup !== null && item.gramsPerCup !== '') {
//       gramsPerCup = Number(String(p.gramsPerCup).replace(/[^0-9.]/g, '')) || 0
//     } else if (qty !== 0) {
//       gramsPerCup = +(packet / qty).toFixed(2)
//     }
        
//         return {
//           item_id: item.item_id,
//           nozzle: item.nozzle,
//           packetofstock: item.packetofstock != null ? item.packetofstock.toString() : '',
//           stock: item.packetofstock != null ? item.packetofstock.toString() : '',
//           qty: item.qty.toString(),
//           cupcount: item.cupcount.toString(),
//           cupsize: item.cupsize != null ? String(item.cupsize) : '120',
//           gramsPerCup: gramsPerCup,
//         }
//       }) || []
//        setProperties(initialProperties)
//     let machine_id = selectedId

    
//     let data = {
//       item_id: properties.map((prop) => prop.item_id),
//       inventory: properties.map((prop) => ({
//         item_id: prop.item_id,
//         nozzle: prop.nozzle,
//         packetofstock: Number(prop.packetofstock),
//         stock: Number(prop.stock),
//         qty: Number(prop.qty),
//         cupcount: Number(prop.qty),
//         cupsize: Number(prop.cupsize),
//         gramsPerCup: Number(prop.gramsPerCup) || 0
//       })),
//     }
//     // if(packetofstock===stock && stock===cupcount){
//     //   data.inventory = properties.map((prop) => ({
//     //     item_id: prop.item_id,
//     //     nozzle: prop.nozzle,
//     //     packetofstock: Number(prop.packetofstock),
//     //     stock: Number(prop.stock),
//     //     qty: Number(prop.qty),
//     //     cupcount: Number(prop.qty),
//     //   }))
//     // }else{
//     //   data.inventory = properties.map((prop) => ({
//     //     item_id: prop.item_id,
//     //     nozzle: prop.nozzle,
//     //    // packetofstock: Number(prop.packetofstock),
//     //     stock: Number(prop.stock),
//     //     qty: Number(prop.qty),
//     //    // cupcount: Number(prop.cupcount),
//     //   }))
//     // }
//     console.log('in edit mode : ', data)
//     // }

//     try {
//       console.log('[Debugging] : save content - ', data)
//       let response = await dispatch(updateMachineById(machine_id, data))
//       console.log('responce : ', response)
//       if (response) {
//         Swal.fire({
//           title: 'Saved!',
//           text: 'Stock is saved successfully!',
//           icon: 'success',
//         })
//         resetForm()
//         onClose() // Close the modal
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Oops...',
//           text: 'Something went wrong!',
//         })
//       }
//     } catch (error) {
//       console.error('Error saving data:', error)
//     }
//   }
// const handleSave = async () => {
//   // Validation logic (keep existing validation)
//   for (const prop of properties) {
//     const packet = Number(prop.packetofstock)
//     const qty = Number(prop.qty)

//     if (!packet || !qty || qty === 0) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Invalid Input',
//         text: 'Packet or cup count cannot be zero or empty.',
//       })
//       return
//     }

//     const ratio = packet / qty
//     if (ratio < 3 || ratio > 29) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Invalid Ratio',
//         text: `Packet to cup ratio must be between 3 grams and 50 grams. Found ratio: ${ratio.toFixed(2)}`,
//       })
//       return
//     }
//   }

//   let machine_id = selectedId
  
//   // FIXED: Properly calculate gramsPerCup for each item
//   let data = {
//     item_id: properties.map((prop) => prop.item_id),
//     inventory: properties.map((prop) => {
//       const packet = Number(prop.packetofstock) || 0
//       const qty = Number(prop.qty) || 0
      
//       // Calculate gramsPerCup properly
//       let gramsPerCup = 0
//       if (qty > 0) {
//         gramsPerCup = +(packet / qty).toFixed(2) // Use + to convert back to number
//       }

//       return {
//         item_id: prop.item_id,
//         nozzle: prop.nozzle,
//         packetofstock: packet,
//         stock: packet, // Initial stock equals packet weight
//         qty: qty,
//         cupcount: qty, // Initial cup count equals qty
//         cupsize: Number(prop.cupsize) || 90,
//         gramsPerCup: gramsPerCup
//       }
//     }),
//   }

//   try {
//     console.log('[Debugging] : save content - ', data)
//     let response = await dispatch(updateMachineById(machine_id, data))
//     console.log('response : ', response)
    
//     if (response) {
//       Swal.fire({
//         title: 'Saved!',
//         text: 'Stock is saved successfully!',
//         icon: 'success',
//       })
//       resetForm()
//       onClose()
//     } else {
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Something went wrong!',
//       })
//     }
//   } catch (error) {
//     console.error('Error saving data:', error)
//   }
// }
//cluade
const handleSave = async () => {
  // Validation logic (keep existing validation)
  for (const prop of properties) {
    const packet = Number(prop.packetofstock)
    const qty = Number(prop.qty)

    if (!packet || !qty || qty === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Input',
        text: 'Packet or cup count cannot be zero or empty.',
      })
      return
    }

    const ratio = packet / qty
    if (ratio < 3 || ratio > 29) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Ratio',
        text: `Packet to cup ratio must be between 3 grams and 50 grams. Found ratio: ${ratio.toFixed(2)}`,
      })
      return
    }
  }

  let machine_id = selectedId
  
  // 🔥 FIX: Fetch current inventory to preserve unchanged items
  const currentMachine = await dispatch(fetchMachineById(machine_id))
  const currentInventory = currentMachine?.data?.inventory || []

  // Create a map of current inventory by item_id for easy lookup
  const currentInventoryMap = new Map()
  currentInventory.forEach(item => {
    currentInventoryMap.set(item.item_id, item)
  })

  // Build inventory array with surgical updates
  const updatedInventory = properties.map((prop) => {
    const packet = Number(prop.packetofstock) || 0
    const qty = Number(prop.qty) || 0
    
    // Calculate gramsPerCup
    let gramsPerCup = 0
    if (qty > 0) {
      gramsPerCup = +(packet / qty).toFixed(2)
    }

    // Get existing item from current inventory
    const existingItem = currentInventoryMap.get(prop.item_id)

    // 🔥 KEY FIX: Only update stock/cupcount if packetofstock/qty changed
    let finalStock = packet
    let finalCupCount = qty

    if (existingItem) {
      // If packetofstock didn't change, keep existing stock
      if (existingItem.packetofstock === packet) {
        finalStock = existingItem.stock || packet
      }
      
      // If qty didn't change, keep existing cupcount
      if (existingItem.qty === qty) {
        finalCupCount = existingItem.cupcount || qty
      }
    }

    return {
      item_id: prop.item_id,
      nozzle: prop.nozzle,
      packetofstock: packet,
      stock: finalStock,           // ✅ Preserved if unchanged
      qty: qty,
      cupcount: finalCupCount,     // ✅ Preserved if unchanged
      cupsize: Number(prop.cupsize) || 90,
      gramsPerCup: gramsPerCup
    }
  })

  let data = {
    item_id: updatedInventory.map((item) => item.item_id),
    inventory: updatedInventory,
  }

  try {
    console.log('[Debugging] : save content - ', data)
    let response = await dispatch(updateMachineById(machine_id, data))
    console.log('response : ', response)
    
    if (response) {
      Swal.fire({
        title: 'Saved!',
        text: 'Stock is saved successfully!',
        icon: 'success',
      })
      resetForm()
      onClose()
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
                  {/* Cup Size (ml) */}
{properties.length > 0 &&
  properties.map((property, index) => (
    <div className="d-flex gap-2 mb-2" key={index}>
      <CCol md={4}>
        <CFormLabel>Volume of Cups :</CFormLabel>
      </CCol>
      <CCol md={8}>
        <CFormSelect
          style={{ minWidth: '160px' }}
          value={property.cupsize || '90'}
          onChange={(e) =>
            handlePropertyChange(index, 'cupsize', e.target.value)
          }
          title="Select cup size in milliliters"
        >
          {ALLOWED_CUP_SIZES.map((ml) => (
            <option key={ml} value={String(ml)}>
              {ml} ml
            </option>
          ))}
        </CFormSelect>
      </CCol>
    </div>
  ))
}
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
                            value={property.packetofstock}
                            onChange={(e) => handlePropertyChange(index, 'packetofstock', e.target.value)}
                            title="Enter the total packet weight in grams"
                            placeholder="packet of stock (grams)"
                            onFocus={() => {
  setFocusedInputIndex(index)
  Swal.fire({
    text: 'Enter packet in grams',
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    icon: 'info',
  })
}}
                            />
             
                          
                          <CFormInput
                            type="text"
                            className="mb-0"
                            value={property.qty}
                            onChange={(e) => handlePropertyChange(index, 'qty', e.target.value)}
                            placeholder="cup count"
                             onFocus={() => {
  setFocusedInputIndex(index)
  Swal.fire({
    text: 'Cups count',
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    icon: 'info',
  })
}}
                          />
<CFormInput
  type="text"
  className="mb-0"
  value={
    property.packetofstock && property.qty
      ? (Number(property.packetofstock) / Number(property.qty)).toFixed(2)
      : ''
  }
  placeholder="gram per cup"
  readOnly
   onFocus={() => {
  setFocusedInputIndex(index)
  Swal.fire({
    text: 'grams that can be used for one cup',
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    icon: 'info',
  })
}}
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


                </div>
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

export default AddBrewStockModal
