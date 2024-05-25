import React from 'react';
import { Tabs, Tab } from '@mui/material';

type TypeBar =  {
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
  }

const TypeBar = ({ value, onChange }:TypeBar) => {
    return (
        <Tabs sx={{ padding: '0px' }} value={value} onChange={onChange}  aria-label="found and lost tabs">
            <Tab sx={{ padding: '0px' }} label="Found" />
            <Tab sx={{ padding: '0px' }} label="Lost" />
        </Tabs>
    );
};

export default TypeBar;