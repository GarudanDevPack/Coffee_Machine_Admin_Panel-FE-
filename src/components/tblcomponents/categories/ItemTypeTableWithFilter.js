import React, { useMemo } from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { CButton } from '@coreui/react' // Import CoreUI buttons if needed
import { cilPenAlt, cilTrash, cilQrCode } from '@coreui/icons'
import { CBadge } from '@coreui/react'
import CIcon from '@coreui/icons-react'

/**
 * author Anushka Isuru Lakmal
 * created on 24-01-2025-14h-58m
 * copyright 2025
*/



const data = [
  {
    id: 1,
    client: 'Garudan Pvt Ltd',
    itemType: 'Coffee',
    description: 'new',
    status: 'Active',
    createdDate: '01-01-2025',
    updatedDate: '01-01-2025',
  },
  {
    id: 1,
    client: 'Garudan Pvt Ltd',
    itemType: 'Tea',
    description: 'new',
    status: 'Inactive',
    createdDate: '01-01-2025',
    updatedDate: '01-01-2025',
  },
  {
    id: 1,
    client: 'Garudan Pvt Ltd',
    itemType: 'Water',
    description: 'new',
    status: 'Active',
    createdDate: '01-01-2025',
    updatedDate: '01-01-2025',
  },
  
]

export const ItemTypeDataTableMui = () => {
  // Columns should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: '#',
        size: 50,
      },
      {
        accessorKey: 'client',
        header: 'Client Name',
        size: 150,
      },
      {
        accessorKey: 'itemType',
        header: 'Item Type Name',
        size: 150,
      },
      {
        accessorKey: 'description',
        header: 'Description',
        size: 150,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 100,
        Cell: ({ cell }) => (
          <CBadge color={cell.getValue() === 'Active' ? 'info' : 'danger'}>
            {cell.getValue()}
          </CBadge>
        ),
      },
      {
        accessorKey: 'createdDate',
        header: 'Created Date',
        size: 150,
      },
      {
        accessorKey: 'updatedDate',
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
    data, // Data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  })

  return <MaterialReactTable table={table} />
}

export default ItemTypeDataTableMui
