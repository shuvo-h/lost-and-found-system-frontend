'use client';
import Title from '@/components/shared/Title';
import { useGetMYProfileQuery } from '@/redux/api/myProfile';
import { Box, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const Banner = () => {
    const { data, isLoading } = useGetMYProfileQuery(undefined);
    
    
    if (isLoading) {
        return <></>
    }
    return (
        <Box sx={{background:"skyblue", padding:"2rem", borderRadius:"8px"}}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <Box>
                        <Box 
                            sx={{
                                display:"block",
                                margin:"auto", 
                                borderRadius:"50%", 
                                overflow:"hidden", 
                                textAlign:"center",
                                width:"120px",
                                height:"120px",
                            }}
                        >
                            <Image style={{width:"100%"}} src={"https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"} width={200} height={200} alt='' />
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Title sx={{marginBottom:"0"}} title={`${data?.user?.name} ${data?.age ? "("+ data?.age + "y)":""}`} />
                    <Typography sx={{fontSize:"14px"}}>{data?.user?.email}</Typography>
                    <Typography sx={{marginTop:"12px"}}>{data?.bio?.slice(0,250)}</Typography>
                    <Grid container spacing={4}>
                        <Grid item md={4}>
                            <Title sx={{display:"inline"}} title={`${data?.count?.claim ||0}`} variant='h2' /> Claims
                        </Grid>
                        <Grid item md={4}>
                            <Title sx={{display:"inline"}} title={`${data?.count?.lost ||0}`} variant='h2' /> Lost
                        </Grid>
                        <Grid item md={4}>
                            <Title sx={{display:"inline"}} title={`${data?.count?.found ||0}`} variant='h2' /> Founds
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Banner;