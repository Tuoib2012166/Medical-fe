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
    const [formData, setFormData] = useState({
        specialty_id: '',
        name: '',
        description: '',
        price: '',
        image: null,
    });
    const [editingSpecialty, setEditingSpecialty] = useState(null);
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

        fetchSpecialties();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa dịch vụ này không?')) {
        try {
            // Nếu là dịch vụ phụ, sử dụng endpoint khác để xóa
            const url = isSubService
                ? `http://localhost:8080/services/${id}`
                : `http://localhost:8080/specialties/${id}`;

            await axios.delete(url);
            setSpecialties(specialties.filter((specialty) => specialty.id !== id));
        } catch (error) {
            console.error('Error deleting specialty:', error);
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

            if (editingSpecialty) {
                await axios.put(`${url}/${editingSpecialty.id}`, data, {
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
            const response = await axios.get('http://localhost:8080/specialties');
            setSpecialties(response.data);
        } catch (error) {
            console.error('Error saving specialty:', error);
        }
    };

    const openDialogHandler = (isSub) => {
        setFormData({ specialty_id: '', name: '', description: '', price: '', image: null });
        setEditingSpecialty(null);
        setIsSubService(isSub); // Đặt trạng thái là dịch vụ phụ hay chính
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
                Thêm Dịch Vụ Chính
            </Button>
            <Button
                variant="contained"
                color="secondary"
                startIcon={<Add />}
                onClick={() => openDialogHandler(true)}
                style={{ marginLeft: 10 }}
            >
                Thêm Dịch Vụ Phụ
            </Button>
            <TableContainer component={Paper} style={{ marginTop: 20 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Tên</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Mô tả</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Giá</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Hình ảnh</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {specialties.map((specialty) => (
                            <TableRow key={specialty.id}>
                                <TableCell>{specialty.name}</TableCell>
                                <TableCell>{specialty.description}</TableCell>
                                <TableCell>{specialty.price}</TableCell>
                                <TableCell>
                                    <img
                                        src={`http://localhost:8080/${specialty.image}`}
                                        alt="Specialty"
                                        style={{ width: 50, height: 50, objectFit: 'cover' }}
                                    />
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
                                            onClick={() => handleDelete(specialty.id)}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>{editingSpecialty ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ'}</DialogTitle>
                <DialogContent>
                    {isSubService && (
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Dịch Vụ Chính</InputLabel>
                            <Select
                                value={formData.specialty_id}
                                name="specialty_id"
                                onChange={handleInputChange}
                                required
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
                        {editingSpecialty ? 'Lưu' : 'Thêm'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SpecialtyList;
