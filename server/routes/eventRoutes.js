const express = require('express');
const { body } = require('express-validator');
const multer = require('multer');
const path = require('path');

const router = express.Router();
const {
  createEvent,
  getPendingEvents,
  approveEvent,
  getAllApprovedEvents,
  getMyEvents,
  getRegisteredUsersForEvent,
  bookmarkEvent,
  getBookmarkedEvents,
  toggleBookmark,
  getEventById,
} = require('../controllers/eventController');

const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// 📁 Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
      return cb(new Error('Only images are allowed (.jpg, .jpeg, .png, .webp)'));
    }
    cb(null, true);
  },
});

// 🧾 Validation Middleware
const eventValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('date').isISO8601().withMessage('Date must be valid'),
  body('location').notEmpty().withMessage('Location is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('registerLink').isURL().withMessage('A valid registration link is required'),
];

// 🔽 Routes

// ✅ Public - Get All Approved Events
router.get('/', getAllApprovedEvents);

// ✅ Organizer - Create Event
router.post(
  '/',
  protect,
  authorizeRoles('organizer'),
  upload.single('image'), // file optional
  eventValidation,
  createEvent
);

// ✅ Organizer - Get Their Events
router.get('/my', protect, authorizeRoles('organizer'), getMyEvents);

// ✅ Admin - Get Pending Events
router.get('/pending/all', protect, authorizeRoles('admin'), getPendingEvents);

// ✅ Admin - Approve Event
router.put('/:id/approve', protect, authorizeRoles('admin'), approveEvent);

// ✅ Get Event Registrations
router.get('/:id/registrations', protect, getRegisteredUsersForEvent);

// ✅ Bookmarks
router.get('/bookmarked', protect, getBookmarkedEvents);
router.post('/:id/bookmark', protect, toggleBookmark); // only this needed
router.get('/:id', getEventById); // ⬅️ Add this if missing

module.exports = router;
