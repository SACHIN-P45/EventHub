import React, { useState, useEffect, useRef } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Collapse,
  Avatar,
  Typography,
  IconButton,
  Badge,
  Tooltip,
  Zoom,
  InputBase,
  Switch
} from '@mui/material';
import {
  Dashboard,
  Event,
  AddBox,
  AdminPanelSettings,
  Help,
  People,
  Logout,
  Group,
  ChevronLeft,
  ChevronRight,
  Notifications,
  Search,
  Settings,
  ExpandMore,
  ExpandLess,
  DarkMode,
  LightMode
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import { keyframes } from '@emotion/react';
import { motion, AnimatePresence } from 'framer-motion';

const drawerWidth = 260;
const collapsedWidth = 80;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    background: '#ffffff',
    color: '#333333',
    transition: theme.transitions.create(['width', 'transform'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard,
    }),
    overflowX: 'hidden',
    border: 'none',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.08)',
    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
  },
  '&.collapsed .MuiDrawer-paper': {
    width: collapsedWidth,
    overflowX: 'hidden',
    transition: theme.transitions.create(['width', 'transform'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard,
    }),
  }
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  margin: '8px 16px',
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  animation: `${fadeIn} 0.5s ease forwards`,
  '&:hover': {
    backgroundColor: 'rgba(25, 118, 210, 0.08)',
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main,
      animation: `${pulse} 1.5s infinite`,
    }
  },
  '&.Mui-selected': {
    backgroundColor: 'rgba(25, 118, 210, 0.15)',
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: 'rgba(25, 118, 210, 0.2)',
    },
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main,
    }
  }
}));

const UserProfile = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '20px 16px',
  marginBottom: '12px',
  background: 'rgba(25, 118, 210, 0.05)',
  borderRadius: '0 0 16px 16px',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    background: 'rgba(25, 118, 210, 0.1)',
  }
}));

const AnimatedIcon = styled(ListItemIcon)(({ theme }) => ({
  transition: 'all 0.3s ease',
  minWidth: '36px',
  color: theme.palette.primary.main,
}));

const CollapseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: 12,
  top: 12,
  color: theme.palette.primary.main,
  background: 'rgba(25, 118, 210, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(25, 118, 210, 0.2)',
    transform: 'scale(1.1)',
  }
}));

const NotificationBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 4,
    top: 4,
    border: `2px solid ${theme.palette.background.paper}`,
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    fontWeight: 600,
    fontSize: '0.7rem',
    animation: `${pulse} 1.5s infinite`,
  }
}));

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 20,
  backgroundColor: 'rgba(0, 0, 0, 0.05)',
  margin: '0 16px 12px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.primary.main,
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#333333',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1.5, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    '&::placeholder': {
      color: theme.palette.primary.main,
      opacity: 0.7,
    },
    '&:focus': {
      outline: 'none',
    }
  },
}));

const FloatingLabel = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  top: -10,
  left: 50,
  backgroundColor: theme.palette.background.paper,
  padding: '0 8px',
  fontSize: '0.75rem',
  color: theme.palette.primary.main,
  fontWeight: 600,
  zIndex: 1,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 4,
}));

