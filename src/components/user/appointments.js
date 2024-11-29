import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import Header from "./header";
import Footer from "./footer";
import useUserStore from "../../store/userStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const { user, setUser } = useUserStore();
  const [selectedDate, setSelectedDate] = useState(new Date()); // Selected date state

  // Get current time to disable past times in DatePicker
  const currentDateTime = new Date();
  const currentHour = currentDateTime.getHours();
  const currentMinute = currentDateTime.getMinutes();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    };

    fetchUserData();
  }, [setUser]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:8080/appointments");
        const filteredAppointments = response.data.filter(
          (appointment) => appointment.user_id == user.profile.id
        );
        setAppointments(filteredAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    if (user && user.profile) {
      fetchAppointments();
    }
  }, [user]);

  // Disable past time slots in the DatePicker
  const isTimeDisabled = (time) => {
    const timeInMinutes = time.getHours() * 60 + time.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;
    return timeInMinutes < currentTimeInMinutes;
  };

  return (
    <div>
      <Header />
      <Container>
        <Box mb={4}>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            Danh Sách Đặt Lịch
          </Typography>
        </Box>

        {/* DatePicker component */}
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            showTimeSelect
            timeIntervals={15}
            minDate={new Date()} // Disable past dates
            minTime={new Date(currentDateTime.setMinutes(currentMinute + 1))} // Disable times before current time
            dateFormat="yyyy/MM/dd HH:mm"
            timeCaption="Giờ"
            placeholderText="Chọn thời gian"
            filterTime={isTimeDisabled} // Disable past hours
          />
        </div>

        <TableContainer
          component={Paper}
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "primary.main" }}>
                {[
                  "Họ và tên",
                  "Số điện thoại",
                  "Địa chỉ",
                  "Giới tính",
                  "Năm sinh",
                  "Ngày hẹn",
                  "Giờ hẹn",
                  "Bác sĩ",
                  "Dịch vụ",
                  "Nội dung",
                  "Ngày tạo",
                ].map((head, index) => (
                  <TableCell key={index} sx={{ color: "white", fontWeight: "bold" }}>
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow
                  key={appointment.id}
                  sx={{
                    "&:nth-of-type(odd)": {
                      bgcolor: "grey.100",
                    },
                  }}
                >
                  <TableCell>{appointment.fullname}</TableCell>
                  <TableCell>{appointment.phone}</TableCell>
                  <TableCell>{appointment.address}</TableCell>
                  <TableCell>{appointment.gender}</TableCell>
                  <TableCell>{appointment.birth_year}</TableCell>
                  <TableCell>
                    {new Date(appointment.appointment_date).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell>{appointment.appointment_time}</TableCell>
                  <TableCell>{appointment.doctor_name}</TableCell>
                  <TableCell>{appointment.specialty}</TableCell>
                  <TableCell>{appointment.content}</TableCell>
                  <TableCell>
                    {new Date(appointment.created_at).toLocaleString("en-GB")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Footer />
    </div>
  );
}

export default Appointments;
