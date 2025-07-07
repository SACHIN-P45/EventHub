const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { register, login ,updatePassword} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/update-password', protect, updatePassword);

module.exports = router;
