import React, { useMemo } from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { CButton } from '@coreui/react' // Import CoreUI buttons if needed
import { cilPenAlt, cilTrash, cilQrCode, cilSend } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

/**
 * author Anushka Isuru Lakmal
 * created on 06-01-2025-11h-11m
 * copyright 2025
 */

const data = [
  {
    id: 1,
    machineID: 'MC-00001',
    alertType: 'Normal',
    status: 'Level 01',
    solutionDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    alertDate: '06-01-2025 07:45 AM',
  },
  {
    id: 2,
    machineID: 'MC-00002',
    alertType: 'High',
    status: 'Level 02',
    solutionDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    alertDate: '06-01-2025 07:45 AM',
  },
  {
    id: 1,
    machineID: 'MC-00003',
    alertType: 'Normal',
    status: 'Level 03',
    solutionDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    alertDate: '06-01-2025 07:45 AM',
  },
]

export const AlertDataTableMui = () => {
  // Columns should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accMachineessorKey: 'id',
        header: '#',
        size: 50,
      },
      {
        accessorKey: 'machineID', // Access nested data with dot notation
        header: 'Machine ID',
        size: 150,
      },
      {
        accessorKey: 'alertType',
        header: 'Type',
        size: 150,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 150,
      },
      {
        accessorKey: 'solutionDescription',
        header: 'Description',
        size: 200,
      },
      {
        accessorKey: 'alertDate', // Access nested data with dot notation
        header: 'Date & Time',
        size: 150,
      },
      {
        id: 'actions', // Custom column for actions
        header: 'Action',
        size: 200,
        Cell: ({ row }) => (
          <div>
            <CButton color="info" size="sm" className="me-1">
              <CIcon className="ml-2" icon={cilSend} size="sm" />
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

export default AlertDataTableMui
