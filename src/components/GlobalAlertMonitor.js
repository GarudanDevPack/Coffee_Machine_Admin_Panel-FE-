import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlerts } from '../actions/alertActions' // ✅ Fixed path - removed 'redux/'
import { fetchMachines } from '../actions/machineActions' // ✅ Fixed path - removed 'redux/'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

/**
 * Global Alert Monitor - Checks for critical alerts on login/app load
 * author Anushka Isuru Lakmal
 * created on 11-11-2025-15h-00m
 * copyright 2025
 */

const GlobalAlertMonitor = () => {
  const dispatch = useDispatch()
  const { alerts } = useSelector((state) => state.alerts)
  const { machines } = useSelector((state) => state.machines)
  const [machineMap, setMachineMap] = useState({})
  const [hasCheckedInitialAlerts, setHasCheckedInitialAlerts] = useState(false)
  const [previousAlerts, setPreviousAlerts] = useState([])

  // Fetch alerts and machines on mount
  useEffect(() => {
    const loadInitialData = async () => {
      console.log('[Global Alert] Starting initial data load...')
      await Promise.all([
        dispatch(fetchAlerts()),
        dispatch(fetchMachines())
      ])
    }
    loadInitialData()

    // Optional: Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      console.log('[Global Alert] Auto-refreshing alerts...')
      dispatch(fetchAlerts())
    }, 30000)

    return () => clearInterval(interval)
  }, [dispatch])

  // Build machine name lookup map
  useEffect(() => {
    if (machines?.data) {
      const map = {}
      machines.data.forEach((machine) => {
        map[machine.id] = machine.name
      })
      setMachineMap(map)
      console.log('[Global Alert] Machine map created:', Object.keys(map).length, 'machines')
    }
  }, [machines])

  // Check for critical alerts
  useEffect(() => {
    if (alerts && alerts.length > 0 && Object.keys(machineMap).length > 0) {
      const currentAlerts = alerts || []

      if (!hasCheckedInitialAlerts) {
        // ✅ ON LOGIN: Show all existing critical alerts
        console.log('[Global Alert] Checking for existing critical alerts on login...')
        const criticalAlerts = currentAlerts.filter(
          alert => alert.type === 'Low' && alert.status === 'level 04'
        )

        if (criticalAlerts.length > 0) {
          console.log(`[Global Alert] Found ${criticalAlerts.length} critical alert(s)`)
          
          // Show each critical alert with a delay
          criticalAlerts.forEach((alert, index) => {
            setTimeout(() => {
              showCriticalAlert(alert, machineMap)
            }, index * 600) // 600ms delay between each alert
          })

          // Play sound once for all alerts
          playAlertSound()
        } else {
          console.log('[Global Alert] ✅ No critical alerts found - all good!')
        }

        setHasCheckedInitialAlerts(true)
        setPreviousAlerts(currentAlerts)
      } else {
        // ✅ AFTER LOGIN: Only show NEW critical alerts
        const previousAlertIds = new Set(previousAlerts.map(a => a.id))

        currentAlerts.forEach((alert) => {
          const isNew = !previousAlertIds.has(alert.id)
          const isCritical = alert.type === 'Low' && alert.status === 'level 04'

          if (isNew && isCritical) {
            console.log('[Global Alert] 🚨 NEW critical alert detected:', alert.machine_id)
            showCriticalAlert(alert, machineMap)
            playAlertSound()
          } else if (isCritical && !isNew) {
            // Check if alert was escalated to critical
            const oldAlert = previousAlerts.find(a => a.id === alert.id)
            if (oldAlert && oldAlert.status !== 'level 04') {
              console.log('[Global Alert] 📈 Alert escalated to critical:', alert.machine_id)
              showCriticalAlert(alert, machineMap)
              playAlertSound()
            }
          }
        })

        setPreviousAlerts(currentAlerts)
      }
    }
  }, [alerts, machineMap, hasCheckedInitialAlerts, previousAlerts])

  return <ToastContainer />
}

// ✅ Show critical alert notification
const showCriticalAlert = (alert, machineMap) => {
  const machineName = machineMap[alert.machine_id] || alert.machine_id

  toast.error(
    <div>
      <strong style={{ fontSize: '16px' }}>🚨 CRITICAL STOCK ALERT!</strong>
      <div style={{ marginTop: '10px', fontSize: '14px' }}>
        <strong>Machine:</strong> {machineName}
      </div>
      <div style={{ marginTop: '5px', fontSize: '13px', opacity: 0.9 }}>
        <strong>Machine ID:</strong> {alert.machine_id}
      </div>
      <div style={{ marginTop: '5px', fontSize: '14px' }}>
        <strong>Status:</strong> <span style={{ color: '#ffcccb' }}>Critical Low Stock</span>
      </div>
      <div style={{ 
        marginTop: '10px', 
        padding: '10px', 
        backgroundColor: 'rgba(255, 255, 255, 0.15)', 
        borderRadius: '4px',
        fontSize: '13px',
        borderLeft: '3px solid #ffcccb'
      }}>
        ⚠️ <strong>Action Required:</strong> Immediate refill needed!
      </div>
      <div style={{ marginTop: '10px', fontSize: '12px', opacity: 0.8 }}>
        💡 Visit Alerts page for more details
      </div>
    </div>,
    {
      position: 'top-right',
      autoClose: 15000, // 15 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark',
      style: {
        backgroundColor: '#dc3545',
        color: 'white',
        minWidth: '380px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      },
    }
  )
}

// ✅ Play alert sound
const playAlertSound = () => {
  try {
    const audio = new Audio('/alert-sound.mp3')
    audio.volume = 0.5
    audio.play().catch(e => {
      console.log('[Global Alert] Audio play blocked by browser:', e.message)
    })
  } catch (error) {
    console.log('[Global Alert] Sound file not available')
  }
}

export default GlobalAlertMonitor