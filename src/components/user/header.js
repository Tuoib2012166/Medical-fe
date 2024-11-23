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
          <Button component={Link} to="/service" className="header-button" startIcon={<LocalHospital />}>
            Dịch vụ
          </Button>
          <Button component={Link} to="/priceList" className="header-button" startIcon={<AttachMoney />}>
            Bảng giá
          </Button>
          <Button component={Link} to="/doctorList" className="header-button" startIcon={<AccountBox />}>
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
          >
            Đặt lịch khám
          </Button>

          {isUserLoggedIn ? (
            <IconButton onClick={handleMenuClick}>
              <Avatar alt={userProfile.name} src={userProfile.avatar} />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                component={Link}
                to="/login"
                className="header-button"
                startIcon={<Login />} // Icon cho nút Đăng nhập
              >
                Đăng nhập
              </Button>
              <Button
                component={Link}
                to="/register"
                className="header-button"
                startIcon={<PersonAdd />} // Icon cho nút Đăng ký
              >
                Đăng ký
            </Button>
      </Box>
          )}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            MenuListProps={{ 'aria-labelledby': 'basic-button' }}
          >
            {/* Kiểm tra trạng thái đăng nhập */}
        {isUserLoggedIn ? (
          <>
            <IconButton
              edge="end"
              aria-label="account menu"
              aria-controls="account-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
            >
              <Avatar alt={userProfile.fullname} src={userProfile.avatar || '/default-avatar.png'} />
            </IconButton>
            <Menu
              id="account-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              MenuListProps={{
                'aria-labelledby': 'account-menu',
              }}
            >
              {/* Lời chào và thông tin người dùng */}
              <Box display="flex" alignItems="center" padding="10px" gap="10px">
                <Avatar alt={userProfile.fullname} src={userProfile.avatar || '/default-avatar.png'} />
                <Typography variant="subtitle1" className="name-hello">
                  Xin chào, {userProfile.fullname}
                </Typography>
              </Box>
              <Divider />

              {/* Menu Item */}
              <MenuItem onClick={handleMenuClose}>
                <ListAlt color="primary" />
                <Link to="/appointments" style={{ textDecoration: 'none', color: 'black', marginLeft: '10px' }}>
                  Danh sách đặt lịch
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <AccessTime color="primary" />
                <Link to="/FollowUpAppointments" style={{ textDecoration: 'none', color: 'black', marginLeft: '10px' }}>
                  Lịch tái khám
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <MedicalServices color="primary" />
                <Link to="/MedicalRecords" style={{ textDecoration: 'none', color: 'black', marginLeft: '10px' }}>
                  Xem hồ sơ bệnh án
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Person color="primary" />
                <Link to="/UserForm" style={{ textDecoration: 'none', color: 'black', marginLeft: '10px' }}>
                  Thông tin cá nhân
                </Link>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ExitToApp color="error" />
                <Typography style={{ marginLeft: '10px', color: 'red' }}>Đăng xuất</Typography>
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit" startIcon={<Login />}>
              <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                Đăng nhập
              </Link>
            </Button>
            <Button color="inherit" startIcon={<PersonAdd />}>
              <Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
                Đăng ký
              </Link>
            </Button>
          </>
        )}
          </Menu>
      </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
