import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import Header from './header';
import Footer from './footer';
import useUserStore from '../../store/userStore';

function MedicalRecords() {
    const [medicalRecords, setMedicalRecords] = useState([]);
    const { user } = useUserStore();

    useEffect(() => {
        const fetchMedicalRecords = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/medical-records?patient_id=${user.profile.id}`);
                setMedicalRecords(response.data);
            } catch (error) {
                console.error('Error fetching medical records:', error);
            }
        };

        if (user && user.profile) {
            fetchMedicalRecords();
        }
    }, [user]);

    return (
        <div>
            <Header />
            <Container>
                <Typography variant="h4" gutterBottom>Bệnh Án</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Ngày khám</TableCell>
                                <TableCell>Bác sĩ</TableCell>
                                <TableCell>Chẩn đoán</TableCell>
                                <TableCell>Phác đồ điều trị</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {medicalRecords.map((record) => (
                                <TableRow key={record.id}>
                                    <TableCell>{new Date(record.date).toLocaleDateString('en-GB')}</TableCell>
                                    <TableCell>{record.doctor_name}</TableCell>
                                    <TableCell>{record.diagnosis}</TableCell>
                                    <TableCell>{record.treatment_plan}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            <Footer />
        </div>
    );
}

export default MedicalRecords;
