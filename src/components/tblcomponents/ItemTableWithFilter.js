import React, { useMemo } from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { CButton } from '@coreui/react' // Import CoreUI buttons if needed
import { cilPenAlt, cilTrash, cilQrCode } from '@coreui/icons'
import { CBadge } from '@coreui/react'
import CIcon from '@coreui/icons-react'

export const ItemDataTableMui = ({ tableData }) => {
  // Columns should be memoized or stable
  const columns = useMemo(
    () => [
      // {
      //   accessorKey: 'id',
      //   header: '#',
      //   size: 50,
      // },
      {
        accessorKey: 'name',
        header: 'Item Name',
        size: 150,
      },
      // {
      //   accessorKey: 'itemType',
      //   header: 'Item Type',
      //   size: 150,
      // },
      {
        accessorKey: 'price',
        header: 'Price',
        size: 150,
      },
      {
        accessorKey: 'nozzle',
        header: 'Nozzle Number',
        size: 100,
        Cell: ({ cell }) => (
          <div className="d-flex justify-content-center">
            <CBadge color="info">{cell.getValue()}</CBadge>
          </div>
        ),
      },
      {
        accessorKey: 'description',
        header: 'Description',
        size: 150,
      },
      {
        accessorKey: 'createdAt',
        header: 'Created Date',
        size: 150,
      },
      {
        accessorKey: 'updatedAt',
        header: 'Updated Date',
        size: 150,
      },
      {
        id: 'actions', // Custom column for actions
        header: 'Action',
        size: 200,
        Cell: ({ row }) => (
          <div>
            <CButton color="warning" size="sm" className="me-1">
              <CIcon className="ml-2" icon={cilPenAlt} size="sm" />
            </CButton>
            <CButton color="danger" size="sm">
              <CIcon className="ml-2" icon={cilTrash} size="sm" />
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

  return <MaterialReactTable table={table} />
}

export default ItemDataTableMui
