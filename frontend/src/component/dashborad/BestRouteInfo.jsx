import { Award, BadgeCheckIcon, CarFront, TimerIcon, MapPinnedIcon } from "lucide-react";
import React from "react";


function BestRouteInfo({ vehicle_type, distance, time}) {
  return (
    <div className="w-full px-7 py-5 bg-white rounded-2xl shadow-lg overflow-hidden">
        <div>
            <h1 className='text-[#1F2833] mb-2 text-start text-xl font-bold profile-text'>Best route info</h1>
            <div className='h-[1.5px] bg-black w-full rounded'></div>
        </div>
        <div>
        <div className="">
          {/* <ProfileHeader name="Sarah Anderson" title="Senior Product Designer" /> */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-gray-600">
                <CarFront className="w-4 h-4 mr-2 text-[#18BED4]" />
                <span>Vehicle : {vehicle_type}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPinnedIcon className="w-4 h-4 mr-2 text-[#18BED4]"/>
                <span>Distance : {distance}m</span>
              </div>
              <div className="flex items-center text-gray-600">
                <TimerIcon className="w-4 h-4 mr-2 mb- text-[#18BED4]"/>
                <span>Estimated Time : {Math.round(time/60)}mins</span>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BestRouteInfo;
