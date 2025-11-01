// controllers/bookingController.js
import Booking from '../models/Booking.js';
import Destination from '../models/Destination.js';

// Create booking
export async function createBooking(req, res) {
  try {
    const {
      destinationId,
      date,
      participants,
      user,
      paymentMethod,
      specialRequests
    } = req.body;

    // Check if destination exists
    const destination = await Destination.findById(destinationId);
    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found'
      });
    }

    // Calculate total price
    const totalPrice = destination.price * participants;

    // Create booking
    const booking = new Booking({
      destination: destinationId,
      date: new Date(date),
      participants,
      user,
      paymentMethod,
      specialRequests,
      totalPrice
    });

    await booking.save();

    // Populate destination details
    await booking.populate('destination', 'title location images price');

    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating booking',
      error: error.message
    });
  }
}

// Get booking by ID
export async function getBooking(req, res) {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('destination', 'title location images price');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
}

// Get bookings by user email
export async function getUserBookings(req, res) {
  try {
    const { email } = req.params;

    const bookings = await Booking.find({ 'user.email': email })
      .populate('destination', 'title location images price')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
}

// Cancel booking
export async function cancelBooking(req, res) {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if booking can be cancelled (at least 24 hours before)
    const bookingDate = new Date(booking.date);
    const now = new Date();
    const hoursDifference = (bookingDate - now) / (1000 * 60 * 60);

    if (hoursDifference < 24) {
      return res.status(400).json({
        success: false,
        message: 'Bookings can only be cancelled at least 24 hours before the activity'
      });
    }

    booking.bookingStatus = 'cancelled';
    booking.paymentStatus = 'refunded';
    await booking.save();

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error cancelling booking',
      error: error.message
    });
  }
}