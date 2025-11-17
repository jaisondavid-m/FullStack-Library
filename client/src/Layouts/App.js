import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHome from '../Pages/Home/AdminHome'
import UserHome from '../Pages/Home/UserHome'
import Login from '../Pages/Login/Login'
import Register from '../Pages/Register/Register'

function App() {
  return (
    <div>
       <Router>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminHome/>}/>
            <Route path="/user" element={<UserHome/>}/>
          </Routes>
        </Router>
    </div>
  )
}

export default App
