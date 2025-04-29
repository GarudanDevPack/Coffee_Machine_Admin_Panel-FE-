import React, { useEffect, useState } from 'react'
import { CCard, CButton, CCardHeader, CCardBody, CFormInput, CFormSelect } from '@coreui/react'
import { cilPlus, cilFilter } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import BrewStocksDataTableMui from '../../../components/tblcomponents/BrewStockDataTableWithFilter'
import AddBrewStockModal from '../../modal/BrewStockModal'
import { useDispatch } from 'react-redux'
import {
  fetchMachineById,
  fetchMachines,
  fetchMachineStocks,
} from '../../../actions/machineActions'

/**
 * author Anushka Isuru Lakmal
 * created on 02-01-2025-13h-41m
 * copyright 2025
 */

const BrewStocks = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [addOREdit, setAddOREdit] = useState(false)
  const [isViewData, setIsViewData] = useState(false)
  const [editData, setEditData] = useState(null)

  const getData = async () => {
    try {
      const result = await dispatch(fetchMachines())
      setData(result)
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

  const fetchStockItem = async (id) => {
    try {
      const result = await dispatch(fetchMachineById(id))
      // console.log('[Debugging] fetchStock Machine ', result.data[0])
      setEditData(result.data[0])
      console.log('Item Data', itemData)
    } catch (error) {
      console.error(error)
    }
  }
  const handleOpenEditMachineModal = (machine) => {
    // if (machine) {
    //   fetchStockItem(machine.id)
    // }
    // console.log('[Debugging] : handleOpenEditMachineModal - ', machine)
    setEditData(machine)
    setIsModalVisible(true)
    setAddOREdit(true)
  }
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          {/* <div>Manage Customer</div> */}
          <div className="d-flex justify-content-between align-items-center">
            <div>Manage Stocks</div>

            <div className="d-flex align-items-center">
              {/* style={{ height: '100%' }}> */}
              {/* <CButton
                color="info"
                type="button"
                onClick={() => setIsModalVisible(true)}
                className="btn-default text-sm"
              >
                Add New Stock&nbsp;
                <CIcon className="ml-2" icon={cilPlus} size="sm" />
              </CButton> */}
              <AddBrewStockModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                editData={editData}
                addOREdit={addOREdit}
              />
            </div>
          </div>
        </CCardHeader>

        <CCardBody className="mt-4">
          <BrewStocksDataTableMui tableData={data} onEditClick={handleOpenEditMachineModal} />
        </CCardBody>
      </CCard>
    </>
  )
}

export default BrewStocks
