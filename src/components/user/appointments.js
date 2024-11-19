import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import useUserStore from '../../store/userStore';

function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const { user, setUser } = useUserStore();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data);
        };

        fetchUserData();
    }, [setUser]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:8080/appointments');
                const filteredAppointments = response.data.filter(appointment => appointment.user_id == user.profile.id);
                setAppointments(filteredAppointments);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        if (user && user.profile) {
            fetchAppointments();
        }
    }, [user]);

    return (
        <div>
            <Header />
            <Container>
                <Typography variant="h4" gutterBottom>Danh Sách Đặt Lịch</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Họ và tên</TableCell>
                                <TableCell>Số điện thoại</TableCell>
                                <TableCell>Địa chỉ</TableCell>
                                <TableCell>Giới tính</TableCell>
                                <TableCell>Năm sinh</TableCell>
                                <TableCell>Ngày hẹn</TableCell>
                                <TableCell>Giờ hẹn</TableCell>
                                <TableCell>Bác sĩ</TableCell>
                                <TableCell>Dịch vụ</TableCell>
                                <TableCell>Nội dung</TableCell>
                                <TableCell>Trạng thái</TableCell>
                                <TableCell>Ngày tạo</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {appointments.map((appointment) => (
                                <TableRow key={appointment.id}>
                                    <TableCell>{appointment.fullname}</TableCell>
                                    <TableCell>{appointment.phone}</TableCell>
                                    <TableCell>{appointment.address}</TableCell>
                                    <TableCell>{appointment.gender}</TableCell>
                                    <TableCell>{appointment.birth_year}</TableCell>
                                    <TableCell>{new Date(appointment.appointment_date).toLocaleDateString('en-GB')}</TableCell>
                                    <TableCell>{appointment.appointment_time}</TableCell>
                                    <TableCell>{appointment.doctor_name}</TableCell>
                                    <TableCell>{appointment.specialty}</TableCell>
                                    <TableCell>{appointment.content}</TableCell>
                                    <TableCell>
                                        {appointment.status === 'accept' ? 'Đã xác nhận' : appointment.status === 'reject' ? 'Đã bị từ chối' : 'Đang chờ'}
                                    </TableCell>
                                    <TableCell>{new Date(appointment.created_at).toLocaleString('en-GB')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            <Footer />
        </div>
    );
}

export default Appointments;
