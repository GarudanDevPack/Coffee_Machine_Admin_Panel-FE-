
import React, { useState, useEffect, useCallback } from 'react'
import { CCard, CButton, CCardHeader, CCardBody } from '@coreui/react'
import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import PromotionDataTableMui from '../../../components/tblcomponents/PromotionDataTableWithFilter'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { deletePromotions, fetchPromotions } from '../../../actions/promotionAction'
import AddPromotionModal from '../../modal/AddPromotionModal'
import socket from '../../../realtime/socketSingleton'

/**
 * author Anushka Isuru Lakmal
 * created on 07-01-2025-09h-54m
 * copyright 2025
 */

const Promotions = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const [addOREdit, setAddOREdit] = useState(false)
  const [editData, setEditData] = useState(null)
  const [connectionStatus, setConnectionStatus] = useState('disconnected')
  const [lastUpdate, setLastUpdate] = useState(null)
  const [isSocketListening, setIsSocketListening] = useState(false)

  // Memoized getData function
  const getData = useCallback(async () => {
    try {
      console.log('🔄 Fetching promotions data...')
      const result = await dispatch(fetchPromotions())
      
      // Handle the response structure correctly
      let promotionsData = []
      if (result && result.data && Array.isArray(result.data)) {
        promotionsData = result.data
      } else if (result && Array.isArray(result)) {
        promotionsData = result
      }

      console.log('[Debugging] : Fetched promotions count -', promotionsData.length)
      
      // Only update if socket is not listening to prevent conflicts
      if (!isSocketListening || connectionStatus !== 'connected') {
        console.log('📊 Updating data from API fetch')
        setData(promotionsData)
        setLastUpdate(new Date())
      }
      
      return promotionsData
    } catch (error) {
      console.error('❌ Error fetching data:', error)
      return []
    }
  }, [dispatch, isSocketListening, connectionStatus])

  // Initial data fetch
  useEffect(() => {
    getData()
  }, [])

  // Polling when socket is disconnected
  useEffect(() => {
    let interval
    
    if (connectionStatus !== 'connected') {
      console.log('📡 Socket disconnected, starting polling...')
      interval = setInterval(() => {
        getData()
      }, 15000) // Poll every 15 seconds when disconnected
    } else {
      console.log('✅ Socket connected, polling disabled')
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [connectionStatus, getData])

  // Tab visibility tracking
  useEffect(() => {
    const saveLastLeftTime = () => {
      if (document.visibilityState === 'hidden') {
        const time = new Date().toISOString()
        localStorage.setItem('lastLeftTab', time)
        console.log('Tab hidden at:', time)
      }
    }

    const getLastLeftTime = () => {
      const lastLeft = localStorage.getItem('lastLeftTab')
      if (lastLeft) {
        const localTime = new Date(lastLeft).toLocaleString('en-US', {
          timeZone: 'Asia/Colombo',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
        console.log('Last time you left the tab (local time):', localTime)
        return localTime
      }
      return null
    }

    document.addEventListener('visibilitychange', saveLastLeftTime)

    const lastLeftTime = getLastLeftTime()
    if (lastLeftTime) {
      const message = `Welcome back! You last left the tab at: ${lastLeftTime}`
      console.log(message)
    }

    return () => {
      document.removeEventListener('visibilitychange', saveLastLeftTime)
    }
  }, [])

  // Socket connection management
  useEffect(() => {
    const handleConnect = () => {
      console.log('✅ Socket connected in Promotions component')
      setConnectionStatus('connected')
    }

    const handleDisconnect = () => {
      console.log('❌ Socket disconnected in Promotions component')
      setConnectionStatus('disconnected')
      setIsSocketListening(false)
    }

    const handleError = (error) => {
      console.error('❌ Socket error in Promotions component:', error)
      setConnectionStatus('error')
    }

    const handleReconnect = () => {
      console.log('🔄 Socket reconnected')
      setConnectionStatus('connected')
    }

    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)
    socket.on('connect_error', handleError)
    socket.on('reconnect', handleReconnect)

    // Check initial connection state
    if (socket.connected) {
      setConnectionStatus('connected')
    }

    return () => {
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
      socket.off('connect_error', handleError)
      socket.off('reconnect', handleReconnect)
    }
  }, [])

  // Real-time promotion updates via Socket.IO
  useEffect(() => {
    if (connectionStatus !== 'connected') {
      return
    }

    console.log('🔌 Setting up promotion socket listeners...')
    setIsSocketListening(true)
    
    // Join the promotions room
    socket.emit('join', { room: 'promotions' })

    const handleUpsert = (row) => {
      console.log('📨 Received promotion upsert:', row)
      setData((prevData) => {
        const id = row._id || row.id
        const existingIndex = prevData.findIndex((item) => 
          (item._id || item.id) === id
        )
        
        if (existingIndex === -1) {
          console.log('➕ Adding new promotion via socket')
          return [row, ...prevData]
        } else {
          console.log('✏️ Updating existing promotion via socket')
          return prevData.map((item, index) =>
            index === existingIndex ? { ...item, ...row } : item
          )
        }
      })
      setLastUpdate(new Date())
    }

    const handleRemove = (payload) => {
  console.log('🗑️ Received promotion delete payload:', payload)
  
  // Handle different possible payload structures
  const deleteId = payload.id || payload._id || payload
  console.log('🔍 Extracted delete ID:', deleteId)
  
  setData((prevData) => {
    console.log('📊 Current data before delete:', prevData.length, 'items')
    console.log('🔍 Looking for item with ID:', deleteId)
    
    // Log all current IDs for debugging
    prevData.forEach((item, index) => {
      console.log(`Item ${index}: id=${item.id}, _id=${item._id}`)
    })
    
    const filteredData = prevData.filter((item) => {
      const itemId = item._id || item.id
      const shouldKeep = itemId !== deleteId
      if (!shouldKeep) {
        console.log('🗑️ Removing item with ID:', itemId)
      }
      return shouldKeep
    })
    
    console.log('📊 Data after delete:', filteredData.length, 'items')
    setLastUpdate(new Date())
    return filteredData
  })
}

    const handleBulkRefresh = (rows) => {
      console.log('🔄 Received bulk refresh:', rows?.length, 'items')
      if (Array.isArray(rows)) {
        setData(rows)
        setLastUpdate(new Date())
      }
    }

    // Subscribe to socket events
    socket.on('promotion:created', handleUpsert)
    socket.on('promotion:updated', handleUpsert)
    socket.on('promotion:deleted', handleRemove)
    socket.on('promotion:bulk_refresh', handleBulkRefresh)

    // Test events
    socket.on('welcome', (data) => {
      console.log('🎉 Welcome from server:', data)
    })

    socket.on('room:joined', (data) => {
      console.log('🏠 Room joined confirmation:', data)
    })

    // Cleanup function
    return () => {
      console.log('🧹 Cleaning up promotion socket listeners...')
      setIsSocketListening(false)
      socket.emit('leave', { room: 'promotions' })
      socket.off('promotion:created', handleUpsert)
      socket.off('promotion:updated', handleUpsert)
      socket.off('promotion:deleted', handleRemove)
      socket.off('promotion:bulk_refresh', handleBulkRefresh)
      socket.off('welcome')
      socket.off('room:joined')
    }
  }, [connectionStatus]) // Re-run when connection status changes

  const handleOpenEditItemModal = (promotion) => {
    setEditData(promotion)
    setIsModalVisible(true)
    setAddOREdit(false)
  }

  const handleOpenAddModal = () => {
    setEditData(null)
    setIsModalVisible(true)
    setAddOREdit(true)
  }

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(deletePromotions(id))
          Swal.fire('Deleted!', 'The promotion has been deleted successfully.', 'success')
          // Socket will handle the real-time update
        } catch (error) {
          console.error('Failed to delete promotion:', error)
          Swal.fire('Error!', 'Failed to delete the promotion. Please try again.', 'error')
        }
      }
    })
    getData()
  }

  const handleModalClose = () => {
    setIsModalVisible(false)
    setEditData(null)
    setAddOREdit(false)
  }

  // Prepare data for table component
  const tableData = {
    success: true,
    data: data // Pass the data array directly
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              Manage Alerts
              {lastUpdate && (
                <small className="text-muted ms-2">
                  Last updated: {lastUpdate.toLocaleTimeString()}
                </small>
              )}
            </div>
            
            {/* Connection status indicator */}
            <span className={`ms-2 badge ${
              connectionStatus === 'connected' ? 'bg-success' : 
              connectionStatus === 'error' ? 'bg-danger' : 'bg-warning'
            }`}>
              {connectionStatus === 'connected' ? '🟢 Live' : 
               connectionStatus === 'error' ? '🔴 Error' : '🟡 Connecting...'}
            </span>
            
            <div className="d-flex align-items-center">
              <CButton
                color="info"
                type="button"
                onClick={handleOpenAddModal}
                className="btn-default text-sm"
              >
                Add Advertisement&nbsp;
                <CIcon className="ml-2" icon={cilPlus} size="sm" />
              </CButton>
            </div>
          </div>
        </CCardHeader>

        <CCardBody className="mt-4">
          <PromotionDataTableMui 
            tableData={tableData}
            onDelete={handleDelete}
            onEditClick={handleOpenEditItemModal}
          />
        </CCardBody>
      </CCard>

      <AddPromotionModal
        visible={isModalVisible}
        onClose={handleModalClose}
        editData={editData}
        addOREdit={addOREdit}
      />
    </>
  )
}

export default Promotions