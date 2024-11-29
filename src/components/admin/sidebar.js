import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { Dashboard as DashboardIcon, Close as CloseIcon, LocalHospital as LocalHospitalIcon, Work as WorkIcon, People as PeopleIcon, Event as EventIcon } from '@mui/icons-material';
import '../../assets/css/admin/sidebar.css';

const Sidebar = () => {
    const location = useLocation();
    const [open, setOpen] = React.useState(false);

    return (
        <div>
            {/* Button to open sidebar */}
            <IconButton 
                edge="start" 
                color="inherit" 
                aria-label="menu" 
                onClick={() => setOpen(true)} 
                sx={{
                    fontSize: 30,
                    padding: 2,
                    backgroundColor: '#ff5722', // Custom background color
                    color: 'white', // Icon color
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        backgroundColor: '#2c387e', // Darker shade on hover
                        transform: 'scale(1.1)',
                    }
                }}
            >
                <DashboardIcon sx={{ fontSize: 'inherit' }} />
            </IconButton>

            {/* Sidebar Drawer */}
            <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
                <div className="sidebar">
                    {/* Close button */}
                    <IconButton 
                        onClick={() => setOpen(false)} 
                        sx={{ 
                            position: 'absolute', 
                            top: 10, 
                            right: 10, 
                            fontSize: 30, 
                            padding: 2, 
                            backgroundColor: '#e91e63', // Custom color for the close button
                            color: 'white',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: '#c2185b', // Darker shade on hover
                                transform: 'scale(1.1)',
                            }
                        }} 
                        className="close-btn"
                    >
                        <CloseIcon sx={{ fontSize: 'inherit' }} />
                    </IconButton>
                    
                    <List>
                        {/* Quản trị */}
                        <ListItem button component={Link} to="/admin" selected={location.pathname === '/admin'}>
                            <ListItemIcon>
                                <IconButton sx={{ 
                                    fontSize: 28, 
                                    padding: 1, 
                                    backgroundColor: '#4caf50', // Green background
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#388e3c', // Darker green on hover
                                    }
                                }}>
                                    <DashboardIcon />
                                </IconButton>
                            </ListItemIcon>
                            <ListItemText primary="Quản trị" />
                        </ListItem>

                        {/* Quản lý bệnh nhân */}
                        <ListItem button component={Link} to="/admin/patients" selected={location.pathname === '/admin/patients'}>
                            <ListItemIcon>
                                <IconButton sx={{
                                    fontSize: 28, 
                                    padding: 1, 
                                    backgroundColor: '#2196f3', // Blue background
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#1976d2', // Darker blue on hover
                                    }
                                }}>
                                    <PeopleIcon />
                                </IconButton>
                            </ListItemIcon>
                            <ListItemText primary="Quản lý bệnh nhân" />
                        </ListItem>

                        {/* Quản lý bác sĩ */}
                        <ListItem button component={Link} to="/admin/doctors" selected={location.pathname === '/admin/doctors'}>
                            <ListItemIcon>
                                <IconButton sx={{
                                    fontSize: 28, 
                                    padding: 1, 
                                    backgroundColor: '#ff9800', // Orange background
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#f57c00', // Darker orange on hover
                                    }
                                }}>
                                    <PeopleIcon />
                                </IconButton>
                            </ListItemIcon>
                            <ListItemText primary="Quản lý bác sĩ" />
                        </ListItem>

                        {/* Quản lý đặt lịch */}
                        <ListItem button component={Link} to="/admin/appointments" selected={location.pathname === '/admin/appointments'}>
                            <ListItemIcon>
                                <IconButton sx={{
                                    fontSize: 28, 
                                    padding: 1, 
                                    backgroundColor: '#ff5722', // Red background
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#d84315', // Darker red on hover
                                    }
                                }}>
                                    <EventIcon />
                                </IconButton>
                            </ListItemIcon>
                            <ListItemText primary="Quản lý đặt lịch" />
                        </ListItem>

                        {/* Quản lý dịch vụ */}
                        <ListItem button component={Link} to="/admin/specialties" selected={location.pathname === '/admin/specialties'}>
                            <ListItemIcon>
                                <IconButton sx={{
                                    fontSize: 28, 
                                    padding: 1, 
                                    backgroundColor: '#9c27b0', // Purple background
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#7b1fa2', // Darker purple on hover
                                    }
                                }}>
                                    <WorkIcon />
                                </IconButton>
                            </ListItemIcon>
                            <ListItemText primary="Quản lý dịch vụ" />
                        </ListItem>

                        {/* Quản lý bệnh án */}
                        <ListItem button component={Link} to="/admin/medical-records" selected={location.pathname === '/admin/medical-records'}>
                            <ListItemIcon>
                                <IconButton sx={{
                                    fontSize: 28, 
                                    padding: 1, 
                                    backgroundColor: '#8bc34a', // Light green background
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#689f38', // Darker green on hover
                                    }
                                }}>
                                    <LocalHospitalIcon />
                                </IconButton>
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
