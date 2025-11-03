// src/services/destinationService.js
import { api } from './api';

export const destinationService = {
  // Get all destinations with optional filters
  getAllDestinations: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
          queryParams.append(key, filters[key]);
        }
      });
      
      const queryString = queryParams.toString();
      const endpoint = `destinations${queryString ? `?${queryString}` : ''}`;
      
      console.log('📡 Fetching destinations from endpoint:', endpoint);
      const response = await api.get(endpoint);
      
      if (response.success) {
        console.log(`✅ Successfully loaded ${response.data.length} destinations`);
        return response;
      } else {
        console.error('❌ API returned error:', response.message);
        return {
          success: false,
          message: response.message || 'Failed to fetch destinations',
          data: []
        };
      }
    } catch (error) {
      console.error('❌ Error in getAllDestinations:', error.message);
      return {
        success: false,
        message: 'Failed to fetch destinations: ' + error.message,
        data: []
      };
    }
  },

  // Get single destination by slug
  getDestinationBySlug: async (slug) => {
    try {
      const endpoint = `destinations/${slug}`;
      console.log('📡 Fetching destination:', endpoint);
      return await api.get(endpoint);
    } catch (error) {
      console.error('❌ Error in getDestinationBySlug:', error);
      return {
        success: false,
        message: 'Failed to fetch destination',
        data: null
      };
    }
  },

  // Search destinations
  searchDestinations: async (searchParams = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      Object.keys(searchParams).forEach(key => {
        if (searchParams[key] !== undefined && searchParams[key] !== null && searchParams[key] !== '') {
          queryParams.append(key, searchParams[key]);
        }
      });
      
      const endpoint = `destinations/search?${queryParams.toString()}`;
      console.log('🔍 Searching destinations:', endpoint);
      return await api.get(endpoint);
    } catch (error) {
      console.error('❌ Error in searchDestinations:', error);
      return {
        success: false,
        message: 'Search failed',
        data: []
      };
    }
  },
};