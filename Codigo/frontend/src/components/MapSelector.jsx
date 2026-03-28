import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import styles from '../styles/MapSelector.module.css'

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Componente para capturar cliques no mapa
function LocationMarker({ onLocationSelect }) {
  const [position, setPosition] = useState(null)

  useMapEvents({
    click(e) {
      setPosition(e.latlng)
      onLocationSelect(e.latlng)
    },
  })

  return position === null ? null : (
    <Marker position={position} />
  )
}

function Recenter({position}) {
  const map = useMapEvents({})

  useEffect(() => {
    if (position) {
      map.setView([position.lat, position.lng], 15, { animate: true })
    }
  }, [position, map])

  return null
}

export default function MapSelector({ onLocationSelect, selectedLocation }) {
  const [center, setCenter] = useState([-29.1657, -51.1794]) // Coordenadas de Santa Maria, RS

  useEffect(() => {
    // Tentar obter localização atual do usuário
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setCenter([latitude, longitude])
        },
        (error) => {
          console.log('Erro ao obter localização:', error)
        }
      )
    }
  }, [])

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '300px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker onLocationSelect={onLocationSelect} />
        {selectedLocation && (
          <>
            <Recenter position={selectedLocation} />
            <Marker position={[selectedLocation.lat, selectedLocation.lng]} />
          </>
        )}
      </MapContainer>
      <p className={styles.instruction}>
        Clique no mapa para selecionar a localização do problema
      </p>
    </div>
  )
}