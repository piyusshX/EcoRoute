import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Define six points to form a hexagon in Delhi
// const delhiHexagonPoints = [
//   [28.6139, 77.2090],  // Point 1 - Starting point
//   [28.6145, 77.2100],  // Point 2
//   [28.6150, 77.2110],  // Point 3
//   [28.6140, 77.2120],  // Point 4
//   [28.6130, 77.2110],  // Point 5
//   [28.6125, 77.2100],  // Point 6 - Last point before closing
//   [28.6139, 77.2090],  // Point 1 again to close the hexagon
// ];

// Colors for each side of the hexagon
const colors = ['red', 'blue', 'green', 'purple', 'orange', 'cyan'];

function FitToPolygon({ positions }) {
  const map = useMap();
  useEffect(() => {
    if (positions && positions.length > 1) {
      // Calculate the bounds for the polygon
      const bounds = positions.reduce((bounds, position) => bounds.extend(position), new L.LatLngBounds());
      map.fitBounds(bounds);
    }
  }, [map, positions]);
  return null;
}


function Routes({ circularCoordinates}) {
  return (
          <div className="w-[100%] h-full px-7 py-12 bg-white rounded-2xl shadow-lg overflow-hidden">
            <div>
                <h1 className="text-[#1F2833] mb-2 text-start text-xl font-bold profile-text">
                    Route
                </h1>
                <div className="h-[2px] mb-4 bg-black w-full rounded"></div>
            </div>
            <div className='w-full h-full justify-center flex items-center'>
            <MapContainer
                center={circularCoordinates[0]} // Initial map center
                zoom={15}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* Fit map view to the bounds of the hexagon polygon */}
                <FitToPolygon positions={circularCoordinates} />

                {/* Draw each side of the hexagon with a different color */}
                {circularCoordinates.slice(0, -1).map((point, index) => {
                  const nextIndex = (index + 1) % circularCoordinates.length;
                  return (
                    <Polyline
                      key={index}
                      positions={[point, circularCoordinates[nextIndex]]}
                      color={colors[index % colors.length]}
                      weight={4} // Line thickness
                    />
                  );
                })}
              </MapContainer>
            </div>
        </div>
  );
}

export default Routes;
