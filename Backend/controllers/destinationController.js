import Destination from '../models/Destination.js';

// Get all destinations
export async function getAllDestinations(req, res) {
  try {
    const { category, difficulty, featured, search } = req.query;
    let filter = { available: true };

    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (featured) filter.featured = featured === 'true';

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const destinations = await Destination.find(filter)
      .sort({ createdAt: -1 })
      .select('-longDescription -itinerary -whatToBring -safety');

    res.json({
      success: true,
      count: destinations.length,
      data: destinations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
}

// Get single destination
export async function getDestination(req, res) {
  try {
    const destination = await Destination.findOne({ slug: req.params.slug });

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found'
      });
    }

    res.json({
      success: true,
      data: destination
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
}

// Create destination (Admin)
export async function createDestination(req, res) {
  try {
    const destination = new Destination(req.body);
    await destination.save();

    res.status(201).json({
      success: true,
      data: destination
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating destination',
      error: error.message
    });
  }
}

// Update destination (Admin)
export async function updateDestination(req, res) {
  try {
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found'
      });
    }

    res.json({
      success: true,
      data: destination
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating destination',
      error: error.message
    });
  }
}

// Search destinations
export async function searchDestinations(req, res) {
  try {
    const { query, category, difficulty, minPrice, maxPrice, minRating } = req.query;

    let filter = { available: true };

    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: 'i' } },
        { location: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { 'highlights.text': { $regex: query, $options: 'i' } }
      ];
    }

    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice);
    }
    if (minRating) filter.rating = { $gte: parseFloat(minRating) };

    const destinations = await Destination.find(filter)
      .sort({ rating: -1, createdAt: -1 })
      .select('-longDescription -itinerary -whatToBring -safety');

    res.json({
      success: true,
      count: destinations.length,
      data: destinations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Search failed',
      error: error.message
    });
  }
}