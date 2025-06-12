import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Features from './Features'
import HowItWorks from './HowItsWork'
import Footer from './Footer'

const Body = () => {
  return (
    <div className="flex flex-col min-h-screen font-poppins">
      <Navbar />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Body