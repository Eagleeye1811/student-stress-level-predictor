import React, { useState } from 'react';
import { predictStressLevel } from '../api';
import './StressForm.css';

const StressForm = ({ onPredictionResult }) => {
  // Initial form state
  const initialState = {
    hours_of_sleep: 7,
    study_hours_per_day: 3,
    social_activity_hours: 2,
    screen_time: 4,
    cgpa: 7.5,
    academic_pressure: 1, // Default to Medium
    physical_activity: 1, // Default to Moderate
  };
  
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'academic_pressure' || name === 'physical_activity' 
      ? parseInt(value) 
      : parseFloat(value);
      
    setFormData({
      ...formData,
      [name]: parsedValue
    });
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const result = await predictStressLevel(formData);
      onPredictionResult(result);
    } catch (err) {
      setError('Failed to predict stress level. Please try again.');
      console.error('Error submitting form:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stress-form-container">
      <form onSubmit={handleSubmit} className="stress-form">
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="hours_of_sleep">Hours of Sleep:</label>
          <input
            id="hours_of_sleep"
            type="number"
            name="hours_of_sleep"
            min="0"
            max="24"
            step="0.5"
            value={formData.hours_of_sleep}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="study_hours_per_day">Study Hours Per Day:</label>
          <input
            id="study_hours_per_day"
            type="number"
            name="study_hours_per_day"
            min="0"
            max="24"
            step="0.5"
            value={formData.study_hours_per_day}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="social_activity_hours">Social Activity Hours:</label>
          <input
            id="social_activity_hours"
            type="number"
            name="social_activity_hours"
            min="0"
            max="24"
            step="0.5"
            value={formData.social_activity_hours}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="screen_time">Screen Time (hours):</label>
          <input
            id="screen_time"
            type="number"
            name="screen_time"
            min="0"
            step="0.5"
            value={formData.screen_time}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="cgpa">CGPA (0-10):</label>
          <input
            id="cgpa"
            type="number"
            name="cgpa"
            min="0"
            max="10"
            step="0.1"
            value={formData.cgpa}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="academic_pressure">Academic Pressure:</label>
          <select
            id="academic_pressure"
            name="academic_pressure"
            value={formData.academic_pressure}
            onChange={handleInputChange}
            required
          >
            <option value={0}>Low</option>
            <option value={1}>Medium</option>
            <option value={2}>High</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="physical_activity">Physical Activity:</label>
          <select
            id="physical_activity"
            name="physical_activity"
            value={formData.physical_activity}
            onChange={handleInputChange}
            required
          >
            <option value={0}>Low</option>
            <option value={1}>Moderate</option>
            <option value={2}>High</option>
          </select>
        </div>
        
        <button 
          type="submit" 
          className="submit-button" 
          disabled={loading}
        >
          {loading ? 'Predicting...' : 'Predict Stress Level'}
        </button>
      </form>
    </div>
  );
};

export default StressForm;
