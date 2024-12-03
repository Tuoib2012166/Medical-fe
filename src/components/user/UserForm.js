import React, { useEffect } from 'react';
import { TextField, Button, MenuItem, Container, Box, Typography } from '@mui/material';
import Header from './header';
import Footer from './footer';
import useUserStore from '../../store/userStore';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Validation schema using Yup
const validationSchema = yup.object({
  fullname: yup
    .string()
    .matches(/^[\p{L}\s]+$/u, 'Họ và tên không hợp lệ') // Full name with Vietnamese letters, including diacritics
    .required('Họ và tên là bắt buộc'),
  phone: yup
    .string()
    .matches(/^0\d{9}$/, 'Số điện thoại không hợp lệ') // Phone starts with 0 and contains 10 digits
    .required('Số điện thoại là bắt buộc'),
  address: yup.string().required('Địa chỉ là bắt buộc'),
  gender: yup.string().required('Giới tính là bắt buộc'),
  birth_year: yup
    .number()
    .typeError('Năm sinh phải là số')
    .max(new Date().getFullYear(), 'Năm sinh không hợp lệ')
    .min(1900, 'Năm sinh không hợp lệ')
    .required('Năm sinh là bắt buộc'),
  email: yup
    .string()
    .email('Gmail không hợp lệ')
    .required('Gmail là bắt buộc'),
});

const UserForm = ({ onSubmit }) => {
  const { user } = useUserStore();
  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      fullname: user?.profile?.fullname || '',
      phone: user?.profile?.phone || '',
      address: user?.profile?.address || '',
      gender: user?.profile?.gender ? 'Nam' : 'Nữ',
      birth_year: user?.profile?.birth_year || '',
      email: user?.profile?.email || '',
    },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (user) {
      setValue('fullname', user?.profile?.fullname);
      setValue('phone', user?.profile?.phone);
      setValue('address', user?.profile?.address);
      setValue('gender', user?.profile?.gender ? 'Nam' : 'Nữ');
      setValue('birth_year', user?.profile?.birth_year);
      setValue('email', user?.profile?.email);
    }
  }, [user, setValue]);

  const onFormSubmit = async (data) => {
    const url = `http://localhost:8080/patients/${user.profile.id}`;
    const method = 'put';

    const requestData = {
      ...data,
      gender: data.gender === 'Nam' ? 1 : 0,
    };

    try {
      const response = await axios({
        method,
        url,
        data: requestData,
      });
      toast.success('Cập nhật thông tin thành công', { autoClose: 3000 });
      console.log('Update successful:', response.data);
    } catch (error) {
      console.error('Error updating user information:', error);
      toast.error('Cập nhật không thành công', { autoClose: 3000 });
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
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <Typography variant="h4" mb={2}>
            Cập nhật thông tin
          </Typography>

          <Controller
            name="fullname"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Họ và Tên"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.fullname}
                helperText={errors.fullname?.message}
                required
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Số điện thoại"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.phone}
                helperText={errors.phone?.message}
                required
              />
            )}
          />

          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Địa chỉ"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.address}
                helperText={errors.address?.message}
                required
              />
            )}
          />

          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Giới tính"
                variant="outlined"
                fullWidth
                margin="normal"
                select
                error={!!errors.gender}
                helperText={errors.gender?.message}
                required
              >
                <MenuItem value="Nam">Nam</MenuItem>
                <MenuItem value="Nữ">Nữ</MenuItem>
              </TextField>
            )}
          />

          <Controller
            name="birth_year"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Năm sinh"
                type="number"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.birth_year}
                helperText={errors.birth_year?.message}
                required
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
                required
              />
            )}
          />

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
