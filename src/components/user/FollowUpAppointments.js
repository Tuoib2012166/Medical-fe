import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import Header from './header';
import Footer from './footer';
import useUserStore from '../../store/userStore';

function FollowUpAppointments() {
    const [followUpAppointments, setFollowUpAppointments] = useState([]);
    const { user } = useUserStore();

    useEffect(() => {
        const fetchFollowUpAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:8080/follow-up-appointments');
                const filteredFollowUpAppointments = response.data.filter(appointment => appointment.patient_id == user.profile.id);
                setFollowUpAppointments(filteredFollowUpAppointments);
            } catch (error) {
                console.error('Error fetching follow-up appointments:', error);
            }
        };

        if (user && user.profile) {
            fetchFollowUpAppointments();
        }
    }, [user]);

    return (
        <div>
            <Header />
            <Container>
                <Typography variant="h4" gutterBottom>Lịch Tái Khám</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Bệnh nhân</TableCell>
                                <TableCell>Bác sĩ</TableCell>
                                <TableCell>Ngày tái khám</TableCell>
                                <TableCell>Ghi chú</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {followUpAppointments.map((appointment) => (
                                <TableRow key={appointment.id}>
                                    <TableCell>{appointment.patient_name}</TableCell>
                                    <TableCell>{appointment.doctor_name}</TableCell>
                                    <TableCell>{new Date(appointment.follow_up_date).toLocaleDateString('en-GB')}</TableCell>
                                    <TableCell>{appointment.notes}</TableCell>
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

export default FollowUpAppointments;
