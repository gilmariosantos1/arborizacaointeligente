import React, { useState } from 'react';
import styles from '../styles/MapSelector.module.css';

type Location = { lat: number; lng: number };

type MapSelectorProps = {
  onLocationSelect: (location: Location) => void;
  selectedLocation: Location | null;
};

export default function MapSelector({ onLocationSelect, selectedLocation }: MapSelectorProps) {
  const [center] = useState({ lat: -29.1657, lng: -51.1794 });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const approxLat = ((rect.bottom - event.clientY) / rect.height) * 0.2 + center.lat;
    const approxLng = ((event.clientX - rect.left) / rect.width) * 0.2 + center.lng;

    const location = { lat: Number(approxLat.toFixed(6)), lng: Number(approxLng.toFixed(6)) };
    onLocationSelect(location);
  };

  return (
    <div className={styles.mapContainer} onClick={handleClick}>
      <div className="map-surface">
        {selectedLocation && (
          <div
            className="map-pin"
            style={{
              left: `${((selectedLocation.lng - center.lng + 0.1) / 0.2) * 100}%`,
              top: `${((center.lat - selectedLocation.lat + 0.1) / 0.2) * 100}%`,
            }}
          />
        )}
      </div>
      <p className={styles.instruction}>Clique no mapa para selecionar a localização do problema</p>
    </div>
  );
}