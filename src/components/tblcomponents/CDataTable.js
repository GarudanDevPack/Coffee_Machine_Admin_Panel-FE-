import React, { useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
  CButton,
  CRow,
  CCol,
} from '@coreui/react'
import { cilQrCode, cilPenAlt, cilTrash, cilFilter } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

export const TableViewMachine = () => {
  return (
    <CTable>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">#</CTableHeaderCell>
          <CTableHeaderCell scope="col">Machine ID</CTableHeaderCell>
          <CTableHeaderCell scope="col">Outlet Name</CTableHeaderCell>
          <CTableHeaderCell scope="col">Loading Qty</CTableHeaderCell>
          <CTableHeaderCell scope="col">Features</CTableHeaderCell>
          <CTableHeaderCell scope="col">Added Date</CTableHeaderCell>
          <CTableHeaderCell scope="col">Action</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow>
          <CTableHeaderCell scope="row">1</CTableHeaderCell>
          <CTableDataCell>Mark</CTableDataCell>
          <CTableDataCell>Otto</CTableDataCell>
          <CTableDataCell>@mdo</CTableDataCell>
          <CTableDataCell>Otto</CTableDataCell>
          <CTableDataCell>@mdo</CTableDataCell>
          <CTableDataCell>
            <CButton color="info" size="sm" className="me-1">
              <CIcon className="ml-2" icon={cilQrCode} size="sm" />
            </CButton>
            <CButton color="warning" size="sm" className="me-1">
              <CIcon className="ml-2" icon={cilPenAlt} size="sm" />
            </CButton>
            <CButton color="danger" size="sm">
              <CIcon className="ml-2" icon={cilTrash} size="sm" />
            </CButton>
          </CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableHeaderCell scope="row">2</CTableHeaderCell>
          <CTableDataCell>Jacob</CTableDataCell>
          <CTableDataCell>Thornton</CTableDataCell>
          <CTableDataCell>@fat</CTableDataCell>
          <CTableDataCell>Otto</CTableDataCell>
          <CTableDataCell>@mdo</CTableDataCell>
          <CTableDataCell>
            <CButton color="info" size="sm" className="me-1">
              <CIcon className="ml-2" icon={cilQrCode} size="sm" />
            </CButton>
            <CButton color="warning" size="sm" className="me-1">
              <CIcon className="ml-2" icon={cilPenAlt} size="sm" />
            </CButton>
            <CButton color="danger" size="sm">
              <CIcon className="ml-2" icon={cilTrash} size="sm" />
            </CButton>
          </CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableHeaderCell scope="row">3</CTableHeaderCell>
          <CTableDataCell colSpan={2}>Larry the Bird</CTableDataCell>
          <CTableDataCell>@twitter</CTableDataCell>
          <CTableDataCell>Otto</CTableDataCell>
          <CTableDataCell>@mdo</CTableDataCell>
          <CTableDataCell>
            <CButton color="info" size="sm" className="me-1">
              <CIcon className="ml-2" icon={cilQrCode} size="sm" />
            </CButton>
            <CButton color="warning" size="sm" className="me-1">
              <CIcon className="ml-2" icon={cilPenAlt} size="sm" />
            </CButton>
            <CButton color="danger" size="sm">
              <CIcon className="ml-2" icon={cilTrash} size="sm" />
            </CButton>
          </CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableHeaderCell scope="row">3</CTableHeaderCell>
          <CTableDataCell colSpan={2}>Larry the Bird</CTableDataCell>
          <CTableDataCell>@twitter</CTableDataCell>
          <CTableDataCell>Otto</CTableDataCell>
          <CTableDataCell>@mdo</CTableDataCell>
          <CTableDataCell>
            <CButton color="info" size="sm" className="me-1">
              <CIcon className="ml-2" icon={cilQrCode} size="sm" />
            </CButton>
            <CButton color="warning" size="sm" className="me-1">
              <CIcon className="ml-2" icon={cilPenAlt} size="sm" />
            </CButton>
            <CButton color="danger" size="sm">
              <CIcon className="ml-2" icon={cilTrash} size="sm" />
            </CButton>
          </CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableHeaderCell scope="row">3</CTableHeaderCell>
          <CTableDataCell colSpan={2}>Larry the Bird</CTableDataCell>
          <CTableDataCell>@twitter</CTableDataCell>
          <CTableDataCell>Otto</CTableDataCell>
          <CTableDataCell>@mdo</CTableDataCell>
          <CTableDataCell>
            <CButton color="info" size="sm" className="me-1">
              <CIcon className="ml-2" icon={cilQrCode} size="sm" />
            </CButton>
            <CButton color="warning" size="sm" className="me-1">
              <CIcon className="ml-2" icon={cilPenAlt} size="sm" />
            </CButton>
            <CButton color="danger" size="sm">
              <CIcon className="ml-2" icon={cilTrash} size="sm" />
            </CButton>
          </CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableHeaderCell scope="row">3</CTableHeaderCell>
          <CTableDataCell colSpan={2}>Larry the Bird</CTableDataCell>
          <CTableDataCell>@twitter</CTableDataCell>
          <CTableDataCell>Otto</CTableDataCell>
          <CTableDataCell>@mdo</CTableDataCell>
          <CTableDataCell>
            <CButton color="info" size="sm" className="me-1">
              <CIcon className="ml-2" icon={cilQrCode} size="sm" />
            </CButton>
            <CButton color="warning" size="sm" className="me-1">
              <CIcon className="ml-2" icon={cilPenAlt} size="sm" />
            </CButton>
            <CButton color="danger" size="sm">
              <CIcon className="ml-2" icon={cilTrash} size="sm" />
            </CButton>
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
  )
}

