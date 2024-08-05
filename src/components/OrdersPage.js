import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Select, MenuItem, Button, Box, Checkbox, Snackbar, Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';

const GreenButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(theme.palette.success.dark),
  backgroundColor: theme.palette.success.dark,
  '&:hover': {
    backgroundColor: theme.palette.success.main,
  },
}));

const HeadingCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main, // Assuming dark blue is the primary color
}));

const StatusCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.primary.main, // Assuming dark blue is the primary color
  fontWeight: 'bold',
}));

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [branch, setBranch] = useState('All');
  const [service, setService] = useState('All');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    fetch('https://my-json-server.typicode.com/dsrishi/orders/orders')
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSelectOrder = (orderId) => {
    setSelectedOrders((prevSelected) => 
      prevSelected.includes(orderId) ? 
      prevSelected.filter(id => id !== orderId) : 
      [...prevSelected, orderId]
    );
  };

  const handleMarkAsComplete = () => {
    // Here you can add the logic to mark the orders as complete
    setSelectedOrders([]);
    setSnackbarOpen(true);
  };

  const filteredOrders = orders.filter(order => 
    (branch === 'All' || order.branch === branch) &&
    (service === 'All' || order.service === service)
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            sx={{ mr: 2 }}
          >
            <MenuItem value="All">All Branches</MenuItem>
            <MenuItem value="Colombo">Colombo</MenuItem>
            <MenuItem value="Kandy">Kandy</MenuItem>
          </Select>
          <Select
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            <MenuItem value="All">All Services</MenuItem>
            <MenuItem value="Dry Cleaning">Dry Cleaning</MenuItem>
            <MenuItem value="Wash Only">Wash Only</MenuItem>
          </Select>
        </Box>
        <Button
          variant="contained"
          onClick={handleMarkAsComplete}
          disabled={selectedOrders.length === 0}
        >
          Mark as Complete ({selectedOrders.length})
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <HeadingCell />
              <HeadingCell>Order ID</HeadingCell>
              <HeadingCell>Customer</HeadingCell>
              <HeadingCell>Added By</HeadingCell>
              <HeadingCell>Reference</HeadingCell>
              <HeadingCell>Branch</HeadingCell>
              <HeadingCell>Service</HeadingCell>
              <HeadingCell>Status</HeadingCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => handleSelectOrder(order.id)}
                  />
                </TableCell>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer ? order.customer.name : 'N/A'}</TableCell>
                <TableCell>{order.addedBy ? order.addedBy.name : 'N/A'}</TableCell>
                <TableCell>{order.reference}</TableCell>
                <TableCell>{order.branch}</TableCell>
                <TableCell>{order.service}</TableCell>
                <StatusCell>
                  <GreenButton variant="contained">
                    {order.status}
                  </GreenButton>
                </StatusCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          Orders marked as complete!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default OrdersPage;
