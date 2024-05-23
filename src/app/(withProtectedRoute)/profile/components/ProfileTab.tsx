"use client";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const ProfileTab = () => {
  const pathname = usePathname();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
  

  useEffect(() => {
    // Set initial tab based on the pathname
    
    if (pathname) {
      if (pathname.startsWith("/profile/claims")) {
        setValue(0);
      } else if (pathname.includes("/profile/losts")) {
        setValue(1);
      } else if (pathname.includes("/profile/founds")) {
        setValue(2);
      } else {
        setValue(0); // Default to the first tab if no match
      }
    }
  }, [pathname]);
  
  
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
