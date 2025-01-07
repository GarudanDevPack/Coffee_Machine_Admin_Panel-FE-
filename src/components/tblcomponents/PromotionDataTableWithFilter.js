import React, { useMemo } from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { CButton } from '@coreui/react' // Import CoreUI buttons if needed
import { cilPenAlt, cilTrash, cilQrCode, cilSend, cilCaretRight } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

/**
 * author Anushka Isuru Lakmal
 * created on 07-01-2025-11h-07m
 * copyright 2025
 */

const data = [
  {
    id: 1,
    date: '06-01-2025 07:45 AM',
    name: 'Animation',
    type: 'IMAGE',
    page: 'HOME',
    clickCount: '2',
  },
  {
    id: 2,
    date: '06-02-2025 07:45 AM',
    name: 'Animation',
    type: 'IMAGE',
    page: 'HOME',
    clickCount: '3',
  },
  {
    id: 3,
    date: '04-01-2025 07:45 AM',
    name: 'Animation',
    type: 'IMAGE',
    page: 'HOME-ANI',
    clickCount: '6',
  },
]

export const PromotionDataTableMui = () => {
  // Columns should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accMachineessorKey: 'id',
        header: '#',
        size: 50,
      },
      {
        accessorKey: 'date', // Access nested data with dot notation
        header: 'Date',
        size: 150,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 150,
      },
      {
        accessorKey: 'type',
        header: 'Type',
        size: 150,
      },
      {
        accessorKey: 'page',
        header: 'Page',
        size: 200,
      },
      {
        accessorKey: 'clickCount', // Access nested data with dot notation
        header: 'Click Count',
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
            <CButton color="danger" size="sm" className="me-1">
              <CIcon className="ml-2" icon={cilTrash} size="sm" />
            </CButton>
            <CButton color="success" size="sm">
              <CIcon className="ml-2" icon={cilCaretRight} size="sm" />
            </CButton>
          </div>
        ),
      },
    ],
    [],
  )

  const table = useMaterialReactTable({
    columns,
    data,
  })

  return <MaterialReactTable table={table} />
}

export default PromotionDataTableMui
