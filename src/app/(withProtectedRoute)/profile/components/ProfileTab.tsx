"use client";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ProfileTab = () => {
  const pathname = usePathname();
  const [value, setValue] = useState<number | null>(null);
  console.log(pathname);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    
    if (pathname) {
      if (pathname.startsWith("/profile/claims")) {
        setValue(0);
      } else if (pathname.startsWith("/profile/losts")) {
        setValue(1);
      } else if (pathname.startsWith("/profile/founds")) {
        setValue(2);
      } else if (pathname.startsWith("/profile/edit/profile")) {
        setValue(0); 
      } else if (pathname.startsWith("/profile/edit/password")) {
        setValue(1); 
      } else {
        setValue(999); 
      }
    }
  }, [pathname]);

  
  const mainTabs = [
    { label: "Claim Items", href: "/profile/claims" },
    { label: "Lost Items", href: "/profile/losts" },
    { label: "Found Items", href: "/profile/founds" }
  ];

  const editTabs = [
    { label: "Profile", href: "/profile/edit/profile" },
    { label: "Password", href: "/profile/edit/password" }
  ];

  const tabsToShow = pathname.startsWith("/profile/edit") ? editTabs : mainTabs;

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange} centered>
        {tabsToShow.map((tab, index) => (
          <Tab
            key={index}
            label={<Link style={{ textDecoration: "none" }} href={tab.href}>{tab.label}</Link>}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default ProfileTab;
