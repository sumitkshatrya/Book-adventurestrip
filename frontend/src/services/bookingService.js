// src/services/bookingService.js
import { api } from './api';

export const bookingService = {
  // Create booking
  createBooking: async (bookingData) => {
    return await api.post('/bookings', bookingData);
  },

  // Get booking by ID
  getBooking: async (bookingId) => {
    return await api.get(`/bookings/${bookingId}`);
  },

  // Get user bookings by email
  getUserBookings: async (email) => {
    return await api.get(`/bookings/user/${email}`);
  },

  // Cancel booking
  cancelBooking: async (bookingId) => {
    return await api.put(`/bookings/${bookingId}/cancel`);
  },
};