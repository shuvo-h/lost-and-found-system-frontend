'use client'
import { useGetAllUsersQuery } from '@/redux/api/userApi';
import React from 'react';
import UserTable from './components/UserTable';
import Loader from '@/components/shared/Loader';

const Users = () => {
    const {data: users, isLoading} = useGetAllUsersQuery(undefined)
   
    if(isLoading){
        return <Loader />
    }
    return (
        <div>
            <UserTable userList={users || []} /> 
        </div>
    );
};

export default Users;