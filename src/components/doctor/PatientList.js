import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { MdEdit, MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2'; // Import SweetAlert2

const PatientList = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const [openDialog, setOpenDialog] = useState(false); // Trạng thái của Dialog để thêm người dùng
    const [errors, setErrors] = useState({}); // Lưu trữ lỗi kiểm tra dữ liệu
    const [newUser, setNewUser] = useState({ 
    username: '', 
    password: '', 
    fullname: '', 
    phone: '', 
    email: '',  // Thêm email
    address: '', 
    gender: 'Nam', 
    birth_year: '' 
    });
    const [formData, setFormData] = useState({ 
    id: '', 
    fullname: '', 
    username: '', 
    phone: '', 
    email: '',  // Thêm email
    address: '', 
    gender: 'Nam', 
    birth_year: '' 
    });


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/patients');
                setUsers(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách người dùng:', error);
            }
        };

        fetchUsers();
    }, []);

    const validateUserData = (user) => {
        const errors = {};

        // Kiểm tra tên đăng nhập (phải có ít nhất 4 ký tự)
        if (user.username.length < 4) {
            errors.username = "Tên đăng nhập phải có ít nhất 4 ký tự.";
        }

        // Kiểm tra họ và tên (không chứa số và ký tự đặc biệt)
        const nameRegex = /^[a-zA-Zàáảãạâầấẩẫậăằắẳẵặđèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựýỳỷỹỵ\s]+$/;

        // Kiểm tra số điện thoại (đúng định dạng)
        const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;
        if (!phoneRegex.test(user.phone)) {
            errors.phone = "Số điện thoại không đúng định dạng.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(user.email)) {
            errors.email = "Email không đúng định dạng.";
        }

        // Kiểm tra năm sinh (phải nằm trong phạm vi hợp lệ, ví dụ 1900 đến năm hiện tại)
        const currentYear = new Date().getFullYear();
        if (user.birth_year < 1900 || user.birth_year > currentYear) {
            errors.birth_year = "Năm sinh không hợp lệ.";
        }

        return errors;
    };

    

    const handleEditClick = (user) => {
        setEditingUser(user);
        setFormData({ id: user.id, fullname: user.fullname, username: user.username, phone: user.phone, address: user.address, gender: user.gender, birth_year: user.birth_year });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleNewUserChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateUserData(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); // Hiển thị lỗi nếu có
            return;
        }

        try {
            await axios.put(`http://localhost:8080/patients/${formData.id}`, formData);
            setUsers(users.map(user => user.id === formData.id ? { ...user, ...formData } : user));
            setEditingUser(null);
            setOpenDialog(false);
        } catch (error) {
            console.error('Lỗi khi cập nhật người dùng:', error);
        }
    };

    

    // Xác nhận trước khi xóa người dùng
    const handleDeleteClick = async (id) => {
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa người dùng này?");
        if (isConfirmed) {
            try {
                await axios.delete(`http://localhost:8080/patients/${id}`);
                setUsers(users.filter(user => user.id !== id));
            } catch (error) {
                console.error('Lỗi khi xóa người dùng:', error);
            }
        }
    };

    const handleAddUser = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu username đã tồn tại
    const isUsernameDuplicate = users.some(user => user.username === newUser.username);
    if (isUsernameDuplicate) {
        setErrors({ username: "Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác." });
        return;
    }

    const validationErrors = validateUserData(newUser);
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors); // Hiển thị lỗi nếu có
        return;
    }

    try {
        const response = await axios.post('http://localhost:8080/patients', newUser);
        Swal.fire({
            title: 'Thêm bệnh nhân thành công!',
            icon: 'success',
        }).then(() => {
            window.location.reload(); // Tải lại trang sau khi thêm thành công
        });
        setUsers([...users, response.data]); // Thêm người dùng vào danh sách
        setNewUser({ username: '', password: '', fullname: '', phone: '', address: '', gender: 'Nam', birth_year: '' }); // Reset form
        setShowAddUserForm(false); // Đóng Dialog
        setErrors({}); // Xóa lỗi
    } catch (error) {
        console.error('Lỗi khi thêm người dùng:', error);
    }
};

    return (
        <div>
            <h3>Quản lý bệnh nhân</h3>
            <Button variant="contained" color="primary" onClick={() => setShowAddUserForm(!showAddUserForm)}>Thêm bệnh nhân mới</Button>
            
            {/* Dialog thêm người dùng */}
            <Dialog open={showAddUserForm} onClose={() => setShowAddUserForm(false)}
                >
                <DialogTitle>Thêm bệnh nhân mới</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleAddUser}>
                        <TextField
                            label="Tên đăng nhập"
                            name="username"
                            value={newUser.username}
                            onChange={handleNewUserChange}
                            fullWidth
                            required
                            margin="normal"
                            error={!!errors.username} // Hiển thị lỗi nếu có
                            helperText={errors.username} // Nội dung thông báo lỗi
                        />
                        <TextField
                            label="Mật khẩu"
                            type="password"
                            name="password"
                            value={newUser.password}
                            onChange={handleNewUserChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            label="Họ và tên"
                            name="fullname"
                            value={newUser.fullname}
                            onChange={handleNewUserChange}
                            fullWidth
                            required
                            margin="normal"
                            error={!!errors.fullname} // Chỉ hiển thị lỗi khi có lỗi
                            helperText={errors.fullname}
                        />
                        <TextField
                            label="Số điện thoại"
                            name="phone"
                            value={newUser.phone}
                            onChange={handleNewUserChange}
                            fullWidth
                            required
                            margin="normal"
                            error={!!errors.phone} // Chỉ hiển thị lỗi khi có lỗi
                            helperText={errors.phone}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={newUser.email}
                            onChange={handleNewUserChange}
                            fullWidth
                            required
                            margin="normal"
                            error={!!errors.email} // Hiển thị lỗi nếu có
                            helperText={errors.email} // Nội dung thông báo lỗi
                        />
                        <TextField
                            label="Địa chỉ"
                            name="address"
                            value={newUser.address}
                            onChange={handleNewUserChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Giới tính</InputLabel>
                            <Select
                                name="gender"
                                value={newUser.gender}  // Giá trị được bind từ state
                                onChange={handleNewUserChange}
                                label="Giới tính"
                                required
                            >
                                <MenuItem value="Nam">Nam</MenuItem>
                                <MenuItem value="Nữ">Nữ</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Năm sinh"
                            type="number"
                            name="birth_year"
                            value={newUser.birth_year}
                            onChange={handleNewUserChange}
                            fullWidth
                            required
                            margin="normal"
                            error={!!errors.birth_year} // Chỉ hiển thị lỗi khi có lỗi
                            helperText={errors.birth_year}
                        />
                        <DialogActions>
                            <Button type="submit" variant="contained" color="primary">Thêm người dùng</Button>
                            <Button onClick={() => setShowAddUserForm(false)} variant="contained" color="secondary">Hủy</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Bảng danh sách người dùng */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Username</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Tên</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Số điện thoại</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Email</TableCell> {/* Thêm Email */}
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Năm sinh</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Địa chỉ</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.fullname}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{user.email}</TableCell> {/* Hiển thị Email */}
                                <TableCell>{user.birth_year}</TableCell>
                                <TableCell>{user.address}</TableCell>
                                <TableCell>
                                    <Button 
                                        variant="contained" 
                                        color="primary"  
                                        onClick={() => handleEditClick(user)}
                                        startIcon={<MdEdit />}
                                    >
                                        Sửa
                                    </Button>
                                    <Button 
                                        variant="contained" 
                                        color="secondary" 
                                        onClick={() => handleDeleteClick(user.id)}
                                        startIcon={<MdDelete />}
                                    >
                                        Xóa
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog sửa người dùng */}
            <Dialog open={!!editingUser} onClose={() => setEditingUser(null)}>
                <DialogTitle> </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleFormSubmit}>
                        <TextField
                            label="Tên đăng nhập"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            disabled
                        />
                        <TextField
                            label="Họ và tên"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            error={!!errors.fullname} // Chỉ hiển thị lỗi khi có lỗi
                            helperText={errors.fullname}
                        />
                        <TextField
                            label="Số điện thoại"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            error={!!errors.phone} // Chỉ hiển thị lỗi khi có lỗi
                            helperText={errors.phone}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            error={!!errors.email} // Hiển thị lỗi nếu có
                            helperText={errors.email} // Nội dung thông báo lỗi
                        />
                        <TextField
                            label="Địa chỉ"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Giới tính</InputLabel>
                            <Select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                label="Giới tính"
                            >
                                <MenuItem value="Nam">Nam</MenuItem>
                                <MenuItem value="Nữ">Nữ</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Năm sinh"
                            type="number"
                            name="birth_year"
                            value={formData.birth_year}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            error={!!errors.birth_year} // Chỉ hiển thị lỗi khi có lỗi
                            helperText={errors.birth_year}
                        />
                        <DialogActions>
                            <Button type="submit" variant="contained" color="primary">Cập nhật</Button>
                            <Button onClick={() => setEditingUser(null)} variant="contained" color="secondary">Hủy</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PatientList;
