"use client"
import { useGetFoundItemByIdQuery } from '@/redux/api/foundItemApi';
import { Container, Typography, Grid, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Divider, CardMedia, Box, IconButton } from '@mui/material';
import Image from 'next/image';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { useGetLostItemByIdQuery } from '@/redux/api/lostItemApi';
import Loader from '@/components/shared/Loader';

const LostItemDetails = ({ params }: { params: { lost_id: string } }) => {
    const { data } = useGetLostItemByIdQuery({id:params.lost_id });
    
    if (!data) {
        return <Loader />;
    }

    const { lostItemName, description, location, lostDate,category, user, email, phone, status, img } = data;

    return (
        <Container maxWidth="lg" sx={{marginBottom:"2rem"}}>
            <Typography variant="h4" gutterBottom>
                <IconButton>
                    <Link href={"/profile/losts"}>
                        <ArrowBackIcon  />
                    </Link>
                </IconButton>
                Lost Item Details
            </Typography>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" gutterBottom>
                            Lost Item Information
                        </Typography>
                        <Divider />
                        <Typography variant="body1">
                            <strong>Name:</strong> {lostItemName}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Description:</strong> {description}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Location:</strong> {location}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Lost Date:</strong> {new Date(lostDate).toLocaleString()}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Status:</strong> {status}
                        </Typography>
                        <Box mt={4}>
                            <Typography variant="h6" gutterBottom>
                                Contact Information
                            </Typography>
                            <Divider />
                            <Typography variant="body1">
                                <strong>Email:</strong> {email}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Phone:</strong> {phone}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {img && (
                            <div style={{ marginTop: '20px' , }}>
                                <Typography variant="h6" gutterBottom>
                                    Lost Item Image
                                </Typography>
                                <Divider />
                                <Image style={{}} src={img} width={500} height={400} alt='' />
                            </div>
                        )}
                        <Typography variant="h6" gutterBottom>
                            User Information
                        </Typography>
                        <Divider />
                        <Typography variant="body1">
                            <strong>User Name:</strong> {user?.name}
                        </Typography>
                        <Typography variant="body1">
                            <strong>User Email:</strong> {user?.email || 'N/A'}
                        </Typography>
                        <Typography variant="body1">
                            <strong>User Phone:</strong> {user?.phone || 'N/A'}
                        </Typography>
                    </Grid>
                    
                    
                </Grid>
            </Paper>
        </Container>
    );
};

export default LostItemDetails;
