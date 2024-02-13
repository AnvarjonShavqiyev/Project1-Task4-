import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from '../pages/auth/Auth'

const index = () => {
  return (
    <Routes>
        <Route path='/' element={<Auth/>}/>
    </Routes>
  )
}

export default index