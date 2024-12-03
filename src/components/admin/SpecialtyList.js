import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button,
    IconButton, Tooltip, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import Swal from 'sweetalert2'; // Import SweetAlert2

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
    const [editingItem, setEditingItem] = useState(null);
    const [isService, setIsService] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [specialtiesRes, servicesRes] = await Promise.all([
                    axios.get('http://localhost:8080/specialties'),
                    axios.get('http://localhost:8080/services'),
                ]);
                setSpecialties(specialtiesRes.data);
                setServices(servicesRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    const openDialogHandler = (type, item = null) => {
        setIsService(type === 'service');
        setEditingItem(item);
        setFormData({
            specialty_id: item?.specialty_id || '',
            name: item?.name || '',
            description: item?.description || '',
            price: item?.price || '',
            image: null,
        });
        setOpenDialog(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let url = "";
            let method = ""
            if (isService) {
                method = "post"
                url = "http://localhost:8080/services"

                if (!!editingItem['id']) {
                    method = "put";
                    url = "http://localhost:8080/services" + `/${editingItem.id}`
                }
            } else {
                if (editingItem?.id) {
                    method = "put"
                    url = `http://localhost:8080/specialties${editingItem ? `/${editingItem.id}` : ''}`;
                } else {
                    method = "post"
                    url = `http://localhost:8080/specialties`;
                }
            }

            await axios({
                method,
                url,
                data: formData
            });
            // Refresh data
            const [specialtiesRes, servicesRes] = await Promise.all([
                axios.get('http://localhost:8080/specialties'),
                axios.get('http://localhost:8080/services'),
            ]);
            setSpecialties(specialtiesRes.data);
            setServices(servicesRes.data);
            Swal.fire({
            title: 'Thêm dịch vụ thành công!',
            icon: 'success',
            }).then(() => {
            window.location.reload(); // Tải lại trang sau khi thêm thành công
            });
            setOpenDialog(false);
            setEditingItem(null);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleDelete = async (id, type) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa mục này không?')) {
            try {
                const url = type === 'service'
                    ? `http://localhost:8080/services/${id}`
                    : `http://localhost:8080/specialties/${id}`;
                await axios.delete(url);

                if (type === 'service') {
                    setServices(services.filter((service) => service.id !== id));
                } else {
                    setSpecialties(specialties.filter((specialty) => specialty.id !== id));
                }
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };

    return (
        <div>
            <h3>Quản lý Dịch Vụ</h3>
            <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={() => openDialogHandler('specialty')}
            >
                Thêm Dịch Vụ 
            </Button>

            <TableContainer component={Paper} style={{ marginTop: 20 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Tên</TableCell>
                            <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Mô tả</TableCell>
                            <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Hình ảnh</TableCell>
                            <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Giá (VNĐ)</TableCell>
                            <TableCell align="center" style={{ backgroundColor: '#007bff', color: 'white' }}>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {specialties.map((specialty) => (
                            <React.Fragment key={specialty.id}>
                                <TableRow align="center" style={{ backgroundColor: '#ADD8E6', color: 'white' }}>
                                    <TableCell>{specialty.name}</TableCell>
                                    <TableCell>{specialty.description}</TableCell>
                                    <TableCell>
                                        <img
                                            src={`http://localhost:8080/${specialty.image}`}
                                            alt="Specialty"
                                            style={{ width: 50, height: 50 }}
                                        />
                                    </TableCell>
                                    <TableCell>-</TableCell>
                                    <TableCell>
                                        <Tooltip title="Sửa">
                                            <IconButton
                                                color="primary"
                                                onClick={() => openDialogHandler('specialty', specialty)}
                                            >
                                                <Edit />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Xóa">
                                            <IconButton
                                                color="error"
                                                onClick={() => handleDelete(specialty.id, 'specialty')}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Thêm Dịch Vụ Phụ">
                                            <IconButton
                                                color="secondary"
                                                onClick={() =>
                                                    openDialogHandler('service', { specialty_id: specialty.id })
                                                }
                                            >
                                                <Add />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                                {services
                                    .filter((service) => service.specialty_id === specialty.id)
                                    .map((service) => (
                                        <TableRow key={service.id} style={{ backgroundColor: '#f9f9f9' }}>
                                            <TableCell style={{ paddingLeft: 40 }}>{service.name}</TableCell>
                                            <TableCell>{service.description}</TableCell>
                                            <TableCell>-</TableCell>
                                            <TableCell>{service.price}</TableCell>
                                            <TableCell>
                                                <Tooltip title="Sửa">
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => openDialogHandler('service', service)}
                                                    >
                                                        <Edit />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Xóa">
                                                    <IconButton
                                                        color="error"
                                                        onClick={() => handleDelete(service.id, 'service')}
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>
                    {editingItem ? 'Chỉnh sửa' : 'Thêm'} {isService ? 'Dịch Vụ Phụ' : 'Dịch Vụ Chính'}
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        {isService && (
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Dịch Vụ Chính</InputLabel>
                                <Select
                                    value={formData.specialty_id}
                                    name="specialty_id"
                                    onChange={handleInputChange}
                                    disabled={!!editingItem}
                                >
                                    {specialties.map((specialty) => (
                                        <MenuItem key={specialty.id} value={specialty.id}>
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
                        {isService && (
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Giá"
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleInputChange}
                            />
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
                        <Button type="submit" variant="contained" color="primary">
                            {editingItem ? 'Lưu' : 'Thêm'}
                        </Button>
                    </DialogActions>
                </form>

            </Dialog>
        </div>
    );
};

export default SpecialtyList;
