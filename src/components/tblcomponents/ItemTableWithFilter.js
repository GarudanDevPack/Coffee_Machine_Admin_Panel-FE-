// import React, { useMemo } from 'react'
// import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
// import { CButton } from '@coreui/react' // Import CoreUI buttons if needed
// import { cilPenAlt, cilTrash, cilQrCode } from '@coreui/icons'
// import { CBadge } from '@coreui/react'
// import CIcon from '@coreui/icons-react'

// export const ItemDataTableMui = ({ tableData, onDelete, onEditClick }) => {
//   // Columns should be memoized or stable
//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: 'name',
//         header: 'Item Name',
//         size: 150,
//       },
//       {
//         accessorKey: 'price',
//         header: 'Price',
//         size: 150,
//       },
//       {
//         accessorKey: 'nozzle',
//         header: 'Nozzle Number',
//         size: 100,
//         Cell: ({ cell }) => (
//           <div className="d-flex justify-content-center">
//             <CBadge color="info">{cell.getValue()}</CBadge>
//           </div>
//         ),
//       },
//       {
//         accessorKey: 'description',
//         header: 'Description',
//         size: 150,
//       },
//       {
//         accessorKey: 'createdAt',
//         header: 'Created Date',
//         size: 150,
//         Cell: ({ row }) => {
//           const date = new Date(row.original.updatedAt)
//           return date
//             .toLocaleString('en-GB', {
//               day: '2-digit',
//               month: '2-digit',
//               year: 'numeric',
//               hour: '2-digit',
//               minute: '2-digit',
//               hour12: true,
//             })
//             .replace(',', '') // Remove the comma
//         },
//       },
//       {
//         accessorKey: 'updatedAt',
//         header: 'Updated Date',
//         size: 150,
//         Cell: ({ row }) => {
//           const date = new Date(row.original.updatedAt)
//           return date
//             .toLocaleString('en-GB', {
//               day: '2-digit',
//               month: '2-digit',
//               year: 'numeric',
//               hour: '2-digit',
//               minute: '2-digit',
//               hour12: true,
//             })
//             .replace(',', '') // Remove the comma
//         },
//       },
//       {
//         id: 'actions', // Custom column for actions
//         header: 'Action',
//         size: 200,
//         Cell: ({ row }) => (
//           <div>
//             <CButton
//               color="warning"
//               size="sm"
//               className="me-1"
//               onClick={() => onEditClick(row.original)}
//             >
//               <CIcon className="ml-2" icon={cilPenAlt} size="sm" />
//             </CButton>
//             <CButton color="danger" size="sm" onClick={() => onDelete(row.original.id)}>
//               <CIcon className="ml-2" icon={cilTrash} size="sm" />
//             </CButton>
//           </div>
//         ),
//       },
//     ],
//     [],
//   )

//   const table = useMaterialReactTable({
//     columns,
//     data: tableData.data || [],
//   })

//   return <MaterialReactTable table={table} />
// }

// export default ItemDataTableMui
import React, { useMemo,useState } from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { CButton, CBadge, CTooltip } from '@coreui/react'
import { cilPenAlt, cilTrash, cilStar, cilLowVision } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import ViewItemCommentsModal from '../../views/modal/ViewItemCommentsModal'


export const ItemDataTableMui = ({ tableData, onDelete, onEditClick }) => {
  const [isCommentsModalVisible, setIsCommentsModalVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
   const handleViewComments = (item) => {
    setSelectedItem(item)
    setIsCommentsModalVisible(true)
  }
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Item Name',
        size: 150,
      },
      {
        accessorKey: 'price',
        header: 'Price',
        size: 100,
        Cell: ({ cell }) => `$${Number(cell.getValue()).toFixed(2)}`,
      },
      {
        accessorKey: 'rating_avg',
        header: 'Rating',
        size: 120,
        Cell: ({ row }) => {
          const avg = row.original.rating_avg || 0;
          const count = row.original.rating_count || 0;
          
          return (
            <div className="d-flex align-items-center gap-2">
              <CIcon icon={cilStar} className="text-warning" />
              <span className="fw-bold">{avg.toFixed(1)}</span>
              <CBadge color="secondary" size="sm">
                {count} {count === 1 ? 'review' : 'reviews'}
              </CBadge>
            </div>
          );
        },
      },
      {
        accessorKey: 'latest_comment',
        header: 'Comments',
        size: 200,
        Cell: ({ row }) => {
          const comment = row.original.latest_comment || 'No comments yet';
          const truncated = comment.length > 50 
            ? `${comment.substring(0, 50)}...` 
            : comment;
          
          return (
            <div className="d-flex align-items-center gap-2">
              <CTooltip content="View all comments" placement="top">
                <CButton
                  color="success"
                  size="sm"
                  onClick={() => handleViewComments(row.original)}
                >
                  <CIcon icon={cilLowVision} size="sm" />
                </CButton>
              </CTooltip>
              <div className="flex-grow-1">
                {comment.length > 50 ? (
                  <CTooltip content={comment}>
                    <span className="text-muted fst-italic">{truncated}</span>
                  </CTooltip>
                ) : (
                  <span className="text-muted fst-italic">{truncated}</span>
                )}
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: 'nozzle',
        header: 'Nozzle',
        size: 80,
        Cell: ({ cell }) => (
          <div className="d-flex justify-content-center">
            <CBadge color="info">{cell.getValue()}</CBadge>
          </div>
        ),
      },
      {
        accessorKey: 'description',
        header: 'Description',
        size: 150,
      },
      {
        accessorKey: 'createdAt',
        header: 'Created',
        size: 130,
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
        header: 'Updated',
        size: 130,
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
        size: 150,
        Cell: ({ row }) => (
          <div className="d-flex gap-1">
            <CButton
  color="warning"
  size="sm"
  onClick={() => onEditClick(row.original)}
>
  <CIcon icon={cilPenAlt} size="sm" />
</CButton>

<CButton
  color="danger"
  size="sm"
  onClick={() => onDelete(row.original.id)}
>
  <CIcon icon={cilTrash} size="sm" />
</CButton>
            <CButton 
              color="danger" 
              size="sm" 
              onClick={() => onDelete(row.original.id)}
            >
              <CIcon icon={cilTrash} size="sm" />
            </CButton>
          </div>
        ),
      },
    ],
    [onDelete, onEditClick],
  );

  const table = useMaterialReactTable({
    columns,
    data: tableData.data || [],
    enableColumnResizing: true,
    enableSorting: true,
    initialState: {
      sorting: [{ id: 'rating_avg', desc: true }],
    },
  });

  return (
  <>
    <MaterialReactTable table={table} />
    
    {/* Comments Modal */}
    <ViewItemCommentsModal
      visible={isCommentsModalVisible}
      onClose={() => setIsCommentsModalVisible(false)}
      itemData={selectedItem}
    />
  </>
);
};

export default ItemDataTableMui;