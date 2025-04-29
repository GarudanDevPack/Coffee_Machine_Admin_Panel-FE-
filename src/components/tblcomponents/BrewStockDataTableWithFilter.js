import React, { useMemo, useState } from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { CBadge, CButton, CTooltip } from '@coreui/react' // Import CoreUI buttons if needed
import { cilPenAlt, cilLowVision } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import ViewStockDataModal from '../../views/modal/ViewStockDataModal'

/**
 * author Anushka Isuru Lakmal
 * created on 02-01-2025-10h-14m
 * copyright 2025
 */

export const BrewStocksDataTableMui = ({ tableData, onEditClick }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null) // Store selected row data
  // Columns should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name', // Access nested data with dot notation
        header: 'Machine Name',
        size: 150,
      },
      {
        accessorKey: 'client_id.name',
        header: 'Client Name',
        size: 150,
      },
      {
        accessorKey: 'org_id.name',
        header: 'Org Name',
        size: 150,
      },
      {
        accessorKey: 'inventory.length',
        header: 'Item Count',
        size: 50,
        Cell: ({ cell }) => (
          <div className="d-flex justify-content-left">
            <CBadge color="info">{cell.getValue()}</CBadge>
          </div>
        ),
      },
      // {
      //   accessorKey: 'coffeeStock',
      //   header: 'Coffee Stock',
      //   size: 100,
      // },
      // {
      //   accessorKey: 'foodStock',
      //   header: 'Food Stock',
      //   size: 100,
      // },

      {
        id: 'actions', // Custom column for actions
        header: 'Action',
        size: 200,
        Cell: ({ row }) => (
          <div>
            <CTooltip content="View Stock" placement="top">
              <CButton
                color="success"
                size="sm"
                className="me-1"
                onClick={() => {
                  setSelectedRow(row.original) // Set the selected row data
                  setIsModalVisible(true) // Show modal
                }}
              >
                <CIcon icon={cilLowVision} size="sm" />
              </CButton>
            </CTooltip>
            <CTooltip content="Edit" placement="top">
              <CButton
                color="warning"
                size="sm"
                className="me-1"
                onClick={() => onEditClick(row.original)}
              >
                <CIcon className="ml-2" icon={cilPenAlt} size="sm" />
              </CButton>
            </CTooltip>
            {/* <CTooltip
              content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
              placement="top"
            >
              <CButton color="danger" size="sm">
                <CIcon className="ml-2" icon={cilTrash} size="sm" />
              </CButton>
            </CTooltip> */}
          </div>
        ),
      },
    ],
    [],
  )

  const table = useMaterialReactTable({
    columns,
    data: tableData.data || [], // Data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  })

  return (
    <>
      <MaterialReactTable table={table} />
      {/* Pass selectedRow data to the modal */}
      <ViewStockDataModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        rowData={selectedRow}
      />
    </>
  )
  // return <MaterialReactTable table={table} />
}

export default BrewStocksDataTableMui
