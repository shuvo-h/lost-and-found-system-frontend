import Title from '@/components/shared/Title';
import { TLostItem } from '@/types/item';
import { Grid, Typography, Link, Card, CardContent, CardMedia, CardActions, Button, Box } from '@mui/material';
import Image from 'next/image';

const RecentLostItemReports = async () => {
  console.log(process.env.NEXT_PUBLIC_BACKEND_API_URL);
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/lost-items?sortBy=createdAt&sortOrder=desc`,{
        next:{revalidate:10}
    }).then(res=>res.json())

    
    
    
    return (
        <Grid container spacing={2} mt={8}>
            <Grid item xs={12}>
                <Title  title='Recent Lost Item Reports' size='medium' />
            </Grid >
            <Grid container spacing={3}>
                {
                    !!res.data?.length && res.data?.slice(0,6)?.map((item:TLostItem) => (
                        <Grid item xs={12} md={6} lg={4} key={item.id}>
                            <Card sx={{ maxWidth: 345 }}>
                                <Box textAlign={"center"} sx={{width:"100%",height:"200px"}} >
                                        <Image 
                                        style={{width:"100%"}}
                                        src={item.img || "https://react.semantic-ui.com/images/image-16by9.png"} 
                                        width={200} 
                                        height={200} alt='' 
                                        />

                                </Box>
                                <CardContent>
                                    <Title title={item.lostItemName} />
                                    <Typography variant="body2" color="text.secondary">
                                        {item.description.slice(0, 110) + '...'}
                                    </Typography>
                                    <Typography sx={{marginTop:"5px"}} variant="body2" color="text.secondary">
                                        Date: {item.lostDate?.split("T")[0]}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Location: {item.location}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Details</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </Grid>
    );
};

export default RecentLostItemReports;