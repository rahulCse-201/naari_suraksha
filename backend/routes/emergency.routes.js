import express from 'express';
import { createEmergency, getMyEmergencies, getEmergencyById } from '../controllers/emergency.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);
router.post('/', createEmergency);
router.get('/my', getMyEmergencies);
router.get('/:id', getEmergencyById);

export default router;
