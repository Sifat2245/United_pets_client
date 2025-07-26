import React, { use } from 'react';
import { AuthContext } from '../context/AuthContext';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUserRole = () => {

    const {user, loading: authLoading} = use(AuthContext)
    const axiosSecure = useAxiosSecure()
    const{
        data: role = "user",
        isLoading: roleLoading,
        refetch
    } = useQuery({
        queryKey:['userRole', user?.email],
        queryFn: async() =>{
            const res = await axiosSecure.get(`users/${user.email}/role`);
            return res.data.role;
        }
    })
    return {role, roleLoading: authLoading || roleLoading, refetch}
};

export default useUserRole;