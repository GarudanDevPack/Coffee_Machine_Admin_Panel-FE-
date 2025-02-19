import React, { useMemo } from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { CBadge, CButton } from '@coreui/react' // Import CoreUI buttons if needed
import { cilPenAlt, cilTrash, cilQrCode } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

/**
 * author Anushka Isuru Lakmal
 * created on 02-01-2025-10h-14m
 * copyright 2025
 */

export const MachineDataTableMui = ({ tableData, onDelete, onQRClick, onEditClick }) => {
  const columns = useMemo(
    () => [
      // {
      //   accessorKey: '',
      //   header: '#',
      //   size: 50,
      // },
      {
        accessorKey: 'name',
        header: 'Name',
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
        header: 'Loading QTY',
        size: 150,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 100,
        Cell: ({ cell }) => (
          <CBadge color={cell.getValue() === 'online' ? 'success' : 'danger'}>
            {cell.getValue()}
          </CBadge>
        ),
      },
      {
        accessorKey: 'error',
        header: 'Description',
        size: 150,
      },
      {
        accessorKey: 'createdAt',
        header: 'Created Date',
        size: 150,
      },
      {
        id: 'actions', // Custom column for actions
        header: 'Action',
        size: 200,
        Cell: ({ row }) => (
          <div>
            <CButton
              color="info"
              size="sm"
              className="me-1"
              onClick={() =>
                onQRClick(row.original.id, row.original.client_id.id, row.original.org_id.id)
              }
            >
              <CIcon className="ml-2" icon={cilQrCode} size="sm" />
            </CButton>
            <CButton
              color="warning"
              size="sm"
              className="me-1"
              onClick={() => onEditClick(row.original)}
            >
              <CIcon className="ml-2" icon={cilPenAlt} size="sm" />
            </CButton>
            <CButton color="danger" size="sm" onClick={() => onDelete(row.original.id)}>
              <CIcon className="ml-2" icon={cilTrash} size="sm" />
            </CButton>
            {/* <CButton color="danger" size="sm">
              <CIcon className="ml-2" icon={cilTrash} size="sm" />
            </CButton> */}
          </div>
        ),
      },
    ],
    [onDelete],
  )

  const table = useMaterialReactTable({
    columns,
    data: tableData.data || [], // Data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  })

  return <MaterialReactTable table={table} />
}

export default MachineDataTableMui
