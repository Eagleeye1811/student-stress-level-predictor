import axios from 'axios';

// Base URL for API requests
const API_URL = 'http://localhost:8000';

/**
 * Send student data to backend for stress level prediction
 * @param {Object} studentData - Student data for stress prediction
 * @returns {Promise} - Promise resolving to prediction results
 */
export const predictStressLevel = async (studentData) => {
  try {
    const response = await axios.post(`${API_URL}/predict`, studentData);
    return response.data;
  } catch (error) {
    console.error('Error predicting stress level:', error);
    throw error;
  }
};
