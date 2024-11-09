import React from 'react'
import BestRouteInfo from './BestRouteInfo'
import CarbonEmissionChart from './CarbonEmissionChart'
import Routes from './Routes'
import TimeBarChart from './TimeBarChart'

function Dashboard() {
  return (
    
    <div className='pt-28 pb-[50px] px-20 grid bg-[#f7f7f7] gap-4 grid-cols-3 grid-rows-2'>
        
        <CarbonEmissionChart className="col-span-1"/>
        <div className='col-span-2 row-span-2'>
          <TimeBarChart />
        </div>
        <BestRouteInfo className="col-span-1"/>
        <Routes/>
    </div>
  )
}

export default Dashboard