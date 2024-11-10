import React, { useEffect, useState } from 'react'
import BestRouteInfo from './BestRouteInfo'
import CarbonEmissionChart from './CarbonEmissionChart'
import Routes from './Routes'
import TimeBarChart from './TimeBarChart'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../context/AuthContext'; // Adjust path if needed

function Dashboard() {
  const { authToken } = useContext(AuthContext);
  const [routes, setRoutes] = useState([]);
  const [userdata, setUserdata] = useState({});
  const [error, setError] = useState(null);

  // Fetch Routes Data
  useEffect(() => {
    const fetchRoutesData = async () => {
      const url = "http://127.0.0.1:8000/api/user/routes/";
      const headers = {
        "Authorization": `Token ${authToken}`,
      };

      try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
          throw new Error("Failed to fetch routes data.");
        }
        const data = await response.json();
        setRoutes(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching routes data:", err);
      }
    };

    fetchRoutesData();
  }, [authToken]); // Refetch when authToken changes

  // Fetch User Profile Data
  useEffect(() => {
    const fetchUserProfileData = async () => {
      const url = "http://127.0.0.1:8000/api/user/profile/";
      const headers = {
        "Authorization": `Token ${authToken}`,
      };

      try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
          throw new Error("Failed to fetch user profile data.");
        }
        const data = await response.json();
        setUserdata(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching user profile data:", err);
      }
    };

    fetchUserProfileData();
  }, [authToken]); // Refetch when authToken changes

  // Optional: Log routes or userdata to confirm successful fetch
  useEffect(() => {
    console.log("Routes data:", routes);
  }, [routes]);

  useEffect(() => {
    console.log("User profile data:", userdata);
  }, [userdata]);

  const getCircularCoordinates = () => {
    if (!routes || routes.length === 0) return [];
    
    const coordinates = routes.map(route => [
      route.delivery_location.lat, 
      route.delivery_location.lng
    ]);
    
    // Ensure the first point is appended at the end to form a circular route
    coordinates.push(coordinates[0]);
    
    return coordinates;
  };

  // Optional: Log coordinates to verify
  useEffect(() => {
    const circularCoordinates = getCircularCoordinates();
    console.log("Circular Coordinates:", circularCoordinates);
  }, [routes]);

  // RoutesData()

  return (
    <div className='pt-28 pb-[50px] px-20 grid bg-[#f7f7f7] gap-4 grid-cols-3 grid-rows-2'>
        {/* <CarbonEmissionChart className="col-span-1"/>
        <div className='col-span-2 row-span-2'>
          <TimeBarChart />
        </div>
        <BestRouteInfo className="col-span-1"/> */}
        <Routes circularCoordinates={getCircularCoordinates()}  />
    </div>
  )
}

export default Dashboard