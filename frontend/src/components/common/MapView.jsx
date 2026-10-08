import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom SVG Icon for Emergency Marker
const createCustomMarkerIcon = () => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div class="relative flex items-center justify-center">
        <span class="absolute inline-flex h-8 w-8 rounded-full bg-rose-500 opacity-75 animate-ping"></span>
        <div class="relative h-7 w-7 rounded-full bg-rose-600 border-2 border-white flex items-center justify-center shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

const MapView = ({ latitude, longitude, popupContent, zoom = 14, height = '350px' }) => {
  const lat = Number(latitude);
  const lng = Number(longitude);

  if (isNaN(lat) || isNaN(lng)) {
    return (
      <div
        style={{ height }}
        className="w-full bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center text-slate-400 p-4"
      >
        <p className="text-sm">Location coordinates unavailable</p>
      </div>
    );
  }

  const markerIcon = createCustomMarkerIcon();

  return (
    <div style={{ height }} className="w-full rounded-xl overflow-hidden shadow-inner border border-slate-800">
      <MapContainer
        center={[lat, lng]}
        zoom={zoom}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={markerIcon}>
          {popupContent && <Popup>{popupContent}</Popup>}
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;
