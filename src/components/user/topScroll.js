import React, { useEffect, useState } from 'react';
import '../../assets/css/topScroll.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Nhúng Font Awesome

const TopScroll = () => {
  const [visible, setVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`top-scroll ${visible ? 'visible' : ''}`} onClick={scrollToTop}>
      <i className="fas fa-chevron-up"></i> {/* Biểu tượng mũi tên lên */}
    </div>
  );
};

export default TopScroll;
