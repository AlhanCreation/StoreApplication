import express from 'express';
import { authenticateJWT } from '../middleware/auth.js';
import { registerUser, loginUser, updatePassword } from '../controllers/authController.js';
import { userValidationRules, loginValidationRules, validate } from '../utils/validation.js';
import { body } from 'express-validator';

const router = express.Router();

// User registration (only for normal users)
router.post('/register', userValidationRules(), validate, registerUser);

// User login
router.post('/login', loginValidationRules(), validate, loginUser);

// Update password (authenticated users only)
router.put('/password', 
  authenticateJWT,
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword')
      .isLength({ min: 8, max: 16 })
      .withMessage('New password must be between 8 and 16 characters')
      .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
      .withMessage('New password must contain at least one uppercase letter and one special character')
  ],
  validate,
  updatePassword
);

export default router;