import React, { useState } from 'react';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';
import Header from './header';
import Footer from './footer';

const ForgotResetPassword = () => {
  const [step, setStep] = useState(1); // Step 1: Nhập email, Step 2: Nhập OTP và mật khẩu mới
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendOTP = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'OTP đã được gửi',
          text: 'Kiểm tra email của bạn để lấy OTP.',
        });
        setStep(2); // Chuyển sang bước 2
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Có lỗi xảy ra. Vui lòng thử lại.',
      });
    }
    setLoading(false);
  };

  const handleResetPassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Mật khẩu không khớp',
        text: 'Vui lòng kiểm tra lại mật khẩu.',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Mật khẩu đã được thay đổi',
          text: 'Bạn có thể đăng nhập ngay bây giờ!',
        }).then(() => {
          window.location.href = '/login';
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Có lỗi xảy ra. Vui lòng thử lại.',
      });
    }
    setLoading(false);
  };

  return (
    <div>
        <Header />
    <div style={{ maxWidth: 400, margin: 'auto', border: "1px solid #ddd", borderRadius: "8px", padding: 20, marginTop: '50px', marginBottom: '50px' }}>
      {step === 1 && (
        <form onSubmit={(e) => { e.preventDefault(); handleSendOTP(); }}>
          <Typography variant="h4" align="center" gutterBottom>
          Quên mật khẩu
        </Typography>
          <TextField
            label="Email"
            name="email"
            fullWidth
            value={formData.email}
            onChange={handleInputChange}
            required
            style={{ marginBottom: '20px' }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Gửi OTP'}
          </Button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={(e) => { e.preventDefault(); handleResetPassword(); }}>
          <Typography variant="h4" align="center" gutterBottom>
          Đặt lại mật khẩu
        </Typography>
          <TextField
            label="Email"
            name="email"
            fullWidth
            value={formData.email}
            onChange={handleInputChange}
            disabled
            style={{ marginBottom: '20px' }}
          />
          <TextField
            label="OTP"
            name="otp"
            fullWidth
            value={formData.otp}
            onChange={handleInputChange}
            required
            style={{ marginBottom: '20px' }}
          />
          <TextField
            label="Mật khẩu mới"
            name="newPassword"
            type="password"
            fullWidth
            value={formData.newPassword}
            onChange={handleInputChange}
            required
            style={{ marginBottom: '20px' }}
          />
          <TextField
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            type="password"
            fullWidth
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            style={{ marginBottom: '20px' }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Đặt lại mật khẩu'}
          </Button>
        </form>
      )}
    </div>
    <Footer/>
    </div>
  );
};

export default ForgotResetPassword;
