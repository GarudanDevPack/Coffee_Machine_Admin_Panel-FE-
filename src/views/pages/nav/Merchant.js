import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import {
  CCard,
  CButton,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CBadge,
  CSpinner,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormLabel,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { fetchClients, addClient, deleteClient } from '../../../actions/clientAction'

const Organizations = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    clientUserId: '',
    address: '',
    phone: '',
    email: '',
    contractStart: '',
    contractEnd: '',
    notes: '',
  })

  const loadData = async () => {
    setLoading(true)
    try {
      const result = await dispatch(fetchClients())
      const list = Array.isArray(result) ? result : result?.data || []
      setData(list)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    const result = await dispatch(addClient({
      ...formData,
      contractStart: formData.contractStart || new Date().toISOString(),
    }))
    if (result) {
      setModalVisible(false)
      setFormData({ name: '', clientUserId: '', address: '', phone: '', email: '', contractStart: '', contractEnd: '', notes: '' })
      loadData()
      Swal.fire('Created!', 'Organization created successfully.', 'success')
    } else {
      Swal.fire('Error', 'Failed to create organization.', 'error')
    }
  }

  const handleDelete = (id, name) => {
    Swal.fire({
      title: `Delete ${name}?`,
      text: "This will deactivate the organization.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Delete',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(deleteClient(id))
        Swal.fire('Deleted!', 'Organization has been removed.', 'success')
        loadData()
      }
    })
  }

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString('en-GB') : '—'

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <span>Organizations</span>
          <CButton color="info" size="sm" onClick={() => setModalVisible(true)}>
            <CIcon icon={cilPlus} className="me-1" />
            Add Organization
          </CButton>
        </CCardHeader>
        <CCardBody>
          {loading ? (
            <div className="text-center py-4">
              <CSpinner color="primary" />
            </div>
          ) : (
            <CTable hover responsive striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Org ID</CTableHeaderCell>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Phone</CTableHeaderCell>
                  <CTableHeaderCell>Machines</CTableHeaderCell>
                  <CTableHeaderCell>Agents</CTableHeaderCell>
                  <CTableHeaderCell>Contract Start</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {data.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell colSpan={9} className="text-center text-muted py-4">
                      No organizations found
                    </CTableDataCell>
                  </CTableRow>
                ) : (
                  data.map((org) => (
                    <CTableRow key={org._id}>
                      <CTableDataCell>
                        <small className="text-muted font-monospace">{org.orgId}</small>
                      </CTableDataCell>
                      <CTableDataCell><strong>{org.name}</strong></CTableDataCell>
                      <CTableDataCell>{org.email || '—'}</CTableDataCell>
                      <CTableDataCell>{org.phone || '—'}</CTableDataCell>
                      <CTableDataCell>
                        <CBadge color="primary">{org.machineIds?.length || 0}</CBadge>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CBadge color="info">{org.agentIds?.length || 0}</CBadge>
                      </CTableDataCell>
                      <CTableDataCell>{formatDate(org.contractStart)}</CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={org.isActive ? 'success' : 'secondary'}>
                          {org.isActive ? 'Active' : 'Inactive'}
                        </CBadge>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="danger"
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(org._id, org.name)}
                        >
                          Delete
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                )}
              </CTableBody>
            </CTable>
          )}
        </CCardBody>
      </CCard>

      {/* Create Organization Modal */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Add Organization</CModalTitle>
        </CModalHeader>
        <CForm onSubmit={handleCreate}>
          <CModalBody>
            <div className="mb-3">
              <CFormLabel>Organization Name *</CFormLabel>
              <CFormInput name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <CFormLabel>Client User ID *</CFormLabel>
              <CFormInput name="clientUserId" value={formData.clientUserId} onChange={handleChange} required placeholder="User _id of the client account" />
            </div>
            <div className="mb-3">
              <CFormLabel>Email</CFormLabel>
              <CFormInput name="email" type="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <CFormLabel>Phone</CFormLabel>
              <CFormInput name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <CFormLabel>Address</CFormLabel>
              <CFormInput name="address" value={formData.address} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <CFormLabel>Contract Start</CFormLabel>
              <CFormInput name="contractStart" type="date" value={formData.contractStart} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <CFormLabel>Contract End</CFormLabel>
              <CFormInput name="contractEnd" type="date" value={formData.contractEnd} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <CFormLabel>Notes</CFormLabel>
              <CFormInput name="notes" value={formData.notes} onChange={handleChange} />
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setModalVisible(false)}>Cancel</CButton>
            <CButton color="primary" type="submit">Create</CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  )
}

export default Organizations
