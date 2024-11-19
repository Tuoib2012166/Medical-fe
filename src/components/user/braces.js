import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/braces.css';
import Footer from './footer';
import Header from './header';

const Braces = () => {
    return (
        <>
        <Header />
            <section id="News" className="news-section">
                <section id="introduction">
                    <h2>Niềng Răng cùng Hệ Thống Mắc Cài và Khay Niềng Thông Minh</h2>
                    <p>"Niềng Răng nhanh hơn, hiệu quả hơn, ít đau hơn, khung hàm đẹp hơn và không giới hạn về tuổi tác… cùng Hệ Thống Mắc Cài và Khay Niềng Thông Minh"</p>
                    <img src="img/braces/Braces.jpg" alt="Doctor" className="Doctor" />
                </section>
                
                <section id="benefits">
                    <h2>Tại sao chọn Niềng Răng?</h2>
                    <ul>
                        <li>Niềng Răng nhanh hơn, hiệu quả hơn</li>
                        <li>Giảm đau ít hơn so với phương pháp truyền thống</li>
                        <li>Không giới hạn tuổi tác, phù hợp với mọi đối tượng</li>
                        <li>Cải thiện thẩm mỹ với khung hàm răng đẹp hơn</li>
                        <li>Không ảnh hưởng đến hoạt động hàng ngày</li>
                    </ul>
                </section>
                
                <section id="process">
                    <h2>Quy trình Niềng Răng tại Việt Smile</h2>
                    <p>Việt Smile cam kết mang đến cho bạn quy trình niềng răng chuyên nghiệp và an toàn, bao gồm các bước sau:</p>
                    <ul>
                        <li>Khám và tư vấn ban đầu</li>
                        <li>Chụp X-quang và lấy dữ liệu răng</li>
                        <li>Lên kế hoạch chi tiết điều trị</li>
                        <li>Gắn mắc cài hoặc khay niềng</li>
                        <li>Theo dõi và điều chỉnh định kỳ</li>
                    </ul>
                </section>
                
                <section id="why-us">
                    <h2>Tại sao chọn Việt Smile?</h2>
                    <p>Việt Smile là trung tâm niềng răng hàng đầu tại Việt Nam với các ưu điểm sau:</p>
                    <ul>
                        <li>Đội ngũ chuyên gia giàu kinh nghiệm</li>
                        <li>Công nghệ niềng răng hiện đại</li>
                        <li>Chất lượng dịch vụ hàng đầu</li>
                        <li>Cam kết kết quả và hỗ trợ sau điều trị</li>
                    </ul>
                </section>
            </section>
            <Footer />
        </>    
    );
};

export default Braces;
