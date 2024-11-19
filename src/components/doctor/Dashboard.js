import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Đăng ký các thành phần cần thiết cho Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [stats, setStats] = useState({
        patients: 0,
        appointments: 0,
        medicalRecords: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [patientsRes, appointmentsRes, medicalRecordsRes] = await Promise.all([
                    axios.get('http://localhost:8080/patients'),
                    axios.get('http://localhost:8080/appointments'),
                    axios.get('http://localhost:8080/medical-records')
                ]);

                setStats({
                    patients: patientsRes.data.length,
                    appointments: appointmentsRes.data.length,
                    medicalRecords: medicalRecordsRes.data.length
                });
            } catch (error) {
                toast.error('Failed to fetch statistics');
            }
        };

        fetchStats();
    }, []);

    // Cấu hình dữ liệu cho biểu đồ
    const chartData = {
        labels: ['Bệnh nhân', 'Lịch hẹn', 'Bệnh án'],
        datasets: [
            {
                label: 'Thống kê',
                data: [stats.patients, stats.appointments, stats.medicalRecords],
                backgroundColor: ['#007bff', '#28a745', '#dc3545'],
                borderColor: ['#0056b3', '#1e7e34', '#c82333'],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Thống kê tổng quan',
            },
        },
    };

    return (
        <div>
            <h3>Bảng điều khiển</h3>
            <div className="row">
                {/* Biểu đồ thống kê */}
                <div className="col-12 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Biểu đồ thống kê</h4>
                            <Bar data={chartData} options={chartOptions} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
