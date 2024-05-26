import LFForm from "@/components/Forms/LFForm";
import { storeUserInfo } from "@/services/actions/auth.service";
import { userLoginServerAction } from "@/services/actions/userLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Box, Button, CircularProgress, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import LFInput from "../../../../components/Forms/LFInput";
import Link from "next/link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const loginValidationSchema = z.object({
  email_or_username: z.string({
    required_error: "Email or username is required",
  }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Must need 6 characters"),
});

const LoginForm = () => {
  const[isLoading,setIsLoading] = useState(false)
  const router = useRouter();
  const handleLogin = async (values: FieldValues) => {
    // console.log(values);

    try {
      setIsLoading(true)
      const res = await userLoginServerAction(values);
      if (res.success) {
        storeUserInfo({ accessToken: res.data?.accessToken });
        // router.push("/dashboard")
      }
      toast.message(res.message);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message,{style:{background:"red"}});
      
    }finally{
      setIsLoading(false)
    }
  };

  const defaultValues = {
    email_or_username: "",
    password: "",
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
      </Box>
      <LFForm
        onSubmit={handleLogin}
        resolver={zodResolver(loginValidationSchema)}
        defaultValues={defaultValues}
      >
        <Box my={2}>
          <LFInput
            name="email_or_username"
            label="Email or Username"
            type="text"
            fullWidth={true}
          />
        </Box>
        <Box my={2}>
          <LFInput
            name="password"
            label="Pssword"
            type="password"
            fullWidth={true}
          />
        </Box>

        <Button type="submit" color="info" startIcon={isLoading  ? <CircularProgress size={24} /> : <></>}
          disabled={isLoading}>
          Login
        </Button>
        <Typography sx={{ display: "block" }} component={"p"}>
          Don&apos;t have an account?{" "}
          <Link href={"/register"}>
            <Button size="small" sx={{ padding: 0 }} variant="text">
              Sign up
            </Button>
          </Link>
        </Typography>
      </LFForm>
    </Container>
  );
};

export default LoginForm;
