import React, { useMemo } from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { CBadge, CButton, CTooltip } from '@coreui/react' // Import CoreUI buttons if needed
import { cilPenAlt, cilTrash, cilQrCode, cilLowVision } from '@coreui/icons'
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

export const BrewStocksDataTableMui = ({ tableData }) => {
  // Columns should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name', // Access nested data with dot notation
        header: 'Machine Name',
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
      // {
      //   accessorKey: 'inventory.length',
      //   header: 'Item Count',
      //   size: 200,
      // },
      {
        accessorKey: 'inventory.length',
        header: 'Item Count',
        size: 50,
        Cell: ({ cell }) => (
          <div className="d-flex justify-content-left">
            <CBadge color="info">{cell.getValue()}</CBadge>
          </div>
        ),
      },
      // {
      //   accessorKey: 'coffeeStock',
      //   header: 'Coffee Stock',
      //   size: 100,
      // },
      // {
      //   accessorKey: 'foodStock',
      //   header: 'Food Stock',
      //   size: 100,
      // },

      {
        id: 'actions', // Custom column for actions
        header: 'Action',
        size: 200,
        Cell: ({ row }) => (
          <div>
            <CTooltip
              content="View Stock"
              placement="top"
            >
              <CButton color="success" size="sm" className="me-1">
                <CIcon icon={cilLowVision} size="sm" />
              </CButton>
            </CTooltip>
            <CTooltip
              content="Edit"
              placement="top"
            >
              <CButton color="warning" size="sm" className="me-1">
                <CIcon className="ml-2" icon={cilPenAlt} size="sm" />
              </CButton>
            </CTooltip>
            {/* <CTooltip
              content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
              placement="top"
            >
              <CButton color="danger" size="sm">
                <CIcon className="ml-2" icon={cilTrash} size="sm" />
              </CButton>
            </CTooltip> */}
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

export default BrewStocksDataTableMui
