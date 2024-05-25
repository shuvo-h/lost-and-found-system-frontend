"use client";
import LFFileUploader from "@/components/Forms/LFFileUploader";
import LFForm from "@/components/Forms/LFForm";
import LFInput from "@/components/Forms/LFInput";
import LFSelectDropdown from "@/components/Forms/LFSelectDropdown";
import LFModal from "@/components/LFModal/LFModal";
import { useGetCategoryQuery } from "@/redux/api/categoryApi";
import { useGetFoundItemsQuery } from "@/redux/api/foundItemApi";
import { uploadImageToImgBB } from "@/utils/uploadImgToIMGBB";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { FieldValues, useFormState } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import CircularProgress from "@mui/material/CircularProgress";
import LFDatePicker from "@/components/Forms/LFDatePicker";
import dayjs from "dayjs";
import { useCreateClaimItemMutation } from "@/redux/api/claimApi";
import {
  changePasswordServerAction,
  changeUserInfoServerAction,
} from "@/services/actions/changePassword";
import { getFromLocalStorage } from "@/utils/localStorage";
import { AUTH_KEY } from "@/constant/authKey";
import { useGetMYProfileQuery } from "@/redux/api/myProfile";

const profileValidationSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Name must be string",
      required_error: "Name is required",
    })
    .optional(),
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
        message:
          "Username must contain only lowercase letters and numbers, and cannot start with a number",
      }
    )
    .optional(),
  email: z
    .string({
      invalid_type_error: "Email must be string",
      required_error: "Email is required",
    })
    .email({ message: "Invalid email address" })
    .optional(),

  profile: z
    .object({
      bio: z
        .string({
          invalid_type_error: "Bio must be string",
          required_error: "Bio is required",
        })
        .optional()
        .or(z.literal("")),

      age: z
        .string({
          required_error: "Age is required",
        })
        .min(0, { message: "Age can't be negative" })
        .optional(),
    })
    .optional(),
});

const EditProfileInfoPage = () => {
    const { data:userData, isLoading:isProfileLoading } = useGetMYProfileQuery(undefined);
    console.log(userData);
    
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (values: FieldValues) => {
    console.log(values);
    if (values.profile?.age) {
        values.profile.age = parseInt(values.profile.age)
    }

    try {
      setIsLoading(true);
      const accessToken = getFromLocalStorage(AUTH_KEY);
      const res = await changeUserInfoServerAction(
        accessToken as string,
        values
      );

      toast.success(res?.message || "Profile updated successful!!");
    } catch (err: any) {
      toast.success(err?.message || "Failed to update profile!!");
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const defaultValues = {
    email: userData?.user?.email||"",
    username: userData?.user?.username||"",
    name: userData?.user?.name||"",
    profile: {
      bio: userData?.bio||"",
      age: userData?.age||"",
    },
  };

  if (isProfileLoading) {
    return <>Loading...</>
  }

  return (
    <Container>
      <Paper
        sx={{
          maxWidth: 400,
          margin: "auto",
          padding: "12px",
          borderRadius: "12px",
        }}
      >
        <LFForm
          onSubmit={handleFormSubmit}
          resolver={zodResolver(profileValidationSchema)}
          defaultValues={defaultValues}
        >
          <Grid container spacing={2}>
            <Grid item md={12}>
              <Grid item md={12}>
                <LFInput
                  name="email"
                  label="Email"
                  fullWidth={true}
                  sx={{ mb: 2 }}
                  type="email"
                />
              </Grid>
              <Grid item md={12}>
                <LFInput
                  name="username"
                  label="Username"
                  fullWidth={true}
                  sx={{ mb: 2 }}
                  type="text"
                />
              </Grid>
              <Grid item md={12}>
                <LFInput
                  name="name"
                  label="Name"
                  fullWidth={true}
                  sx={{ mb: 2 }}
                  type="text"
                />
              </Grid>
              <Grid item md={12}>
                <LFInput
                  name="profile.age"
                  label="Age"
                  fullWidth={true}
                  sx={{ mb: 2 }}
                  type="text"
                />
              </Grid>
              <Grid item md={12}>
                <LFInput
                  name="profile.bio"
                  label="Bio"
                  fullWidth={true}
                  sx={{ mb: 2 }}
                  type="text"
                />
              </Grid>
            </Grid>
          </Grid>

          <Button
            sx={{ mt: 1 }}
            type="submit"
            startIcon={isLoading ? <CircularProgress size={24} /> : <></>}
            disabled={isLoading}
          >
            Change
          </Button>
        </LFForm>
      </Paper>
    </Container>
  );
};

export default EditProfileInfoPage;
