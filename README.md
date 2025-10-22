# Student Stress Level Predictor

A full-stack application that predicts student stress levels based on various factors like sleep patterns, study hours, physical activity, and academic pressure. The application provides personalized recommendations based on the predicted stress level.

![Project Screenshot](docs/screenshot.png)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Prediction Model](#prediction-model)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Stress Level Prediction**: Predict stress levels (Low, Moderate, High) based on student data
- **Personalized Recommendations**: Receive tailored recommendations based on predicted stress level
- **Responsive UI**: User-friendly interface that works on both desktop and mobile devices
- **REST API**: Backend API for making stress predictions

## Tech Stack

### Frontend
- **React** (with Vite): Modern UI library for building interactive interfaces
- **Axios**: HTTP client for making API requests
- **CSS**: Styling with modern CSS features

### Backend
- **FastAPI**: Modern, high-performance Python web framework
- **Pydantic**: Data validation and settings management
- **scikit-learn**: Machine learning library for the prediction model
- **Uvicorn**: ASGI server for running FastAPI applications

## Project Structure

```
student-stress-predictor/
├── backend/                  # FastAPI backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py           # FastAPI app, endpoints
│   │   ├── model.py          # Model loading & prediction logic
│   │   └── schemas.py        # Pydantic models for request/response
│   ├── models/
│   │   └── stress_model.pkl  # Trained Random Forest / Decision Tree
│   ├── requirements.txt      # Python dependencies
│   └── README.md
├── frontend/                 # React frontend
│   ├── public/               # Static files
│   ├── src/
│   │   ├── components/
│   │   │   └── StressForm.jsx # User input form component
│   │   ├── App.jsx           # Main application component
│   │   ├── index.jsx         # React entry point
│   │   ├── api.js            # API integration
│   │   └── *.css             # Styling files
│   ├── index.html            # HTML template
│   ├── package.json          # Node.js dependencies
│   └── vite.config.js        # Vite configuration
└── README.md                 # This file
```

## Installation

### Prerequisites

- Node.js 14+ and npm for the frontend
- Python 3.8+ for the backend
- Git

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/student-stress-level-predictor.git
   cd student-stress-level-predictor
   ```

2. Set up the Python virtual environment:
   ```bash
   cd backend
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. Install the backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create the models directory (if it doesn't exist):
   ```bash
   mkdir -p models
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install the frontend dependencies:
   ```bash
   npm install
   ```

## Usage

### Running the Backend

1. Activate the virtual environment (if not already active):
   ```bash
   cd backend
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

2. Start the FastAPI server:
   ```bash
   uvicorn app.main:app --reload
   ```
   The backend API will be available at http://localhost:8000

3. Access the API documentation:
   - Swagger UI: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

### Running the Frontend

1. In a new terminal, navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at http://localhost:3000

## API Documentation

### Endpoints

#### GET /
- Welcome message
- Response: `{"message": "Welcome to Student Stress Level Predictor API"}`

#### GET /health
- Health check endpoint
- Response: `{"status": "healthy"}`

#### POST /predict
- Predicts student stress level
- Request Body:
  ```json
  {
    "hours_of_sleep": 7.0,
    "study_hours_per_day": 6.0,
    "social_activity_hours": 2.0,
    "screen_time": 4.0,
    "cgpa": 8.5,
    "academic_pressure": 1,
    "physical_activity": 0
  }
  ```
- Response:
  ```json
  {
    "stress_level": "Moderate",
    "confidence": 0.85,
    "recommendations": [
      "Consider implementing structured study breaks",
      "Try some light exercise or meditation",
      "Ensure you're maintaining a balanced diet",
      "Talk to friends or family about your concerns"
    ]
  }
  ```

## Prediction Model

The application uses a Random Forest Classifier to predict stress levels. The model is trained to classify students into three stress categories:

- **Low**: Minimal stress that doesn't significantly impact daily functioning
- **Moderate**: Noticeable stress that may affect some aspects of life
- **High**: Significant stress that substantially impacts well-being and performance

### Input Features

1. **Hours of Sleep**: Daily sleep duration (0-24 hours)
2. **Study Hours Per Day**: Time spent studying (0-24 hours)
3. **Social Activity Hours**: Time spent in social activities (0-24 hours)
4. **Screen Time**: Hours spent on electronic devices (0+ hours)
5. **CGPA**: Current Grade Point Average on a 0-10 scale
6. **Academic Pressure**: Perceived pressure level (0=Low, 1=Medium, 2=High)
7. **Physical Activity**: Exercise level (0=Low, 1=Moderate, 2=High)

### Demo Model

For demonstration purposes, the application creates a simple dummy model if no trained model exists. In a production environment, you should replace this with a properly trained model based on real student data.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Created with ❤️ for students dealing with stress