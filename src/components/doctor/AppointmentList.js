import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import useUserStore from "../../store/userStore";

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);
    const [services, setServices] = useState([]);
    const { user, setUser } = useUserStore();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(response.data);
            const name = response.data.profile.fullname;

            const fetchAppointments = async () => {
                try {
                    const response = await axios.get('http://localhost:8080/appointments');
                    const filteredAppointments = response.data.filter(appointment => appointment.doctor_name === name);
                    setAppointments(filteredAppointments);
                } catch (error) {
                    console.error('Error fetching appointments:', error);
                }
            };

            const fetchServices = async () => {
                try {
                    const response = await axios.get('http://localhost:8080/specialties');
                    const filteredServices = response.data.filter(specialty => specialty.sevice === name);
                    setServices(filteredServices);
                } catch (error) {
                    console.error('Error fetching services:', error);
                }
            };

            fetchAppointments();
            fetchServices();
        };

        fetchUserData();
    }, [setUser]);

    const checkForDuplicates = (appointment, index) => {
        return appointments.some((otherAppointment, otherIndex) =>
            otherIndex !== index &&
            appointment.appointment_date === otherAppointment.appointment_date &&
            appointment.appointment_time === otherAppointment.appointment_time &&
            appointment.doctor_name === otherAppointment.doctor_name
        );
    };

    const confirmAppointment = async (id) => {
        try {
            await axios.put(`http://localhost:8080/appointments/${id}/confirm`);
            setAppointments(appointments.map(appointment =>
                appointment.id === id ? { ...appointment, status: 'accept' } : appointment
            ));
        } catch (error) {
            console.error('Error confirming appointment:', error);
        }
    };

    const rejectAppointment = async (id) => {
        try {
            await axios.put(`http://localhost:8080/appointments/${id}/reject`);
            setAppointments(appointments.map(appointment =>
                appointment.id === id ? { ...appointment, status: 'reject' } : appointment
            ));
        } catch (error) {
            console.error('Error rejecting appointment:', error);
        }
    };

    return (
        <div>
            <h3>Danh sách đặt lịch</h3>
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
                            <TableCell>Nội dung</TableCell>
                            <TableCell>Ngày tạo</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Chấp nhận/ Từ chối</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appointments.map((appointment, index) => (
                            <TableRow key={appointment.id}>
                                <TableCell className={checkForDuplicates(appointment, index) ? 'highlight' : ''}>{appointment.fullname}</TableCell>
                                <TableCell className={checkForDuplicates(appointment, index) ? 'highlight' : ''}>{appointment.phone}</TableCell>
                                <TableCell className={checkForDuplicates(appointment, index) ? 'highlight' : ''}>{appointment.address}</TableCell>
                                <TableCell className={checkForDuplicates(appointment, index) ? 'highlight' : ''}>{appointment.gender}</TableCell>
                                <TableCell className={checkForDuplicates(appointment, index) ? 'highlight' : ''}>{appointment.birth_year}</TableCell>
                                <TableCell className={checkForDuplicates(appointment, index) ? 'highlight' : ''}>{new Date(appointment.appointment_date).toLocaleDateString('en-GB')}</TableCell>
                                <TableCell className={checkForDuplicates(appointment, index) ? 'highlight' : ''}>{appointment.appointment_time}</TableCell>
                                <TableCell className={checkForDuplicates(appointment, index) ? 'highlight' : ''}>{appointment.doctor_name}</TableCell>
                                <TableCell className={checkForDuplicates(appointment, index) ? 'highlight' : ''}>{appointment.content}</TableCell>
                                <TableCell className={checkForDuplicates(appointment, index) ? 'highlight' : ''}>{new Date(appointment.appointment_date).toLocaleString('en-GB')}</TableCell>
                                <TableCell className={checkForDuplicates(appointment, index) ? 'highlight' : ''}>
                                    {appointment.status === 'accept' ? 'Đã xác nhận' : appointment.status === 'reject' ? 'Đã từ chối' : 'Đang chờ'}
                                </TableCell>
                                <TableCell>
                                    {appointment.status !== 'accept' && appointment.status !== 'reject' && (
                                        <>
                                            <IconButton onClick={() => confirmAppointment(appointment.id)} style={{ color: 'green', marginRight: '10px' }}>
                                                <CheckIcon />
                                            </IconButton>
                                            <IconButton onClick={() => rejectAppointment(appointment.id)} style={{ color: 'red' }}>
                                                <CloseIcon />
                                            </IconButton>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default AppointmentList;
