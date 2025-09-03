import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { phoneLogin, saveLoanForm, predictLoan, getCurrentUser } from '../controllers/loanControllers.js';

const router = express.Router();

// Remove Firebase sessionLogin route

// Add new phoneLogin route for phone.email authentication
router.post('/phone-login', phoneLogin);

// Save user additional form data (requires auth)
router.post('/save-form', authMiddleware, saveLoanForm);

// Predict loan eligibility (requires auth)
router.post('/predict', authMiddleware, predictLoan);

// Get the current user's record (requires auth)
router.get('/me', authMiddleware, getCurrentUser);

export default router;
