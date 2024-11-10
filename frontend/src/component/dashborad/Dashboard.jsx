import React, { useEffect, useState } from 'react';
import BestRouteInfo from './BestRouteInfo';
import CarbonEmissionChart from './CarbonEmissionChart';
import Routes from './Routes';
import TimeBarChart from './TimeBarChart';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useSelector } from 'react-redux';
import UserProfile from './UserProfile';

function Dashboard() {
  const { authToken } = useContext(AuthContext);
  const [routes, setRoutes] = useState([]);
  const [userdata, setUserdata] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // New state for loading
  const user = useSelector(store => store.auth.userData);

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
      } finally {
        setLoading(false); // Stop loading after fetching data
      }
    };

    fetchRoutesData();
  }, [authToken]);

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
  }, [authToken]);

  const getCircularCoordinates = () => {
    if (!routes || routes.length === 0) return [];
    const coordinates = routes.map(route => [
      route.delivery_location.lat,
      route.delivery_location.lng
    ]);
    coordinates.push(coordinates[0]);
    return coordinates;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(routes)
  console.log(userdata)
  const durations = routes.map(route => route?.routes?.routes[0]?.sections[0]?.summary?.duration).filter(Boolean);
  console.log(durations)

  const totalTime = routes.reduce((sum, route) => 
    sum + (route?.routes?.routes[0]?.sections[0]?.summary?.duration || 0), 0);
  
  const totalDistance = routes.reduce((sum, route) => 
    sum + (route?.routes?.routes[0]?.sections[0]?.summary?.length || 0), 0);
  
  const totalEmission = routes.reduce((sum, route) => 
    sum + (route?.co_emission || 0), 0);
  
  return (
    <div className='pt-28 pb-[50px] px-20 bg-[#f7f7f7]'>
      <div className='mb-4'>
        <h1 className='text-[#1F2833] mb-2 text-start text-xl font-bold profile-text'>Dashboard</h1>
        <div className='h-[3px] w-full bg-black rounded-xl'></div>
      </div>
      <div className='grid gap-4 grid-cols-12 grid-flow-row'>
        <div className="col-span-3">
          <UserProfile bio={userdata.bio} email={userdata.email} user={userdata.username} image={`http://127.0.0.1:8000/${userdata.profile_image}`} />
        </div>
        <div className="col-span-9 row-span-3">
          <TimeBarChart durations={durations} />
        </div>
        {routes.length > 0 && (
            <div className="col-span-3">
              <BestRouteInfo 
                emission={totalEmission} 
                time={Math.round(totalTime/60)} 
                distance={Math.round(totalDistance/1000)} 
              />
            </div>
        )}
      </div>
      <div className='grid grid-cols-12 gap-4 mt-4 grid-flow-row'>
        
        <div className='col-span-9 '>
          <Routes circularCoordinates={getCircularCoordinates()} />
        </div>
        <div className="col-span-3">
              <CarbonEmissionChart co_emission={routes[0]?.co_emission} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
