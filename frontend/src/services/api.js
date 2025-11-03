// src/services/api.js
const getApiBaseUrl = () => {
  if (import.meta.env.VITE_NODE_ENV === 'production') {
    return 'https://book-adventurestrip.onrender.com/api';
  } else {
    return 'http://localhost:5000/api';
  }
};

const API_BASE_URL = getApiBaseUrl();

// Generic API call function
export const apiCall = async (endpoint, options = {}) => {
  // Clean the endpoint - remove leading slashes to prevent double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
  const url = `${API_BASE_URL}/${cleanEndpoint}`;
  
  console.log('🔄 API Call URL:', url); // Debug logging
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add body for POST, PUT requests
  if (options.method && ['POST', 'PUT', 'PATCH'].includes(options.method) && options.body) {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ API call failed:', error.message, 'URL:', url);
    throw error;
  }
};

// Specific API methods
export const api = {
  get: (endpoint) => apiCall(endpoint),
  post: (endpoint, data) => apiCall(endpoint, { 
    method: 'POST', 
    body: data 
  }),
  put: (endpoint, data) => apiCall(endpoint, { 
    method: 'PUT', 
    body: data 
  }),
  delete: (endpoint) => apiCall(endpoint, { 
    method: 'DELETE' 
  }),
};