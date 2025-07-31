// services/modelService.js
im
const MODEL_API_URL = process.env.MODEL_API_URL || "http://localhost:5001/predict";

async function getPrediction(features) {
  try {
    const res = await axios.post(MODEL_API_URL, { features });
    return res.data.prediction;
  } catch (error) {
    console.error("Model prediction failed:", error.message);
    throw new Error("Model service unavailable");
  }
}

export default getPrediction;