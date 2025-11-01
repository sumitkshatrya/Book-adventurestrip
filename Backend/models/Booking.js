// models/Booking.js
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: String
});

const bookingSchema = new Schema({
  destination: {
    type: Schema.Types.ObjectId,
    ref: 'Destination',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  participants: {
    type: Number,
    required: true,
    min: 1
  },
  user: userSchema,
  paymentMethod: {
    type: String,
    required: true,
    enum: ['credit_card', 'debit_card', 'paypal', 'stripe']
  },
  specialRequests: String,
  totalPrice: {
    type: Number,
    required: true
  },
  bookingStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Update the updatedAt field before saving
bookingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default model('Booking', bookingSchema);