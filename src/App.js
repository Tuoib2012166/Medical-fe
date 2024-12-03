import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/user/homepage';
import Login from './components/user/login';
import Register from './components/user/register'; 
import Pricelist from './components/user/priceList';
import Braces from './components/user/braces';
import TopScroll from './components/user/topScroll';
import News from './components/user/news';
import NewsImplant from './components/user/newsImplant';
import Admin from './components/admin/admin';
import Doctor from './components/doctor/doctor';
import DoctorList from "./components/user/DoctorList";
import ServicePage from "./components/user/ServicePage";
import Appointments from "./components/user/appointments";
import AppointmentForm from './components/user/AppointmentForm';
import RangSu from './components/user/svNews/RangSu'; // Import component RangSu
import Implant from './components/user/svNews/Implant'; // Import component Implant
import NiengRang from './components/user/svNews/NiengRang'; // Import component Niềng Răng
import MatDanSuVeneer from './components/user/svNews/MatDanSuVeneer'; // Import component Mặt Dán Sứ Veneer
import TayTrangRang from './components/user/svNews/TayTrangRang'; // Import component Tẩy Trắng Răng
import NhoRangKhon from './components/user/svNews/NhoRangKhon'; // Import component Nhổ Răng Khôn
import BenhLyNhaChu from './components/user/svNews/BenhLyNhaChu'; // Import component Bệnh Lý Nha Chu
import DieuTriTuy from './components/user/svNews/DieuTriTuy'; // Import component Điều Trị Tủy
import HanTramRang from './components/user/svNews/HanTramRang'; // Import component Hàn Trám Răng
import ChamSocRangMieng from './components/user/svNews/ChamSocRangMieng'; // Import component Chăm Sóc Răng Miệng
import DoctorDetail from './components/user/doctors/DoctorDetail';
import UserForm from './components/user/UserForm';
import MedicalRecords from './components/user/MedicalRecords';
import FollowUpAppointments from './components/user/FollowUpAppointments';
import ForgotPassword from './components/user/ForgotPassword';


function App() {
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />   
          <Route path="/braces" element={<Braces />} />  
          <Route path="/priceList" element={<Pricelist />} />
          <Route path="/doctorList" element={<DoctorList />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/AppointmentForm" element={<AppointmentForm />} />
          <Route path="/news" element={<News />} />
          <Route path="/newsImplant" element={<NewsImplant />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/doctor/*" element={<Doctor />} />
          <Route path="/rangsu" element={<RangSu />} /> 
          <Route path="/implant" element={<Implant />} /> 
          <Route path="/niengrang" element={<NiengRang />} />
          <Route path="/MatDanSuVeneer" element={<MatDanSuVeneer />} />
          <Route path="/taytrangrang" element={<TayTrangRang />} />
          <Route path="/nhorangkhon" element={<NhoRangKhon />} />
          <Route path="/BenhLyNhaChu" element={<BenhLyNhaChu />} />
          <Route path="/dieutrituy" element={<DieuTriTuy />} />
          <Route path="/hantramrang" element={<HanTramRang />} />
          <Route path="/chamsocrangmieng" element={<ChamSocRangMieng />} />
          <Route path="/UserForm" element={<UserForm />} />
          <Route path="/MedicalRecords" element={<MedicalRecords />} />
          <Route path="/FollowUpAppointments" element={<FollowUpAppointments />} />
          <Route path="/:doctorName" element={<DoctorDetail />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
        </Routes>
        <TopScroll />
      </div>
    </Router>
  );
}

export default App;
