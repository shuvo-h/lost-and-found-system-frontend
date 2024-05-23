"use client";
import Title from "@/components/shared/Title";
import { useGetClaimItemsQuery } from "@/redux/api/claimApi";
import { useGetMYProfileQuery } from "@/redux/api/myProfile";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddFoundModal from "./components/AddFoundModal";
import { useGetFoundItemsQuery } from "@/redux/api/foundItemApi";
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';

const FoundItemPage = () => {
  const { data, isLoading } = useGetMYProfileQuery(undefined);
  const { data: founds, isLoading: isFoundLoading } = useGetFoundItemsQuery(
    { userId: data?.userId },
    { skip: isLoading }
  );

  const [openModal,setOpenModal] = useState(true);

  return (
    <Box>
        <Stack direction={"row"} justifyContent={"space-between"} spacing={2} my={2}>
            <Title title="My found items" />
            <Button onClick={()=>setOpenModal(true)}>Add Found Item</Button>
        </Stack>
      <Grid container spacing={2}>
        {!isFoundLoading &&
          founds?.map((found:any) => (
            <Grid item xs={12} md={6} lg={4} key={found.id}>
              <Card variant="outlined">
                <CardContent>
                  <Box textAlign={"right"}>
                    <DeleteIcon />
                    <EditNoteIcon />
                  </Box>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    descriptin  {found?.description}
                  </Typography>
                  <Title title={found?.foundItemName} size="small" />
                  <Typography variant="body2">
                    Status {found?.status}
                  </Typography>
                  <Typography variant="body2">
                     {found?.claim_process}
                  </Typography>
                  <Typography variant="body2">
                    Found By, {found?.user?.name}
                  </Typography>
                  <Typography variant="body2">
                    Contact, {found?.user?.email}
                  </Typography>
                </CardContent>
                {/* <CardActions>
                  <Button size="small">Details</Button>
                </CardActions> */}
              </Card>
            </Grid>
          ))}
      </Grid>
      <AddFoundModal open={openModal} setOpen={setOpenModal} />
    </Box>
  );
};

export default FoundItemPage;
