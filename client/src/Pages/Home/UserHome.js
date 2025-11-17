import React, { useEffect, useState } from 'react'
import { api } from '../../api/axios';
import { CiShoppingCart } from "react-icons/ci";

function UserHome() {
  const [books,setBooks]=useState([]);
  const [cart,setCart]=useState([])
  const showBooks = async()=>{
    const res = await api.get("/user/showbooks")
    setBooks(res.data)
  }
  useEffect(()=>{
    showBooks();
  },[])
  const username = localStorage.getItem("username");
  const addTocart = async(bookId)=>{
      try {
        const userid = localStorage.getItem("userid");
      if (!userid) {
        alert("You're not logged in!");
        return;
      }

      const res = await api.post("/user/addtocart", { userid, book_id: bookId });
      alert(res.data.message);
    } catch(err) {
      console.log(err);
      alert("Failed to add book to cart");
    }
  }

  
  return (
    <div className='min-h-screen bg-slate-600'>
      <h2 className='bg-gray-900 text-white text-center text-6xl p-5 mb-10'>Welcome Back {username}</h2>
      <div className='flex justify-center items-center bg-white w-max mx-auto px-4 py-2 cursor-pointer rounded-lg mb-5'>
        <CiShoppingCart /><p>View Cart</p>
      </div>
      <div className='flex gap-10 flex-wrap justify-center'>
        {books.map((b,i)=>(
            <div key={i} className='flex flex-col justify-between bg-white p-5 rounded-lg w-96 h-56 text-center '>
                <h2 className="text-2xl">{b.book_name}</h2>
                <h2 className="text-sm">Book ID : {b.book_id}</h2>
                <div className='flex flex-col gap-y-5'>
                  <p className='font-bold'>₹{b.book_price}</p>
                  <button className='bg-gray-900 w-max mx-auto text-white font-bold px-2 py-1 rounded-xl'>Buy Now</button>
                  <button onClick={() => addTocart(b.book_id)} className='bg-yellow-400 w-max mx-auto text-white font-bold px-2 py-1 rounded-xl'>Add to Cart</button>
                </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default UserHome