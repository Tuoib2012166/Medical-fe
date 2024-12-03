import React, { useEffect, useState } from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import { Box, Typography, Table, TableHead, TableBody, TableRow, TableCell, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import '../../assets/css/priceList.css';

function Pricelist() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  // Fetch services data from the API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:8080/Services');
        setServices(response.data);
        setFilteredServices(response.data); // Hiển thị tất cả dịch vụ khi khởi tạo
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    const fetchSpecialties = async () => {
      try {
        const response = await axios.get('http://localhost:8080/specialties');
        setSpecialties(response.data);
      } catch (error) {
        console.error('Error fetching specialties:', error);
      }
    };

    fetchServices();
    fetchSpecialties();
  }, []);

  // Hàm xử lý khi chọn chuyên khoa
  const handleSpecialtyChange = (event) => {
    const selected = event.target.value;
    setSelectedSpecialty(selected);

    if (selected === '') {
      setFilteredServices(services); // Hiển thị tất cả dịch vụ khi không chọn chuyên khoa
    } else {
      const filtered = services.filter(service => service.specialty_id === selected);
      setFilteredServices(filtered); // Lọc dịch vụ theo chuyên khoa
    }
  };

  return (
    <div>
      <Header />
      <div className="container" style={{ marginTop: '2rem' }}> {/* Cách header 2rem */}
  <div className="main-content">
    {/* Lọc theo chuyên khoa */}
    <section id="filter-specialty">
      <FormControl fullWidth sx={{ mb: 4, maxWidth: 300 }}>
        <InputLabel id="specialty-select-label">Chọn dịch vụ</InputLabel>
        <Select
          labelId="specialty-select-label"
          id="specialty-select"
          value={selectedSpecialty}
          label="Chọn Chuyên Khoa"
          onChange={handleSpecialtyChange}
        >
          <MenuItem value="">Tất cả</MenuItem>
          {specialties.map((specialty) => (
            <MenuItem key={specialty.id} value={specialty.id}>
              {specialty.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </section>

    {/* Bảng giá dịch vụ */}
    <section id="price-list">
      <Typography variant="h4" sx={{ textAlign: 'center', my: 4, color: "#A52A2A"}}>Bảng Giá Dịch Vụ</Typography>
      <Paper sx={{ overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#007bff' }}> {/* Đổi màu hàng đầu tiên */}
              <TableCell><Typography variant="h7">DỊCH VỤ</Typography></TableCell>
              <TableCell><Typography variant="h7">MÔ TẢ</Typography></TableCell>
              <TableCell><Typography variant="h7">GIÁ DỊCH VỤ VNĐ (Giá chưa bao gồm Thuế GTGT)</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredServices.map((service) => (
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
        Lưu ý: Bảng giá có thể thay đổi theo thời gian, vui lòng liên hệ trực tiếp để biết thông tin chi tiết và chính xác nhất.
      </Typography>
    </section>
  </div>
</div>
      <Footer />
    </div>
  );
}

export default Pricelist;
