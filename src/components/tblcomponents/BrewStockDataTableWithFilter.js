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
    machineId: 'MC-00001',
    outletName: 'Outlet 01',
    teaStock: '12',
    milkStock: '10',
    coffeeStock: '05',
    foodStock: '15',
    updatedDate: '01-01-2025',
  },
  {
    id: 2,
    machineId: 'MC-00002',
    outletName: 'Outlet 01',
    teaStock: '18',
    milkStock: '11',
    coffeeStock: '02',
    foodStock: '20',
    updatedDate: '01-01-2025',
  },
  {
    id: 3,
    machineId: 'MC-00001',
    outletName: 'Outlet 02',
    teaStock: '12',
    milkStock: '10',
    coffeeStock: '05',
    foodStock: '15',
    updatedDate: '01-01-2025',
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

export const BrewStocksDataTableMui = () => {
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
        accessorKey: 'teaStock',
        header: 'Tea Stock',
        size: 150,
      },
      {
        accessorKey: 'milkStock',
        header: 'Milk Stock',
        size: 200,
      },
      {
        accessorKey: 'coffeeStock',
        header: 'Coffee Stock',
        size: 100,
      },
      {
        accessorKey: 'foodStock',
        header: 'Food Stock',
        size: 100,
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

export default BrewStocksDataTableMui
