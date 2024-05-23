"use client";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import Link from "next/link";

const ProfileTab = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
  
  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab  label={<Link style={{textDecoration:"none"}} href="/profile/claims">Claim Items</Link>} />
        <Tab  label={<Link style={{textDecoration:"none"}} href="/profile/losts">Lost Items</Link>} />
        <Tab  label={<Link style={{textDecoration:"none"}} href="/profile/founds">Found Items</Link>} />

        {/* <Tab href="/profile/claims" label="Claim Items" />
        <Tab href="/profile/losts" label="Lost Items" />
        <Tab href="/profile/founds" label="Found Items" /> */}
      </Tabs>
    </Box>
  );
};

export default ProfileTab;
