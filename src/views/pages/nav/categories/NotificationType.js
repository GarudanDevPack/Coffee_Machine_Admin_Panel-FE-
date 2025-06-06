import React, { useEffect,useState } from 'react'
import { CCard, CButton, CCardHeader, CCardBody } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import NotificationTypeDataTableMui from '../../../../components/tblcomponents/categories/NotificationTypeTableWithFilter'
import AddNotificationTypeModal from '../../../modal/AddNotificationTypeModal'
import { useDispatch } from 'react-redux';
import { deleteNotificationType, fetchNotificationType } from '../../../../actions/types/notificationTypeAction'
import Swal from 'sweetalert2'
/**
 * author Anushka Isuru Lakmal
 * created on 24-01-2025-15h-24m
 * copyright 2025
*/



const NotificationType = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [addOREdit, setAddOREdit] = useState(false)
    const [editData, setEditData] = useState(null)
    const [dataLength, setdataLength] = useState(null)

  // Function to store the time when the tab is hidden
  function saveLastLeftTime() {
    if (document.visibilityState === 'hidden') {
      const time = new Date().toISOString()
      localStorage.setItem('lastLeftTab', time)
      console.log('Tab hidden at:', time)
    }
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
            await dispatch(deleteNotificationType(id));
            Swal.fire('Deleted!', 'The item type has been deleted successfully.', 'success')
  
            setRefresh((prev) => !prev)
          } catch (error) {
            console.error('Failed to delete machine:', error)
            Swal.fire('Error!', 'Failed to delete the machine. Please try again.', 'error')
          }
        }
      })
    }
    //update
  const handleOpenEditItemModal = (item) => {
      //console.log(item)
      setEditData(item)
      setIsModalVisible(true)
      setAddOREdit(false)
    }
  

  // Function to retrieve the last time the tab was left
  function getLastLeftTime() {
    const lastLeft = localStorage.getItem('lastLeftTab')
    if (lastLeft) {
      console.log('Last time you left the tab:', lastLeft)
      return lastLeft
    } else {
      console.log('No record of when the tab was left.')
      return null
    }
  }

  // Add event listener for visibility change
  document.addEventListener('visibilitychange', saveLastLeftTime)

  // On page load, log the last time the tab was left
  window.addEventListener('load', () => {
    const lastLeftTime = getLastLeftTime()
    if (lastLeftTime) {
      const message = `Welcome back! You last left the tab at: ${new Date(lastLeftTime).toLocaleString()}`
      console.log(message)
      alert(message) // Optional: Show a friendly alert
    }
  })
  const getData = async () => {
    try {
      const result = await dispatch(fetchNotificationType())
      console.log('[Debugging] : p result - ', dataLength, 'now - ', result.length);
      console.log('[Full JSON Response]', JSON.stringify(result, null, 2))
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
      console.log('notificationType Function called at interval')
      getData()
    }, 2000)

    return () => clearInterval(interval)
  }, [!isModalVisible, refresh])

  // Function to save the last time the tab was left
  function saveLastLeftTime() {
    if (document.visibilityState === 'hidden') {
      const time = new Date().toISOString()
      localStorage.setItem('lastLeftTab', time)
      console.log('Tab hidden at:', time)
    }
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          {/* <div>Manage Customer</div> */}
          <div className="d-flex justify-content-between align-items-center">
            <div>Manage Notification Type</div>

            <div className="d-flex align-items-center">
              {/* style={{ height: '100%' }}> */}
              <CButton
                color="info"
                type="button"
                onClick={() => setIsModalVisible(true)}
                className="btn-default text-sm"
              >
                Add New Notification Type&nbsp;
                <CIcon className="ml-2" icon={cilPlus} size="sm" />
              </CButton>
              <AddNotificationTypeModal visible={isModalVisible} onClose={() => setIsModalVisible(false)}
              editData={editData}
              addOREdit={addOREdit}
              />
            </div>
          </div>
        </CCardHeader>

        <CCardBody className="mt-4">
          {/* <CustomerWalletDataTableMui /> */}
          <NotificationTypeDataTableMui
          tableData={data}
           onDelete={handleDelete}
          onEditClick={handleOpenEditItemModal}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default NotificationType
