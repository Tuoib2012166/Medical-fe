import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import Header from './header';
import Footer from './footer';
import useUserStore from '../../store/userStore';
import { toast } from 'react-toastify';

function MedicalRecords() {
    const [records, setRecords] = useState([]); // Lưu trữ danh sách bệnh án
    const { user } = useUserStore();
    useEffect(() => {
        fetchRecords(); // Lấy dữ liệu bệnh án
    }, []);

    // useEffect(() => {
    //     const fetchMedicalRecords = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:8080/medical-records?patient_id=${user.profile.id}`);
    //             setMedicalRecords(response.data);
    //         } catch (error) {
    //             console.error('Error fetching medical records:', error);
    //         }
    //     };

    //     if (user && user.profile) {
    //         fetchMedicalRecords();
    //     }
    // }, [user]);
    // Hàm lấy dữ liệu bệnh án từ API
    const fetchRecords = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/medical-records?patient_id=${user.profile.id}`); // Gọi API lấy bệnh án
            if (Array.isArray(response.data)) {
                setRecords(response.data); // Cập nhật danh sách bệnh án nếu dữ liệu hợp lệ
            } else {
                setRecords([]); // Nếu dữ liệu không hợp lệ, cập nhật state là mảng rỗng
                toast.error('Dữ liệu bệnh án không hợp lệ'); // Thông báo lỗi nếu dữ liệu không hợp lệ
            }
        } catch (error) {
            toast.error('Không thể lấy dữ liệu bệnh án'); // Thông báo lỗi khi không thể gọi API
        }
    };


    return (
        <div>
            <Header />
            <Container>
                <Typography variant="h4" gutterBottom>Bệnh Án</Typography>
                {/* <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Ngày khám</TableCell>
                                <TableCell>Bác sĩ</TableCell>
                                <TableCell>Chẩn đoán</TableCell>
                                <TableCell>Phác đồ điều trị</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {medicalRecords.map((record) => (
                                <TableRow key={record.id}>
                                    <TableCell>{new Date(record.date).toLocaleDateString('en-GB')}</TableCell>
                                    <TableCell>{record.doctor_name}</TableCell>
                                    <TableCell>{record.diagnosis}</TableCell>
                                    <TableCell>{record.treatment_plan}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer> */}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }} >Tên Bệnh nhân</TableCell>
                                <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Tên Bác sĩ</TableCell>
                                <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Chẩn đoán</TableCell>
                                <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Điều trị</TableCell>
                                <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Ngày ghi nhận</TableCell>
                                <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Địa chỉ</TableCell>
                                <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Số điện thoại</TableCell>
                                <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Giới tính</TableCell>
                                <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Năm sinh</TableCell>
                                <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Dịch vụ</TableCell>
                                <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Dịch vụ phụ</TableCell>
                                <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Đơn giá</TableCell>
                                <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Số lượng</TableCell>
                                <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Thành tiền</TableCell>
                                <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {records.map(record => (
                                <TableRow key={record.id}>
                                    <TableCell align="center">{record.patient_name}</TableCell>
                                    <TableCell align="center">{record.doctor_name}</TableCell>
                                    <TableCell align="center">{record.diagnosis}</TableCell>
                                    <TableCell align="center">{record.treatment}</TableCell>
                                    <TableCell align="center">{new Date(record.record_date).toLocaleDateString()}</TableCell>
                                    <TableCell align="center">{record.address}</TableCell>
                                    <TableCell align="center">{record.phone}</TableCell>
                                    <TableCell align="center">{record.gender}</TableCell>
                                    <TableCell align="center">{record.birth_year}</TableCell>
                                    <TableCell align="center">{record.specialty}</TableCell>
                                    <TableCell align="center">{record.service_name}</TableCell>
                                    <TableCell align="center">{record.unit_price}</TableCell>
                                    <TableCell align="center">{record.quantity}</TableCell>
                                    <TableCell align="center">{record.total_price}</TableCell>
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

export default MedicalRecords;
