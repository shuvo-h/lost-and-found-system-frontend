import { Box, Grid, Typography, Stack } from "@mui/material";
import logo from "@/app/logo.png";
import Link from "next/link";
import Image from "next/image";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const socialMediaLinks = [
  { icon: <FacebookIcon />, url: "https://www.facebook.com/example" },
  { icon: <TwitterIcon />, url: "https://www.twitter.com/example" },
  { icon: <InstagramIcon />, url: "https://www.instagram.com/example" },
];

const footerSections = [
  {
    title: "About Lost & Found",
    links: [
      { label: "About Us", url: "/about" },
      { label: "Our Team", url: "/team" },
    ],
  },
  {
    title: "Terms & Conditions",
    links: [
      { label: "Terms of Service", url: "/terms" },
      { label: "Privacy Policy", url: "/privacy" },
    ],
  },
];

const Footer = () => {
  return (
    <footer>
      <Grid sx={{background:"#ebebeb",}} py={8} container mt={8}>
        <Grid xs={12} md={6} lg={4} item>
          <Box textAlign={"center"}>
            <Link href={"/"}>
              <Image src={logo} width={70} height={30} alt="" />
            </Link>
            <Typography>Help by finding lost items</Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
              {socialMediaLinks.map((item, index) => (
                <Link style={{textDecoration:"none"}} key={index} href={item.url} target="_blank"
                rel="noopener noreferrer">
                   <Box
                    sx={{
                      // color: theme.palette.primary.main, 
                      '&:hover': {
                        // color: theme.palette.primary.dark, 
                      },
                    }}
                  >
                    {item.icon} as
                  </Box>
                </Link>
              ))}
            </Stack>
            <Typography sx={{marginTop:"20px"}} variant="body1">lost.found@mail.com</Typography>
            <Typography variant="body1">123 Sample St, City, Country</Typography>
          </Box>
        </Grid>
        {footerSections.map((section, index) => (
          <Grid key={index} xs={12} md={6} lg={4} item>
            <Box sx={{marginTop:{sm:5, xs:5}, textAlign:"center"}} >
              <Typography variant="h6">{section.title}</Typography>
              <Stack direction="column" spacing={1}>
                {section.links.map((link, idx) => (
                  <Link style={{textDecoration:"none"}} key={idx} href={link.url}>
                    <Typography>{link.label}</Typography>
                  </Link>
                ))}
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ textAlign: "center", background:"#000",}} py={4}>
        <Typography sx={{color:"#fff" }}>&copy; 2024 Found and Lost System, Inc. All rights reserved.</Typography>
      </Box>
    </footer>
  );
};

export default Footer;
