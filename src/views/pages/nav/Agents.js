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
import { fetchAgents, approveAgent } from '../../../actions/agentAction'

const statusColor = (status) => {
  if (status === 'active') return 'success'
  if (status === 'inactive' || status === 'pending') return 'warning'
  return 'secondary'
}

const Agents = () => {
  const dispatch = useDispatch()
  const { agents } = useSelector((state) => state.agents)
  const [loading, setLoading] = useState(false)

  const loadData = async () => {
    setLoading(true)
    await dispatch(fetchAgents())
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleApprove = async (id, name) => {
    const result = await Swal.fire({
      title: `Approve ${name}?`,
      text: 'This will activate the agent account.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#22c55e',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Approve',
    })
    if (result.isConfirmed) {
      const res = await dispatch(approveAgent(id))
      if (res?.success) {
        Swal.fire('Approved!', 'Agent has been activated.', 'success')
        loadData()
      } else {
        Swal.fire('Error', res?.message || 'Failed to approve agent', 'error')
      }
    }
  }

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString('en-GB') : '—'

  return (
    <CCard className="mb-4">
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <span>Agents</span>
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
                <CTableHeaderCell>Agent ID</CTableHeaderCell>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell>Phone</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Joined</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {agents.length === 0 ? (
                <CTableRow>
                  <CTableDataCell colSpan={7} className="text-center text-muted py-4">
                    No agents found
                  </CTableDataCell>
                </CTableRow>
              ) : (
                agents.map((agent) => (
                  <CTableRow key={agent._id || agent.id}>
                    <CTableDataCell>
                      <small className="text-muted font-monospace">
                        {agent.userId || agent._id}
                      </small>
                    </CTableDataCell>
                    <CTableDataCell>
                      <strong>{agent.firstName} {agent.lastName}</strong>
                    </CTableDataCell>
                    <CTableDataCell>{agent.email}</CTableDataCell>
                    <CTableDataCell>{agent.phone || '—'}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge color={statusColor(agent.status)}>
                        {agent.status || 'pending'}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell>{formatDate(agent.createdAt)}</CTableDataCell>
                    <CTableDataCell>
                      {agent.status !== 'active' && (
                        <CButton
                          color="success"
                          size="sm"
                          onClick={() =>
                            handleApprove(
                              agent._id || agent.id,
                              `${agent.firstName} ${agent.lastName}`,
                            )
                          }
                        >
                          Approve
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

export default Agents
