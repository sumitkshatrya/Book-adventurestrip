// src/services/api.js
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://book-adventurestrip.onrender.com/api'  // Remove trailing slash
  : 'http://localhost:5000/api';

// Generic API call function
export const apiCall = async (endpoint, options = {}) => {
  // Remove leading slash from endpoint to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  const url = `${API_BASE_URL}/${cleanEndpoint}`;
  
  console.log('API Call:', url); // Debug logging
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};