
import logo from "@/app/logo.png";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Button, Container, Menu, MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import LoginRegModl from "./LoginRegModal";
import { navItems } from "./navList";
import MobileMenu from "./MobileMenu";
import NavItem from "./NavItem";

function AppNavBar() {
  

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
            {navItems.map((page) => (
              <NavItem path={page.path} name={page.name} key={page.path} />
            ))}
          </Box>

          <LoginRegModl />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AppNavBar;
