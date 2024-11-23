import React from 'react';
import { TextField, Button, MenuItem, Container, Box, Typography } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Header from './header';
import Footer from './footer';

const UserForm = ({ onSubmit }) => {
  const [formValues, setFormValues] = React.useState({
    fullname: '',
    phone: '',
    address: '',
    gender: 'Nam',
    birthYear: null,
  });

  const handleChange = (field) => (event) => {
    setFormValues({
      ...formValues,
      [field]: event.target ? event.target.value : event,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formValues);
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
          Cập nhật thông tin
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
        >
          Cập nhật
        </Button>
      </Box>
    </Container>
    <Footer />
    </div>
  );
};

export default UserForm;
