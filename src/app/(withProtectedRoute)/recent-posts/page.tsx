'use client'

import { useGetFoundItemsQuery } from "@/redux/api/foundItemApi";
import { useState } from "react";
import FoundItems from "./components/foundItems";
import { useGetLostItemsQuery } from "@/redux/api/lostItemApi";
import TypeBar from "./components/TypeBar";
import FilterBar, { TFilters } from "./components/FilterBar";
import useDebounce from "@/redux/debounce";
import { removeNonValueProperties } from "@/utils/objectFormatter";
import LostItems from "./components/lostItems";
import { Box, Stack } from "@mui/material";

const RecentPosts = () => {
    const [tab,setTab] = useState(0);
    const [filters, setFilters] = useState<TFilters>({
        categoryId: '',
        location: '',
        searchTerm: ''
      });
    const [filtersLost, setLostFilters] = useState<TFilters>({
        categoryId: '',
        location: '',
        searchTerm: ''
      });
      const debouncedFilters = useDebounce(filters, 500); 
      const debouncedLostFilters = useDebounce(filtersLost, 500); 
      
    const [query,setQuery] = useState({sortBy:"createdAt",sortOrder:"desc"});
    const {data:foundItems,isLoading} = useGetFoundItemsQuery({...removeNonValueProperties(debouncedFilters),...query});

    // console.log(debouncedLostFilters);
    
    const {data:lostItems,isLoading:isLoadingLost} = useGetLostItemsQuery({...removeNonValueProperties(debouncedLostFilters),...query});

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
      };

    if (isLoading || isLoadingLost) {
        return <>Loading...</>
    }

    return (
        <div>
            <Stack direction={"row"} justifyContent={"space-between"} mb={2}>
                <TypeBar onChange={handleChange} value={tab} />
                <FilterBar filters={tab===0?filters:filtersLost} setFilters={tab ===0 ? setFilters:setLostFilters} />
            </Stack>
            
            {tab === 0 ? <h2>Recent Found Items</h2> : <h2>Recent Lost Items</h2>}
            {
                tab === 0 
                ? <FoundItems items={foundItems} />
                : <LostItems items={lostItems} />
            }
            
            
        </div>
    );
};

export default RecentPosts;