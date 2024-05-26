import React from "react";
import { Container, Box, Typography, Grid, Card, CardContent, Avatar } from "@mui/material";
import Image from "next/image";
import teamMember1 from "@/assets/home/about/ab1.jpg";
import teamMember2 from "@/assets/home/about/ab2.png";
import teamMember3 from "@/assets/home/about/ab3.jpeg";


const teamMembers = [
  { name: "Daniel Marko", position: "CEO", image: teamMember1 },
  { name: "Arshi Doby", position: "CTO", image: teamMember2 },
  { name: "Willium Makro", position: "CFO", image: teamMember3 },
];

const AboutUs = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Our Mission
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Our mission is to provide a reliable platform for helping people find their lost items. We strive to create a community where everyone can feel safe and supported in their time of need.
        </Typography>
      </Box>


      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Found and Lost System
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          The &quot;Found and Lost System&quot; is a platform where individuals can help each other by reporting and finding lost items. Whether it&apos;s a misplaced phone, a lost pet, or any other valuable possession, our platform connects people to aid in the recovery process. Together, we strive to reunite lost items with their rightful owners and foster a sense of community support.
        </Typography>
      </Box>


      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Meet Our Team
        </Typography>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  <Image style={{ width: 100, height: 100, margin: "0 auto 16px" }} src={member.image} width={100} height={100} alt="" />
                  <Typography variant="h6">{member.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {member.position}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

    
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          p: 4,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Contact Us
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          If you have any questions or need assistance, feel free to reach out to us.
        </Typography>
        <Typography variant="body1">
          Address: 1234 Lost & Found Lane, Somewhere City, Country
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUs;
