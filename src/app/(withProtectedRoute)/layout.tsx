"use client";
import AppNavBar from '@/components/shared/appbar/AppBar';
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { isLoggedIn } from '@/services/actions/auth.service';
import Loader from '@/components/shared/Loader';

type TProps = {
    children: React.ReactNode
}


const ProtectedLayout = ({children}:TProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoggedIn()) {
            router.push('/login');
        } else {
            setLoading(false);
        }
    }, [router]);

    if (loading) {
        return <Loader />; // Or a loading spinner, skeleton, etc.
    }
    return (
        <>
            <AppNavBar />
            {children}
        </>
    );
};

export default ProtectedLayout;