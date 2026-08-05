import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from '../styles/MapSelector.module.css';

type Location = { lat: number; lng: number };

type MapSelectorProps = {
  onLocationSelect: (location: Location) => void;
  selectedLocation: Location | null;
};

const initialCenter = { lat: -29.1657, lng: -51.1794 };

export default function MapSelector({ onLocationSelect, selectedLocation }: MapSelectorProps) {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const markerRef = useRef<L.CircleMarker | null>(null);

  useEffect(() => {
    if (!mapElement.current || leafletMap.current) return;

    const map = L.map(mapElement.current, {
      center: [initialCenter.lat, initialCenter.lng],
      zoom: 13,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    map.on('click', (event: L.LeafletMouseEvent) => {
      onLocationSelect({ lat: event.latlng.lat, lng: event.latlng.lng });
    });

    leafletMap.current = map;

    return () => {
      map.off();
      map.remove();
      leafletMap.current = null;
    };
  }, [onLocationSelect]);

  useEffect(() => {
    const map = leafletMap.current;
    if (!map) return;

    if (selectedLocation) {
      if (markerRef.current) {
        markerRef.current.setLatLng(selectedLocation);
      } else {
        markerRef.current = L.circleMarker(selectedLocation, {
          radius: 8,
          color: '#ffffff',
          fillColor: '#ff4d4f',
          weight: 3,
          fillOpacity: 0.95,
        }).addTo(map);
      }
      map.setView([selectedLocation.lat, selectedLocation.lng], map.getZoom());
    } else if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }
  }, [selectedLocation]);

  return (
    <div className={styles.mapContainer}>
      <div ref={mapElement} className={styles.mapSurface} />
      <p className={styles.instruction}>Clique no mapa para selecionar a localização do problema</p>
    </div>
  );
}
