import AppNavBar from '@/components/shared/appbar/AppBar';
import React from 'react';

type TProps = {
    children: React.ReactNode
}


const Commonlayout = ({children}:TProps) => {
    return (
        <>
            <AppNavBar />
            {children}
        </>
    );
};

export default Commonlayout;