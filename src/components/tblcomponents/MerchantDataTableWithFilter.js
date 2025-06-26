import React, { useMemo,useState } from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { CButton,CTooltip } from '@coreui/react' // Import CoreUI buttons if needed
import { cilPenAlt, cilTrash,cilLowVision } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import ViewMerchantModal from '../../views/modal/ViewMerchantModel'
import AddMerchantModal from '../../views/modal/AddMerchantModal'

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
]

export const MerchantDataTableMui = ({ tableData, onDelete, onEditClick }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null) 
    const [isViewModalVisible, setIsViewModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  
      const handleEditClick = (merchant) => {
    const editData = {
      id: merchant.id,
      name: merchant.name,
      org: merchant.organizations // Make sure this matches your API response structure
    };
    setSelectedMerchant(editData);
    setIsModalVisible(true);
  };
  // Columns should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: '#',
        size: 40,
      },
      {
        accessorKey: 'name', // Access nested data with dot notation
        header: 'Name',
        size: 120,
      },
      // {
      //   accessorKey: 'name.lastName',
      //   header: 'Last Name',
      //   size: 120,
      // },
      // {
      //   accessorKey: 'mobile',
      //   header: 'Mobile No',
      //   size: 120,
      // },
      // {
      //   accessorKey: 'email',
      //   header: 'Email',
      //   size: 160,
      // },
      // {
      //   accessorKey: 'gender',
      //   header: 'Gender',
      //   size: 160,
      // },
      {
        accessorKey: 'updatedAt',
        header: 'updated Date',
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
            <CTooltip content="View merchant" placement="top">
                          <CButton
                            color="success"
                            size="sm"
                            className="me-1"
                            onClick={() => {
                              setSelectedRow(row.original) // Set the selected row data
                              setIsModalVisible(true) // Show modal
                            }}
                          >
                            <CIcon icon={cilLowVision} size="sm" />
                          </CButton>
                        </CTooltip>
            
            <CButton color="warning" size="sm" className="me-1"
           onClick={() => {
    console.log('Edit Row:', row.original); // ✅ Add this to debug
    setSelectedRow(row.original);           // ✅ row.original must have `.id`
    setIsEditModalVisible(true);
  }}
         
           >
              <CIcon icon={cilPenAlt} size="sm" />
            </CButton>
            
          <CButton color="danger" size="sm" onClick={() => onDelete(row.original.id)}>
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
    data: tableData.data || [] // Data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  })

  return( <>
  <MaterialReactTable table={table} />
   <ViewMerchantModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        rowData={selectedRow}
      />
         <AddMerchantModal
        visible={isEditModalVisible}
        onClose={() => {
          setIsEditModalVisible(false);
          setSelectedRow(null);
        }}
        editData={selectedRow} // Pass the selected row data for editing
      />
  </> 
)}

export default MerchantDataTableMui