const Sidebar = ({ onThemeChange, darkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('student');
  const [collapsed, setCollapsed] = useState(false);
  const [notifications, setNotifications] = useState(5);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGroup, setActiveGroup] = useState(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user')) || {
      name: 'Sarah Johnson',
      email: 'sarah@university.edu',
      role: 'student',
      avatar: null
    };
    
    if (!userData) {
      navigate('/login');
      return;
    }
    
    setUser(userData);
    setRole(userData?.role || 'student');
  }, [navigate]);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  const getDashboardPath = () => {
    switch (role) {
      case 'student':
        return '/student/dashboard';
      case 'organizer':
        return '/organizer/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/student/dashboard';
    }
  };

  const menuGroups = {
    events: {
      title: 'Events',
      icon: <Event />,
      items: [
        { text: 'All Events', path: '/events', icon: <Event /> },
        { text: 'My Registrations', path: '/my-events', icon: <AssignmentTurnedIn /> },
        { text: 'Calendar', path: '/calendar', icon: <CalendarToday /> },
      ],
      roles: ['student', 'organizer', 'admin']
    },
    management: {
      title: 'Management',
      icon: <AdminPanelSettings />,
      items: [
        { text: 'Create Event', path: '/create-event', icon: <AddBox /> },
        { text: 'My Organizations', path: '/organizations', icon: <Group /> },
        { text: 'Analytics', path: '/analytics', icon: <Analytics /> },
      ],
      roles: ['organizer']
    },
    admin: {
      title: 'Admin',
      icon: <AdminPanelSettings />,
      items: [
        { text: 'User Management', path: '/admin/users', icon: <People /> },
        { text: 'Event Approvals', path: '/admin/approvals', icon: <Approval /> },
        { text: 'System Settings', path: '/admin/settings', icon: <Settings /> },
      ],
      roles: ['admin']
    }
  };

  const staticLinks = [
    { text: 'Dashboard', icon: <Dashboard />, path: getDashboardPath() },
    { text: 'Help Center', icon: <Help />, path: '/help' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const isActive = (path, matchExact = false) => {
    return matchExact 
      ? location.pathname === path
      : location.pathname.startsWith(path);
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleSearchClick = () => {
    if (collapsed) {
      setCollapsed(false);
      setTimeout(() => setSearchOpen(true), 300);
    } else {
      setSearchOpen(!searchOpen);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleGroup = (group) => {
    setActiveGroup(activeGroup === group ? null : group);
  };

  if (!user) return null;

  return (
    <StyledDrawer variant="permanent" className={collapsed ? 'collapsed' : ''}>
      <Toolbar />
      
      {/* User Profile */}
      <Collapse in={!collapsed} orientation="horizontal">
        <UserProfile onClick={() => navigate('/profile')}>
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Avatar 
              sx={{ 
                width: 56, 
                height: 56, 
                mr: 2,
                bgcolor: theme.palette.primary.main,
                color: '#ffffff',
              }}
            >
              {user.name.charAt(0)}
            </Avatar>
          </motion.div>
          <div>
            <Typography 
              variant="subtitle1" 
              noWrap 
              className="user-name"
              sx={{ 
                fontWeight: 700, 
                color: '#333333',
                letterSpacing: '0.5px'
              }}
            >
              {user.name}
            </Typography>
            <Typography variant="caption" noWrap sx={{ color: theme.palette.primary.main, fontWeight: 500 }}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </Typography>
          </div>
        </UserProfile>
      </Collapse>

      {/* Collapse Button */}
      <CollapseButton onClick={toggleCollapse}>
        {collapsed ? 
          <motion.div 
            whileHover={{ rotate: 90, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ChevronRight />
          </motion.div> : 
          <motion.div 
            whileHover={{ rotate: -90, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ChevronLeft />
          </motion.div>
        }
      </CollapseButton>

      {/* Search Bar */}
      <AnimatePresence>
        {(!collapsed || searchOpen) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SearchContainer>
              <SearchIconWrapper>
                <Search />
              </SearchIconWrapper>
              <StyledInputBase
                inputRef={searchRef}
                placeholder="Search…"
                value={searchQuery}
                onChange={handleSearchChange}
                inputProps={{ 'aria-label': 'search' }}
                onBlur={() => !searchQuery && setSearchOpen(false)}
              />
              {searchQuery && (
                <FloatingLabel
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  Search Results
                </FloatingLabel>
              )}
            </SearchContainer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Links */}
      <List sx={{ overflowY: 'auto', overflowX: 'hidden', flexGrow: 1 }}>
        {!collapsed && Object.entries(menuGroups).map(([key, group]) => (
          group.roles.includes(role) && (
            <div key={key}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <StyledListItem
                  button
                  onClick={() => toggleGroup(key)}
                  sx={{ 
                    animationDelay: '0.1s',
                    opacity: 0,
                    backgroundColor: activeGroup === key ? 'rgba(25, 118, 210, 0.1)' : 'transparent'
                  }}
                >
                  <AnimatedIcon>
                    {group.icon}
                  </AnimatedIcon>
                  <ListItemText 
                    primary={group.title} 
                    primaryTypographyProps={{ 
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      color: '#333333',
                      letterSpacing: '0.5px'
                    }} 
                  />
                  {activeGroup === key ? 
                    <ExpandLess sx={{ color: theme.palette.primary.main }} /> : 
                    <ExpandMore sx={{ color: theme.palette.primary.main }} />
                  }
                </StyledListItem>
              </motion.div>
              
              <Collapse in={activeGroup === key} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {group.items.map((item, index) => (
                    <motion.div
                      key={item.text}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Tooltip 
                        title={item.text} 
                        placement="right" 
                        TransitionComponent={Zoom}
                      >
                        <StyledListItem
                          button
                          onClick={() => navigate(item.path)}
                          selected={isActive(item.path)}
                          sx={{ 
                            pl: 6,
                            animationDelay: `${0.15 + (index * 0.05)}s`,
                            opacity: 0,
                            margin: '6px 16px',
                            borderRadius: '12px',
                          }}
                        >
                          <AnimatedIcon>
                            {item.icon}
                          </AnimatedIcon>
                          <ListItemText 
                            primary={item.text} 
                            primaryTypographyProps={{ 
                              fontWeight: isActive(item.path) ? 700 : 500,
                              fontSize: '0.9rem',
                              color: isActive(item.path) ? theme.palette.primary.main : '#555555'
                            }} 
                          />
                        </StyledListItem>
                      </Tooltip>
                    </motion.div>
                  ))}
                </List>
              </Collapse>
            </div>
          )
        ))}

        {staticLinks.map((link, index) => (
          <motion.div
            key={link.text}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Tooltip 
              title={link.text} 
              placement="right" 
              TransitionComponent={Zoom}
              disableHoverListener={!collapsed}
            >
              <StyledListItem
                button
                onClick={() => navigate(link.path)}
                selected={isActive(link.path)}
                sx={{ 
                  animationDelay: `${0.3 + (index * 0.05)}s`,
                  opacity: 0 
                }}
              >
                <AnimatedIcon>
                  {link.icon}
                </AnimatedIcon>
                <Collapse in={!collapsed} orientation="horizontal">
                  <ListItemText 
                    primary={link.text} 
                    primaryTypographyProps={{ 
                      fontWeight: isActive(link.path) ? 700 : 500,
                      fontSize: '0.95rem',
                      color: isActive(link.path) ? theme.palette.primary.main : '#555555'
                    }} 
                  />
                </Collapse>
              </StyledListItem>
            </Tooltip>
          </motion.div>
        ))}
      </List>

      <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.08)', mx: 2, my: 1 }} />

      {/* Notifications */}
      <motion.div whileHover={{ scale: 1.05 }}>
        <Tooltip 
          title="Notifications" 
          placement="right" 
          TransitionComponent={Zoom}
          disableHoverListener={!collapsed}
        >
          <StyledListItem
            button
            onClick={() => navigate('/notifications')}
            sx={{ animationDelay: '0.5s', opacity: 0 }}
          >
            <AnimatedIcon>
              <NotificationBadge badgeContent={notifications} color="secondary">
                <Notifications />
              </NotificationBadge>
            </AnimatedIcon>
            <Collapse in={!collapsed} orientation="horizontal">
              <ListItemText 
                primary="Notifications" 
                primaryTypographyProps={{ 
                  fontSize: '0.95rem',
                  color: '#555555',
                  fontWeight: 500
                }} 
              />
            </Collapse>
          </StyledListItem>
        </Tooltip>
      </motion.div>

      {/* Theme Toggle */}
      <motion.div whileHover={{ scale: 1.05 }}>
        <Tooltip 
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"} 
          placement="right" 
          TransitionComponent={Zoom}
          disableHoverListener={!collapsed}
        >
          <StyledListItem
            button 
            onClick={onThemeChange}
            sx={{ 
              animationDelay: '0.55s',
              opacity: 0,
            }}
          >
            <AnimatedIcon>
              {darkMode ? <LightMode /> : <DarkMode />}
            </AnimatedIcon>
            <Collapse in={!collapsed} orientation="horizontal">
              <ListItemText 
                primary={darkMode ? "Light Mode" : "Dark Mode"} 
                primaryTypographyProps={{ 
                  fontSize: '0.95rem',
                  color: '#555555',
                  fontWeight: 500
                }} 
              />
            </Collapse>
            <Collapse in={!collapsed} orientation="horizontal">
              <Switch 
                checked={darkMode} 
                onChange={onThemeChange} 
                color="primary" 
                sx={{ ml: 1 }}
              />
            </Collapse>
          </StyledListItem>
        </Tooltip>
      </motion.div>

      {/* Search Button (for collapsed state) */}
      {collapsed && (
        <motion.div whileHover={{ scale: 1.1 }}>
          <Tooltip title="Search" placement="right" TransitionComponent={Zoom}>
            <StyledListItem
              button
              onClick={handleSearchClick}
              sx={{ animationDelay: '0.6s', opacity: 0 }}
            >
              <AnimatedIcon>
                <Search />
              </AnimatedIcon>
            </StyledListItem>
          </Tooltip>
        </motion.div>
      )}

      {/* Logout Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ marginTop: 'auto' }}
      >
        <Tooltip 
          title="Logout" 
          placement="right" 
          TransitionComponent={Zoom}
          disableHoverListener={!collapsed}
        >
          <StyledListItem
            button 
            onClick={handleLogout}
            sx={{ 
              animationDelay: '0.65s',
              opacity: 0,
              background: 'rgba(244, 67, 54, 0.05)',
              '&:hover': {
                background: 'rgba(244, 67, 54, 0.08)',
              }
            }}
          >
            <AnimatedIcon sx={{ color: theme.palette.error.main }}>
              <Logout />
            </AnimatedIcon>
            <Collapse in={!collapsed} orientation="horizontal">
              <ListItemText 
                primary="Logout" 
                primaryTypographyProps={{ 
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  color: theme.palette.error.main
                }} 
              />
            </Collapse>
          </StyledListItem>
        </Tooltip>
      </motion.div>
    </StyledDrawer>
  );
};

// Placeholder icons for menu items
const Analytics = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 11V3H8v6H2v12h20V11h-6zm-6-6h4v14h-4V5zm-6 6h4v8H4v-8zm16 8h-4v-6h4v6z"/>
  </svg>
);

const Approval = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
);

const CalendarToday = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/>
  </svg>
);

const AssignmentTurnedIn = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
  </svg>
);

export default Sidebar;