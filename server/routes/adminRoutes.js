const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const {
  getAllUsers,
  createUser,
  getDashboardStats,
  getRecentActivity,
  updateUser,
  deleteUser
} = require('../controllers/adminController');

// 👥 User Management
router.get('/users', protect, authorizeRoles('admin'), getAllUsers);
router.post('/users', protect, authorizeRoles('admin'), createUser);
// ✅ Update user
router.put('/users/:id', protect, authorizeRoles('admin'),updateUser);

// ✅ Delete user
router.delete('/users/:id', protect,authorizeRoles('admin'),deleteUser);

// 📊 Dashboard Stats
router.get('/stats', protect, authorizeRoles('admin'), getDashboardStats);

// 🕒 Recent Activity
router.get('/recent-activity', protect, authorizeRoles('admin'), getRecentActivity);

module.exports = router;
