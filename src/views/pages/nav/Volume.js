//...ADDED NEWLY...
// Created by Sudeera De Silva

import React, { useEffect, useState } from 'react'
import { CCard, CButton, CCardHeader, CCardBody } from '@coreui/react'
import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useDispatch } from 'react-redux'

import Swal from 'sweetalert2'
import VolumeDataTableMui from '../../../components/tblcomponents/VolumeTableWithFilter'
import ViewVolumeDataModal from '../../modal/VIewVolumeDataModal'


const Volume = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [addOREdit, setAddOREdit] = useState(true)
  const [editData, setEditData] = useState(null)
  const [dataLength, setDataLength] = useState(null)
  const dispatch = useDispatch()

  const getData = async () => {
    try {
      const result = (await dispatch(fetchVolumesForItems(1,1))) || []
      console.log('[Debugging] ', result)

      if (dataLength !== result.length) {
        console.log('Data length changed. Updating table.')
        setData(result)
        setDataLength(result.length)
      }
    } catch (error) {
      console.error('Error fetching volume data:', error)
    }
  }

  useEffect(() => {
    getData()
    const interval = setInterval(() => {
      console.log('Fetching volume data on interval...')
      getData()
    }, 4000)

    return () => clearInterval(interval)
  }, [isModalVisible, refresh]) // ✅ Correct dependencies

  // ✅ Tab visibility tracking
  useEffect(() => {
    const saveLastLeftTime = () => {
      if (document.visibilityState === 'hidden') {
        const time = new Date().toISOString()
        localStorage.setItem('lastLeftTab', time)
        console.log('Tab hidden at:', time)
      }
    }

    const getLastLeftTime = () => {
      const lastLeft = localStorage.getItem('lastLeftTab')
      if (lastLeft) {
        const localTime = new Date(lastLeft).toLocaleString('en-US', {
          timeZone: 'Asia/Colombo',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
        alert(`Welcome back! You last left the tab at: ${localTime}`)
      }
    }

    document.addEventListener('visibilitychange', saveLastLeftTime)
    window.addEventListener('load', getLastLeftTime)

    return () => {
      document.removeEventListener('visibilitychange', saveLastLeftTime)
      window.removeEventListener('load', getLastLeftTime)
    }
  }, [])

  const handleOpenEditVolumeModal = (Volume) => {
    setEditData(Volume)
    setAddOREdit(false)
    setIsModalVisible(true)
  }

  const handleAddNewVolume = () => {
    setEditData(null)
    setAddOREdit(true)
    setIsModalVisible(true)
  }

  const handleDelete = async (id) => {
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
          await dispatch(deleteVolumeForItem(id))
          Swal.fire('Deleted!', 'The volume has been deleted successfully.', 'success')
          setRefresh((prev) => !prev)
        } catch (error) {
          console.error('Failed to delete volume:', error)
          Swal.fire('Error!', 'Failed to delete volume. Please try again later.', 'error')
        }
      }
    })
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <div className="d-flex justify-content-between align-items-center">
            <div>Manage Volume</div>
            <div className="d-flex align-items-center">
              <CButton
                color="info"
                type="button"
                onClick={handleAddNewVolume}
                className="btn-default text-sm">
                Add Volume For Item&nbsp;
                <CIcon className="ml-2" icon={cilPlus} size="sm" />
              </CButton>
              <ViewVolumeDataModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                editData={editData}
                addOREdit={addOREdit}
              />
             </div>
           </div>
         </CCardHeader>
        <CCardBody className="mt-4">
          <VolumeDataTableMui
            tableData={data}
            onDelete={handleDelete}
            onEditClick={handleOpenEditVolumeModal}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default Volume

