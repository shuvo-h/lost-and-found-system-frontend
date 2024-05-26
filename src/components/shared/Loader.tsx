import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const Loader = () => {
    return (
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '400px', 
        }}
      >
        <CircularProgress size={80} thickness={1} /> 
      </Box>
    );
};

export default Loader;