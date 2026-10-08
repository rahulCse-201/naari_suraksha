import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { errorHandler } from './middleware/error.middleware.js';


dotenv.config();

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration for frontend
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173'
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Allow during dev
      }
    },
    credentials: true
  })
);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Naari Suraksha Backend API active' });
});




import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import contactRoutes from './routes/contact.routes.js';
import emergencyRoutes from './routes/emergency.routes.js';
import adminRoutes from './routes/admin.routes.js';



// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/emergencies', emergencyRoutes);
app.use('/api/admin', adminRoutes);

// Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Naari Suraksha Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
