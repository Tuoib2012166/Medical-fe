import React, { useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Typography, Box, Menu, MenuItem } from '@mui/material';
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
    window.location.reload();
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    removeCookie('token', { path: '/' });
    localStorage.removeItem('token');
    clearUser();
    navigate('/');
  };

  return (
    <AppBar position="sticky" className="appbar" sx={{ boxShadow: 6 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 30px' }}>
        {/* Logo - Bên trái */}
        <Box sx={{ display: 'flex', alignItems: 'center', transition: 'all 0.3s ease' }}>
          <Typography variant="h6" className="logo-text" >
            Admin Dashboard
          </Typography>
        </Box>

        {/* Các nút và thông tin người dùng - Bên phải */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            onClick={handleRefresh}
            sx={{
              marginRight: 2,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                transform: 'scale(1.1)',
                transition: 'all 0.3s ease',
              },
            }}
          >
            <RefreshIcon sx={{ fontSize: 28 }} />
          </IconButton>

          {userProfile ? (
            <>
              <Button
                variant="contained"
                color="primary"
                startIcon={<PersonIcon />}
                onClick={handleProfileMenuOpen}
                sx={{
                  color: '#fff',
                  marginRight: 2,
                  textTransform: 'none',
                  borderRadius: 20,
                  padding: '8px 16px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    backgroundColor: '#1565c0',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
                    transform: 'scale(1.05)',
                    transition: 'all 0.3s ease',
                  },
                }}
              >
                Hello, <span style={{ fontWeight: 'bold' }}>{userProfile.fullname}</span>
              </Button>

              <IconButton
                color="inherit"
                onClick={handleLogout}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    transform: 'scale(1.1)',
                    transition: 'all 0.3s ease',
                  },
                }}
              >
                <LogoutIcon sx={{ fontSize: 28 }} />
              </IconButton>
            </>
          ) : (
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => navigate('/login')}
              sx={{
                color: '#fff',
                borderColor: '#fff',
                padding: '8px 16px',
                textTransform: 'none',
                borderRadius: 20,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  transform: 'scale(1.05)',
                  transition: 'all 0.3s ease',
                },
              }}
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
