const { validationResult } = require('express-validator');
const Event = require('../models/Event');
const User = require('../models/User');

// ✅ Create Event
exports.createEvent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }

    const { title, description, date, location, category, registerLink, imageUrl } = req.body;

    let imagePath = imageUrl?.trim();
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    const newEvent = new Event({
      title,
      description,
      date,
      location,
      category,
      registerLink,
      image: imagePath || '',
      createdBy: req.user._id,
    });

    await newEvent.save();
    res.status(201).json({ message: '✅ Event created successfully', event: newEvent });
  } catch (err) {
    console.error('❌ Error creating event:', err);
    res.status(500).json({ message: '❌ Failed to create event', error: err.message });
  }
};

// ✅ Get all approved events
exports.getAllApprovedEvents = async (req, res) => {
  try {
    const events = await Event.find({ approved: true }).sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch events', error: error.message });
  }
};

// ✅ Organizer's events
exports.getMyEvents = async (req, res) => {
  try {
    const myEvents = await Event.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(myEvents);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch your events', error: error.message });
  }
};

// ✅ Get all pending events
// ✅ Get all pending events — with organizer name
exports.getPendingEvents = async (req, res) => {
  try {
    const pending = await Event.find({ approved: false })
      .populate('createdBy', 'name email'); // 👈 Populate organizer info
    res.json(pending);
  } catch (err) {
    res.status(500).json({ message: '❌ Failed to fetch pending events', error: err.message });
  }
};


// ✅ Approve or reject an event
// ✅ Approve/Reject event
exports.approveEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { approved } = req.body;

    if (approved === true) {
      const event = await Event.findByIdAndUpdate(id, { approved: true }, { new: true });
      if (!event) return res.status(404).json({ message: '❌ Event not found' });

      return res.json({ message: '✅ Event approved successfully', event });
    } else {
      const event = await Event.findByIdAndDelete(id);
      if (!event) return res.status(404).json({ message: '❌ Event not found' });

      return res.json({ message: '❌ Event rejected and deleted' });
    }
  } catch (error) {
    res.status(500).json({ message: '❌ Approval/Reject failed', error: error.message });
  }
};


// ✅ Register for an event
exports.registerEvent = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (event.registeredUsers.includes(userId)) {
      return res.status(400).json({ message: 'Already registered' });
    }

    event.registeredUsers.push(userId);
    await event.save();

    res.status(200).json({ message: '✅ Registered successfully', event });
  } catch (error) {
    res.status(500).json({ message: '❌ Registration failed', error: error.message });
  }
};

// ✅ Get registered users for an event
exports.getRegisteredUsersForEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id).populate('registeredUsers', 'name email role');
    if (!event) return res.status(404).json({ message: 'Event not found' });

    res.status(200).json({ registeredUsers: event.registeredUsers });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch registered users', error: err.message });
  }
};

// ✅ Toggle bookmark (add/remove)
exports.toggleBookmark = async (req, res) => {
  try {
    const userId = req.user._id;
    const eventId = req.params.id;

    const user = await User.findById(userId);
    const index = user.bookmarks.indexOf(eventId);

    if (index === -1) {
      user.bookmarks.push(eventId);
    } else {
      user.bookmarks.splice(index, 1);
    }

    await user.save();
    res.json({ message: '✅ Bookmark updated', bookmarked: index === -1 });
  } catch (error) {
    res.status(500).json({ message: '❌ Bookmark error', error: error.message });
  }
};

// ✅ Get bookmarked events
exports.getBookmarkedEvents = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('bookmarks');
    res.json(user.bookmarks || []);
  } catch (err) {
    res.status(500).json({ message: '❌ Failed to fetch bookmarked events', error: err.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch event', error: err.message });
  }
};

