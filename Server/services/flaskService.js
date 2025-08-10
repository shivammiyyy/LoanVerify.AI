import axios from 'axios';

export async function getPrediction(features) {
    const { data } = await axios.post(process.env.FLASK_SERVICE_URL + '/predict', features);
    return data.prediction;
}
