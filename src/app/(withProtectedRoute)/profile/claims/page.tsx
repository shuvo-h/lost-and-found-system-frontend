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
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddClaimModal from "./components/AddClaimModal";
import Link from "next/link";

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
                  <Stack direction={"row"} justifyContent={"space-between"} textAlign={"right"}>
                    <Chip
                      label={claim?.status}
                      color={claim?.status === 'PENDING' ? 'primary' : claim?.status === 'APPROVED' ? 'success' : 'error'}
                    />
                  </Stack>
                  <Title title={claim?.foundItem?.foundItemName} size="small" />
                  <Typography
                    sx={{ fontSize: 14, }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {claim?.distinguishingFeatures?.slice(0,200)}
                  </Typography>
                  {/* <Typography variant="body2">
                     {lost?.claim_process}
                  </Typography> */}
                  <Typography variant="body2">
                    Found By, <span style={{fontStyle:"italic"}}>{claim?.foundItem?.user?.name}, Email: {claim?.foundItem?.user?.email}</span>
                  </Typography>
                </CardContent>
                {/* <CardActions>
                  <Link href={`/profile/claims/${claim.id}`}>
                    <Button size="small" >Details</Button>
                  </Link>
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
