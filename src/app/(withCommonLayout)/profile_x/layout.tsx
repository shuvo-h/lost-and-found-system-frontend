import { Container } from "@mui/material";
import React from "react";
import Banner from "./components/Banner";
import ProfileTab from "./components/ProfileTab";
type TProps = {
  children: React.ReactNode;
};
const ProfileLayout = ({ children }: TProps) => {
  return (
    <Container sx={{ marginTop: "20px" }}>
      <Banner />
      <ProfileTab />
      {children}
    </Container>
  );
};

export default ProfileLayout;
