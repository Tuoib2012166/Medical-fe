import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import useUserStore from '../../store/userStore';
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
    const [doctors, setDoctors] = useState([]); // Lưu trữ danh sách bác sĩ
    const [patients, setPatients] = useState([]); // Lưu trữ danh sách bệnh nhân
    const [editingRecord, setEditingRecord] = useState(null); // Lưu trữ bản ghi đang chỉnh sửa
    const { user } = useUserStore(); // Lấy thông tin người dùng từ store
    const [specialties, setSpecialties] = useState([]); // Lưu trữ danh sách chuyên khoa
    const [services, setServices] = useState([]); // Lưu trữ danh sách dịch vụ

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
        fetchDoctors(); // Lấy dữ liệu bác sĩ
        fetchPatients(); // Lấy dữ liệu bệnh nhân
        fetchSpecialties(); // Lấy danh sách chuyên khoa
    }, []);

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
            const response = await axios.get('http://localhost:8080/medical-records'); // Gọi API lấy bệnh án
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

    // Hàm lấy danh sách bác sĩ từ API
    const fetchDoctors = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/doctors`); // Gọi API lấy bác sĩ
            setDoctors(response.data); // Cập nhật danh sách bác sĩ
        } catch (error) {
            toast.error('Không thể lấy dữ liệu bác sĩ'); // Thông báo lỗi nếu không thể lấy dữ liệu
        }
    };

    // Hàm lấy danh sách bệnh nhân từ API
    const fetchPatients = async () => {
        try {
            const response = await axios.get('http://localhost:8080/patients'); // Gọi API lấy bệnh nhân
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

        // Nếu thay đổi `patient_id`, gọi API lấy thông tin cuộc hẹn
        if (name === 'patient_id') {
            try {
                const response = await axios.get(`http://localhost:8080/appointments?benhNhanId=${formData.patient_id}&doctorId=${user.profile.id}`);
                console.log(response.data, "isadksadsa")
                if (response.data) {
                    // Điền thông tin từ cuộc hẹn vào form
                    setFormData({
                        ...formData,
                        patient_id: value, // Đảm bảo patient_id vẫn giữ giá trị mới
                        doctor_id: response.data[0].doctor_id || '',
                        diagnosis: response.data[0].diagnosis || '',
                        treatment: response.data[0].treatment || '',
                        // record_date: response.data[0].appointment_date || new Date(),
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

    console.log("formDate: ", formData)

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
                                            <MenuItem key={patient.id} value={patient.id}>
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
                                    value={user.profile.fullname}
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

                                {/* Ngày ghi nhận */}
                                <TextField
                                    label="Ngày ghi nhận"
                                    variant="outlined"
                                    type="date"
                                    fullWidth
                                    name="record_date"
                                    value={formData.record_date || new Date().toLocaleDateString('en-CA')} // Sử dụng múi giờ địa phương
                                    onChange={handleChange}
                                    required
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{

                                        min: new Date().toLocaleDateString('en-CA'), // Giới hạn ngày tối thiểu là hôm nay, dùng múi giờ địa phương
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

                                {/* Chuyên khoa */}
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="specialty">Chuyên khoa</InputLabel>
                                    <Select
                                        labelId="specialty"
                                        id="specialty"
                                        name="specialty"
                                        value={formData.specialty || ''}
                                        onChange={handleChange}
                                        required
                                    >
                                        <MenuItem value="">
                                            <em>Chọn chuyên khoa</em>
                                        </MenuItem>
                                        {specialties.map(specialty => (
                                            <MenuItem key={specialty.id} value={specialty.name}>
                                                {specialty.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                {/* Dịch vụ */}
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="service">Dịch vụ</InputLabel>
                                    <Select
                                        labelId="service"
                                        id="service"
                                        name="service"
                                        value={formData.service || ''}
                                        onChange={handleChange}
                                        required
                                    >
                                        <MenuItem value="">
                                            <em>Chọn dịch vụ</em>
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
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="unit_price">Đơn Giá</InputLabel>
                                    <Select
                                        labelId="unit_price"
                                        id="unit_price"
                                        name="unit_price"
                                        value={formData.service || ''}
                                        onChange={handleChange}
                                        required
                                    >
                                        <TextField value="">
                                            <em></em>
                                        </TextField>
                                        {services.map(service => (
                                            <TextField key={service.id} value={service.id}>
                                                {service.price}
                                            </TextField>
                                        ))}
                                    </Select>
                                </FormControl>

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
                            <TableCell align="center">Tên Bệnh nhân</TableCell>
                            <TableCell align="center">Tên Bác sĩ</TableCell>
                            <TableCell align="center">Chẩn đoán</TableCell>
                            <TableCell align="center">Điều trị</TableCell>
                            <TableCell align="center">Ngày ghi nhận</TableCell>
                            <TableCell align="center">Địa chỉ</TableCell>
                            <TableCell align="center">Số điện thoại</TableCell>
                            <TableCell align="center">Giới tính</TableCell>
                            <TableCell align="center">Năm sinh</TableCell>
                            <TableCell align="center">Chuyên khoa</TableCell>
                            <TableCell align="center">Hành động</TableCell>
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
                                <TableCell align="center">
                                    <IconButton color="primary" onClick={() => handleEdit(record)} title="Sửa">
                                        <EditIcon />
                                    </IconButton>
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
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default MedicalRecordList;