import axios from 'axios';
import logger from '../utils/logger.js';

export async function getPrediction(features) {
  try {
    const resp = await axios.post(process.env.FLASK_API_URL, { features });
    return resp.data.prediction;  // Expects {"prediction": "Eligible"}
  } catch (err) {
    logger.error('Flask API error:', err);
    throw new Error('Prediction service error');
  }
}
