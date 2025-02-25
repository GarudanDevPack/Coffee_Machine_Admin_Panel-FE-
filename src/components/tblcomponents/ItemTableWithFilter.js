import React, { useMemo } from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { CButton } from '@coreui/react' // Import CoreUI buttons if needed
import { cilPenAlt, cilTrash, cilQrCode } from '@coreui/icons'
import { CBadge } from '@coreui/react'
import CIcon from '@coreui/icons-react'

export const ItemDataTableMui = ({ tableData, onDelete, onEditClick }) => {
  // Columns should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Item Name',
        size: 150,
      },
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
        accessorKey: 'updatedAt',
        header: 'Updated Date',
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
        id: 'actions', // Custom column for actions
        header: 'Action',
        size: 200,
        Cell: ({ row }) => (
          <div>
            <CButton
              color="warning"
              size="sm"
              className="me-1"
              //onClick={() => onEditClick(row.original)}
            >
              <CIcon className="ml-2" icon={cilPenAlt} size="sm" />
            </CButton>
            <CButton color="danger" size="sm" onClick={() => onDelete(row.original.id)}>
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
