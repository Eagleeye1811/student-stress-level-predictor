# Student Stress Level Predictor - Backend

This is the backend service for the Student Stress Level Predictor application, built with FastAPI and scikit-learn.

## Features

- REST API for predicting student stress levels
- Input validation using Pydantic
- Machine learning model integration (Random Forest/Decision Tree)
- Recommendations based on predicted stress levels

## Setup

### Prerequisites

- Python 3.8+
- pip (Python package installer)

### Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```
   cd student-stress-level-predictor/backend
   ```
3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

### Model Training

Before using the API, you need to train and save the model:

1. Create a script to train your model (not included in this repository)
2. Save the trained model as `models/stress_model.pkl`

### Running the API

To start the API server:

```
uvicorn app.main:app --reload
```

The API will be available at http://localhost:8000

## API Endpoints

### GET /
- Welcome message
- No parameters required

### GET /health
- Health check endpoint
- Returns status of the API

### POST /predict
- Predicts student stress level
- Request body: JSON with student data (see schema below)
- Returns: Predicted stress level (0-4), confidence score, and recommendations

## Input Schema

```json
{
  "hours_studying": 6.0,
  "hours_sleeping": 7.0,
  "academic_performance": 8,
  "extracurricular_activities": true,
  "social_support_level": 7,
  "financial_concerns": 5,
  "health_issues_level": 3,
  "has_deadline_pressure": true,
  "additional_factors": "Upcoming exams"
}
```

## Stress Level Scale

- 0: Minimal stress
- 1: Low stress
- 2: Moderate stress
- 3: High stress
- 4: Severe stress

## Development

### Running Tests

```
pytest
```

## License

[MIT License](LICENSE)
