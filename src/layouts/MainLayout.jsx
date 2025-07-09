import React from 'react';
import { Outlet } from 'react-router';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';

const MainLayout = () => {
    return (
        <div>
            <TopBar></TopBar>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;