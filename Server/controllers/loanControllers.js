import axios from 'axios';
import UserLoan from '../model/userModel.js';
import { preprocess } from '../services/preprocess.js';
import { getPrediction } from '../services/flaskService.js';

const SESSION_EXPIRES = 5 * 24 * 60 * 60 * 1000;

export async function phoneLogin(req, res) {
  const { user_json_url } = req.body;
  if (!user_json_url) return res.status(400).json({ error: "Missing user_json_url" });

  try {
    // Fetch verified user data from phone.email URL
    const response = await axios.get(user_json_url);
    const { user_phone_number, user_first_name, user_last_name } = response.data;

    if (!user_phone_number) return res.status(400).json({ error: "No phone number found" });

    // Find or create user by phone number
    let user = await UserLoan.findOne({ mobile: user_phone_number });
    if (!user) {
      user = await UserLoan.create({
        mobile: user_phone_number,
        fullName: `${user_first_name || ""} ${user_last_name || ""}`.trim(),
      });
    }

    // Setup your session (example using express-session)
    req.session.userId = user._id;
    req.session.cookie.maxAge = SESSION_EXPIRES;

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error('Phone login error:', err);
    res.status(500).json({ error: "Authentication failed" });
  }
}

// Keep other functions unchanged except ensure user ID comes from your session
export async function saveLoanForm(req, res) {
  try {
    const fields = req.body;
    const user = await UserLoan.findByIdAndUpdate(
      req.session.userId,
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

export async function predictLoan(req, res) {
  try {
    const user = await UserLoan.findById(req.session.userId).select("-mobile,-fullName,-prediction");
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
    const user = await UserLoan.findById(req.session.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ user });
  } catch (err) {
    console.error('User fetch error:', err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
