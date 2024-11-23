import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../header";
import Footer from "../footer";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Grid,
  Divider,
} from "@mui/material";

function DoctorDetail() {
  const { doctorName } = useParams(); // Lấy tên bác sĩ từ URL
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/doctors`, {
          params: { doctorName },
        });
        setDoctor(response.data[0]); // Lấy thông tin bác sĩ đầu tiên
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    fetchDoctorDetails();
  }, [doctorName]);

  if (!doctor) {
    return (
      <Box sx={{ textAlign: "center", padding: 4 }}>
        <Typography variant="h6">Đang tải thông tin...</Typography>
      </Box>
    );
  }

  return (
    <div>
        <Header />
        <Typography
                variant="h4"
                align="center"
                sx={{ marginTop: 2, fontWeight: "bold" }}
              >
                Thông tin bác sĩ
              </Typography>
    <Box sx={{ padding: 4 }}>
      <Card sx={{ maxWidth: 900, margin: "auto" }}>
        <CardContent>
          <Grid container spacing={4}>
            {/* Ảnh đại diện */}
            <Grid item xs={12} md={4}>
              <Avatar
                src={`http://localhost:8080/${doctor.image}`}
                alt={`Ảnh của ${doctor.fullname}`}
                sx={{ width: 150, height: 150, margin: "auto" }}
              />
              <Typography
                variant="h5"
                align="center"
                sx={{ marginTop: 2, fontWeight: "bold" }}
              >
                {doctor.fullname}
              </Typography>
              <Typography align="center" color="text.secondary">
                Dịch vụ chuyên môn:
              </Typography>
              <Typography align="center" color="text.secondary">
                {doctor.specialty_name}
              </Typography>
              <Typography variant="h6" align="left" >
                Năm sinh:
              </Typography>
              <Typography variant="p" gutterBottom>
                {doctor.birth_year}
              </Typography>
              <Typography variant="h6" align="left" >
                Địa chỉ: 
              </Typography>
              <Typography variant="p" gutterBottom>
                {doctor.address}
              </Typography>
              <Typography variant="h6" align="left" >
                Điện thoại: 
              </Typography>
              <Typography variant="p" gutterBottom>
                 {doctor.phone}
              </Typography>
              <Box sx={{ marginTop: 4, textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              href={`mailto:${doctor.email}`}
            >
              Đặt lịch hẹn với bác sĩ
            </Button>
          </Box>

            </Grid>

            {/* Thông tin chi tiết */}
            <Grid item xs={12} md={8}>
              

              <Divider sx={{ marginY: 2 }} />

              <Typography variant="h6" gutterBottom>
                Giới thiệu
              </Typography>
              <Typography paragraph>{doctor.introduction}</Typography>

              <Divider sx={{ marginY: 2 }} />

              <Typography variant="h6" gutterBottom>
                Tiểu sử - Kinh nghiệm công tác
              </Typography>
              <Typography paragraph>{doctor.biography}</Typography>

              <Divider sx={{ marginY: 2 }} />

              <Typography variant="h6" gutterBottom>
                Chứng nhận
              </Typography>
              <Typography paragraph>{doctor.certifications}</Typography>

              <Divider sx={{ marginY: 2 }} />

              <Typography variant="h6" gutterBottom>
                Nơi làm việc chính
              </Typography>
              <Typography paragraph>{doctor.main_workplace}</Typography>

              <Divider sx={{ marginY: 2 }} />

              <Typography variant="h6" gutterBottom>
                Giờ làm việc
              </Typography>
              <Typography variant="p" gutterBottom>
                Thứ Hai, Thứ Ba, Thứ Tư, Thứ 5, Thứ Sáu, Thứ Bảy, Chủ Nhật
              </Typography>
              <Typography paragraph>{doctor.working_hours}</Typography>
            </Grid>
          </Grid>
        
        </CardContent>
      </Card>
    </Box>
    <Footer />
    </div>
  );
}

export default DoctorDetail;
