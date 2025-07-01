import React, { useState,useEffect } from 'react'
import { CCard, CButton, CCardHeader, CCardBody } from '@coreui/react'
import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import PromotionDataTableMui from '../../../components/tblcomponents/PromotionDataTableWithFilter'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { deletePromotions, fetchPromotions } from '../../../actions/promotionAction'
import AddPromotionModal from '../../modal/AddPromotionModal'
/**
 * author Anushka Isuru Lakmal
 * created on 07-01-2025-09h-54m
 * copyright 2025
 */

const Promotions = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
   const dispatch = useDispatch()
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [addOREdit, setAddOREdit] = useState(false)
  const [editData, setEditData] = useState(null)
  const [dataLength, setdataLength] = useState(null)

  const getData = async () => {
    try {
      const result = await dispatch(fetchPromotions())
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

  // On page load, log the last time the tab was left in the local timezone
  window.addEventListener('load', () => {
    const lastLeftTime = getLastLeftTime()
    if (lastLeftTime) {
      const message = `Welcome back! You last left the tab at: ${lastLeftTime}`
      console.log(message)
      alert(message) // Optional: Show a friendly alert
    }
  })

  const handleOpenEditItemModal = (promotion) => {
    //console.log(item)
    setEditData(promotion)
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
          await dispatch(deletePromotions(id))
          Swal.fire('Deleted!', 'The promotion has been deleted successfully.', 'success')

          setRefresh((prev) => !prev)
        } catch (error) {
          console.error('Failed to delete promotion:', error)
          Swal.fire('Error!', 'Failed to delete the promotion. Please try again.', 'error')
        }
      }
    })
  }


  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <div className="d-flex justify-content-between align-items-center">
            <div>Manage Alerts</div>
            <div className="d-flex align-items-center">
              {/* style={{ height: '100%' }}> */}
              <CButton
                color="info"
                type="button"
                onClick={() => setIsModalVisible(true)}
                className="btn-default text-sm"
              >
                Add Advertisement&nbsp;
                <CIcon className="ml-2" icon={cilPlus} size="sm" />
              </CButton>

              <AddPromotionModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                 editData={editData}
                addOREdit={addOREdit}
              />
              {/* <CButton
                          color="info"
                          type="button"
                          onClick={() => console.log('popup add items!')}
                          className="btn-default text-sm"
                        >
                          Add  
                          <CIcon className="ml-2" icon={cilPlus} size="sm" />
                        </CButton> */}
            </div>
          </div>
        </CCardHeader>

        <CCardBody className="mt-4">
          <PromotionDataTableMui 
          tableData={data}
            onDelete={handleDelete}
            onEditClick={handleOpenEditItemModal}
          />
          {/* <ComerWalletCustDataTableMui /> */}
          {/* <AlertDataTableMui /> */}
        </CCardBody>
      </CCard>
    </>
  )
}

export default Promotions
