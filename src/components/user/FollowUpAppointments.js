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

function FollowUpAppointments() {
  const [followUpAppointments, setFollowUpAppointments] = useState([]);
  const { user } = useUserStore(); // Lấy thông tin người dùng từ store

  // Fetch follow-up appointments từ API
  useEffect(() => {
    const fetchFollowUpAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:8080/follow-up-appointments");
        
        // Lọc lịch tái khám theo id người dùng (bệnh nhân)
        const filteredFollowUpAppointments = response.data.filter(
          (appointment) => appointment.patient_id === user.profile.id
        );
        
        // Cập nhật dữ liệu vào state
        setFollowUpAppointments(filteredFollowUpAppointments);
      } catch (error) {
        console.error("Error fetching follow-up appointments:", error);
      }
    };

    if (user && user.profile) {
      fetchFollowUpAppointments(); // Gọi API nếu người dùng đã đăng nhập
    }
  }, [user]); // Dependency array: gọi lại mỗi khi `user` thay đổi

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
            Lịch Tái Khám
          </Typography>
        </Box>
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
                {["Bệnh nhân", "Bác sĩ", "Ngày tái khám", "Giờ", "Ghi chú"].map((head, index) => (
                  <TableCell key={index} sx={{ color: "white", fontWeight: "bold" }}>
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {followUpAppointments.map((appointment) => (
                <TableRow
                  key={appointment.id}
                  sx={{
                    "&:nth-of-type(odd)": { bgcolor: "grey.100" },
                    "&:hover": { bgcolor: "grey.200" },
                  }}
                >
                  <TableCell>{appointment.patient_name}</TableCell>
                  <TableCell>{appointment.doctor_name}</TableCell>
                  <TableCell>
                    {new Date(appointment.follow_up_date).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell>{appointment.time}</TableCell> {/* Hiển thị giờ */}
                  <TableCell>{appointment.notes}</TableCell>
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

export default FollowUpAppointments;
