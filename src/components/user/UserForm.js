import React, { useEffect } from 'react';
import { TextField, Button, MenuItem, Container, Box, Typography } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Header from './header';
import Footer from './footer';
import useUserStore from '../../store/userStore';
import dayjs from 'dayjs';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserForm = ({ onSubmit }) => {
  const { user } = useUserStore();

  console.log(user)
  const [formValues, setFormValues] = React.useState({
    fullname: user?.profile?.fullname,
    phone: user?.profile?.phone,
    address: user?.profile?.address,
    gender: user?.profile?.gender ? 'Nam' : 'Nữ',
    birth_year: dayjs(user?.profile?.birth_year || null) || null,
  });

  useEffect(() => {
    setFormValues({
      fullname: user?.profile?.fullname,
      phone: user?.profile?.phone,
      address: user?.profile?.address,
      gender: user?.profile?.gender ? 'Nam' : 'Nữ',
      birth_year: dayjs(user?.profile?.birth_year) || null,
    })
  }, [user])

  const handleChange = (field) => (event) => {
    setFormValues({
      ...formValues,
      [field]: event.target ? event.target.value : event,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = `http://localhost:8080/patients/${user.profile.id}`;
    const method = 'put';

    let data = {
      ...formValues,
      gender: formValues.gender == 'Nam' ? 1 : 0,
      birth_year: +formValues.birth_year
    }
    // Send the formValues as the data
    await axios({
      method,
      url,
      data, // Replace formData with formValues
    })
      .then((response) => {
        console.log('Update successful:', response.data);
        
      })
      .catch((error) => {
        console.error('Error updating user information:', error);
      });
      toast.success('Cập nhật bệnh án thành công', {
        // position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Optional: Close after 3 seconds
      });

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
              value={formValues.birth_year}
              onChange={handleChange('birth_year')}
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
