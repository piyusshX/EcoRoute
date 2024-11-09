import React from 'react'
import BestRouteInfo from './BestRouteInfo'
import CarbonEmissionChart from './CarbonEmissionChart'
import Routes from './Routes'
import CarbonEmission from './CarbonEmission'

function Dashboard() {
  return (
    
    <div className='pt-28 pb-[50px] px-20 grid bg-[#f7f7f7] gap-4 grid-cols-3 grid-rows-2'>
        <BestRouteInfo className="col-span-1"/>
        <div className='col-span-2 row-span-2'>
          <Routes />
        </div>
        <CarbonEmissionChart className="col-span-1"/>
        <CarbonEmission/>
    </div>
  )
}

export default Dashboard