'use client'
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { usePathname } from 'next/navigation';
type TProps = {
    path: string
    name: string
}
const NavItem = ({name,path}:TProps) => {
  const pathName = usePathname();

    return (
        <Typography 
                sx={{
                  textDecoration: "none",
                  color: pathName === path ? "blue":"inherit"
                }}
                href={path} 
                component={Link} 
                key={name}
                >
                {name}
              </Typography>
    );
};

export default NavItem;