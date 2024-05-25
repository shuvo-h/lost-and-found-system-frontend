"use client";
import { Box, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

type TProps = {
  data: { name: string; pending: number; approved: number; rejected: number }[];
};
const StatusLineChart = ({ data }: TProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Status Compare
      </Typography>
      <Typography variant="h6" gutterBottom>
        Status on different types of items
      </Typography>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pending"
          name="Pending"
          stroke="#8884d8"
        />
        <Line
          type="monotone"
          dataKey="approved"
          name="Approved"
          stroke="#82ca9d"
        />
        <Line
          type="monotone"
          dataKey="rejected"
          name="Rejected"
          stroke="#ffc658"
        />
      </LineChart>
    </Box>
  );
};

export default StatusLineChart;
