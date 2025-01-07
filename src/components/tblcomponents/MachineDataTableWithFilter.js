import React, { useMemo } from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { CButton } from '@coreui/react' // Import CoreUI buttons if needed
import { cilPenAlt, cilTrash, cilQrCode } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

/**
 * author Anushka Isuru Lakmal
 * created on 02-01-2025-10h-14m
 * copyright 2025
 */

const data = [
  {
    id: 1,
    machineId:'MC-00001',
    outletName: 'Colombo',
    loadingQty: '500',
    features: 'Load Extras',
    addedDate: '12-12-2000',
    createdDate: '01-01-2025',
  },
  {
    id: 2,
    machineId:'MC-00002',
    outletName: 'Colombo',
    loadingQty: '200',
    features: 'Load Extras',
    addedDate: '12-12-2000',
    createdDate: '01-01-2025',
  },
//   {
//     id: 2,
//     name: {
//       firstName: 'Jane',
//       lastName: 'Doe',
//     },
//     mobile: '+94112345678',
//     email: 'jane.doe@example.com',
//     gender: 'Female',
//     dob: '10-10-1990',
//     createdDate: '15-01-2025',
//   },
  // Add more data as needed
]

export const MachineDataTableMui = () => {
  // Columns should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: '#',
        size: 50,
      },
      {
        accessorKey: 'machineId', // Access nested data with dot notation
        header: 'Machine ID',
        size: 150,
      },
      {
        accessorKey: 'outletName',
        header: 'Outlet Name',
        size: 150,
      },
      {
        accessorKey: 'loadingQty',
        header: 'Loading QTY',
        size: 150,
      },
      {
        accessorKey: 'features',
        header: 'Features',
        size: 200,
      },
      {
        accessorKey: 'addedDate',
        header: 'Added Date',
        size: 100,
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
            <CButton color="info" size="sm" className="me-1">
              <CIcon className="ml-2" icon={cilQrCode} size="sm" />
            </CButton>
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

export default MachineDataTableMui
