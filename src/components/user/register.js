import React, { useState } from 'react';
import { TextField, Button, RadioGroup, FormControl, FormControlLabel, Radio, CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';
import Header from './header';
import Footer from './footer';
import '../../assets/css/login.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    phone: '',
    address: '',
    gender: 1,
    birthYear: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleFormChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  const handleSubmit = () => {
    setLoading(true);

    fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Đăng ký thành công',
          text: 'Bạn có thể đăng nhập ngay bây giờ!',
        });
      })
      .catch(error => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Lỗi đăng ký',
          text: 'Có lỗi xảy ra. Vui lòng thử lại!',
        });
      });
  };

  return (
    <>
      <Header />
      <section id="register" style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
        <img src="img/logo.png" alt="Logo" style={{ width: "300px" }} />
        <h4>Đăng ký tài khoản</h4>
        
        {/* Form */}
        <form onChange={handleFormChange} onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <TextField
              label="Tài khoản"
              name="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              fullWidth
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <TextField
              label="Họ và tên"
              name="fullname"
              value={formData.fullname}
              onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
              fullWidth
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <TextField
              label="Số điện thoại"
              name="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              fullWidth
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <TextField
              label="Địa chỉ"
              name="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              fullWidth
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <FormControl component="fieldset" required>
              <RadioGroup
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <FormControlLabel value={1} control={<Radio />} label="Nam" />
                <FormControlLabel value={0} control={<Radio />} label="Nữ" />
              </RadioGroup>
            </FormControl>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <TextField
              label="Năm sinh"
              name="birthYear"
              value={formData.birthYear}
              onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
              fullWidth
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <TextField
              label="Mật khẩu"
              name="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              fullWidth
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <TextField
              label="Xác nhận mật khẩu"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              fullWidth
              required
            />
          </div>

          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Đăng ký'}
            </Button>
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
};

export default Register;
