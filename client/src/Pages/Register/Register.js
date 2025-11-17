import React, { useState } from 'react'
import {api} from '../../api/axios';
import { Link,useNavigate } from 'react-router-dom';


function Register() {
    const navigate = useNavigate()
    const [userid,setUserid]=useState("")
    const [password,setPassword]=useState("")
    const [name,setName]=useState("")

    const handleRegister = async (e)=>{
        
        try {
            e.preventDefault();
            await api.post("/auth/register",{name,userid,password});
            navigate("/")
        } catch (err) {
            if (err.response && err.response.status === 400)
                alert(err.response.data.message); // Show "User already exists"
            else {
                console.error(err);
                alert("Registration failed. Try again later.");
        }
    }
    }
  return (
    <div className='flex justify-center items-center bg-purple-950 h-screen text-center'>
       <div className=' bg-purple-600 rounded-2xl h-max w-max p-10'>
        <form onSubmit={handleRegister}  className='flex flex-col gap-y-5 text-center w-max'>
            <input className='p-3 rounded-xl' type='text' value={name} placeholder='Enter Your Full Name' onChange={(e)=>setName(e.target.value)}/>
            <input className='p-3 rounded-xl' type='text' value={userid} placeholder='Set Your User ID' onChange={(e)=>setUserid(e.target.value)}/>
            <input className='p-3 rounded-xl' type='password' value={password} placeholder='Set Your Password' onChange={(e)=>setPassword(e.target.value)}/>
            <button className='bg-purple-950 text-white font-bold w-max px-4 py-2 rounded-xl mx-auto' type='submit'>Register</button>
        </form>
        <div className='mt-5 text-white flex flex-col gap-y-2'>
            <p>Already Have an account</p>
            <Link to="/"className='text-purple-950 font-bold underline'>LogIn</Link>
        </div>
       </div>
    </div>
  )
}

export default Register