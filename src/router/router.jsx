import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Adopt from "../pages/Adopt";
import Services from "../pages/Services";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import DashboardLayout from "../layouts/Dashboard.Layout";
import Overview from "../pages/Dashboard/Overview";
import AddPet from "../pages/Dashboard/AddPet";
import MyAddedPets from "../pages/Dashboard/MyAddedPets";
import AdoptionRequest from "../pages/Dashboard/AdoptionRequest";
import MyCampaigns from "../pages/Dashboard/MyCampaigns";
import MyDonations from "../pages/Dashboard/MyDonations";
import Users from "../pages/Dashboard/Users";
import AllPets from "../pages/Dashboard/AllPets";
import AllDonations from "../pages/Dashboard/AllDonations";
import MyProfile from "../pages/Dashboard/MyProfile";
import PrivateRoute from "../routes/PrivateRoute";
import Donate from "../pages/Donate";
import PetDetails from "../pages/PetDetails";
import CreateCampaign from "../pages/Dashboard/CreateCampagin";
import DonationDetails from "../pages/DonationDetails";

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
                path:'/pet-details/:id',
                Component: PetDetails,
                loader: ({params}) => fetch(`http://localhost:3000/pets/${params.id}`)
            },
            {
                path:'/donate',
                Component: Donate
            },
            {
                path:'/donation-details/:id',
                Component: DonationDetails,
                loader: ({params}) => fetch(`http://localhost:3000/donations/${params.id}`)
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
                path: '/contact',
                Component: Contact
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
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
            },
            {
                path: 'adoption-requests',
                Component: AdoptionRequest
            },
            {
                path: 'create-campaign',
                Component: CreateCampaign
            },
            {
                path: 'my-campaigns', 
                Component: MyCampaigns
            },
            {
                path: 'my-donations',
                Component: MyDonations
            },
            {
                path: 'all-users',
                Component: Users
            },
            {
                path: 'all-pets',
                Component: AllPets
            },
            {
                path: 'all-donations',
                Component: AllDonations
            },
            {
                path: 'my-profile',
                Component: MyProfile
            }
        ]
    }
])