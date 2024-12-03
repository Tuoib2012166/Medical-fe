import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';
import "react-datepicker/dist/react-datepicker.css";
import { FaCheck, FaTimes } from 'react-icons/fa';
import DeleteIcon from '@mui/icons-material/Delete';

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date()); // Default date is today

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:8080/appointments/List');
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

    const checkForDuplicates = (appointment, index) => {
        return appointments.some((otherAppointment, otherIndex) =>
            otherIndex !== index &&
            appointment.appointment_date === otherAppointment.appointment_date &&
            appointment.appointment_time === otherAppointment.appointment_time &&
            appointment.doctor_name === otherAppointment.doctor_name
        );
    };
    const rejectAppointment = async (id) => {
    try {
        const response = await axios.put(`http://localhost:8080/appointments/${id}/reject`);
        alert(response.data.message); // Hiển thị thông báo thành công
        setAppointments(appointments.map(appointment =>
            appointment.id === id ? { ...appointment, status: 'reject' } : appointment
        ));
    } catch (error) {
        console.error('Error rejecting appointment:', error);
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
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Số điện thoại</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Gmail</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Địa chỉ</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Giới tính</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Năm sinh</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Ngày hẹn</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Giờ hẹn</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Dịch vụ</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Bác sĩ</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Nội dung</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Ngày tạo</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Trạng thái</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Hủy / Xóa</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredAppointments.map((appointment, index) => (
                            <TableRow 
                                key={appointment.id} 
                                style={
                                    appointment.status === 'reject' 
                                        ? { backgroundColor: '#edcaca', color: '#800000' } 
                                        : appointment.status === 'pending' 
                                        ? { backgroundColor: '#def4ff', color: '#004085' } 
                                        : {}
                                }
                                 >
                                <TableCell className={checkForDuplicates(appointment, index) ? 'highlight' : ''}>{appointment.fullname}</TableCell>
                                <TableCell className={checkForDuplicates(appointment, index) ? 'highlight' : ''}>{appointment.phone}</TableCell>
                                <TableCell className={checkForDuplicates(appointment, index) ? 'highlight' : ''}>{appointment.email}</TableCell>
                                <TableCell className={checkForDuplicates(appointment, index) ? 'highlight' : ''}>{appointment.address}</TableCell>
                                <TableCell className={checkForDuplicates(appointment, index) ? 'highlight' : ''}>{appointment.gender}</TableCell>
                                <TableCell className={checkForDuplicates(appointment, index) ? 'highlight' : ''}>{appointment.birth_year}</TableCell>
                                <TableCell className={checkForDuplicates(appointment, index) ? 'highlight' : ''}>{new Date(appointment.appointment_date).toLocaleDateString('en-GB')}</TableCell>
                                <TableCell className={checkForDuplicates(appointment, index) ? 'highlight' : ''}>{appointment.appointment_time}</TableCell>
                                <TableCell className={checkForDuplicates(appointment, index) ? 'highlight' : ''}>{appointment.specialty}</TableCell>
                                <TableCell className={checkForDuplicates(appointment, index) ? 'highlight' : ''}>{appointment.doctor_name}</TableCell>
                                <TableCell className={checkForDuplicates(appointment, index) ? 'highlight' : ''}>{appointment.content}</TableCell>
                                <TableCell className={checkForDuplicates(appointment, index) ? 'highlight' : ''}>{new Date(appointment.appointment_date).toLocaleString('en-GB')}</TableCell>
                                <TableCell className={checkForDuplicates(appointment, index) ? 'highlight' : ''}>
                                    {appointment.status === 'accept' 
                                        ? 'Đã xác nhận' 
                                        : appointment.status === 'reject' 
                                        ? "Đã hủy"
                                        : "Đã xác nhận"}
                                </TableCell>
                                <TableCell className={checkForDuplicates(appointment, index) ? 'highlight' : ''}>
                                    {appointment.status !== 'accept' && appointment.status !== 'reject' && (
                                        <FaTimes 
                                            onClick={() => {
                                                Swal.fire({
                                                    title: 'Bạn có chắc chắn muốn hủy lịch hẹn này và gửi gmail thông báo cho bệnh nhân?',
                                                    icon: 'warning',
                                                    showCancelButton: true,
                                                    confirmButtonText: 'Xác nhận Hủy',
                                                    cancelButtonText: 'Quay lại',
                                                    reverseButtons: true, // Đảo vị trí các nút
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        rejectAppointment(appointment.id); // Gọi API từ đây
                                                        Swal.fire('Đã hủy!', 'Lịch hẹn đã bị hủy.', 'success');
                                                    }
                                                });
                                            }} 
                                            style={{ cursor: 'pointer', color: 'red' }} 
                                        />    
                                    )}
                                    <button
                                        onClick={() => handleDeleteAppointment(appointment.id)}
                                        style={{
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            padding: '5px',
                                            cursor: 'pointer',
                                            borderRadius: '5px',
                                        }}
                                        >
                                        <DeleteIcon style={{ color: 'red', fontSize: '24px' }} />
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
