import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import useUserStore from '../../store/userStore';
import '../../assets/css/admin/MedicalRecordModal.css'; // Đảm bảo đường dẫn đúng
import Header from './header';
import Footer from './footer';
import {
    TextField,
    Select,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    InputLabel,
    FormControl,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Grid,
    IconButton,
    Typography,
    Paper
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const MedicalRecordList = () => {
    // Khai báo các state để lưu trữ dữ liệu và trạng thái của các yếu tố trong component
    const [records, setRecords] = useState([]); // Lưu trữ danh sách bệnh án
    const { user } = useUserStore(); // Lấy thông tin người dùng từ store
    const [viewingRecord, setViewingRecord] = useState(null); // Lưu bản ghi đang xem

    // Dùng useEffect để fetch dữ liệu khi component được render lần đầu
    useEffect(() => {
        fetchRecords(); // Lấy dữ liệu bệnh án
    }, []);

    const handleView = (record) => {
        setViewingRecord(record); // Lưu bản ghi vào state
    };

    const closeViewModal = () => {
        setViewingRecord(null); // Xóa dữ liệu khi đóng modal
    };





    // Hàm lấy dữ liệu bệnh án từ API
    const fetchRecords = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/medical-records?patientId=${user.profile.id}`); // Gọi API lấy bệnh án
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
            <Typography
                variant="h4"
                gutterBottom
                align="center"
                sx={{ fontWeight: "bold", color: "primary.main" }}
            >
                Hồ sơ bệnh án
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Tên Bệnh nhân</TableCell>
                            <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Tên Bác sĩ</TableCell>
                            <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Chẩn đoán</TableCell>
                            <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Điều trị</TableCell>
                            <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Ngày ghi nhận</TableCell>
                            <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Địa chỉ</TableCell>
                            <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Số điện thoại</TableCell>
                            <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Giới tính</TableCell>
                            <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Năm sinh</TableCell>
                            <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Chuyên Dịch vụ</TableCell>
                            <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Dịch vụ phụ</TableCell>
                            <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Số lượng</TableCell>
                            <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Đơn giá</TableCell>
                            <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Thành tiền</TableCell>
                            <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Đơn thuốc</TableCell>
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
                                <TableCell align="center">{record.specialty_name}</TableCell>
                                <TableCell align="center">{record.service_name}</TableCell>
                                <TableCell align="center">{record.quantity}</TableCell>
                                <TableCell align="center">{record.unit_price}</TableCell>
                                <TableCell align="center">{record.total_price}</TableCell>
                                <TableCell align="center">{record.prescription}</TableCell>
                                <TableCell align="center">

                                    <IconButton color="info" onClick={() => handleView(record)} title="Xem">
                                        <i className="fas fa-eye"></i> {/* Icon mắt xem */}
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Dialog open={!!viewingRecord} onClose={closeViewModal}>
                    <DialogTitle className="dialog-title" variant="h5">Thông tin Bệnh án</DialogTitle>
                    <DialogContent className="dialog-content">
                        {viewingRecord && (
                            <div>
                                {/* Header thông tin phòng khám */}
                                <div className="clinic-header">
                                    <img />
                                    <div className="clinic-info">
                                        <h3>NHA KHOA DENTAL CARE</h3>
                                        <p>Địa chỉ: AN Khánh, Ninh Kiều, Cần Thơ</p>
                                        <p>Điện thoại: 0123.456.789</p>
                                        <p>Website: https://dentalcare.vn</p>
                                    </div>
                                </div>

                                {/* Thông tin bệnh nhân */}
                                <div className="patient-info">
                                    <p><strong>Tên Bệnh nhân:</strong> {viewingRecord.patient_name}</p>
                                    <p><strong>Tên Bác sĩ:</strong> {viewingRecord.doctor_name}</p>
                                    <p><strong>Chẩn đoán:</strong> {viewingRecord.diagnosis}</p>
                                    <p><strong>Điều trị:</strong> {viewingRecord.treatment}</p>
                                    <p><strong>Ngày ghi nhận:</strong> {new Date(viewingRecord.record_date).toLocaleDateString()}</p>
                                    <p><strong>Địa chỉ:</strong> {viewingRecord.address}</p>
                                    <p><strong>Số điện thoại:</strong> {viewingRecord.phone}</p>
                                </div>

                                {/* Bảng dịch vụ */}
                                <table className="service-table">
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Dịch vụ</th>
                                            <th>Số lượng</th>
                                            <th>Đơn giá</th>
                                            <th>Giảm giá</th>
                                            <th>Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Đây là ví dụ, bạn cần map dữ liệu từ backend */}
                                        <tr>
                                            <td>1</td>
                                            <td>{viewingRecord.service_name}</td>
                                            <td>{viewingRecord.quantity}</td>
                                            <td>{viewingRecord.unit_price}</td>
                                            <td>{viewingRecord.discount || 0}</td>
                                            <td>{viewingRecord.total_price}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                {/* Đơn thuốc */}
                                <div className="prescription">
                                    <p><strong>Đơn thuốc</strong></p>
                                    <p>{viewingRecord.prescription}</p>
                                </div>

                                {/* Phim X-Quang */}
                                <div className="xray">
                                    <h6>Phim chụp X-Quang:</h6>
                                    <img src="https://implantvietnam.info/stmresource/files/kien-thuc-implant/tim-hieu-ve-chup-x-quang-rang-tac-dung-quy-trinh.jpg" alt="Xray" className="xray-img" />
                                </div>

                                {/* Chữ ký */}
                                <div className="signatures">
                                    <div>
                                        <p>Khách hàng</p>
                                        <p>(Ký, họ tên)</p>
                                    </div>
                                    <div>
                                        <p>Nhân viên thu ngân</p>
                                        <p>(Ký, họ tên)</p>
                                    </div>
                                    <div>
                                        <p>Bác sĩ điều trị</p>
                                        <p>(Ký, họ tên)</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                    <DialogActions className="dialog-actions">
                        <Button onClick={closeViewModal} color="secondary">
                            Đóng
                        </Button>
                        <Button onClick={() => window.print()} color="primary">
                            In
                        </Button>
                    </DialogActions>
                </Dialog>
            </TableContainer>
            <Footer />
        </div>
    );
};

export default MedicalRecordList;