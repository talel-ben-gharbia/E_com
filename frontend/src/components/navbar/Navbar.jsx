import React from 'react'
import './Navbar.css'
import { FaSearch } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { RiAccountCircle2Line } from "react-icons/ri";
function Navbar() {
  return (
    <div className='navbar'>
      <h2>Logo</h2>
      <div className='links'>
        <a href="/">Home</a>
        <a href="/shop">Shop</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </div>
      <div className='search'>
        <FaSearch  className='search-icon'/>
        <input type="search" placeholder='Search...' className='search-bar'/>
      </div>
      <div className='actions'>
        <LuShoppingCart size={30} />
        <RiAccountCircle2Line size={30}/>
      </div>
    </div>
  )
}

export default Navbar
