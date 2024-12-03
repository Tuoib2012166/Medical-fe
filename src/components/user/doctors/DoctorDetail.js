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
  Tooltip,
  IconButton,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmailIcon from "@mui/icons-material/Email";

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
        <Typography variant="h6" color="primary">
          Đang tải thông tin...
        </Typography>
      </Box>
    );
  }

  return (
    <div>
      <Header />
      <Typography
        variant="h4"
        align="center"
        sx={{
          marginTop: 2,
          fontWeight: 600,
          color: "#1976d2",
          letterSpacing: 1.5,
        }}
      >
        Thông tin bác sĩ
      </Typography>
      <Box sx={{ padding: 4 }}>
        <Card sx={{ maxWidth: 900, margin: "auto", boxShadow: 3 }}>
          <CardContent>
            <Grid container spacing={4} sx={{ backgroundColor: "#E0FFFF", padding: 3, borderRadius: 2 }}>
              {/* Ảnh đại diện */}
              <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
                <Avatar
                  src={`http://localhost:8080/${doctor.image}`}
                  alt={`Ảnh của ${doctor.fullname}`}
                  sx={{
                    width: 150,
                    height: 150,
                    margin: "auto",
                    "&:hover": {
                      cursor: "pointer",
                      transform: "scale(1.1)",
                      transition: "transform 0.3s ease-in-out",
                    },
                  }}
                />
                <Typography
                  variant="h6"
                  align="center"
                  sx={{
                    marginTop: 2,
                    fontWeight: 700,
                    color: "#CD5C5C",
                    textTransform: "uppercase",
                  }}
                >
                  {doctor.fullname}
                </Typography>
                <Typography
                  align="center"
                  color="text.secondary"
                  sx={{ fontStyle: "italic", marginBottom: 2 }}
                >
                  Dịch vụ chuyên môn:
                </Typography>
                <Typography align="center" color="text.secondary" sx={{ color: "#FF7F50", marginBottom: 2 }}>
                  {doctor.specialty_name}
                </Typography>
                <Box sx={{ marginTop: 3 }}>
                  <Tooltip title="Điện thoại">
                    <IconButton>
                      <PhoneIcon color="primary" />
                    </IconButton>
                    Điện thoại:
                  </Tooltip>
                  <Typography
                    variant="body2"
                    display="inline"
                    sx={{ marginLeft: 1, fontWeight: 600, color: "#555" }}
                  >
                    {doctor.phone}
                  </Typography>
                </Box>
                <Box sx={{ marginTop: 2 }}>
                  <Tooltip title="Địa chỉ">
                    <IconButton>
                      <LocationOnIcon color="primary" />
                    </IconButton>
                    Địa chỉ:
                  </Tooltip>
                  <Typography
                    variant="body2"
                    display="inline"
                    sx={{ marginLeft: 1, fontWeight: 600, color: "#555" }}
                  >
                    {doctor.address}
                  </Typography>
                </Box>
              </Grid>

              {/* Thông tin chi tiết */}
              <Grid item xs={12} md={8} sx={{ backgroundColor: "#F0F0F0", padding: 3, borderRadius: 2 }}>
                <Divider sx={{ marginY: 2 }} />
                <Typography
                  variant="h6"
                  align="center"
                  sx={{
                    fontWeight: 600,
                    textTransform: "uppercase",
                    color: "#3CB371",
                    marginBottom: 1,
                  }}
                >
                  Giới thiệu
                </Typography>
                <Typography paragraph sx={{ lineHeight: 1.6 }}>
                  {doctor.introduction}
                </Typography>

                <Divider sx={{ marginY: 2 }} />

                <Typography
                  variant="h6"
                  
                  sx={{
                    fontWeight: 600,
                    textTransform: "uppercase",
                    color: "#3CB371",
                    marginBottom: 1,
                  }}
                >
                  Tiểu sử - Kinh nghiệm công tác
                </Typography>
                <Typography paragraph sx={{ lineHeight: 1.6 }}>
                  {doctor.biography}
                </Typography>

                <Divider sx={{ marginY: 2 }} />

                <Typography
                  variant="h6"
                  
                  sx={{
                    fontWeight: 600,
                    textTransform: "uppercase",
                    color: "#3CB371",
                    marginBottom: 1,
                  }}
                >
                  Chứng nhận
                </Typography>
                <Typography paragraph sx={{ lineHeight: 1.6 }}>
                  {doctor.certifications}
                </Typography>

                <Divider sx={{ marginY: 2 }} />

                <Typography
                  variant="h6"
                  
                  sx={{
                    fontWeight: 600,
                    textTransform: "uppercase",
                    color: "#3CB371",
                    marginBottom: 1,
                  }}
                >
                  Nơi làm việc chính
                </Typography>
                <Typography paragraph sx={{ lineHeight: 1.6 }}>
                  {doctor.main_workplace}
                </Typography>

                <Divider sx={{ marginY: 2 }} />

                <Typography
                  variant="h6"
                  
                  sx={{
                    fontWeight: 600,
                    textTransform: "uppercase",
                    color: "#3CB371",
                    marginBottom: 1,
                  }}
                >
                  Giờ làm việc
                </Typography>
                <Typography variant="body2" gutterBottom sx={{ lineHeight: 1.6 }}>
                  <AccessTimeIcon color="primary" sx={{ marginRight: 1 }} />
                  Thứ Hai - Chủ Nhật
                </Typography>
                <Typography paragraph sx={{ lineHeight: 1.6 }}>
                  {doctor.working_hours}
                </Typography>
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
