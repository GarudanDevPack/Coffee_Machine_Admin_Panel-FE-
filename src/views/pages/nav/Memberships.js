import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CBadge,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CSpinner,
} from '@coreui/react'
import { fetchAllMemberships, cancelMembership } from '../../../actions/membershipAction'

const planLabels = {
  '1month': '1 Month',
  '3month': '3 Months',
  '5month': '5 Months',
}

const discountColors = {
  15: 'info',
  20: 'warning',
  25: 'success',
}

const statusColors = {
  active: 'success',
  expired: 'secondary',
  cancelled: 'danger',
}

const Memberships = () => {
  const dispatch = useDispatch()
  const { memberships } = useSelector((state) => state.memberships)
  const [loading, setLoading] = useState(false)

  const loadData = async () => {
    setLoading(true)
    await dispatch(fetchAllMemberships())
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleCancel = (id, userId) => {
    Swal.fire({
      title: 'Cancel Membership?',
      text: `Cancel membership for user ${userId}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, cancel it',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(cancelMembership(id))
        Swal.fire('Cancelled', 'Membership has been cancelled.', 'success')
      }
    })
  }

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString('en-GB') : '—'

  return (
    <CCard className="mb-4">
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <span>Memberships</span>
        <CButton color="secondary" size="sm" onClick={loadData} disabled={loading}>
          {loading ? <CSpinner size="sm" /> : 'Refresh'}
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
                <CTableHeaderCell>User ID</CTableHeaderCell>
                <CTableHeaderCell>Plan</CTableHeaderCell>
                <CTableHeaderCell>Discount</CTableHeaderCell>
                <CTableHeaderCell>Start Date</CTableHeaderCell>
                <CTableHeaderCell>End Date</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Price Paid</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {memberships.length === 0 ? (
                <CTableRow>
                  <CTableDataCell colSpan={8} className="text-center text-muted py-4">
                    No memberships found
                  </CTableDataCell>
                </CTableRow>
              ) : (
                memberships.map((m) => (
                  <CTableRow key={m._id}>
                    <CTableDataCell>
                      <small className="text-muted">{m.userId}</small>
                    </CTableDataCell>
                    <CTableDataCell>
                      <strong>{planLabels[m.plan] || m.plan}</strong>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CBadge color={discountColors[m.discount] || 'primary'}>
                        {m.discount}% off
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell>{formatDate(m.startDate)}</CTableDataCell>
                    <CTableDataCell>{formatDate(m.endDate)}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge color={statusColors[m.status] || 'secondary'}>
                        {m.status}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell>LKR {m.pricePaid}</CTableDataCell>
                    <CTableDataCell>
                      {m.status === 'active' && (
                        <CButton
                          color="danger"
                          size="sm"
                          variant="outline"
                          onClick={() => handleCancel(m._id, m.userId)}
                        >
                          Cancel
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                ))
              )}
            </CTableBody>
          </CTable>
        )}
      </CCardBody>
    </CCard>
  )
}

export default Memberships
