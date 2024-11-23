import React, { useState } from 'react';
import '../../assets/css/mainContent.css';

import { Box, Typography, Grid, Paper, Container, Tab, Tabs } from '@mui/material';

function MainContent() {
 const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }; 

  return (
    <main>
      {/* Phần Hero */}
      <section id="home" className="hero">
        <h1 className="hero-title">Chào mừng đến với Phòng Khám Nha Khoa</h1>
        <p className="hero-description">Chăm sóc nụ cười của bạn, tận tâm từng phút giây</p>
      </section>

      <section id="News" className="news-section">
        <h2>
          Giới thiệu về <a href="#"><img src="img/logo.png" alt="Logo" className="logo" /></a>
        </h2>
        <p>
          DENTAL CARE được xây dựng và phát triển với hướng đi là trung tâm nha khoa kỹ thuật cao, chuyên sâu, phục vụ mọi nhu cầu của khách hàng về sức khỏe răng miệng. Chúng tôi cung cấp một loạt các dịch vụ mũi nhọn như dán sứ veneer, chỉnh nha, bọc răng sứ, cấy ghép implant, điều trị cười hở lợi và nhổ răng khôn.
        </p>
        <p>
          Để thực hiện được sứ mệnh đó, DENTAL CARE hiểu rằng chúng tôi phải tập trung đầu tư vào con người và hệ thống trang thiết bị công nghệ hiện đại. Đội ngũ bác sĩ của chúng tôi là những chuyên gia hàng đầu trong lĩnh vực nha khoa, có nhiều năm kinh nghiệm và được đào tạo chuyên sâu. Chúng tôi cam kết mang đến cho khách hàng dịch vụ nha khoa an toàn, hiệu quả và tiện lợi nhất.
        </p>
        <p>
          Chúng tôi cũng rất chú trọng đến không gian làm việc và trải nghiệm của khách hàng. Tại DENTAL CARE, mọi dịch vụ đều được thực hiện trong môi trường thân thiện, sạch sẽ và tiện nghi, nhằm tạo sự thoải mái và yên tâm cho khách hàng khi đến với chúng tôi.
        </p>

        <h3>Đội ngũ bác sĩ – Chìa khóa cho sự thành công</h3>
        <p>
          DENTAL CARE hiểu rằng, sự phát triển và thành công phải xuất phát từ hiệu quả điều trị, sự hài lòng của khách hàng. Do đó, đội ngũ bác sĩ chất lượng chuyên môn cao, đào tạo chuyên sâu theo phân khoa luôn được chú trọng phát triển số 1 tại DENTAL CARE.
        </p>
        <p>
          Bác sĩ tại DENTAL CARE không chỉ được đào tạo chính quy khoa Răng – Hàm – Mặt mà còn thường xuyên tham gia các hội thảo khoa học, các khóa học nâng cao chuyên môn để không ngừng cập nhật kiến thức và công nghệ mới để áp dụng vào điều trị.
        </p>
        <a href="#"><img src="img/doctor/doctor1.png" alt="Doctor" className="Doctor" /></a>
        <h4>Chuyên khoa Chỉnh nha:</h4>
        <p>
          Chuyên khoa chỉnh nha tại DENTAL CARE do Bác sĩ Chuyên khoa I Nguyễn Thị Hường phụ trách chuyên môn. Là một bác sĩ chỉnh nha, Bác sĩ Hường luôn tuân thủ các nguyên tắc về khớp cắn và thẩm mỹ nụ cười.
        </p>
        <p>
          Đội ngũ bác sĩ chuyên khoa chỉnh nha chuyên sâu với nhiều năm kinh nghiệm.
        </p>
        <a href="#"><img src="img/doctor/doctor2.png" alt="Doctor" className="Doctor" /></a>
        <h4>Hệ thống chứng chỉ các bác sĩ đang công tác tại DENTAL CARE:</h4>
        <ul>
          <li>Tốt nghiệp Khoa Răng – Hàm – Mặt – Đại học Y Hà Nội</li>
          <li>Bác sĩ Chuyên khoa I – Đại học Y Hà Nội</li>
          <li>Chứng chỉ ứng công nghệ GEAW vào niềng răng bởi Giáo sư Dr.Akiyoshi Shirasu</li>
          <li>Chứng chỉ chuyên sâu điều trị cắn hở hiệu quả và ổn định – GS.Tae-Woo Kim – Đại học Seoul</li>
          <li>Chứng chỉ Thực hành mắc cài mặt lưỡi đa rãnh – Viện trưởng viện đào tạo Răng – Hàm – Mặt chứng nhận.</li>
          <li>Chứng chỉ điều trị sai khớp cắn hạng II và III với kỹ thuật Meaw – Dr. Nelson Oppermann – University of Illinois at Chicago United States.</li>
          <li>Chứng chỉ kiểm soát răng đơn – tổng thể và mô mềm với TADS – Prof. Kee Joon Lee – Department Of Orthodontics Yonsei University, Seoul, Korea.</li>
          <li>Chứng chỉ khóa học Chỉnh nha hiệu quả – Từ kế hoạch đến kết quả by Moe Razavi – Assistant Clinical Professor Case Western Reserve University, USA.</li>
          <li>Chứng chỉ và account riêng do Invisalign – Niềng khay trong suốt cấp.</li>
        </ul>
        <a href="#"><img src="img/doctor/doctor3.png" alt="Doctor" className="Doctor" /></a>
        <p>
          Các khách hàng khi đến khám tư vấn dù sử dụng dịch vụ hay không cũng đều được bác sĩ gửi kế hoạch điều trị chi tiết để biết rõ vấn đề mình gặp phải và phương pháp điều trị.
        </p>
        <p>
          Đến với DENTAL CARE, bạn sẽ được bác sĩ chuyên khoa khám tư vấn và tiến hành điều trị với kết quả tốt nhất. Mọi kế hoạch và chi phí sẽ được thông báo chi tiết và rõ ràng trong kế hoạch điều trị trước khi khách hàng đồng ý tiếp nhận.
        </p>
      </section>
      {/* Phần Lý do nên chọn chúng tôi */}
      <section id="WhyChooseUs" className="why-choose-us-section" style={{ backgroundColor: '#f8f8f8', padding: '50px 0' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom align="center" color="primary">
            Lý Do Nên Chọn Chúng Tôi
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom color="primary">Trung tâm Nha khoa kỹ thuật cao</Typography>
                <Typography variant="body2" color="text.secondary">
                  Với đội ngũ bác sĩ, chuyên gia phân theo chuyên khoa, chúng tôi cam kết mang đến chất lượng dịch vụ cao cấp nhất.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom color="primary">Hồ sơ bệnh án chi tiết miễn phí</Typography>
                <Typography variant="body2" color="text.secondary">
                  Chúng tôi cung cấp hồ sơ bệnh án chi tiết miễn phí trước khi làm dịch vụ và ký hợp đồng cam kết chất lượng theo kế hoạch.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom color="primary">Vật liệu nha khoa cao cấp</Typography>
                <Typography variant="body2" color="text.secondary">
                  Sử dụng vật liệu chính hãng, hệ thống trang thiết bị hiện đại, vô khuẩn tuyệt đối và thẻ bảo hành check code.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom color="primary">Chính sách trả góp 0% lãi suất</Typography>
                <Typography variant="body2" color="text.secondary">
                  Chúng tôi cung cấp chính sách trả góp linh hoạt, lãi suất 0% giúp khách hàng chủ động tài chính.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom color="primary">Được cấp phép hoạt động bởi Sở Y tế</Typography>
                <Typography variant="body2" color="text.secondary">
                  Các chi nhánh của VIET SMILE đều được cấp phép hoạt động chính thức bởi Sở Y tế với giấy phép đầy đủ.
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Thống kê */}
          <Typography variant="h4" align="center" gutterBottom color="primary">Thống Kê</Typography>
          <Box sx={{ marginTop: 4, textAlign: 'center', backgroundColor: '#f8a400' }}>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={4}>
                <Typography variant="h5" color="primary">10</Typography>
                <Typography variant="body2" color="text.secondary">Năm kinh nghiệm</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h5" color="primary">30</Typography>
                <Typography variant="body2" color="text.secondary">Chuyên gia</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h5" color="primary">20,000+</Typography>
                <Typography variant="body2" color="text.secondary">Khách hàng</Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </section>

      {/* Phần Cảm nhận của khách hàng */}
      <section id="Testimonials" className="testimonials-section" style={{ padding: '50px 0', backgroundColor: '#66BB6A' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom align="center" color="primary">
            Cảm Nhận Của Khách Hàng
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  "Dịch vụ rất tuyệt vời, bác sĩ rất tận tình và chuyên nghiệp. Mình rất hài lòng với kết quả nhận được!"
                </Typography>
                <Typography variant="subtitle2" color="primary">Nguyễn Thị Lan</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  "Mình cảm thấy rất thoải mái khi đến đây, các bác sĩ luôn giải thích rõ ràng về quy trình và chăm sóc tận tình."
                </Typography>
                <Typography variant="subtitle2" color="primary">Trần Minh Tú</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  "Cảm ơn DENTAL CARE đã mang lại cho tôi một nụ cười hoàn hảo. Tôi rất hài lòng với dịch vụ nơi đây."
                </Typography>
                <Typography variant="subtitle2" color="primary">Lê Quang Huy</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </section>
      <Box sx={{ width: '100%' }}>
      <Typography variant="h4" sx={{ padding: 3, textAlign: 'center' }}>
      Câu chuyện về khách hàng
      </Typography>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Răng sứ" />
        <Tab label="Cắt lợi thẩm mỹ" />
        <Tab label="Niềng răng" />
        <Tab label="Trồng răng" />
      </Tabs>
      
      <Box sx={{ padding: 3 }}>
        {value === 0 && (
          <Typography variant="h6">
            <strong>Làm răng sứ thoải mái ăn nhai</strong>
            <p>
              Răng sứ mang đến sự tự tin trong giao tiếp và giúp bạn ăn nhai thoải mái mà không lo ngại.
              Chúng tôi sử dụng vật liệu cao cấp, đảm bảo tính thẩm mỹ và độ bền lâu dài.
            </p>
          </Typography>
        )}
        {value === 1 && (
          <Typography variant="h6">
            <strong>Cắt lợi thẩm mỹ</strong>
            <p>
              Cắt lợi thẩm mỹ giúp nụ cười của bạn trở nên hài hòa và đẹp tự nhiên hơn, khắc phục tình trạng lợi hở khi cười.
            </p>
          </Typography>
        )}
        {value === 2 && (
          <Typography variant="h6">
            <strong>Niềng răng</strong>
            <p>
              Niềng răng giúp cải thiện sự đều đặn của hàm răng, mang lại nụ cười đẹp và tự tin hơn, đồng thời cải thiện chức năng ăn nhai.
            </p>
          </Typography>
        )}
        {value === 3 && (
          <Typography variant="h6">
            <strong>Trồng răng</strong>
            <p>
              Trồng răng implant giúp khôi phục chức năng ăn nhai và thẩm mỹ cho những trường hợp mất răng, mang lại sự thoải mái cho khách hàng.
            </p>
          </Typography>
        )}
      </Box>
    </Box>
    </main>
  );
}
export default MainContent;
