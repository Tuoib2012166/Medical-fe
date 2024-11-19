import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import useUserStore from '../../store/userStore';
import { AppBar, Toolbar, Button, IconButton, Box, Menu, MenuItem, Typography, Avatar } from '@mui/material';
import { ListAlt, MedicalServices, Person, ExitToApp, AccessTime, LocalHospital, AttachMoney, AccountBox } from '@mui/icons-material';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../assets/css/header.css';  // Import CSS of your choice

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [knowledgeAnchorEl, setKnowledgeAnchorEl] = useState(null);  // State for Dental Knowledge Dropdown
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
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (response.data.user.role === 'admin') {
            navigate('/admin');
          } else if (response.data.user.role === 'doctor') {
            navigate('/doctor');
          }

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

  const handleKnowledgeMenuClick = (event) => {
    setKnowledgeAnchorEl(event.currentTarget);
  };

  const handleKnowledgeMenuClose = () => {
    setKnowledgeAnchorEl(null);
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
      if (result.isConfirmed) {
        navigate('/login');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        navigate('/register');
      }
    });
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 3 }}> {/* Changed position to static */}
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo section on the left */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'inline-block' }}>
            <img src="img/logo.png" alt="Phòng Khám Nha Khoa Logo" className="logo" width="150" />
          </Link>
        </Box>

        {/* Menu section on the right */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button component={Link} to="/service" startIcon={<LocalHospital />}>Dịch vụ</Button> {/* Icon for Service */}
          <Button component={Link} to="/priceList" startIcon={<AttachMoney />}>Bảng giá</Button> {/* Icon for Price List */}
          <Button component={Link} to="/doctorList" startIcon={<AccountBox />}>Thông tin bác sĩ</Button> {/* Icon for Doctor Info */}
          <Button component={Link} to="/AppointmentForm" onClick={(e) => {
            if (!isUserLoggedIn) {
              e.preventDefault();
              showLoginPrompt();
            }
          }} startIcon={<AccessTime />}>
            Đặt lịch khám
          </Button> {/* Icon for Appointment */}

          {/* User profile icon and dropdown */}
          {isUserLoggedIn ? (
            <IconButton
              color="inherit"
              onClick={handleMenuClick}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <Avatar alt={userProfile.name} src={userProfile.avatar} />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button color="inherit" component={Link} to="/login">Đăng nhập</Button>
              <Button color="inherit" component={Link} to="/register">Đăng ký</Button>
            </Box>
          )}

          {/* Profile menu for logged-in user */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            MenuListProps={{ 'aria-labelledby': 'basic-button' }}
          >
            {isUserLoggedIn && (
              <>
                <a href="#">Xin chào, {userProfile.fullname}</a>
                <MenuItem onClick={handleMenuClose} className="menu-item">
                  <ListAlt /> <Link to="/appointments" style={{ textDecoration: 'none', color: 'black' }}>Danh sách đặt lịch</Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose} className="menu-item">
                  <AccessTime /> <Link to="/FollowUpAppointments" style={{ textDecoration: 'none', color: 'black' }}>Lịch tái khám</Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose} className="menu-item">
                  <MedicalServices /> <Link to="/MedicalRecordList" style={{ textDecoration: 'none', color: 'black' }}>Xem hồ sơ bệnh án</Link>
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
