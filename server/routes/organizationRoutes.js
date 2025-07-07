const express = require('express');
const router = express.Router();
const {
  getAllOrganizations,
  getOrganizationById,
  toggleFollowOrganization,
  getFollowedOrganizations,
  createOrganization
} = require('../controllers/organizationController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

// Public
router.get('/', getAllOrganizations);
router.get('/:id', getOrganizationById);

// Authenticated
router.post('/:id/follow', protect, toggleFollowOrganization);
router.get('/followed/me', protect, getFollowedOrganizations);
router.post('/', protect, upload.single('logo'), createOrganization); 

module.exports = router;
