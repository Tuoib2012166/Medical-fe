import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

const FollowUpAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [form, setForm] = useState({ id: '', patientName: '', followUpDate: '', time: '', notes: '', doctorId: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        fetchAppointments();
        fetchPatients();
        fetchDoctors();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:8080/follow-up-appointments', { withCredentials: true });
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching follow-up appointments:', error);
        }
    };

    const fetchPatients = async () => {
        try {
            const response = await axios.get('http://localhost:8080/patients', { withCredentials: true });
            setPatients(response.data);
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    };

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:8080/doctors', { withCredentials: true });
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const today = new Date().toISOString().split('T')[0];
        if (form.followUpDate < today) {
            alert('Ngày tái khám không thể là ngày trong quá khứ');
            return;
        }
        try {
            if (isEditing) {
                await axios.put(`http://localhost:8080/follow-up-appointments/${form.id}`, form, { withCredentials: true });
                setSnackbarMessage('Lịch tái khám đã được cập nhật');
            } else {
                await axios.post('http://localhost:8080/follow-up-appointments', form, { withCredentials: true });
                setSnackbarMessage('Lịch tái khám đã được thêm mới');
            }
            fetchAppointments();
            setForm({ id: '', patientName: '', followUpDate: '', time: '', notes: '', doctorId: '' });
            setIsEditing(false);
            setOpenDialog(false);
            setOpenSnackbar(true);
        } catch (error) {
            console.error('Error saving follow-up appointment:', error);
        }
    };

    const handleEdit = (appointment) => {
        setForm(appointment);
        setIsEditing(true);
        setOpenDialog(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/follow-up-appointments/${id}`, { withCredentials: true });
            fetchAppointments();
            setSnackbarMessage('Lịch tái khám đã được xóa');
            setOpenSnackbar(true);
        } catch (error) {
            console.error('Error deleting follow-up appointment:', error);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // Tạo danh sách giờ từ 8h đến 17h
    const availableTimes = Array.from({ length: 10 }, (_, i) => {
        const hour = i + 8; // Bắt đầu từ 8h đến 17h
        return `${hour < 10 ? '0' : ''}${hour}:00`;
    });

    return (
        <div>
            <h3>Lịch tái khám</h3>
            <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
                Thêm lịch tái khám
            </Button>

            <TableContainer component={Paper} className="mt-3">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Bệnh nhân</TableCell>
                            <TableCell>Bác sĩ</TableCell>
                            <TableCell>Ngày tái khám</TableCell>
                            <TableCell>Giờ tái khám</TableCell>
                            <TableCell>Ghi chú</TableCell>
                            <TableCell>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appointments.map(appointment => (
                            <TableRow key={appointment.id}>
                                <TableCell>{appointment.patient_name}</TableCell>
                                <TableCell>{appointment.doctor_name}</TableCell>
                                <TableCell>{new Date(appointment.follow_up_date).toLocaleDateString()}</TableCell>
                                <TableCell>{appointment.time}</TableCell>
                                <TableCell>{appointment.notes}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEdit(appointment)} color="primary" title="Sửa">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => {
                                            if (window.confirm('Bạn có chắc chắn muốn xóa lịch tái khám này không?')) {
                                                handleDelete(appointment.id);
                                            }
                                        }}
                                        color="secondary"
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

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />

            {/* Modal Form */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{isEditing ? 'Cập nhật lịch tái khám' : 'Thêm lịch tái khám'}</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Bệnh nhân</InputLabel>
                            <Select
                                name="patientName"
                                value={form.patientName}
                                onChange={handleInputChange}
                                required
                            >
                                <MenuItem value="">Chọn bệnh nhân</MenuItem>
                                {patients.map(patient => (
                                    <MenuItem key={patient.id} value={patient.id}>{patient.fullname}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <InputLabel>Bác sĩ</InputLabel>
                            <Select
                                name="doctorId"
                                value={form.doctorId}
                                onChange={handleInputChange}
                                required
                            >
                                <MenuItem value="">Chọn bác sĩ</MenuItem>
                                {doctors.map(doctor => (
                                    <MenuItem key={doctor.id} value={doctor.id}>{doctor.fullname}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            label="Ngày tái khám"
                            type="date"
                            name="followUpDate"
                            value={form.followUpDate}
                            onChange={handleInputChange}
                            required
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ min: new Date().toISOString().split('T')[0] }} // Chỉ nhận ngày hiện tại hoặc tương lai
                        />

                        <FormControl fullWidth margin="normal">
                            <InputLabel>Giờ tái khám</InputLabel>
                            <Select
                                name="time"
                                value={form.time}
                                onChange={handleInputChange}
                                required
                            >
                                <MenuItem value="">Chọn giờ</MenuItem>
                                {availableTimes.map(time => (
                                    <MenuItem key={time} value={time}>{time}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            label="Ghi chú"
                            name="notes"
                            value={form.notes}
                            onChange={handleInputChange}
                            multiline
                            fullWidth
                            margin="normal"
                            rows={4}
                        />

                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="primary">
                                Hủy
                            </Button>
                            <Button type="submit" color="primary">
                                {isEditing ? 'Cập nhật' : 'Thêm'}
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default FollowUpAppointments;
