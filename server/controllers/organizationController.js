const Organization = require('../models/Organization');
const User = require('../models/User');

// 📌 Get all student organizations
exports.getAllOrganizations = async (req, res) => {
  try {
    const orgs = await Organization.find()
      .populate('president', 'name email')
      .populate('members', 'name email');
    res.json(orgs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch organizations', error: err.message });
  }
};

// ✅ Get single organization
exports.getOrganizationById = async (req, res) => {
  try {
    const org = await Organization.findById(req.params.id)
      .populate('president', 'name email')
      .populate('members', 'name email');

    if (!org) return res.status(404).json({ message: 'Organization not found' });
    res.json(org);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch organization', error: err.message });
  }
};

// 🔁 Toggle follow/unfollow
exports.toggleFollowOrganization = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const orgId = req.params.id;

    const index = user.followedOrganizations.indexOf(orgId);
    if (index === -1) {
      user.followedOrganizations.push(orgId);
    } else {
      user.followedOrganizations.splice(index, 1);
    }

    await user.save();
    res.json({ followed: index === -1 });
  } catch (err) {
    res.status(500).json({ message: 'Failed to follow/unfollow', error: err.message });
  }
};

// ✅ Get followed organizations
exports.getFollowedOrganizations = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('followedOrganizations');
    res.json(user.followedOrganizations);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch followed orgs', error: err.message });
  }
};

// 🎯 Create a new organization
exports.createOrganization = async (req, res) => {
  try {
    // 🔒 Allow only organizers
    if (req.user.role !== 'organizer') {
      return res.status(403).json({ message: 'Only organizers can create organizations' });
    }

    const {
      name,
      description,
      category,
      contactEmail,
      'socialLinks[website]': website,
      'socialLinks[instagram]': instagram,
      'socialLinks[twitter]': twitter,
    } = req.body;

    const logo = req.file ? `/uploads/${req.file.filename}` : null;

    const newOrg = new Organization({
      name,
      description,
      category,
      contactEmail,
      logo,
      socialLinks: {
        website,
        instagram,
        twitter,
      },
      president: req.user._id, // ✅ Authenticated organizer is president
      members: [req.user._id], // Auto-add organizer as first member
    });

    await newOrg.save();
    res.status(201).json({ message: 'Organization created successfully', organization: newOrg });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create organization', error: err.message });
  }
};


