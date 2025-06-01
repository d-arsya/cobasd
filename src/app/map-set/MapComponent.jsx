"use client";

import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

/**
 * Tangkap event klik di peta dan panggil onMapClick([lat, lng]).
 */
function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onMapClick([lat, lng]);
    },
  });
  return null;
}

export default function MapComponent() {
  // Hanya satu marker, sehingga tipenya: [lat, lng] atau null
  const [markerPos, setMarkerPos] = useState(null);

  // Klik peta => timpa markerPos dengan koordinat baru
  const handleMapClick = (coords) => {
    setMarkerPos(coords);
  };

  // Hapus marker => set ke null (tidak ada marker)
  const handleRemoveMarker = () => {
    setMarkerPos(null);
  };

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {/* Tombol di atas peta */}
      <div style={{ position: "absolute", zIndex: 999, padding: 10 }}>
        <button
          className="bg-[#D32F2F] p-2 rounded-[8px] text-amber-50"
          onClick={handleRemoveMarker}
        >
          Reset Peta
        </button>
      </div>

      {/* Peta Leaflet */}
      <MapContainer
        center={[-7.7828, 110.3671]} // Koordinat awal peta
        zoom={18}
        scrollWheelZoom
        style={{ width: "100%", height: "100%" }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution=""
        />

        {/* Tangani event klik di peta */}
        <MapClickHandler onMapClick={handleMapClick} />

        {/* Jika markerPos ada (tidak null), tampilkan Marker */}
        {markerPos && (
          <Marker position={markerPos}>
            <Popup>
              Marker Tunggal
              <br />
              Lat: {markerPos[0]}, Lng: {markerPos[1]}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
