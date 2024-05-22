import React from 'react';
import { Typography, TypographyProps } from '@mui/material';

type TitleProps = {
    title: string;
    size?:"extra-small" |"small" | "medium" | "large";
} & TypographyProps;

const Title = ({ title, size="small", ...props }:TitleProps) => {
    let variant: TypographyProps['variant'];

    switch (size) {
        case "extra-small":
            variant = "body1";
        case "small":
            variant = "h6";
            break;
        case "medium":
            variant = "h4";
            break;
        case "large":
            variant = "h2";
            break;
        default:
            variant = "h5";
    }

    return (
        <Typography 
            variant={variant} 
            sx={{textTransform:"capitalize",}}
            gutterBottom
            {...props}

        >
            {title}
        </Typography>
    );
};

export default Title;
