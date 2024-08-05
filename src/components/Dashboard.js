import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography, Card, CardContent } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('https://my-json-server.typicode.com/dsrishi/orders/orders')
      .then(response => setOrders(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const serviceTypeData = [
    { name: 'Dry Cleaning', value: orders.filter(order => order.service === 'Dry Cleaning').length, color: '#3498DB' },
    { name: 'Wash Only', value: orders.filter(order => order.service === 'Wash Only').length, color: '#2ECC71' },
  ];

  const statusData = [
    { name: 'Active', value: orders.filter(order => order.status === 'Active').length, color: '#F1C40F' },
    { name: 'Delivered', value: orders.filter(order => order.status === 'Delivered').length, color: '#E74C3C' },
  ];

  const renderPieChart = (data) => (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );

  const summaryItems = [
    { label: 'Dry Cleaning', count: serviceTypeData[0].value, color: '#3498DB' },
    { label: 'Wash Only', count: serviceTypeData[1].value, color: '#2ECC71' },
    { label: 'Active', count: statusData[0].value, color: '#F1C40F' },
    { label: 'Delivered', count: statusData[1].value, color: '#E74C3C' },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        {summaryItems.map((item, index) => (
          <Grid item xs={3} key={index}>
            <Card sx={{ backgroundColor: item.color, color: 'white' }}>
              <CardContent>
                <Typography variant="h6">{item.label}</Typography>
                <Typography variant="h4">{item.count}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Service Types</Typography>
            {renderPieChart(serviceTypeData)}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Order Status</Typography>
            {renderPieChart(statusData)}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
