import React, { useMemo } from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { CButton } from '@coreui/react' // Import CoreUI buttons if needed
import { cilPenAlt, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

/**
 * author Anushka Isuru Lakmal
 * created on 02-01-2025-10h-14m
 * copyright 2025
 */

// Example data
const data = [
  {
    id: 1,
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    mobile: '+94112546786',
    email: 'john.doe@example.com',
    gender: 'Male',
    dob: '12-12-2000',
    createdDate: '01-01-2025',
  },
  {
    id: 2,
    name: {
      firstName: 'Jane',
      lastName: 'Doe',
    },
    mobile: '+94112345678',
    email: 'jane.doe@example.com',
    gender: 'Female',
    dob: '10-10-1990',
    createdDate: '15-01-2025',
  },
  // Add more data as needed
]

export const MerchantDataTableMui = () => {
  // Columns should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: '#',
        size: 40,
      },
      {
        accessorKey: 'name.firstName', // Access nested data with dot notation
        header: 'First Name',
        size: 120,
      },
      {
        accessorKey: 'name.lastName',
        header: 'Last Name',
        size: 120,
      },
      {
        accessorKey: 'mobile',
        header: 'Mobile No',
        size: 120,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 160,
      },
      {
        accessorKey: 'gender',
        header: 'Gender',
        size: 160,
      },
      {
        accessorKey: 'dob',
        header: 'Date of Birth',
        size: 150,
      },
      {
        accessorKey: 'createdDate',
        header: 'Created Date',
        size: 150,
      },
      {
        id: 'actions', // Custom column for actions
        header: 'Action',
        size: 200,
        Cell: ({ row }) => (
          <div>
            <CButton color="warning" size="sm" className="me-1">
              <CIcon icon={cilPenAlt} size="sm" />
            </CButton>
            <CButton color="danger" size="sm">
              <CIcon icon={cilTrash} size="sm" />
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

export default MerchantDataTableMui
