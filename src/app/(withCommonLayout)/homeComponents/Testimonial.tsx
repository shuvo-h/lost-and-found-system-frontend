import React from 'react';
import {  Typography, Grid, Card, CardContent, CardMedia, Avatar, Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import profileImg1 from "@/assets/home/about/ab1.jpg"
import profileImg2 from "@/assets/home/about/ab2.png"
import Image from 'next/image';
import Title from '@/components/shared/Title';
import ReportIcon from '@mui/icons-material/Report';
import DescriptionIcon from '@mui/icons-material/Description';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import UpdateIcon from '@mui/icons-material/Update';
import SearchIcon from '@mui/icons-material/Search';
import VerifiedIcon from '@mui/icons-material/Verified';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';


const testimonials = [
  {
    name: 'John Doe',
    story: 'I found my lost dog thanks to this platform! Highly recommend it.',
    image: profileImg1
  },
  {
    name: 'Jane Smith',
    story: 'I was able to return a lost wallet to its owner. Great community effort!',
    image: profileImg2
  },
];

const tips = [
    { tip: 'Immediately report any lost or found items. ', icon: <ReportIcon /> },
    { tip: 'Provide clear and detailed descriptions.', icon: <DescriptionIcon /> },
    { tip: 'Include contact information for quick resolution.', icon: <ContactMailIcon /> },
    { tip: 'Keep checking the platform for updates.', icon: <UpdateIcon /> },
    { tip: 'Search the platform regularly for any new information.', icon: <SearchIcon /> },
    { tip: 'Verify the identity of the person before returning items.', icon: <VerifiedIcon /> },
    { tip: 'Set up notifications for any updates on your report.', icon: <NotificationsActiveIcon /> },
    { tip: 'Stay in touch with community members for better coordination.', icon: <InfoIcon /> },
  ];

const Testimonial = () => {
  return (
    <Grid container spacing={2}  sx={{marginTop:{sm:4, md:8,lg:12}}} >
        <Grid item xs={12}>
            <Title sx={{marginLeft:2}} title='Testimonials' size='medium' />
        </Grid>
      <Grid container spacing={3}>
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ display: 'flex', alignItems: 'center' }}>
              <Image src={testimonial.image} width={150} height={140} alt='' />
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {testimonial.name}
                </Typography>
                <Typography variant="body1">{testimonial.story}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid item sx={{marginTop:{sm:4, md:8,lg:12}}} xs={12}>
                <Title sx={{marginLeft:2}} title='Tips' size='medium' />
            </Grid>
      <Card elevation={3} sx={{ p: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Tips for Reporting Lost or Found Items
          </Typography>
          <Grid container spacing={2}>
            {tips.map((tip, index) => (
              <Grid item xs={12} md={6} key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  {tip.icon}
                </Avatar>
                <Typography variant="body1">{tip.tip}</Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Testimonial;
