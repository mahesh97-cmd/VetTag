import React from 'react'
import Dashboard from './components/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './components/Body'
import Home from './components/Home'
import Features from './components/Features'
import HowItWorks from './components/HowItsWork'

const App = () => {
  return (
    <BrowserRouter basename='/'>
    <Routes>
      <Route path="/" element={<Body/>}>
      <Route index element={<Home/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route Path="/features" element={<Features/>}/>
      <Route Path="/howItsWork" element={<HowItWorks/>}/>

      </Route>
            

    </Routes>
    </BrowserRouter>
  )
}

export default App