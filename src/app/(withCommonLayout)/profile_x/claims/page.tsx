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
import AddClaimModal from "./components/AddClaimModal";

const ClaimPage = () => {
  const { data, isLoading } = useGetMYProfileQuery(undefined);
  const { data: claims, isLoading: isClaimLoading } = useGetClaimItemsQuery(
    { userId: data?.userId },
    { skip: isLoading }
  );

  const [openModal,setOpenModal] = useState(false);

  return (
    <Box>
        <Stack direction={"row"} justifyContent={"space-between"} spacing={2}>
            <Title title="My claim requests" />
            <Button onClick={()=>setOpenModal(true)}>Add Claim</Button>
        </Stack>
      <Grid container spacing={2}>
        {!isClaimLoading &&
          claims?.map((claim:any) => (
            <Grid item xs={12} md={6} lg={4} key={claim.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Claimed At {claim?.createdAt?.split("T")[0]}
                  </Typography>
                  <Title title={claim?.foundItem?.foundItemName} size="small" />
                  <Typography variant="body2">
                    Status {claim?.status}
                  </Typography>
                  <Typography variant="body2">
                     {claim?.foundItem?.description}
                  </Typography>
                  <Typography variant="body2">
                    Found By, {claim?.foundItem?.user?.name}
                  </Typography>
                  <Typography variant="body2">
                    Contact, {claim?.foundItem?.user?.email}
                  </Typography>
                </CardContent>
                {/* <CardActions>
                  <Button size="small">Details</Button>
                </CardActions> */}
              </Card>
            </Grid>
          ))}
      </Grid>
      <AddClaimModal open={openModal} setOpen={setOpenModal} />
    </Box>
  );
};

export default ClaimPage;
