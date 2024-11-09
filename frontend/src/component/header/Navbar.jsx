import { useRef } from "react";
import React from "react";
import Logo from "./Logo";
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Navbar() {
  function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            sessionStorage.setItem("lat", latitude);
            sessionStorage.setItem("lng", longitude);
            console.log("Longitude and LAtitude is stored in the session")
          },
          (error) => {
            console.error(`Error: ${error.message}`);
          }
        )
    } else {
        messageText.innerText = "Geolocation is not supported by this browser.";
    }
  }

  // if (visitRef == 1) getLocation()
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    { name: 'Route Finder', url: "/find-route", active: true },
    { name: "About us", url: "/about", active: true },
    { name: "Sign up", url: "/signup", active: true },
    { name: "Login", url: "/login", active: true },
  ];

  // const handleLogout = async () => {
  //   try {
  //     // Make a request to the server to log out
  //     const authToken = localStorage.getItem('authToken');
  //     const response = await fetch('http://127.0.0.1:8000/api/logout/', {
  //       method: 'POST',
  //       headers: {
  //         'Authorization': `Token ${authToken}`,
  //         'Content-Type': 'application/json',
  //       },
  //     });
  
  //     // Check for a successful response
  //     if (response.ok) {
  //       // Remove the token from localStorage and reset state
  //       localStorage.removeItem('authToken');
  //       setAuthToken('');
  //       console.log('Logged out successfully');
  //     } else {
  //       console.error('Logout failed:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Error logging out:', error);
  //   }
  // }


  return (
    <header className='w-full top-0 left-0 right-0 bg-white fixed z-50  shadow-sm'>
      <nav className='flex justify-between items-center py-7 px-20'>
        <Link to={"/"} className='mr-4'>
          <Logo />
        </Link>
        <ul className='flex'>
          {navItems.map((item) => item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.url)}
                  className='nav-items bg-transparent mr-24 text-[#1F2833] hover:text-[#18BED4] transition-colors duration-200 group'
                >{item.name}
                  <div className="w-full h-[1.5px] bg-[#ffffff] cursor-pointer group-hover:bg-[#18BED4] transition-colors duration-200"></div>
                </button>
              </li>
            ) : null
            )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
