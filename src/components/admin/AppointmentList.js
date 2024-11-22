import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import DatePicker from 'react-datepicker'; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css";

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date()); // Default date is today

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:8080/appointments');
                setAppointments(response.data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, []);

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

    // Filter appointments by selected date
    const filteredAppointments = appointments.filter(appointment =>
        new Date(appointment.appointment_date).toLocaleDateString('en-GB') === selectedDate.toLocaleDateString('en-GB')
    );

    return (
        <div>
            {/* DatePicker component to select date */}
            <div>
                <DatePicker
                    selected={selectedDate}
                    onChange={date => setSelectedDate(date)} // Update date on selection
                    dateFormat="yyyy/MM/dd"
                    placeholderText="Chọn ngày"
                    isClearable
                     // Limit to today's date or later
                />
            </div>

            {/* Table of appointments */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Họ và tên</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Ngày hẹn</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Giờ hẹn</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Bác sĩ</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Nội dung</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Ngày tạo</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Trạng thái</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredAppointments.map((appointment) => (
                            <TableRow key={appointment.id}>
                                <TableCell>{appointment.fullname}</TableCell>
                                <TableCell>{new Date(appointment.appointment_date).toLocaleDateString('en-GB')}</TableCell>
                                <TableCell>{appointment.appointment_time}</TableCell>
                                <TableCell>{appointment.doctor_name}</TableCell>
                                <TableCell>{appointment.content}</TableCell>
                                <TableCell>{new Date(appointment.created_at).toLocaleDateString('en-GB')}</TableCell>
                                <TableCell>
                                    {appointment.status === 'accept' 
                                        ? 'Đã xác nhận' 
                                        : appointment.status === 'reject' 
                                        ? 'Đã từ chối' 
                                        : 'Đang chờ'}
                                </TableCell>
                                <TableCell>
                                    {appointment.status === 'pending' && (
                                        <>
                                            <Tooltip title="Xác nhận">
                                                <IconButton
                                                    onClick={() => confirmAppointment(appointment.id)}
                                                    color="success"
                                                >
                                                    <CheckCircle />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Từ chối">
                                                <IconButton
                                                    onClick={() => rejectAppointment(appointment.id)}
                                                    color="error"
                                                >
                                                    <Cancel />
                                                </IconButton>
                                            </Tooltip>
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
