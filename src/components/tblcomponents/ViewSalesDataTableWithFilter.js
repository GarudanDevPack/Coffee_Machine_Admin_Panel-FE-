// import React, { useMemo, useState } from 'react'
// import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
// import { CBadge, CButton } from '@coreui/react' // Import CoreUI buttons if needed
// import { cilPenAlt, cilTrash, cilLowVision } from '@coreui/icons'
// import CIcon from '@coreui/icons-react'
// import { AddCustomerWalletModal } from '../../views/modal/AddComponentModel'

import { useMemo, useState } from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { CBadge, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLowVision } from '@coreui/icons'
import ViewSalesRepotingModal from '../../views/modal/ViewSalesReportingModal'

// /**
//  * author Anushka Isuru Lakmal
//  * created on 03-01-2025-12h-23m
//  * copyright 2025
//  */

export const ViewSalesDataTableMui = ({ tableData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null) // Store selected row data

  const columns = useMemo(
    () => [
      // {
      //   accessorKey: 'id',
      //   header: '#',
      //   size: 40,
      // },
      {
        accessorKey: 'id',
        header: 'Sales ID',
        size: 180,
      },
      // {
      //   accessorKey: 'machine_id',
      //   header: 'Machine',
      //   size: 120,
      // },
      {
        accessorKey: 'items_count',
        header: 'Items Count',
        size: 120,
        Cell: ({ cell }) => (
          <div className="d-flex justify-content-center">
            <CBadge color="light" style={{ flex: 0, color: 'black' }}>
              {cell.getValue()}
            </CBadge>
          </div>
        ),
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
        size: 160,
        Cell: ({ row }) => {
          const amount = row.original.amount ? parseFloat(row.original.amount).toFixed(2) : '0.00'
          const currency = row.original.currency || '' // Assuming 'currency' is another field in the data
          return `${amount} ${currency}`
        },
      },
      {
        accessorKey: 'payment_status',
        header: 'Payment Status',
        size: 150,
        Cell: ({ cell }) => {
          const status = cell.getValue()
          const getColor = (status) => {
            switch (status) {
              case 'completed':
                return 'success'
              case 'processing':
                return 'warning'
              default:
                return 'danger'
            }
          }

          return <CBadge color={getColor(status)}>{status}</CBadge>
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 150,
        Cell: ({ cell }) => {
          const status = cell.getValue()
          const getColor = (status) => {
            switch (status) {
              case 'completed':
                return 'success'
              case 'processing':
                return 'warning'
              default:
                return 'danger'
            }
          }

          return <CBadge color={getColor(status)}>{status}</CBadge>
        },
      },
      {
        accessorKey: 'createdAt',
        header: 'Created Date',
        size: 150,
        Cell: ({ row }) => {
          const date = new Date(row.original.updatedAt)
          return date
            .toLocaleString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })
            .replace(',', '') // Remove the comma
        },
      },
      {
        id: 'action',
        header: 'Action',
        size: 200,
        Cell: ({ row }) => (
          <div>
            <CButton
              color="light"
              size="sm"
              className="me-1"
              onClick={() => {
                setSelectedRow(row.original) // Set the selected row data
                setIsModalVisible(true) // Show modal
              }}
            >
              <CIcon icon={cilLowVision} size="sm" />
            </CButton>
          </div>
        ),
      },
    ],
    [],
  )

  const table = useMaterialReactTable({
    columns,
    data: tableData.data || [],
  })

  return (
    <>
      <MaterialReactTable table={table} />
      {/* Pass selectedRow data to the modal */}
      <ViewSalesRepotingModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        rowData={selectedRow}
      />
    </>
  )
}

export default ViewSalesDataTableMui
