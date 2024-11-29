import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DatePicker from 'react-datepicker';
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
    const handleDeleteAppointment = async (id) => {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa lịch hẹn này không?');
    if (!confirmed) return;

    try {
        await axios.delete(`http://localhost:8080/appointments/${id}`);
        setAppointments(appointments.filter(appointment => appointment.id !== id)); // Cập nhật danh sách sau khi xóa
    } catch (error) {
        console.error('Error deleting appointment:', error);
        alert('Không thể xóa lịch hẹn! Vui lòng thử lại.');
    }
};


    // Filter appointments by selected date
    const filteredAppointments = selectedDate 
        ? appointments.filter(appointment =>
            new Date(appointment.appointment_date).toLocaleDateString('en-GB') === selectedDate.toLocaleDateString('en-GB')
          )
        : appointments; // If no date is selected, show all appointments

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
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Dịch vụ</TableCell>   
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Nội dung</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Ngày tạo</TableCell>
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
                            <TableCell>{appointment.specialty}</TableCell>
                            <TableCell>{appointment.content}</TableCell>
                            <TableCell>{new Date(appointment.created_at).toLocaleDateString('en-GB')}</TableCell>
                            <TableCell>
                                <button
                                    onClick={() => handleDeleteAppointment(appointment.id)}
                                    style={{
                                        backgroundColor: 'red',
                                        color: 'white',
                                        border: 'none',
                                        padding: '5px 10px',
                                        cursor: 'pointer',
                                        borderRadius: '5px',
                                    }}
                                >
                                    Xóa
                                </button>
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
