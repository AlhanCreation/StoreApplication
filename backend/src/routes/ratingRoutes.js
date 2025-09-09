import express from 'express';
import { authenticateJWT } from '../middleware/auth.js';
import { userOrAdmin } from '../middleware/roleAuth.js';
import { submitRating, getUserRating, updateRating } from '../controllers/ratingController.js';
import { ratingValidationRules, validate } from '../utils/validation.js';

const router = express.Router();

// Submit rating (normal users only)
router.post('/', authenticateJWT, userOrAdmin, ratingValidationRules(), validate, submitRating);

// Update rating (normal users only)
router.put('/', authenticateJWT, userOrAdmin, ratingValidationRules(), validate, updateRating);

// Get user's rating for a specific store
router.get('/store/:storeId', authenticateJWT, userOrAdmin, getUserRating);

export default router;