"use client";
import { useGetDashboardMetricsQuery } from "@/redux/api/metricApi";
import React from "react";
import UserMetrics from "./compoents/UserMetrics";
import FoundByCatagory from "./compoents/FoundByCatagory";
import { Box, Grid } from "@mui/material";
import StatusLineChart from "./compoents/StatusLineChart";
import LostByCatagory from "./compoents/LostByCatagory";

const DashboardPage = () => {
  const { data, isLoading } = useGetDashboardMetricsQuery(undefined);
  console.log(data);

  if (isLoading) {
    return <p>Loading.....</p>;
  }
  const statusData = [
    {
        name: 'found',
        pending: data?.found?.status?.pending ||0,
        approved: data?.found?.status?.approved || 0,
        rejected: data?.found?.status?.rejected || 0
      },
      {
        name: 'lost',
        pending: data?.lost?.status?.pending ||0,
        approved: data?.lost?.status?.approved || 0,
        rejected: data?.lost?.status?.rejected || 0
      },
      {
        name: 'claim',
        pending: data?.claim?.status?.pending ||0,
        approved: data?.claim?.status?.approved || 0,
        rejected: data?.claim?.status?.rejected || 0
      }
  ]
  return (
    <Box>
      DashboardPage
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StatusLineChart
            data={statusData}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <UserMetrics
            totalActive={data?.user?.totalActive}
            totalDeactive={data?.user?.totalDeactive}
            count={data?.user?.count}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FoundByCatagory
            data={data?.found?.byCategory}
            count={data?.found?.total}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <LostByCatagory
            data={data?.lost?.byCategory}
            count={data?.lost?.total}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
