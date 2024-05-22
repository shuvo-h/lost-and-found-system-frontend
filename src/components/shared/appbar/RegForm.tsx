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

const registerValidationSchema = z.object({
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
const RegistrationForm = ({setIsRegForm}:TProps) => {
    const handleRegister = () => {};
 
    
  const defaultValues = {
    email: "",
    password: "",
  };

    return (
        <LFForm
              onSubmit={handleRegister}
              resolver={zodResolver(registerValidationSchema)}
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

              <Button type='submit' color="info">
                Register
              </Button>
              <Typography sx={{ display: "block" }} component={"p"}>
                Already have an account? <Button onClick={()=>setIsRegForm(pre=>!pre)}>Loginn</Button>
              </Typography>
            </LFForm>
    );
};

export default RegistrationForm;