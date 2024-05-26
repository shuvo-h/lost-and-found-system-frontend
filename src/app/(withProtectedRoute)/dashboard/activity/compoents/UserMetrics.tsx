"use client"
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';
import Title from '@/components/shared/Title';

const data = {
    "count": 2,
    "totalActive": 2,
    "totalDeactive": 0
}

const COLORS = ['#0088FE', '#FF8042'];
type TProps = {
    totalActive: number
    totalDeactive: number
    count: number
}
const UserMetrics = ({totalActive=0,totalDeactive=0,count=0}:TProps) => {
    const pieData = [
        { name: 'Active Users', value: totalActive },
        { name: 'Deactive Users', value: totalDeactive }
    ];
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
            <Typography variant="h6" gutterBottom>
                User Metrics
            </Typography>
            <Typography variant="h6" gutterBottom>
            Total  <span>{count}</span> users using Lost and Found System
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart >
                    <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default UserMetrics;