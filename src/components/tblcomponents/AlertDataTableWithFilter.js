import React, { useMemo, useEffect, useState } from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { CButton, CBadge } from '@coreui/react'
import { cilPenAlt, cilTrash, cilReload } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlerts, deleteAlert } from '../../actions/alertActions'
import { fetchMachines } from '../../actions/machineActions'
import { format } from 'date-fns'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

/**
 * author Anushka Isuru Lakmal
 * created on 11-11-2025-10h-40m
 * copyright 2025
 */

export const AlertDataTableMui = () => {
  const dispatch = useDispatch()
  const { alerts } = useSelector((state) => state.alerts)
  const { machines } = useSelector((state) => state.machines)
  const [loading, setLoading] = useState(false)
  const [machineMap, setMachineMap] = useState({})
  const [previousAlerts, setPreviousAlerts] = useState([])
  const [isInitialLoad, setIsInitialLoad] = useState(true) // ✅ Track first load

  useEffect(() => {
    loadData()
    // Auto-refresh every 30 seconds
    // const interval = setInterval(loadData, 30000)
    // return () => clearInterval(interval)
  }, [])

  // ✅ Create machine name lookup map
  useEffect(() => {
    if (machines?.data) {
      const map = {}
      machines.data.forEach((machine) => {
        map[machine.id] = machine.name
      })
      setMachineMap(map)
    }
  }, [machines])

  // ✅ Check for critical alerts (on login and updates)
  useEffect(() => {
    if (alerts && alerts.length > 0 && Object.keys(machineMap).length > 0) {
      const currentAlerts = alerts || []

      if (isInitialLoad) {
        // ✅ On first load (login), show ALL existing critical alerts
        console.log('[Alert Check] Initial load - checking for existing critical alerts')
        const criticalAlerts = currentAlerts.filter(
          alert => alert.type === 'Low' && alert.status === 'level 04'
        )

        if (criticalAlerts.length > 0) {
          console.log(`[Alert Check] Found ${criticalAlerts.length} critical alerts on login`)
          criticalAlerts.forEach((alert, index) => {
            // Delay each notification slightly to prevent overlap
            setTimeout(() => {
              showCriticalAlert(alert, true) // Pass true to indicate it's an existing alert
            }, index * 500) // 500ms delay between each
          })
        }

        setIsInitialLoad(false)
        setPreviousAlerts(currentAlerts)
      } else {
        // ✅ After initial load, only show NEW or UPDATED critical alerts
        const previousAlertIds = new Set(previousAlerts.map(a => a.id))

        currentAlerts.forEach((alert) => {
          const isNew = !previousAlertIds.has(alert.id)
          const isCritical = alert.type === 'Low' && alert.status === 'level 04'

          if (isNew && isCritical) {
            console.log('[Alert Check] New critical alert detected:', alert.machine_id)
            showCriticalAlert(alert, false)
          } else if (isCritical && !isNew) {
            // Check if alert was updated to critical
            const oldAlert = previousAlerts.find(a => a.id === alert.id)
            if (oldAlert && oldAlert.status !== 'level 04') {
              console.log('[Alert Check] Alert escalated to critical:', alert.machine_id)
              showCriticalAlert(alert, false)
            }
          }
        })

        setPreviousAlerts(currentAlerts)
      }
    }
  }, [alerts, machineMap])

  // ✅ Show critical alert notification
  const showCriticalAlert = (alert, isExisting = false) => {
    const machineName = machineMap[alert.machine_id] || alert.machine_id

    const title = isExisting 
      ? '🚨 EXISTING CRITICAL ALERT!' 
      : '🚨 NEW CRITICAL STOCK ALERT!'

    toast.error(
      <div>
        <strong>{title}</strong>
        <div style={{ marginTop: '8px' }}>
          <strong>Machine:</strong> {machineName}
        </div>
        <div>
          <strong>Machine ID:</strong> {alert.machine_id}
        </div>
        <div>
          <strong>Status:</strong> Critical Low Stock
        </div>
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#ffcccb' }}>
          ⚠️ Immediate refill required!
        </div>
      </div>,
      {
        position: 'top-right',
        autoClose: isExisting ? 15000 : 10000, // Longer for existing alerts
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
        style: {
          backgroundColor: '#dc3545',
          color: 'white',
        },
      }
    )

    // ✅ Play sound only for first alert on login or new alerts
    if (isExisting) {
      playAlertSound()
    } else {
      playAlertSound()
    }
  }

  // ✅ Play alert sound
  const playAlertSound = () => {
    try {
      const audio = new Audio('/alert-sound.mp3')
      audio.volume = 0.5
      audio.play().catch(e => console.log('Audio play failed:', e))
    } catch (error) {
      console.log('Sound not available')
    }
  }

  const loadData = async () => {
    setLoading(true)
    await Promise.all([
      dispatch(fetchAlerts()),
      dispatch(fetchMachines())
    ])
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this alert?')) {
      const result = await dispatch(deleteAlert(id))
      if (result?.success) {
        loadData()
      }
    }
  }

  // Get alert badge color based on type and status
  const getAlertBadge = (type, status) => {
    if (type === 'Low') {
      switch (status) {
        case 'level 04':
          return { color: 'danger', label: 'Critical Low' }
        case 'level 03':
          return { color: 'warning', label: 'Very Low' }
        case 'level 02':
          return { color: 'info', label: 'Low' }
        default:
          return { color: 'secondary', label: status }
      }
    }
    return { color: 'success', label: 'Normal' }
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: 'machine_id',
        header: 'Machine',
        size: 200,
        Cell: ({ cell }) => {
          const machineId = cell.getValue()
          const machineName = machineMap[machineId] || machineId
          return (
            <div>
              <div style={{ fontWeight: 'bold' }}>{machineName}</div>
            </div>
          )
        },
      },
      {
        accessorKey: 'type',
        header: 'Type',
        size: 120,
        Cell: ({ row }) => {
          const { type, status } = row.original
          const badge = getAlertBadge(type, status)
          return (
            <CBadge color={badge.color} className="px-3 py-2">
              {badge.label}
            </CBadge>
          )
        },
      },
      {
        accessorKey: 'status',
        header: 'Level',
        size: 100,
        Cell: ({ cell }) => (
          <span style={{ textTransform: 'capitalize' }}>
            {cell.getValue()?.replace('level ', 'Level ')}
          </span>
        ),
      },
      {
        accessorKey: 'updatedAt',
        header: 'Last Updated',
        size: 180,
        Cell: ({ cell }) => {
          const date = cell.getValue()
          return date ? format(new Date(date), 'dd-MM-yyyy hh:mm a') : 'N/A'
        },
      },
      {
        accessorKey: 'createdAt',
        header: 'Created',
        size: 180,
        Cell: ({ cell }) => {
          const date = cell.getValue()
          return date ? format(new Date(date), 'dd-MM-yyyy hh:mm a') : 'N/A'
        },
      },
      {
        id: 'actions',
        header: 'Action',
        size: 150,
        Cell: ({ row }) => (
          <div className="d-flex gap-1">
            <CButton
              color="danger"
              size="sm"
              onClick={() => handleDelete(row.original.id)}
              title="Delete Alert"
            >
              <CIcon icon={cilTrash} size="sm" />
            </CButton>
          </div>
        ),
      },
    ],
    [machineMap]
  )

  const table = useMaterialReactTable({
    columns,
    data: alerts || [],
    state: {
      isLoading: loading,
    },
    enableRowNumbers: true,
    rowNumberMode: 'original',
    enableSorting: true,
    enablePagination: true,
    enableColumnFilters: true,
    enableGlobalFilter: true,
    muiCircularProgressProps: {
      color: 'secondary',
      thickness: 5,
      size: 55,
    },
    muiSkeletonProps: {
      animation: 'pulse',
      height: 28,
    },
  })

  return (
    <div>
      {/* ✅ Toast Container */}
      <ToastContainer />
      
      <div className="d-flex justify-content-end mb-3">
        <CButton color="info" size="sm" onClick={loadData} disabled={loading}>
          <CIcon icon={cilReload} size="sm" className="me-1" />
          Refresh
        </CButton>
      </div>
      <MaterialReactTable table={table} />
    </div>
  )
}

export default AlertDataTableMui

