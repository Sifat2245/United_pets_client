import React, { use } from 'react';
import { AuthContext } from '../context/AuthContext';
import useUserRole from '../hooks/useUserRole';
import { Navigate, useLocation } from 'react-router';
import Lottie from 'lottie-react';
import loader from '../../public/loader.json'

const AdminRoute = ({children}) => {
    const {user, loading} = use(AuthContext)
    const {role, roleLoading}= useUserRole()
    const location = useLocation()


    if(loading || roleLoading){
        return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-52">
          <Lottie animationData={loader} loop={true}></Lottie>
        </div>
      </div>
    );
    }

    if(!user || role !== 'admin'){
        return <Navigate state={location.pathname} to={'/forbidden'}></Navigate>
    }

    return children
};

export default AdminRoute;