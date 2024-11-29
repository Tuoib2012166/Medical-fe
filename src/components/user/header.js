import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import useUserStore from '../../store/userStore';
import { AppBar, Toolbar, Button, IconButton, Box, Menu, MenuItem, Avatar, Typography, Divider } from '@mui/material';
import { ListAlt, MedicalServices, Person, ExitToApp, AccessTime, LocalHospital, AttachMoney, AccountBox, Login , PersonAdd } from '@mui/icons-material';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../assets/css/header.css';

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const isUserLoggedIn = useUserStore((state) => state.isUserLoggedIn());
  const userProfile = useUserStore((state) => state.user.profile);
  const clearUser = useUserStore((state) => state.clearUser);
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(['token']);
  const setUser = useUserStore((state) => state.setUser);
  const isFirstRender = useRef(true);
  

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const menuItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "8px 16px",
  "&:hover": {
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
  },
};

const iconStyle = {
  fontSize: "20px",
  color: "#1976d2", // Màu xanh chủ đạo cho icon
};

const linkStyle = {
  textDecoration: "none",
  color: "#333",
  fontWeight: "500",
  "&:hover": {
    color: "#1976d2", // Đổi màu khi hover
  },
};


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:8080/me', {
            headers: { Authorization: `Bearer ${token}` }
          });

          if (response.data.user.role === 'admin') navigate('/admin');
          else if (response.data.user.role === 'doctor') navigate('/doctor');

          setUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (isFirstRender.current) {
      fetchUserData();
      isFirstRender.current = false;
    }
  }, [navigate, setUser]);

  const handleLogout = () => {
    removeCookie('token', { path: '/' });
    localStorage.removeItem('token');
    clearUser();
    navigate('/');
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const showLoginPrompt = () => {
    Swal.fire({
      title: 'Bạn chưa đăng nhập',
      text: 'Bạn cần đăng nhập để đặt lịch khám. Vui lòng đăng nhập hoặc đăng ký',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đăng nhập',
      cancelButtonText: 'Đăng ký',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) navigate('/login');
      else if (result.dismiss === Swal.DismissReason.cancel) navigate('/register');
    });
  };

  return (
    <AppBar position="static" className="app-bar" sx={{ backgroundColor: '#0099FF', boxShadow: 3 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'inline-block' }}>
            <img src="img/logo.png" alt="Phòng Khám Nha Khoa Logo" className="logo" />
          </Link>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
        component={Link}
        to="/service"
        className="header-button"
        startIcon={<LocalHospital />}
        sx={{
          backgroundColor: '#1976d2', // Màu nền
          color: 'white', // Màu chữ
          '&:hover': {
            backgroundColor: '#7b1fa2', // Màu khi hover
          },
          padding: '10px 20px', // Padding để nút đẹp hơn
          borderRadius: '5px', // Bo góc nút
          textTransform: 'none', // Không viết hoa chữ
          boxShadow: 3, // Thêm hiệu ứng đổ bóng nhẹ
          transition: 'background-color 0.3s ease, transform 0.2s', // Hiệu ứng chuyển động mượt mà
          '&:active': {
            transform: 'scale(0.98)', // Hiệu ứng thu nhỏ khi click
          }
        }}
      >
        Dịch vụ
      </Button>

            <Button
              component={Link}
              to="/priceList"
              className="header-button"
              startIcon={<AttachMoney />}
              sx={{
                backgroundColor: '#1976d2', // Màu nền
                color: 'white',
                '&:hover': {
                  backgroundColor: '#7b1fa2', // Màu khi hover
                },
                padding: '10px 20px',
                borderRadius: '5px',
                textTransform: 'none',
                boxShadow: 3,
                transition: 'background-color 0.3s ease, transform 0.2s',
                '&:active': {
                  transform: 'scale(0.98)',
                }
              }}
            >
              Bảng giá
            </Button>

            <Button
              component={Link}
              to="/doctorList"
              className="header-button"
              startIcon={<AccountBox />}
              sx={{
                backgroundColor: '#1976d2',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#7b1fa2',
                },
                padding: '10px 20px',
                borderRadius: '5px',
                textTransform: 'none',
                boxShadow: 3,
                transition: 'background-color 0.3s ease, transform 0.2s',
                '&:active': {
                  transform: 'scale(0.98)',
                }
              }}
            >
              Thông tin bác sĩ
            </Button>

            <Button
              component={Link}
              to="/AppointmentForm"
              className="header-button"
              onClick={(e) => {
                if (!isUserLoggedIn) {
                  e.preventDefault();
                  showLoginPrompt();
                }
              }}
              startIcon={<AccessTime />}
              sx={{
                backgroundColor: '#1976d2',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#7b1fa2',
                },
                padding: '10px 20px',
                borderRadius: '5px',
                textTransform: 'none',
                boxShadow: 3,
                transition: 'background-color 0.3s ease, transform 0.2s',
                '&:active': {
                  transform: 'scale(0.98)',
                }
              }}
            >
              Đặt lịch khám
          </Button>
        <Box>
  {isUserLoggedIn ? (
    <IconButton onClick={handleMenuClick} sx={{ p: 0 }}>
      <Avatar
        alt={userProfile.name}
        src={userProfile.avatar || "/default-avatar.png"}
        sx={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          border: "3px solid #00bcd4", // Viền nổi bật
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "scale(1.1)", // Phóng to khi hover
            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
          },
        }}
      />
    </IconButton>
  ) : (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Button
        component={Link}
        to="/login"
        variant="contained"
        startIcon={<Login />}
        sx={{
          bgcolor: "#00bcd4",
          color: "#fff",
          padding: "10px 20px",
          fontWeight: "bold",
          borderRadius: "50px",
          "&:hover": {
            bgcolor: "#0097a7",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        Đăng nhập
      </Button>
      <Button
        component={Link}
        to="/register"
        variant="outlined"
        startIcon={<PersonAdd />}
        sx={{
          borderColor: "#00bcd4",
          bgcolor: "#00bcd4",
          color: "#fff",
          padding: "10px 20px",
          fontWeight: "bold",
          borderRadius: "50px",
          "&:hover": {
            borderColor: "#0097a7",
            color: "#0097a7",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        Đăng ký
      </Button>
    </Box>
  )}

  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleMenuClose}
    MenuListProps={{ "aria-labelledby": "basic-button" }}
    sx={{
      mt: 2,
      borderRadius: "8px",
      boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
    }}
  >
    {isUserLoggedIn && (
      <>
        <Box
          display="flex"
          alignItems="center"
          padding="16px"
          gap="12px"
          bgcolor="#f2f2f2"
          sx={{
            borderBottom: "1px solid #e0e0e0",
            borderRadius: "8px",
          }}
        >
          <Avatar
            alt={userProfile.fullname}
            src={userProfile.avatar || "/default-avatar.png"}
            sx={{ width: 50, height: 50, borderRadius: "50%" }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#00bcd4",
              textTransform: "capitalize",
            }}
          >
            Xin chào, {userProfile.fullname}
          </Typography>
        </Box>
        <Divider />

        {/* Các menu item */}
        <MenuItem onClick={handleMenuClose} sx={menuItemStyle}>
          <ListAlt sx={iconStyle} />
          <Link to="/appointments" style={linkStyle}>
            Danh sách đặt lịch
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={menuItemStyle}>
          <AccessTime sx={iconStyle} />
          <Link to="/FollowUpAppointments" style={linkStyle}>
            Lịch tái khám
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={menuItemStyle}>
          <MedicalServices sx={iconStyle} />
          <Link to="/MedicalRecords" style={linkStyle}>
            Xem hồ sơ bệnh án
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={menuItemStyle}>
          <Person sx={iconStyle} />
          <Link to="/UserForm" style={linkStyle}>
            Thông tin cá nhân
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ ...menuItemStyle, color: "#f44336" }}>
          <ExitToApp sx={{ color: "#f44336", fontSize: "20px" }} />
          <Typography sx={{ marginLeft: "10px", fontWeight: "bold" }}>
            Đăng xuất
          </Typography>
        </MenuItem>
      </>
    )}
  </Menu>
</Box>

      </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
