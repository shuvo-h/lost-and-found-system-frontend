'use client'
import { useGetAllUsersQuery } from '@/redux/api/userApi';
import React from 'react';
import UserTable from './components/UserTable';

const Users = () => {
    const {data: users, isLoading} = useGetAllUsersQuery(undefined)
   
    if(isLoading){
        return <>loading...</>
    }
    return (
        <div>
            Users
            <UserTable userList={users || []} /> 
        </div>
    );
};

export default Users;