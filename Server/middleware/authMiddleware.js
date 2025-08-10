import admin from 'firebase-admin';
import UserLoan from '../model/userModel.js';

export default async function authMiddleware(req, res, next) {
    const sessionCookie = req.cookies.session;
    if (!sessionCookie)
        return res.status(401).json({ error: 'Unauthorized: No session cookie' });

    try {
        const decoded = await admin.auth().verifySessionCookie(sessionCookie, true);
        // Look up by firebaseUid
        const user = await UserLoan.findOne({ firebaseUid: decoded.uid });
        if (!user) return res.status(401).json({ error: 'User not found' });
        req.user = { uid: user._id, firebaseUid: decoded.uid, mobile: user.mobile };
        next();
    } catch (err) {
        res.clearCookie('session');
        res.status(401).json({ error: 'Invalid session' });
    }
}
