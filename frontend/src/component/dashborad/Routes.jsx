import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // To include the default Leaflet styles

function Routes() {
  return (
    <div className="w-[100%] h-full px-7 py-4 bg-white rounded-2xl shadow-lg overflow-hidden">
            <div>
                <h1 className="text-[#1F2833] mb-2 text-start text-xl font-bold profile-text">
                    Route
                </h1>
                <div className="h-[2px] mb-4 bg-black w-full rounded"></div>
            </div>
            <div className='w-full h-full justify-center flex items-center'>
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
        </div>
  );
}

export default Routes;
