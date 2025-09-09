import express from 'express';
import { authenticateJWT } from '../middleware/auth.js';
import { adminOnly } from '../middleware/roleAuth.js';
import { getUsers, createUser, getUserById, getDashboardStats } from '../controllers/userController.js';
import { userValidationRules, validate } from '../utils/validation.js';

const router = express.Router();

// Admin dashboard stats
router.get('/dashboard/stats', authenticateJWT, adminOnly, getDashboardStats);

// Get all users (admin only)
router.get('/', authenticateJWT, adminOnly, getUsers);

// Create new user (admin only)
router.post('/', authenticateJWT, adminOnly, userValidationRules(), validate, createUser);

// Get user by ID (admin only)
router.get('/:id', authenticateJWT, adminOnly, getUserById);

export default router;