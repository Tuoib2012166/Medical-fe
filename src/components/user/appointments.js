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
import { FaTimes } from "react-icons/fa"; // Biểu tượng hủy
import Header from "./header";
import Footer from "./footer";
import useUserStore from "../../store/userStore";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const { user, setUser } = useUserStore();

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
        const response = await axios.get("http://localhost:8080/appointments/List");
        const filteredAppointments = response.data.filter(
          (appointment) => appointment.user_id === user.profile.id
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

  // Hàm hủy cuộc hẹn
  const rejectAppointment = async (id) => {
    try {
      await axios.put(`http://localhost:8080/appointments/${id}/reject`);
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === id
            ? { ...appointment, status: "reject" }
            : appointment
        )
      );
    } catch (error) {
      console.error("Error rejecting appointment:", error);
    }
  };

  return (
    <div>
      <Header />
      <Container maxWidth="xl">
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

        <TableContainer
          component={Paper}
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            overflowX: "auto",
            maxWidth: "100%",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "primary.main" }}>
                {[
                  "Họ và tên",
                  "Số điện thoại",
                  "Gmail",
                  "Địa chỉ",
                  "Giới tính",
                  "Năm sinh",
                  "Ngày hẹn",
                  "Giờ hẹn",
                  "Bác sĩ",
                  "Dịch vụ",
                  "Nội dung",
                  "Ngày tạo",
                  "Trạng thái",
                  "Hủy",
                ].map((head, index) => (
                  <TableCell
                    key={index}
                    sx={{ color: "white", fontWeight: "bold", fontSize: "14px" }}
                  >
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
                    bgcolor:
                      appointment.status === "reject"
                        ? "#edcaca"
                        : appointment.status === "pending"
                        ? "#def4ff"
                        : "#ffffff",
                  }}
                >
                  <TableCell>{appointment.fullname}</TableCell>
                  <TableCell>{appointment.phone}</TableCell>
                  <TableCell>{appointment.email}</TableCell>
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
                  <TableCell>
                    {appointment.status === "accept"
                      ? "Đã xác nhận"
                      : appointment.status === "reject"
                      ? "Đã hủy"
                      : "Đã xác nhận"}
                  </TableCell>
                  <TableCell>
                    {appointment.status === "pending" && (
                      <FaTimes
                        onClick={() => {
                          const confirmed = window.confirm(
                            "Bạn có chắc chắn muốn hủy lịch hẹn này?"
                          );
                          if (confirmed) {
                            rejectAppointment(appointment.id);
                          }
                        }}
                        style={{ cursor: "pointer", color: "red" }}
                      />
                    )}
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
