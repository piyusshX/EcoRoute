import React from 'react'
import './navbar.css'
import { LocateIcon } from 'lucide-react';



function Logo() {
  return (
    <div className='logo text-[#1F2833] flex'>
        Ec<LocateIcon color="#18BED4" size={33} className='mx-[1px]'/>Route
    </div>
  )
}

export default Logo