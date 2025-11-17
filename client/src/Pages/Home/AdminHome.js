import React, { useState,useEffect } from 'react'
import {api} from '../../api/axios';

function AdminHome() {
  const [books,setBooks]=useState([]);
  const [bookname,setBookname]=useState("");
  const [noofbooks,setNoofbooks]=useState("");
  const [bookprice,setBookprice]=useState("");
  const [bookid,setBookid]=useState("");

  const addBooks = async (e)=>{
    e.preventDefault();
    await api.post("/admin/addbooks", { book_name:bookname, book_price:bookprice,no_of_books:noofbooks,book_id:bookid });
    alert("Book Added Successfully!");
    setBookname("");
    setBookprice("");
    setNoofbooks("")
    showBooks();
  }
  const showBooks = async(e)=>{
    const res = await api.get("/admin/showbooks")
    setBooks(res.data)
    // console.log(res.data)
  }
  useEffect(()=>{
    showBooks();
  },[])
  const username = localStorage.getItem("username");


  return (
    <div>
       <h2 className='bg-gray-900 text-white text-center text-6xl p-5 mb-10'>Welcome Back Admin , {username}</h2>
       <div className='border bg-gray-800 rounded-3xl mb-10 border-gray-500 p-10 w-max  mx-auto'>
          <form onSubmit={addBooks} className='flex flex-col gap-y-5'>
            <input className='p-3 rounded-2xl'  type="text" value={bookname} onChange={(e)=>setBookname(e.target.value)} placeholder='Enter book Name'/>
            <input className='p-3 rounded-2xl' type="number" value={bookid} onChange={(e)=>setBookid(e.target.value)} placeholder='Enter Book ID' />
            <input className='p-3 rounded-2xl' type="number" value={bookprice} onChange={(e)=>setBookprice(e.target.value)} placeholder='Enter Book Price' />
            <input className='p-3 rounded-2xl' type="number" value={noofbooks} onChange={(e)=>setNoofbooks(e.target.value)} placeholder='Enter No of Books' />
            <button className='bg-gray-900 text-white font-bold px-2 py-1 rounded-xl' type="submit" >Add Book</button>
          </form>
                
        </div>
        <div className='min-h-screen bg-slate-600'>
          <div className='pt-10 flex gap-10 flex-wrap justify-center lg:justify-start   lg:w-[80%] md:w-[90%] mx-auto '>
            {books.map((b,i)=>(
              <div key={i} className='flex flex-col justify-between bg-white p-5 rounded-lg w-60 h-44 text-center '>
                <h2 className="text-2xl">{b.book_name}</h2>
                <h2 className="text-sm">Book id : {b.book_id}</h2>
                <p className='font-bold'>No of Books Available {b.no_of_books}</p>
                <p className='font-bold'>₹{b.book_price}</p>
              </div>
            ))}
            </div>
        </div>
    </div>
  )
}

export default AdminHome