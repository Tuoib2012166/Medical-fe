import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DatePicker from 'react-datepicker'; // Import thư viện DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import CSS cho DatePicker
import useUserStore from "../../store/userStore";

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date()); // Mặc định là ngày hôm nay
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

    // Hàm lọc các cuộc hẹn theo ngày đã chọn
    const filteredAppointments = selectedDate
        ? appointments.filter(appointment => {
              const appointmentDate = new Date(appointment.appointment_date);
              const selected = new Date(selectedDate);
              return appointmentDate.toDateString() === selected.toDateString();
          })
        : appointments;

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

            {/* Chọn ngày tái khám */}
            <div>
                <DatePicker
                    selected={selectedDate}
                    onChange={date => setSelectedDate(date)} // Cập nhật ngày khi người dùng chọn
                    dateFormat="yyyy/MM/dd"
                    placeholderText="Chọn ngày"
                    isClearable
                    minDate={new Date()} // Giới hạn ngày chọn là ngày hôm nay hoặc các ngày sau
                />
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Họ và tên</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Số điện thoại</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Địa chỉ</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Giới tính</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Năm sinh</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Ngày hẹn</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Giờ hẹn</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Bác sĩ</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Nội dung</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Ngày tạo</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Trạng thái</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Chấp nhận/ Từ chối</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredAppointments.map((appointment, index) => (
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
