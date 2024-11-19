import React, { useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Typography, Menu, MenuItem, Box } from '@mui/material';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/userStore';
import { Refresh as RefreshIcon, Logout as LogoutIcon, Person as PersonIcon } from '@mui/icons-material';
import '../../assets/css/admin/header.css'; // Đảm bảo đường dẫn đúng

const DoctorHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const userProfile = useUserStore((state) => state.user.profile);
  const clearUser = useUserStore((state) => state.clearUser);
  const [, , removeCookie] = useCookies(['token']);
  const navigate = useNavigate();

  const handleRefresh = () => {
    window.location.reload(); // Làm mới trang
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Clear the cookie token using react-cookie
    removeCookie('token', { path: '/' });

    // Remove token from localStorage
    localStorage.removeItem('token');

    // Clear user state
    clearUser();

    // Redirect to home page
    navigate('/');
  };

  return (
    <AppBar position="sticky" className="appbar">
      <Toolbar className="toolbar">
        {/* Logo - Bên trái */}
        <Box className="logo-container">
          
          <Typography variant="h6" className="logo-text">
            Doctor Dashboard
          </Typography>
        </Box>

        {/* Các nút và thông tin người dùng - Bên phải */}
        <Box className="user-info-container">
          <IconButton color="inherit" onClick={handleRefresh} className="refresh-icon">
            <RefreshIcon />
          </IconButton>

          {userProfile ? (
            <>
              <Button
                variant="text"
                color="inherit"
                startIcon={<PersonIcon />}
                onClick={handleProfileMenuOpen}
                className="profile-button"
              >
                Hello <span className="profile-name">{userProfile.fullname}</span>
              </Button>
              <IconButton
                color="inherit"
                onClick={handleLogout}
                className="logout-icon"
              >
                <LogoutIcon />
              </IconButton>
            </>
          ) : (
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DoctorHeader;
