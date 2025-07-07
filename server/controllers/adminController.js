const User = require('../models/User');
const Event = require('../models/Event');
const bcrypt = require('bcryptjs');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};
exports.getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalEvents = await Event.countDocuments();
    const approvedEvents = await Event.countDocuments({ approved: true });
    const pendingEvents = await Event.countDocuments({ approved: false });

    res.json({
      totalUsers,
      totalEvents,
      approvedEvents,
      pendingEvents,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stats', error: err.message });
  }
};
exports.createUser = async (req, res) => {
  try {
    const { name, email, role, status } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // default password (you can randomize or send email link)
    const defaultPassword = 'Password@123';
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    const newUser = new User({
      name,
      email,
      role,
      status,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Create user error:', err);
    res.status(500).json({ message: 'Server error while creating user' });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const pending = await Event.countDocuments({ approved: false });
    const activeEvents = await Event.countDocuments({ approved: true });
    const totalUsers = await User.countDocuments();
    // Example revenue: sum of `amount` in a Transactions collection
    const revenue = 2450; // or compute dynamically

    res.json({ pending, activeEvents, totalUsers, revenue });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
};

// GET /api/admin/recent-activity
exports.getRecentActivity = async (req, res) => {
  const recentEvents = await Event.find().sort({ createdAt: -1 }).limit(3).populate('createdBy', 'name');
  res.json(recentEvents);
};
/** Update existing user */
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, role, status } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = name ?? user.name;
    user.role = role ?? user.role;
    user.status = status ?? user.status;
    await user.save();

    const result = user.toObject();
    delete result.password;
    res.json(result);
  } catch (err) {
    console.error('Update user error:', err);
    res.status(500).json({ message: 'Failed to update user' });
  }
};

/** Delete user */
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Optional: check for foreign key constraints like events created by the user
    await User.findByIdAndDelete(id);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('❌ Failed to delete user:', error);
    res.status(500).json({ message: error.message || 'Unexpected server error' });
  }
};
