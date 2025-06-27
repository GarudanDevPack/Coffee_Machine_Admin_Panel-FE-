import React, { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { CButton } from '@coreui/react'; // Import CoreUI buttons if needed
import { cilPenAlt, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

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
];

export const CustomerDataTableMui = ({ tableData, onDelete, onEditClick }) => {
  // Columns should be memoized or stable
  const columns = useMemo(() => [
    // {
    //   accessorKey: 'id',
    //   header: '#',
    //   size: 50,
    // },
    {
      accessorKey: 'name', // Access nested data with dot notation
      header: 'Name',
      size: 150,
    },
    {
      accessorKey: 'email',
      header: 'email',
      size: 150,
    },
    {
      accessorKey: 'phone_number',
      header: 'Mobile No',
      size: 150,
    },
    {
      accessorKey: 'role',
      header: 'role',
      size: 200,
    },
    // {
    //   accessorKey: 'gender',
    //   header: 'Gender',
    //   size: 100,
    // },
    {
      accessorKey: 'updatedAt',
      header: 'updated date',
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
          {/* <CButton color="warning" size="sm" className="me-1">
            <CIcon icon={cilPenAlt} size="sm" />
          </CButton> */}
          <CButton color="danger" size="sm" onClick={() => onDelete(row.original.id)}>
            <CIcon icon={cilTrash} size="sm" />
          </CButton>
        </div>
      ),
    },
  ], []);

  const table = useMaterialReactTable({
    columns,
    data: tableData.data || [] // Data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return <MaterialReactTable table={table} />;
};

export default CustomerDataTableMui;
