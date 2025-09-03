import UserLoan from '../model/userModel.js';

export default async function authMiddleware(req, res, next) {
  try {
    // Check if user session exists (assuming session middleware populates req.session)
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ error: 'Unauthorized: No active session' });
    }

    // Find user by session userId
    const user = await UserLoan.findById(req.session.userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Attach user info to request object for downstream handlers
    req.user = { uid: user._id, mobile: user.mobile, fullName: user.fullName };
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
