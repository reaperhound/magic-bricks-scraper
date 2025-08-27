"use client";

import { useState, useEffect } from "react";

export default function LocationMap({ lat, long, locName }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div
        style={{
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f0f0f0",
        }}
      >
        Loading map...
      </div>
    );
  }

  // Only import and render on client side
  const { MapContainer, TileLayer, Marker, Popup } = require("react-leaflet");
  const L = require("leaflet");
  require("leaflet/dist/leaflet.css");

  // Fix for default markers
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });

  //   const customIcon = L.icon({
  //     iconUrl: "/pin.png",
  //     iconSize: [32, 32],
  //     iconAnchor: [16, 32],
  //   });

  return (
    <MapContainer
      center={[lat, long]}
      zoom={15}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      <Marker position={[lat, long]}>
        <Popup>{locName}</Popup>
      </Marker>
    </MapContainer>
  );
}
