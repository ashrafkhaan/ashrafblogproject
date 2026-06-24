import React, { useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMenu } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import axios from 'axios';
import Blogs from '../pages/Blogs';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../utils';

function Navbar() {
    const navigateTo = useNavigate();
    const [show, setShow] = useState(false);

    const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
    console.log("profile=", profile)



    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`${BACKEND_URL}/api/users/logout`, { withCredentials: true });
            toast.success("Logout Successfully");

            setIsAuthenticated(false)
            console.log("Navigating to login");
            navigateTo("/login");
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Failed to logout")
        }
    };


    console.log(Blogs)
    return (
        <nav className='bg-white shadow-md sticky top-0 z-50 px-3 md:px-6 py-4'>
            <div className="flex items-center container justify-between mx-auto">
                <div className='text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight cursor-pointer'>
                    Abhi<span className='text-blue-600'>Blog</span>
                </div>
                {/* desktop bar */}
                <div className=' mx-6'>
                    <ul className='hidden md:flex items-center gap-8 text-gray-700 font-medium text-[15px]'>
                        <Link to="/" className='hover:text-blue-600 transition duration-300'>HOME</Link>
                        <Link to="/blogs" className='hover:text-blue-600 transition duration-300'>BLOGS</Link>
                        <Link to="/creators" className='hover:text-blue-600 transition duration-300'>CREATORS</Link>
                        <Link to="/about" className='hover:text-blue-600 transition duration-300'>ABOUT</Link>
                        <Link to="/contact" className='hover:text-blue-600 transition duration-300'>CONTACT</Link>
        
                    </ul>
                    <div className='md:hidden' onClick={() => setShow(!show)}>{show ? <IoClose size={24} /> : <AiOutlineMenu size={24} />}</div>
                </div>
                <div className='flex items-center gap-2 shrink-0'>
                    {isAuthenticated && profile?.role === "admin" ? (<Link to="/dashboard"
                        className='bg-blue-600 text-white px-2 sm:px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition'
                    >
                        DASHBOARD
                    </Link>) : ("")}

                    {!isAuthenticated ? (<Link to="/login"
                        className='bg-black text-white px-5 py-2 rounded-full font-medium hover:bg-gray-800 transition'
                    >LOGIN</Link>) : (<div>

                        <button onClick={handleLogout} className='bg-red-500 text-white px-4 sm:px-5 py-2 rounded-full font-medium hover:bg-red-600 transition whitespace-nowrap'>
                            LOGOUT
                        </button>
                    </div>
                    )}
                </div>
            </div>
            {/* mobilebar */}
            {show && (
                <div className='bg-red-100 w-[70%] mx-auto rounded-2xl py-4 my-4 md:hidden'>
                    <ul className='flex space-x-6 md:hidden flex-col justify-center items-center space-y-3 text-xl  '>
                        <Link to="/" onClick={() => setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" className='hover:text-blue-500'>HOME</Link>
                        <Link to="/blogs" onClick={() => setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" className='hover:text-blue-500'>BLOGS</Link>
                        <Link to="/creators" onClick={() => setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" className='hover:text-blue-500'>CREATORS</Link>
                        <Link to="/about" onClick={() => setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" className='hover:text-blue-500'>ABOUT</Link>
                        <Link to="/contact" onClick={() => setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" className='hover:text-blue-500'>CONTACT</Link>
                    </ul>
                </div>
            )}

        </nav>
    )
}

export default Navbar
