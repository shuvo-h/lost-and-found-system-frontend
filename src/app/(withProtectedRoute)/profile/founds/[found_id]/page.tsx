"use client"
import { useGetFoundItemByIdQuery } from '@/redux/api/foundItemApi';
import { Container, Typography, Grid, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Divider, CardMedia, Box, IconButton } from '@mui/material';
import Image from 'next/image';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import Loader from '@/components/shared/Loader';

const FoundItemDetails = ({ params }: { params: { found_id: string } }) => {
    const { data } = useGetFoundItemByIdQuery(params.found_id);
    
    if (!data) {
        return <Loader />;
    }

    const { foundItemName, description, location, foundDate, claims, user, email, phone, status, claim_process, img } = data;

    return (
        <Container maxWidth="lg" sx={{marginBottom:"2rem"}}>
            <Typography variant="h4" gutterBottom>
                <IconButton>
                    <Link href={"/profile/founds"}>
                        <ArrowBackIcon  />
                    </Link>
                </IconButton>
                Found Item Details
            </Typography>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" gutterBottom>
                            Found Item Information
                        </Typography>
                        <Divider />
                        <Typography variant="body1">
                            <strong>Name:</strong> {foundItemName}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Description:</strong> {description}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Location:</strong> {location}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Found Date:</strong> {new Date(foundDate).toLocaleString()}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Status:</strong> {status}
                        </Typography>
                        <Box mt={4}>
                            <Typography variant="h6" gutterBottom>
                                Claim Process
                            </Typography>
                            <Divider />
                            <Typography variant="body1">
                                {claim_process || 'N/A'}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {img && (
                            <div style={{ marginTop: '20px' , }}>
                                <Typography variant="h6" gutterBottom>
                                    Found Item Image
                                </Typography>
                                <Divider />
                                {/* <CardMedia component="img" src={img} alt="Found Item" /> */}
                                <Image style={{}} src={img} width={500} height={400} alt='' />
                            </div>
                        )}
                        <Typography variant="h6" gutterBottom>
                            User Information
                        </Typography>
                        <Divider />
                        <Typography variant="body1">
                            <strong>User Name:</strong> {user.name}
                        </Typography>
                        <Typography variant="body1">
                            <strong>User Email:</strong> {user.email || 'N/A'}
                        </Typography>
                        <Typography variant="body1">
                            <strong>User Phone:</strong> {user.phone || 'N/A'}
                        </Typography>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Claims Information
                        </Typography>
                        <Divider />
                        <TableContainer component={Paper} elevation={0}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Claim Status</TableCell>
                                        <TableCell>Distinguishing Features</TableCell>
                                        <TableCell>Lost Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {claims.map((claim: any) => (
                                        <TableRow key={claim.id}>
                                            <TableCell>{claim.status}</TableCell>
                                            <TableCell>{claim.distinguishingFeatures}</TableCell>
                                            <TableCell>{new Date(claim.lostDate).toLocaleString()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default FoundItemDetails;
