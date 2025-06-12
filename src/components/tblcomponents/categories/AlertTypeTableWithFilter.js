import React, { useEffect, useState,useMemo } from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { CButton } from '@coreui/react' // Import CoreUI buttons if needed
import { cilPenAlt, cilTrash, cilQrCode } from '@coreui/icons'
import { CBadge } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { fetchClients } from '../../../actions/clientAction'
import { useDispatch } from 'react-redux';

/**
 * author Anushka Isuru Lakmal
 * created on 24-01-2025-15h-14m
 * copyright 2025
*/


const data = [
  {
    id: 1,
    client: 'Garudan Pvt Ltd',
    alertType: 'High',
    status: 'Active',
    createdDate: '01-01-2025',
    updatedDate: '01-01-2025',
  },
  {
    id: 1,
    client: 'Garudan Pvt Ltd',
    alertType: 'Low',
    status: 'Active',
    createdDate: '01-01-2025',
    updatedDate: '01-01-2025',
  },
  {
    id: 1,
    client: 'Garudan Pvt Ltd',
    alertType: 'High',
    status: 'Inactive',
    createdDate: '01-01-2025',
    updatedDate: '01-01-2025',
  },  
]

export const AlertTypeDataTableMui = ({tableData = {},onDelete,onEditClick}) => {
  const dispatch = useDispatch();
     const [clients, setClients] = useState([]);
     const [transformedData, setTransformedData] = useState([]);
   useEffect(() => {
      const fetchAllClients = async () => {
        try {
          const result = await dispatch(fetchClients());
          if (result?.data) {
            setClients(result.data);
          }
        } catch (error) {
          console.error('Error fetching clients:', error);
          setClients([]);
        }
      };
      fetchAllClients();
    }, [dispatch]);
  
     useEffect(() => {
      // Check if we have valid data
      if (!tableData?.data || !Array.isArray(tableData.data)) { // Added missing parenthesis here
      console.warn('Invalid notification data:', tableData);
      return;
    }
      if (!Array.isArray(clients)) {
        console.warn('Clients data not loaded yet');
        return;
      }
  
      // Create mapping of client IDs to names
      const clientMap = clients.reduce((acc, client) => {
        acc[client.id] = client.name;
        return acc;
      }, {});
  
      // Transform the notification data
      const newData = tableData.data.map(item => ({
        clientId: item.id,
        id: item.client_id,
        client: clientMap[item.client_id] || 'Unknown Client',
        alertType: item.name,
        status: item.status || 'Active',
        createdDate: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A',
        updatedDate: item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : 'N/A',
        rawData: item // Keep original data
      }));
  
      setTransformedData(newData);
    }, [tableData, clients]);
     
  // Columns should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: '#',
        size: 50,
      },
      {
        accessorKey: 'client',
        header: 'Client Name',
        size: 150,
      },
      {
        accessorKey: 'alertType',
        header: 'Alert Type Name',
        size: 150,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 100,
        Cell: ({ cell }) => (
          <CBadge color={cell.getValue() === 'Active' ? 'info' : 'danger'}>
            {cell.getValue()}
          </CBadge>
        ),
      },
      {
        accessorKey: 'createdDate',
        header: 'Created Date',
        size: 150,
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
           <CButton
                         color="warning"
                         size="sm"
                         className="me-1"
                         onClick={() => onEditClick(row.original)}
                       >
                         <CIcon className="ml-2" icon={cilPenAlt} size="sm" />
                       </CButton>
            <CButton color="danger" size="sm" onClick={() => onDelete(row.original.clientId)}>
                         <CIcon className="ml-2" icon={cilTrash} size="sm" />
                       </CButton>
          </div>
        ),
      },
    ],
    [],
  )
console.log('data fromm alerts timesss',transformedData)
  const table = useMaterialReactTable({
    columns,
    data : transformedData // Data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  })

  return <MaterialReactTable table={table} />
}

export default AlertTypeDataTableMui
