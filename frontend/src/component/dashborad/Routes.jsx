import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // To include the default Leaflet styles
import { LatLngBounds } from 'leaflet'; // Optional: You can set the bounds of the map if necessary.

function Routes() {
  return (
    <div className="w-full h-full px-7 py-5 bg-white rounded-2xl shadow-lg overflow-hidden">
      <div>
        <h1 className="text-[#1F2833] mb-2 text-start text-xl font-bold profile-text">Routes</h1>
        <div className="h-[2px] bg-black w-full rounded"></div>
      </div>
      <div className="flex justify-center" style={{ width: '300px', height: '300px' }}>
        {/* Map container */}
        <MapContainer 
          center={[51.505, -0.09]} // Default map center
          zoom={13} 
          style={{ width: '100%', height: '100%' }}
          scrollWheelZoom={false} // Disable scroll zoom
        >
          {/* TileLayer to set the map's background */}
          <TileLayer 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </div>
    </div>
  );
}

export default Routes;
