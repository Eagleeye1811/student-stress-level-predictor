from pydantic import BaseModel, Field
from typing import List, Literal

class StressInput(BaseModel):
    """Request model for student stress input data"""
    age: int = Field(..., ge=15, le=100, description="Student's age")
    cgpa: float = Field(..., ge=0, le=10, description="Current CGPA (0-10 scale)")
    hours_of_sleep: float = Field(..., ge=0, le=24, description="Hours of sleep per day")
    study_hours_per_day: float = Field(..., ge=0, le=24, description="Hours spent studying per day")
    social_activity_hours: float = Field(..., ge=0, le=24, description="Hours spent in social activities per day")
    screen_time: float = Field(..., ge=0, le=24, description="Screen time in hours per day")
    family_income: float = Field(..., ge=0, description="Family income (in appropriate units)")
    gender: Literal['Male', 'Female', 'Non-binary', 'Genderfluid', 'Genderqueer', 'Bigender', 'Polygender'] = Field(..., description="Student's gender")
    academic_year: Literal['2023-2024', '2024-2025', '2025-2026'] = Field(..., description="Current academic year")
    physical_activity: Literal['sedentary', 'moderate'] = Field(..., description="Level of physical activity")
    part_time_job: bool = Field(..., description="Whether student has a part-time job")
    relationship_status: Literal['single', 'in a relationship'] = Field(..., description="Relationship status")
    academic_pressure: Literal['low', 'medium'] = Field(..., description="Level of academic pressure")
    sleep_quality: Literal['poor', 'good'] = Field(..., description="Quality of sleep")
    mental_health_support: bool = Field(..., description="Whether student receives mental health support")

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
