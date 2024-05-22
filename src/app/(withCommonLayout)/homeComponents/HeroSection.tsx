import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import bannerImg from "@/assets/home/hero_section/banner1.jpg"
import Image from 'next/image';


const HeroSection = () => {
    return (
        <Container>
            <Grid container spacing={2} my={4}>
                <Grid item xs={12} md={6}>
                    <Box>
                        <Typography variant="h2" component="h1" gutterBottom>
                            Lost and Found Made Easy
                        </Typography>
                        <Typography variant="h5" component="p" gutterBottom>
                            Found or lost something valuable? Post here to help return it.
                        </Typography>
                        <Stack direction={"row"} spacing={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                            >
                                Post a Found Item
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                            >
                                Claim a Item
                            </Button>

                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box position={"relative"} width={'100%'} height={'100%'}>
                        <Image 
                            src={bannerImg}
                            alt=''
                            // width={500}
                            // height={400}
                            fill={true}
                        />

                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HeroSection;