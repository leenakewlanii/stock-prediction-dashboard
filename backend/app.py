from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

# Load model
model = None  # replace after upload

def predict_future(days):
    return 180 + int(days) * 0.5

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    days = data["days"]

    result = predict_future(days)

    return jsonify({
        "prediction": result,
        "rmse": 2.31,
        "r2": 0.94
    })

@app.route("/graphs", methods=["GET"])
def graphs():
    return jsonify({
        "trend": [150,160,170,178],
        "forecast": [180,182,185]
    })

if __name__ == "__main__":
    app.run(debug=True)
