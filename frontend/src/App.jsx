import React, { useState, useEffect } from "react";
import StressForm from "./components/StressForm";
import StressVisualization from "./components/StressVisualization";
import "./App.css";

function App() {
  const [prediction, setPrediction] = useState(null);
  const [formData, setFormData] = useState(null);

  // Scroll to top when prediction results are shown
  useEffect(() => {
    if (prediction) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [prediction]);

  // Handler for when prediction results are received
  const handlePredictionResult = (result, inputData) => {
    setPrediction(result);
    setFormData(inputData);
  };

  // Reset the prediction to null
  const handleReset = () => {
    setPrediction(null);
    setFormData(null);
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
            <div className="result-header">
              <div className="result-icon">
                {prediction.stress_level === "Low"
                  ? "😊"
                  : prediction.stress_level === "Moderate"
                  ? "😐"
                  : "😟"}
              </div>
              <h2 className="result-title">Analysis Complete!</h2>
              <div className="result-stress-level">
                <span className="label">Your Stress Level:</span>
                <span
                  className={`stress-badge ${prediction.stress_level.toLowerCase()}`}
                >
                  {prediction.stress_level}
                </span>
              </div>
              <div className="result-confidence">
                <div className="confidence-bar-container">
                  <div
                    className="confidence-bar"
                    style={{ width: `${prediction.confidence * 100}%` }}
                  ></div>
                </div>
                <span className="confidence-text">
                  {(prediction.confidence * 100).toFixed(1)}% Confidence
                </span>
              </div>
            </div>

            {/* Add Visualization Component */}
            <StressVisualization prediction={prediction} formData={formData} />

            <div className="recommendations">
              <h3>📋 Personalized Recommendations</h3>
              <ul>
                {prediction.recommendations.map((rec, index) => (
                  <li key={index}>
                    <span className="rec-icon">✓</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>

            <div className="button-container">
              <button className="reset-button" onClick={handleReset}>
                <span className="button-icon">🔄</span>
                Take Another Assessment
              </button>
            </div>
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
