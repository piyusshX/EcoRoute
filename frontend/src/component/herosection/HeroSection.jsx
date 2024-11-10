import React from "react";
import "./herosection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Leaf, Timer, TrendingUp } from 'lucide-react';
import FetureCard from "./FetureCard";

function HeroSection({user}) {
  const navigate = useNavigate();
  return (
    <div className="bg-[#F7F7F7] py-36 px-20">
      <div className=" flex">
        <div className="max-w-[50%] text-start mt-14 mb-10">
          <h1 className="text-5xl text-[#1F2833] mt-5 main-text font-bold mb-3">
            Redefining Routes with the
            <span className="font-black text-[#18BED4]"> Environment </span>in
            Mind
          </h1>
          <div>
            <p className="text-lx text-gray-600 leading-relaxed mt-4 sub-text">
              Efficient route planning to minimize environmental impact because
              every journey should leave a lighter footprint.
            </p>
          </div>
          <div>
            <button
              className="group mt-6 flex items-center gap-2 bg-[#18BED4] text-white px-8 py-4 rounded-lg 
                text-lg font-semibold hover:bg-[#15a8bc] transition-all transform hover:translate-x-1 shadow-lg"
              onClick={() => navigate("/signup")}
            >
              Get Started
              <FontAwesomeIcon
                className="group-hover:translate-x-1 transition-transform"
                icon={faArrowRight}
                style={{ color: "#ffffff" }}
              />
            </button>
          </div>
        </div>
        <div className="max-w-[45%] overflow-hidden rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
          <img
            src="https://lumenbusiness.com.au/wp-content/uploads/2024/04/undraw_Location_search_re_ttoj-1-1.webp"
            alt=""
          />
        </div>
      </div>
      <div>
      <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">Why Choose EcoRoutes?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FetureCard 
              icon={<Leaf className="w-8 h-8 text-[#18BED4]" />}
              title="100% Eco-Friendly"
              description="Zero-emission fleet using electric vehicles and bikes for all deliveries"
            />
            <FetureCard 
              icon={<Timer className="w-8 h-8 text-[#18BED4]" />}
              title="Fast Delivery"
              description="Same-day delivery within your city, optimized routes for efficiency"
            />
            <FetureCard 
              icon={<TrendingUp className="w-8 h-8 text-[#18BED4] " />}
              title="Real-Time Tracking"
              description="Track your deliveries in real-time with our advanced GPS system"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
