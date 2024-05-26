"use client";
import logo from "@/app/logo.png";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import LoginRegModl from "./LoginRegModal";
import { navItems, navProtectedItems } from "./navList";
import MobileMenu from "./MobileMenu";
import NavItem from "./NavItem";
import { isLoggedIn, removeUser } from "@/services/actions/auth.service";
import profileImg from "@/assets/home/profile/profile.jpg";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function AppNavBar() {
  const router = useRouter();
  const [isLogin,setIslogin] = useState(false);
  const isLoginStatus = isLoggedIn();
  useEffect(()=>{
    setIslogin(isLoginStatus as boolean)
  },[isLoginStatus])

  const handleLogout = () => {
    removeUser();
    setIslogin(false)
    // router.refresh(); // without reload, refresh the page
    router.push("/login")
  };
  const navAllItems = isLogin ? [...navItems,...navProtectedItems]: navItems 
  return (
    <AppBar position="sticky" sx={{ background: "white", color: "gray" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ gap: "1rem" }}>
          <Link style={{ textDecoration: "none" }} href={"/"}>
            <Image src={logo} width={70} height={30} alt="" />
          </Link>
          <MobileMenu />
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              gap: "1rem",
            }}
          >
            {navAllItems.map((page) => (
              <NavItem path={page.path} name={page.name} key={page.path} />
            ))}
          </Box>
          {isLogin ? (
            <Link href={"/profile/claims"} passHref={true}>
              <Tooltip title="Profile">
                <IconButton sx={{ p: 0 }}>
                  {/* <Avatar alt="Remy Sharp" src={profileImg} /> */}
                  <Image
                    style={{ borderRadius: "50%" }}
                    src={profileImg}
                    width={40}
                    height={40}
                    alt=""
                  />
                </IconButton>
              </Tooltip>
            </Link>
          ) : (
            <NavItem path={"/login"} name="Login" />
          )}

          
          {
            isLogin && <Button
            sx={{
              backgroundColor: "error.main",
              color: "white",
              "&:hover": {
                backgroundColor: "error.dark",
                color: "white",
              },
            }}
            onClick={handleLogout}
            variant="contained"
          >
            Logout
          </Button>
          }
          {/* <LoginRegModl /> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AppNavBar;
