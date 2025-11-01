// src/services/destinationService.js
import { api } from './api';

export const destinationService = {
  // Get all destinations with optional filters
  getAllDestinations: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        queryParams.append(key, filters[key]);
      }
    });
    
    const queryString = queryParams.toString();
    const endpoint = `/destinations${queryString ? `?${queryString}` : ''}`;
    
    return await api.get(endpoint);
  },

  // Get single destination by slug
  getDestinationBySlug: async (slug) => {
    return await api.get(`/destinations/${slug}`);
  },

  // Search destinations
  searchDestinations: async (searchParams) => {
    const queryParams = new URLSearchParams(searchParams);
    return await api.get(`/destinations/search?${queryParams.toString()}`);
  },

  // Create destination (admin)
  createDestination: async (destinationData) => {
    return await api.post('/destinations', destinationData);
  },

  // Update destination (admin)
  updateDestination: async (id, destinationData) => {
    return await api.put(`/destinations/${id}`, destinationData);
  },
};