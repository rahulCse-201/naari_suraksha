import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Helper to generate JWT token and set HTTP-only cookie
const sendTokenResponse = (user, statusCode, res, message = 'Success') => {
  // jwt token creation with user id and role, secret key, and expiration time
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || 'naari_suraksha_secret_jwt_key_2026_v1',
    { expiresIn: '30d' }
  );

  const cookieOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production'
  };

  res
    .status(statusCode)
    .cookie('token', token, cookieOptions)
    .json({
      success: true,
      message,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email address is already registered' });
    }

    // STRICT SECURITY RULE: Public registration MUST ALWAYS set role = USER.
    // NEVER trust req.body.role from client.
    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: 'USER'
    });

    sendTokenResponse(user, 201, res, 'Registration successful');
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // Find user including password field for verification
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    sendTokenResponse(user, 200, res, 'Login successful');
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Authenticated
export const logout = async (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true
  });

  return res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
};

// @desc    Get currently logged in user
// @route   GET /api/auth/me
// @access  Authenticated
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};
