
import React, { useEffect, useState } from 'react'
import { CCard, CButton, CCardHeader, CCardBody } from '@coreui/react'
import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
// import { AddCustomerWalletModal, AddItemModal } from '../../modal/AddComponentModel'
import ItemDataTableMui from '../../../components/tblcomponents/ItemTableWithFilter'
import AddItemModal from '../../modal/ItemModal'
import { useDispatch } from 'react-redux'
import { deleteItem, fetchItemss } from '../../../actions/itemAction'
import Swal from 'sweetalert2'
import socket from '../../../realtime/socketSingleton'
import { useRoomNoProvider } from '../../../realtime/useRoomNoProvider'

/**
 * author Anushka Isuru Lakmal
 * created on 23-01-2025-14h-01m
 * copyright 2025
 */

const Items = () => {
  // Move the useRoomNoProvider hook inside the component
   useRoomNoProvider(socket, ['items'])

  const [isModalVisible, setIsModalVisible] = useState(false)
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [addOREdit, setAddOREdit] = useState(false)
  const [editData, setEditData] = useState(null)
  const [dataLength, setdataLength] = useState(null)

  const getData = async () => {
    try {
      const result = await dispatch(fetchItemss())
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

  // Socket event handlers
  useEffect(() => {
    if (!socket) return

    const handleItemCreated = (newItem) => {
      console.log('🆕 New item created via socket:', newItem)
      setData(prevData => {
        if (Array.isArray(prevData)) {
          return [...prevData, newItem]
        }
        return [newItem]
      })
      setdataLength(prev => (prev || 0) + 1)
      
      // Show success toast
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: `New item "${newItem.name}" was added`,
        showConfirmButton: false,
        timer: 3000
      })
    }

    const handleItemUpdated = (updatedItem) => {
      console.log('✏️ Item updated via socket:', updatedItem)
      setData(prevData => {
        if (Array.isArray(prevData)) {
          return prevData.map(item => 
            item.id === updatedItem.id ? updatedItem : item
          )
        }
        return [updatedItem]
      })
      
      // Show success toast
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'info',
        title: `Item "${updatedItem.name}" was updated`,
        showConfirmButton: false,
        timer: 3000
      })
    }

        const handleItemDeleted = (deletedItem) => {
      console.log('🗑️ Item deleted via socket:', deletedItem)
      setData(prevData => {
        if (Array.isArray(prevData)) {
          const filteredData = prevData.filter(item => item.id !== deletedItem.id)
          console.log('Filtered data after delete:', filteredData.length)
          return filteredData
        }
        return []
      })
      setdataLength(prev => Math.max(0, (prev || 1) - 1))
      
      // Show success toast
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: `Item "${deletedItem.name}" was deleted`,
        showConfirmButton: false,
        timer: 3000
      })
    }

    // Add socket event listeners
    socket.on('item:created', handleItemCreated)
    socket.on('item:updated', handleItemUpdated)
    socket.on('item:deleted', handleItemDeleted)

    // Cleanup function
    return () => {
      socket.off('item:created', handleItemCreated)
      socket.off('item:updated', handleItemUpdated)
      socket.off('item:deleted', handleItemDeleted)
    }
  }, [socket])

  
  useEffect(() => {
    getData()
    const interval = setInterval(() => {
      console.log('Function called at interval')
      getData()
    }, 2000)

    return () => clearInterval(interval)
  }, [!isModalVisible, refresh])

  // Move these event listeners inside useEffect to avoid side effects during render
  useEffect(() => {
    // Function to save the last time the tab was left
    function saveLastLeftTime() {
      if (document.visibilityState === 'hidden') {
        const time = new Date().toISOString()
        localStorage.setItem('lastLeftTab', time)
        console.log('Tab hidden at:', time)
      }
    }

    // Function to retrieve and display the last time the tab was left in your local timezone
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

    // Add event listener for visibility change
    document.addEventListener('visibilitychange', saveLastLeftTime)

    // On component mount, log the last time the tab was left in the local timezone
    const lastLeftTime = getLastLeftTime()
    if (lastLeftTime) {
      const message = `Welcome back! You last left the tab at: ${lastLeftTime}`
      console.log(message)
      // Consider removing the alert as it can be intrusive
      // alert(message) // Optional: Show a friendly alert
    }

    // Cleanup function
    return () => {
      document.removeEventListener('visibilitychange', saveLastLeftTime)
    }
  }, [])

  const handleOpenEditItemModal = (item) => {
    //console.log(item)
    setEditData(item)
    setIsModalVisible(true)
    setAddOREdit(false)
  }

 const handleDelete = async (id) => {
    console.log('Attempting to delete item with ID:', id)
    
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
          console.log('Dispatching delete action for ID:', id)
          // Call the delete action
          await dispatch(deleteItem(id))
          
          console.log('Delete successful, updating local state')
          // IMMEDIATELY update local state for instant UI feedback
          setData(prevData => {
            if (Array.isArray(prevData)) {
              const filteredData = prevData.filter(item => item.id !== id)
              console.log('Immediately filtered data:', filteredData.length)
              return filteredData
            }
            return []
          })
          setdataLength(prev => Math.max(0, (prev || 1) - 1))
          
          Swal.fire('Deleted!', 'The item has been deleted successfully.', 'success')
          
          // Also trigger refresh as backup
          setRefresh((prev) => !prev)
        } catch (error) {
          console.error('Delete failed with error:', error)
          
          // Check if it's a server error
          if (error.response?.status >= 500) {
            Swal.fire({
              title: 'Server Error!', 
              text: 'There was a server error. The item might still exist. Please check and try again.',
              icon: 'error'
            })
          } else if (error.response?.status === 404) {
            // Item not found, it might already be deleted
            console.log('Item not found - might already be deleted')
            setData(prevData => {
              if (Array.isArray(prevData)) {
                return prevData.filter(item => item.id !== id)
              }
              return []
            })
            setdataLength(prev => Math.max(0, (prev || 1) - 1))
            Swal.fire('Notice', 'Item was not found - it may have already been deleted.', 'info')
          } else {
            Swal.fire('Error!', 'Failed to delete the item. Please try again.', 'error')
          }
          
          // Refresh to get accurate data regardless of error type
          setRefresh((prev) => !prev)
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
            <div>Manage Items</div>

            <div className="d-flex align-items-center">
              {/* style={{ height: '100%' }}> */}
              <CButton
                color="info"
                type="button"
                onClick={() => setIsModalVisible(true)}
                className="btn-default text-sm"
              >
                Add New Item&nbsp;
                <CIcon className="ml-2" icon={cilPlus} size="sm" />
              </CButton>
              <AddItemModal
                visible={isModalVisible}
                onClose={() => {
                  setIsModalVisible(false)
                  // Trigger refresh when modal closes to get latest data
                  setRefresh((prev) => !prev)
                }}
                editData={editData}
                addOREdit={addOREdit}
              />
            </div>
          </div>
        </CCardHeader>

        <CCardBody className="mt-4">
          <ItemDataTableMui
            tableData={data}
            onDelete={handleDelete}
            onEditClick={handleOpenEditItemModal}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default Items