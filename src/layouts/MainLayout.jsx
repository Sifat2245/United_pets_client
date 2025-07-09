import React from 'react';
import { Outlet } from 'react-router';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <div>
            <TopBar></TopBar>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>


             {/* Scroll to Top Button */}
            <button 
                className="fixed bottom-8 right-8 bg-pink-600 text-white p-3 rounded-full shadow-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition-all duration-300"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Scroll to top"
            >
                <i className="fas fa-arrow-up"></i>
            </button>
        </div>
    );
};

export default MainLayout;