export const TableViewCustomer = () => {
  return (
    <CTable>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">#</CTableHeaderCell>
          <CTableHeaderCell scope="col">Customer Name</CTableHeaderCell>
          <CTableHeaderCell scope="col">Mobile No</CTableHeaderCell>
          <CTableHeaderCell scope="col">Email</CTableHeaderCell>
          <CTableHeaderCell scope="col">Gender</CTableHeaderCell>
          <CTableHeaderCell scope="col">Date of Birth</CTableHeaderCell>
          <CTableHeaderCell scope="col">Created Date</CTableHeaderCell>
          <CTableHeaderCell scope="col">Action</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow>
          <CTableHeaderCell scope="row">1</CTableHeaderCell>
          <CTableDataCell>Mark</CTableDataCell>
          <CTableDataCell>+94112546786</CTableDataCell>
          <CTableDataCell>test@test.com</CTableDataCell>
          <CTableDataCell>Male</CTableDataCell>
          <CTableDataCell>12-12-2000</CTableDataCell>
          <CTableDataCell>01-01-2025</CTableDataCell>
          <CTableDataCell>
            {/* <CButton color="info" size="sm" className="me-1">
              <CIcon className="ml-2" icon={cilQrCode} size="sm" />
            </CButton> */}
            <CButton color="warning" size="sm" className="me-1">
              <CIcon className="ml-2" icon={cilPenAlt} size="sm" />
            </CButton>
            <CButton color="danger" size="sm">
              <CIcon className="ml-2" icon={cilTrash} size="sm" />
            </CButton>
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
  )
}

export const TableViewCustomerWithFilter = () => {
  const [filter, setFilter] = useState('')
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'Mark',
      mobile: '+94112546786',
      email: 'test@test.com',
      gender: 'Male',
      dob: '12-12-2000',
      createdDate: '01-01-2025',
    },
    // Add more customer objects as needed
  ])

  const filteredCustomers = customers.filter((customer) =>
    Object.values(customer).some((value) =>
      value.toString().toLowerCase().includes(filter.toLowerCase()),
    ),
  )

  return (
    <div>
      <CCol className="mb-3" md={4} xs={12}>
        <div className="d-flex align-items-center">
          <input
            type="text"
            className="form-control"
            placeholder="Search customers..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <CIcon className="ms-2" icon={cilFilter} size="sm" />
        </div>
      </CCol>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Customer Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Mobile No</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Gender</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date of Birth</CTableHeaderCell>
            <CTableHeaderCell scope="col">Created Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {filteredCustomers.map((customer, index) => (
            <CTableRow key={customer.id}>
              <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
              <CTableDataCell>{customer.name}</CTableDataCell>
              <CTableDataCell>{customer.mobile}</CTableDataCell>
              <CTableDataCell>{customer.email}</CTableDataCell>
              <CTableDataCell>{customer.gender}</CTableDataCell>
              <CTableDataCell>{customer.dob}</CTableDataCell>
              <CTableDataCell>{customer.createdDate}</CTableDataCell>
              <CTableDataCell>
                <CButton color="warning" size="sm" className="me-1">
                  <CIcon className="ml-2" icon={cilPenAlt} size="sm" />
                </CButton>
                <CButton color="danger" size="sm">
                  <CIcon className="ml-2" icon={cilTrash} size="sm" />
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  )
}



export const TableViewCustomerWithPagination = () => {
  const [filter, setFilter] = useState("");
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Mark",
      mobile: "+94112546786",
      email: "test@test.com",
      gender: "Male",
      dob: "12-12-2000",
      createdDate: "01-01-2025",
    },
    {
      id: 2,
      name: "John",
      mobile: "+94115555555",
      email: "john@example.com",
      gender: "Male",
      dob: "05-08-1995",
      createdDate: "02-01-2025",
    },
    // Add more customer objects as needed
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const filteredCustomers = customers.filter((customer) =>
    Object.values(customer).some((value) =>
      value.toString().toLowerCase().includes(filter.toLowerCase())
    )
  );

  // Calculate the customers to display on the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredCustomers.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search customers..."
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1); // Reset to first page on filter change
          }}
        />
      </div>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Customer Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Mobile No</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Gender</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date of Birth</CTableHeaderCell>
            <CTableHeaderCell scope="col">Created Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentRows.map((customer, index) => (
            <CTableRow key={customer.id}>
              <CTableHeaderCell scope="row">
                {indexOfFirstRow + index + 1}
              </CTableHeaderCell>
              <CTableDataCell>{customer.name}</CTableDataCell>
              <CTableDataCell>{customer.mobile}</CTableDataCell>
              <CTableDataCell>{customer.email}</CTableDataCell>
              <CTableDataCell>{customer.gender}</CTableDataCell>
              <CTableDataCell>{customer.dob}</CTableDataCell>
              <CTableDataCell>{customer.createdDate}</CTableDataCell>
              <CTableDataCell>
                <CButton color="warning" size="sm" className="me-1">
                  <CIcon className="ml-2" icon={cilPenAlt} size="sm" />
                </CButton>
                <CButton color="danger" size="sm">
                  <CIcon className="ml-2" icon={cilTrash} size="sm" />
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      {/* Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-primary"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-primary"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

// // export default TableViewMachine
