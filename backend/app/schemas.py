from pydantic import BaseModel, Field
from typing import List

class StressInput(BaseModel):
    """Request model for student stress input data"""
    hours_of_sleep: float = Field(..., ge=0, le=24, description="Hours of sleep per day")
    study_hours_per_day: float = Field(..., ge=0, le=24, description="Hours spent studying per day")
    social_activity_hours: float = Field(..., ge=0, le=24, description="Hours spent in social activities per day")
    screen_time: float = Field(..., ge=0, description="Screen time in hours per day")
    cgpa: float = Field(..., ge=0, le=10, description="Current CGPA (0-10 scale)")
    academic_pressure: int = Field(..., ge=0, le=2, description="Level of academic pressure (0=Low, 1=Medium, 2=High)")
    physical_activity: int = Field(..., ge=0, le=2, description="Level of physical activity (0=Low, 1=Moderate, 2=High)")

class PredictionResponse(BaseModel):
    """Response model for stress prediction"""
    stress_level: str = Field(..., description="Predicted stress level (Low, Moderate, High)")
    confidence: float = Field(..., ge=0, le=1, description="Confidence of prediction (0-1)")
    recommendations: List[str] = Field(..., description="Recommended actions based on stress level")

    class Config:
        schema_extra = {
            "example": {
                "stress_level": "Moderate",
                "confidence": 0.85,
                "recommendations": [
                    "Consider implementing structured study breaks",
                    "Try some light exercise or meditation"
                ]
            }
        }
