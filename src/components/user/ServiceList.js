import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { Grid, Card, CardContent, CardMedia, Typography, Paper } from '@mui/material';
import '../../assets/css/serviceList.css'; 

function ServiceList() {
    const [services, setServices] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchSpecialties = async () => {
            try {
                const response = await axios.get('http://localhost:8080/specialties');
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching specialties:', error);
            }
        };

        fetchSpecialties();
    }, []);

    const handleServiceClick = (service) => {
        switch(service.name) {
            case 'Bọc răng sứ':
                navigate('/rangsu');
                break;
            case 'Cấy ghép implant':
                navigate('/implant');
                break;
            case 'Niềng răng thẩm mỹ':
                navigate('/niengrang');
                break;
            case 'Mặt dán sứ Veneer':
                navigate('/MatDanSuVeneer');
                break;
            case 'Tẩy trắng răng':
                navigate('/taytrangrang');
                break;
            case 'Nhổ răng khôn':
                navigate('/nhorangkhon');
                break;
            case 'Bệnh lý nha chu':
                navigate('/BenhLyNhaChu');
                break;
            case 'Điều trị tủy':
                navigate('/dieutrituy');
                break;
            case 'Hàn trám răng':
                navigate('/hantramrang');
                break;
            case 'Chăm sóc răng miệng cho phụ nữ mang thai':
                navigate('/chamsocrangmieng');
                break;
            default:
                break;
        }
    };

    return (
        <Paper sx={{ padding: 2, marginTop: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
                Danh Sách Dịch Vụ
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                {services.map((service, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card sx={{ boxShadow: 3, borderRadius: 2, cursor: 'pointer', height: '100%' }} onClick={() => handleServiceClick(service)}>
                            <CardMedia
                                component="img"
                                height="150"  // Giảm chiều cao của ảnh
                                image={`http://localhost:8080/${service.image}`}
                                alt={`Image of ${service.name}`}
                            />
                            <CardContent sx={{ padding: 1 }}>
                                <Typography variant="h6" align="center" noWrap>
                                    {service.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
}

export default ServiceList;
