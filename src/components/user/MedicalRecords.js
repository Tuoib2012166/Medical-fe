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
    // Hàm lấy dữ liệu bệnh án từ API
const fetchRecords = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/medical-records?patientId=${user.profile.id}`); 
        if (response.data && Array.isArray(response.data)) {
            // Nếu dữ liệu trả về có trường `services` dạng JSON, cần parse lại
            const formattedRecords = response.data.map(record => ({
                ...record,
                services: record.services ? JSON.parse(record.services) : [] // Xử lý nếu 'services' là JSON
            }));
            setRecords(formattedRecords); 
        } else {
            setRecords([]);
            toast.error('Dữ liệu bệnh án không hợp lệ');
        }
    } catch (error) {
        console.error(error);
        toast.error('Không thể lấy dữ liệu bệnh án từ API.');
    }
};

    const responsiveCSS = `
        @media (max-width: 768px) {
            .MuiTableCell-root {
                font-size: 12px;
                padding: 8px;
            }
            .MuiTypography-h4 {
                font-size: 18px;
            }
        }
        @media (max-width: 576px) {
            .MuiTableCell-root {
                font-size: 10px;
            }
            .MuiTypography-h4 {
                font-size: 16px;
            }
        }
    `;

     const addResponsiveCSS = () => {
        const styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.innerHTML = responsiveCSS;
        document.head.appendChild(styleElement);
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
                            <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Dịch vụ</TableCell>
                            <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>
                                <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white', width: '150px'}}>Dịch vụ phụ</TableCell>
                                <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Số lượng</TableCell>
                                <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Đơn giá</TableCell>
                                <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Thành tiền</TableCell>
                            </TableCell>
                            <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Tổng tiền (VNĐ)</TableCell>
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
                                {/* Cột dịch vụ phụ lồng bảng */}
                                <TableCell align="center">
                                    <Table size="small">
                                        <TableBody>
                                            {record?.services?.map((service, index) => (
                                                <TableRow key={index}>
                                                    <TableCell align="left" style={{ backgroundColor: '#E0FFFF'}}>{service.name}</TableCell>
                                                    <TableCell align="left" style={{ backgroundColor: '#AFEEEE'}}>{service.quantity}</TableCell>
                                                    <TableCell align="left" style={{ backgroundColor: '#E0FFFF'}}>{service.unit_price}</TableCell>
                                                    <TableCell align="left" style={{ backgroundColor: '#AFEEEE'}}>{service.total_price}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableCell>

                                {/* <TableCell align="center">{record.service_name}</TableCell>
                                <TableCell align="center">{record.quantity}</TableCell>
                                <TableCell align="center">{record.unit_price}</TableCell>
                                <TableCell align="center">{record.total_price}</TableCell> */}
                                <TableCell align="center">{record.amount}</TableCell>
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
                    <DialogTitle className="dialog-title" variant="h4" style={{ textAlign: 'center' }}>Thông tin Bệnh án</DialogTitle>
                    <DialogContent className="dialog-content">
                        {viewingRecord && (
                            <div>
                                {/* Header thông tin phòng khám */}
                                <div className="clinic-header" style={{ textAlign: 'right' }}>
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
                                            <th>Dịch vụ phụ</th>
                                            <th>Số lượng</th>
                                            <th>Đơn giá</th>
                                            <th>Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {viewingRecord?.services?.length > 0 ? (
                                            viewingRecord.services.map((service, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{viewingRecord.specialty_name || 'N/A'}</td>
                                                    <td>{service.name || 'N/A'}</td>
                                                    <td>{service.quantity || 0}</td>
                                                    <td>{service.unit_price || 0}</td>
                                                    <td>{service.total_price || 0}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" style={{ textAlign: 'center' }}>Không có dữ liệu dịch vụ</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                                {/* Đơn thuốc */}
                                <div className="total_price">
                                    <p><strong>Tổng tiền:</strong></p>
                                    <p>{viewingRecord.amount} VNĐ</p>
                                </div>
                                <div className="prescription">
                                    <p><strong>Đơn thuốc:</strong><p>{viewingRecord.prescription}</p></p>
                                </div>

                                {/* Phim X-Quang */}
                                {/* <div className="xray">
                            <h6>Phim chụp X-Quang:</h6>
                            <img src="https://implantvietnam.info/stmresource/files/kien-thuc-implant/tim-hieu-ve-chup-x-quang-rang-tac-dung-quy-trinh.jpg" alt="Xray" className="xray-img" />
                            </div> */}

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
                        <Button
                            onClick={() => {
                                const modalContent = document.querySelector('.MuiDialog-container').innerHTML; // Lấy nội dung modal
                                const newWindow = window.open('', '_blank', 'width=800,height=600'); // Mở cửa sổ mới

                                // Viết nội dung HTML vào cửa sổ mới
                                newWindow.document.write(`
                                        <html>
                                        <head>
                                            <link rel="stylesheet" href="../../assets/css/admin/MedicalRecordModal.css" /> <!-- Đường dẫn CSS -->
                                            <style>
                                @media print {
                                    body {
                                        margin: 0;
                                        padding: 0;
                                    }
                                    .MuiDialog-container {
                                        padding: 16px;
                                        border: 1px solid #ccc;
                                        font-family: Arial, sans-serif;
                                    }
                                    /* Căn chỉnh thông tin phòng khám sát trái */
                                    .clinic-header {
                                        display: flex;
                                        align-items: center; /* Căn giữa theo chiều dọc */
                                        justify-content: right-start; /* Căn lề trái */
                                    }
                                    .clinic-header img {
                                        max-width: 100px;
                                        height: auto;
                                        margin-right: 16px;
                                    }
                                    .clinic-info {
                                        text-align: right;
                                    }
                                    .clinic-info h3 {
                                        margin: 0; /* Loại bỏ margin */
                                    }
                                    .xray-img {
                                        max-width: 300px; /* Giảm kích thước ảnh X-Quang */
                                        height: auto;     /* Đảm bảo giữ nguyên tỷ lệ ảnh */
                                    }
                                    .service-table {
                                        width: 100%;
                                        border-collapse: collapse;
                                    }
                                    .service-table th, .service-table td {
                                        border: 1px solid #ccc;
                                        padding: 8px;
                                        text-align: left;
                                    }
                                    .signatures {
                                        display: flex;
                                        justify-content: space-between;
                                        margin-top: 24px;
                                    }
                                    .signatures div {
                                        text-align: center;
                                    }
                                    /* Ẩn các nút khi in */
                                    .dialog-actions {
                                        display: none;
                                    }
                                }
                            </style>
                                        </head>
                                        <body>
                                            ${modalContent} <!-- Nội dung modal -->
                                        </body>
                                        </html>
                                    `);

                                newWindow.document.close();
                                newWindow.print(); // Kích hoạt in
                                newWindow.close(); // Đóng cửa sổ in
                            }}
                            color="primary"
                        >
                            In
                        </Button>


                    </DialogActions>

                </Dialog>
            </TableContainer>
            <Footer />
        </div>
       
    );
};
const styles = {
    container: {
        margin: '20px auto',
        padding: '20px',
        maxWidth: '1200px',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        fontWeight: 'bold',
        color: '#007bff',
    },
    tableContainer: {
        marginTop: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
    },
    headerCell: {
        backgroundColor: '#007bff',
        color: 'white',
        fontWeight: 'bold',
    },
    dialogContent: {
        padding: '20px',
        lineHeight: '1.6',
    },
    dialogActions: {
        justifyContent: 'center',
    },
};

export default MedicalRecordList;