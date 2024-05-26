'use client';
import Title from '@/components/shared/Title';
import { useGetMYProfileQuery } from '@/redux/api/myProfile';
import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Link from 'next/link';
import ListAltIcon from '@mui/icons-material/ListAlt';
import profileImg from "@/assets/home/profile/profile.jpg"

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
                            <Image style={{width:"100%"}} src={profileImg} width={100} height={120} alt='' />
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Box sx={{position:"relative"}}>
                        <Title sx={{marginBottom:"0"}} title={`${data?.user?.name} ${data?.age ? "("+ data?.age + "y)":""}`} />
                        <Typography sx={{fontSize:"14px"}}>{data?.user?.email}</Typography>
                        <IconButton sx={{position:"absolute", top:0,right:30}} LinkComponent={Link} href='/profile/claims'>
                            <ListAltIcon />
                        </IconButton>
                        <IconButton sx={{position:"absolute", top:0,right:0}} LinkComponent={Link} href='/profile/edit/password'>
                            <ManageAccountsIcon />
                        </IconButton>
                    </Box>
                    <Typography sx={{marginTop:"12px"}}>{data?.bio?.slice(0,250)}</Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={4}>
                            <Title sx={{display:"inline"}} title={`${data?.count?.claim ||0}`} variant='h2' /> Claims
                        </Grid>
                        <Grid item xs={4}>
                            <Title sx={{display:"inline"}} title={`${data?.count?.lost ||0}`} variant='h2' /> Lost
                        </Grid>
                        <Grid item xs={4}>
                            <Title sx={{display:"inline"}} title={`${data?.count?.found ||0}`} variant='h2' /> Founds
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Banner;