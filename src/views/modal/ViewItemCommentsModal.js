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
  CSpinner,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilStar } from '@coreui/icons'
import axios from 'axios'
import { API_BASE_URL } from '../../config/config'
/**
 * Modal to view all comments for a specific item
 * Fetches all comments from the backend Rating collection
 * @author Anushka Isuru Lakmal
 * @created 05-02-2025
 * @copyright 2025
 */
const ViewItemCommentsModal = ({ visible, onClose, itemData }) => {
  // State to store fetched comments
  const [comments, setComments] = useState([])
  // Loading state while API request is in progress
  const [loading, setLoading] = useState(false)
  // Error message if API call fails
  const [error, setError] = useState(null)
  // Pagination state
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  /**
   * Fetch comments when modal opens or page changes
   * Only runs when modal is visible and itemData exists
   */
  useEffect(() => {
    if (visible && itemData?.id) {
      console.log('📋 Modal opened for item:', itemData.id, itemData.name)
      fetchComments()
    } else {
      // Reset state when modal closes
      setComments([])
      setPage(1)
      setError(null)
    }
  }, [visible, itemData?.id, page])

  /**
   * Fetches all comments/ratings for the current item from backend
   * Makes GET request to /ratings/item/:item_id/comments
   */
  const fetchComments = async () => {
    console.log('🚀 Fetching comments for item:', itemData.id)
    setLoading(true)
    setError(null)
    
    try {
      // Construct API URL - matches your backend route
      const url = `${API_BASE_URL}/ratings/item/${itemData.id}/comments?page=${page}&limit=10&sort=recent`
      console.log('📡 API URL:', url)
      
      // Make the API call
      const response = await axios.get(url, { 
        withCredentials: true 
      })
      
      console.log('✅ API Response:', response.data)
      
      // Extract comments from response
      const fetchedComments = response.data?.data?.comments || []
      const pagination = response.data?.data?.pagination || {}
      
      console.log('📝 Comments fetched:', fetchedComments.length)
      console.log('📊 Pagination:', pagination)
      
      // Update state with fetched data
      setComments(fetchedComments)
      setTotalPages(pagination.totalPages || 1)
      
    } catch (err) {
      console.error('❌ Error fetching comments:', err)
      console.error('❌ Error response:', err.response?.data)
      
      // Set user-friendly error message
      const errorMsg = err.response?.data?.message || err.message || 'Failed to load comments'
      setError(errorMsg)
      
    } finally {
      setLoading(false)
    }
  }

  /**
   * Formats a date string into readable DD/MM/YYYY, HH:MM AM/PM format
   * @param {string} dateString - ISO date string from database
   * @returns {string} Formatted date string
   */
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

  /**
   * Renders star rating visualization
   * @param {number} rating - Rating value (1-5)
   * @returns {JSX.Element} Star icons with numeric badge
   */
  const renderStars = (rating) => {
    const safeRating = Number(rating) || 0
    
    return (
      <div className="d-flex align-items-center gap-1">
        {/* Render 5 stars, filled based on rating */}
        {[1, 2, 3, 4, 5].map((star) => (
          <CIcon
            key={star}
            icon={cilStar}
            size="sm"
            className={star <= safeRating ? 'text-warning' : 'text-secondary'}
          />
        ))}
        {/* Display numeric rating */}
        <CBadge color="light" className="text-dark">
          {safeRating}
        </CBadge>
      </div>
    )
  }

  /**
   * Handle page change for pagination
   */
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
    }
  }

  return (
    <CModal
      visible={visible}
      onClose={onClose}
      size="lg"
      scrollable
    >
      <CModalHeader closeButton>
        <CModalTitle>
          Comments for "{itemData?.name || 'Item'}"
        </CModalTitle>
      </CModalHeader>
      
      <CModalBody>
        {/* Item Summary Card */}
        <CCard className="mb-3">
          <CCardBody>
            <CRow>
              {/* Item Name */}
              <CCol md={6}>
                <CFormLabel className="fw-bold">Item Name:</CFormLabel>
                <div>{itemData?.name || 'N/A'}</div>
              </CCol>
              
              {/* Average Rating & Review Count */}
              <CCol md={6}>
                <CFormLabel className="fw-bold">Average Rating:</CFormLabel>
                <div className="d-flex align-items-center gap-2">
                  {renderStars(Math.round(itemData?.rating_avg || 0))}
                  <span className="text-muted">
                    {itemData?.rating_count || 0}{' '}
                    {itemData?.rating_count === 1 ? 'review' : 'reviews'}
                  </span>
                </div>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>

        {/* Comments Section Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="mb-0">All Comments:</h6>
          {!loading && !error && comments.length > 0 && (
            <small className="text-muted">
              Showing {comments.length} comment(s)
            </small>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-5">
            <CSpinner color="primary" />
            <div className="mt-3 text-muted">Loading comments...</div>
          </div>
        ) : error ? (
          /* Error State */
          <div className="alert alert-danger" role="alert">
            <strong>Error:</strong> {error}
            <div className="mt-2">
              <CButton 
                color="danger" 
                size="sm" 
                variant="outline"
                onClick={fetchComments}
              >
                Try Again
              </CButton>
            </div>
          </div>
        ) : !comments || comments.length === 0 ? (
          /* Empty State */
          <div className="text-center py-5">
            <div className="text-muted mb-2">
              <CIcon icon={cilStar} size="3xl" className="text-secondary" />
            </div>
            <h6 className="text-muted">No comments yet for this item</h6>
            <small className="text-muted">
              Be the first to leave a review!
            </small>
          </div>
        ) : (
          /* Comments List */
          <>
            <CListGroup>
              {comments.map((comment, index) => (
                <CListGroupItem 
                  key={comment.id || comment._id || index} 
                  className="mb-2 border rounded"
                >
                  {/* User Information Header */}
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <strong className="text-primary">
                        {comment.user_name || comment.userName || 'Anonymous'}
                      </strong>
                      {comment.user_email && (
                        <span className="text-muted ms-2 small">
                          ({comment.user_email})
                        </span>
                      )}
                    </div>
                    {/* Timestamp */}
                    <small className="text-muted">
                      {formatDate(comment.createdAt || comment.created_at)}
                    </small>
                  </div>

                  {/* Star Rating Display */}
                  <div className="mb-2">
                    {renderStars(comment.stars || comment.rating || 0)}
                  </div>

                  {/* Comment Text */}
                  {comment.comment && comment.comment.trim() !== '' && (
                    <div className="mt-2 p-3 bg-light rounded">
                      <p className="mb-0 text-dark fst-italic">
                        "{comment.comment}"
                      </p>
                    </div>
                  )}
                </CListGroupItem>
              ))}
            </CListGroup>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
                <CButton
                  color="primary"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => handlePageChange(page - 1)}
                >
                  Previous
                </CButton>
                <span className="text-muted">
                  Page {page} of {totalPages}
                </span>
                <CButton
                  color="primary"
                  size="sm"
                  disabled={page === totalPages}
                  onClick={() => handlePageChange(page + 1)}
                >
                  Next
                </CButton>
              </div>
            )}
          </>
        )}
      </CModalBody>
    </CModal>
  )
}

export default ViewItemCommentsModal