"use client";

import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";

import React, { useState } from "react";

import LoginForm from "./LoginForm";
import RegistrationForm from "./RegForm";


const LoginRegModal = () => {
  const [isRegForm,setIsRegForm] = useState(true)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Login here">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem>
          {
            isRegForm 
            ? <RegistrationForm setIsRegForm={setIsRegForm} />
            : <LoginForm setIsRegForm={setIsRegForm} />
          }
          
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default LoginRegModal;
