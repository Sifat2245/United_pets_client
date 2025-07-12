import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Adopt from "../pages/Adopt";
import Services from "../pages/Services";
import About from "../pages/About";
import Gallery from "../pages/Gallery";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import DashboardLayout from "../layouts/Dashboard.Layout";
import Overview from "../pages/Dashboard/Overview";
import AddPet from "../pages/Dashboard/AddPet";
import MyAddedPets from "../pages/Dashboard/MyAddedPets";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children:[
            {
                index: true,
                Component: Home
            },
            {
                path:'/adopt',
                Component: Adopt
            },
            {
                path:'/services',
                Component: Services
            },
            {
                path:'/about',
                Component: About
            }, 
            {  
                path:'/gallery',
                Component: Gallery
            },
            {
                path: '/contact',
                Component: Contact
            }
        ]
    },
    {
        path: '/dashboard',
        Component: DashboardLayout,
        children: [
            {
                index: true,
                Component: Overview
            },
            {
                path: 'add-pet',
                Component: AddPet
            },
            {
                path: 'my-pets',
                Component: MyAddedPets
            }
        ]
    }
])