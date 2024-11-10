import React, { useEffect, useState } from 'react'
import BestRouteInfo from './BestRouteInfo'
import CarbonEmissionChart from './CarbonEmissionChart'
import Routes from './Routes'
import TimeBarChart from './TimeBarChart'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../context/AuthContext'; // Adjust path if needed
import UserProfile from './UserProfile'

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
    // <div className='pt-28 pb-[50px] px-20 grid bg-[#f7f7f7] gap-4 grid-cols-3 grid-rows-2'>
      <div className='pt-28 pb-[50px] px-20 bg-[#f7f7f7]'>
        <div className='mb-4'>
          <h1 className='text-[#1F2833] mb-2 text-start text-xl font-bold profile-text'>Dashboard</h1>
          <div className='h-[3px] w-full bg-black rounded-xl'></div>
        </div>
        <div className='grid gap-4 grid-cols-12 grid-flow-row'>

          <div className="col-span-3">
            <UserProfile />
          </div>
          <div className="col-span-9 row-span-3">
            <TimeBarChart />
          </div>
          <div className="col-span-3">
            <BestRouteInfo />
          </div>
        </div>
        <div className='grid grid-cols-12 gap-4 mt-4  grid-flow-row'>
          <div className='col-span-9 '>
            <Routes circularCoordinates={getCircularCoordinates()} />
          </div>
          <div className='col-span-3'>
            <CarbonEmissionChart />
          </div>
        </div>
      </div>
      // <div>
      //       <Routes circularCoordinates={getCircularCoordinates()} />
      // </div>
      )
}

      export default Dashboard