import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import useUserStore from '../../store/userStore';
import { AppBar, Toolbar, Button, IconButton, Box, Menu, MenuItem, Avatar } from '@mui/material';
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
    <AppBar position="static" className="app-bar" sx={{ backgroundColor: 'white', boxShadow: 3 }}>
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
            {isUserLoggedIn && (
              <>
                <h8 className="name-hello">{userProfile.fullname}</h8>
                <MenuItem onClick={handleMenuClose} className="menu-item">
                  <ListAlt /> <Link to="/appointments" style={{ textDecoration: 'none', color: 'black' }}>Danh sách đặt lịch</Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose} className="menu-item">
                  <AccessTime /> <Link to="/FollowUpAppointments" style={{ textDecoration: 'none', color: 'black' }}>Lịch tái khám</Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose} className="menu-item">
                  <MedicalServices /> <Link to="/MedicalRecords" style={{ textDecoration: 'none', color: 'black' }}>Xem hồ sơ bệnh án</Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose} className="menu-item">
                  <Person /> <Link to="/UserForm" style={{ textDecoration: 'none', color: 'black' }}>Thông tin cá nhân</Link>
                </MenuItem>
                <MenuItem onClick={handleLogout} className="menu-item">
                  <ExitToApp /> Đăng xuất
                </MenuItem>
              </>
            )}
          </Menu>
      </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
