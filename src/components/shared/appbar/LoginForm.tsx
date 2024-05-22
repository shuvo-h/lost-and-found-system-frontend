import LFForm from '@/components/Forms/PHForm';
import React from 'react';
import { z } from "zod";
import LFInput from "../../Forms/LFInput";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Box,
    Button,
    Typography,
  } from "@mui/material";

const loginValidationSchema = z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email"),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Must need 6 characters"),
  });
  
type TProps = {
    setIsRegForm: React.Dispatch<React.SetStateAction<boolean>>
}
const LoginForm = ({setIsRegForm}:TProps) => {
    const handleLogin = () => {};
  const handleLogout = () => {
    // removeUser()
    // router.refresh(); // without reload, refresh the page
  };

  const defaultValues = {
    email: "",
    password: "",
  };

  
    return (
        <LFForm
              onSubmit={handleLogin}
              resolver={zodResolver(loginValidationSchema)}
              defaultValues={defaultValues}
            >
              <Box my={1}>
                <LFInput
                  name="email"
                  label="Email"
                  type="email"
                  fullWidth={false}
                />
              </Box>
              <Box my={1}>
                <LFInput
                  name="password"
                  label="Pssword"
                  type="password"
                  fullWidth={false}
                />
              </Box>

              <Button onClick={handleLogout} color="info">
                Login
              </Button>
              <Typography sx={{ display: "block" }} component={"p"}>
                Don&apos;t have an account? <Button onClick={()=>setIsRegForm(pre=>!pre)}>Sigi nup</Button>
              </Typography>
            </LFForm>
    );
};

export default LoginForm;