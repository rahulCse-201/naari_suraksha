import express from "express";
import {
  getDashboardStats,
  getUsers,
  getEmergencies,
  getEmergencyById,
  updateEmergencyStatus,
} from "../controllers/admin.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/admin.middleware.js";

const router = express.Router();

router.use(protect);
router.use(adminOnly);

router.get("/dashboard", getDashboardStats);
router.get("/users", getUsers);
router.get("/emergencies", getEmergencies);
router.get("/emergencies/:id", getEmergencyById);
router.patch("/emergencies/:id/status", updateEmergencyStatus);

export default router;
