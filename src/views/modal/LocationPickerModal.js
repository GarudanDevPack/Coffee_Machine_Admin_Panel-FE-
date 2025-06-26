import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

import { CModal, CModalBody, CModalHeader, CModalTitle, CButton } from '@coreui/react'

// Default Leaflet marker fix
delete L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

function LocationMarker({ onSelect }) {
  const [position, setPosition] = useState(null)

  useMapEvents({
    click(e) {
      setPosition(e.latlng)
      onSelect(e.latlng)
    },
  })

  return position === null ? null : <Marker position={position} />
}

const LocationPickerModal = ({ visible, onClose, onSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState(null)
   const [tempLocation, setTempLocation] = useState(null);

  const handleSave = () => {
    if (tempLocation) {
      onSelect(tempLocation)
      console.log('Selected Location:', tempLocation)
      setSelectedLocation(tempLocation)
      onClose()
    }
  }

  return (
    <CModal visible={visible} onClose={onClose} size="xl">
      <CModalHeader>
        <CModalTitle>Select Location on Map</CModalTitle>
      </CModalHeader>
      <CModalBody style={{ height: '500px' }}>
        <MapContainer center={[6.9271, 79.8612]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://osm.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker onSelect={setTempLocation} />
        </MapContainer>
        <div className="mt-3 text-end">
          <CButton color="success" onClick={handleSave} disabled={!tempLocation}>
            Save Location
          </CButton>
        </div>
      </CModalBody>
    </CModal>
  )
}

export default LocationPickerModal