//...new updated code..
import React, { useMemo ,useState} from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { CButton, CBadge } from '@coreui/react';
import { cilPenAlt, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { data } from 'autoprefixer';
import ViewVolumeDataModal from '../../views/modal/VIewVolumeDataModal';

export const VolumeDataTableMui = ({onEditClick,tableData}) => {
  // ✅ Dummy data for preview/testing
  // const tableData = {
  //   data: [
  //     {
  //       id: 1,
  //       name: 'Tea',
  //       volume: '90ml',
  //       unit: 'ml',
  //       price: 100.0,
  //       rate: 8,
  //       stock: 20,
  //       nozzle: '2',
  //       description: 'Refreshing black tea with spices',
  //       createdAt: '2024-10-02T09:00:00Z',
  //       updatedAt: '2024-10-11T13:20:00Z',
  //     },
  //     {
  //       id: 2,
  //       name: 'Milk Tea',
  //       volume: '120ml',
  //       unit: 'ml',
  //       price: 150.0,
  //       rate: 5,
  //       stock: 15,
  //       nozzle: '2',
  //       description: 'Fresh and chilled milk',
  //       createdAt: '2024-10-03T08:30:00Z',
  //       updatedAt: '2024-10-12T14:45:00Z',
  //     },
  //   ],
  // };


  //   const handleEditClick = (item) => {
  //   console.log('Edit clicked:', item);
  // };

  // const handleDelete = (id) => {
  //   console.log('Delete clicked for ID:', id);
  // };
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null) // Store selected row data

  const columns = useMemo(
    () => [
      {
        accessorKey: 'client.name',
        header: 'Client Name',
        size: 150,
      },
      {
        accessorKey: 'org.name',
        header: 'Org Name',
        size: 150,
      },
      {
        accessorKey: 'machine_id',
        header: 'Machine ID',
        size: 150,
      },
      {
        accessorKey: 'item.length',
        header: 'Item Count',
        size: 100,
        Cell: ({ cell }) => (
          <div className="d-flex justify-content-center">
            <CBadge color="info">{cell.getValue()}</CBadge>
          </div>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: 'Created Date',
        size: 150,
        Cell: ({ row }) => {
          const date = new Date(row.original.createdAt);
          return date.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }).replace(',', '');
        },
      },
      {
        accessorKey: 'updatedAt',
        header: 'Updated Date',
        size: 150,
        Cell: ({ row }) => {
          const date = new Date(row.original.updatedAt);
          return date.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }).replace(',', '');
        },
      },
      {
        id: 'actions',
        header: 'Action',
        size: 200,
        Cell: ({ row }) => (
          <div>
            <CButton
              color="warning"
              size="sm"
              className="me-1"
              // onClick={() => handleEditClick(row.original)}
              onClick={() => {
                  setSelectedRow(row.original) // Set the selected row data
                  setIsModalVisible(true) // Show modal
                }}
            >
              <CIcon className="ml-2" icon={cilPenAlt} size="sm" />
            </CButton>
            {/* <CButton color="danger" size="sm" 
          //  onClick={() => handleDelete(row.original.id)}
            >
              <CIcon className="ml-2" icon={cilTrash} size="sm" />
            </CButton> */}
          </div>
        ),
      },
    ],
    [onEditClick],
  );

  const table = useMaterialReactTable({
    columns,
    data: tableData.data|| [],
  });


  return (
    <>
     <MaterialReactTable table={table} />
    {/* Pass selectedRow data to the modal */}
      <ViewVolumeDataModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        rowData={selectedRow}
      />
    </>
  )
  //return <MaterialReactTable table={table} />;
};

export default VolumeDataTableMui;

