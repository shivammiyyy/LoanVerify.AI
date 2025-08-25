import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { sessionLogin, saveUserData, saveLoanForm, predictLoan, getCurrentUser } from '../controllers/loanControllers.js';

const router = express.Router();

// 1. Complete Firebase sign-in: verify ID token and start session
router.post('/sessionLogin', sessionLogin);

// 2. Save user additional form data (requires auth)
router.post('/save-form', authMiddleware, saveLoanForm);

// 3. Predict loan eligibility
router.post('/predict', authMiddleware, predictLoan);

// 4. Get the current user's record
router.get('/me', authMiddleware, getCurrentUser);

export default router;
