from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load the trained model
model = joblib.load("model/decision_tree_model.pkl")

@app.route('/')
def index():
    return "Loan Eligibility Model API is Running"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # Convert input JSON into DataFrame (assuming flat key-value)
        input_df = pd.DataFrame([data])

        # Make prediction (change threshold logic if needed)
        prediction = model.predict(input_df)[0]
        result = "Eligible" if prediction == 1 else "Not Eligible"

        return jsonify({"prediction": result}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001)
