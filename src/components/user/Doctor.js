import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardMedia, CardContent, Typography, CardActionArea, Box, Container, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

function DoctorList() {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState(''); // Trạng thái lưu dịch vụ chuyên môn đã chọn
    const [specialties, setSpecialties] = useState([]); // Trạng thái lưu danh sách dịch vụ chuyên môn
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:8080/doctors');
                setDoctors(response.data);
                setFilteredDoctors(response.data); // Khởi tạo danh sách bác sĩ lọc
                const specialtiesSet = new Set(response.data.map(doctor => doctor.specialty_name));
                setSpecialties([...specialtiesSet]); // Lấy tất cả các dịch vụ chuyên môn duy nhất
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

    // Hàm lọc bác sĩ theo dịch vụ chuyên môn
    const handleSpecialtyChange = (event) => {
        setSelectedSpecialty(event.target.value);

        if (event.target.value === '') {
            setFilteredDoctors(doctors); // Nếu không chọn dịch vụ chuyên môn, hiển thị tất cả bác sĩ
        } else {
            const filtered = doctors.filter(doctor => doctor.specialty_name === event.target.value);
            setFilteredDoctors(filtered); // Lọc bác sĩ theo dịch vụ chuyên môn
        }
    };

    return (
        <Box 
        display="flex"
          alignItems="center"
          padding="16px"
          gap="12px"
          bgcolor="#F0F0F0"
          sx={{
            backgroundImage: "url('img/sidebar/bgLogin4.jpg')", // Đường dẫn ảnh nền
            backgroundSize: "cover", // Ảnh bao phủ toàn màn hình
            backgroundPosition: "center", // Căn giữa ảnh
            backgroundRepeat: "no-repeat", // Không lặp ảnh
            borderBottom: "1px solid #e0e0e0",
            borderRadius: "8px",
          }}>
            <Container>
                <Typography variant="h4" sx={{ textAlign: 'center', my: 4, color: "#A52A2A"}}>
                    Danh Sách Bác Sĩ
                </Typography>
                
                {/* Dropdown lọc theo dịch vụ chuyên môn */}
                <FormControl fullWidth sx={{ mb: 4, maxWidth: 390, width: '100%' }}>
                    <InputLabel id="specialty-select-label">Chọn Dịch Vụ Chuyên Môn</InputLabel>
                    <Select
                        labelId="specialty-select-label"
                        id="specialty-select"
                        value={selectedSpecialty}
                        label="Chọn Dịch Vụ Chuyên Môn"
                        onChange={handleSpecialtyChange}
                    >
                        <MenuItem value="">Tất cả</MenuItem>
                        {specialties.map((specialty, index) => (
                            <MenuItem key={index} value={specialty}>
                                {specialty}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Grid chứa danh sách bác sĩ */}
                <Grid container spacing={3}>
                    {filteredDoctors.map((doctor, index) => (
                        <Grid item xs={2.4} sm={2.4} md={2.4} key={index}> 
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
