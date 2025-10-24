import os
import pickle
import numpy as np
import logging
from typing import Tuple, Any
from .schemas import StressInput

logger = logging.getLogger(__name__)

# Path to the actual trained model file
MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "models", "stress_level_model_new.pkl")

def get_model():
    """
    Load the trained model from disk
    """
    try:
        # Check if model file exists
        if not os.path.exists(MODEL_PATH):
            error_msg = f"Model file not found at {MODEL_PATH}. Please ensure the trained model is in the models folder."
            logger.error(error_msg)
            raise FileNotFoundError(error_msg)
        
        # Load the trained model
        with open(MODEL_PATH, 'rb') as f:
            model = pickle.load(f)
        logger.info(f"Model loaded successfully from {MODEL_PATH}")
        return model
        
    except Exception as e:
        logger.error(f"Error loading model: {str(e)}")
        raise

def preprocess_data(data: StressInput) -> np.ndarray:
    """
    Convert the input data to a format suitable for the model.
    Creates a feature vector with one-hot encoded categorical variables
    matching the model's expected 27 features.
    """
    try:
        # Initialize all 27 features with zeros
        features = np.zeros(27)
        
        # Numeric features (indices 0-6)
        features[0] = data.age
        features[1] = data.cgpa
        features[2] = data.hours_of_sleep
        features[3] = data.study_hours_per_day
        features[4] = data.social_activity_hours
        features[5] = data.screen_time
        features[6] = data.family_income
        
        # One-hot encoded gender (indices 7-13)
        gender_mapping = {
            'Bigender': 7, 'Female': 8, 'Genderfluid': 9, 
            'Genderqueer': 10, 'Male': 11, 'Non-binary': 12, 'Polygender': 13
        }
        if data.gender in gender_mapping:
            features[gender_mapping[data.gender]] = 1
        
        # One-hot encoded academic_year (indices 14-16)
        academic_year_mapping = {
            '2023-2024': 14, '2024-2025': 15, '2025-2026': 16
        }
        if data.academic_year in academic_year_mapping:
            features[academic_year_mapping[data.academic_year]] = 1
        
        # One-hot encoded physical_activity (indices 17-18)
        if data.physical_activity == 'moderate':
            features[17] = 1
        elif data.physical_activity == 'sedentary':
            features[18] = 1
        
        # Boolean part_time_job (index 19)
        features[19] = 1 if data.part_time_job else 0
        
        # One-hot encoded relationship_status (indices 20-21)
        if data.relationship_status == 'in a relationship':
            features[20] = 1
        elif data.relationship_status == 'single':
            features[21] = 1
        
        # One-hot encoded academic_pressure (indices 22-23)
        if data.academic_pressure == 'low':
            features[22] = 1
        elif data.academic_pressure == 'medium':
            features[23] = 1
        
        # One-hot encoded sleep_quality (indices 24-25)
        if data.sleep_quality == 'good':
            features[24] = 1
        elif data.sleep_quality == 'poor':
            features[25] = 1
        
        # Boolean mental_health_support (index 26)
        features[26] = 1 if data.mental_health_support else 0
        
        return features.reshape(1, -1)
    except Exception as e:
        logger.error(f"Error preprocessing data: {str(e)}")
        raise

def predict_stress_level(model: Any, data: StressInput) -> Tuple[str, float]:
    """
    Make a prediction using the trained model
    
    Returns:
    - stress_level: predicted stress level as string ('low', 'medium', 'high')
    - confidence: prediction confidence
    """
    try:
        # Preprocess the data
        processed_data = preprocess_data(data)
        
        # Get prediction (model returns string labels)
        prediction = model.predict(processed_data)[0]
        
        # Get prediction probabilities for confidence calculation
        probabilities = model.predict_proba(processed_data)[0]
        confidence = float(np.max(probabilities))
        
        logger.info(f"Prediction made: {prediction} with confidence {confidence:.4f}")
        
        return str(prediction), confidence
    except Exception as e:
        logger.error(f"Error making prediction: {str(e)}")
        raise
