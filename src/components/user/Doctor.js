import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardMedia, CardContent, Typography, CardActionArea, Box, Container } from '@mui/material';
import Sidebar from './sidebar'; // Sidebar nếu cần
import '../../assets/css/doctorList.css'; // Tùy chọn nếu bạn cần thêm CSS tùy chỉnh

function DoctorList() {
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:8080/doctors');
                setDoctors(response.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();
    }, []);

    // Hàm xử lý khi nhấn vào bác sĩ
    const handleDoctorClick = (doctor) => {
    navigate(`/${doctor.fullname.replace(/ /g, '-').toLowerCase()}`);
};


    return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Container>
                <Typography variant="h4" sx={{ textAlign: 'center', my: 4 }}>
                    Danh Sách Bác Sĩ
                </Typography>
                <Grid container spacing={3}>
                    {doctors.map((doctor, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card onClick={() => handleDoctorClick(doctor)} sx={{ cursor: 'pointer' }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={doctor.image ? `http://localhost:8080/${doctor.image}` : 'https://via.placeholder.com/200'}
                                        alt={`Ảnh của ${doctor.fullname}`}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            {doctor.fullname}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Dịch vụ chuyên môn: {doctor.specialty_name || 'Không xác định'}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}

export default DoctorList;
