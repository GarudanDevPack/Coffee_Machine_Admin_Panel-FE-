import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CCard,
  CFormInput,
  CButton,
  CFormCheck,
  CCardHeader,
  CCardBody,
  CFormLabel,
} from '@coreui/react'
import { cilPlus, cilTrash } from '@coreui/icons'
// import { TableViewMachine } from '../../../components/tblcomponents/CDataTable'
import CIcon from '@coreui/icons-react'
import { AddMachineModal } from '../../modal/AddComponentModel'
import MachineDataTableMui from '../../../components/tblcomponents/MachineDataTableWithFilter'
import { fetchAllData, postData } from '../../../api'

const Machines = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchAllData('getallmachinelogs') // Fetch from /api/items
        //console.log(result.data)
        setData(result)
      } catch (error) {
        console.error(error)
      }
    }
    getData()
  }, [])

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
                onClick={() => setIsModalVisible(true)}
                // onClick={() => console.log(data)}
                className="btn-default text-sm"
              >
                Add Machine&nbsp;
                <CIcon className="ml-2" icon={cilPlus} size="sm" />
              </CButton>

              <AddMachineModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
            </div>
          </div>
        </CCardHeader>

        <CCardBody className="mt-4">
          <MachineDataTableMui tableData={data} />
          {/* <TableViewMachine /> */}
        </CCardBody>
      </CCard>
    </>
  )
}

export default Machines
