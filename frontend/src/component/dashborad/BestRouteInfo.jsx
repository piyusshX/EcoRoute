import { Award, BadgeCheckIcon, CarFront, TimerIcon, MapPinnedIcon } from "lucide-react";
import React from "react";


function BestRouteInfo({ vehicle, distance, time}) {
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-[#18BED4] to-[#14a8bc]"></div>
      <div className="relative px-6 pb-6">
        {/* Profile Image ki functionality nhi pata :( */}
        <div className="absolute -top-16 left-6 bg-white rounded-full">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9356/9356230.png"
            alt="map pin png"
            className="w-32 h-32 rounded-full border-4 border-white text-black shadow-md object-cover"
          />
        </div>

        <div className="pt-20">
          {/* <ProfileHeader name="Sarah Anderson" title="Senior Product Designer" /> */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-gray-600">
              <CarFront className="w-4 h-4 mr-2 text-[#18BED4]" />
              <span>Vehicle : {vehicle}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPinnedIcon className="w-4 h-4 mr-2 text-[#18BED4]"/>
              <span>Distance : {distance}m</span>
            </div>
            <div className="flex items-center text-gray-600">
              <TimerIcon className="w-4 h-4 mr-2 text-[#18BED4]"/>
              <span>Estimated Time : {Math.round(time/60)}mins</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BestRouteInfo;
