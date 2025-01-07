// import React, { useMemo, useState } from 'react'
// import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
// import { CBadge, CButton } from '@coreui/react' // Import CoreUI buttons if needed
// import { cilPenAlt, cilTrash, cilLowVision } from '@coreui/icons'
// import CIcon from '@coreui/icons-react'
// import { AddCustomerWalletModal } from '../../views/modal/AddComponentModel'

import { useMemo, useState } from "react"
import { ViewSalesRepotingModal } from "../../views/modal/AddComponentModel"
import { MaterialReactTable, useMaterialReactTable } from "material-react-table"
import { CBadge, CButton } from "@coreui/react"
import CIcon from "@coreui/icons-react"
import { cilLowVision } from "@coreui/icons"

// /**
//  * author Anushka Isuru Lakmal
//  * created on 03-01-2025-12h-23m
//  * copyright 2025
//  */

// Example data
const data = [
  {
    id: 1,
    salesId: 'ETR-000001',
    outlet: 'Outlet 001',
    items: '4',
    amount: '2450.00',
    mobileNumber: '+94767565432',
    createdDate: '01-01-2025',
    status: 'Paid',
  },
  {
    id: 2,
    salesId: 'ETR-000002',
    outlet: 'Outlet 001',
    items: '6',
    amount: '3050.00',
    mobileNumber: '+94767565432',
    createdDate: '01-01-2025',
    status: 'Pending',
  },
  {
    id: 3,
    salesId: 'ETR-000003',
    outlet: 'Outlet 001',
    items: '4',
    amount: '2450.00',
    mobileNumber: '+94767565432',
    createdDate: '01-01-2025',
    status: 'Paid',
  },
  {
    id: 4,
    salesId: 'ETR-000004',
    outlet: 'Outlet 001',
    items: '1',
    amount: '2450.00',
    mobileNumber: '+94767565432',
    createdDate: '01-01-2025',
    status: 'Paid',
  },
  {
    id: 1,
    salesId: 'ETR-000001',
    outlet: 'Outlet 001',
    items: '4',
    amount: '2450.00',
    mobileNumber: '+94767565432',
    createdDate: '01-01-2025',
    status: 'Paid',
  },
  {
    id: 2,
    salesId: 'ETR-000002',
    outlet: 'Outlet 001',
    items: '6',
    amount: '3050.00',
    mobileNumber: '+94767565432',
    createdDate: '01-01-2025',
    status: 'Pending',
  },
  {
    id: 3,
    salesId: 'ETR-000003',
    outlet: 'Outlet 001',
    items: '4',
    amount: '2450.00',
    mobileNumber: '+94767565432',
    createdDate: '01-01-2025',
    status: 'Paid',
  },
  {
    id: 4,
    salesId: 'ETR-000004',
    outlet: 'Outlet 001',
    items: '1',
    amount: '2450.00',
    mobileNumber: '+94767565432',
    createdDate: '01-01-2025',
    status: 'Paid',
  },
  {
    id: 1,
    salesId: 'ETR-000001',
    outlet: 'Outlet 001',
    items: '4',
    amount: '2450.00',
    mobileNumber: '+94767565432',
    createdDate: '01-01-2025',
    status: 'Paid',
  },
  {
    id: 2,
    salesId: 'ETR-000002',
    outlet: 'Outlet 001',
    items: '6',
    amount: '3050.00',
    mobileNumber: '+94767565432',
    createdDate: '01-01-2025',
    status: 'Pending',
  },
  {
    id: 3,
    salesId: 'ETR-000003',
    outlet: 'Outlet 001',
    items: '4',
    amount: '2450.00',
    mobileNumber: '+94767565432',
    createdDate: '01-01-2025',
    status: 'Paid',
  },
  {
    id: 4,
    salesId: 'ETR-000004',
    outlet: 'Outlet 001',
    items: '1',
    amount: '2450.00',
    mobileNumber: '+94767565432',
    createdDate: '01-01-2025',
    status: 'Paid',
  },
]

// export const ViewSalesDataTableMui = () => {
//   // State to manage modal visibility
//   const [isModalVisible, setIsModalVisible] = useState(false)

//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: 'id',
//         header: '#',
//         size: 40,
//       },
//       {
//         accessorKey: 'salesId', // Access nested data with dot notation
//         header: 'Sales ID',
//         size: 120,
//       },
//       {
//         accessorKey: 'outlet',
//         header: 'Outlet',
//         size: 120,
//       },
//       {
//         accessorKey: 'items',
//         header: 'Items',
//         size: 120,
//       },
//       {
//         accessorKey: 'amount',
//         header: 'Amount',
//         size: 160,
//       },
//       {
//         accessorKey: 'mobileNumber',
//         header: 'Mobile Number',
//         size: 160,
//       },
//       {
//         accessorKey: 'createdDate',
//         header: 'Date',
//         size: 150,
//       },
//       {
//         accessorKey: 'status',
//         header: 'Status',
//         size: 150,
//         Cell: ({ cell }) => (
//           <CBadge color={cell.getValue() === 'Paid' ? 'success' : 'info'}>{cell.getValue()}</CBadge>
//         ),
//       },
//       {
//         id: 'action', // Custom column for actions
//         header: 'Action',
//         size: 200,
//         Cell: ({ row }) => (
//           <div>
//             <CButton
//               color="light"
//               size="sm"
//               className="me-1"
//               onClick={() => setIsModalVisible(true)} // Show modal on click
//             >
//               <CIcon icon={cilLowVision} size="sm" />
//             </CButton>
//           </div>
//         ),
//       },
//     ],
//     [],
//   )

//   const table = useMaterialReactTable({
//     columns,
//     data, // Data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
//   })

//   return (
//     <>
//       <MaterialReactTable table={table} />
//       {/* Modal Component */}
//       <AddCustomerWalletModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
//     </>
//   )
// }

// export default ViewSalesDataTableMui

export const ViewSalesDataTableMui = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null) // Store selected row data
  
    const columns = useMemo(
      () => [
        {
          accessorKey: 'id',
          header: '#',
          size: 40,
        },
        {
          accessorKey: 'salesId',
          header: 'Sales ID',
          size: 120,
        },
        {
          accessorKey: 'outlet',
          header: 'Outlet',
          size: 120,
        },
        {
          accessorKey: 'items',
          header: 'Items',
          size: 120,
        },
        {
          accessorKey: 'amount',
          header: 'Amount',
          size: 160,
        },
        {
          accessorKey: 'mobileNumber',
          header: 'Mobile Number',
          size: 160,
        },
        {
          accessorKey: 'createdDate',
          header: 'Date',
          size: 150,
        },
        {
          accessorKey: 'status',
          header: 'Status',
          size: 150,
          Cell: ({ cell }) => (
            <CBadge color={cell.getValue() === 'Paid' ? 'success' : 'info'}>{cell.getValue()}</CBadge>
          ),
        },
        {
          id: 'action',
          header: 'Action',
          size: 200,
          Cell: ({ row }) => (
            <div>
              <CButton
                color="light"
                size="sm"
                className="me-1"
                onClick={() => {
                  setSelectedRow(row.original) // Set the selected row data
                  setIsModalVisible(true) // Show modal
                }}
              >
                <CIcon icon={cilLowVision} size="sm" />
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
  
    return (
      <>
        <MaterialReactTable table={table} />
        {/* Pass selectedRow data to the modal */}
        <ViewSalesRepotingModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} rowData={selectedRow} />
      </>
    )
  }
  
  export default ViewSalesDataTableMui
  