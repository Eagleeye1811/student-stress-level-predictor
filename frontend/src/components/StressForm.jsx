import React, { useState } from "react";
import { predictStressLevel } from "../api";
import "./StressForm.css";

const StressForm = ({ onPredictionResult }) => {
  // Initial form state
  const initialState = {
    age: 20,
    cgpa: 7.5,
    hours_of_sleep: 7,
    study_hours_per_day: 5,
    social_activity_hours: 2,
    screen_time: 4,
    family_income: 50000,
    gender: "Male",
    academic_year: "2024-2025",
    physical_activity: "moderate",
    part_time_job: false,
    relationship_status: "single",
    academic_pressure: "medium",
    sleep_quality: "good",
    mental_health_support: false,
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    let parsedValue;
    if (type === "checkbox") {
      parsedValue = checked;
    } else if (type === "number") {
      parsedValue = name === "age" ? parseInt(value) : parseFloat(value);
    } else {
      parsedValue = value;
    }

    setFormData({
      ...formData,
      [name]: parsedValue,
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
      setError("Failed to predict stress level. Please try again.");
      console.error("Error submitting form:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stress-form-container">
      <form onSubmit={handleSubmit} className="stress-form">
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            id="age"
            type="number"
            name="age"
            min="15"
            max="100"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Genderfluid">Genderfluid</option>
            <option value="Genderqueer">Genderqueer</option>
            <option value="Bigender">Bigender</option>
            <option value="Polygender">Polygender</option>
          </select>
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
          <label htmlFor="academic_year">Academic Year:</label>
          <select
            id="academic_year"
            name="academic_year"
            value={formData.academic_year}
            onChange={handleInputChange}
            required
          >
            <option value="2023-2024">2023-2024</option>
            <option value="2024-2025">2024-2025</option>
            <option value="2025-2026">2025-2026</option>
          </select>
        </div>

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
          <label htmlFor="sleep_quality">Sleep Quality:</label>
          <select
            id="sleep_quality"
            name="sleep_quality"
            value={formData.sleep_quality}
            onChange={handleInputChange}
            required
          >
            <option value="poor">Poor</option>
            <option value="good">Good</option>
          </select>
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
            max="24"
            step="0.5"
            value={formData.screen_time}
            onChange={handleInputChange}
            required
          />
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
            <option value="sedentary">Sedentary</option>
            <option value="moderate">Moderate</option>
          </select>
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
            <option value="low">Low</option>
            <option value="medium">Medium</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="family_income">Family Income:</label>
          <input
            id="family_income"
            type="number"
            name="family_income"
            min="0"
            step="1000"
            value={formData.family_income}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group checkbox-group">
          <label htmlFor="part_time_job">
            <input
              id="part_time_job"
              type="checkbox"
              name="part_time_job"
              checked={formData.part_time_job}
              onChange={handleInputChange}
            />
            Part-time Job
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="relationship_status">Relationship Status:</label>
          <select
            id="relationship_status"
            name="relationship_status"
            value={formData.relationship_status}
            onChange={handleInputChange}
            required
          >
            <option value="single">Single</option>
            <option value="in a relationship">In a Relationship</option>
          </select>
        </div>

        <div className="form-group checkbox-group">
          <label htmlFor="mental_health_support">
            <input
              id="mental_health_support"
              type="checkbox"
              name="mental_health_support"
              checked={formData.mental_health_support}
              onChange={handleInputChange}
            />
            Receiving Mental Health Support
          </label>
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Predicting..." : "Predict Stress Level"}
        </button>
      </form>
    </div>
  );
};

export default StressForm;
