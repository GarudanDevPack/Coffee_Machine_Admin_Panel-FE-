import React, { useState,useEffect } from 'react'
import { CCard, CButton, CCardHeader, CCardBody, CFormInput, CFormSelect } from '@coreui/react'
import { cilPlus, cilFilter } from '@coreui/icons'
import {
  TableViewCustomer,
  TableViewCustomerWithFilter,
  TableViewCustomerWithPagination,
} from '../../../components/tblcomponents/CDataTable'
import CIcon from '@coreui/icons-react'

import CustomerDataTableMui from '../../../components/tblcomponents/DataTableWithFilter'
import { deleteCustomer, fetchCustomers } from '../../../actions/customerAction'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import AddCustomerModal from '../../modal/AddCustomerModal'


const Customers = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [addOREdit, setAddOREdit] = useState(false)
  const [editData, setEditData] = useState(null)
  const [dataLength, setdataLength] = useState(null)

  const getData = async () => {
      try {
        const result = await dispatch(fetchCustomers())
        console.log("data", result)
        console.log('[Debugging] : p result - ', dataLength, 'now - ', result.length);
        if (dataLength !== result.length) {
          console.log('changed length')
          setData(result)
          setdataLength(result.length)
        }
      } catch (error) {
        console.error(error)
      }
    }
 useEffect(() => {
    getData()
    const interval = setInterval(() => {

      console.log('Function called at interval')
      getData()
    }, 2000)
 return () => clearInterval(interval)
  }, [!isModalVisible, refresh])

   function saveLastLeftTime() {
    if (document.visibilityState === 'hidden') {
      const time = new Date().toISOString()
      localStorage.setItem('lastLeftTab', time)
      console.log('Tab hidden at:', time)
    }
  }
 function getLastLeftTime() {
    const lastLeft = localStorage.getItem('lastLeftTab')
    if (lastLeft) {
      const localTime = new Date(lastLeft).toLocaleString('en-US', {
        timeZone: 'Asia/Colombo', // Replace with your region's time zone
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      console.log('Last time you left the tab (local time):', localTime)
      return localTime
    } else {
      console.log('No record of when the tab was left.')
      return null
    }
  }

   document.addEventListener('visibilitychange', saveLastLeftTime)
  
    // On page load, log the last time the tab was left in the local timezone
    window.addEventListener('load', () => {
      const lastLeftTime = getLastLeftTime()
      if (lastLeftTime) {
        const message = `Welcome back! You last left the tab at: ${lastLeftTime}`
        console.log(message)
        alert(message) // Optional: Show a friendly alert
      }
    })
  
    const handleOpenEditItemModal = (item) => {
      //console.log(item)
      setEditData(item)
      setIsModalVisible(true)
      setAddOREdit(false)
    }
  
    const handleDelete = async (id) => {
      //console.log(id)
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await dispatch(deleteCustomer(id))
            Swal.fire('Deleted!', 'The customer has been deleted successfully.', 'success')
  
            setRefresh((prev) => !prev)
          } catch (error) {
            console.error('Failed to delete customer:', error)
            Swal.fire('Error!', 'Failed to delete the customer. Please try again.', 'error')
          }
        }
      })
    }
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          {/* <div>Manage Customer</div> */}
          <div className="d-flex justify-content-between align-items-center">
            <div>Manage Customers</div>

            <div className="d-flex align-items-center">
              {/* style={{ height: '100%' }}> */}
              <CButton
                color="info"
                type="button"
                onClick={() => setIsModalVisible(true)}
                className="btn-default text-sm"
              >
                Add New Cusomer&nbsp;
                <CIcon className="ml-2" icon={cilPlus} size="sm" />
              </CButton>
              <AddCustomerModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} 
                 editData={editData}
                addOREdit={addOREdit}
                />
            </div>
          </div>
        </CCardHeader>

        <CCardBody className="mt-4">
          <CustomerDataTableMui 
          tableData={data}
            onDelete={handleDelete}
            onEditClick={handleOpenEditItemModal}
          />
          {/* <CustomerDataTableMui /> */}
          {/* <TableViewCustomerWithFilter /> */}
          {/* <TableViewCustomerWithFilter/> */}
          {/* <DataTableMe /> */}
        </CCardBody>
      </CCard>
    </>
  )
}

export default Customers
