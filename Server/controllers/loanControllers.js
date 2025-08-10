import admin from 'firebase-admin';
import UserLoan from '../model/userModel.js';
import { preprocess } from '../services/preprocess.js';
import { getPrediction } from '../services/flaskService.js';

const SESSION_EXPIRES = 5 * 24 * 60 * 60 * 1000;

export async function sessionLogin(req, res) {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ error: "Missing ID token" });

    try {
        const decoded = await admin.auth().verifyIdToken(idToken);
        const { uid, phone_number } = decoded;
        if (!phone_number) return res.status(400).json({ error: "No phone number on token" });

        // Create user if not exist:
        let user = await UserLoan.findOne({ firebaseUid: uid });
        if (!user) user = await UserLoan.create({ firebaseUid: uid, mobile: phone_number });

        // Issue session cookie
        const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn: SESSION_EXPIRES });
        res.cookie('session', sessionCookie, { maxAge: SESSION_EXPIRES, httpOnly: true, secure: true, sameSite: 'lax' });

        res.status(200).json({ success: true, user });
    } catch (err) {
        console.error('Session login error:', err);
        res.status(401).json({ error: 'Unauthorized' });
    }
}

// Save loan form data
export async function saveLoanForm(req, res) {
    try {
        const fields = req.body; // Validate as needed!
        const user = await UserLoan.findByIdAndUpdate(
            req.user.uid,
            { ...fields },
            { new: true, runValidators: true }
        );
        if (!user) return res.status(404).json({ error: "User not found" });
        res.status(200).json({ success: true, user });
    } catch (err) {
        console.error('Error saving form:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Loan prediction using Flask ML microservice
export async function predictLoan(req, res) {
    try {
        const user = await UserLoan.findById(req.user.uid).select("-mobile,-fullName,-prediction");
        if (!user) return res.status(404).json({ error: "User not found" });

        const features = preprocess(user);
        const prediction = await getPrediction(features);

        user.prediction = prediction;
        await user.save();

        res.json({ success: true, prediction, user });
    } catch (err) {
        console.error('Prediction error:', err);
        res.status(500).json({ error: "Prediction failed" });
    }
}

export async function getCurrentUser(req, res) {
    try {
        const user = await UserLoan.findById(req.user.uid);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.status(200).json({ user });
    } catch (err) {
        console.error('User fetch error:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
