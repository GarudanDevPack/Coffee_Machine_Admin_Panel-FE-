import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CFormLabel,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
  CBadge,
  CListGroup,
  CListGroupItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilStar } from '@coreui/icons'

/**
 * Modal to view all comments for a specific item
 * author Anushka Isuru Lakmal
 * created on [current-date]
 * copyright 2025
 */

const ViewItemCommentsModal = ({ visible, onClose, itemData }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }
    const date = new Date(dateString)
    return date.toLocaleString('en-GB', options)
  }

  const renderStars = (rating) => {
    return (
      <div className="d-flex align-items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <CIcon
            key={star}
            icon={cilStar}
            className={star <= rating ? 'text-warning' : 'text-secondary'}
            size="sm"
          />
        ))}
        <span className="ms-1 fw-bold">{rating}</span>
      </div>
    )
  }

  return (
    <CModal
      alignment="center"
      scrollable
      visible={visible}
      onClose={onClose}
      size="lg"
      aria-labelledby="ViewItemCommentsModal"
    >
      <CModalHeader>
        <CModalTitle id="ViewItemCommentsModal">
          Comments for "{itemData?.name || 'Item'}"
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard className="mb-4">
          <CCardBody>
            <CRow className="mb-3">
              <CCol>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <CFormLabel className="mb-1">Item Name:</CFormLabel>
                    <h5>{itemData?.name || 'N/A'}</h5>
                  </div>
                  <div className="text-end">
                    <CFormLabel className="mb-1">Average Rating:</CFormLabel>
                    <div className="d-flex align-items-center gap-2">
                      <CIcon icon={cilStar} className="text-warning" size="lg" />
                      <span className="h4 mb-0">
                        {itemData?.rating_avg?.toFixed(1) || '0.0'}
                      </span>
                      <CBadge color="secondary">
                        {itemData?.rating_count || 0}{' '}
                        {itemData?.rating_count === 1 ? 'review' : 'reviews'}
                      </CBadge>
                    </div>
                  </div>
                </div>
              </CCol>
            </CRow>

            <hr />

            <CRow>
              <CCol>
                <CFormLabel className="mb-3">All Comments:</CFormLabel>
                {!itemData?.comments || itemData.comments.length === 0 ? (
                  <div className="text-center text-muted py-4">
                    <p>No comments yet for this item.</p>
                  </div>
                ) : (
                  <CListGroup>
                    {itemData.comments.map((comment, index) => (
                      <CListGroupItem key={index} className="mb-2">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <strong>{comment.user_name || 'Anonymous'}</strong>
                            {comment.user_email && (
                              <span className="text-muted ms-2">
                                ({comment.user_email})
                              </span>
                            )}
                          </div>
                          <div className="d-flex flex-column align-items-end">
                            {renderStars(comment.rating || 0)}
                            <small className="text-muted mt-1">
                              {formatDate(comment.createdAt)}
                            </small>
                          </div>
                        </div>
                        <p className="mb-0 text-muted fst-italic">
                          "{comment.comment || 'No comment text'}"
                        </p>
                      </CListGroupItem>
                    ))}
                  </CListGroup>
                )}
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CModalBody>
    </CModal>
  )
}

export default ViewItemCommentsModal