import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import useUserStore from '../../store/userStore';
import { AppBar, Toolbar, Button, IconButton, Box, Menu, MenuItem, Avatar, Typography, Divider, Drawer, useMediaQuery } from '@mui/material';
import { ListAlt, MedicalServices, Person, ExitToApp, AccessTime, LocalHospital, AttachMoney, AccountBox, Login, PersonAdd, Menu as MenuIcon } from '@mui/icons-material';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../assets/css/header.css';

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isUserLoggedIn = useUserStore((state) => state.isUserLoggedIn());
  const userProfile = useUserStore((state) => state.user.profile);
  const clearUser = useUserStore((state) => state.clearUser);
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(['token']);
  const setUser = useUserStore((state) => state.setUser);
  const isFirstRender = useRef(true);

  const isMobile = useMediaQuery('(max-width:768px)'); // For mobile responsiveness

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
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

  const handleLogout = () => {
    removeCookie('token', { path: '/' });
    localStorage.removeItem('token');
    clearUser();
    navigate('/');
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

  const menuItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#A52A2A",
    padding: "8px 16px",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
    },
  };

  const iconStyle = {
    fontSize: "20px",
    color: "#1976d2",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#333",
    fontWeight: "500",
    "&:hover": {
      color: "#1976d2",
    },
  };

  const drawerContent = (
    <Box sx={{ width: 250 }}>
      <MenuItem component={Link} to="/service" sx={menuItemStyle}>
        <LocalHospital sx={iconStyle} /> Dịch vụ
      </MenuItem>
      <MenuItem component={Link} to="/priceList" sx={menuItemStyle}>
        <AttachMoney sx={iconStyle} /> Bảng giá
      </MenuItem>
      <MenuItem component={Link} to="/doctorList" sx={menuItemStyle}>
        <AccountBox sx={iconStyle} /> Thông tin bác sĩ
      </MenuItem>
      <MenuItem component={Link} to="/doctorList" sx={menuItemStyle}>
        <AccountBox sx={iconStyle} /> Kiến thức nha khoa
      </MenuItem>
      <MenuItem component={Link} to="/AppointmentForm" sx={menuItemStyle} onClick={(e) => {
        if (!isUserLoggedIn) {
          e.preventDefault();
          showLoginPrompt();
        }
      }}>
        <AccessTime sx={iconStyle} /> Đặt lịch khám
      </MenuItem>
      
    </Box>
  );

  return (
    <AppBar position="static" className="app-bar" sx={{ backgroundColor: '#E8E8E8', boxShadow: 3 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'inline-block' }}>
            <img src="img/logo.png" alt="Phòng Khám Nha Khoa Logo" className="logo" />
          </Link>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {isMobile ? (
            <>
              <IconButton onClick={() => setMobileMenuOpen(true)} sx={{ color: '000000' }}>
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="left" // Positioning the drawer to the left
                open={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
              >
                {drawerContent}
              </Drawer>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/service"
                startIcon={<LocalHospital />}
                sx={{
                  backgroundColor: '#1976d2',
                  color: 'white',
                  '&:hover': { backgroundColor: '#00BFFF', color: 'white' },
                  padding: '10px 20px',
                  borderRadius: '5px',
                  textTransform: 'none',
                }}
              >
                Dịch vụ
              </Button>

              <Button
                component={Link}
                to="/priceList"
                startIcon={<AttachMoney />}
                sx={{
                  backgroundColor: '#1976d2',
                  color: 'white',
                  '&:hover': { backgroundColor: '#00BFFF', color: 'white' },
                  padding: '10px 20px',
                  borderRadius: '5px',
                  textTransform: 'none',
                }}
              >
                Bảng giá
              </Button>

              <Button
                component={Link}
                to="/doctorList"
                startIcon={<AccountBox />}
                sx={{
                  backgroundColor: '#1976d2',
                  color: 'white',
                  '&:hover': { backgroundColor: '#00BFFF', color: 'white' },
                  padding: '10px 20px',
                  borderRadius: '5px',
                  textTransform: 'none',
                }}
              >
                Thông tin bác sĩ
              </Button>

              <Button
                component={Link}
                to="/News"
                startIcon={<AccountBox />}
                sx={{
                  backgroundColor: '#1976d2',
                  color: 'white',
                  '&:hover': { backgroundColor: '#00BFFF', color: 'white' },
                  padding: '10px 20px',
                  borderRadius: '5px',
                  textTransform: 'none',
                }}
              >
                Kiến thức nha khoa
              </Button>

              <Button
                component={Link}
                to="/AppointmentForm"
                startIcon={<AccessTime />}
                onClick={(e) => {
                  if (!isUserLoggedIn) {
                    e.preventDefault();
                    showLoginPrompt();
                  }
                }}
                sx={{
                  backgroundColor: '#1976d2',
                  color: 'white',
                  '&:hover': { backgroundColor: '#00BFFF', color: 'white' },
                  padding: '10px 20px',
                  borderRadius: '5px',
                  textTransform: 'none',
                }}
              >
                Đặt lịch khám
              </Button>
            </>
          )}
        </Box>
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
    <Box
  sx={{
    display: "flex",
    gap: 2,
    flexDirection: { xs: "column", sm: "row" }, // Stack buttons vertically on small screens
    alignItems: "center", // Center items horizontally on smaller screens
    justifyContent: "center", // Center the content
  }}
>
  <Button
    component={Link}
    to="/login"
    variant="contained"
    startIcon={<Login />}
    sx={{
      bgcolor: "#CD5C5C",
      color: "#fff",
      padding: { xs: "8px 16px", sm: "10px 20px" }, // Smaller padding on mobile
      fontWeight: "bold",
      borderRadius: "50px",
      width: { xs: "100%", sm: "auto" }, // Full width on small screens, auto width on larger screens
      "&:hover": {
        bgcolor: "#F08080",
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
      padding: { xs: "8px 16px", sm: "10px 20px" }, // Smaller padding on mobile
      fontWeight: "bold",
      borderRadius: "50px",
      width: { xs: "100%", sm: "auto" }, // Full width on small screens, auto width on larger screens
      "&:hover": {
        borderColor: "#0097a7",
        color: "#fff",
        bgcolor: "#1E90FF",
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
          bgcolor="#F0F0F0"
          sx={{
            backgroundImage: "url('img/sidebar/bgLogin2.jpg')", // Đường dẫn ảnh nền
            backgroundSize: "cover", // Ảnh bao phủ toàn màn hình
            backgroundPosition: "center", // Căn giữa ảnh
            backgroundRepeat: "no-repeat", // Không lặp ảnh
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
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
              color: "#000000",
              textTransform: "capitalize",
              textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)", // Đổ bóng chữ
            }}
          >
            Xin chào, {userProfile.fullname}
          </Typography>
        </Box>
        <Divider />
        
        <Box
          // sx={{
          //   backgroundImage: "url('img/sidebar/bgLogin4.jpg')", // Đường dẫn ảnh nền
          //   backgroundSize: "cover", // Ảnh bao phủ toàn màn hình
          //   backgroundPosition: "center", // Căn giữa ảnh
          //   backgroundRepeat: "no-repeat", // Không lặp ảnh
          //   borderBottom: "1px solid #e0e0e0",
          //   borderRadius: "8px",
          // }}
        >
        {/* Các menu item */}
        <MenuItem onClick={handleMenuClose} sx={{ ...menuItemStyle, '&:hover': { backgroundColor: '#AFEEEE' } }}>
          <ListAlt sx={iconStyle} />
          <Link to="/appointments" style={linkStyle}>
            Danh sách đặt lịch
          </Link>
        </MenuItem>

        <MenuItem onClick={handleMenuClose} sx={{ ...menuItemStyle, '&:hover': { backgroundColor: '#AFEEEE' } }}>
          <AccessTime sx={iconStyle} />
          <Link to="/FollowUpAppointments" style={linkStyle}>
            Lịch tái khám
          </Link>
        </MenuItem>

        <MenuItem onClick={handleMenuClose} sx={{ ...menuItemStyle, '&:hover': { backgroundColor: '#AFEEEE' } }}>
          <MedicalServices sx={iconStyle} />
          <Link to="/MedicalRecords" style={linkStyle}>
            Xem hồ sơ bệnh án
          </Link>
        </MenuItem>

        <MenuItem onClick={handleMenuClose} sx={{ ...menuItemStyle, '&:hover': { backgroundColor: '#AFEEEE' } }}>
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
        </Box>
      </>
    )}
  </Menu>
  
      </Toolbar>
    </AppBar>
  );
}

export default Header;
