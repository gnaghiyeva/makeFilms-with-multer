import React from 'react'
import Navbarr from '../components/Navbarr'
import {Outlet} from 'react-router-dom'
const MainRoot = () => {
  return (
  <>
   <Navbarr/>
   <Outlet/>
  </>
  )
}

export default MainRoot