import React, { useMemo } from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { CBadge, CButton, CTooltip } from '@coreui/react' // Import CoreUI buttons if needed
import {
  cilPenAlt,
  cilTrash,
  cilQrCode,
  cilColorFill,
  cilAudio,
  cilRss,
  cilToggleOff,
  cilToggleOn,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

/**
 * author Anushka Isuru Lakmal
 * created on 02-01-2025-10h-14m
 * copyright 2025
 */

export const MachineDataTableMui = ({
  tableData,
  onDelete,
  onQRClick,
  onEditClick,
  onConfigModeClick,
  onFlushModeClick,
  onSleepModeClick,
}) => {
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
        Cell: ({ cell }) => {
          const value = cell.getValue()
          const displayValue = value ? value.toUpperCase() : ''
          const color = value === 'READY_STATE' ? 'green' : 'red'

          return <span style={{ color }}>{displayValue}</span>
        },
      },
      // {
      //   accessorKey: 'error',
      //   header: 'Description',
      //   size: 150,
      //   Cell: ({ cell }) => {
      //     const value = cell.getValue()
      //     return (
      //       <span style={{ color: value === 'READY_STATE' ? 'green' : 'red' }}>
      //         {value.toUpperCase()}
      //       </span>
      //     )
      //   },
      // },
      // {
      //   accessorKey: 'updatedAt',
      //   header: 'Updated Date',
      //   size: 150,
      // },
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
        id: 'machine_actions', // Custom column for actions
        header: 'Machine Action',
        size: 100,
        Cell: ({ row }) => {
          const isOffline =
            row.original.status !== 'online' && row.original.error !== 'Sleep_Mode_ON'
          const isColorButton = row.original.error !== 'Sleep_Mode_ON'
          // console.log(isOffline)
          return (
            <div>
              <CTooltip content="Config Mode (click to on ConfigMode this machine)" placement="top">
                <CButton
                  color="warning"
                  size="sm"
                  className="me-1"
                  disabled={isOffline}
                  onClick={() => onConfigModeClick(row.original.id)}
                >
                  <CIcon className="ml-2" icon={cilRss} size="sm" />
                </CButton>
              </CTooltip>
              <CTooltip content="Flush Mode (click to flush this machine)" placement="top">
                <CButton
                  color="warning"
                  size="sm"
                  className="me-1"
                  disabled={isOffline}
                  onClick={() => onFlushModeClick(row.original.id)}
                >
                  <CIcon className="ml-2" icon={cilColorFill} size="sm" />
                </CButton>
              </CTooltip>
              <CTooltip content="Sleep Mode (click to on SleepMode this machine)" placement="top">
                <CButton
                  color={isColorButton ? 'success' : 'danger'}
                  size="sm"
                  className="me-1"
                  disabled={isOffline}
                  onClick={() => onSleepModeClick(row.original.id, row.original.sleep_mode)}
                >
                  <CIcon className="ml-2" icon={cilToggleOff} size="sm" />
                </CButton>
              </CTooltip>
            </div>
          )
        },
      },
      {
        id: 'actions', // Custom column for actions
        header: 'Action',
        size: 150,
        Cell: ({ row }) => (
          <div>
            <CTooltip content="Show QR" placement="top">
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

            <CTooltip content="Delete" placement="top">
              <CButton color="danger" size="sm" onClick={() => onDelete(row.original.id)}>
                <CIcon className="ml-2" icon={cilTrash} size="sm" />
              </CButton>
            </CTooltip>
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
