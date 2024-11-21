import React, { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { RingLoader } from 'react-spinners';

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    setLoading(true);

    axios
      .post(
        "http://localhost:8080/auth/login",
        { username: values.username, password: values.password },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          if (res.data.message) {
            localStorage.setItem("token", res.data.token);
            Swal.fire({
              title: "Đăng nhập thành công",
              icon: "success",
            });
            navigate(res.data.redirect);
          } else {
            Swal.fire({
              title: "Sai tài khoản hoặc mật khẩu",
              text: "Vui lòng thử lại",
              icon: "error",
            });
          }
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Lỗi",
          text: err.response?.data || "Có lỗi xảy ra. Vui lòng thử lại!",
          icon: "error",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ mt: 5, mb: 5 }}>
        <Box
          sx={{
            textAlign: "center",
            mb: 3,
          }}
        >
          <img src="img/logo.png" alt="Logo" style={{ width: "150px" }} />
        </Box>
        <Typography variant="h4" align="center" gutterBottom>
          Đăng nhập
        </Typography>
        <form onSubmit={onFinish}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Tài khoản"
              name="username"
              fullWidth
              required
              variant="outlined"
            />
            <TextField
              label="Mật khẩu"
              name="password"
              type="password"
              fullWidth
              required
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ py: 1.5 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Đăng nhập"}
            </Button>
          </Box>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Bạn chưa có tài khoản?{" "}
          <Link href="/register" underline="hover">
            Đăng ký ngay
          </Link>
        </Typography>
      </Container>
      
      <Footer />
    </>
  );
}

export default Login;
