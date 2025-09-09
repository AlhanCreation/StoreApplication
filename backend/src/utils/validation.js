import { body, validationResult } from 'express-validator';

// Validation rules
export const userValidationRules = () => {
  return [
    body('name')
      .isLength({ min: 3, max: 60 })
      .withMessage('Name must be between 3 and 60 characters'),
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email'),
    body('password')
      .isLength({ min: 8, max: 16 })
      .withMessage('Password must be between 8 and 16 characters')
      .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
      .withMessage('Password must contain at least one uppercase letter and one special character'),
    body('address')
      .optional()
      .isLength({ max: 400 })
      .withMessage('Address must not exceed 400 characters')
  ];
};

export const storeValidationRules = () => {
  return [
    body('name')
      .notEmpty()
      .withMessage('Store name is required')
      .isLength({ min: 1, max: 255 })
      .withMessage('Store name must not exceed 255 characters'),
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email'),
    body('address')
      .optional()
      .isLength({ max: 400 })
      .withMessage('Address must not exceed 400 characters')
  ];
};

export const ratingValidationRules = () => {
  return [
    body('rating')
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be between 1 and 5'),
    body('store_id')
      .isInt({ min: 1 })
      .withMessage('Valid store ID is required')
  ];
};

export const loginValidationRules = () => {
  return [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email'),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
  ];
};

// Check validation results
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};