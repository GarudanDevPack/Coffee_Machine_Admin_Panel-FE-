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

// const data = [
//   {
//     id: 1,
//     machineId: 'MC-00001',
//     outletName: 'Colombo',
//     loadingQty: '500',
//     features: 'Load Extras',
//     addedDate: '12-12-2000',
//     createdDate: '01-01-2025',
//   },
//   {
//     id: 2,
//     machineId: 'MC-00002',
//     outletName: 'Colombo',
//     loadingQty: '200',
//     features: 'Load Extras',
//     addedDate: '12-12-2000',
//     createdDate: '01-01-2025',
//   },
//   //   {
//   //     id: 2,
//   //     name: {
//   //       firstName: 'Jane',
//   //       lastName: 'Doe',
//   //     },
//   //     mobile: '+94112345678',
//   //     email: 'jane.doe@example.com',
//   //     gender: 'Female',
//   //     dob: '10-10-1990',
//   //     createdDate: '15-01-2025',
//   //   },
//   // Add more data as needed
// ]

export const MachineDataTableMui = ({ tableData }) => {
  // console.log("New",tableData.data);
  // Columns should be memoized or stable
  const columns = useMemo(
    () => [
      // {
      //   accessorKey: '',
      //   header: '#',
      //   size: 50,
      // },
      // {
      //   accessorKey: 'id', // Access nested data with dot notation
      //   header: 'Machine ID',
      //   size: 150,
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
    data: tableData.data || [], // Data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  })

  return <MaterialReactTable table={table} />
}

export default MachineDataTableMui
