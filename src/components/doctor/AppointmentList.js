import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip  } from '@mui/material';
import DatePicker from 'react-datepicker'; // Import thư viện DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import CSS cho DatePicker
import useUserStore from "../../store/userStore";
import { FaCheck, FaTimes } from 'react-icons/fa';
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
                    const response = await axios.get('http://localhost:8080/appointments/List');
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
        const response = await axios.put(`http://localhost:8080/appointments/${id}/reject`);
        alert(response.data.message); // Hiển thị thông báo thành công
        setAppointments(appointments.map(appointment =>
            appointment.id === id ? { ...appointment, status: 'reject' } : appointment
        ));
    } catch (error) {
        console.error('Error rejecting appointment:', error);
    }
};


    return (
        <div
        >
            <h3>Danh sách đặt lịch</h3>

            {/* Chọn ngày tái khám */}
            <div>
                <DatePicker
                    selected={selectedDate}
                    onChange={date => setSelectedDate(date)} // Cập nhật ngày khi người dùng chọn
                    dateFormat="yyyy/MM/dd"
                    placeholderText="Chọn ngày"
                    isClearable
                    
                />
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Họ và tên</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Số điện thoại</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Email</TableCell>
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
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Thao tác</TableCell>
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
                                        : appointment.status === 'accept' 
                                        ? { backgroundColor: '#a1ffaf', color: '#004085' } 
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
                                        ? 'Đã khám' 
                                        : appointment.status === 'reject' 
                                        ? "Đã hủy"
                                        : "Đã xác nhận"}
                                </TableCell>
                                <TableCell className={checkForDuplicates(appointment, index) ? 'highlight' : ''}>
                                    {appointment.status !== 'accept' && appointment.status !== 'reject' && (
                                        <>
                                            {/* Nút Accept */}
                                            <Tooltip title="Bệnh nhân đã đến khám">
                                                <FaCheck
                                                    onClick={() => {
                                                        Swal.fire({
                                                            title: 'Bệnh nhân đã đến khám?',
                                                            icon: 'question',
                                                            showCancelButton: true,
                                                            confirmButtonText: 'Xác nhận',
                                                            cancelButtonText: 'Hủy',
                                                            reverseButtons: true, // Đảo vị trí các nút
                                                        }).then((result) => {
                                                            if (result.isConfirmed) {
                                                                confirmAppointment(appointment.id); // Gọi API từ đây
                                                                Swal.fire('Đã xác nhận!', 'Lịch hẹn đã được xác nhận.', 'success');
                                                            }
                                                        });
                                                    }}
                                                    style={{ cursor: 'pointer', color: 'green', marginRight: '10px' }}
                                                />
                                            </Tooltip>

                                            {/* Nút Reject */}
                                            <Tooltip title="Hủy lịch hẹn">
                                                <FaTimes
                                                    onClick={() => {
                                                        Swal.fire({
                                                            title: 'Bạn có chắc chắn muốn hủy lịch hẹn này và gửi email thông báo cho bệnh nhân?',
                                                            icon: 'warning',
                                                            showCancelButton: true,
                                                            confirmButtonText: 'Xác nhận hủy',
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
