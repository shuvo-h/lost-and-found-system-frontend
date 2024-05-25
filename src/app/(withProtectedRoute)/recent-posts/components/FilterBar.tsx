
"use client"
import React, { Dispatch, SetStateAction, useState } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Box, Button, SelectChangeEvent } from '@mui/material';
import { useGetCategoryQuery } from '@/redux/api/categoryApi';

type FilterBar = {
    setFilters: Dispatch<SetStateAction<TFilters>>
    filters: TFilters
}

export type TFilters ={
    categoryId: string;
  location: string;
  searchTerm: string;
}

const FilterBar = ({ filters,setFilters  }:FilterBar) => {
    const {data:categories, isLoading} = useGetCategoryQuery({})

     
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>|SelectChangeEvent<string> | React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name as string]: value
    }));
  };



  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={filters.categoryId}
          name="categoryId"
          onChange={ handleChange}
          label="Category"
          size='small'
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {categories?.map((category:{id:string,name:string}) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Location"
        name="location"
        value={filters.location}
        onChange={handleChange}
        size='small'
        />
      <TextField
        size='small'
        label="Search text"
        name="searchTerm"
        value={filters.searchTerm}
        onChange={handleChange}
      />
    </Box>
  );
};

export default FilterBar;
