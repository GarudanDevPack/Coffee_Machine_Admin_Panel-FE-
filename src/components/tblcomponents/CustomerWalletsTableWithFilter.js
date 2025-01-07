import React, { useMemo } from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { CButton } from '@coreui/react' // Import CoreUI buttons if needed
import { cilPenAlt, cilTrash, cilQrCode } from '@coreui/icons'
import { CBadge } from '@coreui/react'
import CIcon from '@coreui/icons-react'

/**
 * author Anushka Isuru Lakmal
 * created on 03-01-2025-10h-34m
 * copyright 2025
 */

const data = [
  {
    id: 1,
    customerId: 'John',
    amount: '1500.00',
    serialNo: '12678 2345 8765 0000',
    status: 'Active',
    createdDate: '01-01-2025',
    updatedDate: '01-01-2025',
  },
  {
    id: 2,
    customerId: 'Mark',
    amount: '7500.00',
    serialNo: '12678 2345 8765 0000',
    status: 'Active',
    createdDate: '01-01-2025',
    updatedDate: '01-01-2025',
  },
  {
    id: 3,
    customerId: 'Jack',
    amount: '0.00',
    serialNo: '12678 2345 8765 0000',
    status: 'Inactive',
    createdDate: '01-01-2025',
    updatedDate: '01-01-2025',
  },
]

export const CustomerWalletDataTableMui = () => {
  // Columns should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: '#',
        size: 50,
      },
      {
        accessorKey: 'customerId',
        header: 'Customer Name',
        size: 150,
      },
      {
        accessorKey: 'amount',
        header: 'Balance',
        size: 150,
      },
      {
        accessorKey: 'serialNo',
        header: 'Serial Number',
        size: 150,
      },
      {
        accessorKey: 'status',
        header: 'Card Status',
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

export default CustomerWalletDataTableMui
