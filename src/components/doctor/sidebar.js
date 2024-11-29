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
            <IconButton 
                edge="start" 
                color="inherit" 
                aria-label="menu" 
                onClick={() => setOpen(true)} 
                sx={{
                    fontSize: 30,
                    padding: 2,
                    backgroundColor: '#3f51b5', // Custom background color
                    color: 'white', // Icon color
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        backgroundColor: '#2c387e', // Darker shade on hover
                        transform: 'scale(1.1)', // Slightly enlarge on hover
                    }
                }}
            >
                <DashboardIcon sx={{ fontSize: 'inherit' }} />
            </IconButton>

            {/* Sidebar Drawer */}
            <Drawer
                anchor="left"
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        backgroundColor: '#2E3B55', // Sidebar background color
                        color: '#fff', // Text color
                        border: 'none',
                        boxShadow: '4px 0 8px rgba(0, 0, 0, 0.1)',
                    },
                }}
            >
                <div className="sidebar">
                    {/* Close button */}
                    <IconButton 
                        onClick={() => setOpen(false)} 
                        sx={{ 
                            position: 'absolute', 
                            top: 20, 
                            right: 20, 
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
                        <ListItem 
                            button 
                            component={Link} 
                            to="/doctor" 
                            selected={location.pathname === '/doctor'}
                        >
                            <ListItemIcon>
                                <IconButton 
                                    sx={{
                                        fontSize: 28, 
                                        padding: 1, 
                                        backgroundColor: '#4caf50', // Green background
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#388e3c', // Darker green on hover
                                        }
                                    }}
                                >
                                    <DashboardIcon />
                                </IconButton>
                            </ListItemIcon>
                            <ListItemText primary="Quản trị" />
                        </ListItem>

                        {/* Quản lý bệnh án */}
                        <ListItem 
                            button 
                            component={Link} 
                            to="/doctor/medical-records" 
                            selected={location.pathname === '/doctor/medical-records'}
                        >
                            <ListItemIcon>
                                <IconButton 
                                    sx={{
                                        fontSize: 28, 
                                        padding: 1, 
                                        backgroundColor: '#2196f3', // Blue background
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#1976d2', // Darker blue on hover
                                        }
                                    }}
                                >
                                    <MedicalServicesIcon />
                                </IconButton>
                            </ListItemIcon>
                            <ListItemText primary="Quản lý bệnh án" />
                        </ListItem>

                        {/* Danh sách đặt lịch */}
                        <ListItem 
                            button 
                            component={Link} 
                            to="/doctor/appointments" 
                            selected={location.pathname === '/doctor/appointments'}
                        >
                            <ListItemIcon>
                                <IconButton 
                                    sx={{
                                        fontSize: 28, 
                                        padding: 1, 
                                        backgroundColor: '#ff5722', // Red background
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#d84315', // Darker red on hover
                                        }
                                    }}
                                >
                                    <EventNoteIcon />
                                </IconButton>
                            </ListItemIcon>
                            <ListItemText primary="Danh sách đặt lịch" />
                        </ListItem>

                        {/* Lịch tái khám */}
                        <ListItem 
                            button 
                            component={Link} 
                            to="/doctor/follow-up-appointments" 
                            selected={location.pathname === '/doctor/follow-up-appointments'}
                        >
                            <ListItemIcon>
                                <IconButton 
                                    sx={{
                                        fontSize: 28, 
                                        padding: 1, 
                                        backgroundColor: '#9c27b0', // Purple background
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#7b1fa2', // Darker purple on hover
                                        }
                                    }}
                                >
                                    <ScheduleIcon />
                                </IconButton>
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
