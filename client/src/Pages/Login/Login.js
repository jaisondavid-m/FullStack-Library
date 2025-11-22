import React, { useState } from 'react'
import {api} from '../../api/axios';
import { Link,useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate()
    const [userid,setUserid]=useState("")
    const [password,setPassword]=useState("")

    const handleLogin = async (e)=>{
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", { userid, password });
            // console.log(res.data.token);
            
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("role", res.data.role);
            if (res.data.role === "admin"){
            navigate("/admin");
            }
            else {
            navigate("/user");
            }
        } catch (err) {
            if (err.response) {
            alert(err.response.data.message);
            } else {
            alert("Login failed. Try again later.");
            }
  }
    }

  return (
    <div className='flex justify-center items-center bg-purple-950 h-screen text-center'>
        <div className=' bg-purple-600 rounded-2xl h-max w-max p-10'>
          <form onSubmit={handleLogin} className='flex flex-col gap-y-5 text-center w-max'>
            <input className='p-3 rounded-xl' type='text' value={userid} placeholder='Enter Your User ID' onChange={(e)=>setUserid(e.target.value)}/>
            <input className='p-3 rounded-xl' type='password' value={password} placeholder='Enter Your Password' onChange={(e)=>setPassword(e.target.value)}/>
            <button className='bg-purple-950 text-white font-bold w-max px-4 py-2 rounded-xl mx-auto' type='submit'>Login</button>
          </form>
          <div className='mt-5 text-white flex flex-col gap-y-2'>
            <p>Did not Have an account ?</p>
            <Link to="/register" className='text-purple-950 font-bold underline'>Create an Account</Link>
          </div>
        </div>
    </div>
  )
}

export default Login