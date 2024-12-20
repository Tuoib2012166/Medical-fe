import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, TextField, Select, MenuItem, Grid, FormControl, InputLabel, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { MdEdit, MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2'; // Import SweetAlert2
const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [editingDoctor, setEditingDoctor] = useState(null);
    const [newDoctor, setNewDoctor] = useState({
        username: '',
        password: '',
        fullname: '',
        specialty: '',
        phone: '',
        address: '',
        gender: '',
        birth_year: '',
        image: null,
        introduction: '',
        biography: '',
        certifications: '',
        main_workplace: 'Cần Thơ', // Giá trị mặc định
        working_hours: '8:00 - 17:00', // Giá trị mặc định
    });
    const [showAddForm, setShowAddForm] = useState(false);

    const [sortDirection, setSortDirection] = useState('asc'); // 'asc' hoặc 'desc'

    const handleSortBySpecialty = () => {
    const direction = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(direction);
    const sortedDoctors = [...doctors].sort((a, b) => {
        if (direction === 'asc') {
            return a.specialty_name.localeCompare(b.specialty_name);
        } else {
            return b.specialty_name.localeCompare(a.specialty_name);
        }
    });
    setDoctors(sortedDoctors);
};



    useEffect(() => {
        fetchDoctors();
        fetchSpecialties();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:8080/doctors');
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const fetchSpecialties = async () => {
        try {
            const response = await axios.get('http://localhost:8080/specialties');
            setSpecialties(response.data);
        } catch (error) {
            console.error('Error fetching specialties:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDoctor({ ...newDoctor, [name]: value });
    };

    const handleFileChange = (e) => {
        setNewDoctor({ ...newDoctor, image: e.target.files[0] });
    };

    const handleAddDoctor = async () => {
        const formData = new FormData();
        Object.keys(newDoctor).forEach((key) => {
            formData.append(key, newDoctor[key]);
        });

        try {
            await axios.post('http://localhost:8080/doctors', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            Swal.fire({
            title: 'Thêm bác sĩ thành công!',
            icon: 'success',
            })
            fetchDoctors(); // Làm mới danh sách
            setShowAddForm(false);
        } catch (error) {
            console.error('Error adding doctor:', error);
            alert('Không thêm được bác sĩ! Username đã tồn tại.');
        }
    };

    const handleEditDoctor = (doctor) => {
        setEditingDoctor({ ...doctor, image: null }); // Đặt image về null để chỉnh sửa
    };

    const handleUpdateDoctor = async () => {
        const formData = new FormData();
        Object.keys(editingDoctor).forEach((key) => {
            if (editingDoctor[key] !== null) {
                formData.append(key, editingDoctor[key]);
            }
        });

        try {
            await axios.put(`http://localhost:8080/doctors/${editingDoctor.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            fetchDoctors();
            setEditingDoctor(null);
        } catch (error) {
            console.error('Error updating doctor:', error);
        }
    };

    const handleDeleteDoctor = async (id) => {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa bác sĩ này không?');
    if (!confirmed) return;

    try {
        await axios.delete(`http://localhost:8080/doctors/${id}`);
        fetchDoctors(); // Làm mới danh sách
    } catch (error) {
        console.error('Error deleting doctor:', error);
        alert('Không xóa được bác sĩ! Vui lòng thử lại.');
    }
};


    return (
        <div>
            
            <h3>Quản lý Bác sĩ</h3>
            <Button variant="contained" color="primary" onClick={() => setShowAddForm(!showAddForm)}>
                Thêm Bác sĩ
            </Button>

            {/* Form Thêm Bác sĩ */}
            <Dialog open={showAddForm} onClose={() => setShowAddForm(false)} maxWidth="lg" fullWidth>
                <DialogTitle>Thêm Bác sĩ</DialogTitle>
                <DialogContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleAddDoctor();
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="Username"
                                    name="username"
                                    value={newDoctor.username}
                                    onChange={handleInputChange}
                                    required
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    name="password"
                                    value={newDoctor.password}
                                    onChange={handleInputChange}
                                    required
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    label="Họ và Tên"
                                    name="fullname"
                                    value={newDoctor.fullname}
                                    onChange={handleInputChange}
                                    required
                                    sx={{ mb: 2 }}
                                />
                                <FormControl fullWidth required sx={{ mb: 2 }}>
                                    <InputLabel>Dịch vụ chuyên môn</InputLabel>
                                    <Select
                                        name="specialty"
                                        value={newDoctor.specialty}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value=""><em>Chọn chuyên khoa</em></MenuItem>
                                        {specialties.map(specialty => (
                                            <MenuItem key={specialty.id} value={specialty.id}>{specialty.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField
                                    fullWidth
                                    label="Số Điện Thoại"
                                    name="phone"
                                    value={newDoctor.phone}
                                    onChange={handleInputChange}
                                    required
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="Địa Chỉ"
                                    name="address"
                                    value={newDoctor.address}
                                    onChange={handleInputChange}
                                    required
                                    sx={{ mb: 2 }}
                                />
                                <FormControl fullWidth required sx={{ mb: 2 }}>
                                    <InputLabel>Giới Tính</InputLabel>
                                    <Select
                                        name="gender"
                                        value={newDoctor.gender}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="0">Nam</MenuItem>
                                        <MenuItem value="1">Nữ</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    fullWidth
                                    label="Năm Sinh"
                                    type="number"
                                    name="birth_year"
                                    value={newDoctor.birth_year}
                                    onChange={handleInputChange}
                                    required
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    label="Nơi Làm Việc Chính"
                                    name="main_workplace"
                                    value={newDoctor.main_workplace}
                                    onChange={handleInputChange}
                                    required
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    label="Giờ Làm Việc"
                                    name="working_hours"
                                    value={newDoctor.working_hours}
                                    onChange={handleInputChange}
                                    required
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="Giới Thiệu"
                                    name="introduction"
                                    value={newDoctor.introduction}
                                    onChange={handleInputChange}
                                    multiline
                                    rows={4}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    label="Tiểu Sử - Kinh Nghiệm"
                                    name="biography"
                                    value={newDoctor.biography}
                                    onChange={handleInputChange}
                                    multiline
                                    rows={4}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    label="Chứng Chỉ & Đào Tạo"
                                    name="certifications"
                                    value={newDoctor.certifications}
                                    onChange={handleInputChange}
                                    multiline
                                    rows={4}
                                    sx={{ mb: 2 }}
                                />
                                <input type="file" name="image" onChange={handleFileChange} />
                            </Grid>
                        </Grid>
                        <DialogActions>
                            <Button type="submit" variant="contained" color="primary">Thêm</Button>
                            <Button onClick={() => setShowAddForm(false)} variant="contained" color="secondary">Hủy</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Table Bác sĩ */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Username</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Họ và Tên</TableCell>
                            <TableCell
                                style={{ backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}
                                onClick={handleSortBySpecialty}
                            >
                                Dịch vụ
                                {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                            </TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Số Điện Thoại</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Nơi Làm Việc</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Năm Sinh</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Hình Ảnh</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Hành Động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {doctors.map((doctor) => (
                            <TableRow key={doctor.id}>
                                <TableCell>{doctor.username}</TableCell>
                                <TableCell>{doctor.fullname}</TableCell>
                                <TableCell>{doctor.specialty_name}</TableCell>
                                <TableCell>{doctor.phone}</TableCell>
                                <TableCell>{doctor.main_workplace}</TableCell>
                                <TableCell>{doctor.birth_year}</TableCell>
                                <TableCell>
                                    <img src={`http://localhost:8080/${doctor.image}`} alt="Doctor" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                                </TableCell>
                                <TableCell>
                                    <Button 
                                    variant="contained" 
                                    color="primary"  
                                    onClick={() => handleEditDoctor(doctor)}
                                    startIcon={<MdEdit />} // Thêm icon chỉnh sửa
                                >
                                    Sửa
                                </Button>
                                <Button 
                                    variant="contained" 
                                    color="secondary" 
                                    onClick={() => handleDeleteDoctor(doctor.id)}
                                    startIcon={<MdDelete />} // Thêm icon xóa
                                >
                                    Xóa
                                </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </TableContainer>

                {/* Form Sửa Bác sĩ */}
                {editingDoctor && (
                <Dialog open={true} onClose={() => setEditingDoctor(null)}>
                <DialogTitle>Sửa Bác sĩ</DialogTitle>
                <DialogContent>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdateDoctor();
                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Username"
                                name="username"
                                value={editingDoctor.username}
                                onChange={(e) => setEditingDoctor({ ...editingDoctor, username: e.target.value })}
                                required
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                name="password"
                                value={editingDoctor.password}
                                onChange={(e) => setEditingDoctor({ ...editingDoctor, password: e.target.value })}
                                required
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Họ và Tên"
                                name="fullname"
                                value={editingDoctor.fullname}
                                onChange={(e) => setEditingDoctor({ ...editingDoctor, fullname: e.target.value })}
                                required
                                sx={{ mb: 2 }}
                            />
                            <FormControl fullWidth required sx={{ mb: 2 }}>
                                <InputLabel>Dịch vụ</InputLabel>
                                <Select
                                    name="specialty"
                                    value={editingDoctor.specialty}
                                    onChange={(e) => setEditingDoctor({ ...editingDoctor, specialty: e.target.value })}
                                >
                                    <MenuItem value=""><em>Chọn Dịch vụ</em></MenuItem>
                                    {specialties.map(specialty => (
                                        <MenuItem key={specialty.id} value={specialty.id}>{specialty.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                fullWidth
                                label="Số Điện Thoại"
                                name="phone"
                                value={editingDoctor.phone}
                                onChange={(e) => setEditingDoctor({ ...editingDoctor, phone: e.target.value })}
                                required
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Địa Chỉ"
                                name="address"
                                value={editingDoctor.address}
                                onChange={(e) => setEditingDoctor({ ...editingDoctor, address: e.target.value })}
                                required
                                sx={{ mb: 2 }}
                            />
                            <FormControl fullWidth required sx={{ mb: 2 }}>
                                <InputLabel>Giới Tính</InputLabel>
                                <Select
                                    name="gender"
                                    value={editingDoctor.gender}
                                    onChange={(e) => setEditingDoctor({ ...editingDoctor, gender: e.target.value })}
                                >
                                    <MenuItem value="0">Nam</MenuItem>
                                    <MenuItem value="1">Nữ</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                fullWidth
                                label="Năm Sinh"
                                type="number"
                                name="birth_year"
                                value={editingDoctor.birth_year}
                                onChange={(e) => setEditingDoctor({ ...editingDoctor, birth_year: e.target.value })}
                                required
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Nơi Làm Việc Chính"
                                name="main_workplace"
                                value={editingDoctor.main_workplace}
                                onChange={(e) => setEditingDoctor({ ...editingDoctor, main_workplace: e.target.value })}
                                required
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Giờ Làm Việc"
                                name="working_hours"
                                value={editingDoctor.working_hours}
                                onChange={(e) => setEditingDoctor({ ...editingDoctor, working_hours: e.target.value })}
                                required
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Giới Thiệu"
                                name="introduction"
                                value={editingDoctor.introduction}
                                onChange={(e) => setEditingDoctor({ ...editingDoctor, introduction: e.target.value })}
                                multiline
                                rows={4}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Tiểu Sử - Kinh Nghiệm"
                                name="biography"
                                value={editingDoctor.biography}
                                onChange={(e) => setEditingDoctor({ ...editingDoctor, biography: e.target.value })}
                                multiline
                                rows={4}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Chứng Chỉ & Đào Tạo"
                                name="certifications"
                                value={editingDoctor.certifications}
                                onChange={(e) => setEditingDoctor({ ...editingDoctor, certifications: e.target.value })}
                                multiline
                                rows={4}
                                sx={{ mb: 2 }}
                            />
                            <input type="file" name="image" onChange={handleFileChange} />
                        </Grid>
                    </Grid>
                    <DialogActions>
                        <Button type="submit" variant="contained" color="primary">Lưu</Button>
                        <Button onClick={() => setEditingDoctor(null)} variant="contained" color="secondary">Hủy</Button>
                    </DialogActions>
                </form>
                </DialogContent>
                </Dialog>
                )}
        </div>
    );
};

export default DoctorList;
