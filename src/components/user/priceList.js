import React, { useEffect, useState } from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import { Box, Typography, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import '../../assets/css/priceList.css';

function Pricelist() {
  const [services, setServices] = useState([]);

  // Fetch services data from the API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:8080/listServices');
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    
    fetchServices();
  }, []); // Empty dependency array means this will run once when the component mounts

  return (
    <div>
      <Header />
      <div className="container">
        <div className="main-content">
          {/* Bảng giá dịch vụ */}
          <section id="price-list">
            <Typography variant="h4" gutterBottom>Bảng Giá Dịch Vụ</Typography>
            <Paper sx={{ overflow: 'hidden' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><Typography variant="h6">DỊCH VỤ</Typography></TableCell>
                    <TableCell><Typography variant="h6">MÔ TẢ</Typography></TableCell>
                    <TableCell><Typography variant="h6">GIÁ DỊCH VỤ VNĐ (Giá chưa bao gồm Thuế GTGT)</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {services.map(service => (
                    <TableRow key={service.id}>
                      <TableCell>{service.name}</TableCell>
                      <TableCell>{service.description}</TableCell>
                      <TableCell>{service.price.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
            <Typography variant="body1" paragraph>
              Lưu ý: Bảng giá có thể thay đổi theo thời gian, vui lòng liên hệ trực tiếp với Nha Khoa Kim để biết thông tin chi tiết và chính xác nhất.
            </Typography>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Pricelist;
