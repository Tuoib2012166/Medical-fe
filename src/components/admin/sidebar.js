import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { Dashboard as DashboardIcon, MedicalServices as MedicalServicesIcon, EventNote as EventNoteIcon, Schedule as ScheduleIcon, Close as CloseIcon, LocalHospital as LocalHospitalIcon, Work as WorkIcon, People as PeopleIcon, Event as EventIcon } from '@mui/icons-material';
import '../../assets/css/admin/sidebar.css';

const Sidebar = () => {
    const location = useLocation();
    const [open, setOpen] = React.useState(false);

    return (
        <div>
            {/* Button to open sidebar */}
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setOpen(true)}>
                <DashboardIcon />
            </IconButton>

            {/* Sidebar Drawer */}
            <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
                <div className="sidebar">
                    {/* Close button */}
                    <IconButton onClick={() => setOpen(false)} sx={{ position: 'absolute', top: 10, right: 10 }} className="close-btn">
                        <CloseIcon />
                    </IconButton>
                    
                    <List>
                    {/* Quản trị */}
                    <ListItem button component={Link} to="/admin" selected={location.pathname === '/admin'}>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Quản trị" />
                    </ListItem>

                    {/* Quản lý bệnh nhân */}
                    <ListItem button component={Link} to="/admin/patients" selected={location.pathname === '/admin/patients'}>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Quản lý bệnh nhân" />
                    </ListItem>

                    {/* Quản lý bác sĩ */}
                    <ListItem button component={Link} to="/admin/doctors" selected={location.pathname === '/admin/doctors'}>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Quản lý bác sĩ" />
                    </ListItem>

                    {/* Quản lý đặt lịch */}
                    <ListItem button component={Link} to="/admin/appointments" selected={location.pathname === '/admin/appointments'}>
                        <ListItemIcon>
                            <EventIcon />
                        </ListItemIcon>
                        <ListItemText primary="Quản lý đặt lịch" />
                    </ListItem>

                    {/* Quản lý dịch vụ */}
                    <ListItem button component={Link} to="/admin/specialties" selected={location.pathname === '/admin/specialties'}>
                        <ListItemIcon>
                            <WorkIcon />
                        </ListItemIcon>
                        <ListItemText primary="Quản lý dịch vụ" />
                    </ListItem>

                    {/* Quản lý bệnh án */}
                    <ListItem button component={Link} to="/admin/medical-records" selected={location.pathname === '/admin/medical-records'}>
                        <ListItemIcon>
                            <LocalHospitalIcon />
                        </ListItemIcon>
                        <ListItemText primary="Quản lý bệnh án" />
                    </ListItem>
                </List>
                </div>
            </Drawer>
        </div>
    );
};

export default Sidebar;
