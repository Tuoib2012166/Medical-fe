import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Box } from '@mui/material';
import Header from './header';
import Footer from './footer';
import '../../assets/css/news.css'; // Tùy chỉnh CSS cơ bản

const NewsImplant = () => {
    return (
        <>
            <Header />
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
                    <Typography variant="h4" color="primary" gutterBottom>
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
                    <Typography variant="h4" color="primary" gutterBottom>
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
                    <Typography variant="h4" color="primary" gutterBottom>
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
                    <Typography variant="h4" color="primary" gutterBottom>
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
                <Typography variant="h4" color="primary" gutterBottom>
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
                <Typography variant="h4" color="primary" gutterBottom>
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
                <Typography variant="h4" color="primary" gutterBottom>
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
            <Footer />
        </>
    );
};

export default NewsImplant;
