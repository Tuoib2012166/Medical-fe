import React, { useState } from 'react';
import { Typography, Container, Grid, Card, CardMedia, CardContent, Tabs, Tab, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Header from './header';
import Footer from './footer';
import '../../assets/css/news.css'; // Tùy chỉnh CSS cơ bản

const NewsPage = () => {
    const [value, setValue] = useState(0); // Quản lý tab hiện tại

    const handleChange = (event, newValue) => {
        setValue(newValue); // Thay đổi tab
    };

    return (
        <>
            <Header />
            <Container maxWidth="lg">
                <Box my={4}>
                    <Typography variant="h4" sx={{ textAlign: 'center', my: 4, color: "#A52A2A"}}>
                        Kiến Thức Nha Khoa
                    </Typography>

                    {/* Tabs */}
                    <Tabs value={value} onChange={handleChange} centered>
                        <Tab label="Niềng Răng" />
                        <Tab label="Cấy Ghép Implant" />
                    </Tabs>

                    {/* Tab 1: Niềng Răng */}
                    {value === 0 && (
                        <Box my={4}>
                            <Container maxWidth="lg" sx={{ padding: '2rem 0' }}>
                              <Typography variant="h4" align="center" gutterBottom sx={{  color: '#1976d2' }}>
                                Kiến thức quan trọng về niềng răng
                              </Typography>
                              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, textAlign: 'justify' }}>
                                Nếu bạn đang tìm giải pháp để giúp mình có hàm răng đều và đẹp hơn, niềng răng là một trong những giải pháp tối ưu. Đây là
                                phương pháp được lựa chọn hàng đầu với mong muốn cải thiện hàm răng. Hãy cùng Nha Khoa Đông A khám phá các thông tin quan
                                trọng và cần thiết về hình thức chỉnh nha này nhé!
                              </Typography>
                              <Box textAlign="center" marginBottom="2rem">
                                <img
                                  src="https://nhakhoadonga.vn/wp-content/uploads/2020/08/tat-tan-tat-nhung-kien-thuc-quan-trong-ve-nieng-rang-1.jpg"
                                  alt="Kiến thức niềng răng"
                                  style={{ maxWidth: '50%', height: 'auto', borderRadius: '8px' }}
                                />
                              </Box>

                              <Typography variant="h5" gutterBottom color="secondary" sx={{marginTop: '1.5rem' }}>
                                Chỉnh nha niềng răng là gì?
                              </Typography>
                              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, textAlign: 'justify' }}>
                                Chỉnh nha - niềng răng là phương pháp sử dụng các dụng cụ như mắc cài, dây cung, thun, hay khay niềng trong suốt để nắn chỉnh
                                và sắp xếp răng theo đúng vị trí. Phương pháp này giúp phục hồi những trường hợp răng hô, móm, lệch lạc, hay thưa, mang lại
                                hàm răng đều và nụ cười tự tin.
                              </Typography>

                              <Box textAlign="center" marginBottom="2rem">
                                <img
                                  src="https://nhakhoadonga.vn/wp-content/uploads/2020/08/tat-tan-tat-nhung-kien-thuc-quan-trong-ve-nieng-rang-3.jpg"
                                  alt="Niềng răng"
                                  style={{ maxWidth: '50%', height: 'auto', borderRadius: '8px' }}
                                />
                              </Box>

                              <Typography variant="h5" gutterBottom color="secondary" sx={{marginTop: '1.5rem' }}>
                                Các phương pháp chỉnh nha phổ biến
                              </Typography>
                              <Grid container spacing={4}>
                                <Grid item xs={12} sm={6} md={4}>
                                  <Card>
                                    <CardMedia
                                      component="img"
                                      height="100"
                                      image="https://nhakhoadonga.vn/wp-content/uploads/2020/08/tat-tan-tat-nhung-kien-thuc-quan-trong-ve-nieng-rang-5.jpg"
                                      alt="Niềng răng mắc cài"
                                    />
                                    <CardContent>
                                      <Typography variant="h5" gutterBottom>
                                        Niềng răng mắc cài cố định
                                      </Typography>
                                      <Typography variant="body2" color="textSecondary">
                                        Đây là phương pháp truyền thống sử dụng mắc cài và dây kim loại để điều chỉnh răng. Thích hợp với các trường hợp
                                        răng hô, móm, lệch lạc.
                                      </Typography>
                                    </CardContent>
                                  </Card>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                  <Card>
                                    <CardMedia
                                      component="img"
                                      height="140"
                                      image="https://nhakhoadonga.vn/wp-content/uploads/2020/08/tat-tan-tat-nhung-kien-thuc-quan-trong-ve-nieng-rang-3.jpg"
                                      alt="Niềng răng trong suốt"
                                    />
                                    <CardContent>
                                      <Typography variant="h5" gutterBottom>
                                        Niềng răng trong suốt
                                      </Typography>
                                      <Typography variant="body2" color="textSecondary">
                                        Sử dụng các khay niềng tháo lắp trong suốt, mang lại tính thẩm mỹ cao, phù hợp cho những người cần sự linh hoạt và
                                        tự tin khi giao tiếp.
                                      </Typography>
                                    </CardContent>
                                  </Card>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                  <Card>
                                    <CardMedia
                                      component="img"
                                      height="140"
                                      image="https://myauris.vn/wp-content/uploads/2022/09/5-dieu-ve-dung-cu-nieng-rang-tai-nha-3-giai-doan.jpg"
                                      alt="Niềng răng sứ"
                                    />
                                    <CardContent>
                                      <Typography variant="h5" gutterBottom>
                                        Niềng răng mắc cài sứ
                                      </Typography>
                                      <Typography variant="body2" color="textSecondary">
                                        Mắc cài làm từ sứ cao cấp có màu sắc tương đồng với răng, mang lại thẩm mỹ vượt trội và sự thoải mái trong suốt quá
                                        trình điều trị.
                                      </Typography>
                                    </CardContent>
                                  </Card>
                                </Grid>
                              </Grid>
                              <Typography variant="h5" gutterBottom color="secondary" sx={{marginTop: '1.5rem' }}>
                                Các câu hỏi thường gặp về niềng răng
                              </Typography>
                              <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                  <Typography variant="h6">1. Niềng răng có đau không?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography>
                                    Trong những ngày đầu, bạn có thể cảm thấy hơi đau hoặc khó chịu khi răng bắt đầu dịch chuyển. Tuy nhiên, cảm giác này sẽ
                                    giảm dần và không quá khó chịu nếu thực hiện đúng cách và tuân thủ hướng dẫn của bác sĩ.
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                              <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                                  <Typography variant="h6">2. Thời gian niềng răng kéo dài bao lâu?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography>
                                    Thời gian niềng răng trung bình từ 18-24 tháng, tùy thuộc vào tình trạng răng và phương pháp niềng bạn chọn. Một số
                                    trường hợp phức tạp có thể kéo dài hơn.
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                              <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
                                  <Typography variant="h6">3. Chi phí niềng răng bao nhiêu?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography>
                                    Chi phí niềng răng phụ thuộc vào loại hình chỉnh nha bạn chọn (mắc cài kim loại, mắc cài sứ, niềng trong suốt...). Hãy
                                    tham khảo ý kiến bác sĩ để có kế hoạch phù hợp với ngân sách.
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>

                              <Typography variant="h5" gutterBottom color="secondary" sx={{marginTop: '1.5rem' }}>
                                Lợi ích của việc niềng răng
                              </Typography>
                              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, textAlign: 'justify' }}>
                                Niềng răng không chỉ mang lại một nụ cười đẹp, mà còn cải thiện chức năng răng miệng và giảm thiểu các vấn đề liên quan đến sức khỏe răng miệng. Dưới đây là một số lợi ích nổi bật của việc niềng răng:
                              </Typography>
                              <ul style={{ paddingLeft: '1.5rem', lineHeight: 1.8 }}>
                                <li><b>Cải thiện sự tự tin:</b> Một hàm răng đều và đẹp giúp bạn tự tin hơn trong giao tiếp hàng ngày.</li>
                                <li><b>Giảm thiểu vấn đề về khớp cắn:</b> Niềng răng giúp khắc phục các vấn đề liên quan đến khớp cắn, làm giảm căng thẳng và mỏi hàm.</li>
                                <li><b>Hỗ trợ vệ sinh răng miệng:</b> Răng đều sẽ giúp bạn vệ sinh răng miệng dễ dàng hơn, ngăn ngừa sâu răng và các bệnh nha chu.</li>
                                <li><b>Phòng ngừa tình trạng hô móm:</b> Niềng răng giúp giảm thiểu tình trạng răng bị hô, móm, mang lại vẻ đẹp tự nhiên cho khuôn mặt.</li>
                              </ul>

                              
                              
                              <Typography variant="h5" gutterBottom color="secondary" sx={{marginTop: '1.5rem' }}>
                                Quy trình niềng răng
                              </Typography>
                              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, textAlign: 'justify' }}>
                                Quy trình niềng răng bao gồm một số bước quan trọng từ khi bạn bắt đầu đến khi kết thúc. Dưới đây là các bước cơ bản trong quy trình niềng răng:
                              </Typography>
                              <ol style={{ paddingLeft: '1.5rem', lineHeight: 1.8 }}>
                                <li><b>Khám và tư vấn ban đầu:</b> Bác sĩ sẽ kiểm tra tình trạng răng miệng và lên kế hoạch điều trị phù hợp.</li>
                                <li><b>Chụp X-quang và lấy dấu hàm:</b> Để xác định tình trạng răng và hàm, bác sĩ sẽ thực hiện các xét nghiệm cần thiết.</li>
                                <li><b>Lắp mắc cài hoặc khay niềng:</b> Sau khi đã có kế hoạch điều trị, bác sĩ sẽ lắp mắc cài (hoặc khay niềng) và bắt đầu quá trình chỉnh nha.</li>
                                <li><b>Kiểm tra định kỳ:</b> Bác sĩ sẽ theo dõi tiến trình niềng răng và điều chỉnh khi cần thiết.</li>
                                <li><b>Hoàn tất và tháo niềng:</b> Sau khi răng đã được dịch chuyển vào vị trí mong muốn, bác sĩ sẽ tháo niềng và bạn sẽ được hướng dẫn giữ răng ổn định.</li>
                              </ol>

                              <Typography variant="h5" gutterBottom color="secondary" sx={{marginTop: '1.5rem' }}>
                                Lời khuyên từ các chuyên gia
                              </Typography>
                              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, textAlign: 'justify' }}>
                                Dưới đây là một số lời khuyên từ các chuyên gia để bạn có thể đạt được kết quả tốt nhất khi niềng răng:
                              </Typography>
                              <ul style={{ paddingLeft: '1.5rem', lineHeight: 1.8 }}>
                                <li><b>Tuân thủ đúng lịch tái khám:</b> Đảm bảo bạn đến tái khám theo lịch của bác sĩ để theo dõi tiến trình và điều chỉnh kịp thời.</li>
                                <li><b>Vệ sinh răng miệng cẩn thận:</b> Chải răng ít nhất hai lần mỗi ngày và sử dụng chỉ nha khoa để làm sạch các vị trí khó tiếp cận.</li>
                                <li><b>Tránh thức ăn cứng hoặc dính:</b> Hạn chế ăn các thức ăn có thể làm hỏng mắc cài như kẹo cứng, hạt, hoặc thức ăn dính.</li>
                                <li><b>Thực hiện chế độ ăn uống lành mạnh:</b> Cung cấp đầy đủ dinh dưỡng cho cơ thể để hỗ trợ quá trình điều trị và sức khỏe tổng thể.</li>
                              </ul>
                            </Container>
                        </Box>
                    )}

                    {/* Tab 2: Cấy Ghép Implant */}
                    {value === 1 && (
                        <Box my={4}>
                            <Container maxWidth="lg">
                              <Box my={4}>
                                  <Typography variant="h4" align="center" gutterBottom color="primary">
                                      Giới thiệu về phương pháp cấy ghép Implant
                                  </Typography>
                                  <Typography variant="body1" paragraph>
                                      Cấy ghép Implant hay trồng răng Implant là kỹ thuật trồng răng giả cao cấp. Đây là phương pháp nha khoa phục hồi mất răng hiệu quả nhất hiện nay, mang lại thẩm mỹ và chức năng tuyệt vời cho người sử dụng. Vậy trồng răng Implant là gì? Cùng tìm hiểu ngay sau đây!
                                  </Typography>
                              </Box>

                              <Grid container spacing={4}>
                                  <Grid item xs={12} md={6}>
                                      <Card>
                                          <CardContent>
                                              <Typography variant="h5" gutterBottom color="secondary">
                                                  Cấy ghép Implant là gì?
                                              </Typography>
                                              <Typography variant="body1" paragraph>
                                                  Phương pháp cấy ghép Implant thay thế răng đã mất bằng một chiếc răng giả từ trụ Implant – một loại vít nhỏ làm từ titanium, giúp tương thích hoàn hảo với xương hàm. Implant được xem là giải pháp tiên tiến, tái tạo răng với chức năng và thẩm mỹ tương đương răng thật.
                                              </Typography>
                                              <Box textAlign="center">
                                                  <img
                                                      src="img/news/whatimplant.jpg"
                                                      alt="Cấy ghép Implant"
                                                      style={{ width: '100%', borderRadius: '8px' }}
                                                  />
                                              </Box>
                                          </CardContent>
                                      </Card>
                                  </Grid>

                                  <Grid item xs={12} md={6}>
                                      <Card>
                                          <CardContent>
                                              <Typography variant="h5" gutterBottom color="secondary">
                                                  Cấu tạo của một chiếc răng Implant
                                              </Typography>
                                              <ul>
                                                  <li>
                                                      <Typography variant="body1">
                                                          <strong>Trụ Implant:</strong> Đóng vai trò như chân răng, được cấy trực tiếp vào xương hàm để tạo độ chắc chắn.
                                                      </Typography>
                                                  </li>
                                                  <li>
                                                      <Typography variant="body1">
                                                          <strong>Khớp nối Abutment:</strong> Phần kết nối giữa trụ Implant và mão răng.
                                                      </Typography>
                                                  </li>
                                                  <li>
                                                      <Typography variant="body1">
                                                          <strong>Mão răng sứ:</strong> Là phần thay thế thân răng, được thiết kế theo hình dáng và màu sắc tự nhiên.
                                                      </Typography>
                                                  </li>
                                              </ul>
                                              <Box textAlign="center">
                                                  <img
                                                      src="img/news/CTImplant.jpg"
                                                      alt="Cấu tạo Implant"
                                                      style={{ width: '100%', borderRadius: '8px' }}
                                                  />
                                              </Box>
                                          </CardContent>
                                      </Card>
                                  </Grid>
                              </Grid>

                              <Box my={4}>
                                  <Typography variant="h5" gutterBottom color="secondary" sx={{marginTop: '1.5rem' }}>
                                      Tác dụng của cấy ghép Implant
                                  </Typography>
                                  <Grid container spacing={2}>
                                      {[
                                          'Răng chắc khỏe như răng thật.',
                                          'Thẩm mỹ cao, không bị lộ dấu hiệu giả.',
                                          'Độ bền cao, tuổi thọ kéo dài đến 20-30 năm.',
                                          'Ngăn ngừa tiêu xương hàm.',
                                          'Bảo vệ răng thật xung quanh.',
                                          'Vệ sinh dễ dàng như răng thật.',
                                      ].map((item, index) => (
                                          <Grid item xs={12} md={6} key={index}>
                                              <Typography variant="body1">✔ {item}</Typography>
                                          </Grid>
                                      ))}
                                  </Grid>
                                  <Box textAlign="center" mt={3}>
                                      <img
                                          src="img/news/TDimplant.jpg"
                                          alt="Tác dụng của Implant"
                                          style={{ width: '80%', borderRadius: '8px' }}
                                      />
                                  </Box>
                              </Box>

                              <Box my={4}>
                                  <Typography variant="h5" gutterBottom color="secondary" sx={{marginTop: '1.5rem' }}>
                                      Lưu ý khi thực hiện cấy ghép Implant
                                  </Typography>
                                  <Typography variant="body1" paragraph>
                                      Trước khi thực hiện, bạn nên chuẩn bị kỹ lưỡng để đảm bảo hiệu quả và hạn chế rủi ro:
                                  </Typography>
                                  <ul>
                                      <li>Không hút thuốc lá, uống rượu trước và sau khi thực hiện.</li>
                                      <li>Tuân thủ nghiêm ngặt hướng dẫn từ bác sĩ.</li>
                                      <li>Thực hiện tại cơ sở uy tín với bác sĩ giàu kinh nghiệm.</li>
                                  </ul>
                              </Box>

                              <Box my={4}>
                                  <Typography variant="h5" gutterBottom color="secondary" sx={{marginTop: '1.5rem' }}>
                                      Có nên cấy ghép Implant không?
                                  </Typography>
                                  <Typography variant="body1" paragraph>
                                      Cấy ghép Implant là lựa chọn tốt nhất để phục hồi răng đã mất, không chỉ mang lại nụ cười tự tin mà còn đảm bảo chức năng nhai và duy trì sức khỏe răng miệng lâu dài. 
                                  </Typography>
                                  <Typography variant="body2" align="center" color="textSecondary">
                                      *Hãy tham khảo ý kiến của bác sĩ trước khi quyết định.
                                  </Typography>
                              </Box>
                              <Box my={4}>
                                  <Typography variant="h5" gutterBottom color="secondary" sx={{marginTop: '1.5rem' }}>
                                      Chi phí thực hiện cấy ghép Implant
                                  </Typography>
                                  <Typography variant="body1" paragraph>
                                      Chi phí cấy ghép Implant phụ thuộc vào nhiều yếu tố như loại trụ Implant, số lượng răng cần phục hồi, tay nghề bác sĩ, và công nghệ thực hiện. Dưới đây là mức giá tham khảo:
                                  </Typography>
                                  <ul>
                                      <li>
                                          <Typography variant="body1">
                                              Trụ Implant tiêu chuẩn: Từ <strong>15 - 25 triệu VNĐ</strong>/răng.
                                          </Typography>
                                      </li>
                                      <li>
                                          <Typography variant="body1">
                                              Trụ cao cấp: Từ <strong>25 - 50 triệu VNĐ</strong>/răng.
                                          </Typography>
                                      </li>
                                      <li>
                                          <Typography variant="body1">
                                              Chi phí mão răng sứ: Từ <strong>3 - 10 triệu VNĐ</strong>/mão.
                                          </Typography>
                                      </li>
                                  </ul>
                                  <Typography variant="body2" color="textSecondary">
                                      * Lưu ý: Mức giá có thể thay đổi tùy vào cơ sở thực hiện và tình trạng sức khỏe của bệnh nhân.
                                  </Typography>
                              </Box>
                              <Box my={4}>
                              <Typography variant="h5" gutterBottom color="secondary" sx={{marginTop: '1.5rem' }}>
                                  Ưu điểm vượt trội của cấy ghép Implant so với phương pháp khác
                              </Typography>
                              <Grid container spacing={2}>
                                  {[
                                      'Khôi phục hoàn hảo chức năng nhai như răng thật.',
                                      'Không ảnh hưởng đến răng lân cận, bảo vệ sức khỏe tổng thể.',
                                      'Độ bền cao, tuổi thọ lên đến hàng chục năm.',
                                      'Giúp giữ vững cấu trúc khuôn mặt, tránh hiện tượng hõm má.',
                                      'Ngăn chặn tiêu xương hàm - điều mà cầu răng hoặc hàm giả không làm được.',
                                      'Cảm giác thoải mái, tự nhiên, không gây đau nhức lâu dài.',
                                  ].map((item, index) => (
                                      <Grid item xs={12} sm={6} key={index}>
                                          <Typography variant="body1">✔ {item}</Typography>
                                      </Grid>
                                  ))}
                              </Grid>
                          </Box>
                          <Box my={4}>
                              <Typography variant="h5" gutterBottom color="secondary" sx={{marginTop: '1.5rem' }}>
                                  Các loại trụ Implant phổ biến
                              </Typography>
                              <Typography variant="body1" paragraph>
                                  Trên thị trường hiện nay có nhiều loại trụ Implant với chất lượng và mức giá khác nhau. Dưới đây là một số loại phổ biến:
                              </Typography>
                              <ul>
                                  <li>
                                      <Typography variant="body1">
                                          <strong>Trụ Implant Hàn Quốc:</strong> Chi phí hợp lý, chất lượng tốt, phù hợp với đa số bệnh nhân.
                                      </Typography>
                                  </li>
                                  <li>
                                      <Typography variant="body1">
                                          <strong>Trụ Implant Thụy Sĩ:</strong> Độ bền cao, khả năng tích hợp xương nhanh, phù hợp với các trường hợp khó.
                                      </Typography>
                                  </li>
                                  <li>
                                      <Typography variant="body1">
                                          <strong>Trụ Implant Mỹ:</strong> Công nghệ tiên tiến, độ an toàn và hiệu quả cao.
                                      </Typography>
                                  </li>
                                  <li>
                                      <Typography variant="body1">
                                          <strong>Trụ Implant Nhật Bản:</strong> Thiết kế nhỏ gọn, dễ dàng phù hợp với nhiều loại xương hàm.
                                      </Typography>
                                  </li>
                              </ul>
                              <Typography variant="body2" color="textSecondary">
                                  * Nên tham khảo ý kiến bác sĩ để chọn loại trụ phù hợp với tình trạng xương hàm và nhu cầu cá nhân.
                              </Typography>
                          </Box>
                          <Box my={4}>
                              <Typography variant="h5" gutterBottom color="secondary" sx={{marginTop: '1.5rem' }}>
                                  Lời khuyên từ chuyên gia
                              </Typography>
                              <Typography variant="body1" paragraph>
                                  Để đạt được kết quả tốt nhất khi cấy ghép Implant, bạn nên lưu ý:
                              </Typography>
                              <ul>
                                  <li>
                                      Lựa chọn cơ sở nha khoa uy tín, có đội ngũ bác sĩ chuyên môn cao.
                                  </li>
                                  <li>
                                      Thực hiện kiểm tra sức khỏe tổng quát và chụp X-quang trước khi phẫu thuật.
                                  </li>
                                  <li>
                                      Tuân thủ các hướng dẫn chăm sóc răng miệng sau cấy ghép.
                                  </li>
                                  <li>
                                      Tránh các thói quen gây hại như hút thuốc lá, ăn thực phẩm quá cứng hoặc dính.
                                  </li>
                              </ul>
                              <Typography variant="body2" color="textSecondary">
                                  * Hãy liên hệ với bác sĩ ngay nếu bạn cảm thấy đau hoặc gặp vấn đề bất thường.
                              </Typography>
                          </Box>
                          </Container>
                        </Box>
                    )}
                </Box>
            </Container>
            <Footer />
        </>
    );
};

export default NewsPage;
