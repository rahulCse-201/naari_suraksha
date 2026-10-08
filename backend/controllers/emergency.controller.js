import EmergencyIncident from '../models/EmergencyIncident.js';

// @desc    Create emergency incident (SOS trigger)
// @route   POST /api/emergencies
// @access  Authenticated
export const createEmergency = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.body;

    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Location coordinates (latitude and longitude) are required to initiate SOS'
      });
    }

    // STRICT SECURITY RULE: Determine user strictly from authentication middleware.
    // NEVER trust req.body.userId!
    const emergency = await EmergencyIncident.create({
      user: req.user._id,
      latitude: Number(latitude),
      longitude: Number(longitude),
      status: 'ACTIVE'
    });

    const populatedEmergency = await EmergencyIncident.findById(emergency._id).populate(
      'user',
      'name email phone'
    );

    res.status(201).json({
      success: true,
      message: 'SOS Emergency Broadcasted Successfully',
      emergency: populatedEmergency
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's emergency history
// @route   GET /api/emergencies/my
// @access  Authenticated
export const getMyEmergencies = async (req, res, next) => {
  try {
    const emergencies = await EmergencyIncident.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: emergencies.length,
      emergencies
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single emergency incident details
// @route   GET /api/emergencies/:id
// @access  Authenticated
export const getEmergencyById = async (req, res, next) => {
  try {
    const emergency = await EmergencyIncident.findById(req.params.id).populate('user', 'name email phone');

    if (!emergency) {
      return res.status(404).json({ success: false, message: 'Emergency incident not found' });
    }

    // Security check: Make sure user owns emergency OR is ADMIN
    if (emergency.user._id.toString() !== req.user._id.toString() && req.user.role !== 'ADMIN') {
      return res.status(403).json({ success: false, message: 'Not authorized to view this emergency incident' });
    }

    res.status(200).json({
      success: true,
      emergency
    });
  } catch (error) {
    next(error);
  }
};
