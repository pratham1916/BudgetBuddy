import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Register from '../pages/Register'
import PrivateRoute from './PrivateRoute'

const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
    </Routes>
  )
}

export default Allroutes
