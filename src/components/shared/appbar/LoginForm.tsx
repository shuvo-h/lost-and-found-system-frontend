import LFForm from "@/components/Forms/LFForm";
import { storeUserInfo } from "@/services/actions/auth.service";
import { userLoginServerAction } from "@/services/actions/userLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import LFInput from "../../Forms/LFInput";

const loginValidationSchema = z.object({
  email_or_username: z.string({
    required_error: "Email or username is required",
  }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Must need 6 characters"),
});

type TProps = {
  setIsRegForm: React.Dispatch<React.SetStateAction<boolean>>;
};
const LoginForm = ({ setIsRegForm }: TProps) => {
  const router = useRouter();
  const handleLogin = async (values: FieldValues) => {
    try {
      const res = await userLoginServerAction(values);
      // console.log(res);
      if (res.success) {
        toast.success(res.message);
        storeUserInfo({ accessToken: res.data?.accessToken });
        // router.push("/dashboard")
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const handleLogout = () => {
    // removeUser()
    // router.refresh(); // without reload, refresh the page
  };

  const defaultValues = {
    email_or_username: "",
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
          name="email_or_username"
          label="Email or Username"
          type="text"
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

      <Button onClick={handleLogout} type="submit" color="info">
        Login
      </Button>
      <Typography sx={{ display: "block" }} component={"p"}>
        Don&apos;t have an account?{" "}
        <Button
          size="small"
          sx={{ padding: 0 }}
          variant="text"
          onClick={() => setIsRegForm((pre) => !pre)}
        >
          Sign up
        </Button>
      </Typography>
    </LFForm>
  );
};

export default LoginForm;
