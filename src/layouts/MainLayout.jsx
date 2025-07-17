import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaArrowUp } from 'react-icons/fa';
import Newsletter from '../components/Newsletter';

const MainLayout = () => {
    const [showButton, setShowButton] = useState(false)

    useEffect(() =>{
        const handleScroll = () =>{
            setShowButton(window.scrollY > 200)
        };

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    
    const scrollTop = () =>{
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    return (
        <div>
            <TopBar></TopBar>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Newsletter></Newsletter>
            <Footer></Footer>


             {/* Scroll to Top Button */}
             {showButton && (
               <button
                className={`fixed bottom-8 right-8 bg-pink-600 text-white p-3 rounded-full shadow-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50  z-50 ${
                    showButton ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onClick={scrollTop}
                aria-label="Scroll to top"
            >
                <FaArrowUp className="text-xl" />
            </button>
            )}
        </div>
    );
};

export default MainLayout;