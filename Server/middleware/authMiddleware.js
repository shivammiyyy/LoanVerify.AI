import { auth } from 'firebase-admin';
import logger from '../utils/logger.js';

export default async function authMiddleware(req, res, next) {
  const idToken = req.headers.authorization?.split('Bearer ')[1];
  if (!idToken) return res.status(401).json({ error: 'Missing token' });

  try {
    const decoded = await auth().verifyIdToken(idToken);
    req.user = { uid: decoded.uid, phone: decoded.phone_number };
    next();
  } catch (err) {
    logger.error('Token verify failed:', err);
    res.status(401).json({ error: 'Invalid token' });
  }
}
