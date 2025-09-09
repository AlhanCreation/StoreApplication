import express from 'express';
import { authenticateJWT } from '../middleware/auth.js';
import { adminOnly, storeOwnerOrAdmin, allRoles } from '../middleware/roleAuth.js';
import { 
  getStores, 
  createStore, 
  getStoreById, 
  getStoreRatings, 
  getStoreOwnerDashboard 
} from '../controllers/storeController.js';
import { storeValidationRules, validate } from '../utils/validation.js';

const router = express.Router();

// Store owner dashboard
router.get('/dashboard', authenticateJWT, storeOwnerOrAdmin, getStoreOwnerDashboard);

// Get all stores (all authenticated users)
router.get('/', authenticateJWT, allRoles, getStores);

// Create new store (admin only)
router.post('/', authenticateJWT, adminOnly, storeValidationRules(), validate, createStore);

// Get store by ID
router.get('/:id', authenticateJWT, allRoles, getStoreById);

// Get store ratings
router.get('/:id/ratings', authenticateJWT, storeOwnerOrAdmin, getStoreRatings);

export default router;