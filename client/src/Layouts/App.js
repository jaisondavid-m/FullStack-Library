import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHome from '../Pages/Home/AdminHome'
import UserHome from '../Pages/Home/UserHome'
import Login from '../Pages/Login/Login'
import Register from '../Pages/Register/Register'
import { ProtectedRoutes } from '../components/ProtectedRoutes';

function App() {
  
  const role = localStorage.getItem("role")

  return (
    <div>
       <Router>
          <Routes>
            <Route path="/" element={role === "admin" ? <AdminHome/> : role === "user" ? <UserHome/> : <Login/>} />
            <Route path="/register" element={<Register />} />
            {/* ProtectedRoutes */}
            <Route path="/admin" element={
              <ProtectedRoutes role="admin">
                  <AdminHome/>
              </ProtectedRoutes>
            }/>
            <Route path="/user" element={
              <ProtectedRoutes role="user">
                  <UserHome/>
              </ProtectedRoutes>
            }/>
          </Routes>
        </Router>
    </div>
  )
}

export default App
