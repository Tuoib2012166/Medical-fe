import React from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import { Box, Typography, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import '../../assets/css/priceList.css';

function Pricelist() {
  return (
    <div>
      <Header />
      <div className="container">
        <Sidebar />
        <div className="main-content">
          {/* Nội dung bảng giá dịch vụ */}
          <section id="price-list">
            <Typography variant="h4" gutterBottom>Bảng Giá Dịch Vụ Dán Sứ Veneer</Typography>
            <Paper sx={{ overflow: 'hidden' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><Typography variant="h6">Thương Hiệu</Typography></TableCell>
                    <TableCell><Typography variant="h6">Xuất Xứ</Typography></TableCell>
                    <TableCell><Typography variant="h6">Bảo Hành</Typography></TableCell>
                    <TableCell><Typography variant="h6">Giá Niêm Yết/Răng</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>IPS Emax</TableCell>
                    <TableCell>Đức</TableCell>
                    <TableCell>10 năm</TableCell>
                    <TableCell>6.000.000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Lisi</TableCell>
                    <TableCell>Mỹ</TableCell>
                    <TableCell>10 năm</TableCell>
                    <TableCell>7.000.000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Celtra</TableCell>
                    <TableCell>Đức</TableCell>
                    <TableCell>10 năm</TableCell>
                    <TableCell>8.000.000</TableCell>
                  </TableRow>
                  {/* Additional rows can be added similarly */}
                </TableBody>
              </Table>
            </Paper>
            <Typography variant="body1" paragraph>
              Giá trên chưa bao gồm ưu đãi tốt nhất của tháng. Quý khách vui lòng liên hệ để nhận bảng giá ưu đãi chi tiết.
            </Typography>
          </section>

          {/* Bảng giá dịch vụ Bọc Răng Sứ */}
          <section id="price-list">
            <Typography variant="h4" gutterBottom>Bảng giá dịch vụ Bọc Răng Sứ</Typography>
            <Paper sx={{ overflow: 'hidden' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><Typography variant="h6">Thương Hiệu</Typography></TableCell>
                    <TableCell><Typography variant="h6">Xuất Xứ</Typography></TableCell>
                    <TableCell><Typography variant="h6">Bảo Hành</Typography></TableCell>
                    <TableCell><Typography variant="h6">Giá Răng</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Răng sứ Katana</TableCell>
                    <TableCell>Đức</TableCell>
                    <TableCell>3 năm</TableCell>
                    <TableCell>2.500.000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Răng sứ Venus</TableCell>
                    <TableCell>Đức</TableCell>
                    <TableCell>3 năm</TableCell>
                    <TableCell>3.000.000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Chốt sứ thạch anh</TableCell>
                    <TableCell>Đức</TableCell>
                    <TableCell>10 năm</TableCell>
                    <TableCell>1.500.000</TableCell>
                  </TableRow>
                  {/* Additional rows can be added similarly */}
                </TableBody>
              </Table>
            </Paper>
            <Typography variant="body1" paragraph>
              Giá trên chưa bao gồm ưu đãi tốt nhất của tháng. Quý khách vui lòng liên hệ để nhận bảng giá ưu đãi chi tiết.
            </Typography>
          </section>

          {/* Dịch vụ bảng giá */}
          <section id="services">
            <Typography variant="h4" gutterBottom>Bảng Giá Dịch Vụ</Typography>
            <Paper sx={{ overflow: 'hidden' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><Typography variant="h6">DỊCH VỤ</Typography></TableCell>
                    <TableCell><Typography variant="h6">ĐVT</Typography></TableCell>
                    <TableCell><Typography variant="h6">GIÁ DỊCH VỤ VNĐ (Giá chưa bao gồm Thuế GTGT)</Typography></TableCell>
                    <TableCell><Typography variant="h6">Thuế GTGT</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Khám tổng quát</TableCell>
                    <TableCell>Lần</TableCell>
                    <TableCell>Miễn phí</TableCell>
                    <TableCell>KCT</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Cạo vôi răng</TableCell>
                    <TableCell>2 Hàm</TableCell>
                    <TableCell>400.000</TableCell>
                    <TableCell>KCT</TableCell>
                  </TableRow>
                  {/* Additional rows can be added similarly */}
                </TableBody>
              </Table>
            </Paper>
            <Typography variant="body1" paragraph>
              Lưu ý: Bảng giá có thể thay đổi theo thời gian, vui lòng liên hệ trực tiếp với Nha Khoa Kim để biết thông tin chi tiết và chính xác nhất.
            </Typography>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Pricelist;
