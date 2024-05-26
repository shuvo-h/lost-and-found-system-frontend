"use client";
import LFForm from "@/components/Forms/LFForm";
import LFInput from "@/components/Forms/LFInput";
import { storeUserInfo } from "@/services/actions/auth.service";
import { registerUserServerAction } from "@/services/actions/registerUser";
import { userLoginServerAction } from "@/services/actions/userLogin";
import { TRegister } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Box, Button, CircularProgress, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import PunchClockIcon from '@mui/icons-material/PunchClock';
import Link from "next/link";

const registerValidationSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Name must be a string",
      required_error: "Name is required",
    })
    .refine(
      (value) => {
        return /^[a-zA-Z ]*$/.test(value);
      },
      {
        message: "Name only characters are allowed",
      }
    ),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email"),
  username: z
    .string({
      invalid_type_error: "Username must be a string",
      required_error: "Username is required",
    })
    .refine(
      (value) => {
        return /^[a-z][a-z0-9]*$/.test(value);
      },
      {
        message: "Only lower case and number is required",
      }
    ),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Must need 6 characters"),
  confirm_password: z
    .string({ required_error: "Password is required" })
    .min(6, "Must need 6 characters"),
  profile: z.object({
    bio: z.string().optional(),
    age: z
      .string()
      .transform((value) => parseInt(value))
      .optional(),
  }),
});



const RegistrationForm = () => {
  const[isLoading,setIsLoading] = useState(false)
  const router = useRouter();

  const handleRegister = async (data: FieldValues) => {
    console.log(data);
    if (data.password !== data.confirm_password) {
      toast.error("Confirm password didn't match");
      return;
    }

    try {
      setIsLoading(true)
      const res = await registerUserServerAction(data as unknown as TRegister);
      console.log(res);
      if (res.success) {
        const userLOginfo = await userLoginServerAction({
          email_or_username: data.email,
          password: data.password,
        });

        if (userLOginfo.success) {
          toast.success(userLOginfo.message);
          storeUserInfo({ accessToken: userLOginfo.data?.accessToken });
          router.push("/dashboard/activity");
        } else {
          toast.success(userLOginfo.message);
        }
      } else {
        toast.success(res.message);
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message,{style:{background:"red"}});
    }finally{
      setIsLoading(false)
    }
  };

  const defaultValues = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    name: "",
    profile: {
      bio: "",
      age: null,
    },
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2rem",
          marginBottom: "1rem",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <PunchClockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registration
        </Typography>
      </Box>

      <LFForm
        onSubmit={handleRegister}
        resolver={zodResolver(registerValidationSchema)}
        defaultValues={defaultValues}
      >
        <Box my={1}>
          <LFInput name="name" label="Name" type="text" fullWidth={true} />
        </Box>
        <Box my={1}>
          <LFInput
            name="username"
            label="Username"
            type="text"
            fullWidth={true}
          />
        </Box>
        <Box my={1}>
          <LFInput name="email" label="Email" type="email" fullWidth={true} />
        </Box>
        <Box my={1}>
          <LFInput
            name="password"
            label="Pssword"
            type="password"
            fullWidth={true}
          />
        </Box>
        <Box my={1}>
          <LFInput
            name="confirm_password"
            label="Confirm Pssword"
            type="pasword"
            fullWidth={true}
          />
        </Box>
        <Box my={1}>
          <LFInput
            name="profile.bio"
            label="Bio Information"
            type="text"
            fullWidth={true}
          />
        </Box>
        <Box my={1}>
          <LFInput
            name="profile.age"
            label="Age"
            type="number"
            fullWidth={true}
          />
        </Box>

        <Button 
          type="submit" color="info"
          startIcon={isLoading  ? <CircularProgress size={24} /> : <></>}
          disabled={isLoading}
        >
          Register
        </Button>
        <Typography sx={{ display: "block" }} component={"p"}>
          Already have an account?{" "}
          <Link href={"/login"}>
            <Button size="small" sx={{ padding: 0 }} variant="text">
              Login
            </Button>
          </Link>
        </Typography>
      </LFForm>
    </Container>
  );
};

export default RegistrationForm;
