import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { Dashboard as DashboardIcon, MedicalServices as MedicalServicesIcon, EventNote as EventNoteIcon, Schedule as ScheduleIcon, Close as CloseIcon } from '@mui/icons-material';
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
                        <ListItem button component={Link} to="/doctor" selected={location.pathname === '/doctor'}>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Quản trị" />
                        </ListItem>

                        {/* Quản lý bệnh án */}
                        <ListItem button component={Link} to="/doctor/medical-records" selected={location.pathname === '/doctor/medical-records'}>
                            <ListItemIcon>
                                <MedicalServicesIcon />
                            </ListItemIcon>
                            <ListItemText primary="Quản lý bệnh án" />
                        </ListItem>

                        {/* Danh sách đặt lịch */}
                        <ListItem button component={Link} to="/doctor/appointments" selected={location.pathname === '/doctor/appointments'}>
                            <ListItemIcon>
                                <EventNoteIcon />
                            </ListItemIcon>
                            <ListItemText primary="Danh sách đặt lịch" />
                        </ListItem>

                        {/* Lịch tái khám */}
                        <ListItem button component={Link} to="/doctor/follow-up-appointments" selected={location.pathname === '/doctor/follow-up-appointments'}>
                            <ListItemIcon>
                                <ScheduleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Lịch tái khám" />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </div>
    );
};

export default Sidebar;
