import React from "react";
import Spline from "@splinetool/react-spline";
import "./herosection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom'


function HeroSection() {
  const navigate = useNavigate()
  return (
    <div className="bg-[#F7F7F7] py-36 px-20 flex">
      <div className="max-w-[50%] text-start mt-14 mb-10">
        <h1 className="text-5xl text-[#1F2833] main-text font-bold mb-3">
            Redefining Routes with the
          <span className="font-black text-[#18BED4]"> Environment </span>in Mind
        </h1>
        <div>
          <p className="text-lx text-gray-600 leading-relaxed sub-text">
            Efficient route planning to minimize environmental impact because 
            every journey should leave a lighter footprint.
          </p>
        </div>
        <div>
          <button className="group mt-4 flex items-center gap-2 bg-[#18BED4] text-white px-8 py-4 rounded-lg 
              text-lg font-semibold hover:bg-[#15a8bc] transition-all transform hover:translate-x-1 shadow-lg"
              onClick={() => navigate("/signup")}>
            Get Started
            <FontAwesomeIcon className="group-hover:translate-x-1 transition-transform" icon={faArrowRight} style={{color: "#ffffff",}} />
          </button>
        </div>
      </div>
      <div className="max-w-[50%] overflow-hidden rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
        <img src="https://lumenbusiness.com.au/wp-content/uploads/2024/04/undraw_Location_search_re_ttoj-1-1.webp" alt="" />
      </div>
    </div>
  );
}

export default HeroSection;