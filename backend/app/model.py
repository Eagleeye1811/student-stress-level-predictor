import os
import pickle
import numpy as np
import logging
from typing import Tuple, Any
from .schemas import StressInput

logger = logging.getLogger(__name__)

# Path to the model file
MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "models", "stress_model.pkl")

def get_model():
    """
    Load the trained model from disk
    """
    try:
        # Check if model file exists
        if not os.path.exists(MODEL_PATH):
            # Create a simple dummy model for demo purposes
            from sklearn.ensemble import RandomForestClassifier
            model = RandomForestClassifier(n_estimators=100, random_state=42)
            # Dummy data to fit the model
            X = np.random.rand(100, 7)  # 7 features as in our schema
            y = np.random.randint(0, 3, 100)  # 0, 1, 2 for Low, Moderate, High
            model.fit(X, y)
            
            # Create models directory if it doesn't exist
            os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
            
            # Save the dummy model
            with open(MODEL_PATH, 'wb') as f:
                pickle.dump(model, f)
            logger.info("Created and saved dummy model for demonstration")
            return model
        else:
            # Load existing model
            with open(MODEL_PATH, 'rb') as f:
                model = pickle.load(f)
            logger.info("Model loaded successfully")
            return model
    except Exception as e:
        logger.error(f"Error loading model: {str(e)}")
        raise

def preprocess_data(data: StressInput) -> np.ndarray:
    """
    Convert the input data to a format suitable for the model
    """
    try:
        # Extract features from the StressInput object and convert to numpy array
        features = [
            data.hours_of_sleep,
            data.study_hours_per_day,
            data.social_activity_hours,
            data.screen_time,
            data.cgpa,
            data.academic_pressure,  # Already numeric (0, 1, 2)
            data.physical_activity,  # Already numeric (0, 1, 2)
        ]
        return np.array(features).reshape(1, -1)
    except Exception as e:
        logger.error(f"Error preprocessing data: {str(e)}")
        raise

def predict_stress_level(model: Any, data: StressInput) -> Tuple[int, float]:
    """
    Make a prediction using the trained model
    
    Returns:
    - stress_level: predicted stress level (0=Low, 1=Moderate, 2=High)
    - confidence: prediction confidence
    """
    try:
        # Preprocess the data
        processed_data = preprocess_data(data)
        
        # Get prediction
        prediction = model.predict(processed_data)[0]
        
        # Get prediction probabilities for confidence calculation
        probabilities = model.predict_proba(processed_data)[0]
        confidence = float(np.max(probabilities))
        
        logger.info(f"Prediction made: {prediction} with confidence {confidence:.4f}")
        
        return int(prediction), confidence
    except Exception as e:
        logger.error(f"Error making prediction: {str(e)}")
        raise
