import React, { useEffect, useState } from 'react'
import { CCard, CCardHeader, CCardBody } from '@coreui/react'
import ViewSalesDataTableMui from '../../../components/tblcomponents/ViewSalesDataTableWithFilter'
import { fetchSales } from '../../../actions/salesAction'
import { useDispatch } from 'react-redux'

/**
 * author Anushka Isuru Lakmal
 * created on 03-01-2025-09h-33m
 * copyright 2025
 */

const SalesReporting = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const dispatch = useDispatch()
  const [data, setData] = useState([])


  const getData = async () => {
    try {
      const result = await dispatch(fetchSales())
      setData(result)
      //console.log(result)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getData()
    const interval = setInterval(() => {
      getData()
    }, 2000)

    return () => clearInterval(interval)
  }, [!isModalVisible])

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          {/* <div>Manage Customer</div> */}
          <div className="d-flex justify-content-between align-items-center">
            <div>View Sales</div>
          </div>
        </CCardHeader>

        <CCardBody className="mt-4">
          <ViewSalesDataTableMui tableData={data} />
        </CCardBody>
      </CCard>
    </>
  )
}

export default SalesReporting
