import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // To include the default Leaflet styles

function Routes() {
  return (
    <div
      className="relative mt-5 mr-5" // Adding margin from the top and right to avoid overlap with the navbar
      style={{
        width: '70vw', // 70% of the viewport width
        height: '50vh', // 50% of the viewport height
        border: '2px solid #000', // Add a border
        borderRadius: '10px', // Optional: Rounded corners for the container
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', // Add a subtle shadow for depth
        resize: 'both', // Make the container resizable
        overflow: 'hidden', // Ensure content doesn't overflow
      }}
    >
      <MapContainer
        center={[51.505, -0.09]} // Default map center
        zoom={13}
        style={{
          width: '100%',
          height: '100%',
        }}
        scrollWheelZoom={false} // Disable scroll zoom
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
}

export default Routes;
