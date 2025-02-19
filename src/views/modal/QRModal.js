/**
 * author Anushka Isuru Lakmal
 * created on 18-02-2025-12h-11m
 * copyright 2025
 */

import React, { useRef } from 'react'
import {
  CButton,
  CCard,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import QRCode from 'react-qr-code'
import { cilDataTransferDown } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
// import QRCode from 'react-qr-code'

export const QRPreviewModal = ({ visible, onClose, qrCodeData }) => {
  const { id, clientId, orgId } = qrCodeData
  const qrRef = useRef(null)

  const renderText = () => {
    return `${id ? `${id}/` : ''}${clientId ? `${clientId}/` : ''}${orgId ? `${orgId}` : ''}`
  }
  const downloadQRCode = () => {
    const svg = qrRef.current?.querySelector('svg')
    if (!svg) {
      console.error('QR code SVG not found!')
      return
    }

    // Convert SVG to Data URL
    const svgData = new XMLSerializer().serializeToString(svg)
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)

    const img = new Image()
    img.src = url
    img.onload = () => {
      const size = 300 // QR Code size
      const borderSize = 20 // White border size

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      canvas.width = size + borderSize * 2
      canvas.height = size + borderSize * 2
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      // Draw QR Code image onto canvas
      ctx.drawImage(img, borderSize, borderSize, size, size)
      const pngUrl = canvas.toDataURL('image/png')

      const a = document.createElement('a')
      a.href = pngUrl
      a.download = `${id}_qrcode.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <CModal alignment="center" scrollable visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>QR Code Preview</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div ref={qrRef} style={{ height: 'auto', margin: '0 auto', maxWidth: 300, width: '100%' }}>
          <QRCode
            size={256}
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            value={renderText()}
          />
        </div>
        <div className="mt-4 d-flex justify-content-center align-items-center">
          <p>{id}</p>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={downloadQRCode}>
          Download&nbsp;
          <CIcon className="ml-2" icon={cilDataTransferDown} size="sm" />
        </CButton>
        {/* <CButton color="danger" onClick={onClose}>
          Close
        </CButton> */}
      </CModalFooter>
    </CModal>
  )
}

export default QRPreviewModal

//   const downloadQRCode = () => {
//     const svg = qrRef.current?.querySelector('svg') // Get the SVG element
//     if (!svg) {
//       console.error('QR code SVG not found!')
//       return
//     }
//     const svgData = new XMLSerializer().serializeToString(svg)
//     const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
//     const url = URL.createObjectURL(svgBlob)
//     console.log('SVG QR Code Image URL:', url) // Log to check the image URL
//     const a = document.createElement('a')
//     a.href = url
//     a.download = 'qrcode.png'
//     document.body.appendChild(a)
//     a.click()
//     document.body.removeChild(a)
//     URL.revokeObjectURL(url)
//   }
