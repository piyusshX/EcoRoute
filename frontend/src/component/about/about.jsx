import React, { useState } from 'react';
import { SlSocialInstagram } from "react-icons/sl";
import { SiFacebook } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
import { MdOutlineFeedback,MdOutlineContacts} from "react-icons/md";



function AboutUs () {
  const [username, setUsername] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert( `Thank you, ${username}! Your feedback has been received.`);
    setUsername('');
    setFeedback('');
  };

  return (
    
    <div className=" mt-[89px] flex flex-col items-center p-8 min-h-screen bg-gray-100" >
      <div className="max-w-3xl text-center mt-5">
        <h1 className="text-4xl font-bold text-[#18BED4] mb-4">About EcoRoute</h1>
        <p className="text-[#1F2833] text-lg mb-6">
          EcoRoute is a cutting-edge location service optimizing company that specializes in creating efficient and eco-friendly routes for last-mile delivery companies. We partner with existing delivery providers to enhance their logistics and minimize environmental impact. Our solutions help reduce fuel consumption, carbon emissions, and overall delivery time, making it easier and more sustainable for companies to reach their customers.
        </p>        
        
        <h2 className="text-2xl font-semibold text-[#18BED4] mb-4 flex justify-center items-center gap-2">Contact Us<MdOutlineContacts/></h2>
        <div className="flex justify-center space-x-4 mb-8">
          <a href="https://linkedin.com/ecoroute" target="_blank" rel="noopener noreferrer" className="flex items-center flex-col text-[#1F2833] hover:text-[#18BED4]"><CiLinkedin />
            LinkedIn
          </a>
          <a href="https://twitter.com/ecoroute" target="_blank" rel="noopener noreferrer" className="flex items-center flex-col text-[#1F2833] hover:text-[#18BED4]"><FaXTwitter/>
            Twitter
          </a>
          <a href="https://instagram.com/ecoroute" target="_blank" rel="noopener noreferrer" className="flex items-center flex-col ext-[#1F2833] hover:text-[#18BED4]"><SlSocialInstagram/>
            Instagram
          </a>
          <a href="https://facebook.com/ecoroute" target="_blank" rel="noopener noreferrer" className="flex items-center flex-col ext-[#1F2833] hover:text-[#18BED4]"><SiFacebook/>
            FaceBook
          </a>
        </div>

        <h2 className="text-2xl font-semibold text-[#18BED4] mb-4 flex justify-center items-center gap-2">Feedback<MdOutlineFeedback/></h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <label className=" block text-xl text-gray-600 font-semibold mb-2" htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#18BED4]"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <label className="block text-xl text-gray-600 font-semibold mb-2" htmlFor="feedback">Feedback:</label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#18BED4]"
              placeholder="Share your thoughts with us"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#18BED4] text-white py-2 rounded-lg hover:bg-[#15a8bc] focus:outline-none focus:ring-2 focus:ring-[#1f7580]"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default AboutUs;