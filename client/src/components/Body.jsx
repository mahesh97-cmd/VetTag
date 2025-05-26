import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Features from './Features'
import HowItWorks from './HowItsWork'

const Body = () => {
  return (
    <div className='font-poppins'>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Body