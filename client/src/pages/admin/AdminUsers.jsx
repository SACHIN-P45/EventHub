import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Toolbar,
  CircularProgress,
  Paper,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Snackbar,
  Alert,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Search, 
  FilterList, 
  Edit, 
  Delete, 
  PersonAdd,
  Refresh,
  Block,
  CheckCircle,
  Close,
  Event
} from '@mui/icons-material';
import Sidebar from '../../components/Sidebar';
import { adminService } from '../../services/adminService';
import dayjs from 'dayjs';

const drawerWidth = 240;

// EnhancedTable Component Implementation
const EnhancedTable = ({
  columns,
  data,
  count,
  page,
  rowsPerPage,
  sortField,
  sortDirection,
  onPageChange,
  onRowsPerPageChange,
  onSort,
  emptyMessage
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ overflowX: 'auto' }}>
      <TableContainer>
        <Table size={isMobile ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  sx={{ 
                    fontWeight: 600, 
                    color: theme.palette.text.primary,
                    width: column.width,
                    whiteSpace: 'nowrap'
                  }}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={sortField === column.id}
                      direction={sortField === column.id ? sortDirection : 'asc'}
                      onClick={() => onSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Event sx={{ fontSize: 60, color: theme.palette.grey[400], mb: 2 }} />
                    <Typography variant="body1" color="textSecondary">
                      {emptyMessage}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow 
                  key={row._id} 
                  hover 
                  sx={{ 
                    '&:nth-of-type(even)': { backgroundColor: theme.palette.action.hover },
                    '&:hover': { backgroundColor: theme.palette.action.selected }
                  }}
                >
                  {columns.map((column) => (
                    <TableCell 
                      key={column.id} 
                      align={column.align || 'left'}
                      sx={{ 
                        color: theme.palette.text.primary,
                        py: isMobile ? 1 : 1.5 
                      }}
                    >
                      {column.render ? column.render(row) : row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      {count > 0 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => onPageChange(newPage)}
          onRowsPerPageChange={(e) => {
            onRowsPerPageChange(parseInt(e.target.value, 10));
            onPageChange(0);
          }}
          sx={{ 
            borderTop: `1px solid ${theme.palette.divider}`,
            '& .MuiTablePagination-toolbar': {
              flexWrap: 'wrap',
              justifyContent: 'center'
            }
          }}
        />
      )}
    </Box>
  );
};

// UserForm Component Implementation
const UserForm = ({ user, onSave, onCancel, editMode }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'user',
    status: user?.status || 'active'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      onSave(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name}
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
            disabled={editMode}
            error={!!errors.email}
            helperText={errors.email}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              label="Role"
              required
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="organizer">Organizer</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              label="Status"
              required
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="suspended">Suspended</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        {!editMode && (
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Password will be auto-generated and sent to the user's email
            </Typography>
          </Grid>
        )}
        
        <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button 
            variant="outlined" 
            onClick={onCancel}
            startIcon={<Close />}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            sx={{ px: 4 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress size={24} />
            ) : editMode ? (
              'Update User'
            ) : (
              'Create User'
            )}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

// Main AdminUsers Component
const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [editMode, setEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  
  const role = 'admin';
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await adminService.getAllUsers();
      setUsers(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch users:', err);
      setSnackbar({ open: true, message: 'Failed to load users', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0); // Reset to first page when searching
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = (value) => {
    setFilterAnchorEl(null);
    if (value) {
      setFilter(value);
      setCurrentPage(0); // Reset to first page when changing filter
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(true);
    setEditMode(true);
    setSelectedUser(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await adminService.deleteUser(selectedUser._id);
      setUsers(users.filter(user => user._id !== selectedUser._id));
      setSnackbar({ open: true, message: 'User deleted successfully', severity: 'success' });
    } catch (err) {
      console.error('Failed to delete user:', err);
      setSnackbar({ open: true, message: 'Failed to delete user: ' + (err.response?.data?.message || err.message), severity: 'error' });
    }
    setOpenDeleteDialog(false);
    setSelectedUser(null);
  };

  const handleUserUpdate = async (formData) => {
    try {
      let savedUser;
      let message;

      if (editMode) {
        // 🔁 Update existing user
        const res = await adminService.updateUser(selectedUser._id, formData);
        savedUser = res.data;
        setUsers(users.map(user => user._id === selectedUser._id ? savedUser : user));
        message = 'User updated successfully';
      } else {
        // ➕ Create new user
        const res = await adminService.createUser(formData);
        savedUser = res.data;
        setUsers([savedUser, ...users]);
        message = 'User created successfully';
      }

      setSnackbar({ 
        open: true, 
        message, 
        severity: 'success' 
      });
      handleCloseDialog();
    } catch (err) {
      console.error('User save failed:', err);
      setSnackbar({ 
        open: true, 
        message: `Failed to ${editMode ? 'update' : 'create'} user: ${err.response?.data?.message || err.message}`, 
        severity: 'error' 
      });
    }
  };

  const handleToggleStatus = async (user) => {
    setSelectedUser(user);
    
    try {
      const updatedStatus = user.status === 'active' ? 'suspended' : 'active';
      const res = await adminService.updateUser(user._id, { status: updatedStatus });
      const updatedUser = res.data;
      
      setUsers(users.map(u => u._id === user._id ? updatedUser : u));
      
      setSnackbar({ 
        open: true, 
        message: `User ${updatedStatus === 'active' ? 'activated' : 'suspended'} successfully`, 
        severity: 'success' 
      });
    } catch (err) {
      console.error('Failed to update user status:', err);
      setSnackbar({ 
        open: true, 
        message: 'Failed to update user status: ' + (err.response?.data?.message || err.message), 
        severity: 'error' 
      });
    }
    setSelectedUser(null);
  };

  const handleSort = (field) => {
    const isAsc = sortField === field && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortField(field);
  };

  const filteredUsers = users
    .filter(user => {
      const matchesSearch = searchTerm === '' || 
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filter === 'all' || user.role === filter;
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      const isAsc = sortDirection === 'asc';
      const aValue = a[sortField] || '';
      const bValue = b[sortField] || '';
      
      if (aValue < bValue) return isAsc ? -1 : 1;
      if (aValue > bValue) return isAsc ? 1 : -1;
      return 0;
    });

  const paginatedUsers = filteredUsers.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  const columns = [
    { 
      id: 'avatar', 
      label: '', 
      width: '5%',
      render: (user) => (
        <Avatar sx={{ 
          bgcolor: theme.palette.primary.main,
          width: 36, 
          height: 36,
          fontSize: 14 
        }}>
          {user.name?.charAt(0) || 'U'}
        </Avatar>
      )
    },
    { 
      id: 'name', 
      label: 'Name', 
      width: '20%',
      sortable: true,
      render: (user) => user.name || 'N/A'
    },
    { 
      id: 'email', 
      label: 'Email', 
      width: '25%',
      sortable: true,
      render: (user) => user.email || 'N/A'
    },
    { 
      id: 'role', 
      label: 'Role', 
      width: '15%',
      render: (user) => (
        <Chip 
          label={user.role} 
          color={
            user.role === 'admin' ? 'primary' : 
            user.role === 'organizer' ? 'secondary' : 'default'
          } 
          size="small"
          variant="outlined"
          sx={{ textTransform: 'capitalize' }}
        />
      )
    },
    { 
      id: 'status', 
      label: 'Status', 
      width: '15%',
      render: (user) => (
        <Chip 
          label={user.status || 'active'} 
          color={user.status === 'active' ? 'success' : 'error'} 
          size="small"
          onClick={() => handleToggleStatus(user)}
          icon={user.status === 'active' ? 
            <CheckCircle fontSize="small" /> : 
            <Block fontSize="small" />
          }
          sx={{ 
            textTransform: 'capitalize',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: theme.palette.action.hover
            }
          }}
        />
      )
    },
    { 
      id: 'createdAt', 
      label: 'Registered', 
      width: '15%',
      sortable: true,
      render: (user) => user.createdAt ? 
        dayjs(user.createdAt).format('MMM D, YYYY') : 
        'N/A'
    },
    { 
      id: 'actions', 
      label: 'Actions', 
      width: '15%',
      align: 'right',
      render: (user) => (
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
          <IconButton 
            onClick={() => {
              setSelectedUser(user);
              setEditMode(true);
              setOpenDialog(true);
            }}
            color="primary"
            size="small"
            aria-label="update user"
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton 
            onClick={() => {
              setSelectedUser(user);
              setOpenDeleteDialog(true);
            }}
            color="error"
            size="small"
            aria-label="delete user"
          >
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      )
    }
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      <Sidebar role={role} />

      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: isMobile ? 1 : 3, 
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          maxWidth: '100%',
          overflowX: 'hidden'
        }}
      >
        <Toolbar />
        <Container maxWidth="xl" sx={{ px: isMobile ? 0 : 3 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            flexWrap: 'wrap',
            mb: 3,
            gap: 2,
            px: isMobile ? 2 : 0
          }}>
            <Box>
              <Typography variant="h4" component="h1" sx={{ 
                fontWeight: 700, 
                color: theme.palette.text.primary,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: isMobile ? '1.5rem' : '2rem'
              }}>
                👥 User Management
              </Typography>
              <Typography variant="subtitle1" sx={{ 
                color: theme.palette.text.secondary,
                mt: 1,
                fontSize: isMobile ? '0.875rem' : '1rem'
              }}>
                Manage all users, roles, and permissions
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<PersonAdd />}
                onClick={() => {
                  setSelectedUser(null);
                  setEditMode(false);
                  setOpenDialog(true);
                }}
                sx={{ 
                  borderRadius: 2,
                  textTransform: 'none',
                  boxShadow: theme.shadows[1],
                  '&:hover': { boxShadow: theme.shadows[3] }
                }}
              >
                {isMobile ? 'Add' : 'Add User'}
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={fetchUsers}
                sx={{ 
                  borderRadius: 2,
                  textTransform: 'none',
                }}
              >
                {isMobile ? 'Refresh' : 'Refresh Data'}
              </Button>
            </Box>
          </Box>
          
          {/* Filters and Search */}
          <Paper sx={{ 
            p: 2, 
            mb: 3, 
            borderRadius: 2,
            boxShadow: theme.shadows[1],
            display: 'flex', 
            alignItems: 'center',
            gap: 2,
            flexDirection: isMobile ? 'column' : 'row'
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              flex: 1,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              px: 1,
              width: isMobile ? '100%' : 'auto'
            }}>
              <IconButton>
                <Search />
              </IconButton>
              <InputBase
                placeholder="Search users..."
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ flex: 1 }}
              />
            </Box>
            
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              onClick={handleFilterClick}
              sx={{ 
                borderRadius: 2,
                textTransform: 'none',
                width: isMobile ? '100%' : 'auto'
              }}
            >
              {filter === 'all' ? 'All Roles' : 
                filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Button>
            
            <Menu
              anchorEl={filterAnchorEl}
              open={Boolean(filterAnchorEl)}
              onClose={() => handleFilterClose(null)}
            >
              <MenuItem onClick={() => handleFilterClose('all')}>All Roles</MenuItem>
              <MenuItem onClick={() => handleFilterClose('admin')}>Admin</MenuItem>
              <MenuItem onClick={() => handleFilterClose('organizer')}>Organizer</MenuItem>
              <MenuItem onClick={() => handleFilterClose('user')}>User</MenuItem>
            </Menu>
          </Paper>
          
          {/* Users Table */}
          {loading ? (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              height: '50vh'
            }}>
              <CircularProgress size={60} />
            </Box>
          ) : (
            <Paper sx={{ 
              borderRadius: 2,
              boxShadow: theme.shadows[1],
              overflow: 'hidden'
            }}>
              <EnhancedTable
                columns={columns}
                data={paginatedUsers}
                count={filteredUsers.length}
                page={currentPage}
                rowsPerPage={rowsPerPage}
                sortField={sortField}
                sortDirection={sortDirection}
                onPageChange={setCurrentPage}
                onRowsPerPageChange={setRowsPerPage}
                onSort={handleSort}
                emptyMessage="No users found matching your criteria"
              />
            </Paper>
          )}
        </Container>
      </Box>
      
      {/* Create/Edit User Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        fullWidth 
        maxWidth="sm"
        fullScreen={isMobile}
      >
        <DialogTitle sx={{ 
          fontWeight: 700, 
          backgroundColor: theme.palette.primary.main, 
          color: theme.palette.common.white,
          py: 2
        }}>
          {editMode ? 'Edit User' : 'Create New User'}
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <UserForm 
            user={selectedUser} 
            onSave={handleUserUpdate} 
            onCancel={handleCloseDialog} 
            editMode={editMode}
          />
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={openDeleteDialog} 
        onClose={() => setOpenDeleteDialog(false)}
        fullScreen={isMobile}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete user <strong>{selectedUser?.name}</strong>? 
            This action cannot be undone.
          </DialogContentText>
          {selectedUser?.eventsCount > 0 && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              This user has created {selectedUser.eventsCount} event(s). 
              Deleting them will also delete all associated events.
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleConfirmDelete} 
            color="error"
            variant="contained"
            startIcon={<Delete />}
          >
            Delete User
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%', boxShadow: theme.shadows[3] }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminUsers;