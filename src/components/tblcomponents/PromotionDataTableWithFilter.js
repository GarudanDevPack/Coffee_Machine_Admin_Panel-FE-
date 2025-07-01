import React, { useEffect, useState,useMemo } from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { CButton } from '@coreui/react' // Import CoreUI buttons if needed
import { cilPenAlt, cilTrash, cilQrCode, cilSend, cilCaretRight } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useDispatch } from 'react-redux';
import { fetchClients } from '../../actions/clientAction'

/**
 * author Anushka Isuru Lakmal
 * created on 07-01-2025-11h-07m
 * copyright 2025
 */


export const PromotionDataTableMui = ({ tableData, onDelete, onEditClick }) => {
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
    if (!tableData?.data || !Array.isArray(tableData.data)) {
      console.warn('Invalid table data:', tableData);
      return;
    }
    if (!Array.isArray(clients)) {
      console.warn('Clients not loaded yet');
      return;
    }

    const clientMap = clients.reduce((acc, client) => {
      acc[client.id] = client.name;
      return acc;
    }, {});

    const newData = tableData.data.map(item => ({
      ...item,
      client_name: clientMap[item.client_id] || 'Unknown Client',
      createdDate: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A',
      updatedDate: item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : 'N/A',
    }));

    setTransformedData(newData);
  }, [tableData, clients]);

  // Columns should be memoized or stable
  const columns = useMemo(
    () => [
      // {
      //   accMachineessorKey: 'id',
      //   header: '#',
      //   size: 50,
      // },
      // {
      //   accessorKey: 'date', // Access nested data with dot notation
      //   header: 'Date',
      //   size: 150,
      // },
      {
       
   accessorKey: 'client_name',
      header: 'Client Name',
      size: 150,
      },
      {
        accessorKey: 'type',
        header: 'Type',
        size: 150,
      },
      {
        accessorKey: 'img_preferences.alt_text',
        header: 'Page',
        size: 200,
      },
      {
        accessorKey: 'status', // Access nested data with dot notation
        header: 'status',
        size: 150,
      },
      {
        accessorKey: 'createdAt',
        header: 'Created Date',
        size: 150,
      },
      {
        accessorKey: 'updatedAt',
        header: 'Updated Date',
        size: 150,
      },
      {
        id: 'actions', // Custom column for actions
        header: 'Action',
        size: 200,
        Cell: ({ row }) => (
          <div>
            {/* <CButton color="warning" size="sm" className="me-1" 
            onClick={() => onEditClick(row.original)}
            >
              <CIcon className="ml-2" icon={cilPenAlt} size="sm" />
            </CButton> */}
            <CButton color="danger" size="sm" className="me-1" onClick={() => onDelete(row.original.id)}>
              <CIcon className="ml-2" icon={cilTrash} size="sm" />
            </CButton>
            <CButton color="success" size="sm"  onClick={() => onEditClick(row.original)}>
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
     data: transformedData,
  })

  return <MaterialReactTable table={table} />
}

export default PromotionDataTableMui
