import User from '../models/User.js';
import EmergencyIncident from '../models/EmergencyIncident.js';
import EmergencyContact from '../models/EmergencyContact.js';

// @desc    Get admin dashboard stats & recent activities
// @route   GET /api/admin/dashboard
// @access  Admin
export const getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'USER' });
    const totalEmergencies = await EmergencyIncident.countDocuments();
    const activeEmergencies = await EmergencyIncident.countDocuments({ status: 'ACTIVE' });
    const resolvedEmergencies = await EmergencyIncident.countDocuments({ status: 'RESOLVED' });
    const cancelledEmergencies = await EmergencyIncident.countDocuments({ status: 'CANCELLED' });

    const recentEmergencies = await EmergencyIncident.find()
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalEmergencies,
        activeEmergencies,
        resolvedEmergencies,
        cancelledEmergencies
      },
      recentEmergencies
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users list
// @route   GET /api/admin/users
// @access  Admin
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all emergency incidents with optional status filter
// @route   GET /api/admin/emergencies
// @access  Admin
export const getEmergencies = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = {};

    if (status && ['ACTIVE', 'RESOLVED', 'CANCELLED'].includes(status.toUpperCase())) {
      query.status = status.toUpperCase();
    }

    const emergencies = await EmergencyIncident.find(query)
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: emergencies.length,
      emergencies
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get emergency incident details with user's emergency contacts
// @route   GET /api/admin/emergencies/:id
// @access  Admin
export const getEmergencyById = async (req, res, next) => {
  try {
    const emergency = await EmergencyIncident.findById(req.params.id).populate('user', 'name email phone createdAt');

    if (!emergency) {
      return res.status(404).json({ success: false, message: 'Emergency incident not found' });
    }

    // Also retrieve user's registered emergency contacts
    let contacts = [];
    if (emergency.user && emergency.user._id) {
      contacts = await EmergencyContact.find({ user: emergency.user._id });
    }

    res.status(200).json({
      success: true,
      emergency,
      contacts
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update emergency incident status (ACTIVE -> RESOLVED / CANCELLED)
// @route   PATCH /api/admin/emergencies/:id/status
// @access  Admin
export const updateEmergencyStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!status || !['ACTIVE', 'RESOLVED', 'CANCELLED'].includes(status.toUpperCase())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Status must be ACTIVE, RESOLVED, or CANCELLED'
      });
    }

    const emergency = await EmergencyIncident.findById(req.params.id);
    if (!emergency) {
      return res.status(404).json({ success: false, message: 'Emergency incident not found' });
    }

    emergency.status = status.toUpperCase();
    await emergency.save();

    const updatedEmergency = await EmergencyIncident.findById(emergency._id).populate('user', 'name email phone');

    res.status(200).json({
      success: true,
      message: `Emergency status updated to ${emergency.status}`,
      emergency: updatedEmergency
    });
  } catch (error) {
    next(error);
  }
};
