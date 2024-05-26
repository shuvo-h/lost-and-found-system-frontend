import Title from '@/components/shared/Title';
import { Grid, Typography } from '@mui/material';

const AboutUs = () => {
    return (
        <Grid container spacing={2}  sx={{marginTop:{sm:4, md:8,lg:12}}} >
            <Grid item xs={12}>
                <Title sx={{marginLeft:2}} title='About us' size='medium' />
            </Grid>
            <Grid container spacing={3} sx={{padding:{xs:2}}}>
                <Grid item xs={12} sm={6}>
                    <Title  title='Purpose and Mission' size='small' />
                    <Typography variant="body1" paragraph>
                        Our website is dedicated to helping people reconnect with their lost belongings. Whether you have found something valuable or lost an item, our platform provides a space for you to post and claim items, facilitating their return to their rightful owners. Our mission is to make the process of reuniting lost items with their owners as easy and efficient as possible.
                    </Typography>
                </Grid>
                <Grid item xs={12}  sm={6} >
                    <Title  title='Team Information' size='small' />
                    <Typography variant="body1" paragraph>
                        Meet the dedicated individuals behind our platform who work tirelessly to ensure its smooth operation and success. (Optional: Provide brief information about team members, their roles, and their contributions.)
                    </Typography>
                </Grid>

            </Grid>
        </Grid>
    );
};

export default AboutUs;