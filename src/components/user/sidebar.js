import React, { useState, useEffect, useRef } from 'react';
import { Carousel } from 'antd';
import { Typography, List, ListItem, ListItemText, Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';
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
        <div className="sidebar">
            {/* Bài Viết Dịch Vụ */}
            <div className="sidebar-section">
                <Typography variant="h6" component="h3" gutterBottom>Bài Viết Dịch Vụ</Typography>
                <List>
                    <ListItem>
                        <ListItemText>
                            <Link to="/NiengRang" className="text-reset">Nắn răng</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Link to="/implant" className="text-reset">Cấy ghép Implant</Link>
                        </ListItemText>
                    </ListItem>
                    {/* Add other list items similarly */}
                </List>
            </div>

            {/* Đội Ngũ Bác Sĩ */}
            <div className="sidebar-section">
                <Typography variant="h6" component="h3" gutterBottom>Đội Ngũ Bác Sĩ</Typography>
                <Card>
                    <img src="img/sidebar/doctor-sb.png" alt="Đội ngũ bác sĩ" className="sidebar-image" />
                </Card>
            </div>

            {/* Thông Tin Ưu Đãi */}
            <div className="sidebar-section">
                <Typography variant="h6" component="h3" gutterBottom>Thông Tin Ưu Đãi</Typography>
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
            </div>

            {/* Kiến Thức Nha Khoa */}
            <div className="sidebar-section">
                <Typography variant="h6" component="h3" gutterBottom>Kiến thức nha khoa</Typography>
                <List>
                    <ListItem>
                        <ListItemText>
                            <Link to="/news" className="text-reset">Kiến thức niềng răng</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Link to="/newsImplant" className="text-reset">Kiến thức cấy ghép implant</Link>
                        </ListItemText>
                    </ListItem>
                </List>
            </div>

            {/* Hệ Thống Chi Nhánh */}
            <div className="sidebar-section">
                <Typography variant="h6" component="h3" gutterBottom>Hệ Thống Chi Nhánh</Typography>
                <Typography variant="body2" component="p" gutterBottom>
                    Hà Nội: Xuân Khánh, Ninh Kiều, Cần Thơ
                </Typography>
                <div className="contact-info">
                    <Button variant="outlined" color="primary" fullWidth>
                        Hotline 24/7: 0123456789
                    </Button>
                    <Button variant="outlined" color="primary" fullWidth>
                        Đăng ký: 0123456789
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
