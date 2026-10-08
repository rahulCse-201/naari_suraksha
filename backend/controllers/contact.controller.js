import EmergencyContact from '../models/EmergencyContact.js';

// @desc    Get user's emergency contacts
// @route   GET /api/contacts
// @access  Authenticated
export const getContacts = async (req, res, next) => {
  try {
    const contacts = await EmergencyContact.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: contacts.length,
      contacts
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add emergency contact
// @route   POST /api/contacts
// @access  Authenticated
export const createContact = async (req, res, next) => {
  try {
    const { name, phone, relationship } = req.body;

    if (!name || !phone || !relationship) {
      return res.status(400).json({ success: false, message: 'Please provide name, phone, and relationship' });
    }

    const contact = await EmergencyContact.create({
      user: req.user._id,
      name,
      phone,
      relationship
    });

    res.status(201).json({
      success: true,
      message: 'Emergency contact added successfully',
      contact
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update emergency contact
// @route   PUT /api/contacts/:id
// @access  Authenticated
export const updateContact = async (req, res, next) => {
  try {
    const contact = await EmergencyContact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Emergency contact not found' });
    }

    // Security check: Make sure user owns contact
    if (contact.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to modify this contact' });
    }

    const { name, phone, relationship } = req.body;
    if (name) contact.name = name;
    if (phone) contact.phone = phone;
    if (relationship) contact.relationship = relationship;

    await contact.save();

    res.status(200).json({
      success: true,
      message: 'Emergency contact updated successfully',
      contact
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete emergency contact
// @route   DELETE /api/contacts/:id
// @access  Authenticated
export const deleteContact = async (req, res, next) => {
  try {
    const contact = await EmergencyContact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Emergency contact not found' });
    }

    // Security check: Make sure user owns contact
    if (contact.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this contact' });
    }

    await contact.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Emergency contact removed successfully'
    });
  } catch (error) {
    next(error);
  }
};
