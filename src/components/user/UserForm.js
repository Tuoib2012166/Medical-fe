import React, { useEffect, useState } from 'react';
import { TextField, Button, MenuItem, Container, Box, Typography } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Header from './header';
import Footer from './footer';
import dayjs from 'dayjs';

const UserForm = ({ patientId }) => {
  const [formValues, setFormValues] = useState({
    fullname: '',
    phone: '',
    address: '',
    gender: 'Nam',
    birthYear: null,
  });

  const [loading, setLoading] = useState(false);

  // Hàm tải thông tin bệnh nhân
  const loadPatientData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/getPatients/${patientId}`);
      if (response.ok) {
        const data = await response.json();
        setFormValues({
          fullname: data.fullname || '',
          phone: data.phone || '',
          address: data.address || '',
          gender: data.gender || 'Nam',
          birthYear: data.birth_year ? dayjs(`${data.birth_year}`) : null,
        });
      } else {
        alert('Không thể tải thông tin bệnh nhân');
      }
    } catch (error) {
      console.error('Error loading patient data:', error);
      alert('Đã xảy ra lỗi khi tải thông tin bệnh nhân');
    } finally {
      setLoading(false);
    }
  };

  // Gọi API load thông tin khi component được render
  useEffect(() => {
    if (patientId) {
      loadPatientData();
    }
  }, [patientId]);

  // Hàm xử lý thay đổi giá trị form
  const handleChange = (field) => (event) => {
    setFormValues({
      ...formValues,
      [field]: event.target ? event.target.value : event,
    });
  };

  // Hàm gửi dữ liệu cập nhật
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/updatePatient/${patientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname: formValues.fullname,
          phone: formValues.phone,
          address: formValues.address,
          gender: formValues.gender,
          birth_year: formValues.birthYear ? formValues.birthYear.year() : null,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
      } else {
        alert(result.message || 'Có lỗi xảy ra khi cập nhật thông tin');
      }
    } catch (error) {
      console.error('Error updating patient data:', error);
      alert('Đã xảy ra lỗi khi cập nhật thông tin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Box
          component="form"
          sx={{
            width: '100%',
            padding: 3,
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: 3,
          }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h4" mb={2}>
            {loading ? 'Đang tải...' : 'Cập nhật thông tin'}
          </Typography>
          <TextField
            label="Họ và Tên"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formValues.fullname}
            onChange={handleChange('fullname')}
            required
          />
          <TextField
            label="Số điện thoại"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formValues.phone}
            onChange={handleChange('phone')}
            required
          />
          <TextField
            label="Địa chỉ"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formValues.address}
            onChange={handleChange('address')}
            required
          />
          <TextField
            label="Giới tính"
            variant="outlined"
            fullWidth
            margin="normal"
            select
            value={formValues.gender}
            onChange={handleChange('gender')}
            required
          >
            <MenuItem value="Nam">Nam</MenuItem>
            <MenuItem value="Nữ">Nữ</MenuItem>
          </TextField>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Năm sinh"
              views={['year']}
              value={formValues.birthYear}
              onChange={handleChange('birthYear')}
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="normal" required />
              )}
            />
          </LocalizationProvider>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? 'Đang cập nhật...' : 'Cập nhật'}
          </Button>
        </Box>
      </Container>
      <Footer />
    </div>
  );
};

export default UserForm;
