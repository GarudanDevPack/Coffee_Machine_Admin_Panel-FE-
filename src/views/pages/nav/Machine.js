import React, { useEffect, useState } from 'react'
import { CCard, CButton, CCardHeader, CCardBody } from '@coreui/react'
import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import MachineDataTableMui from '../../../components/tblcomponents/MachineDataTableWithFilter'
import { useDispatch } from 'react-redux'
import { deleteMachine, fetchMachines, updateMachineById } from '../../../actions/machineActions'
import Swal from 'sweetalert2'
import QRPreviewModal from '../../modal/QRModal'
import AddMachineModal from '../../modal/MachineModal'

const Machines = () => {
  const dispatch = useDispatch()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [addOREdit, setAddOREdit] = useState(false)
  const [isQRModalVisible, setIsQRModalVisible] = useState(false)
  const [qrCodeData, setQrCodeData] = useState({
    id: null,
    clientId: null,
    orgId: null,
  })
  const [editData, setEditData] = useState(null)

  const handleOpenEditMachineModal = (machine) => {
    setEditData(machine)
    setIsModalVisible(true)
    setAddOREdit(false)
  }

  const handleCloseEditMachineModal = () => {
    setEditData(null)
    setIsModalVisible(false)
  }

  const handleOpenQRModal = (id, clientId, orgId) => {
    setQrCodeData({ id, clientId, orgId })
    setIsQRModalVisible(true)
  }

  const handleCloseQRModal = () => {
    setIsQRModalVisible(false)
    setQrCodeData({ id: null, clientId: null, orgId: null })
  }

  const handeAddMachineModal = () => {
    setEditData(null)
    setIsModalVisible(true)
    setAddOREdit(true)
  }
  const getData = async () => {
    try {
      const result = await dispatch(fetchMachines())
      setData(Array.isArray(result) ? result : [])
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getData()
    const interval = setInterval(() => {
      // console.log('Function called at interval')
      getData()
    }, 2000)

    return () => clearInterval(interval)
  }, [!isModalVisible, refresh])

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
          await dispatch(deleteMachine(id))
          Swal.fire('Deleted!', 'The machine has been deleted successfully.', 'success')

          setRefresh((prev) => !prev)
        } catch (error) {
          console.error('Failed to delete machine:', error)
          Swal.fire('Error!', 'Failed to delete the machine. Please try again.', 'error')
        }
      }
    })
  }

  const handleConfigMode = async (id) => {
    let data = {
      config_mode: true,
    }
    handleUpdateData(id, data, 'Config')
  }
  // const hanldeSleepMode = async (id, sleep) => {
  //   if (sleep === true) {
  //     sleep = false
  //   } else {
  //     sleep = true
  //   }
  //   console.log(sleep)
  //   let data = {
  //     sleep_mode: sleep,
  //   }
  //   handleUpdateData(id, data, 'Sleep')
  // }
  const handleSleepMode = async (id, currentSleep) => {
    const sleep = !currentSleep // Toggle the boolean
    console.log(sleep)

    const data = {
      sleep_mode: sleep,
    }

    handleUpdateData(id, data, 'Sleep')
  }

  const handleFlushMode = async (id) => {
    let data = {
      flush_mode: true,
    }

    handleUpdateData(id, data, 'Flush')
  }

  const handleUpdateData = async (id, data, text) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, ${text} it`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(updateMachineById(id, data))
          Swal.fire('Updated!', `The ${id} has been Action successfully.`, 'success')
          setRefresh((prev) => !prev)
        } catch (error) {
          console.error('Failed to delete machine:', error)
          Swal.fire('Error!', `Failed to action in ${id} machine. Please try again.`, 'error')
        }
      }
    })
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <div className="d-flex justify-content-between align-items-center">
            <div>Manage Machines</div>
            <div className="d-flex align-items-center">
              {/* style={{ height: '100%' }}> */}
              <CButton
                color="info"
                type="button"
                onClick={() => handeAddMachineModal()}
                className="btn-default text-sm"
              >
                Add Machine&nbsp;
                <CIcon className="ml-2" icon={cilPlus} size="sm" />
              </CButton>

              <AddMachineModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                editData={editData}
                addOREdit={addOREdit}
              />
            </div>
          </div>
        </CCardHeader>
        <CCardBody className="mt-4">
          {/* qr modal */}
          <QRPreviewModal
            visible={isQRModalVisible}
            onClose={handleCloseQRModal}
            qrCodeData={qrCodeData}
          />
          {/* dataTable */}
          <MachineDataTableMui
            tableData={data}
            onDelete={handleDelete}
            onQRClick={handleOpenQRModal}
            onEditClick={handleOpenEditMachineModal}
            onConfigModeClick={handleConfigMode}
            onFlushModeClick={handleFlushMode}
            onSleepModeClick={handleSleepMode}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default Machines
