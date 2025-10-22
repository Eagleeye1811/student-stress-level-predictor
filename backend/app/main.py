from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import logging

from .schemas import StressInput, PredictionResponse
from .model import predict_stress_level, get_model

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Student Stress Level Predictor API",
    description="API for predicting student stress levels based on various factors",
    version="1.0.0"
)

# Configure CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model at startup
model = get_model()

@app.get("/")
def read_root():
    return {"message": "Welcome to Student Stress Level Predictor API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post("/predict", response_model=PredictionResponse)
async def predict(data: StressInput):
    try:
        # Predict stress level
        stress_level, confidence = predict_stress_level(model, data)
        
        # Map numeric stress level to categorical labels
        stress_category = "Low"
        if stress_level == 1:
            stress_category = "Moderate"
        elif stress_level == 2:
            stress_category = "High"
        
        return {
            "stress_level": stress_category,
            "confidence": confidence,
            "recommendations": get_recommendations(stress_category)
        }
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

def get_recommendations(stress_level: str) -> list:
    """Generate recommendations based on predicted stress level."""
    recommendations = {
        "Low": [
            "Maintain your current routine", 
            "Continue with your healthy habits",
            "Regular check-ins with yourself to monitor stress levels"
        ],
        "Moderate": [
            "Consider implementing structured study breaks",
            "Try some light exercise or meditation",
            "Ensure you're maintaining a balanced diet",
            "Talk to friends or family about your concerns"
        ],
        "High": [
            "Speak with a counselor or advisor",
            "Prioritize mental health and self-care",
            "Consider reducing commitments where possible",
            "Practice stress-reduction techniques daily",
            "Ensure adequate sleep and nutrition"
        ]
    }
    return recommendations.get(stress_level, ["Consult with a wellness professional"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
