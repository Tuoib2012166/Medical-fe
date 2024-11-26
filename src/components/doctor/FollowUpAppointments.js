import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import useUserStore from '../../store/userStore';

const today = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));
const todayString = today.toISOString().split("T")[0]; // "YYYY-MM-DD" format

const FollowUpAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [form, setForm] = useState({ id: '', patientName: '', followUpDate: todayString, time: '', notes: '', doctorId: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const { user } = useUserStore();

    const [bookedTimes, setBookedTimes] = useState([]);

    useEffect(() => {
        if (user.profile) {
            fetchAppointments();
            fetchPatients();
        }
    }, [user]);

    useEffect(() => {
        if (user.profile) {
            fetchAppointments();
        }
    }, [user, form.followUpDate]);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/follow-up-appointments?doctorId=${user?.profile?.id}&today=${form.followUpDate}`, { withCredentials: true });
            const hours = response.data.map(i => i.time);
            setBookedTimes(hours)
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching follow-up appointments:', error);
        }
    };

    const fetchPatients = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/patients?doctorId=${user?.profile?.id}`, { withCredentials: true });
            setPatients(response.data);
        } catch (error) {
            console.error('Error fetching patients:', error);
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
            let data = {
                ...form,
                doctor_id: user.profile.id,
                doctorId: user.profile.id
            };
            if (isEditing) {
                await axios.put(`http://localhost:8080/follow-up-appointments/${form.id}`, data, { withCredentials: true });
                setSnackbarMessage('Lịch tái khám đã được cập nhật');
            } else {
                await axios.post('http://localhost:8080/follow-up-appointments', data, { withCredentials: true });
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

    // Generate available times from 8 AM to 5 PM
    const availableTimes = Array.from({ length: 10 }, (_, i) => {
        const hour = i + 8; // Start from 8 AM to 5 PM
        return `${hour.toString().padStart(2, '0')}:00`;
    });

    const filteredAvailableTimes = availableTimes.filter(time => {
        // If we're selecting today
        if (form.followUpDate === todayString) {
            return !appointments.some(
                appointment => appointment.follow_up_date === form.followUpDate && appointment.time === time
            );
        }

        // If no appointments for tomorrow, show all available times
        return true; // Allow all times if no appointments exist for the selected date (tomorrow)
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
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Bệnh nhân</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Bác sĩ</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Ngày tái khám</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Giờ tái khám</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Ghi chú</TableCell>
                            <TableCell style={{ backgroundColor: '#007bff', color: 'white' }}>Hành động</TableCell>
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

                        <TextField
                            label="Bác sĩ"
                            name="doctorId"
                            value={form.doctorId || user?.profile?.fullname}
                            onChange={handleInputChange}
                            required
                            fullWidth
                            margin="normal"
                        />

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
                        />

                        <FormControl fullWidth>
                            <InputLabel>Chọn giờ</InputLabel>
                            <Select
                                name="time"
                                value={form.time}
                                onChange={handleInputChange}
                                label="Chọn giờ"
                            >
                                {[...Array(24).keys()].map((hour) => {
                                    const hourString = hour < 10 ? `0${hour}:00` : `${hour}:00`; // Format the hour
                                    return (
                                        <MenuItem
                                            key={hourString}
                                            value={hourString}
                                            disabled={bookedTimes.includes(hourString)}  // Disable if the time is booked
                                        >
                                            {hourString}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>

                        <TextField
                            label="Ghi chú"
                            name="notes"
                            value={form.notes}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
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
