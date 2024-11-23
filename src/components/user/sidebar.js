import React, { useState, useEffect, useRef } from 'react';
import { Carousel } from 'antd';
import { List, ListItem, ListItemText, Typography, Box, Divider } from '@mui/material';
import '../../assets/css/sidebar.css';

const Sidebar = () => {
    const carouselRef = useRef(null);
    const [autoplayInterval, setAutoplayInterval] = useState(5000); 

    useEffect(() => {
        const interval = setInterval(() => {
            carouselRef.current.next();
        }, autoplayInterval);

        return () => {
            clearInterval(interval);
        };
    }, [autoplayInterval]);

    return (
        <Box className="sidebar" sx={{ width: 250, padding: 2, backgroundColor: '#f4f4f4', height: '100vh' }}>
           
            <Box className="sidebar-section">
                <Typography variant="h6" gutterBottom>Bài Viết Dịch Vụ</Typography>
                <List>
                    <ListItem button component="a" href="/NiengRang">
                        <ListItemText primary="Nắn răng - Chỉnh nha" />
                    </ListItem>
                    <ListItem button component="a" href="/implant">
                        <ListItemText primary="Cấy ghép Implant" />
                    </ListItem>
                    <ListItem button component="a" href="/rangsu">
                        <ListItemText primary="Bọc răng sứ" />
                    </ListItem>
                    <ListItem button component="a" href="/MatDanSuVeneer">
                        <ListItemText primary="Dán sứ veneer" />
                    </ListItem>
                    <ListItem button component="a" href="#cuoi-ho-lợi">
                        <ListItemText primary="Cười hở lợi" />
                    </ListItem>
                    <ListItem button component="a" href="/NhoRangKhon">
                        <ListItemText primary="Nhổ răng khôn" />
                    </ListItem>
                    <ListItem button component="a" href="/BenhLyNhaChu">
                        <ListItemText primary="Bệnh Lý Nha Chu" />
                    </ListItem>
                    <ListItem button component="a" href="/DieuTriTuy">
                        <ListItemText primary="Điều Trị Tủy" />
                    </ListItem>
                    <ListItem button component="a" href="/HanTramRang">
                        <ListItemText primary="Hàn Trám Răng" />
                    </ListItem>
                    <ListItem button component="a" href="/ChamSocRangMieng">
                        <ListItemText primary="Chăm Sóc Răng Miệng Cho Phụ Nữ Mang Thai" />
                    </ListItem>
                </List>
            </Box>

            <Box className="sidebar-section">
                <Typography variant="h6" gutterBottom>Đội Ngũ Bác Sĩ</Typography>
                <img src="img/sidebar/doctor-sb.png" alt="Đội ngũ bác sĩ" className="sidebar-image" style={{ width: '100%', borderRadius: '8px' }} />
            </Box>

            <Box className="sidebar-section">
                <Typography variant="h6" gutterBottom>Thông Tin Ưu Đãi</Typography>
                <Carousel
                    ref={carouselRef}
                    autoplay={false}
                    dotPosition="bottom"
                    effect="fade"
                    speed={1500}
                >
                    <div>
                        <img src="./img/sidebar/sale1.jpg" alt="banner cua trang chu" style={{ width: "100%", height: "100%" }} />
                    </div>
                    <div>
                        <img src="./img/sidebar/sale2.jpg" alt="banner cua trang chu" style={{ width: "100%", height: "100%" }} />
                    </div>
                    <div>
                        <img src='./img/sidebar/sale3.jpg' alt="banner cua trang chu" style={{ width: "100%", height: "100%" }} />
                    </div>
                </Carousel>
            </Box>

            <Box className="sidebar-section">
                <Typography variant="h6" gutterBottom>Kiến Thức Nha Khoa</Typography>
                <List>
                    <ListItem button component="a" href="/news">
                        <ListItemText primary="Kiến thức niềng răng" />
                    </ListItem>
                    <ListItem button component="a" href="/newsImplant">
                        <ListItemText primary="Kiến thức cấy ghép implant" />
                    </ListItem>
                </List>
            </Box>

            <Box className="sidebar-section">
                <Typography variant="h6" gutterBottom>Hệ Thống Chi Nhánh</Typography>
                <List>
                    <ListItem>
                        <ListItemText primary="Hà Nội: Thanh Xuân - Cầu Giấy - Hai Bà Trưng" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="TP. Hồ Chí Minh: Quận 10 - Bình Thạnh" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Thành phố Lào Cai" />
                    </ListItem>
                </List>
                <Divider sx={{ margin: '10px 0' }} />
                <Box>
                    <Typography variant="body2" color="textSecondary">Hotline 24/7: 0123456789</Typography>
                    <Typography variant="body2" color="textSecondary">Đăng ký: 0123456789</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Sidebar;
