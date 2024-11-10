import React from 'react'
import BestRouteInfo from './BestRouteInfo'
import CarbonEmissionChart from './CarbonEmissionChart'
import Routes from './Routes'
import TimeBarChart from './TimeBarChart'
import UserProfile from './UserProfile'

function Dashboard() {
  return (
    
    <div className='pt-28 pb-[50px] px-20 bg-[#f7f7f7]'>
      <div className='mb-4'>
            <h1 className='text-[#1F2833] mb-2 text-start text-xl font-bold profile-text'>Dashboard</h1>
            <div className='h-[3px] w-full bg-black rounded-xl'></div>
      </div>
      <div className='grid gap-4 grid-cols-12 grid-flow-row'>
          
          <div className="col-span-3">
            <UserProfile  />
          </div>
          <div className="col-span-9 row-span-2">
            <TimeBarChart/>
          </div>
          <div className="col-span-3">
            <BestRouteInfo />
          </div>
      </div>
      <div className='grid grid-cols-12 gap-4  mt-4  grid-flow-row'>
        <div className='col-span-9 '>
              <Routes/>
        </div>
        <div className='col-span-3'>
          <CarbonEmissionChart />
        </div>
      </div>
    </div>
  )
}

export default Dashboard