import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle, FormLabel, RadioGroup } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import useUserStore from '../../store/userStore';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2'; // Import SweetAlert2

const today = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));
const todayString = today.toISOString().split("T")[0]; // "YYYY-MM-DD" format

const FollowUpAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [form, setForm] = useState({ id: '', appointment_id: '', followUpDate: todayString, time: '', notes: '', doctorId: '', patient_id: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const { user } = useUserStore();
    const [selectedDate, setSelectedDate] = useState(new Date()); // Mặc định là ngày hôm nay

    const [bookedTimes, setBookedTimes] = useState([]);

    useEffect(() => {
        if (user.profile?.id) {
            fetchAppointments();
        }
    }, [user?.profile?.id, selectedDate]);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/appointments?doctorId=${user.profile?.id}`);
                const patientFromAppt = response.data.map(x => ({ appointment_id: x.id, fullname: x.fullname, patient_id: x.user_id }))

                setPatients(patientFromAppt);
            } catch (error) {
                console.error('Error fetching booked times:', error);
            }
        };

        if (form.followUpDate && user.profile?.id) {
            fetchPatients();
        }
    }, [form.followUpDate, user.profile?.id]);

    useEffect(() => {
        const fetchBookedTimes = async () => {
            if (!user.profile?.id) {
                console.warn("Doctor ID is not available yet.");
                return;
            }

            try {
                const response = await axios.get(
                    `http://localhost:8080/follow-up-appointments?today=${form.followUpDate}&doctorId=${user.profile.id}`
                );

                console.log('run inside here: ', response.data, form.followUpDate)
                setBookedTimes(response.data);
            } catch (error) {
                console.error("Error fetching booked times:", error);
            }
        };

        fetchBookedTimes();
    }, [form.followUpDate, user.profile?.id]);


    const fetchAppointments = async () => {
        try {
            // Kiểm tra nếu selectedDate có giá trị, thêm tham số ngày vào API
            const dateToFetch = selectedDate ? selectedDate.toISOString().split("T")[0] : '';
            const url = selectedDate
                ? `http://localhost:8080/follow-up-appointments?doctorId=${user?.profile?.id}&today=${dateToFetch}`
                : `http://localhost:8080/follow-up-appointments?doctorId=${user?.profile?.id}`;

            const response = await axios.get(url, { withCredentials: true });
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching follow-up appointments:', error);
        }
    };

    useEffect(() => {
        if (user.profile?.id) {
            fetchAppointments();
        }
    }, [user?.profile?.id, selectedDate]);


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

        const patient_id = patients.find(x => x.appointment_id === form.appointment_id)?.patient_id
        try {
            let data = {
                ...form,
                doctor_id: +user.profile.id,
                doctorId: +user.profile.id,
                patient_id: patient_id
            };
            if (isEditing) {
                console.log('run inside hre: ', isEditing)
                await axios.put(`http://localhost:8080/follow-up-appointments/${form.id}`, data, { withCredentials: true });
                setSnackbarMessage('Lịch tái khám đã được cập nhật');
            } else {
                await axios.post('http://localhost:8080/follow-up-appointments', data, { withCredentials: true });

                Swal.fire({
                    title: 'Lịch tái khám đã được thêm mới!',
                    icon: 'success',
                }).then(() => {
                    window.location.reload(); // Tải lại trang sau khi thêm thành công
                });
            }


            setForm({ id: '', appointment_id: '', followUpDate: '', time: '', notes: '', doctorId: '', patient_id: '' });
            setIsEditing(false);
            setOpenDialog(false);
            setOpenSnackbar(true);
            fetchAppointments();
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

            Swal.fire({
                title: 'Lịch tái khám đã được xóa!',
                icon: 'success',
            }).then(() => {
                window.location.reload(); // Tải lại trang sau khi thêm thành công
            });
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

    console.log("this is bookedTimes: ", bookedTimes);

    return (
        <div>
            <h3>Lịch tái khám</h3>
            <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
                Thêm lịch tái khám
            </Button>
            <div>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)} // Khi xóa ngày, date sẽ là null
                    dateFormat="yyyy/MM/dd"
                    placeholderText="Chọn ngày"
                    isClearable
                />
            </div>

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
                                    <IconButton onClick={() => handleEdit(appointment)} color="primary" variant="contained" title="Sửa">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => {
                                            if (window.confirm('Bạn có chắc chắn muốn xóa lịch tái khám này không?')) {
                                                handleDelete(appointment.id);
                                            }
                                        }}
                                        variant="contained"
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
                                name="appointment_id" // This should be "appointment_id" to match your form state
                                value={form.appointment_id}
                                onChange={handleInputChange}
                                required
                            >
                                <MenuItem value="">Chọn bệnh nhân</MenuItem>
                                {patients.map(patient => (
                                    <MenuItem key={patient.appointment_id} value={patient.appointment_id}>
                                        {patient.fullname}
                                    </MenuItem>
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
                            inputProps={{
                                min: new Date().toISOString().split("T")[0], // Chỉ cho phép chọn ngày từ hôm nay trở đi
                            }}
                        />

                        <FormControl required>
                            <FormLabel>Chọn giờ</FormLabel>
                            <RadioGroup
                                row
                                name="time"
                                value={form.time}
                                onChange={handleInputChange}
                                sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px' }}
                            >
                                {[...Array(10)].map((_, index) => {
                                    const hour = 8 + index; // Generate hours from 08:00 to 17:00
                                    const timeLabel = `${hour.toString().padStart(2, '0')}:00`;

                                    // Filter booked times for the selected date (assuming form.date stores the current date in ISO format)
                                    const selectedDate = form.time; // Adjust to match your data structure
                                    const bookedTimesForDate = bookedTimes
                                        .filter(item => item.follow_up_date.startsWith(selectedDate)) // Match date only
                                        .map(item => item.time);

                                    // Check if the current timeLabel is booked
                                    const isDisabled = bookedTimesForDate.includes(timeLabel);

                                    return (
                                        <Button
                                            key={timeLabel}
                                            variant={form.time === timeLabel ? "contained" : "outlined"} // Highlight the selected time
                                            color={isDisabled ? "default" : "primary"} // Adjust color based on availability
                                            onClick={() => !isDisabled && handleInputChange({ target: { name: 'time', value: timeLabel } })} // Allow selection only if enabled
                                            disabled={isDisabled} // Disable if booked
                                            sx={{
                                                padding: '10px 20px',
                                                margin: '5px',
                                                borderRadius: '20px',
                                                textTransform: 'none',
                                                fontWeight: 500,
                                                boxShadow: isDisabled ? 'none' : '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                '&:hover': {
                                                    backgroundColor: isDisabled ? 'transparent' : 'rgba(0, 0, 0, 0.08)',
                                                },
                                            }}
                                        >
                                            {timeLabel}
                                        </Button>
                                    );
                                })}
                            </RadioGroup>
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
                            <Button onClick={handleCloseDialog} variant="contained" color="secondary">
                                Hủy
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
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
