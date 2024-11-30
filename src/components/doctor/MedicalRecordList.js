import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import useUserStore from '../../store/userStore';
import '../../assets/css/admin/MedicalRecordModal.css'; // Đảm bảo đường dẫn đúng
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
    Autocomplete,
    Paper
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const MedicalRecordList = () => {
    // Khai báo các state để lưu trữ dữ liệu và trạng thái của các yếu tố trong component
    const [records, setRecords] = useState([]); // Lưu trữ danh sách bệnh án
    const [patients, setPatients] = useState([]); // Lưu trữ danh sách bệnh nhân
    const [editingRecord, setEditingRecord] = useState(null); // Lưu trữ bản ghi đang chỉnh sửa
    const { user } = useUserStore(); // Lấy thông tin người dùng từ store
    const [specialties, setSpecialties] = useState([]); // Lưu trữ danh sách chuyên khoa
    const [services, setServices] = useState([]); // Lưu trữ danh sách dịch vụ
    const [viewingRecord, setViewingRecord] = useState(null); // Lưu bản ghi đang xem


    // Khai báo state cho form dữ liệu nhập vào
    const [formData, setFormData] = useState({
        patient_id: '',
        doctor_id: '',
        diagnosis: '',
        treatment: '',
        record_date: '',
        address: '',
        phone: '',
        gender: '',
        birth_year: '',
        specialty: '',
        service: '',
        quantity: '',
        unit_price: '',
        total_price: '',
        prescription: ''
    });
    const [showForm, setShowForm] = useState(false); // Trạng thái hiển thị form

    // Dùng useEffect để fetch dữ liệu khi component được render lần đầu
    useEffect(() => {
        fetchRecords(); // Lấy dữ liệu bệnh án
        fetchPatients(); // Lấy dữ liệu bệnh nhân
        fetchSpecialties(); // Lấy danh sách chuyên khoa
    }, [user, formData.patient_id]);

    const handleView = (record) => {
    setViewingRecord(record); // Lưu bản ghi vào state
    };

    const closeViewModal = () => {
        setViewingRecord(null); // Xóa dữ liệu khi đóng modal
    };
    


    // Hàm lấy danh sách chuyên khoa từ API
    const fetchSpecialties = async () => {
        try {
            const response = await axios.get('http://localhost:8080/specialties'); // Gọi API lấy chuyên khoa
            setSpecialties(response.data); // Cập nhật state specialties với dữ liệu trả về
        } catch (error) {
            toast.error('Không thể lấy danh sách chuyên khoa'); // Thông báo lỗi nếu không lấy được dữ liệu
        }
    };

    // Hàm lấy danh sách dịch vụ khi người dùng chọn chuyên khoa
    const fetchServices = async (id) => {
        try {
            const response = await axios.get('http://localhost:8080/services', { params: { specialty_id: id } }); // Gọi API với tham số chuyên khoa
            setServices(response.data); // Cập nhật danh sách dịch vụ
        } catch (error) {
            console.error('Failed to fetch services:', error); // In lỗi nếu gọi dịch vụ không thành công
        }
    };

    // Hàm lấy dữ liệu bệnh án từ API
    const fetchRecords = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/medical-records?doctorId=${user?.profile.id}`); // Gọi API lấy bệnh án
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

    // Hàm lấy danh sách bệnh nhân từ API
    const fetchPatients = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/appointments?doctorId=${user.profile.id}`);
            setPatients(response.data); // Cập nhật danh sách bệnh nhân
        } catch (error) {
            toast.error('Không thể lấy dữ liệu bệnh nhân'); // Thông báo lỗi khi không thể gọi API
        }
    };

    // Phần render giao diện có thể được thêm ở đây



    const handleEdit = (record) => {
        setEditingRecord(record);
        setFormData({
            patient_id: record.patient_id || '',
            doctor_id: record.doctor_id || '',
            diagnosis: record.diagnosis || '',
            treatment: record.treatment || '',
            record_date: record.record_date || '',
            address: record.address || '',
            phone: record.phone || '',
            gender: record.gender || '',
            birth_year: record.birth_year || '',
            specialty: record.specialty || '',
            service: record.service || '',
            quantity: record.quantity || '',
            unit_price: record.unit_price || '',
            total_price: record.total_price || '',
            prescription: record.prescription || ''
        });
        setShowForm(true);
    };
    


    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/medical-records/${id}`);
            toast.success('Xóa bệnh án thành công');
            fetchRecords();
        } catch (error) {
            toast.error('Không thể xóa bệnh án');
        }
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;
        if (name === "specialty") {
            const id = specialties.filter(x => x.name === value)[0].id
            fetchServices(id)
        }

        
        // Cập nhật giá trị trường hiện tại
        setFormData({ ...formData, [name]: value });

        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === 'service') {
            const service = services.find(x => x.id === value);
            const total_price = formData.quantity || 1 * service.price;
            setFormData({...formData, [name]: value, total_price, unit_price: service.price})
        }

        if (name === 'quantity') {
            const service = services.find(x => x.id === formData.service);
            const total_price = value * service.price;
            setFormData({...formData, [name]: value, total_price})
        }
        

        // Nếu thay đổi `patient_id`, gọi API lấy thông tin cuộc hẹn
        if (name === 'patient_id') {
            try {
                const response = await axios.get(`http://localhost:8080/appointments?benhNhanId=${formData.patient_id}&doctorId=${user.profile.id}`);
                setPatients(response.data)
                if (response.data) {
                    // Điền thông tin từ cuộc hẹn vào form
                    setFormData({
                        ...formData,
                        patient_id: value, // Đảm bảo patient_id vẫn giữ giá trị mới
                        doctor_id: response.data[0].doctor_id || '',
                        diagnosis: response.data[0].diagnosis || '',
                        treatment: response.data[0].treatment || '',
                        record_date: response.data[0].appointment_date || new Date(),
                        address: response.data[0].address || '',
                        phone: response.data[0].phone || '',
                        gender: response.data[0].gender || '',
                        birth_year: response.data[0].birth_year || '',
                        specialty: response.data[0].specialty || '',
                        service: response.data[0].service || '',
                        quantity: response.data[0].quantity || '',
                        unit_price: response.data[0].unit_price || '',
                        total_price: response.data[0].total_price || '',
                        prescription: response.data[0].prescription || ''
                    });
                } else {
                    toast.error('Không tìm thấy thông tin cuộc hẹn của bệnh nhân');
                }
            } catch (error) {
                toast.error('Không thể lấy dữ liệu cuộc hẹn của bệnh nhân');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Ngăn trình duyệt reload trang
        try {
            const url = editingRecord
                ? `http://localhost:8080/medical-records/${editingRecord.id}`
                : 'http://localhost:8080/medical-records';

            const method = editingRecord ? 'put' : 'post';

            if (formData.record_date) {
                formData.record_date = new Date()
            }
            // Gửi toàn bộ dữ liệu formData
            await axios({
                method,
                url,
                data: formData,
            });

            toast.success(`${editingRecord ? 'Cập nhật' : 'Thêm'} bệnh án thành công`);
            setEditingRecord(null);
            setFormData({
                patient_id: '',
                doctor_id: '',
                diagnosis: '',
                treatment: '',
                record_date: '',
                address: '',
                phone: '',
                gender: '',
                birth_year: '',
                specialty: '',
                service: '',
                quantity: '',
                unit_price: '',
                total_price: '',
                prescription: ''
            });
            setShowForm(false);
            fetchRecords(); // Tải lại danh sách sau khi thêm hoặc cập nhật
        } catch (error) {
            console.error('API Error:', error);
            toast.error('Không thể gửi biểu mẫu');
        }
    };




    return (
        <div>
            <button className="btn btn-primary my-3" onClick={() => setShowForm(true)}>Thêm Bệnh án</button>
            <Dialog open={showForm} onClose={() => setShowForm(false)}>
                <DialogTitle>Quản lý Bệnh án</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>

                        <Grid container spacing={2}>
                            {/* Cột 1 */}
                            <Grid item xs={12} sm={6}>
                                {/* Mã Bệnh nhân */}
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="patient_id">Mã Bệnh nhân</InputLabel>
                                    <Select
                                        labelId="patient_id"
                                        id="patient_id"
                                        name="patient_id"
                                        value={formData.patient_id}
                                        onChange={handleChange}
                                        required
                                    >
                                        <MenuItem value="">
                                            <em>Chọn Bệnh nhân</em>
                                        </MenuItem>
                                        {patients.map(patient => (
                                            <MenuItem key={patient.patient_id} value={patient.patient_id}>
                                                {patient.fullname}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                {/* Mã Bác sĩ */}
                                <TextField
                                    label="Mã Bác sĩ"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={user?.profile?.fullname || 'Chưa đăng nhập'}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />

                                {/* Chẩn đoán */}
                                <TextField
                                    label="Chẩn đoán"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    name="diagnosis"
                                    value={formData.diagnosis}
                                    onChange={handleChange}
                                    required
                                    margin="normal"
                                />

                                {/* Điều trị */}
                                <TextField
                                    label="Điều trị"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    name="treatment"
                                    value={formData.treatment}
                                    onChange={handleChange}
                                    required
                                    margin="normal"
                                />

                                <TextField
                                    label="Ngày ghi nhận"
                                    variant="outlined"
                                    type="date"
                                    fullWidth
                                    name="record_date"
                                    value={formData.record_date}
                                    onChange={handleChange}
                                    required
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        min: new Date().toISOString().split("T")[0], // Giới hạn ngày tối thiểu
                                    }}
                                />
                            </Grid>

                            {/* Cột 2 */}
                            <Grid item xs={12} sm={6}>
                                {/* Địa chỉ */}
                                <TextField
                                    label="Địa chỉ"
                                    variant="outlined"
                                    fullWidth
                                    name="address"
                                    value={formData.address || ''}
                                    onChange={handleChange}
                                    required
                                    margin="normal"
                                />

                                {/* Số điện thoại */}
                                <TextField
                                    label="Số điện thoại"
                                    variant="outlined"
                                    fullWidth
                                    name="phone"
                                    value={formData.phone || ''}
                                    onChange={handleChange}
                                    required
                                    margin="normal"
                                />

                                {/* Giới tính */}
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="gender">Giới tính</InputLabel>
                                    <Select
                                        labelId="gender"
                                        id="gender"
                                        name="gender"
                                        value={formData.gender || ''}
                                        onChange={handleChange}
                                        required
                                    >
                                        <MenuItem value="">
                                            <em>Chọn giới tính</em>
                                        </MenuItem>
                                        <MenuItem value="male">Nam</MenuItem>
                                        <MenuItem value="female">Nữ</MenuItem>
                                        <MenuItem value="other">Khác</MenuItem>
                                    </Select>
                                </FormControl>

                                {/* Năm sinh */}
                                <TextField
                                    label="Năm sinh"
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                    name="birth_year"
                                    value={formData.birth_year || ''}
                                    onChange={handleChange}
                                    required
                                    margin="normal"
                                />

                                {/* Dịch vụ chính */}
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="specialty">Dịch vụ</InputLabel>
                                    <Select
                                        labelId="specialty"
                                        id="specialty"
                                        name="specialty"
                                        value={formData.specialty || ''}
                                        onChange={handleChange}
                                        required
                                    >
                                        <MenuItem value="">
                                            <em>Chọn dịch vụ</em>
                                        </MenuItem>
                                        {specialties.map(specialty => (
                                            <MenuItem key={specialty.id} value={specialty.name}>
                                                {specialty.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                {/* Dịch vụ phụ */}
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="service">Dịch vụ phụ</InputLabel>
                                    <Select
                                        labelId="service"
                                        id="service"
                                        name="service"
                                        value={formData.service || ''}
                                        onChange={handleChange}
                                        required
                                    >
                                        <MenuItem value="">
                                            <em>Chọn dịch vụ phụ</em>
                                        </MenuItem>
                                        {services.map(service => (
                                            <MenuItem key={service.id} value={service.id}>
                                                {service.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                {/* Số lượng */}
                                <TextField
                                    label="Số lượng"
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                    name="quantity"
                                    value={formData.quantity || ''}
                                    onChange={handleChange}
                                    required
                                    margin="normal"
                                />

                                {/* Đơn giá */}
                                <div>
                                    <TextField
                                        label="Giá dịch vụ"
                                        value={
                                            formData.service 
                                                ? services.find(service => service.id === formData.service)?.price || '' 
                                                : ''
                                        }
                                        InputProps={{
                                        
                                        }}
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                    />
                                </div>
                                {/* Thành tiền */}
                                <TextField
                                    label="Thành tiền"
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                    name="total_price"
                                    value={formData.total_price || ''}
                                    margin="normal"
                                />


                                {/* Đơn thuốc */}
                                <TextField
                                    label="Đơn thuốc"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    name="prescription"
                                    value={formData.prescription || ''}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>

                    </form>
                </DialogContent>
                <DialogActions>
                    <form onSubmit={handleSubmit}>
                        {/* Các input trong form */}
                        <DialogActions>
                            <Button onClick={() => setShowForm(false)} color="secondary">
                                Hủy
                            </Button>
                            <Button type="submit" color="primary">
                                {editingRecord ? 'Cập nhật' : 'Thêm'} Bệnh án
                            </Button>
                        </DialogActions>
                    </form>

                </DialogActions>
            </Dialog>
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
                                <IconButton
                                    color="secondary"
                                    onClick={() => {
                                        if (window.confirm('Bạn có chắc chắn muốn xóa bệnh án này không?')) {
                                            handleDelete(record.id);
                                        }
                                    }}
                                    title="Xóa"
                                >
                                    <DeleteIcon />
                                </IconButton>
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
                            <img  />
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
            
        </div>
    );
};

export default MedicalRecordList;