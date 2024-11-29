import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button,
    IconButton, Tooltip, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';

const SpecialtyList = () => {
    const [specialties, setSpecialties] = useState([]);
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({
        specialty_id: '',   
        name: '',
        description: '',
        price: '',
        image: null,
    });
    const [editingSpecialty, setEditingSpecialty] = useState(null);
    const [editingService, setEditingService] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [isSubService, setIsSubService] = useState(false); // Xác định loại dịch vụ (chính/phụ)

    useEffect(() => {
        const fetchSpecialties = async () => {
            try {
                const response = await axios.get('http://localhost:8080/specialties');
                setSpecialties(response.data);
            } catch (error) {
                console.error('Error fetching specialties:', error);
            }
        };

        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:8080/services');
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchSpecialties();
        fetchServices();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleDelete = async (id, isService) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa dịch vụ này không?')) {
            try {
                const url = isService
                    ? `http://localhost:8080/services/${id}`
                    : `http://localhost:8080/specialties/${id}`;

                await axios.delete(url);
                if (isService) {
                    setServices(services.filter((service) => service.id !== id));
                } else {
                    setSpecialties(specialties.filter((specialty) => specialty.id !== id));
                }
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('specialty_id', formData.specialty_id); // Thêm field để tạo dịch vụ phụ
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            const url = isSubService
                ? 'http://localhost:8080/services' // API cho dịch vụ phụ
                : 'http://localhost:8080/specialties'; // API cho dịch vụ chính

            if (editingService) {
                await axios.put(`${url}/${editingService.id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                await axios.post(url, data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }

            setOpenDialog(false);
            setFormData({ specialty_id: '', name: '', description: '', price: '', image: null });
            setEditingSpecialty(null);
            setEditingService(null);
            // Re-fetch the specialties and services
            await Promise.all([
                axios.get('http://localhost:8080/specialties').then((res) => setSpecialties(res.data)),
                axios.get('http://localhost:8080/services').then((res) => setServices(res.data)),
            ]);
        } catch (error) {
            console.error('Error saving specialty or service:', error);
        }
    };

    const openDialogHandler = (isSub, specialtyId = null) => {
        setFormData({ specialty_id: '', name: '', description: '', price: '', image: null });
        setEditingSpecialty(null);
        setEditingService(null);
        setIsSubService(isSub); // Đặt trạng thái là dịch vụ phụ hay chính
        if (isSub && specialtyId) {
            setFormData({ ...formData, specialty_id: specialtyId });
        }
        setOpenDialog(true);
    };

    return (
        <div>
            <h3>Quản lý Dịch Vụ</h3>
            <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={() => openDialogHandler(false)}
            >
                Thêm Dịch Vụ
            </Button>

            {/* Table for Specialties with Subservices listed in a new column */}
            <h4>Dịch Vụ Chính</h4>
            <TableContainer component={Paper} style={{ marginTop: 20 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{
                                backgroundColor: '#007bff',
                                color: 'white',
                                width: '200px', // Giới hạn chiều rộng của cột
                                overflow: 'hidden', // Ẩn phần nội dung ngoài giới hạn
                                textOverflow: 'ellipsis', // Thêm dấu chấm ba nếu nội dung quá dài
                                whiteSpace: 'nowrap', // Ngăn chặn nội dung xuống dòng
                            }}>Tên</TableCell>
                            <TableCell style={{
                                backgroundColor: '#007bff',
                                color: 'white',
                                width: '800px', // Giới hạn chiều rộng của cột
                                overflow: 'hidden', // Ẩn phần nội dung ngoài giới hạn
                                textOverflow: 'ellipsis', // Thêm dấu chấm ba nếu nội dung quá dài
                                whiteSpace: 'nowrap', // Ngăn chặn nội dung xuống dòng
                            }}>Mô tả</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Hình ảnh</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Dịch Vụ Phụ</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {specialties.map((specialty) => {
                            const subServices = services.filter(service => service.specialty_id === specialty.id);
                            return (
                                <TableRow key={specialty.id}>
                        <TableCell>{specialty.name}</TableCell>
                        <TableCell>{specialty.description}</TableCell>
                        <TableCell>
                            <img
                            src={`http://localhost:8080/${specialty.image}`}
                            alt="Specialty"
                            style={{ width: 50, height: 50, objectFit: 'cover' }}
                            />
                        </TableCell>
                        <TableCell>
                            {subServices.length > 0 ? subServices.map((service, index) => (
                            <div
                                key={service.id}
                                style={{
                                borderBottom: '1px solid #ddd',  // Dòng kẻ dưới mỗi dịch vụ
                                padding: '5px 0',  // Khoảng cách giữa các dịch vụ phụ
                                backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#87CEFA'  // Đổi màu nền luân phiên
                                }}
                            >
                                {service.name}
                            </div>
                            )) : <span>Chưa có</span>}
                        </TableCell>
                        <TableCell>
                            <Tooltip title="Sửa">
                            <IconButton
                                color="primary"
                                onClick={() => setEditingSpecialty(specialty)}
                            >
                                <Edit />
                            </IconButton>
                            </Tooltip>
                            <Tooltip title="Xóa">
                            <IconButton
                                color="error"
                                onClick={() => handleDelete(specialty.id, false)}
                            >
                                <Delete />
                            </IconButton>
                            </Tooltip>
                            <Tooltip title="Thêm Dịch Vụ Phụ">
                            <IconButton
                                color="secondary"
                                onClick={() => openDialogHandler(true, specialty.id)}
                            >
                                <Add />
                            </IconButton>
                            </Tooltip>
                        </TableCell>
                        </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog for Adding/Editing Services */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>{editingSpecialty || editingService ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ'}</DialogTitle>
                <DialogContent>
                    {isSubService && !editingService && (
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Dịch Vụ Chính</InputLabel>
                            <Select
                                value={formData.specialty_id}
                                name="specialty_id"
                                onChange={handleInputChange}
                                required
                                disabled={editingService}  // Không cho phép chọn dịch vụ chính khi chỉnh sửa dịch vụ phụ
                            >
                                {specialties.map((specialty) => (
                                    <MenuItem value={specialty.id} key={specialty.id}>
                                        {specialty.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Tên"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Mô tả"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Giá"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                    />
                    <input type="file" onChange={handleFileChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        {editingSpecialty || editingService ? 'Lưu' : 'Thêm'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SpecialtyList;
