import React, { useState } from 'react';
import StressForm from './components/StressForm';
import './App.css';

function App() {
  const [prediction, setPrediction] = useState(null);
  
  // Handler for when prediction results are received
  const handlePredictionResult = (result) => {
    setPrediction(result);
  };
  
  // Reset the prediction to null
  const handleReset = () => {
    setPrediction(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Student Stress Level Predictor</h1>
        <p>Enter your information to predict your stress level</p>
      </header>
      
      <main className="app-main">
        {!prediction ? (
          <StressForm onPredictionResult={handlePredictionResult} />
        ) : (
          <div className="prediction-results">
            <h2>Your Predicted Stress Level: <span className={`stress-level ${prediction.stress_level.toLowerCase()}`}>{prediction.stress_level}</span></h2>
            <p>Confidence: {(prediction.confidence * 100).toFixed(1)}%</p>
            
            <div className="recommendations">
              <h3>Recommendations:</h3>
              <ul>
                {prediction.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
            
            <button className="reset-button" onClick={handleReset}>
              Predict Again
            </button>
          </div>
        )}
      </main>
      
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Student Stress Level Predictor</p>
      </footer>
    </div>
  );
}

export default App;
