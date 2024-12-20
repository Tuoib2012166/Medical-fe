import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { TextField, Button, Radio, RadioGroup, FormControlLabel, Typography, FormControl, FormLabel, MenuItem, Select, InputLabel, Box } from '@mui/material';

const GetForm = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    phone: '',
    address: '',
    gender: 'Nam',
    birthYear: '',
    content: '',
    appointmentDate: new Date().toISOString().split('T')[0],
    appointmentTime: '',
    doctorId: '',
    specialtyId: '',
    userId: '',
  });

  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [uniqueAppointments, setUniqueAppointments] = useState([]);
  const [bookedTimes, setBookedTimes] = useState([]);
  const isFirstRender = useRef(true);
  const now = new Date();
  const currentTime = now.getHours() + ':' + now.getMinutes();


  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFormData(prevFormData => ({
          ...prevFormData,
          userId: response.data.profile.id,
          fullname: response.data.profile.fullname,
          phone: response.data.profile.phone,
          email: response.data.profile.email,
          address: response.data.profile.address
          
        }));
      } catch (error) {
        // Handle error here
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await axios.get('http://localhost:8080/specialties');
        setSpecialties(response.data);
      } catch (error) {
        console.error('Error fetching specialties:', error);
      }
    };

    if (isFirstRender.current) {
      fetchSpecialties();
      isFirstRender.current = false;
    }
  }, []);

  useEffect(() => {
  const fetchUniqueAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/appointments/appointmenthavebook');
      
      // Filter appointments with status 'pending'
      const filteredAppointments = response.data.filter(appointment => appointment.status === 'pending');
      
      setUniqueAppointments(filteredAppointments);
    } catch (error) {
      console.error('Error fetching unique appointments:', error);
    }
  };

  fetchUniqueAppointments();
}, []);


  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'specialtyId' && value) {
      try {
        const response = await axios.get(`http://localhost:8080/doctors?specialtyId=${value}`);
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    }

    // if (name === 'doctorId' || name === 'appointmentDate') {
    //   console.log(formData.appointmentDate)
    //   console.log(formData.doctorId)
    //   const filteredAppointments = uniqueAppointments.filter(appointment =>
    //     appointment.doctor_id === (name == 'doctorId' ? value : formData.doctorId) &&
    //     new Date(appointment.appointment_date).toISOString().split('T')[0] === (name === 'appointmentDate' ? value : formData.appointmentDate)

    //   );
    //   console.log("filteredAppointments", filteredAppointments);
    //   console.log("filteredAppointments", uniqueAppointments);
    //   setBookedTimes(filteredAppointments.map(appointment => appointment.appointment_time.substring(0, 5)));
    // }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:8080/appointments/book-appointment', formData);
    if (response.status === 200) {
      // Sử dụng SweetAlert2 để hiển thị thông báo thành công
      Swal.fire({
        title: 'Thành công!',
        text: 'Bạn đã đặt lịch khám thành công! Vui lòng tới trung tâm đúng ngày và giờ hẹn.',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        // Reload lại trang sau khi người dùng nhấn "OK"
        window.location.reload();
      });

      // Reset form (nếu cần trong quá trình thực thi)
      setFormData({
        fullname: '',
        phone: '',
        email: '',
        address: '',
        gender: '',
        birthYear: '',
        content: '',
        appointmentDate: '',
        appointmentTime: '',
        doctorId: '',
        specialtyId: '',
        userId: '',
      });
    }
  } catch (error) {
    // Kiểm tra lỗi từ API
    if (error.response && error.response.status === 400) {
      Swal.fire({
        title: 'Lịch hẹn đã tồn tại!',
        text: 'Lịch hẹn đã tồn tại. Vui lòng chọn thời gian khác!',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    } else {
      Swal.fire({
        title: 'Lỗi!',
        text: 'Có lỗi xảy ra khi gửi form, vui lòng thử lại!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }
};


  const today = new Date().toISOString().split('T')[0];
  console.log("bookedTimes", bookedTimes);

  useEffect(() => {
  const fetchBookedTimes = async () => {
    if (!formData.doctorId) {
      console.warn("Doctor ID is not available yet.");
      return;
    }

    try {
      const [resAppointments, resFollowUpAppointments] = await Promise.all([
        axios.get(`http://localhost:8080/appointments?today=${formData.appointmentDate}&doctorId=${formData.doctorId}`),
        axios.get(`http://localhost:8080/follow-up-appointments?today=${formData.appointmentDate}&doctorId=${formData.doctorId}`),
      ]);

      const appointments = resAppointments.data.map((appointment) => ({
        date: appointment.appointment_date,
        time: appointment.appointment_time,
      }));

      const followUpAppointments = resFollowUpAppointments.data.map((followUp) => ({
        date: followUp.follow_up_date,
        time: followUp.time,
      }));

      const combinedBookedTimes = [...appointments, ...followUpAppointments].map((entry) =>
        `${entry.time.substring(0, 5)}`
      );

      setBookedTimes(combinedBookedTimes);
    } catch (error) {
      console.error("Error fetching booked times:", error);
    }
  };

  if (formData.appointmentDate && formData.doctorId) {
    fetchBookedTimes();
  }
}, [formData.appointmentDate, formData.doctorId]);

  return (
    <div sx={{ textAlign: 'center', my: 4 }}>
      <Box
      sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundImage: "url('img/sidebar/bgLogin4.jpg')", // Đường dẫn ảnh nền
      backgroundSize: "cover", // Ảnh bao phủ toàn màn hình
      backgroundPosition: "center", // Căn giữa ảnh
      backgroundRepeat: "no-repeat", // Không lặp ảnh
    }}
    >
      {/* Box bao ngoài */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '600px',
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#F0F0F0',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          marginTop: '50px', // Cách header ra
          marginBottom: '50px', // Cách footer ra
        }}
      >
            <Typography variant="h4" sx={{ textAlign: 'center', my: 4 }}>Đặt lịch ngay</Typography>
    <section id="contact" className="contact container mb-4">
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <input type="hidden" name="userId" value={formData.userId} />

        <TextField
          label="Họ và tên"
          name="fullname"
          required
          value={formData.fullname}
          onChange={handleChange}
        />

        <TextField
          label="Số điện thoại"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
        />

        <TextField
        label="Email"
        name="email"
        required
        value={formData.email}
        onChange={handleChange}
        fullWidth
      />

        <TextField
          label="Địa chỉ"
          name="address"
          required
          value={formData.address}
          onChange={handleChange}
        />

        <FormControl required>
          <FormLabel>Giới tính</FormLabel>
          <RadioGroup
            row
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
            <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
          </RadioGroup>
        </FormControl>

        <TextField
          label="Năm sinh"
          name="birthYear"
          required
          type="number"
          value={formData.birthYear}
          onChange={handleChange}
          placeholder="YYYY"
          InputProps={{
            inputProps: { min: 1900, max: 2023 }
          }}
        />

        <FormControl required>
          <InputLabel id="specialtyId-label">Chọn dịch vụ</InputLabel>
          <Select
            labelId="specialtyId-label"
            name="specialtyId"
            value={formData.specialtyId}
            onChange={handleChange}
            label="Chọn dịch vụ"
          >
            <MenuItem value="">--Chọn dịch vụ--</MenuItem>
            {specialties.map((specialty) => (
              <MenuItem value={specialty.id} key={specialty.id}>
                {specialty.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl required>
          <InputLabel id="doctorId-label">Chọn bác sĩ</InputLabel>
          <Select
            labelId="doctorId-label"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            label="Chọn bác sĩ"
          >
            <MenuItem value="">--Chọn bác sĩ--</MenuItem>
            {doctors.map((doctor) => (
              <MenuItem value={doctor.id} key={doctor.id}>
                {doctor.fullname}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Ngày hẹn"
          name="appointmentDate"
          required
          type="date"
          value={formData.appointmentDate}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: today,
          }}
        />
      <FormControl required>
        <FormLabel>Chọn giờ</FormLabel>
        <RadioGroup
          row
          name="appointmentTime"
          value={formData.appointmentTime}
          onChange={handleChange}
          sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px' }}
        >
          {[...Array(10)].map((_, index) => {
            const hour = 8 + index; // Giờ từ 08:00 đến 17:00
            const timeLabel = `${hour.toString().padStart(2, '0')}:00`;

            // Kiểm tra nếu giờ đã đặt hoặc giờ đã qua
            const isDisabled = 
              bookedTimes.includes(timeLabel) || 
              (formData.appointmentDate === today && hour <= now.getHours());

            return (
              <Button
                key={timeLabel}
                variant={formData.appointmentTime === timeLabel ? "contained" : "outlined"}
                color={isDisabled ? "default" : "primary"}
                onClick={() => !isDisabled && handleChange({ target: { name: 'appointmentTime', value: timeLabel } })}
                disabled={isDisabled}
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
          label="Nội dung"
          name="content"
          multiline
          rows={4}
          value={formData.content}
          onChange={handleChange}
        />

        <Button variant="contained" color="primary" type="submit">
          Gửi
        </Button>
      </Box>
    </section>
    </Box>
    </Box>
    </div>
  );
};

export default GetForm;