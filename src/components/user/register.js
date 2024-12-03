import React, { useState } from 'react';
import { Box, TextField, Button, RadioGroup, FormControl, FormControlLabel, Radio, Typography, CircularProgress, Link } from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from './header';
import Footer from './footer';
import '../../assets/css/login.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    phone: '',
    email: '',
    address: '',
    gender: 1,
    birthYear: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  // Hàm xử lý thay đổi của từng input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Kiểm tra mật khẩu và xác nhận mật khẩu có khớp hay không
  const validateForm = () => {
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Mật khẩu không khớp',
        text: 'Vui lòng kiểm tra lại mật khẩu.',
      });
      return false;
    }
    return true;
  };

  // Hàm gửi form
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngừng hành vi mặc định của form
    if (!validateForm()) return; // Nếu form không hợp lệ, không gửi dữ liệu

    setLoading(true);

    // Gửi dữ liệu đăng ký tới API
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
        }).then(() => {
          // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
          navigate('/login'); // Điều hướng tới trang đăng nhập
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
      <Box
      sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundImage: "url('img/sidebar/bgLogin4.jpg')", // Đường dẫn ảnh nền
      backgroundSize: "cover", // Ảnh bao phủ toàn màn hình
      backgroundPosition: "center", // Căn giữa ảnh
      backgroundRepeat: "no-repeat", // Không lặp ảnh
    }}
    >
      {/* Box bao ngoài */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '600px',
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#F0F0F0',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          marginTop: '50px', // Cách header ra
          marginBottom: '50px', // Cách footer ra
        }}
      >
        {/* Logo */}
        <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
          <img src="img/logo.png" alt="Logo" style={{ width: '200px' }} />
        </Box>

        <Typography variant="h4" align="center" gutterBottom>
          Đăng ký tài khoản
        </Typography>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <TextField
              label="Tài khoản"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <TextField
              label="Họ và tên"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <TextField
              label="Số điện thoại"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <TextField
              label="Địa chỉ"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <FormControl component="fieldset" required>
              <RadioGroup
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              <Link href="/login" underline="hover">
                Bạn đã có tài khoản?
              </Link>
            </Typography>
          </div>
        </form>
      </Box>
    </Box>
      <Footer />
    </>
  );
};

export default Register;
